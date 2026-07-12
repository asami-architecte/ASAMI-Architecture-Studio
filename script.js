/* ================= ASAMI — script.js ================= */

/* ── Défilement horizontal à la molette pour les bandes d'images du portfolio ── */
document.addEventListener('wheel', (e) => {
  const strip = e.target.closest('.proj-images');
  if (!strip) return;
  if (strip.scrollWidth > strip.clientWidth) {
    e.preventDefault();
    strip.scrollLeft += e.deltaY;
  }
}, { passive: false });

/* ── Navigation SPA ── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

/* ── Formulaire de contact ── */
function submitForm() {
  const nom = document.getElementById('f-nom').value.trim();
  const email = document.getElementById('f-email').value.trim();
  if (!nom || !email) { alert('Merci de renseigner votre nom et votre email.'); return; }
  const tel = document.getElementById('f-tel').value.trim();
  const msg = document.getElementById('f-message').value.trim();
  const prests = [...document.querySelectorAll('input[name="prestation"]:checked')].map(i => i.value);
  const subject = encodeURIComponent('Nouvelle demande — ASAMI');
  const body = encodeURIComponent(
    'Nom : ' + nom + '\nEmail : ' + email + '\nTél : ' + (tel || '—') +
    '\nPrestations : ' + (prests.join(', ') || '—') + '\n\nMessage :\n' + (msg || '—')
  );
  window.location.href = 'mailto:asami.architecte@gmail.com?subject=' + subject + '&body=' + body;
  document.getElementById('contact-form').style.display = 'none';
  document.getElementById('form-confirm').classList.add('show');
}

/* ── Téléchargement du portfolio PDF (avec confirmation) ── */
function openPdfModal() { document.getElementById('pdf-modal').classList.add('open'); }
function closePdfModal() { document.getElementById('pdf-modal').classList.remove('open'); }
function confirmPdfDownload() {
  closePdfModal();
  const a = document.createElement('a');
  a.href = 'PORTFOLIO 26.pdf';
  a.download = 'ASAMI-Portfolio.pdf';
  document.body.appendChild(a);
  a.click();
  a.remove();
}
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('pdf-modal');
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closePdfModal(); });
});

/* ══════════════════ PORTFOLIO (index toujours visible) ══════════════════ */

/* Vrai support du survol (souris) ? Sur tactile pur, hover:none -> false. */
function hasRealHover() {
  return window.matchMedia('(hover: hover)').matches;
}

/* Chemin de la miniature "_mini_index" à partir du chemin de l'image pleine taille. */
function thumbPath(src) {
  return src.replace(/(\.[a-zA-Z0-9]+)$/, '_mini_index$1');
}

function buildPortfolio() {
  const root = document.getElementById('portfolio-index');
  root.innerHTML = '';

  CATEGORIES.forEach(cat => {
    const list = PROJECTS.filter(p => p.code[0] === cat.key);
    if (!list.length) return;

    const catRow = document.createElement('div');
    catRow.className = 'cat-row';

    const label = document.createElement('div');
    label.className = 'cat-label';
    label.textContent = cat.label;
    catRow.appendChild(label);

    list.forEach(p => {
      const globalIdx = PROJECTS.indexOf(p);
      const row = document.createElement('div');
      row.className = 'proj-row';

      const extraBits = [p.typo, p.lieu, p.annee].filter(Boolean).join(' — ');
      const miniImgs = p.images.map(src =>
        `<img src="${thumbPath(src)}" alt="${p.title}" loading="lazy" onclick="event.stopPropagation(); openLightbox(${globalIdx}, '${src}')"/>`
      ).join('');
      row.innerHTML = `
        <div class="proj-line">
          <span class="proj-ref">${p.code.toUpperCase()}</span>
          <span class="proj-title-line">— ${p.title}</span>
          <span class="proj-extra">${extraBits}</span>
        </div>
        <div class="proj-images">${miniImgs}</div>
      `;
      row.addEventListener('click', () => {
        if (hasRealHover()) {
          // Souris : le survol a déjà révélé les infos/images, un clic ouvre le lecteur.
          openLightbox(globalIdx);
        } else {
          // Tactile : pas de survol fiable -> le premier tap ouvre/ferme la ligne
          // (accordéon), un tap sur une image ouvre directement le lecteur.
          const willOpen = !row.classList.contains('open');
          document.querySelectorAll('.proj-row.open').forEach(r => r.classList.remove('open'));
          if (willOpen) row.classList.add('open');
        }
      });
      catRow.appendChild(row);
    });

    root.appendChild(catRow);
  });
}
buildPortfolio();

