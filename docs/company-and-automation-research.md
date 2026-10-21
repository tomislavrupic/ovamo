# Classic Shop / OVAMO — identitet tvrtke i automatizacija

**Provjera javnih izvora: 21. listopada 2026.**  
**Namjena:** dopuna istraživanja i specifikacije aplikacija. Dokument ne potvrđuje pristup poslovnim podacima, spremnost integracija ni pravno odobrenje produkcijskog rada.

## 1. Što je potvrđeno, a što je samo pokazatelj

Korisnik je potvrdio da projekt pripada društvu navedenom na dostavljenom Companywall profilu. Neovisno je pronađen javni **FINA Info.BIZ** profil koji navodi:

| Podatak | Javni nalaz |
| --- | --- |
| Puni naziv | CLASSIC SHOP društvo s ograničenom odgovornošću, za trgovinu i usluge |
| OIB | 89957559201 |
| Adresa | Šibenska 15, 21000 Split |
| Status u profilu | Aktivan |
| Pretežita djelatnost, NKD 2025. | 47120 — Ostala nespecijalizirana trgovina na malo |

Izvor: [FINA Info.BIZ — profil društva](https://infobiz.fina.hr/tvrtka/classic-shop-d-o-o/OIB-89957559201). FINA je institucionalni izvor; ovaj pregled ipak nije zamjena za aktualni sudski izvadak niti potvrda svih registracija potrebnih za konkretan asortiman. Pretežita djelatnost sama ne dokazuje opseg veleprodaje ili uvoza.

[Companywall profil](https://www.companywall.hr/tvrtka/classic-shop-doo/MMxosWgR) podudara se u nazivu, OIB-u i adresi te navodi kontakt na domeni `classicshop.hr`. **Companywall je sekundarni agregator**, pa njegove bonitetne ocjene i druge tvrdnje nisu preuzete kao temelj projektnih odluka.

Izravno otvorena [stranica classicshop.hr](https://classicshop.hr/) prikazuje devet unosa lokacija u Splitu, uključujući Marmontovu, Rivu, Pjacu, Velebitsku, Pothodnik, Zentu i Cankarevu. To potvrđuje javno objavljenu listu, **ne broj trenutačno otvorenih, zasebnih poslovnica**. Stranica u dostupnom tekstu ne prikazuje OIB ni potpuni pravni impresum; FINA polje za web također je prazno. Povezanost domene stoga je dobro potkrijepljena pokazateljima, ali vlasništvo i pristup trebaju potvrdu tvrtke. Zadar i širi poslovni opseg ostaju informacije korisnika, bez potvrđenog aktualnog popisa lokacija.

## 2. Web, desktop i mobilna aplikacija

**Preporuka:** jedan poslovni backend i zajednički podatkovni model, uz sučelja prilagođena zadatku. Time se izbjegavaju tri nepovezane baze zaliha.

- **Web:** pregled lokacija, artikala, dokumenata, nabave, prijenosa i izvještaja prema ovlastima.
- **Mobilno:** skeniranje, primitak robe, inventura, prijenos i evidentiranje oštećenja; stvarnu podršku uređaja provjeriti pilotom.
- **Desktop:** rad sa stolnim skenerima, pisačima i postojećim POS-om. Posebnu aplikaciju ili lokalni servis opravdati tek provjerom hardvera i rada pri prekidu veze.

Postojeći ERP/POS ostaje mjerodavan gdje zadovoljava potrebe. Luceed, PANTHEON i e-racuni nisu potvrđene integracije; odabir zahtijeva dokumentaciju, testni pristup i provjeru poslovnih tokova. Javna demonstracija ne postaje privatna administracija dodavanjem zaslona za prijavu: potrebni su serverska autentikacija, provjera prava, odvojeni podaci, sigurnosne kopije i revizijski trag. Detalji su u [arhitekturi produkcije](./production-architecture.md).

## 3. Automatizacija računa prema pravilima 2026.

**Provjerena pravila:** fiskalizacija B2C računa od 1. siječnja 2026. obuhvaća sve načine plaćanja, uključujući transakcijski račun. [Porezna uprava — B2C računi](https://porezna-uprava.gov.hr/hr/racuni-u-krajnjoj-potrosnji-azurirano-30-1-2026/8034).

Za obuhvaćene tuzemne transakcije obveznici PDV-a od 2026. izdaju i primaju strukturirane eRačune; za obveznike izvan PDV-a izdavanje slijedi 2027., uz zaprimanje tijekom 2026. PDF nije zamjena za eRačun, a potrebna je KPD klasifikacija. [Službeni vodič](https://porezna-uprava.gov.hr/hr/vodic-kroz-fiskalizaciju-2-0-8151/8151).

Fiskalizacija eRačuna odvojena je od njegove razmjene. Izlazni se fiskalizira pri izdavanju, uz posebnost samoizdavanja; ulazni najkasnije pet radnih dana od primitka. [Porezna uprava — postupak i rokovi](https://porezna-uprava.gov.hr/hr/fiskalizacija-eracuna-azurirano-17-4-2026/8049). Za određene gotovinske/kartične B2B transakcije postoji iznimka uz propisanu fiskalizaciju i OIB kupca, bez dodatnog izdavanja eRačuna za istu isporuku. [Službeni FAQ](https://porezna-uprava.gov.hr/hr/izdavanje-i-primanje-eracuna-i-fiskalizacija-eracuna/8047).

**Projektna posljedica:** račune stvara provjereno pravilo na temelju potvrđenih poslovnih događaja. Potrebni su jedinstveni identifikatori, zaštita od duplikata, statusi izdavanja/razmjene/fiskalizacije, praćenje rokova, ispravci i usklađenje naplate. AI može pripremati nacrte i objašnjenja; ne određuje proizvoljno porez, trenutak izdavanja ili knjiženje. Automatizacija treba obuhvatiti i ulazne račune te iznimke koje obrađuje računovodstvo.

## 4. Zalihe i neutralna evidencija reguliranog asortimana

Temelj čine potvrđene pretvorbe komad–paket–karton, zalihe po lokaciji, rezervacije, lotovi, rokovi, povrati i dokumentirani otpisi. Za uvoz povezati nabavnu pošiljku, dokumente i raspodjelu stvarnih troškova. Za hranu omogućiti FEFO i pronalazak pogođenih isporuka pri opozivu.

Za duhan je predviđena **isključivo neutralna interna evidencija**, uz potrebnu sljedivost i ovlasti. Ovaj opseg ne uključuje duhanski prodajni ili promotivni katalog, potrošačku kupnju ni AI preporuke za kupnju duhana. Postojeća pravila sljedivosti i nerazriješena pitanja B2B internetske prodaje ostaju opisana u [poslovnom istraživanju](./business-research.md). [Carinska uprava — sljedivost duhana](https://carina.gov.hr/pristup-informacijama/propisi-i-sporazumi/trosarinsko-postupanje/sustav-sljedivosti-i-pracenja-duhanskih-proizvoda/5818).

## 5. AI korisnička podrška

Početni opseg: odgovori iz odobrenih informacija o lokacijama, radnom vremenu, dostavi, povratima i dokumentima te prosljeđivanje zaposleniku. Podaci o narudžbi dostupni su samo nakon odgovarajuće provjere korisnika. Promjene narudžbi, naknade i povrati trebaju zasebna pravila i odobrenja; razgovor sam ne daje neograničene ovlasti.

Europska komisija potvrđuje primjenu transparentnosti iz članka 50. Akta o umjetnoj inteligenciji od 2. kolovoza 2026.: izravna interakcija s AI-jem mora biti jasno prepoznatljiva od početka, uz predviđene iznimke. [Službeni FAQ Komisije](https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act). Za OVAMO preporučujemo izričitu oznaku „AI pomoćnik”, jasno priznanje nepoznatog odgovora i dostupan prijenos čovjeku.

## 6. Što prikupiti prije povezivanja

Potvrditi aktualne lokacije, domenske pristupe, PDV status, ERP/POS, pružatelja fiskalizacije/eRačuna, hardver, katalog i pakiranja. Zatim pribaviti anonimizirane uzorke ulaznog i izlaznog računa, prijenosa, povrata i inventure. Dogovoriti ovlasti, rad pri prekidu i pravila korisničke podrške. Pilot mora dokazati nedupliciranje računa, usklađene količine, praćenje neuspjelih poruka i nemogućnost pristupa tuđim podacima. Naziv OVAMO ne podrazumijeva potvrđenu dostupnost žiga ili domene.
