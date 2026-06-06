/* ============================================
   JC Tours — Fauna data
   Single source of truth for the hero spotlight,
   the wildlife carousel and the per-tour species.
   Add a new species by appending one object here.

   Fields:
     id          unique slug
     comunEs     common name (Spanish)
     comunEn     common name (English)
     cientifico  scientific name (shown in italics)
     img         path relative to site root
     tipo        'ave' | 'mamifero' | ...
     tours       which tours it can be seen on: 'day' | 'night' | 'private'
     destacada   true -> appears in the hero spotlight rotation
     porConfirmar true -> data still to be confirmed with Juan Carlos
   ============================================ */

const FAUNA = [
  { id:'quetzal',             comunEs:'Quetzal resplandeciente',       comunEn:'Resplendent Quetzal',          cientifico:'Pharomachrus mocinno',       img:'images/fauna/wildlife-quetzal.jpeg',           tipo:'ave',      tours:['day','private'],        destacada:true,  porConfirmar:false },
  { id:'sabrewing',           comunEs:'Ala de sable viol&aacute;ceo',  comunEn:'Violet Sabrewing',             cientifico:'Campylopterus hemileucurus', img:'images/fauna/wildlife-hummingbird-violet.jpeg', tipo:'ave',     tours:['day','private'],        destacada:true,  porConfirmar:false },
  { id:'emerald',             comunEs:'Esmeralda cabecicobriza',       comunEn:'Coppery-headed Emerald',       cientifico:'Microchera cupreiceps',      img:'images/fauna/wildlife-hummingbird-green.jpeg',  tipo:'ave',     tours:['day'],                  destacada:false, porConfirmar:false },
  { id:'hawk',                comunEs:'Gavil&aacute;n aludo',          comunEn:'Broad-winged Hawk',            cientifico:'Buteo platypterus',          img:'images/fauna/wildlife-hawk.jpeg',              tipo:'ave',      tours:['private'],              destacada:false, porConfirmar:false },
  { id:'tucan-pico-iris',     comunEs:'Tuc&aacute;n pico iris',        comunEn:'Keel-billed Toucan',           cientifico:'Ramphastos sulfuratus',      img:'images/fauna/tucan-pico-iris.jpg',             tipo:'ave',      tours:['day','private'],        destacada:true,  porConfirmar:false },
  { id:'colibri-gorgimorado', comunEs:'Colibr&iacute; monta&ntilde;&eacute;s gorgimorado', comunEn:'Purple-throated Mountain-gem', cientifico:'Lampornis calolaemus', img:'images/fauna/colibri-gorgimorado.jpg', tipo:'ave', tours:['day','private'], destacada:true,  porConfirmar:false },
  { id:'soterrey-cucarachero',comunEs:'Soterrey cucarachero',          comunEn:'House Wren',                   cientifico:'Troglodytes aedon',          img:'images/fauna/soterrey-cucarachero.jpg',        tipo:'ave',      tours:['day','private'],        destacada:false, porConfirmar:false },
  { id:'guatusa',             comunEs:'Guatusa',                       comunEn:'Central American Agouti',      cientifico:'Dasyprocta punctata',        img:'images/fauna/guatusa.jpg',                     tipo:'mamifero', tours:['day','night','private'], destacada:false, porConfirmar:false }
  // Pending photos / confirmation with Juan Carlos (append when ready):
  // { id:'mosquerito-monudo', comunEs:'Mosquerito monudo', comunEn:'Tufted Flycatcher', cientifico:'Mitrephanes phaeocercus', img:'images/fauna/mosquerito-monudo.jpg', tipo:'ave', tours:['day'], destacada:false, porConfirmar:true },
  // { id:'carpintero',        comunEs:'Carpintero', comunEn:'Woodpecker', cientifico:'Melanerpes sp.', img:'images/fauna/carpintero.jpg', tipo:'ave', tours:['day'], destacada:false, porConfirmar:true },
  // { id:'ave-parda',         comunEs:'Ave parda (por confirmar)', comunEn:'Brown bird (to confirm)', cientifico:'', img:'images/fauna/ave-parda.jpg', tipo:'ave', tours:['day'], destacada:false, porConfirmar:true }
];

/* Helpers shared by the spotlight / carousel / per-tour blocks */
const FaunaData = {
  all() { return FAUNA.filter(f => !f.porConfirmar); },
  featured() { return FAUNA.filter(f => f.destacada && !f.porConfirmar); },
  forTour(tourId) { return FAUNA.filter(f => !f.porConfirmar && f.tours.includes(tourId)); },
  name(f, lang) { return lang === 'es' ? f.comunEs : f.comunEn; }
};
