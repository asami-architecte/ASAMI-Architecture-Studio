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
/* Envoi direct par email via FormSubmit (service gratuit, sans compte requis),
   en AJAX pour rester sur la même page (pas de redirection). Le tout premier
   envoi déclenche un email de confirmation à asami.architecte@gmail.com : il
   faut cliquer une fois sur "Activate Form" dans cet email pour débloquer la
   réception des messages suivants. */
async function submitForm() {
  const honey = document.getElementById('f-honey').value;
  if (honey) return; // piège à robots, on n'envoie rien

  const nom = document.getElementById('f-nom').value.trim();
  const email = document.getElementById('f-email').value.trim();
  if (!nom || !email) { alert('Merci de renseigner votre nom et votre email.'); return; }
  const tel = document.getElementById('f-tel').value.trim();
  const msg = document.getElementById('f-message').value.trim();
  const prests = [...document.querySelectorAll('input[name="prestation"]:checked')].map(i => i.value);

  const btn = document.querySelector('.contact-tiles .btn-thin');
  const btnLabel = btn ? btn.textContent : '';
  if (btn) { btn.disabled = true; btn.textContent = 'Envoi en cours…'; }

  const payload = {
    'Nom': nom,
    'Email': email,
    'Téléphone': tel || '—',
    'Type de prestation': prests.join(', ') || '—',
    'Message': msg || '—',
    _subject: 'Nouvelle demande — Site ASAMI',
    _template: 'table'
  };

  try {
    const res = await fetch('https://formsubmit.co/ajax/asami.architecte@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Envoi échoué');
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('form-confirm').classList.add('show');
  } catch (err) {
    alert("Une erreur est survenue lors de l'envoi. Réessayez, ou écrivez-nous directement à asami.architecte@gmail.com.");
    if (btn) { btn.disabled = false; btn.textContent = btnLabel; }
  }
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

/* Active un défilement continu (marquee) quand le texte dépasse l'espace
   disponible — utilisé pour les infos projet (typo / lieu / année) quand elles
   sont trop larges pour l'écran (surtout en mobile). */
function setupMarquee(extraEl) {
  const track = extraEl.querySelector('.proj-extra-track');
  if (!track) return;
  const isOpen = parseFloat(getComputedStyle(extraEl).opacity) > 0.5;
  if (!isOpen) return;
  const overflowing = track.scrollWidth > extraEl.clientWidth + 4;
  if (overflowing && !extraEl.classList.contains('marquee')) {
    const text = track.dataset.text || track.textContent;
    track.dataset.text = text;
    track.innerHTML = `<span>${text}</span><span class="mq-gap"></span><span>${text}</span><span class="mq-gap"></span>`;
    const dur = Math.max(7, text.length * 0.18); // vitesse lente, proportionnelle à la longueur
    track.style.animationDuration = dur + 's';
    extraEl.classList.add('marquee');
  } else if (!overflowing && extraEl.classList.contains('marquee')) {
    extraEl.classList.remove('marquee');
    track.textContent = track.dataset.text || track.textContent;
  }
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
          <span class="proj-extra"><span class="proj-extra-track">${extraBits}</span></span>
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
      const extraEl = row.querySelector('.proj-extra');
      extraEl.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'opacity') setupMarquee(extraEl);
      });
      catRow.appendChild(row);
    });

    root.appendChild(catRow);
  });
}
buildPortfolio();

/* ══════════════════ STUDIO — accompagnement (même logique que le portfolio) ══════════════════ */
function buildSteps() {
  const root = document.getElementById('step-list');
  if (!root || typeof STEPS === 'undefined') return;
  root.innerHTML = '';
  STEPS.forEach(s => {
    const item = document.createElement('div');
    item.className = 'step-item';
    item.innerHTML = `
      <div class="step-title">${s.num} — ${s.title}</div>
      <div class="step-desc-wrap"><p class="step-desc">${s.desc}</p></div>
    `;
    item.addEventListener('click', () => {
      if (hasRealHover()) return; // souris : le survol suffit, pas besoin de tap
      const willOpen = !item.classList.contains('open');
      document.querySelectorAll('.step-item.open').forEach(i => i.classList.remove('open'));
      if (willOpen) item.classList.add('open');
    });
    root.appendChild(item);
  });
}
buildSteps();

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
