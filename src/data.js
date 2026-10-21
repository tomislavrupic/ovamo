// Fictional showcase data for the OVAMO static design demo.
// These are not actual SKUs, offers, prices, stock levels, or confirmed shop details.
export const demoNotice = {
  hr: 'Dizajnerski demo. Proizvodi, cijene i zalihe služe samo za prikaz. Kupnja nije dostupna.',
  en: 'Design demo. Products, prices and stock are illustrative. Purchasing is unavailable.',
};

export const categories = [
  { id: 'all', name: { hr: 'Sve', en: 'All' } },
  { id: 'drinks', name: { hr: 'Pića', en: 'Drinks' } },
  { id: 'snacks', name: { hr: 'Grickalice', en: 'Snacks' } },
  { id: 'gifts', name: { hr: 'Pokloni', en: 'Gifts' } },
  { id: 'souvenirs', name: { hr: 'Suveniri', en: 'Souvenirs' } },
];

export const products = [
  {
    id: 'sunny-mandarin',
    name: { hr: 'Sunčana mandarina', en: 'Sunny mandarin' },
    category: 'drinks',
    description: {
      hr: 'Bezalkoholno gazirano piće s mandarinom. Mala stanka u sunčanim bojama.',
      en: 'A non-alcoholic sparkling mandarin drink. A little pause in sunny colours.',
    },
    priceCents: 280,
    packSize: 6,
    wholesalePriceCents: 195,
    stock: 216,
    color: '#F39C73',
    illustration: 'can',
    badge: { hr: 'Osvježenje', en: 'Refreshment' },
  },
  {
    id: 'lemon-mint',
    name: { hr: 'Limun & menta', en: 'Lemon & mint' },
    category: 'drinks',
    description: {
      hr: 'Bezalkoholno piće s limunom i mentom, zamišljeno za lagane trenutke.',
      en: 'A non-alcoholic lemon and mint drink, imagined for easy moments.',
    },
    priceCents: 320,
    packSize: 6,
    wholesalePriceCents: 230,
    stock: 144,
    color: '#C7D7A5',
    illustration: 'bottle',
    badge: { hr: 'Svježi predah', en: 'A fresh pause' },
  },
  {
    id: 'sea-salt-chips',
    name: { hr: 'Čips s morskom soli', en: 'Sea salt chips' },
    category: 'snacks',
    description: {
      hr: 'Hrskavi zalogaji s morskom soli za izlet, druženje ili put do plaže.',
      en: 'Crisp sea-salt bites for a day out, a gathering or a walk to the beach.',
    },
    priceCents: 260,
    packSize: 12,
    wholesalePriceCents: 185,
    stock: 96,
    color: '#E8C46C',
    illustration: 'chips',
    badge: { hr: 'Nešto hrskavo', en: 'Something crunchy' },
  },
  {
    id: 'almond-chocolate',
    name: { hr: 'Čokolada & badem', en: 'Chocolate & almond' },
    category: 'snacks',
    description: {
      hr: 'Čokolada s komadićima badema. Sitnica za podijeliti ili sačuvati za sebe.',
      en: 'Chocolate with almond pieces. A little treat to share or keep for yourself.',
    },
    priceCents: 420,
    packSize: 10,
    wholesalePriceCents: 295,
    stock: 80,
    color: '#B893B0',
    illustration: 'chocolate',
    badge: { hr: 'Slatki trenutak', en: 'A sweet moment' },
  },
  {
    id: 'coastal-tote',
    name: { hr: 'Torba za usput', en: 'The everyday tote' },
    category: 'souvenirs',
    description: {
      hr: 'Platnena torba s ilustracijom obale. Za male kupnje i velike planove.',
      en: 'A canvas tote with a coastal illustration. For little finds and big plans.',
    },
    priceCents: 1290,
    packSize: 5,
    wholesalePriceCents: 850,
    stock: 36,
    color: '#E4C7A7',
    illustration: 'tote',
    badge: { hr: 'Ponesi sa sobom', en: 'Take it with you' },
  },
  {
    id: 'sea-postcard',
    name: { hr: 'Razglednica s mora', en: 'A postcard from the sea' },
    category: 'souvenirs',
    description: {
      hr: 'Ilustrirana razglednica za nekoliko lijepih riječi i malo morskog ugođaja.',
      en: 'An illustrated postcard for a few kind words and a little seaside feeling.',
    },
    priceCents: 190,
    packSize: 10,
    wholesalePriceCents: 90,
    stock: 120,
    color: '#9FC5C4',
    illustration: 'postcard',
    badge: { hr: 'Mala uspomena', en: 'A small keepsake' },
  },
  {
    id: 'little-joys-box',
    name: { hr: 'Kutija malih gušta', en: 'A box of little joys' },
    category: 'gifts',
    description: {
      hr: 'Zamišljeni poklon-paket s bezalkoholnim pićem, slatkim zalogajem i razglednicom.',
      en: 'An illustrative gift set with a non-alcoholic drink, a sweet treat and a postcard.',
    },
    priceCents: 2490,
    packSize: 4,
    wholesalePriceCents: 1750,
    stock: 24,
    color: '#E8998A',
    illustration: 'giftbox',
    badge: { hr: 'Za nekoga dragog', en: 'For someone special' },
  },
  {
    id: 'slow-days-notebook',
    name: { hr: 'Bilježnica laganih dana', en: 'The slow days notebook' },
    category: 'souvenirs',
    description: {
      hr: 'Bilježnica za ideje, popise i uspomene. Mjesto za ono što želiš zapamtiti.',
      en: 'A notebook for ideas, lists and memories. A place for things worth keeping.',
    },
    priceCents: 790,
    packSize: 6,
    wholesalePriceCents: 520,
    stock: 48,
    color: '#D7B6C2',
    illustration: 'notebook',
    badge: { hr: 'Zapiši trenutak', en: 'Keep the moment' },
  },
];

const locationNotice = {
  hr: 'Ilustrativni prikaz grada. Adresa i radno vrijeme bit će dodani nakon potvrde.',
  en: 'Illustrative city marker. Address and opening hours will be added once confirmed.',
};

// x/y are illustrative coordinates on a 0–100 display map, not geographic coordinates.
export const stores = [
  {
    id: 'split',
    city: 'Split',
    name: { hr: 'OVAMO · Split', en: 'OVAMO · Split' },
    address: null,
    hours: null,
    x: 59,
    y: 76,
    notice: { ...locationNotice },
  },
  {
    id: 'zadar',
    city: 'Zadar',
    name: { hr: 'OVAMO · Zadar', en: 'OVAMO · Zadar' },
    address: null,
    hours: null,
    x: 42,
    y: 58,
    notice: { ...locationNotice },
  },
];
