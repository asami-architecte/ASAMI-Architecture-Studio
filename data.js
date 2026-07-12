/* ================= ASAMI — data.js =================
   Chaque projet : code, title, typo (typologie), lieu, annee, images[], desc.
   Le champ "annee" reste vide (à compléter). "desc" est affiché en majuscules
   automatiquement (CSS) dans le lecteur d'image. Le champ "cat" est déduit du
   préfixe du code : a = Architecture, i = Intérieur, p = Paysage.
*/
const CATEGORIES = [
  { key: 'a', label: 'Architecture' },
  { key: 'i', label: 'Intérieur' },
  { key: 'p', label: 'Paysage' }
];

const STEPS = [
  { num:'01', title:'Faisabilité / Étude', desc:"Analyse technique et réglementaire pour évaluer le plein potentiel de votre bien ou terrain. Une étude préalable essentielle pour valider la viabilité et sécuriser le budget de votre projet avant tout engagement." },
  { num:'02', title:'Consultation / Conseils', desc:"Transformation ou restructuration de vos espaces ou bâti existants pour les adapter à vos nouveaux modes de vie. Un aménagement sur-mesure qui sublime votre intérieur en alliant fonctionnalité et lumière." },
  { num:'03', title:'Rénovation / Restructuration', desc:"Diagnostic, conception et exécution de travaux de rénovation. Maîtrise des contraintes structurelles, techniques et budgétaires pour redonner vie aux bâtiments anciens ou plus récents." },
  { num:'04', title:'Extension / Surélévation', desc:"Création de nouveaux volumes pour agrandir votre surface habitable en parfaite harmonie avec l'identité du bâti existant. La solution architecturale pour gagner de l'espace et valoriser votre patrimoine sans déménager." },
  { num:'05', title:'Construction neuve', desc:"Conception et direction des travaux pour des projets uniques, de la première esquisse jusqu'à la remise des clés. Une architecture pensée sur-mesure, durable et parfaitement intégrée à son environnement." }
];

