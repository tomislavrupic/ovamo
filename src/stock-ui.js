// Render-only views for the isolated stock and customer-support simulations.
// Event handling belongs to app.js; these views never send data or issue documents.
export const stockSteps = [
  { id: 'receive-demo', type: 'receive', quantity: 10, packSize: 24 },
  { id: 'dispatch-demo', type: 'dispatch', quantity: 48 },
  { id: 'accept-demo', type: 'accept', quantity: 48 },
  { id: 'sell-demo', type: 'sell', quantity: 3 },
];

const html = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

const text = {
  hr: {
    kicker: 'OVAMO OPERATIVA',
    title: 'Jedan artikl. Cijeli tijek.',
    introduction: 'Od zaprimanja kartona do prodaje komada. Isprobaj četiri povezana koraka i prati svaku promjenu.',
    simulation: 'Simulacija skeniranja',
    isolated: 'Jedan izmišljeni artikl · odvojeno od demo kataloga',
    product: 'Bezalkoholno piće',
    pack: '1 karton = 24 komada',
    physical: 'Fizički ukupno',
    physicalNote: 'Skladište + na putu + trgovina',
    units: 'komada',
    balances: 'Stanje demo artikla',
    warehouse: 'Skladište',
    inTransit: 'Na putu',
    shop: 'Trgovina',
    sold: 'Neto prodano',
    warehouseNote: 'Roba prije otpreme',
    inTransitNote: 'Otpremljeno, čeka prihvat',
    shopNote: 'Zaprimljeno u trgovini',
    soldNote: 'Prodaja umanjena za povrate',
    sequence: 'Simuliraj radni dan',
    completed: 'Dovršeni koraci',
    confirmed: 'Potvrđeno',
    ready: 'Sljedeći korak',
    waiting: 'Čeka prethodni korak',
    repeatStep: 'Ponovi potvrdu',
    replay: 'Ponovi zadnju potvrdu',
    reset: 'Počni ponovno',
    replayNote: 'Isti ID događaja obrađuje se jednom. Ponovljena potvrda ne mijenja zalihu.',
    ledger: 'Trag svake promjene',
    records: 'Zapisi',
    eventColumn: 'Događaj',
    quantityColumn: 'Kom.',
    orderColumn: 'Red.',
    ledgerEmptyTitle: 'Dnevnik je spreman.',
    ledgerEmpty: 'Započni prijamom 10 kartona. Ovdje će se pojaviti potvrđeni demo događaji.',
    eventNames: {
      receive: 'Prijam u skladište',
      dispatch: 'Otprema prema trgovini',
      accept: 'Prihvat u trgovini',
      sell: 'POS prodaja',
      return: 'Povrat u prodajnu zalihu',
    },
    unknownEvent: 'Nepoznat događaj',
    documents: 'Dokumenti prate robu.',
    documentNotice: 'Ilustrativni statusi. Stvarni računi se ne izdaju.',
    incoming: 'Ulazni račun / primka',
    matchPending: 'Čeka usklađivanje',
    receivePending: 'Čeka prijam',
    incomingReceived: 'Prijam je evidentiran u demu. Usklađivanje s dobavljačevim računom nije provedeno.',
    incomingWaiting: 'Prijam robe pokrenut će prikaz predloženog usklađivanja dokumenta.',
    outgoing: 'Račun za POS prodaju',
    draftReady: 'Demo nacrt spreman',
    salePending: 'Čeka POS prodaju',
    outgoingReady: 'Predloženi nacrt za demo prodaju 3 komada. Račun nije izdan.',
    outgoingWaiting: 'Dovrši demo prodaju da vidiš promjenu statusa nacrta.',
    transmission: 'Slanje i fiskalizacija',
    disconnected: 'Nije povezano',
    transmissionNote: 'ERP, eRačun posrednik i fiskalizacija nisu povezani s ovim prikazom.',
    scaleTitle: 'Plan za 2.000+ artikala',
    scaleNote: 'Pretraga po SKU-u i barkodu, pakiranja, lokacije, lotovi i redovi iznimaka. Ovaj izolirani primjer provjerava tijek jednog artikla.',
    steps: [
      { title: 'Zaprimi 10 kartona', detail: '10 × 24 = 240 komada', action: 'Potvrdi prijam', effect: 'Skladište +240' },
      { title: 'Pošalji 48 komada', detail: 'Iz skladišta prema trgovini', action: 'Potvrdi otpremu', effect: 'Skladište → na putu' },
      { title: 'Prihvati 48 komada', detail: 'Trgovina potvrđuje primitak', action: 'Potvrdi prihvat', effect: 'Na putu → trgovina' },
      { title: 'Prodaj 3 komada', detail: 'Simulacija potvrđene POS prodaje', action: 'Potvrdi POS prodaju', effect: 'Trgovina −3 · prodano +3' },
    ],
    supportKicker: 'KORISNIČKA PODRŠKA',
    supportTitle: 'Jasan odgovor. Prava provjera.',
    supportIntroduction: 'Tri pripremljena scenarija prikazuju kako bi podrška trebala postupiti. Odgovori nisu generirani AI-jem.',
    supportBadge: 'SIMULACIJA · AI NIJE POVEZAN',
    supportChoose: 'Odaberi primjer pitanja',
    supportCustomer: 'Primjer upita kupca',
    supportAgent: 'OVAMO podrška · primjer odgovora',
    supportSource: 'Izvor: unaprijed napisan demo scenarij. Stvarni poslovni podaci nisu dohvaćeni.',
    supportBoundary: 'U produkciji: provjereni podaci i ovlasti za pristup narudžbi. Sporne situacije preuzima djelatnik.',
    supportQuestions: {
      inventory: {
        label: 'Dostupnost artikla',
        question: 'Ima li ovog artikla u Splitu?',
        answer: 'U ovoj simulaciji nemam pristup stvarnoj zalihi. Za točnu dostupnost potrebna je potvrda iz poslovnog sustava ili provjera djelatnika.',
        nextTitle: 'Prije stvarnog odgovora',
        next: 'Provjeriti artikl, poslovnicu i vrijeme zadnje sinkronizacije. Ako podatak nije potvrđen, uključiti djelatnika.',
      },
      order: {
        label: 'Status narudžbe',
        question: 'Gdje je moja narudžba?',
        answer: 'Ovdje ne mogu provjeriti narudžbu. U stvarnoj usluzi najprije se potvrđuje identitet kupca, a zatim prikazuju samo narudžbe kojima taj kupac smije pristupiti.',
        nextTitle: 'Identitet prije detalja',
        next: 'Broj narudžbe sam po sebi nije provjera identiteta. Ovaj demo ne traži niti prikazuje osobne podatke.',
      },
      refund: {
        label: 'Povrat i reklamacija',
        question: 'Kako pokrenuti povrat?',
        answer: 'Zahtjev za povrat u stvarnoj podršci pregledava ovlašteni djelatnik prema potvrđenim pravilima trgovine. Ovaj primjer ne odobrava povrat robe ni povrat novca.',
        nextTitle: 'Djelatnik potvrđuje odluku',
        next: 'Podrška može pomoći objasniti postupak i pripremiti zahtjev. Iznimke i financijske promjene preuzima ovlaštena osoba.',
      },
    },
  },
  en: {
    kicker: 'OVAMO OPERATIONS',
    title: 'One item. The complete flow.',
    introduction: 'From receiving cartons to selling individual units. Try four connected steps and follow every movement.',
    simulation: 'Scanning simulation',
    isolated: 'One fictional item · separate from the demo catalog',
    product: 'Non-alcoholic soft drink',
    pack: '1 carton = 24 units',
    physical: 'Total physical stock',
    physicalNote: 'Warehouse + in transit + shop',
    units: 'units',
    balances: 'Demo item balances',
    warehouse: 'Warehouse',
    inTransit: 'In transit',
    shop: 'Shop',
    sold: 'Net sold',
    warehouseNote: 'Stock before dispatch',
    inTransitNote: 'Dispatched, awaiting receipt',
    shopNote: 'Received at the shop',
    soldNote: 'Sales less accepted returns',
    sequence: 'Simulate a working day',
    completed: 'Steps completed',
    confirmed: 'Confirmed',
    ready: 'Next step',
    waiting: 'Waiting for the previous step',
    repeatStep: 'Repeat confirmation',
    replay: 'Repeat the last confirmation',
    reset: 'Start again',
    replayNote: 'Each event ID is processed once. Repeating a confirmation does not change stock.',
    ledger: 'A record of every movement',
    records: 'Records',
    eventColumn: 'Event',
    quantityColumn: 'Units',
    orderColumn: 'No.',
    ledgerEmptyTitle: 'The ledger is ready.',
    ledgerEmpty: 'Start by receiving 10 cartons. Confirmed demo events will appear here.',
    eventNames: {
      receive: 'Warehouse receipt',
      dispatch: 'Dispatch to the shop',
      accept: 'Receipt at the shop',
      sell: 'POS sale',
      return: 'Return to sellable shop stock',
    },
    unknownEvent: 'Unknown event',
    documents: 'Documents follow the goods.',
    documentNotice: 'Illustrative statuses. No real invoices are issued.',
    incoming: 'Supplier invoice / goods receipt',
    matchPending: 'Awaiting reconciliation',
    receivePending: 'Awaiting receipt',
    incomingReceived: 'The receipt is recorded in the demo. It has not been reconciled with a supplier invoice.',
    incomingWaiting: 'Receiving goods will show the proposed document reconciliation step.',
    outgoing: 'Invoice for the POS sale',
    draftReady: 'Demo draft ready',
    salePending: 'Awaiting a POS sale',
    outgoingReady: 'A proposed draft for the demo sale of 3 units. No invoice has been issued.',
    outgoingWaiting: 'Complete the demo sale to see the draft status change.',
    transmission: 'Transmission and fiscalization',
    disconnected: 'Not connected',
    transmissionNote: 'ERP, e-invoicing and fiscalization services are not connected to this view.',
    scaleTitle: 'The plan for 2,000+ items',
    scaleNote: 'SKU and barcode search, pack conversions, locations, lots and exception queues. This isolated example demonstrates the flow of one item.',
    steps: [
      { title: 'Receive 10 cartons', detail: '10 × 24 = 240 units', action: 'Confirm receipt', effect: 'Warehouse +240' },
      { title: 'Dispatch 48 units', detail: 'From the warehouse to the shop', action: 'Confirm dispatch', effect: 'Warehouse → in transit' },
      { title: 'Accept 48 units', detail: 'The shop confirms arrival', action: 'Confirm arrival', effect: 'In transit → shop' },
      { title: 'Sell 3 units', detail: 'Simulated confirmed POS sale', action: 'Confirm POS sale', effect: 'Shop −3 · sold +3' },
    ],
    supportKicker: 'CUSTOMER SUPPORT',
    supportTitle: 'A clear answer. A proper check.',
    supportIntroduction: 'Three prepared scenarios show how support should respond. These answers are not generated by AI.',
    supportBadge: 'SIMULATION · AI NOT CONNECTED',
    supportChoose: 'Choose a sample question',
    supportCustomer: 'Sample customer question',
    supportAgent: 'OVAMO support · sample response',
    supportSource: 'Source: a prewritten demo scenario. No real business data has been retrieved.',
    supportBoundary: 'In production: verified data and permission to access each order. Exceptions are handed to a team member.',
    supportQuestions: {
      inventory: {
        label: 'Item availability',
        question: 'Is this item available in Split?',
        answer: 'This simulation has no access to actual stock. Confirmed availability requires information from the business system or a check by a team member.',
        nextTitle: 'Before a real answer',
        next: 'Check the item, location and last synchronization time. If the information is unconfirmed, involve a team member.',
      },
      order: {
        label: 'Order status',
        question: 'Where is my order?',
        answer: 'I cannot look up an order here. In a real service, the customer’s identity is verified first. Only orders that customer is allowed to access are then shown.',
        nextTitle: 'Identity before details',
        next: 'An order number alone does not verify identity. This demo does not request or display personal data.',
      },
      refund: {
        label: 'Returns and complaints',
        question: 'How do I request a return?',
        answer: 'In a real service, an authorized team member reviews return requests against the shop’s confirmed policies. This example does not approve a return or a refund.',
        nextTitle: 'A person confirms the decision',
        next: 'Support can explain the process and prepare a request. Exceptions and financial changes are handled by an authorized person.',
      },
    },
  },
};

