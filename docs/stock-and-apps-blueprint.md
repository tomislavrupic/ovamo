# OVAMO: zalihe, aplikacije i automatizacija

**Radni nacrt · 21. listopada 2026.**

Cilj je da djelatnik jednostavno zaprimi, premjesti ili proda robu, a vlasnica vidi isto stanje na računalu i mobitelu. Ovaj dokument opisuje predloženi produkcijski sustav. Trenutačni javni OVAMO prikaz ostaje dizajnerski demo bez stvarnih narudžbi, kupaca, fiskalizacije i poslovnih podataka.

## 1. Jedan poslovni sustav, više načina pristupa

**Preporuka: najprije responzivna web-aplikacija/PWA i zajednički backend, uz postojeći hrvatski ERP/POS ako odgovara poslovanju.** Prije zamjene provjeriti stvarni prijam robe, pakiranja, transfere, lotove, rokove, veleprodajne cijene, fiskalne dokumente, dostupnost API-ja i podršku.

Backend provjerava korisnika, ovlasti, raspoloživost i identitet operacije. ERP poveznica šalje poslovne naredbe te pohranjuje potvrde i greške. Primjerice, Luceed službeno dokumentira REST/JSON API i prava po metodama/podacima; to potvrđuje mogućnost integracije, dok opseg konkretne instalacije treba provjeriti.[1]

Kada ERP vodi robu i financije, on ostaje mjerodavan za salda. OVAMO dnevnik tada prati zahtjeve i njihove potvrde. Prodaja koju je ERP već knjižio ne smije ponovno razdužiti robu kroz drugi kanal. Tajne integracija ostaju na poslužitelju.

**Za više od 2.000 artikala ključan je uređen matični katalog:** jedinstveni SKU, EAN/barkodovi, naziv, osnovna jedinica, faktori pakiranja, porezna grupa i aktivnost. Indeksirati SKU, EAN i naziv; prikazati tablice s poslužiteljskom paginacijom, virtualiziranim redcima i filtrima lokacije, lota i statusa. Operativni rad vodi pretraga i skeniranje. CSV uvoz prvo prikazuje pregled promjena, duplikate barkodova, nepoznate jedinice i pogrešne faktore; ovlaštena osoba potvrđuje uvoz. Jedan barkod mora jednoznačno odrediti artikl i pakiranje. Stanja i izvještaji izvode se iz potvrđenog prometa. Radni redovi po ulozi ističu iznimke, čekanje potvrde i manjkove. Priloženi demo s jednim artiklom ne predstavlja uvezen stvarni katalog.

## 2. Tri pristupa aplikacijama

| Pristup | Web, računalo i mobitel | Odluka za OVAMO |
|---|---|---|
| **Responzivna web-aplikacija/PWA** | Jedno sučelje prilagođeno zaslonu; instalacija kao aplikacija na podržanim kombinacijama preglednika i sustava. Podrška i način instalacije razlikuju se.[2] | Početni izbor za pregled zaliha, prijam, transfere, inventuru i upravljanje. Najmanje zasebnih izdanja za održavanje. |
| **Isto web-sučelje u nativnom omotaču** | Capacitor povezuje web-aplikaciju s iOS/Android mogućnostima kroz dodatke. Tauri omogućuje aplikacije za računala i mobitele uz web-sučelje.[3][4] | Dodati samo za potvrđenu potrebu: konkretan skener, pisač, lokalna integracija ili zahtjevniji rad bez veze. Svaki uređaj traži probu. |
| **Zasebne nativne aplikacije** | Posebni klijenti za mobilne i stolne sustave koriste isti poslovni API. | Razmotriti kada pilot pokaže zahtjev koji prva dva pristupa ne mogu pouzdano pokriti. Planirati dodatno održavanje i testiranje. |

Prije izbora omotača popisati modele skenera, pisača i terminala, operativne sustave te najdulji prihvatljivi prekid veze. Ako skener upisuje kod kao tipkovnica, prvo provjeriti postojeći web-obrazac. Ispis testirati na stvarnom uređaju; dostupnost dodatka nije potvrda kompatibilnosti.

## 3. Najjednostavniji svakodnevni rad

