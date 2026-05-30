// data.jsx — shared content for Garcia Automobiles (vente véhicules d'occasion)
const AGENCIES = [
  { id: "mamoudzou", name: "Showroom Mamoudzou — Kawéni", short: "Mamoudzou", desc: "Zone industrielle de Kawéni", icon: "pin",
    address: "Zone industrielle de Kawéni, 97600 Mamoudzou", area: "Grande-Terre",
    hours: "Lun–Sam · 7h30–18h00", hoursNote: "Dimanche sur rendez-vous",
    phone: "0269 61 46 92", prebook: "269 627 627" },
  { id: "chirongui", name: "Showroom Chirongui — Sud", short: "Chirongui", desc: "Nouveau showroom, Sud de l'île", icon: "pin", isNew: true,
    address: "Centre de Chirongui, 97620 Chirongui", area: "Grande-Terre · Sud",
    hours: "Lun–Sam · 8h00–17h30", hoursNote: "Essai possible sur rendez-vous",
    phone: "269 627 627", prebook: "269 627 627" },
];

const FLEET = [
  { id: "clio", name: "Renault Clio IV", cat: "Citadine", catKey: "citadine", tag: "Économique et fiable, idéale en ville", img: "clio",
    specs: { year: "2019", km: "52 000 km", fuel: "Essence", trans: "Manuelle" }, price: 7900 },
  { id: "c3", name: "Citroën C3", cat: "Citadine", catKey: "citadine", tag: "Confort souple, faible kilométrage", img: "c3",
    specs: { year: "2020", km: "38 000 km", fuel: "Essence", trans: "Auto" }, price: 9500 },
  { id: "duster", name: "Dacia Duster 4x2", cat: "SUV", catKey: "suv", tag: "Robuste, à l'aise sur toutes les routes", img: "duster",
    specs: { year: "2021", km: "41 000 km", fuel: "Diesel", trans: "Manuelle" }, price: 14900 },
  { id: "jimny", name: "Suzuki Jimny 4x4", cat: "SUV", catKey: "suv", tag: "Compact, passe-partout, pistes du Sud", img: "jimny",
    specs: { year: "2020", km: "29 000 km", fuel: "Essence", trans: "Manuelle" }, price: 18500 },
  { id: "rav4", name: "Toyota RAV4 Hybride", cat: "SUV", catKey: "suv", tag: "Spacieux, économe, idéal familles", img: "rav4",
    specs: { year: "2022", km: "22 000 km", fuel: "Hybride", trans: "Auto" }, price: 27900 },
  { id: "kangoo", name: "Renault Kangoo", cat: "Utilitaire", catKey: "utilitaire", tag: "Volume malin pour artisans", img: "kangoo",
    specs: { year: "2019", km: "68 000 km", fuel: "Diesel", trans: "Manuelle" }, price: 10500 },
  { id: "jumpy", name: "Citroën Jumpy", cat: "Utilitaire", catKey: "utilitaire", tag: "Grand volume, chantiers et livraisons", img: "jumpy",
    specs: { year: "2020", km: "55 000 km", fuel: "Diesel", trans: "Manuelle" }, price: 16900 },
  { id: "master", name: "Renault Master L2H2", cat: "Utilitaire", catKey: "utilitaire", tag: "Déménagement et gros chantiers", img: "master",
    specs: { year: "2018", km: "89 000 km", fuel: "Diesel", trans: "Manuelle" }, price: 19900 },
  { id: "tucson", name: "Hyundai Tucson", cat: "SUV", catKey: "suv", tag: "Élégant, confortable, longue route", img: "tucson",
    specs: { year: "2021", km: "34 000 km", fuel: "Diesel", trans: "Auto" }, price: 21500 },
];

const FILTERS = [
  { key: "all", label: "Tous les véhicules" },
  { key: "citadine", label: "Citadines" },
  { key: "suv", label: "SUV / 4x4" },
  { key: "utilitaire", label: "Utilitaires" },
];

