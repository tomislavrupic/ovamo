# OVAMO — arhitektura produkcijskog sustava

**Datum: 21. listopada 2026.**  
**Status: prijedlog za otkrivanje zahtjeva i pripremu pilota; nije potvrda postojećih integracija ni odobrenje komercijalnog pokretanja.**

## 1. Granica demonstratora i produkcije

Trenutačni demonstrator prikazuje HR/EN katalog, lokalnu oglednu košaricu, B2B primjer naručivanja punih pakiranja te javno simulirano poslovanje i AI. Ti prikazi nisu stvarna prodaja, prijava poslovnog kupca, evidencija zaliha ili privatna administracija.

GitHub Pages ne dopušta korištenje kao besplatnog hostinga za vođenje internetskog poslovanja ili stranice primarno usmjerene na komercijalne transakcije. Zato komercijalni web i serverski dio trebaju odgovarajući produkcijski hosting. Izvorni kod može ostati u repozitoriju `tomislavrupic/ovamo`. [Službena ograničenja GitHub Pagesa](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).

## 2. Mjerodavni sustavi prije odabira tehnologije

Prvo pregledati postojeći ERP, POS, računovodstvo i skladišni postupak. Ako postojeće rješenje pouzdano pokriva poslovanje, zadržati ga kao mjerodavno za pripadajuće podatke. Luceed, PANTHEON i e-racuni mogu biti kandidati za usporedbu tek nakon tog pregleda; ovdje se ne tvrdi da imaju odgovarajuće konektore, ugovorene usluge ili potvrđenu integraciju s OVAMO sustavom.

| Cjelina | Odgovornost | Pravilo |
| --- | --- | --- |
| ERP/POS | Potvrđene zalihe, nabava, dokumenti i računovodstvo prema dogovorenoj podjeli | Jedan vlasnik svake vrste podatka |
| Katalog | Opisi, prijevodi, slike, deklaracije i klasifikacija | Objavljuju se odobrene verzije |
| Poslovni backend | Narudžbe, ovlasti, rezervacije i koordinacija | Sve osjetljive provjere izvršava server |
| Integracije | ERP, fiskalizacija, eRačun, dostava, naplata i sljedivost | Evidentirani zahtjevi, ishodi i ponavljanja |
| Izvještavanje | Usporedivi pokazatelji | Svaki izvještaj pokazuje izvor i svježinu podataka |

Za početak preporučujemo jednu modularnu serversku aplikaciju, relacijsku bazu s transakcijama i pozadinsku obradu integracija. Razdvajanje u više servisa treba opravdati stvarnim opterećenjem ili organizacijom. Razvoj, provjera i produkcija imaju odvojene podatke i pristupne podatke.

## 3. Katalog i pravila prodajnog kanala

Artikl treba imati SKU, dobavljačke šifre, barkodove, prodajnu i nabavnu jedinicu, pretvorbe pakiranja, poreznu/KPD klasifikaciju, dobno ograničenje, teritorij i dopuštene kanale. Pravila imaju odgovornu osobu, datum primjene i status provjere. Marketinška kategorija nije zamjena za pravnu klasifikaciju.