/* ══════════════════ LIGHTBOX (zoom molette + pincement + drag) ══════════════════ */
let lbProj = null, lbIdx = 0;
let lbScale = 1, lbX = 0, lbY = 0;
let dragging = false, dragStartX = 0, dragStartY = 0, dragOrigX = 0, dragOrigY = 0;
let pinchStartDist = 0, pinchStartScale = 1;

function openLightbox(projIdx, imgSrc) {
  lbProj = PROJECTS[projIdx];
  lbIdx = imgSrc ? Math.max(0, lbProj.images.indexOf(imgSrc)) : 0;
  document.getElementById('lb-code').textContent = lbProj.code.toUpperCase();
  document.getElementById('lb-title').textContent = lbProj.title;
  document.getElementById('lb-meta').textContent = [lbProj.typo, lbProj.lieu, lbProj.annee].filter(Boolean).join(' — ');
  document.getElementById('lb-caption').textContent = lbProj.desc || '';
  renderLbImg();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
  resetZoom();
}
function renderLbImg() {
  const img = document.getElementById('lb-img');
  img.src = lbProj.images[lbIdx];
  resetZoom();
  const many = lbProj.images.length > 1;
  document.getElementById('lb-prev').style.display = many ? 'flex' : 'none';
  document.getElementById('lb-next').style.display = many ? 'flex' : 'none';
}
function lbNav(d) {
  if (!lbProj) return;
  lbIdx = (lbIdx + d + lbProj.images.length) % lbProj.images.length;
  renderLbImg();
}
function resetZoom() {
  lbScale = 1; lbX = 0; lbY = 0;
  applyTransform();
}
function applyTransform() {
  const img = document.getElementById('lb-img');
  img.style.transform = `translate(${lbX}px, ${lbY}px) scale(${lbScale})`;
}
function clampScale(s) { return Math.min(Math.max(s, 1), 6); }

const lbWrap = () => document.getElementById('lb-wrap');

document.addEventListener('DOMContentLoaded', () => {
  const wrap = lbWrap();
  if (!wrap) return;

  /* Zoom à la molette (desktop) */
  wrap.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = -e.deltaY * 0.0015;
    lbScale = clampScale(lbScale + delta);
    if (lbScale === 1) { lbX = 0; lbY = 0; }
    applyTransform();
  }, { passive: false });

  /* Drag / pan à la souris quand zoomé */
  wrap.addEventListener('mousedown', (e) => {
    if (lbScale <= 1) return;
    dragging = true; wrap.classList.add('dragging');
    dragStartX = e.clientX; dragStartY = e.clientY;
    dragOrigX = lbX; dragOrigY = lbY;
  });
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    lbX = dragOrigX + (e.clientX - dragStartX);
    lbY = dragOrigY + (e.clientY - dragStartY);
    applyTransform();
  });
  window.addEventListener('mouseup', () => { dragging = false; wrap.classList.remove('dragging'); });

  /* Pincement (mobile) + pan tactile + swipe pour naviguer */
  let swipeX = 0, swipeY = 0, swiping = false;
  wrap.addEventListener('touchstart', (e) => {
    if (e.touches.length === 2) {
      pinchStartDist = touchDist(e.touches);
      pinchStartScale = lbScale;
      swiping = false;
    } else if (e.touches.length === 1 && lbScale > 1) {
      dragging = true;
      dragStartX = e.touches[0].clientX; dragStartY = e.touches[0].clientY;
      dragOrigX = lbX; dragOrigY = lbY;
    } else if (e.touches.length === 1) {
      swiping = true;
      swipeX = e.touches[0].clientX; swipeY = e.touches[0].clientY;
    }
  }, { passive: true });

  wrap.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dist = touchDist(e.touches);
      lbScale = clampScale(pinchStartScale * (dist / pinchStartDist));
      if (lbScale === 1) { lbX = 0; lbY = 0; }
      applyTransform();
    } else if (e.touches.length === 1 && dragging) {
      lbX = dragOrigX + (e.touches[0].clientX - dragStartX);
      lbY = dragOrigY + (e.touches[0].clientY - dragStartY);
      applyTransform();
    }
  }, { passive: false });

  wrap.addEventListener('touchend', (e) => {
    dragging = false;
    if (swiping) {
      const dx = (e.changedTouches[0].clientX - swipeX);
      const dy = (e.changedTouches[0].clientY - swipeY);
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy)) lbNav(dx < 0 ? 1 : -1);
      swiping = false;
    }
  });

  wrap.addEventListener('dblclick', () => resetZoom());
});

function touchDist(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

document.addEventListener('keydown', (e) => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'ArrowLeft') lbNav(-1);
});
