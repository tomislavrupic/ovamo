# OVAMO — početni istraživački brief poslovnog sustava

**Datum: 21. listopada 2026.**  
**Status: dokument za dizajn i otkrivanje zahtjeva. Nije pravna potvrda usklađenosti ni odobrenje komercijalnog pokretanja.**

OVAMO je odabrani smjer brenda: šljiva `#342638`, koralj `#F47850` i krem `#FFF5E7`. Ovaj brief povezuje identitet, prodajna iskustva i operativni sustav. GitHub Pages izdanje služi kao **dizajnerski demonstrator** s oglednim podacima. Stvarna naplata, narudžbe, računi, korisnički podaci i poslovne integracije zahtijevaju zasebno produkcijsko okruženje i backend. Njihov izvorni kod može ostati u istom repozitoriju.

## 1. Polazište i pretpostavke

Prema informacijama naručitelja, postojeće poslovanje obuhvaća uvoz, veleprodaju i maloprodaju pića, grickalica, suvenira i širokog duhanskog asortimana. Trgovine i suvenirnice posluju u Splitu i Zadru, a namjera je širenje diljem Hrvatske. Dosadašnji naziv je Classic Shop; OVAMO je novi odabrani brend. Pravni naziv društva, broj lokacija, struktura prometa i postojeći sustavi nisu potvrđeni.

Ne pretpostavljamo da tvrtki nedostaju registracije ili da postojeći procesi nisu usklađeni. Prvo treba ustanoviti što već dobro radi. Nije utvrđeno uključuju li pića alkohol, koje su zemlje nabave ni što točno ulazi u pojedine duhanske i nikotinske kategorije. Dostupnost naziva, žiga i domena također nije potvrđena.

## 2. Poslovna prilika: jedan brend, različiti kupci

Preporuka je zajednička poslovna osnova s iskustvima prilagođenima stvarnim potrebama:

| Kupac ili tim | Glavni zadatak | Predložena vrijednost |
| --- | --- | --- |
| Lokalni kupac | Brzo pronaći lokaciju i svakodnevni asortiman | Pouzdane informacije o trgovinama, dostupnosti i prikladnim uslugama |
| Posjetitelj Hrvatske | Jednostavno kupiti poklon ili praktičnu potrepštinu | Hrvatski i engleski sadržaj, jasne kategorije i prijedlozi poklona |
| Poslovni kupac | Ponoviti nabavu uz dogovorene uvjete | Odobreni B2B račun, pakiranja, cjenik, rokovi i pregled dokumenata |
| Nabava i skladište | Osigurati robu uz kontroliran trošak | Pregled zaliha, dobavljača, isporuka, rokova i potrebne dokumentacije |
| Voditelj poslovanja | Odlučiti gdje ulagati i što promijeniti | Usporedivi rezultati lokacija, kategorija i prodajnih kanala |

B2B portal treba smanjiti ručni unos i pogreške u ponovljenim narudžbama. Potrošačka stranica treba podržati i fizičke trgovine; njezina vrijednost nije ograničena na internetsku naplatu. Uspjeh mjerimo dostupnošću robe, točnošću isporuke, maržom nakon troškova i ponovljenom kupnjom.

## 3. Taksonomija proizvoda i kanala

Marketinške kategorije nisu dovoljne za upravljanje prodajom. Svaki artikl treba imati poslovnu kategoriju i zasebnu pravnu klasifikaciju.

| Klasa | Potrebni podaci | Početni tretman kanala |
| --- | --- | --- |
| Hrana i bezalkoholna pića | Deklaracija, alergeni, količina, lot, datumi, ambalaža | Kandidati za webshop nakon provjere podataka i logistike |
| Alkoholna pića, ako postoje | Vrsta, udio alkohola, porezni status i dobna pravila | Posebna provjera prije aktivacije |
| Suveniri i druga neprehrambena roba | Materijal, proizvođač/uvoznik, varijante, upute i sigurnosni podaci gdje su primjenjivi | Kandidati za webshop uz provjeru kategorije |
| Cigarete, duhan i grijani duhanski proizvodi | Precizna klasifikacija, trošarine, sljedivost | Potrošački internetski checkout isključen; B2B postupak nerazriješen |
| E-cigarete, punjenja i ulošci | Sastav, volumen, deklaracija, klasifikacija i dobna ograničenja | Zasebna procjena iznimke i ostalih uvjeta |
| Nikotinske vrećice i drugi rubni proizvodi | Sastav i potvrđena pravna klasifikacija | Bez automatskog preuzimanja pravila za cigarete ili e-cigarete |