Serverska provjera mora obuhvatiti katalog, košaricu, ponudu, ponovljenu narudžbu i API uvoz. Duhanska internetska prodaja ima zabrane i posebne iznimke za određene povezane proizvode; nije potvrđeno da B2B prijava stvara opće izuzeće. Nikotinske vrećice zahtijevaju zasebnu klasifikaciju. Nerazriješene kombinacije artikla i kanala ostaju isključene. Izvori i detalji nalaze se u [poslovnom istraživanju](./business-research.md#4-provjerene-regulatorne-činjenice-i-posljedice).

## 4. Pouzdan tijek narudžbe

1. **Priprema:** server potvrđuje kupca, dozvoljeni kanal, cjenik, valutu, pakiranja i uvjete plaćanja. Cijena iz preglednika ne smatra se mjerodavnom.
2. **Rezervacija:** mjerodavni sustav atomarno rezervira raspoloživu količinu. Ako ERP upravlja rezervacijama, lokalna kopija zaliha ne smije samostalno obećati istu robu. Bez potvrde narudžba ostaje na čekanju.
3. **Jedinstvena obrada:** svaki pokušaj potvrde dobiva jedinstveni ključ. Ponovljeni klik, mrežno ponavljanje ili dupli događaj plaćanja vraća postojeći rezultat umjesto nove narudžbe.
4. **Plaćanje ili kredit:** zasebno se evidentiraju autorizacija, naplata i B2B odobrenje. Pravila isteka rezervacije i povrata moraju pokriti zakašnjele potvrde plaćanja.
5. **Isporuka i račun:** potvrđene radnje pokreću pripremu, otpremu i odgovarajući postupak izdavanja računa. Račun, naplata i isporuka imaju odvojene statuse; jedan ne podrazumijeva drugi.
6. **Usklađenje:** provjeravaju se rezultat naplate, ERP dokument, fiskalizacija i otprema. Pogreške ulaze u red zadataka za obradu. Otkaz, djelomična isporuka i povrat imaju izričita pravila oslobađanja zalihe i ispravka dokumenata.

Potrebno je podržati B2C fiskalizaciju i strukturirane eRačune prema vrsti transakcije, uključujući ulazne račune. Sustav mora spriječiti dvostruko izdavanje za istu isporuku. [Porezna uprava — izdavanje, primanje i fiskalizacija](https://porezna-uprava.gov.hr/hr/izdavanje-i-primanje-eracuna-i-fiskalizacija-eracuna/8047).

## 5. Skladište, pakiranja i uvoz

B2B količine mogu se unositi u kartonima, dok se temeljna količina vodi u potvrđenoj jedinici artikla. Pretvorba mora biti određena za svaki proizvod; promjena broja komada u kartonu ne smije prepisati povijesne dokumente. Minimalno pakiranje provjerava se na serveru.

Zalihe se razlikuju po lokaciji, rezervaciji, transportu, karanteni i povratu. Za odgovarajuće artikle voditi lotove i rokove te podržati FEFO: izdavanje najranijeg prikladnog roka. Opoziv treba pronaći skladišta, trgovine i B2B isporuke pogođene robom te blokirati daljnje izdavanje.

Duhanske serijske i agregacijske oznake povezati s postojećim sustavom sljedivosti; običan barkod nije njegova zamjena. [Carinska uprava — sustav sljedivosti](https://carina.gov.hr/pristup-informacijama/propisi-i-sporazumi/trosarinsko-postupanje/sustav-sljedivosti-i-pracenja-duhanskih-proizvoda/5818).

Uvozna pošiljka povezuje dobavljača, dokumente, prijevoz, davanja i ukupni nabavni trošak. Privremeni obračun usklađuje se s konačnim troškovima prema metodi koju potvrđuje računovodstvo. Ambalažne naknade i povrati vode se zasebno.

## 6. Privatni pristup i odgovornosti

Produkcijski B2B kupac pristupa samo vlastitoj tvrtki, cjenicima, narudžbama i dokumentima. Poslovni račun aktivira se nakon provjere. Prodaja, skladište, financije i administracija dobivaju različite ovlasti; server provjerava pristup svakom zapisu. Skrivanje gumba ili URL-a nije zaštita.

Za zaposlenike preporučujemo višefaktorsku prijavu, kratkotrajne sesije gdje je primjereno i mogućnost hitnog ukidanja pristupa. Tajne ostaju na serveru, a poslovni podaci i sigurnosne kopije izvan javnog repozitorija. Promjene cijena, prava, kreditnih limita i dokumenata bilježe tko je radnju odobrio i izvršio. Podatke u zapisnicima svesti na potrebnu mjeru.

## 7. Prekidi rada, oporavak i nadzor

Integracije trebaju trajni red poruka, kontrolirana ponavljanja, zaštitu od dvostruke obrade i pregled poruka koje zahtijevaju intervenciju. Sučelje prikazuje posljednje uspješno usklađenje. Ako zaliha ili pravilo nije pouzdano, sustav zaustavlja obećanje isporuke ili predaje zahtjev zaposleniku.

Postupak pri prekidu fiskalizacije i POS-a treba uskladiti s pružateljem i primjenjivim pravilima; ne improvizirati ručne zamjene. Uključiti nadzor neuspjelih rezervacija, naplate, računa i integracija. Sigurnosne kopije baze i dokumenata moraju biti šifrirane, odvojene i obnovljive. Prije pilota dogovoriti dopušteni gubitak podataka i vrijeme oporavka te stvarno provesti obnovu.

## 8. AI: prvo čitanje, zatim kontrolirane radnje

Prva verzija AI-ja čita odobreni katalog, procedure i izvještaje uz ovlasti korisnika. Odgovor pokazuje izvor i datum; nedostajuće podatke ne popunjava nagađanjem. Slijede prijedlozi nabave, upozorenja na rokove i nacrti opisa.

Cijene, narudžbe dobavljačima, povrati, računi i vanjske objave zahtijevaju odgovarajuće ljudsko odobrenje. AI ne odlučuje o zakonskoj klasifikaciji proizvoda niti izmišlja deklaracije. Sadržaj dobavljačkih dokumenata i poruka kupaca tretira se kao podatak, bez ovlasti za promjenu sistemskih pravila. Kasnije automatizacije uvoditi pojedinačno, s limitom, tragom radnji i mogućnošću isključivanja.

## 9. Faze i prihvat pilota

**Prvo:** potvrditi sustave i vlasništvo podataka, očistiti uzorak kataloga te ugovoriti potrebne pristupe. **Zatim:** provjeriti integracije u testnom okruženju. **Pilot:** ograničen dopušteni asortiman, lokacija i skupina kupaca. **Širenje:** tek nakon provjerenog cijelog poslovnog ciklusa.

Predloženi mjerljivi uvjeti prihvata:

- Ponovljeni zahtjevi i događaji ne stvaraju duple narudžbe, rezervacije ni račune.
- Pri istodobnoj kupnji posljednje jedinice potvrđuje se najviše jedna rezervacija.
- Sve pilot-isporuke imaju povezane stavke, jedinice, dokumente i provjerene iznose.
- Neovlašteni korisnik ne može pristupiti drugoj tvrtki ni privatnim operacijama.
- Probni opoziv pronalazi sve unaprijed poznate pogođene lotove i isporuke.
- Prekid integracije i obnova kopije završavaju bez neobjašnjenih razlika.

Uz to dogovoriti ciljeve svježine zaliha, vremena pripreme, točnosti isporuke i ručnih intervencija. Ciljevi se temelje na izmjerenom početnom stanju, bez izmišljenih financijskih obećanja.

## 10. Pitanja za sljedeću odluku

Koji ERP/POS i računovodstveni sustav već postoje? Tko izdaje i zaprima račune? Gdje se rezervira roba i kako se povezuju skladišta? Koja pakiranja, lotovi i povrati već imaju evidenciju? Koje su registracije, zemlje nabave i dopušteni prodajni kanali potvrđeni? Tko odobrava B2B kupca, kredit i cjenik? Koji pružatelji naplate i dostave dolaze u obzir? Koliki prekid rada poslovanje može podnijeti i tko obrađuje iznimke? Odgovori određuju konačan opseg i redoslijed izvedbe.
