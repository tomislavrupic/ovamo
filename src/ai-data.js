// Authored public examples only. These figures are not company records.
// Role filtering demonstrates a proposed UX; it is not authentication or access control.
const pair = (hr, en) => ({ hr, en });

export const roles = [
  { id: 'owner', name: pair('Vlasnica', 'Owner'), location: pair('Sve poslovnice', 'All stores'), description: pair('Ogledni pristup prodaji, zalihama, nabavi i financijama svih lokacija.', 'Sample access to sales, stock, purchasing and finances across all locations.'), scenarios: ['overview', 'stock', 'purchase', 'cashflow', 'documents', 'support'] },
  { id: 'manager', name: pair('Voditelj poslovnice', 'Store manager'), location: pair('Zadar', 'Zadar'), description: pair('Ogledni pristup zalihi Zadra, raspoloživosti skladišta i odgovorima kupcima. Bez nabavnih cijena i financija tvrtke.', 'Sample access to Zadar stock, warehouse availability and customer replies. No purchasing costs or company finances.'), scenarios: ['stock', 'support'] },
  { id: 'buyer', name: pair('Nabava', 'Purchasing'), location: pair('Skladište i poslovnice', 'Warehouse & stores'), description: pair('Ogledni pristup zalihama i nabavnim cijenama. Priprema prijedloge koje odobrava ovlaštena osoba.', 'Sample access to inventory and purchasing costs. Prepares proposals for an authorised person to approve.'), scenarios: ['purchase', 'stock'] },
  { id: 'finance', name: pair('Računovodstvo', 'Accounting'), location: pair('Dokumenti i novčani tok', 'Documents & cash flow'), description: pair('Ogledni pristup dokumentima, potraživanjima i obvezama. Bez promjene cjenika ili slanja narudžbi.', 'Sample access to documents, receivables and obligations. No price-list changes or supplier order submission.'), scenarios: ['cashflow', 'documents'] },
];

export const scenarioLabels = {
  overview: pair('Tjedni pregled', 'Weekly overview'), stock: pair('Nadopuna Zadra', 'Replenish Zadar'),
  purchase: pair('Prijedlog nabave', 'Purchase proposal'), cashflow: pair('Novčani tok', 'Cash flow'),
  documents: pair('Provjera računa', 'Invoice check'), support: pair('Odgovor kupcu', 'Customer reply'),
};

export const demoRecords = {
  sales: [ { store: 'Split', netSales: 7680, costOfGoods: 4640 }, { store: 'Zadar', netSales: 4800, costOfGoods: 3220 } ],
  stock: { store: 14, warehouseAvailable: 240, dailySales: 6, caseSize: 24, transferCases: 2 },
  purchase: [ { hr: 'Premium tonik', en: 'Premium tonic', cases: 4, caseSize: 24, unitCents: 180 }, { hr: 'Bademi 100 g', en: 'Almonds 100 g', cases: 6, caseSize: 24, unitCents: 125 }, { hr: 'Magnet — obala', en: 'Coastal magnet', cases: 3, caseSize: 12, unitCents: 320 } ],
  cash: { opening: 5200, receivables: 3500, suppliers: 4100, operating: 2300 },
};

