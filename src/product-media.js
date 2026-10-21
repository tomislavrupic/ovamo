// Real manufacturer photography and limited, source-checked product facts.
// Reviewed 2026-10-21. See docs/product-media-sources.md for original image URLs.
// Public concept presentation: no supplier relationship, image licence or live offer is implied.
// This module deliberately does not supply OVAMO prices, stock or wholesale case sizes.
const bi = (hr, en) => ({ hr, en });
const fact = (hrLabel, enLabel, hrValue, enValue = hrValue) => ({ label: bi(hrLabel, enLabel), value: bi(hrValue, enValue) });
const photo = (file, hr, en, sourceUrl, hrCaption, enCaption) => ({
  src: `./assets/products/${file}.webp`, alt: bi(hr, en), sourceUrl,
  caption: bi(hrCaption, enCaption),
});

const sources = {
  jana: 'https://www.jana-water.com/proizvod/mineralna-negazirana-voda/jana-staklo/',
  jamnica: 'https://www.jamnica.hr/proizvodi/novi-proizvodi/',
  jamnicaImages: 'https://jamnica.company/nasi-brendovi/jamnica-limunada-i-narancada/',
  sanpellegrino: 'https://www.sanpellegrino.com/beverages/aranciata-rossa',
  zigante: 'https://zigantetartufi.com/products/truffle-chips',
  nadalinaDark: 'https://www.nadalina.hr/product/dark-70/',
  nadalinaCarob: 'https://www.nadalina.hr/product/carob/',
  taman: 'https://tamanchocolates.com/trgovina/gourmet-cokolade/tamna-cokolada-62-50g-2/',
  delicia: 'https://delicia.hr/en/trgovina/svi-keksi/bio-cacao/',
};