function locale(language) {
  return language === 'en' ? 'en' : 'hr';
}

function units(value, language) {
  return Number.isSafeInteger(value) && value >= 0
    ? new Intl.NumberFormat(language === 'en' ? 'en-GB' : 'hr-HR').format(value)
    : '—';
}

function barcodeMark() {
  return '<svg class="stock-barcode" viewBox="0 0 44 36" aria-hidden="true"><path d="M4 4v28M8 4v28M14 4v28M20 4v28M23 4v28M29 4v28M35 4v28M40 4v28" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
}

export function renderStockPanel(language, state) {
  const lang = locale(language);
  const copy = text[lang];
  const events = Array.isArray(state?.events)
    ? state.events.filter((event) => event && typeof event === 'object')
    : [];
  const completed = stockSteps.map((step) => events.some((event) => event.id === step.id));
  const completedCount = completed.filter(Boolean).length;
  const lastEvent = events.at(-1);
  const balances = ['warehouse', 'inTransit', 'shop', 'sold'];
  const physicalValues = balances.slice(0, 3).map((key) => state?.[key]);
  const physical = physicalValues.every((value) => Number.isSafeInteger(value) && value >= 0)
    ? physicalValues.reduce((sum, value) => sum + value, 0)
    : undefined;
  const incomingStatus = completed[0] ? copy.matchPending : copy.receivePending;
  const outgoingStatus = completed[3] ? copy.draftReady : copy.salePending;

  return `<section class="stock-panel" aria-labelledby="stock-panel-title">
    <header class="stock-heading">
      <div><p class="stock-kicker">${html(copy.kicker)}</p><h3 id="stock-panel-title" class="stock-title">${html(copy.title)}</h3><p class="stock-introduction">${html(copy.introduction)}</p></div>
      <span class="stock-simulation">${html(copy.simulation)}</span>
    </header>

    <div class="stock-product-strip">
      <div class="stock-product-identity">${barcodeMark()}<div><span class="stock-product-code">DEMO SKU · OV-DEMO-001</span><strong>${html(copy.product)}</strong><span>${html(copy.pack)}</span></div></div>
      <div class="stock-physical"><span>${html(copy.physical)}</span><strong>${units(physical, lang)} <small>${html(copy.units)}</small></strong><span>${html(copy.physicalNote)}</span></div>
    </div>
    <p class="stock-isolation-note">${html(copy.isolated)}</p>

    <dl class="stock-balances" aria-label="${html(copy.balances)}">${balances.map((key) => `<div class="stock-balance${key === 'inTransit' ? ' stock-balance--transit' : ''}"><dt>${html(copy[key])}</dt><dd>${units(state?.[key], lang)}</dd><span>${html(copy[`${key}Note`])}</span></div>`).join('')}</dl>

    <div class="stock-section-header"><h4>${html(copy.sequence)}</h4><p class="stock-progress" role="status" aria-live="polite">${html(copy.completed)} <strong>${completedCount}/4</strong></p></div>
    <ol class="stock-flow">${stockSteps.map((step, index) => {
      const done = completed[index];
      const ready = index === 0 || completed[index - 1];
      const stepCopy = copy.steps[index];
      return `<li class="stock-step${done ? ' stock-step--done' : ready ? ' stock-step--ready' : ''}">
        <div class="stock-step-top"><span class="stock-step-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><span class="stock-step-status">${html(done ? copy.confirmed : ready ? copy.ready : copy.waiting)}</span></div>
        <h5>${html(stepCopy.title)}</h5><p id="stock-step-note-${index}" class="stock-step-detail">${html(stepCopy.detail)}</p><p class="stock-step-effect">${html(stepCopy.effect)}</p>
        <button type="button" class="button ${done ? 'button-outline' : 'button-plum'} stock-step-button" data-stock-step="${index}" aria-describedby="stock-step-note-${index}" aria-label="${html(`${done ? copy.repeatStep : stepCopy.action}: ${stepCopy.title}`)}"${ready ? '' : ' disabled'}>${html(done ? copy.repeatStep : stepCopy.action)}<span aria-hidden="true">${done ? '↻' : '→'}</span></button>
      </li>`;
    }).join('')}</ol>

    <div class="stock-controls"><button type="button" class="button button-outline stock-replay" data-stock-replay="${html(typeof lastEvent?.id === 'string' ? lastEvent.id : '')}"${lastEvent ? '' : ' disabled'}>${html(copy.replay)}</button><button type="button" class="stock-reset" data-stock-reset>${html(copy.reset)}</button></div>
    <p class="stock-replay-note">${html(copy.replayNote)}</p>
    <p class="stock-feedback" id="stock-feedback" role="status" aria-live="polite"></p>

    <div class="stock-lower-grid">
      <section class="stock-ledger" aria-labelledby="stock-ledger-title"><div class="stock-section-header"><h4 id="stock-ledger-title">${html(copy.ledger)}</h4><span class="stock-record-count">${html(copy.records)}: ${events.length}</span></div>
        ${events.length ? `<table class="stock-ledger-table"><thead><tr><th scope="col">${html(copy.orderColumn)}</th><th scope="col">${html(copy.eventColumn)}</th><th scope="col">${html(copy.quantityColumn)}</th></tr></thead><tbody>${events.map((event, index) => {
          const eventName = typeof event.type === 'string' && Object.hasOwn(copy.eventNames, event.type)
            ? copy.eventNames[event.type] : copy.unknownEvent;
          return `<tr><td>${String(index + 1).padStart(2, '0')}</td><td><strong>${html(eventName)}</strong><code>${html(typeof event.id === 'string' ? event.id : '—')}</code></td><td>${units(event.units, lang)}</td></tr>`;
        }).join('')}</tbody></table>` : `<div class="stock-ledger-empty"><span class="stock-empty-symbol" aria-hidden="true">+</span><strong>${html(copy.ledgerEmptyTitle)}</strong><p>${html(copy.ledgerEmpty)}</p></div>`}
      </section>

      <section class="stock-documents" aria-labelledby="stock-documents-title"><h4 id="stock-documents-title">${html(copy.documents)}</h4><p class="stock-document-note">${html(copy.documentNotice)}</p>
        <div class="stock-document"><div class="stock-document-top"><h5>${html(copy.incoming)}</h5><span class="stock-document-status${completed[0] ? ' stock-document-status--pending' : ''}">${html(incomingStatus)}</span></div><p>${html(completed[0] ? copy.incomingReceived : copy.incomingWaiting)}</p></div>
        <div class="stock-document"><div class="stock-document-top"><h5>${html(copy.outgoing)}</h5><span class="stock-document-status${completed[3] ? ' stock-document-status--ready' : ''}">${html(outgoingStatus)}</span></div><p>${html(completed[3] ? copy.outgoingReady : copy.outgoingWaiting)}</p></div>
        <div class="stock-document"><div class="stock-document-top"><h5>${html(copy.transmission)}</h5><span class="stock-document-status">${html(copy.disconnected)}</span></div><p>${html(copy.transmissionNote)}</p></div>
      </section>
    </div>

    <aside class="stock-scale-note"><strong>${html(copy.scaleTitle)}</strong><p>${html(copy.scaleNote)}</p></aside>
  </section>`;
}