Preporučena polja uključuju: dopuštene kanale, dobno ograničenje, teritorij prodaje, status provjere, dopuštenu promociju i datum važenja pravila. Odluka o dopuštenosti mora se provjeravati na backendu, uključujući uvoz narudžbi i AI sučelja.

## 4. Provjerene regulatorne činjenice i posljedice

### Duhan, nikotin i predstavljanje proizvoda

**Pravna činjenica:** članak 23. stavak 7. zabranjuje internetsku prodaju i kupnju te prekograničnu prodaju na daljinu proizvoda iz stavka 1., uz izričitu iznimku za elektroničke cigarete, spremnike za ponovno punjenje i uloške za jednokratnu uporabu. Članak 22. ograničava izravnu i neizravnu promociju, uključujući vidljivo izlaganje pakiranja i promidžbene materijale. [Zakon, NN 45/2017, članci 22–23](https://narodne-novine.nn.hr/clanci/sluzbeni/2017_05_45_1047.html).

Izmjena iz srpnja 2025. u zabranu prodaje mlađima od 18 godina izričito uključuje nikotinske i grijane duhanske proizvode. [Izmjena, NN 98/2025, članak 7.](https://narodne-novine.nn.hr/clanci/sluzbeni/2025_07_98_1359.html).

**Nerazriješeno:** zabrana internetske prodaje upućuje na izmijenjeni stavak 1.; zato se nikotinske vrećice ne smiju unaprijed proglasiti dopuštenima online. Nije potvrđena iznimka koja bi samo zbog B2B prijave omogućila internetsku prodaju duhana. Potrebno je pravno razvrstavanje stvarnih artikala i planiranog postupka naručivanja.

**Preporuka:** OVAMO identitet graditi oko trgovine i praktičnosti. Za regulirani asortiman koristiti odobrene sadržaje i pravila; oznaka „18+” sama ne rješava zabranu prodajnog kanala.

### Fiskalizacija i eRačun

**Pravna činjenica:** od 1. siječnja 2026. fiskalizacija računa u krajnjoj potrošnji obuhvaća sve načine plaćanja, uključujući transakcijski račun. [Porezna uprava, ažurirano 7. listopada 2026.](https://porezna-uprava.gov.hr/hr/racuni-u-krajnjoj-potrosnji-azurirano-30-1-2026/8034).

Za obuhvaćene tuzemne B2B transakcije obveznici PDV-a od 2026. izdaju i primaju strukturirane eRačune. Obveznici izvan PDV-a tijekom 2026. primaju, a od 2027. i izdaju eRačune. PDF nije zamjena za strukturirani eRačun; potrebna je i povezanost artikala/usluga s KPD klasifikacijom. [Službeni vodič](https://porezna-uprava.gov.hr/hr/vodic-kroz-fiskalizaciju-2-0-8151/8151).

Postoji uvjetovana iznimka za B2B transakcije plaćene gotovinom ili karticom uz fiskalizaciju i OIB primatelja. Za istu isporuku tada se ne izdaje dodatni eRačun. [Službena pitanja i odgovori](https://porezna-uprava.gov.hr/hr/izdavanje-i-primanje-eracuna-i-fiskalizacija-eracuna/8047).

**Preporuka:** integrirati provjerenog pružatelja usluge, pravilno usmjeravati B2C/B2B račune i spriječiti dvostruko izdavanje. Obuhvatiti ulazne račune, statuse, ispravke i usklađenje naplate.

### Sljedivost duhana, uvoz i posebni porezi

**Pravna činjenica:** sljedivost od 20. svibnja 2024. obuhvaća i ostale duhanske proizvode, uz ranije obuhvaćene cigarete i duhan za motanje. Evidentiraju se propisana kretanja do posljednjeg gospodarskog subjekta prije prvog maloprodajnog mjesta. Skupna pakiranja moraju omogućiti povezivanje s pojedinačnima; hrvatski izdavatelj identifikatora je AKD. [Carinska uprava — sljedivost](https://carina.gov.hr/pristup-informacijama/propisi-i-sporazumi/trosarinsko-postupanje/sustav-sljedivosti-i-pracenja-duhanskih-proizvoda/5818).

Za primjenjiva kretanja trošarinskih proizvoda između članica EU-a postoje EMCS, propisani statusi i prateći dokumenti. [Carinska uprava — kretanja](https://carina.gov.hr/pristup-informacijama/propisi-i-sporazumi/trosarinsko-postupanje/kretanje-trosarinskih-proizvoda/3643). Uvoz/unos odgovarajuće kave i bezalkoholnih pića otvara zasebna pitanja posebnog poreza; domaća nabava s već plaćenim porezom ima drukčiji tretman. [Carinska uprava — posebni porez](https://carina.gov.hr/pristup-informacijama/propisi-i-sporazumi/trosarinsko-postupanje/trosarinsko-oporezivanje-opce-informacije/posebni-porez-na-kavu-i-bezalkoholna-pica-3713/3713).

**Preporuka:** povezati postojeću sljedivost sa skladištem, čuvati dokumente i razlikovati domaću nabavu, EU stjecanje i uvoz. Porezne stope i klasifikacije moraju imati datum važenja i odgovornu osobu.

### Hrana i ambalaža

**Pravna činjenica:** kod prodaje pretpakirane hrane na daljinu obvezne informacije moraju biti dostupne prije zaključenja kupnje, uz iznimku datuma minimalne trajnosti/uporabe; pri isporuci dostupni moraju biti svi obvezni podaci. [Europska komisija — prodaja na daljinu](https://food.ec.europa.eu/food-safety/labelling-and-nutrition/food-information-consumers-legislation/distance-selling_en).

Sljedivost hrane uključuje neposrednog dobavljača i sljedećeg poslovnog primatelja; obična maloprodaja krajnjem potrošaču ima iznimku od identifikacije tog primatelja. Nesigurna hrana zahtijeva povlačenje/opoziv i obavještavanje nadležnih tijela. [Europska komisija — opći zahtjevi](https://food.ec.europa.eu/horizontal-topics/general-food-law/food-law-general-requirements_en).

Veletrgovac pićima mora omogućiti povrat pripadajuće otpadne ambalaže od svojih kupaca neovisno o veličini prostora. [FZOEU — povratna naknada](https://www.fzoeu.hr/hr/otpadna-ambalaza-unutar-sustava-povratne-naknade/9313). RPPO navodi proširenje obuhvata sustava od 1. siječnja 2027. na dodatne vrste ambalaže. [Službeni RPPO portal](https://rppo.fzoeu.hr/).

**Preporuka:** odvojiti odobrene deklaracije od marketinškog teksta, osigurati evidenciju lotova i povrata te promjenjiva pravila ambalažnih naknada. AI ne smije izmišljati alergene ili deklaracije.

## 5. Operativni model: artikli, pakiranja i zalihe

Jedan glavni zapis artikla treba povezivati dobavljačke šifre, interne SKU-ove i barkodove. Komad, paket, karton i paleta imaju vlastite identifikatore gdje postoje te potvrđene pretvorbe. Prodajna jedinica, nabavna jedinica i porezna osnovica ne smiju se pomiješati. Primjer „karton sadrži 24 komada” mora biti podatak konkretnog artikla, a ne globalna pretpostavka.

Zalihe se vode po lokaciji i statusu: raspoloživo, rezervirano, u transportu, karantena, oštećeno i povrat. Svaka promjena treba imati dokument, vrijeme i odgovornog korisnika. Iz rezervacija i stvarnog stanja izračunava se količina dostupna za obećanje kupcu.

Za hranu preporučujemo lot, rok i FEFO izdavanje: prvo roba s najranijim odgovarajućim rokom. To je projektna preporuka; zakonski detalji ovise o proizvodu. Opoziv mora moći pronaći preostale količine, interne transfere i B2B isporuke. Za duhan se dodaju potrebne serijske i agregacijske veze.

Inventura, povrat kupca, povrat dobavljaču i otpis trebaju zasebne razloge i odobrenja. Time se omogućuje razlikovanje prodaje od gubitka, pogreške i premještanja.

## 6. Nabava, stvarni trošak i cijene

Predloženi obračun ukupnog nabavnog troška povezuje dobavljačku cijenu, prijevoz, osiguranje, carinsko posredovanje, primjenjiva davanja i ostale pripisive troškove. Računovođa potvrđuje tretman povrativih i nepovrativih stavki. Privremeni obračun treba naknadno uskladiti s konačnim dokumentima.

Troškove raspodjeljujemo dokumentiranom metodom: primjerice prema vrijednosti, masi ili volumenu, ovisno o trošku. Prodajnu maržu promatramo nakon popusta, dostave, naplate i povrata. Povratna naknada ambalaže treba imati zasebnu evidenciju.

B2B model može podržati odobrene cjenike, količinske razrede, minimalna pakiranja, kreditni limit i rok plaćanja. Popusti na regulirane kategorije ne aktiviraju se automatski. Promjena cijena mora imati razlog, početak primjene i trag odobrenja.

## 7. Preporučena integracijska arhitektura

Prije odabira tehnologije treba odrediti **koji sustav odgovara za koji podatak**. Postojeći ERP/POS treba zadržati kao mjerodavan gdje pouzdano pokriva računovodstvo, zalihe ili fiskalizaciju. Webshop ne treba postati drugo nepovezano knjigovodstvo.

Predložene cjeline su javna stranica, dopušteni B2C webshop, odobreni B2B portal, poslovni backend, skladište i poveznice s računovodstvom, fiskalizacijom, dostavom i sljedivošću. Integracijski sloj treba zapisivati ishod svake razmjene, ponavljati privremeno neuspjele poruke i spriječiti dvostruku obradu.

Prodaja, skladište i financije dobivaju uloge s odgovarajućim ovlastima. Tajne, osobni podaci i stvarni poslovni izvozi ne ulaze u javni repozitorij. Demonstrator ostaje odvojen od produkcijskih podataka, računa i naplate.

## 8. Prihodne ideje koje vrijedi testirati

Ovo su hipoteze za male pokuse, ne potvrđene tržišne prilike:

- **Lokalni kupci:** dostupnost omiljenih artikala, praktični dopušteni paketi i pogodnosti vezane uz ponovljenu kupnju.
- **Turisti:** poklon-paketi suvenira i prikladne hrane, jasne informacije o dimenzijama i sadržaju te hrvatski/engleski vodič za izbor.
- **Poslovni kupci:** spremljene liste nabave, ponovljene narudžbe, predvidivi termini isporuke i ponude za apartmane, urede ili druge trgovine.
- **Poslovni pokloni:** odobreni paketi s personalizacijom i naručivanjem po ponudi.

Pilot treba mjeriti dodatni doprinos marži, stopu ponovljene kupnje, vrijeme pripreme i otpis. Duhanski proizvodi ne ulaze u zadane promotivne pakete ili automatizirane kampanje.

## 9. AI uvoditi postupno i s mjerljivom odgovornošću

**Prva faza — pomoć u čitanju:** interno pretraživanje odobrenih procedura i kataloga, prijevodi nacrta, sažeci izvještaja i priprema opisa za ljudsku provjeru. Odgovori trebaju pokazati izvor i priznati nedostajuće podatke.

**Druga faza — prijedlozi:** preporuke nabave, upozorenja na rokove, odstupanja cijena i nacrti unosa dokumenata. Usporediti rezultate s postojećim postupkom; pratiti lažne alarme i pogreške.

**Treća faza — ograničene radnje:** tek nakon provjere dopustiti uske automatizacije s limitima i revizijskim tragom. Narudžbe dobavljačima, cijene, povrati, računi i objave trebaju odgovarajuća odobrenja. AI ne odlučuje samostalno o zakonskoj dopuštenosti proizvoda. Kupčeve poruke i dokumenti nisu upute koje smiju mijenjati ovlasti sustava.

## 10. Redoslijed i podaci koje treba prikupiti

1. **Otkrivanje zahtjeva:** mapirati lokacije, sustave, artikle, dokumente i odgovornosti; potvrditi pravne granice kanala.
2. **Temelji:** očistiti katalog, pakiranja, cjenike i lokacije; utvrditi mjerodavne sustave i integracije.
3. **Ograničeni pilot:** jedna lokacija ili grupa poslovnih kupaca, dopušten asortiman i provjera cijelog puta od narudžbe do povrata.
4. **Širenje:** uključivati lokacije tek kad su razlike zaliha, pogreške računa i neuspjele integracije pod kontrolom; zatim uvoditi AI radnje.

Za sljedeću odluku trebaju: pravna osoba/OIB i PDV status, postojeći ERP/POS i pružatelji usluga, anonimizirani uzorci dokumenata, katalog s pakiranjima, dobavljačke zemlje, statusi uvoza i trošarina, AKD identifikatori, način praćenja lotova, povrata ambalaže i dostave. Treba zasebno potvrditi vlasništvo brenda, pravila plaćanja i kreditiranja, uvjete prodaje/povrata, privatnost i pristupačnost.

Rezultat ove faze treba biti provjerena specifikacija integracija, dopuštenih korisničkih tokova i mjerila uspjeha, na kojoj se može odgovorno temeljiti produkcijska izvedba OVAMO sustava.