Početni ekran ima četiri velike radnje: **Zaprimi**, **Premjesti**, **Prebroji** i **Povrat**. Lokacija djelatnika unaprijed je odabrana prema ovlastima. Prodaja dolazi iz POS-a.

1. **Prijam:** otvoriti narudžbenicu ili dobavljačev dokument, skenirati artikl, potvrditi pakiranje i količinu. Ekran jasno pokazuje „10 kartona × 24 = 240 komada”. Barkod kartona i barkod komada povezati s istim artiklom i različitim faktorom. Nepoznat kod ide na provjeru. Prije potvrde unijeti lot i rok kada su potrebni te označiti oštećenja.
2. **Razlika prema dobavljaču:** prikazati naručeno, stvarno zaprimljeno i manjak/višak. Zaprimiti stvarno utvrđenu količinu uz zabilježenu razliku; odobrenje iznimke ovisi o ovlastima.
3. **Slanje u trgovinu:** odabrati odredište, skenirati robu i potvrditi otpremu. Količina prelazi iz skladišta u „na putu”. Trgovina potvrđuje stvarni primitak zasebnim skeniranjem. Nepreuzeti dio ostaje otvoren za razrješenje.
4. **Prodaja:** potvrđeni POS događaj razdužuje jedinice u toj trgovini. Web/B2B narudžba prvo rezervira raspoloživu robu; predaja/otprema ostvaruje fizički izlaz prema dogovorenom tijeku.
5. **Povrat:** povezati s izvornom prodajom, pregledati robu i odabrati prodajnu zalihu ili karantenu. Povrat novca i korektivni dokument imaju vlastite statuse. Povrat dobavljaču ima zasebnu otpremu i referencu.
6. **Inventura:** skenirati i upisati prebrojeno po lokaciji/lotu. Sustav računa razliku prema dogovorenom presjeku prometa. Voditelj odobrava korekciju uz razlog; raniji promet ostaje vidljiv.

Karantena je fizička roba koja nije raspoloživa za prodaju. Istek roka, oštećenje i sumnja u ispravnost imaju zasebne razloge. Lot prati prijam, transfer i izlaz; pravilo izdavanja robe s najbližim rokom primjenjuje se gdje je operativno podržano.

## 4. Primjer koji svi moraju moći provjeriti

Jedan ilustrativni artikl: bezalkoholno piće, 24 komada u kartonu.

| Događaj | Skladište | Na putu | Trgovina | Neto prodano | Fizički ukupno |
|---|---:|---:|---:|---:|---:|
| Prijam 10 kartona | 240 | 0 | 0 | 0 | 240 |
| Otprema 48 komada | 192 | 48 | 0 | 0 | 240 |
| Trgovina prihvati 48 | 192 | 0 | 48 | 0 | 240 |
| POS proda 3 | 192 | 0 | 45 | 3 | **237** |

Transfer mijenja mjesto robe. Prodaja smanjuje fizički zbroj. Status računa, primjerice „čeka potvrdu”, ne mijenja ovu računicu i ne pokreće ponovljeno razduženje.

## 5. Dnevnik događaja i raspoloživost

Svaka produkcijska promjena dobiva jedinstveni ID, artikl, lot, količinu u osnovnim jedinicama, izvor/odredište, dokument, djelatnika i vrijeme. Dnevniku se dodaju novi zapisi; pogrešku ispravlja povezani korektivni događaj.

Ponovljen isti ID s istim sadržajem vraća prethodni rezultat. Isti ID s drukčijim sadržajem odbija se. Upis promjene, provjera zalihe i oznaka obrađenog ID-ja moraju biti jedna transakcija. Istodobni zahtjevi provjeravaju verziju stanja ili zaključavaju odgovarajuću zalihu.

**Raspoloživo = fizičko na lokaciji − rezervirano − karantena.** Rezervacija ima vlastiti zapis, rok i oslobađanje pri otkazu. Roba na putu nije raspoloživa u trgovini prije prihvata. Kod prihvaćene otpreme rezervacija se zatvara zajedno s izlazom, da količina ne bude dvostruko oduzeta.

## 6. Rad bez interneta

