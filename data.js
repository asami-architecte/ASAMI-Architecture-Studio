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

const PROJECTS = [
  { code:'a01', title:'REFUGE BALLAND', typo:'LOGEMENT PRIVÉ', lieu:'Ikast — DANEMARK', annee:'',
    desc:"Imaginé pour un couple de retraités danois, ce pavillon à l'ossature bois rythmée et à la façade vitrée propose un dialogue épuré entre architecture et nature.\n\nConçu comme une lanterne dans la clairière, il invite à la contemplation et efface les frontières avec son environnement sauvage. Les espaces intérieurs sont aussi tournés vers les espaces extérieurs.",
    images:['https://i.ibb.co/F4Ys5FLt/a01-REFUGE-BALLAND-Pers-01-bleue.jpg','https://i.ibb.co/5bsC3kM/a01-REFUGE-BALLAND-Plan-01-bleue.jpg'] },
  { code:'a02', title:'VILLA CLAIRETTES', typo:'LOGEMENT PRIVÉ', lieu:'Saint-Raphaël — FRANCE', annee:'',
    desc:"Nous avons souhaité, pour ce projet situé dans le Var, atténuer la frontière entre l'intérieur et l'extérieur de la maison. Le percement de la façade côté jardin, orientée sud-est, a été modifié pour renforcer cette transition spatiale.\n\nLe jeu de niveaux de ces lieux créés permet, en conditions estivales, de masquer la transition entre la chambre parentale, le salon et le jardin.",
    images:['https://i.ibb.co/Dfv6JMns/a02-VILLA-CLAIRETTES-PERS-clairettes-bleue.jpg','https://i.ibb.co/Dfn1W28p/a02-VILLA-CLAIRETTES-Plan-villa-clairettes-Bleue.jpg','https://i.ibb.co/JwbMT3rg/a02-VILLA-CLAIRETTES-Elev-villa-clairettes-Bleue.jpg'] },
  { code:'a03', title:'VILLA DEROUET', typo:'LOGEMENT PRIVÉ', lieu:'Orgeval — FRANCE', annee:'',
    desc:"Cette villa privée de 225 m² se déploie sur deux niveaux. Sa volumétrie a été pensée pour s'insérer harmonieusement dans un site complexe, où une topographie accidentée rencontre les exigences d'un Plan Local d'Urbanisme (PLU) rigoureux.\n\nLa maison vit en lien direct et permanent avec son environnement extérieur, grâce à de larges ouvertures rythmant l'ensemble de ses façades.",
    images:['https://i.ibb.co/M59k1sPY/a03-VILLA-DEROUET-DEROUET-Villa-Derouet-Photo-bleue.jpg'] },
  { code:'a04', title:'LOFT DES GARDES', typo:'LOGEMENT PRIVÉ', lieu:'Meudon — FRANCE', annee:'',
    desc:"Sublimant l'héritage de ses façades polychromes en assemblage de briques traditionnelles, ce projet de réaménagement consiste à stratifier ce loft pour la création de 2 duplex tournés vers l'agglomération parisienne.\n\nUne renaissance architecturale où la lumière redessine les volumes intérieurs, tandis que les façades existantes permettent de raviver l'âme intemporelle de cette bâtisse d'exception.",
    images:['https://i.ibb.co/yBRKM3sd/a04-MEUDON-Image-base-bleue.jpg','https://i.ibb.co/3YzQzN5M/a04-MEUDON-plan-masse-bleue.jpg'] },
  { code:'a05', title:'ÉCURIE MOLLET', typo:'LOGEMENT PRIVÉ — PATRIMOINE', lieu:'Antony — FRANCE', annee:'',
    desc:"Les écuries de François Molé, sociétaire de la Comédie Française, sont inscrites à l'inventaire supplémentaire des monuments historiques.\n\nL'intervention consiste ici à transformer ce bâtiment équestre en un logement répondant aux exigences actuelles tout en préservant le caractère historique de cet édifice remarquable.",
    images:['https://i.ibb.co/6cwXvLSQ/a05-ANTONY-Mollet-vue-ext-bleue.jpg','https://i.ibb.co/SwHBJGnQ/a05-ANTONY-Mollet-vue-int-bleue.jpg'] },
  { code:'a06', title:'MAISON BOBILLOT', typo:'LOGEMENT PRIVÉ', lieu:'Paris 13e — FRANCE', annee:'',
    desc:"Située rue Bobillot, dans le 13e arrondissement de Paris, cette maison individuelle se déploie sur 4 niveaux.\n\nLa structure, en ossature bois déportée, permet la création de coursives et de casquettes, protégeant ainsi la façade principale, orientée plein ouest et sans vis-à-vis immédiat.",
    images:['https://i.ibb.co/rJX8mVR/a06-BOBILLOT-Pers-ext-bleue.jpg','https://i.ibb.co/399gXhLN/a06-BOBILLOT-l-vation-Bobillot-bleue.jpg'] },
  { code:'a07', title:'ÉCOLE HAXO', typo:'ÉTABLISSEMENT SCOLAIRE', lieu:'Paris 20e — FRANCE', annee:'',
    desc:"Le projet s'articule autour d'un socle affirmé qui permet l'accès au bâtiment, surmonté d'un volume surélevé qui met l'école en valeur tout en protégeant les enfants de l'effervescence de la rue.\n\nEnfin, les espaces extérieurs (ouvertures, terrasses et toiture) agissent comme des filtres. Ils mettent en scène et maîtrisent avec soin la transition entre le cocon protecteur de l'école et le monde extérieur.",
    images:['https://i.ibb.co/v4NR4zk0/a07-HAXO-Pers-Int-bleue.jpg','https://i.ibb.co/DfPw042B/a07-HAXO-Coupe-3-D.jpg','https://i.ibb.co/ccdfqvVW/a07-HAXO-AXO-eclat-e.jpg'] },
  { code:'a08', title:'BRASSERIE B', typo:'ERP — RESTAURANT', lieu:'Clamart — FRANCE', annee:'',
    desc:"Le projet s'articule autour d'un socle affirmé qui permet l'accès au bâtiment, surmonté d'un volume surélevé qui met le bâtiment en valeur tout en protégeant les usagers de l'effervescence de la rue.\n\nEnfin, les espaces extérieurs (ouvertures, terrasses et toiture) agissent comme des filtres. Ils mettent en scène et maîtrisent avec soin la transition entre l'intérieur et le monde extérieur.",
    images:['https://i.ibb.co/BK6qFNWK/a08-BRASSERIE-CLAMART-VUE-INT-bleue.jpg','https://i.ibb.co/LDt5QgXK/a08-BRASSERIE-CLAMART-plan-bleue.jpg'] },
  { code:'a09', title:'MAISON GAMBLIN', typo:'LOGEMENT PRIVÉ', lieu:'Paris 9e — FRANCE', annee:'',
    desc:"Ce projet consiste à réaménager les espaces intérieurs d'une petite maison privée, nichée dans une dent creuse du 17e arrondissement de Paris.\n\nL'aménagement d'un jardin d'hiver en rez-de-chaussée vient compléter cette restructuration pour offrir un nouvel espace de vie lumineux dont le volume vient prolonger avec élégance les moulures et les ornements déjà présents sur la façade.",
    images:['https://i.ibb.co/krkFrwF/a09-GAMBLIN-pers-ext-bleue.png'] },
  { code:'a10', title:'LOFT BERTHIER', typo:'LOGEMENT PRIVÉ', lieu:'Paris 17e — FRANCE', annee:'',
    desc:"Couronnant un édifice historique classé, ce réaménagement donne naissance à un toit-terrasse accessible pensé comme un jardin suspendu.\n\nRythmé par de délicats bacs végétalisés, ce nouveau belvédère offre une respiration sereine où la nature urbaine dialogue avec le prestige des vieilles pierres.",
    images:['https://i.ibb.co/67RbmZts/a10-LOFT-BERTHIER-Pers-ext.jpg'] },
  { code:'a11', title:'DIGUE DE PANDOP', typo:'INFRASTRUCTURE', lieu:'Koumac — NOUVELLE-CALÉDONIE', annee:'',
    desc:"Ce travail prospectif consiste à imaginer un pont dont la structure maîtrise les fluctuations maritimes.\n\nCe projet de « jetée habitée » a vocation d'anticiper le devenir de ce territoire incertain, qui risque d'être totalement transformé dans un futur relativement proche.\n\nNous proposons ici une architecture raisonnée qui s'ajustera aux différents phénomènes de submersion à venir. Il abritera aussi un centre de recherche océanographique et des habitations.",
    images:['https://i.ibb.co/wZs9rQ5m/a11-KOUMAC-Pers-ext-bleue.jpg','https://i.ibb.co/v6RFrY74/a11-KOUMAC-plan-bleue.jpg'] },
  { code:'a12', title:'CASA MECA', typo:"HABITAT D'URGENCE", lieu:'Boquerón — PARAGUAY', annee:'',
    desc:"Imaginé pour des personnes en situation d'urgence, au Panama, nous avons conçu la Casa Meca sur une échelle de temporalité adaptée et adaptable à toutes ces populations.\n\nModularité, évolutivité, ergonomie, écologie caractérisent le projet. Sa structure simplifiée et répétitive permet une mise en œuvre rapide par un petit nombre de personnes.",
    images:['https://i.ibb.co/Rk3tbFm7/a12-CASA-MECA-Pers-bleue.jpg','https://i.ibb.co/5xctmWWG/a12-CASA-MECA-plan-bleue.jpg','https://i.ibb.co/v4VnbjSh/a12-CASA-MECA-Axo-bleue.jpg'] },
  { code:'i01', title:'REFUGE BUÉ', typo:'LOGEMENT PRIVÉ', lieu:'Choisy-le-Roi — FRANCE', annee:'',
    desc:"Pour ce projet, nous avons imaginé un espace hybride, dans ce lieu dépourvu de lumière naturelle, attenant au garage, pouvant servir d'espace de sport mais également d'espace salon multimédia. Ces usages antagonistes nous ont conduits à dessiner un espace à la fois modulable et pratique.\n\nIci, la matérialité dicte des lignes franches, subtilement soulignées par un éclairage chaleureux.",
    images:['https://i.ibb.co/HLxg1T9L/i01-BUE-pers-int-bleue.jpg','https://i.ibb.co/P2T5sr1/i01-BUE-pers-int-bleue-02.jpg'] },
  { code:'i02', title:'ESCALIER VELA', typo:'LOGEMENT PRIVÉ', lieu:'Créteil — FRANCE', annee:'',
    desc:"Cet escalier en lamellé de bois contrecollé relie les deux niveaux de cette maison privée située dans la ville de Créteil.\n\nLe limon, en acier, est encastré dans le mur tandis qu'une partie de la structure déportée est suspendue par un système de lames, constituant également le garde-corps. Conçu en collaboration avec un BET structure, cet ouvrage a été usiné au sein même de notre agence et posé directement par nos soins, sur place.",
    images:['https://i.ibb.co/YBgykhLM/i02-Esc-Cr-teil-pers-bleue.jpg','https://i.ibb.co/zHT46gKB/i02-Esc-Cr-teil-Axo-avant-bleue.png','https://i.ibb.co/Q3p3N2TW/i02-Esc-Cr-teil-Axo-arri-re-bleue.jpg'] },
  { code:'i03', title:'CO-WORKING HENRY V', typo:'TERTIAIRE / BUREAU', lieu:'Paris 4e — FRANCE', annee:'',
    desc:"Nous avons conçu nos bureaux, situés rue du Petit Musc, dans le 4e arrondissement de Paris.\n\nImaginé pour nous mais aussi pour accueillir 3 autres agences/BET, nous avons choisi de vitrer la quasi-totalité des espaces intérieurs. La répartition sur 3 niveaux (dont deux entresols) garantit l'intimité des espaces en optimisant les apports de lumière naturelle.",
    images:['https://i.ibb.co/HLJ3hhkZ/i03-Bureau-fili-bleue.jpg'] },
  { code:'p01', title:'JARDINS COLLECTIFS MONTIGNY', typo:'PAYSAGE — ÉQUIPEMENT PUBLIC', lieu:'Montigny — FRANCE', annee:'',
    desc:"Nous souhaitons donner une impulsion à la commune, puisque l'appropriation de l'espace par les habitants du village favorisera l'implication dans l'évolution du projet imaginé par les habitants eux-mêmes.\n\nAutour du jardin et de la structure que nous avons imaginés, nous créons donc un outil de développement démocratique par lequel la population pourra répondre architecturalement aux défis futurs de Montigny.",
    images:['https://i.ibb.co/dJfSNZmJ/p01-MONTIGNY-plan-final.jpg','https://i.ibb.co/JRdBBmNQ/p01-MONTIGNY-perspective-final.jpg','https://i.ibb.co/bMy3tX9H/p01-MONTIGNY-Phase-1.jpg','https://i.ibb.co/W4tyb1Yc/p01-MONTIGNY-Phase-2.jpg','https://i.ibb.co/1YZsQyxJ/p01-MONTIGNY-Phase-3.jpg','https://i.ibb.co/N5Jv2fh/p01-MONTIGNY-Phase-4.jpg'] },
  { code:'p02', title:'JARDINS SUSPENDUS', typo:'PAYSAGE', lieu:'Paris 4e — FRANCE', annee:'',
    desc:"Le projet se situe sur la partie supérieure d'une courette et nous avons tout de suite fait le choix de masquer les six jours de souffrage massifs existants.\n\nEn réalisant des bacs de plantation périphériques harmonieux, on limite l'impact visuel de ces volumes. Au sol, un lamellage en bois composite achève de délimiter les espaces servis et les espaces servants, avec la composition d'un environnement végétal et paysagé harmonieux.",
    images:['https://i.ibb.co/chJYpRbT/p02-Pers-PRO.jpg','https://i.ibb.co/Vc3tg5BS/p02-Plan-jardins-suspendu-bleue.jpg'] }
];