export function renderSupportPanel(language, question = 'order') {
  const lang = locale(language);
  const copy = text[lang];
  const questions = ['inventory', 'order', 'refund'];
  const selected = questions.includes(question) ? question : 'order';
  const answer = copy.supportQuestions[selected];

  return `<section class="support-panel" aria-labelledby="support-panel-title">
    <header class="support-heading"><p class="support-kicker">${html(copy.supportKicker)}</p><h3 id="support-panel-title" class="support-title">${html(copy.supportTitle)}</h3><p class="support-introduction">${html(copy.supportIntroduction)}</p><span class="support-simulation">${html(copy.supportBadge)}</span></header>
    <div class="support-questions" role="group" aria-label="${html(copy.supportChoose)}">${questions.map((id) => `<button type="button" class="support-question${id === selected ? ' support-question--active' : ''}" data-support-question="${id}" aria-pressed="${id === selected}">${html(copy.supportQuestions[id].label)}</button>`).join('')}</div>
    <div class="support-conversation" aria-live="polite">
      <div class="support-customer"><span>${html(copy.supportCustomer)}</span><p>${html(answer.question)}</p></div>
      <article class="support-response"><header><span class="support-avatar" aria-hidden="true">O</span><span>${html(copy.supportAgent)}</span></header><p class="support-answer">${html(answer.answer)}</p><div class="support-next"><strong>${html(answer.nextTitle)}</strong><p>${html(answer.next)}</p></div><p class="support-source">${html(copy.supportSource)}</p></article>
    </div>
    <p class="support-boundary">${html(copy.supportBoundary)}</p>
  </section>`;
}