export const productMedia = {
  'premium-jana-glass': {
    sourceUrl: sources.jana, sourceLabel: 'Jana / Jamnica plus',
    images: [photo('jana-glass-033', 'Jana, staklena boca 0,33 l', 'Jana, 0.33 L glass bottle', sources.jana, 'Fotografija: Jana / Jamnica plus.', 'Photo: Jana / Jamnica plus.')],
    facts: [fact('Vrsta', 'Type', 'Prirodna mineralna negazirana voda', 'Still natural mineral water'), fact('Volumen', 'Volume', '0,33 l', '0.33 L'), fact('Ambalaža', 'Packaging', 'Staklena boca', 'Glass bottle'), fact('Izvor', 'Source', 'Sveta Jana, Gorica Svetojanska')],
  },
  'premium-jamnica-limunada': {
    sourceUrl: sources.jamnica, sourceLabel: 'Jamnica plus',
    images: [
      photo('jamnica-limunada-cans', 'Jamnica Limunada desno i Narančada lijevo, limenke 0,33 l', 'Jamnica Limunada on the right and Narančada on the left, 0.33 L cans', sources.jamnicaImages, 'Fotografija: Jamnica plus. Limunada je desno; Narančada nije dio ovog artikla.', 'Photo: Jamnica plus. Limunada is on the right; Narančada is not part of this item.'),
      photo('jamnica-range', 'Službena fotografija asortimana Jamnica Limunade i Narančade u više pakiranja', 'Official Jamnica Limunada and Narančada range photo with several pack formats', sources.jamnicaImages, 'Prikaz linije proizvođača. Ovaj prijedlog odnosi se na limenku Limunade 0,33 l.', 'Manufacturer range view. This proposed item is the 0.33 L Limunada can.'),
    ],
    facts: [fact('Vrsta', 'Type', 'Gazirano bezalkoholno piće', 'Sparkling soft drink'), fact('Volumen', 'Volume', '0,33 l', '0.33 L'), fact('Ambalaža', 'Packaging', 'Limenka', 'Can'), fact('Voćni udio', 'Fruit content', '16 %')],
  },
  'premium-sanpellegrino-rossa': {
    sourceUrl: sources.sanpellegrino, sourceLabel: 'Sanpellegrino',
    images: [
      photo('sanpellegrino-rossa', 'Sanpellegrino Aranciata Rossa, limenka 33 cl', 'Sanpellegrino Aranciata Rossa, 33 cl can', sources.sanpellegrino, 'Fotografija limenke: Sanpellegrino.', 'Can photo: Sanpellegrino.'),
      photo('sanpellegrino-rossa-serving', 'Limenka Aranciata Rossa među crvenim narančama', 'Aranciata Rossa can among blood oranges', sources.sanpellegrino, 'Fotografija proizvođača: Aranciata Rossa 33 cl.', 'Manufacturer photo: Aranciata Rossa 33 cl.'),
    ],
    facts: [fact('Vrsta', 'Type', 'Gazirano bezalkoholno piće', 'Sparkling soft drink'), fact('Volumen', 'Volume', '33 cl / 330 ml'), fact('Okus', 'Flavour', 'Naranča i crvena naranča', 'Orange and blood orange'), fact('Voćni sok', 'Fruit juice', '10 % naranče + 5 % crvene naranče, iz koncentrata', '10% orange + 5% blood orange, from concentrate')],
  },
  'premium-zigante-truffle-chips': {
    sourceUrl: sources.zigante, sourceLabel: 'Zigante Tartufi',
    buyUrl: 'https://zigantetartufi.com/products/truffle-chips?variant=7195430354978',
    buyLabel: bi('Ponuda kod proizvođača', 'Shop at the manufacturer'),
    images: [
      photo('zigante-truffle-chips', 'Pakiranje Zigante Truffle Chips', 'Zigante Truffle Chips packaging', sources.zigante, 'Fotografija pakiranja: Zigante Tartufi.', 'Packaging photo: Zigante Tartufi.'),
      photo('zigante-truffle-chips-serving', 'Čips u zdjelici uz tartufe, prijedlog posluživanja proizvođača', 'Crisps in a bowl beside truffles, the manufacturer’s serving suggestion', sources.zigante, 'Prijedlog posluživanja. Zdjelica i svježi tartufi nisu dio pakiranja.', 'Serving suggestion. The bowl and fresh truffles are not included.'),
    ],
    facts: [fact('Neto količina', 'Net weight', '50 g'), fact('Vrsta', 'Type', 'Čips od krumpira s crnim tartufom', 'Potato crisps with black truffle'), fact('Tartuf', 'Truffle', 'Liofilizirani crni tartuf (Tuber aestivum), 0,5 %', 'Freeze-dried black truffle (Tuber aestivum), 0.5%')],
  },
  'premium-nadalina-dark': {
    sourceUrl: sources.nadalinaDark, sourceLabel: 'Chocolates Nadalina',
    images: [photo('nadalina-dark70', 'Nadalina Dark 70%, omot čokoladne pločice', 'Nadalina Dark 70%, chocolate bar wrapper', sources.nadalinaDark, 'Fotografija: Chocolates Nadalina.', 'Photo: Chocolates Nadalina.')],
    facts: [fact('Naziv proizvođača', 'Manufacturer name', 'Dark 70%'), fact('Kategorija', 'Category', 'Čokoladne pločice', 'Chocolate bars'), fact('Šifra proizvođača', 'Manufacturer SKU', '3858881589018'), fact('Gramaža', 'Net weight', 'Potrebna potvrda za aktualni proizvod', 'Confirmation needed for the current product')],
  },
  'premium-nadalina-carob': {
    sourceUrl: sources.nadalinaCarob, sourceLabel: 'Chocolates Nadalina',
    images: [photo('nadalina-carob', 'Nadalina Carob, omot tamne čokolade s rogačem', 'Nadalina Carob, dark chocolate with carob wrapper', sources.nadalinaCarob, 'Fotografija: Chocolates Nadalina.', 'Photo: Chocolates Nadalina.')],
    facts: [fact('Naziv proizvođača', 'Manufacturer name', 'Carob'), fact('Kategorija', 'Category', 'Čokoladne pločice', 'Chocolate bars'), fact('Šifra proizvođača', 'Manufacturer SKU', '3858881589094'), fact('Gramaža', 'Net weight', 'Potrebna potvrda za aktualni proizvod', 'Confirmation needed for the current product')],
  },
  'premium-taman-orange-thyme': {
    sourceUrl: sources.taman, sourceLabel: 'TAMAN Artisan & Craft čokolade',
    buyUrl: sources.taman, buyLabel: bi('Ponuda kod proizvođača', 'Shop at the manufacturer'),
    images: [photo('taman-orange-thyme', 'TAMAN tamna čokolada s narančom, paprom i timijanom, 50 g', 'TAMAN dark chocolate with orange, pepper and thyme, 50 g', sources.taman, 'Fotografija: TAMAN Artisan & Craft čokolade.', 'Photo: TAMAN Artisan & Craft čokolade.')],
    facts: [fact('Neto količina', 'Net weight', '50 g'), fact('Kakao dijelovi', 'Cocoa solids', 'Najmanje 62 %', 'At least 62%'), fact('Okusi', 'Flavours', 'Naranča, papar i timijan', 'Orange, pepper and thyme'), fact('Šifra proizvođača', 'Manufacturer SKU', '833')],
  },
  'premium-delicia-bio-cacao': {
    sourceUrl: sources.delicia, sourceLabel: 'Delicia',
    buyUrl: sources.delicia, buyLabel: bi('Ponuda kod proizvođača', 'Shop at the manufacturer'),
    images: [photo('delicia-bio-cacao', 'Delicia BIO CACAO, kutija keksa 125 g', 'Delicia BIO CACAO, 125 g biscuit box', sources.delicia, 'Fotografija: Delicia.', 'Photo: Delicia.')],
    facts: [fact('Neto količina', 'Net weight', '125 g'), fact('Brašno', 'Flour', 'Pirovo brašno', 'Spelt flour'), fact('Kakao prah', 'Cocoa powder', '5 %'), fact('Čuvanje', 'Storage', 'Na hladnom i suhom mjestu', 'Keep cool and dry')],
  },
};