const FAQ = [
  { q: "Les véhicules sont-ils contrôlés avant la vente ?", a: "Oui. Chaque véhicule passe par un contrôle technique complet avant mise en vente. Nous vous fournissons le rapport d'état, l'historique d'entretien et le carnet de bord. Aucune mauvaise surprise après l'achat." },
  { q: "Proposez-vous un financement ?", a: "Oui, nous travaillons avec des partenaires financiers locaux pour vous proposer des solutions de crédit adaptées à votre budget. Simulation gratuite sur place ou par téléphone." },
  { q: "Puis-je faire un essai avant d'acheter ?", a: "Bien sûr. L'essai routier est inclus pour tout véhicule, sur rendez-vous dans l'un de nos showrooms. Prenez le temps de tester le véhicule dans les conditions réelles de l'île." },
  { q: "Reprenez-vous mon ancien véhicule ?", a: "Oui, nous proposons une reprise de votre véhicule actuel, estimée gratuitement sur place. Le montant de la reprise peut être déduit directement du prix d'achat de votre nouveau véhicule." },
  { q: "Quelle garantie est incluse ?", a: "Tous nos véhicules sont vendus avec une garantie panne moteur/boîte de vitesses de 6 mois minimum. Des extensions de garantie jusqu'à 24 mois sont disponibles selon le véhicule." },
  { q: "Les démarches administratives sont-elles incluses ?", a: "Nous nous occupons de toutes les formalités : certificat de cession, demande d'immatriculation, contrôle technique si nécessaire. Vous repartez avec votre véhicule sans stress administratif." },
];

const CONTACTS = {
  mainPhone: "269 627 627",
  mamoudzou: "0269 61 46 92",
  whatsapp: "262639690206",
};

const STEPS = [
  { n: "01", icon: "car", title: "Choisissez votre véhicule", desc: "Parcourez notre catalogue en ligne ou visitez l'un de nos showrooms. Filtrez par budget, type ou kilométrage." },
  { n: "02", icon: "calendar", title: "Prenez rendez-vous", desc: "Contactez-nous par téléphone ou WhatsApp. On organise l'essai et la visite du véhicule à votre convenance." },
  { n: "03", icon: "shield", title: "Repartez propriétaire", desc: "Signature, formalités administratives, remise des clés — tout se règle chez nous. Simple et rapide." },
];

const STATS = [
  { v: "12 ans", l: "d'expérience à Mayotte" },
  { v: "200+", l: "véhicules vendus / an" },
  { v: "6 mois", l: "de garantie incluse" },
  { v: "2", l: "showrooms sur l'île" },
];

const TESTIMONIALS = [
  { name: "Camille R.", role: "Acheteuse · Mamoudzou", rating: 5, img: "avis-camille",
    text: "J'ai trouvé mon Duster en parfait état à un prix honnête. L'essai s'est fait le lendemain, les papiers étaient prêts en 48h. Équipe sérieuse et à l'écoute." },
  { name: "Anrafa M.", role: "Artisan · Kawéni", rating: 5, img: "avis-anrafa",
    text: "Deuxième utilitaire acheté chez Garcia. Toujours du matériel bien entretenu, zéro surprise après l'achat. Le financement a été arrangé rapidement, je recommande." },
  { name: "Sophie L.", role: "Fonctionnaire · mutée", rating: 5, img: "avis-sophie",
    text: "Arrivée en mutation, j'avais besoin d'un véhicule fiable rapidement. Ils m'ont trouvé une C3 en très bon état dans mon budget. Formalités gérées en un jour." },
];

const VEHICLE_TYPES = [
  { key: "citadine", label: "Citadine" },
  { key: "suv", label: "SUV / 4x4" },
  { key: "utilitaire", label: "Utilitaire" },
];

Object.assign(window, { AGENCIES, FLEET, FILTERS, FAQ, CONTACTS, VEHICLE_TYPES, STEPS, STATS, TESTIMONIALS });