PWA može koristiti service worker za offline iskustvo, ali preglednik može prekinuti pozadinski zadatak i ograničiti ponovne pokušaje.[5] Zato prikazati „potvrđeno” i „čeka slanje”, vrijeme zadnje sinkronizacije te ručno pokretanje usklađivanja.

Lokalni red čuva ID naredbe, sadržaj, uređaj, redoslijed i očekivanu verziju stanja. Nakon povratka veze poslužitelj obrađuje svaku naredbu jednom. Manjak, promjena lota ili sukob inventure ide djelatniku na rješavanje; zadnji pristigli zapis ne smije prebrisati tuđi promet. Inventura tijekom prekida ostaje nacrt. Offline prodaju dopustiti kroz potvrđeni POS postupak i dogovorena ograničenja; tri odspojena uređaja ne mogu obećavati istu posljednju jedinicu.

## 7. Automatski računi s jasnim događajima

Predloženi slijed odvojeno prati **narudžbu, rezervaciju, isporuku, račun, fiskalnu/eRačun potvrdu i plaćanje**. Računovodstvo i ERP dobavljač potvrđuju kada nastaje račun za svaki kanal, uključujući predujmove i djelomične isporuke.

Pri odobrenom poslovnom događaju backend stvara zadatak za izdavanje s trajnim jedinstvenim ključem. ERP provjerava kupca, poreze i numeraciju; rezultat se veže na izvornu isporuku/prodaju. Prekid veze nakon slanja prvo pokreće provjeru postojećeg dokumenta, zatim kontrolirani ponovni pokušaj. Neuspjeh ostaje u radnom popisu s razlogom i odgovornom osobom. Plaćanje se usklađuje zasebno. Tako automatizacija skraćuje rutinski posao bez obećanja da svaka iznimka prolazi bez čovjeka.

## 8. Ovlasti, AI i uvođenje

Skladištar zaprima i otprema u dodijeljenim skladištima. Trgovina prihvaća svoje transfere. Voditelj odobrava korekcije i iznimke. Računovodstvo upravlja financijskim dokumentima, a administrator korisnicima i integracijama. Sve odluke provjerava backend.

AI korisničke podrške prvo čita odobrene informacije i, nakon provjere identiteta kupca, dopušteni status njegove narudžbe. Odgovor o zalihi navodi svježinu podatka. Priprema nacrt odgovora ili zahtjev za djelatnika. Sporne reklamacije, povrati novca, promjene cijena, korekcije zalihe i pravne iznimke zahtijevaju ovlaštenu osobu.

Pilot provesti u jednom skladištu i jednoj trgovini: potvrditi pakiranja, usporediti dnevni promet, odigrati prekid veze i ponovljeno slanje, provjeriti povrat te račun. Nakon stabilnog rada proširiti lokacije; nativnu aplikaciju dodati prema izmjerenoj potrebi.

## 9. Što radi priloženi lokalni demo

`createStockDemo()` vraća prazne salde i dnevnik. `applyStockEvent(state, event)` obrađuje `receive`, `dispatch`, `accept`, `sell` i `return`. Prijam koristi broj pakiranja i zadani `packSize: 24`; ostale operacije koriste komade. Nula je dopuštena i bilježi se. Negativne, razlomljene, nesigurne količine, manjak i sukob ID-ja odbijaju se bez promjene ulaza.

Demo povrat vraća pregledanu robu u prodajnu zalihu. Produkcijski lotovi, karantena, rezervacije, korisnici, offline red i računi opisani su ovdje kao sljedeći koraci; nisu implementirani u ovom lokalnom modulu.

## Službeni izvori

Provjereno 21. listopada 2026.; preporuke i poslovni tijekovi iznad predstavljaju projektni prijedlog.

1. [Tomsoft: Luceed API](https://docs.tomsoft.hr/luceedapi/luceed-api)
2. [MDN: Making PWAs installable](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)
3. [Capacitor: dokumentacija i nativni API-ji](https://capacitorjs.com/docs)
4. [Tauri: podržane platforme](https://v2.tauri.app/) i [odvajanje sučelja od API-ja](https://v2.tauri.app/start/frontend/)
5. [MDN: Offline and background operation](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation)
