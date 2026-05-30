// data.jsx — shared content for Garcia Location
const AGENCIES = [
  { id: "mamoudzou", name: "Mamoudzou — Kawéni", short: "Mamoudzou", desc: "À 600 m de la barge", icon: "pin",
    address: "Zone industrielle de Kawéni, 97600 Mamoudzou", area: "Grande-Terre",
    hours: "Lun–Sam · 7h30–18h00", hoursNote: "Dimanche sur rendez-vous",
    phone: "0269 61 46 92", prebook: "269 627 627" },
  { id: "aeroport", name: "Aéroport — Dzaoudzi-Pamandzi", short: "Aéroport", desc: "Petite-Terre, sortie arrivées", icon: "pin",
    address: "Aéroport de Mayotte, 97615 Pamandzi", area: "Petite-Terre",
    hours: "7j/7 · selon les vols", hoursNote: "Accueil à l'arrivée des avions",
    phone: "0269 60 54 95", prebook: "0639 69 02 06" },
  { id: "chirongui", name: "Chirongui — Zone Sud", short: "Chirongui", desc: "Nouvelle agence, Sud de l'île", icon: "pin", isNew: true,
    address: "Centre de Chirongui, 97620 Chirongui", area: "Grande-Terre · Sud",
    hours: "Lun–Sam · 8h00–17h30", hoursNote: "Réservation centrale conseillée",
    phone: "269 627 627", prebook: "269 627 627" },
];

const FLEET = [
  { id: "clio", name: "Renault Clio", cat: "Citadine", catKey: "citadine", tag: "Maniable en ville, économe", img: "clio",
    specs: { trans: "Manuelle", doors: "5 portes", seats: "5 places", ac: "Climatisation" }, price: 39 },
  { id: "c3", name: "Citroën C3", cat: "Citadine", catKey: "citadine", tag: "Confort souple pour le quotidien", img: "c3",
    specs: { trans: "Auto", doors: "5 portes", seats: "5 places", ac: "Climatisation" }, price: 42 },
  { id: "duster", name: "Dacia Duster 4x2", cat: "SUV", catKey: "suv", tag: "À l'aise sur les routes de l'île", img: "duster",
    specs: { trans: "Manuelle", doors: "5 portes", seats: "5 places", ac: "Climatisation" }, price: 59 },
  { id: "jimny", name: "Suzuki Jimny 4x4", cat: "SUV", catKey: "suv", tag: "Compact et passe-partout, pistes du Sud", img: "jimny",
    specs: { trans: "Manuelle", doors: "3 portes", seats: "4 places", ac: "Climatisation" }, price: 69 },
  { id: "rav4", name: "Toyota RAV4 Hybride", cat: "SUV", catKey: "suv", tag: "Spacieux, idéal familles & pros", img: "rav4",
    specs: { trans: "Auto", doors: "5 portes", seats: "5 places", ac: "Climatisation" }, price: 89 },
  { id: "kangoo", name: "Renault Kangoo", cat: "Utilitaire", catKey: "utilitaire", tag: "Volume malin pour artisans", img: "kangoo",
    specs: { trans: "Manuelle", doors: "Hayon", seats: "3 places", ac: "Climatisation" }, price: 55 },
  { id: "jumpy", name: "Citroën Jumpy", cat: "Utilitaire", catKey: "utilitaire", tag: "Grand volume, livraisons", img: "jumpy",
    specs: { trans: "Manuelle", doors: "Latérale", seats: "3 places", ac: "Climatisation" }, price: 72 },
  { id: "master", name: "Renault Master L2H2", cat: "Utilitaire", catKey: "utilitaire", tag: "Déménagement & gros chantiers", img: "master",
    specs: { trans: "Manuelle", doors: "Latérale", seats: "3 places", ac: "Climatisation" }, price: 95 },
  { id: "tucson", name: "Hyundai Tucson", cat: "SUV", catKey: "suv", tag: "Élégant et confortable, longue route", img: "tucson",
    specs: { trans: "Auto", doors: "5 portes", seats: "5 places", ac: "Climatisation" }, price: 79 },
];

const FILTERS = [
  { key: "all", label: "Toute la flotte" },
  { key: "citadine", label: "Citadines" },
  { key: "suv", label: "SUV" },
  { key: "utilitaire", label: "Utilitaires" },
];