const PROJECTS = [
  { code:'a01', title:'REFUGE BALLAND', typo:'LOGEMENT PRIVÉ', lieu:'Ikast — DANEMARK', annee:'',
    desc:"Imaginé pour un couple de retraités danois, ce pavillon à l'ossature bois rythmée et à la façade vitrée propose un dialogue épuré entre architecture et nature.\n\nConçu comme une lanterne dans la clairière, il invite à la contemplation et efface les frontières avec son environnement sauvage. Les espaces intérieurs sont aussi tournés vers les espaces extérieurs.",
    images:['Images/A01-REFUGE BALLAND/a01REFUGE BALLAND-Pers 01 bleue.webp','Images/A01-REFUGE BALLAND/a01REFUGE BALLAND-Plan 01 bleue.webp'] },
  { code:'a02', title:'VILLA CLAIRETTES', typo:'LOGEMENT PRIVÉ', lieu:'Saint-Raphaël — FRANCE', annee:'',
    desc:"Nous avons souhaité, pour ce projet situé dans le Var, atténuer la frontière entre l'intérieur et l'extérieur de la maison. Le percement de la façade côté jardin, orientée sud-est, a été modifié pour renforcer cette transition spatiale.\n\nLe jeu de niveaux de ces lieux créés permet, en conditions estivales, de masquer la transition entre la chambre parentale, le salon et le jardin.",
    images:['Images/A02-VILLA CLAIRETTES/a02VILLA CLAIRETTES-PERS clairettes bleue.webp','Images/A02-VILLA CLAIRETTES/a02VILLA CLAIRETTES-Plan villa clairettes Bleue.webp','Images/A02-VILLA CLAIRETTES/a02VILLA CLAIRETTES-Elev villa clairettes Bleue.webp'] },
  { code:'a03', title:'VILLA DEROUET', typo:'LOGEMENT PRIVÉ', lieu:'Orgeval — FRANCE', annee:'',
    desc:"Cette villa privée de 225 m² se déploie sur deux niveaux. Sa volumétrie a été pensée pour s'insérer harmonieusement dans un site complexe, où une topographie accidentée rencontre les exigences d'un Plan Local d'Urbanisme (PLU) rigoureux.\n\nLa maison vit en lien direct et permanent avec son environnement extérieur, grâce à de larges ouvertures rythmant l'ensemble de ses façades.",
    images:['Images/A03-VILLA DEROUET/a03VILLA DEROUET-DEROUET-Villa Derouet-Photo bleue.webp'] },
  { code:'a04', title:'LOFT DES GARDES', typo:'LOGEMENT PRIVÉ', lieu:'Meudon — FRANCE', annee:'',
    desc:"Sublimant l'héritage de ses façades polychromes en assemblage de briques traditionnelles, ce projet de réaménagement consiste à stratifier ce loft pour la création de 2 duplex tournés vers l'agglomération parisienne.\n\nUne renaissance architecturale où la lumière redessine les volumes intérieurs, tandis que les façades existantes permettent de raviver l'âme intemporelle de cette bâtisse d'exception.",
    images:['Images/A04-LOFT DES GARDES/a04MEUDON-Image base bleue.webp','Images/A04-LOFT DES GARDES/a04MEUDON-plan masse bleue.webp'] },
  { code:'a05', title:'ÉCURIE MOLLET', typo:'LOGEMENT PRIVÉ — PATRIMOINE', lieu:'Antony — FRANCE', annee:'',
    desc:"Les écuries de François Molé, sociétaire de la Comédie Française, sont inscrites à l'inventaire supplémentaire des monuments historiques.\n\nL'intervention consiste ici à transformer ce bâtiment équestre en un logement répondant aux exigences actuelles tout en préservant le caractère historique de cet édifice remarquable.",
    images:['Images/A05-ÉCURIE MOLLET/a05ANTONY-Mollet vue ext bleue.webp','Images/A05-ÉCURIE MOLLET/a05ANTONY-Mollet vue int bleue.webp'] },
  { code:'a06', title:'MAISON BOBILLOT', typo:'LOGEMENT PRIVÉ', lieu:'Paris 13e — FRANCE', annee:'',
    desc:"Située rue Bobillot, dans le 13e arrondissement de Paris, cette maison individuelle se déploie sur 4 niveaux.\n\nLa structure, en ossature bois déportée, permet la création de coursives et de casquettes, protégeant ainsi la façade principale, orientée plein ouest et sans vis-à-vis immédiat.",
    images:['Images/A06-MAISON BOBILLOT/a06BOBILLOT-Pers ext bleue.webp','Images/A06-MAISON BOBILLOT/a06BOBILLOT-élévation Bobillot bleue.webp'] },
  { code:'a07', title:'ÉCOLE HAXO', typo:'ÉTABLISSEMENT SCOLAIRE', lieu:'Paris 20e — FRANCE', annee:'',
    desc:"Le projet s'articule autour d'un socle affirmé qui permet l'accès au bâtiment, surmonté d'un volume surélevé qui met l'école en valeur tout en protégeant les enfants de l'effervescence de la rue.\n\nEnfin, les espaces extérieurs (ouvertures, terrasses et toiture) agissent comme des filtres. Ils mettent en scène et maîtrisent avec soin la transition entre le cocon protecteur de l'école et le monde extérieur.",
    images:['Images/A07-ÉCOLE HAXO/a07HAXO_Pers Int bleue.webp','Images/A07-ÉCOLE HAXO/a07HAXO_Coupe 3D.webp','Images/A07-ÉCOLE HAXO/a07HAXO_AXO eclatée.webp'] },
  { code:'a08', title:'BRASSERIE B', typo:'ERP — RESTAURANT', lieu:'Clamart — FRANCE', annee:'',
    desc:"Le projet s'articule autour d'un socle affirmé qui permet l'accès au bâtiment, surmonté d'un volume surélevé qui met le bâtiment en valeur tout en protégeant les usagers de l'effervescence de la rue.\n\nEnfin, les espaces extérieurs (ouvertures, terrasses et toiture) agissent comme des filtres. Ils mettent en scène et maîtrisent avec soin la transition entre l'intérieur et le monde extérieur.",
    images:['Images/A08-BRASSERIE CLAMART/a08BRASSERIE CLAMART-VUE INT bleue.webp','Images/A08-BRASSERIE CLAMART/a08BRASSERIE CLAMART-plan bleue.webp'] },
  { code:'a09', title:'MAISON GAMBLIN', typo:'LOGEMENT PRIVÉ', lieu:'Paris 9e — FRANCE', annee:'',
    desc:"Ce projet consiste à réaménager les espaces intérieurs d'une petite maison privée, nichée dans une dent creuse du 17e arrondissement de Paris.\n\nL'aménagement d'un jardin d'hiver en rez-de-chaussée vient compléter cette restructuration pour offrir un nouvel espace de vie lumineux dont le volume vient prolonger avec élégance les moulures et les ornements déjà présents sur la façade.",
    images:['Images/A09-MAISON GAMBLIN/a09GAMBLIN-pers ext bleue.webp'] },
  { code:'a10', title:'LOFT BERTHIER', typo:'LOGEMENT PRIVÉ', lieu:'Paris 17e — FRANCE', annee:'',
    desc:"Couronnant un édifice historique classé, ce réaménagement donne naissance à un toit-terrasse accessible pensé comme un jardin suspendu.\n\nRythmé par de délicats bacs végétalisés, ce nouveau belvédère offre une respiration sereine où la nature urbaine dialogue avec le prestige des vieilles pierres.",
    images:['Images/A10-LOFT BERTHIER/a10LOFT BERTHIER-Pers ext.webp'] },
  { code:'a11', title:'DIGUE DE PANDOP', typo:'INFRASTRUCTURE', lieu:'Koumac — NOUVELLE-CALÉDONIE', annee:'',
    desc:"Ce travail prospectif consiste à imaginer un pont dont la structure maîtrise les fluctuations maritimes.\n\nCe projet de « jetée habitée » a vocation d'anticiper le devenir de ce territoire incertain, qui risque d'être totalement transformé dans un futur relativement proche.\n\nNous proposons ici une architecture raisonnée qui s'ajustera aux différents phénomènes de submersion à venir. Il abritera aussi un centre de recherche océanographique et des habitations.",
    images:['Images/A11-DIGUE DE LA POINTE DE KOUMAC/a11KOUMAC-Pers ext bleue.webp','Images/A11-DIGUE DE LA POINTE DE KOUMAC/a11KOUMAC-plan bleue.webp'] },
  { code:'a12', title:'CASA MECA', typo:"HABITAT D'URGENCE", lieu:'Boquerón — PARAGUAY', annee:'',
    desc:"Imaginé pour des personnes en situation d'urgence, au Panama, nous avons conçu la Casa Meca sur une échelle de temporalité adaptée et adaptable à toutes ces populations.\n\nModularité, évolutivité, ergonomie, écologie caractérisent le projet. Sa structure simplifiée et répétitive permet une mise en œuvre rapide par un petit nombre de personnes.",
    images:['Images/A12-CASA MECA/a12CASA MECA-Pers bleue.webp','Images/A12-CASA MECA/a12CASA MECA-plan bleue.webp','Images/A12-CASA MECA/a12CASA MECA-Axo bleue.webp'] },
  { code:'i01', title:'REFUGE BUÉ', typo:'LOGEMENT PRIVÉ', lieu:'Choisy-le-Roi — FRANCE', annee:'',
    desc:"Pour ce projet, nous avons imaginé un espace hybride, dans ce lieu dépourvu de lumière naturelle, attenant au garage, pouvant servir d'espace de sport mais également d'espace salon multimédia. Ces usages antagonistes nous ont conduits à dessiner un espace à la fois modulable et pratique.\n\nIci, la matérialité dicte des lignes franches, subtilement soulignées par un éclairage chaleureux.",
    images:['Images/I01-REFUGE BUÉ/i01BUE-pers int bleue.webp','Images/I01-REFUGE BUÉ/i01BUE-pers int bleue 02.webp'] },
  { code:'i02', title:'ESCALIER VELA', typo:'LOGEMENT PRIVÉ', lieu:'Créteil — FRANCE', annee:'',
    desc:"Cet escalier en lamellé de bois contrecollé relie les deux niveaux de cette maison privée située dans la ville de Créteil.\n\nLe limon, en acier, est encastré dans le mur tandis qu'une partie de la structure déportée est suspendue par un système de lames, constituant également le garde-corps. Conçu en collaboration avec un BET structure, cet ouvrage a été usiné au sein même de notre agence et posé directement par nos soins, sur place.",
    images:['Images/I02-ESCALIER VELA/i02Esc Créteil - pers bleue.webp','Images/I02-ESCALIER VELA/i02Esc Créteil - Axo avant bleue.webp','Images/I02-ESCALIER VELA/i02Esc Créteil - Axo arrière bleue.webp'] },
  { code:'i03', title:'CO-WORKING HENRY V', typo:'TERTIAIRE / BUREAU', lieu:'Paris 4e — FRANCE', annee:'',
    desc:"Nous avons conçu nos bureaux, situés rue du Petit Musc, dans le 4e arrondissement de Paris.\n\nImaginé pour nous mais aussi pour accueillir 3 autres agences/BET, nous avons choisi de vitrer la quasi-totalité des espaces intérieurs. La répartition sur 3 niveaux (dont deux entresols) garantit l'intimité des espaces en optimisant les apports de lumière naturelle.",
    images:['Images/I03-BUREAU CO-WORKING HENRY V/i03Bureau fili bleue.webp'] },
  { code:'p01', title:'JARDINS COLLECTIFS MONTIGNY', typo:'PAYSAGE — ÉQUIPEMENT PUBLIC', lieu:'Montigny — FRANCE', annee:'',
    desc:"Nous souhaitons donner une impulsion à la commune, puisque l'appropriation de l'espace par les habitants du village favorisera l'implication dans l'évolution du projet imaginé par les habitants eux-mêmes.\n\nAutour du jardin et de la structure que nous avons imaginés, nous créons donc un outil de développement démocratique par lequel la population pourra répondre architecturalement aux défis futurs de Montigny.",
    images:['Images/P01-JARDINS COLLECTIFS MONTIGNY/p01MONTIGNY-plan_final.webp','Images/P01-JARDINS COLLECTIFS MONTIGNY/p01MONTIGNY-perspective_final.webp','Images/P01-JARDINS COLLECTIFS MONTIGNY/p01MONTIGNY-Phase 1.webp','Images/P01-JARDINS COLLECTIFS MONTIGNY/p01MONTIGNY-Phase 2.webp','Images/P01-JARDINS COLLECTIFS MONTIGNY/p01MONTIGNY-Phase 3.webp','Images/P01-JARDINS COLLECTIFS MONTIGNY/p01MONTIGNY-Phase 4.webp'] },
  { code:'p02', title:'JARDINS SUSPENDUS', typo:'PAYSAGE', lieu:'Paris 4e — FRANCE', annee:'',
    desc:"Le projet se situe sur la partie supérieure d'une courette et nous avons tout de suite fait le choix de masquer les six jours de souffrage massifs existants.\n\nEn réalisant des bacs de plantation périphériques harmonieux, on limite l'impact visuel de ces volumes. Au sol, un lamellage en bois composite achève de délimiter les espaces servis et les espaces servants, avec la composition d'un environnement végétal et paysagé harmonieux.",
    images:['Images/P02-JARDINS SUSPENDUS/p02Pers PRO.webp','Images/P02-JARDINS SUSPENDUS/p02Plan jardins suspendu bleue.webp'] }
];