export function getScenario(id, roleId, language = 'hr', delayed = false) {
  const role = roles.find(item => item.id === roleId);
  if (!role || !role.scenarios.includes(id)) throw new RangeError('Scenario is outside the selected demo role.');
  const en = language === 'en';
  const t = (hr, english) => en ? english : hr;
  const number = (value, digits = 0) => new Intl.NumberFormat(en ? 'en-GB' : 'hr-HR', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
  const euro = value => `${number(value, Number.isInteger(value) ? 0 : 2)} €`;
  const base = { id, metrics: [], rows: [], columns: [], notes: [], action: null, cashToggle: false, source: '', period: t('Ogledni presjek: 21. 10. 2026. u 08:00.', 'Sample snapshot: 21 Oct 2026, 08:00.') };
  const draft = (title, body, result) => ({ title, body, result, canApprove: roleId === 'owner', needsOwner: roleId !== 'owner' });

  if (id === 'overview') {
    const sales = demoRecords.sales.reduce((sum, row) => sum + row.netSales, 0);
    const costs = demoRecords.sales.reduce((sum, row) => sum + row.costOfGoods, 0);
    const gross = sales - costs;
    return { ...base,
      question: t('Kako smo poslovali ovaj tjedan, po poslovnicama?', 'How did we do this week, by store?'),
      title: t('Evo pregleda oglednog tjedna.', 'Here is the sample weekly overview.'),
      intro: t('Prodaja i nabavna vrijednost prodane robe, 14.–20. 10. 2026.', 'Sales and cost of goods sold, 14–20 Oct 2026.'),
      metrics: [ { label: t('Prodaja bez PDV-a', 'Net sales, excluding VAT'), value: euro(sales), note: t('nakon povrata', 'after returns') }, { label: t('Bruto dobit', 'Gross profit'), value: euro(gross), note: t('prodaja − nabavna vrijednost robe', 'sales − cost of goods sold') }, { label: t('Bruto marža', 'Gross margin'), value: `${number(gross / sales * 100, 1)} %`, note: t('bruto dobit / prodaja', 'gross profit / sales') } ],
      text: t('Split u ovom primjeru ostvaruje višu bruto maržu od Zadra. Sljedeći korak bio bi usporediti prodajni miks, odobrene popuste i nabavne cijene po artiklu.', 'Split has a higher gross margin than Zadar in this example. A useful next step would be to compare product mix, approved discounts and purchasing costs by item.'),
      columns: [t('Poslovnica', 'Store'), t('Prodaja', 'Sales'), t('Bruto dobit', 'Gross profit'), t('Bruto marža', 'Gross margin')],
      rows: demoRecords.sales.map(row => [row.store, euro(row.netSales), euro(row.netSales - row.costOfGoods), `${number((row.netSales - row.costOfGoods) / row.netSales * 100, 1)} %`]),
      notes: [t(`Nabavna vrijednost prodane robe: ${euro(costs)}. Bruto dobit ne oduzima plaće, najam, režije i ostale troškove; nije neto dobit.`, `Cost of goods sold: ${euro(costs)}. Gross profit does not deduct payroll, rent, utilities or other expenses; it is not net profit.`)],
      source: t('Ogledni POS izvještaj + nabavna vrijednost prodane robe. Sve brojke u ovom prikazu su izmišljene.', 'Sample POS report + cost of goods sold. All figures in this view are fictional.'),
    };
  }

  if (id === 'stock') {
    const s = demoRecords.stock;
    const transfer = s.caseSize * s.transferCases;
    return { ...base,
      question: t('Što trebamo nadopuniti u Zadru prije vikenda?', 'What should we replenish in Zadar before the weekend?'),
      title: t('Bademi 100 g trebaju pažnju.', 'Almonds 100 g need attention.'),
      intro: t('Ogledni artikl GRI-104 · poslovnica Zadar', 'Sample SKU GRI-104 · Zadar store'),
      metrics: [ { label: t('Trenutačna zaliha', 'Current store stock'), value: `${s.store} ${t('kom', 'units')}` }, { label: t('Procijenjeno pokriće', 'Estimated stock cover'), value: `${number(s.store / s.dailySales, 1)} ${t('dana', 'days')}`, note: t('uz 6 komada dnevno', 'at 6 units per day') }, { label: t('Prijedlog prijenosa', 'Proposed transfer'), value: `${transfer} ${t('kom', 'units')}`, note: t('2 pakiranja × 24', '2 cases × 24') } ],
      text: t(`Skladište u primjeru ima ${s.warehouseAvailable} raspoloživih komada. Prijenosom ${transfer} komada Zadar bi nakon primitka imao ${s.store + transfer}, a raspoloživa zaliha skladišta nakon otpreme iznosila bi ${s.warehouseAvailable - transfer} komada.`, `The sample warehouse has ${s.warehouseAvailable} available units. Transferring ${transfer} units would bring Zadar to ${s.store + transfer} after receipt, and warehouse availability to ${s.warehouseAvailable - transfer} after dispatch.`),
      notes: [t('Prijedlog i njegovo odobrenje sami ne mijenjaju fizičku zalihu. Sustav zasebno bilježi potvrđenu otpremu, robu u prijenosu i primitak.', 'A proposal and its approval do not change physical stock by themselves. The system separately records confirmed dispatch, goods in transit and receipt.')],
      action: draft(t('Nacrt prijenosa · skladište → Zadar', 'Transfer draft · warehouse → Zadar'), t('GRI-104 · Bademi 100 g · 2 pakiranja × 24 = 48 komada. Prije izvršenja provjeriti aktualnu raspoloživost i potvrditi otpremu/primitak.', 'GRI-104 · Almonds 100 g · 2 cases × 24 = 48 units. Recheck current availability before execution and confirm dispatch/receipt.'), t('U stvarnom sustavu slijedio bi nalog za prijenos. Zaliha bi se promijenila tek kroz otpremu i primitak.', 'In production, a transfer instruction would follow. Stock would change only through dispatch and receipt.')),
      source: t('Ogledna kartica artikla + promet po lokaciji. Raspoloživost skladišta prikazana je bez nabavnih cijena.', 'Sample item ledger + sales by location. Warehouse availability is shown without purchasing costs.'),
    };
  }

  if (id === 'purchase') {
    const totalCents = demoRecords.purchase.reduce((sum, row) => sum + row.cases * row.caseSize * row.unitCents, 0);
    const cases = demoRecords.purchase.reduce((sum, row) => sum + row.cases, 0);
    const total = totalCents / 100;
    return { ...base,
      question: t('Pripremi prijedlog nabave do 600 €, u punim pakiranjima.', 'Prepare a purchasing proposal up to €600, in full cases.'),
      title: t('Tri stavke unutar oglednog budžeta.', 'Three lines within the sample budget.'),
      intro: t('Primjer prijedloga nadopune · izmišljeni dobavljač', 'Example replenishment proposal · fictional supplier'),
      metrics: [ { label: t('Vrijednost robe', 'Goods value'), value: euro(total), note: t('bez PDV-a i dostave', 'excluding VAT and delivery') }, { label: t('Puna pakiranja', 'Full cases'), value: `${cases}` }, { label: t('Do limita robe', 'Remaining goods budget'), value: euro(600 - total) } ],
      columns: [t('Artikl', 'Item'), t('Pak. × kom.', 'Cases × units'), t('Trošak robe', 'Goods cost')],
      rows: demoRecords.purchase.map(row => [en ? row.en : row.hr, `${row.cases} × ${row.caseSize}`, euro(row.cases * row.caseSize * row.unitCents / 100)]),
      text: t('Prijedlog poštuje pakiranja i ogledni limit za robu. U stvarnom radu količine bi se računale iz prodaje, trenutačne zalihe, otvorenih narudžbi i roka isporuke.', 'The proposal respects case sizes and the sample goods budget. Production quantities would use sales, current inventory, open orders and supplier lead times.'),
      notes: [t('PDV i dostava ovdje nisu obračunani. Prije slanja trebaju se potvrditi konačan iznos, dobavljačeva ponuda, raspoloživost i rok.', 'VAT and delivery are not calculated here. Confirm the final total, supplier quote, availability and lead time before sending.')],
      action: draft(t('Nacrt narudžbenice · 3 stavke', 'Purchase-order draft · 3 lines'), t(`13 punih pakiranja · roba ${euro(total)} bez PDV-a i dostave. Ogledni limit robe 600 €. Potvrda konačnih uvjeta i vlasnice prije slanja.`, `13 full cases · goods ${euro(total)}, excluding VAT and delivery. Sample goods budget €600. Final terms and owner approval required before sending.`), t('U stvarnom sustavu tek nakon provjere konačnih uvjeta slijedilo bi odobreno slanje dobavljaču.', 'In production, authorised submission to the supplier would follow only after final terms were checked.')),
      source: t('Ogledni artikli, pakiranja i nabavne cijene. Ovo nije stvarna ponuda dobavljača.', 'Sample items, case sizes and purchasing costs. This is not an actual supplier quote.'),
    };
  }

  if (id === 'cashflow') {
    const c = demoRecords.cash;
    const inflow = delayed ? 0 : c.receivables;
    const closing = c.opening + inflow - c.suppliers - c.operating;
    return { ...base, cashToggle: true,
      question: t('Koliko nam ostaje nakon obveza u sljedećih 14 dana?', 'How much cash remains after obligations over the next 14 days?'),
      title: delayed ? t('Kašnjenje naplate stvara manjak.', 'Late collections create a shortfall.') : t('Prema oglednom planu ostaje 2.300 €.', 'The sample plan leaves €2,300.'),
      intro: t('Scenarij novčanog toka · 21. 10. – 3. 11. 2026.', 'Cash-flow scenario · 21 Oct – 3 Nov 2026'),
      metrics: [ { label: t('Početno stanje', 'Opening cash'), value: euro(c.opening) }, { label: t('Očekivana naplata', 'Expected collections'), value: euro(inflow) }, { label: t('Projekcija završnog stanja', 'Projected closing cash'), value: euro(closing), note: delayed ? t('manjak u ovom scenariju', 'shortfall in this scenario') : t('ako se naplata ostvari', 'if collections arrive') } ],
      columns: [t('Stavka plana', 'Plan item'), t('Primitak / izdatak', 'Inflow / outflow')],
      rows: [ [t('Početno stanje', 'Opening cash'), euro(c.opening)], [t('Naplata kupaca', 'Customer collections'), `+ ${euro(inflow)}`], [t('Obveze dobavljačima', 'Supplier obligations'), `− ${euro(c.suppliers)}`], [t('Ostali planirani izdaci', 'Other planned outgoings'), `− ${euro(c.operating)}`] ],
      text: delayed ? t('Ako se svih 3.500 € očekivanih uplata pomakne izvan ovog razdoblja, projekcija pada na −1.200 €. To je signal za pregled rokova plaćanja i potrebne pričuve.', 'If all €3,500 of expected collections move beyond this period, the projection falls to −€1,200. That signals a need to review payment timing and required reserves.') : t('Završno stanje ovisi o stvarnoj naplati i potpunosti evidentiranih izdataka. Usporedi scenarij kašnjenja pomoću prekidača ispod.', 'Closing cash depends on actual collections and a complete record of outgoings. Compare a late-payment scenario using the control below.'),
      notes: [t('Novčani tok prikazuje primitke i izdatke. Ne predstavlja dobit niti jamstvo budućeg stanja računa.', 'Cash flow tracks money received and paid. It is neither profit nor a guarantee of a future bank balance.')],
      source: t('Izmišljeno početno stanje + ogledna dospijeća kupaca i dobavljača + plan izdataka. Nema veze s bankom.', 'Fictional opening balance + sample customer and supplier due dates + outgoings plan. No bank connection.'),
    };
  }

  if (id === 'documents') {
    return { ...base,
      question: t('Odgovaraju li ulazni računi primljenoj robi?', 'Do the supplier invoices match the goods received?'),
      title: t('Jednu razliku treba provjeriti.', 'One difference needs review.'),
      intro: t('Ogledno usklađivanje 3 ulazna dokumenta', 'Sample reconciliation of 3 incoming documents'),
      metrics: [ { label: t('Dokumenti u primjeru', 'Example documents'), value: '3' }, { label: t('Usklađene količine', 'Matched quantities'), value: '2' }, { label: t('Za provjeru', 'Needs review'), value: '1' } ],
      columns: [t('Dokument', 'Document'), t('Račun', 'Invoice'), t('Primka', 'Receipt')],
      rows: [ ['DEMO-UL-101', t('48 kom', '48 units'), t('48 kom', '48 units')], ['DEMO-UL-102', t('24 kom', '24 units'), t('24 kom', '24 units')], ['DEMO-UL-103', t('24 kom', '24 units'), t('22 kom', '22 units')] ],
      text: t('Na dokumentu DEMO-UL-103 zaračunata su 24 komada, a potvrđeni primitak iznosi 22. Razlika je 2 komada. Pripremio bih upit za provjeru prije obrade tog dokumenta.', 'DEMO-UL-103 bills 24 units, but confirmed receipt is 22. The difference is 2 units. I would prepare a clarification request before processing that document.'),
      notes: [t('Usklađena količina ne potvrđuje poreznu ili računovodstvenu ispravnost. Knjiženje i izdavanje dokumenata pripada povezanom poslovnom sustavu.', 'Matching quantities does not establish tax or accounting correctness. Posting and document issuance belong in the connected business system.')],
      action: draft(t('Nacrt upita o razlici', 'Discrepancy query draft'), t('Molimo provjeru dokumenta DEMO-UL-103: račun navodi 24 komada, a primka 22. Možete li potvrditi razlog razlike od 2 komada i predložiti ispravak?', 'Please check document DEMO-UL-103: the invoice lists 24 units and the goods receipt 22. Could you confirm the reason for the 2-unit difference and propose a correction?'), t('U stvarnom sustavu upit bi prošao dogovoreno odobrenje prije slanja. Račun nije automatski knjižen.', 'In production, the query would follow agreed approval rules before sending. The invoice has not been automatically posted.')),
      source: t('Tri izmišljena ulazna računa + potvrđene ogledne primke.', 'Three fictional incoming invoices + confirmed sample goods receipts.'),
    };
  }

  return { ...base,
    question: t('Pripremi odgovor kupcu: imate li poklon paket u Zadru?', 'Draft a reply: do you have the gift set in Zadar?'),
    title: t('Odgovor iz odobrene informacije.', 'A reply based on approved information.'),
    intro: t('Primjer podrške · bez osobnih podataka kupca', 'Support example · no customer personal data'),
    metrics: [ { label: t('Ogledni proizvod', 'Sample product'), value: t('Poklon paket', 'Gift set') }, { label: t('Zaliha u Zadru', 'Zadar stock'), value: t('8 kom', '8 units') }, { label: t('Presjek podatka', 'Data snapshot'), value: '08:00', note: '21. 10. 2026.' } ],
    text: t('Asistent bi koristio odobreni katalog i dostupno stanje poslovnice. Za podatke o konkretnoj narudžbi prvo bi trebalo potvrditi identitet kupca i njegov pristup.', 'The assistant would use the approved catalogue and available store stock. Access to a specific order would first require verifying the customer’s identity and permissions.'),
    notes: [t('Raspoloživost nije rezervacija. Prije obećanja preuzimanja treba provjeriti svježinu stanja i dogovoriti potvrdu poslovnice.', 'Availability is not a reservation. Check stock freshness and arrange store confirmation before promising collection.')],
    action: draft(t('Nacrt odgovora kupcu', 'Customer reply draft'), t('Prema oglednom stanju od 21. 10. u 08:00 u Zadru je dostupno 8 OVAMO poklon paketa. Za preuzimanje je potrebna potvrda poslovnice. Ovaj tekst služi demonstraciji.', 'According to the sample stock record from 21 Oct at 08:00, 8 OVAMO gift sets are available in Zadar. Collection needs store confirmation. This text is for demonstration only.'), t('U stvarnom sustavu slijedilo bi odobreno slanje kroz odabrani kanal podrške, uz provjeru aktualne raspoloživosti.', 'In production, authorised sending through the selected support channel would follow after checking current availability.')),
    source: t('Ogledni katalog + izmišljeno stanje poslovnice Zadar. Nema povezanog razgovora s kupcem.', 'Sample catalogue + fictional Zadar inventory. No customer conversation is connected.'),
  };
}

export function getConnection(client, language = 'hr') {
  const t = (hr, en) => language === 'en' ? en : hr;
  if (client === 'ovamo') return {
    title: t('OVAMO → tvoj AI asistent', 'OVAMO → your AI assistant'),
    steps: [ [t('Prijaviš se u OVAMO', 'Sign in to OVAMO'), t('Svojim poslovnim računom, na računalu ili mobitelu.', 'Use your company account, on desktop or mobile.')], [t('Sustav prepoznaje tvoje ovlasti', 'The system applies your permissions'), t('Dodijeljenu ulogu, poslovnice i dopuštene radnje.', 'Your assigned role, stores and allowed actions.')], [t('Otvoriš asistenta i pitaš', 'Open the assistant and ask'), t('Odgovor koristi odobrene poslovne podatke i pokazuje izvor.', 'Answers use authorised business data and show their source.')] ],
  };
  if (!['claude', 'chatgpt'].includes(client)) throw new RangeError('Unknown connection preview.');
  const name = client === 'claude' ? 'Claude' : 'ChatGPT';
  return {
    title: `${name} → OVAMO`,
    steps: [ [t(`Dodaš OVAMO u ${name}`, `Add OVAMO to ${name}`), t('Kad integracija bude izrađena i dostupna za tvoj račun ili radni prostor.', 'Once the integration is built and available for your account or workspace.')], [t('Prijaviš se na OVAMO i odobriš pristup', 'Sign in to OVAMO and authorise access'), t('Prijava se odvija na OVAMO stranici. Lozinku ne upisuješ u razgovor s AI-jem.', 'Sign-in happens on the OVAMO page. You do not type your password into the AI conversation.')], [t('Pitaš u svom AI alatu', 'Ask in your AI tool'), t('MCP prenosi dopuštene upite i radnje. OVAMO pri svakom zahtjevu provjerava tvoje ovlasti.', 'MCP carries the permitted queries and actions. OVAMO checks your permissions on every request.')] ],
  };
}