const FAQ = [
  { q: "Quel âge faut-il pour louer un véhicule ?", a: "Le conducteur doit avoir au moins 21 ans et détenir un permis de conduire valide depuis plus de 2 ans. Pour certains SUV et utilitaires, l'âge minimum est porté à 23 ans. Une majoration « jeune conducteur » peut s'appliquer en dessous de 25 ans." },
  { q: "Quel est le montant de la caution ?", a: "La caution est pré-autorisée sur la carte bancaire du conducteur principal au retrait du véhicule : de 800 € pour une citadine à 1 500 € pour un utilitaire. Elle est restituée sous 7 jours après restitution du véhicule, sans dommage." },
  { q: "Le plein d'essence est-il inclus ?", a: "Le véhicule est remis avec le plein. Vous le restituez avec le plein effectué. À défaut, le carburant manquant vous est facturé au tarif local en vigueur, majoré de frais de service. Des stations partenaires sont indiquées près de chaque agence." },
  { q: "Le kilométrage est-il vraiment illimité ?", a: "Oui. Tous nos forfaits incluent le kilométrage illimité sur l'ensemble de Mayotte (Grande-Terre et Petite-Terre), sans surprise. Parcourez l'île librement, de Mamoudzou à Chirongui." },
  { q: "Puis-je récupérer le véhicule à l'aéroport et le rendre à Mamoudzou ?", a: "Oui, l'aller simple entre nos agences est possible (Aéroport, Mamoudzou, Chirongui). Précisez l'agence de retour lors de la pré-réservation ; des frais d'inter-agence réduits peuvent s'appliquer selon le trajet." },
  { q: "Que comprend l'assistance 24/7 ?", a: "Une ligne dédiée joignable à toute heure en cas de panne, crevaison ou accident, partout sur l'île. Dépannage et véhicule de remplacement organisés rapidement pour ne pas gâcher votre séjour ou votre activité." },
];

const CONTACTS = {
  prebookMamoudzou: "269 627 627",
  prebookAeroport: "0639 69 02 06",
  agenceMamoudzou: "0269 61 46 92",
  agenceAeroport: "0269 60 54 95",
};

const STEPS = [
  { n: "01", icon: "calendar", title: "Pré-réservez en ligne", desc: "Choisissez vos agences de départ et de retour, vos dates et votre véhicule. En 2 minutes, sans paiement en ligne." },
  { n: "02", icon: "msg", title: "On confirme la dispo", desc: "Notre équipe vous rappelle sous quelques heures pour valider la disponibilité et répondre à vos questions." },
  { n: "03", icon: "car", title: "Récupérez les clés", desc: "Présentez-vous à l'agence — à la barge, à l'aéroport ou dans le Sud. Véhicule prêt, plein fait, et c'est parti." },
];

const STATS = [
  { v: "12 ans", l: "de location à Mayotte" },
  { v: "3", l: "agences sur l'île" },
  { v: "24/7", l: "assistance partout" },
  { v: "∞", l: "kilométrage illimité" },
];

const TESTIMONIALS = [
  { name: "Camille R.", role: "Touriste · métropole", rating: 5, img: "avis-camille",
    text: "Récupération à l'aéroport à la descente de l'avion, voiture climatisée et nickel. On a fait le tour de l'île sans stresser le kilométrage. Service au top." },
  { name: "Anrafa M.", role: "Artisan · Mamoudzou", rating: 5, img: "avis-anrafa",
    text: "Je loue régulièrement un utilitaire pour mes chantiers. Toujours dispo, bien entretenu, et l'équipe dépanne vite quand j'ai un imprévu. Loueur local fiable." },
  { name: "Sophie L.", role: "Fonctionnaire · mutée", rating: 5, img: "avis-sophie",
    text: "Arrivée en mutation, j'avais besoin d'un véhicule rapidement. Pré-réservation simple, tarif dégressif sur le mois. La nouvelle agence de Chirongui m'arrange beaucoup." },
];

const VEHICLE_TYPES = [
  { key: "citadine", label: "Citadine" },
  { key: "suv", label: "SUV / 4x4" },
  { key: "utilitaire", label: "Utilitaire" },
];

Object.assign(window, { AGENCIES, FLEET, FILTERS, FAQ, CONTACTS, VEHICLE_TYPES, STEPS, STATS, TESTIMONIALS });
