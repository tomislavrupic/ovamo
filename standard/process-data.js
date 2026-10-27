// Original proposal in generic language. No private manual text or illustrations are stored here.
// Areas map to the 20 chapters of the protected source; all actions are illustrative.
const p=(id,title,steps,automation,assistance,review,link='tasks')=>({id,title,steps,automation,assistance,review,link});
export const chapters=[
{id:1,title:'Pult i radno mjesto',processes:[
 p('counter-setup','Priprema pulta',['Pregledaj potrebnu opremu i radne materijale.','Provjeri vidljivost obavijesti i oznaka.','Označi spremnost ili prijavi nedostatak.'],'Popis se priprema prema poslovnici i prikazuje otvorene stavke.','Sažima što još nedostaje za početak rada.','Djelatnik fizički provjerava pult.'),
 p('counter-order','Red i odlaganje',['Usporedi prostor s dogovorenim rasporedom.','Ukloni stvari koje ne pripadaju radnom području.','Potvrdi da je pult uredan.'],'Podsjetnik se pojavljuje u dnevnom popisu.','Predlaže redoslijed pregleda radnog mjesta.','Osoba potvrđuje stvarno stanje.')
]},
{id:2,title:'Prijam robe i interna razmjena',processes:[
 p('receipt-match','Prijam i usporedba pošiljke',['Otvori očekivanu pošiljku.','Usporedi dokument s pristiglim količinama.','Potvrdi primitak ili označi razliku.'],'Sustav uspoređuje očekivano i upisano te priprema iznimku.','Objašnjava razliku i priprema sažetak za nabavu.','Pristiglu robu provjerava i potvrđuje osoba.','supply'),
 p('receipt-difference','Ispravak razlike u prijamu',['Označi stavku i stvarno primljenu količinu.','Provjeri razlog i priloži objašnjenje.','Pošalji nacrt odgovornoj osobi na pregled.'],'Povezuje prijam, razliku i zadatak nabave.','Priprema sažetak odstupanja bez samostalne korekcije.','Ovlaštena osoba odlučuje o daljnjoj obradi.','supply'),
 p('transfer-request','Zahtjev drugoj poslovnici',['Odaberi artikl i potrebnu količinu.','Odaberi izvorišnu i odredišnu lokaciju.','Pregledaj i pripremi zahtjev.'],'Predlaže dostupnu lokaciju i kreira zadatak za otpremu.','Objašnjava dostupnost i predlaže količinu za pregled.','Osoba potvrđuje lokacije i količine.','flow'),
 p('transfer-send','Otprema između lokacija',['Provjeri dostupnost i stavke zahtjeva.','Potvrdi stvarno poslanu količinu.','Prati pošiljku do potvrde odredišta.'],'Odvaja robu na putu od robe na odredištu i priprema obavijest.','Sažima što je poslano i što još čeka primitak.','Pošiljatelj i primatelj zasebno potvrđuju fizičku robu.','flow'),
 p('transfer-accept','Primitak interne pošiljke',['Otvori dolaznu pošiljku.','Prebroji što je pristiglo.','Potvrdi primitak ili prijavi manjak.'],'Povezuje otpremu i primitak te označava neriješenu razliku.','Objašnjava gdje se roba nalazi i predlaže sljedeći korak.','Djelatnik provjerava robu; razliku pregledava odgovorna osoba.','flow')
]},
{id:3,title:'Nalozi i statusi',processes:[
 p('orders-status','Praćenje statusa naloga',['Otvori nalog i provjeri sadržaj.','Pogledaj što je spremno, na čekanju ili predano.','Pokreni sljedeću dostupnu radnju.'],'Status se predlaže iz potvrđenih događaja i prikazuje iznimke.','Pretvara status i povijest u jednostavan sažetak.','Osoba pregledava iznimke i potvrđuje radnje.','sales'),
 p('orders-exception','Nalog s nedostupnom robom',['Provjeri raspoloživost.','Označi stavke koje nedostaju.','Predloži nabavu ili drugo rješenje.'],'Stvara zadatak za nedostupne stavke bez obećanja raspoloživosti.','Sažima moguće opcije i njihove pretpostavke.','Osoba odabire rješenje nakon provjere.','sales')
]},
{id:4,title:'Nabava i potrepštine',processes:[
 p('procurement-suggestion','Prijedlog nabave',['Pregledaj potrebe poslovnice.','Pripremi artikle i količine za pregled.','Predaj prijedlog nabavi.'],'Prikuplja prijedloge i izrađuje nacrt bez slanja dobavljaču.','Sažima razloge i predlaže količine prema dostupnim podacima.','Nabava odobrava i šalje stvarnu narudžbu.','supply'),
 p('supply-needs','Uredske i higijenske potrepštine',['Provjeri potrošnju i raspoložive zalihe.','Pripremi popis potreba.','Usporedi zahtjev s dogovorenim ograničenjem.'],'Podsjeća na periodični pregled i priprema zahtjev za ured.','Sažima potrebe bez naručivanja.','Odgovorna osoba potvrđuje sadržaj i budžet.','supply')
]},
{id:5,title:'Zalihe i kartica artikla',processes:[
 p('stock-location','Stanje po lokacijama',['Pronađi ogledni artikl.','Pogledaj količine po lokaciji i na putu.','Provjeri kada je stanje zadnji put potvrđeno.'],'Objedinjuje prikaz dostupnih potvrđenih stanja.','Objašnjava razliku između fizičkog i raspoloživog stanja.','Osoba provjerava svježinu i izvor podatka.','flow'),
 p('stock-history','Povijest promjena artikla',['Otvori karticu artikla.','Pregledaj povezane ulaze, izlaze i dokumente.','Označi promet koji treba provjeriti.'],'Povezuje promjene s odgovarajućim događajima i dokumentima.','Sažima slijed i upućuje na izvorne zapise.','Odgovorna osoba provjerava sumnjive promjene.','store')
]},
{id:6,title:'Inventura i prebrojavanje',processes:[
 p('inventory-prep','Priprema i presjek',['Provjeri otvorene dokumente i prethodna zatvaranja.','Provjeri zaprimljene i otvorene prijenose.','Potvrdi presjek za inventuru.'],'Priprema popis otvorenih stavki i upozorava na nepotpune preduvjete.','Objašnjava zašto pojedini dokument čeka provjeru.','Odgovorne osobe potvrđuju presjek i posebna pravila.','flow'),
 p('inventory-count','Prebrojavanje i dokumenti',['Odaberi lokaciju i opseg.','Unesi ili skeniraj prebrojane količine.','Spremi brojanje kao nacrt.'],'Povezuje brojanje s inventurom i sprječava dvostruko povezivanje.','Pomaže pronaći stavke kojima treba ponovno brojanje.','Djelatnik fizički broji i potvrđuje unesene podatke.','flow'),
 p('inventory-review','Razlike i ponovno brojanje',['Usporedi očekivano i prebrojeno.','Ponovno provjeri sumnjive stavke.','Pripremi razlike za pregled.'],'Računa razliku i označava promjene koje zahtijevaju ponovno usklađivanje.','Objašnjava mogući uzrok kao hipotezu i navodi izvor.','Voditelj provjerava razliku prije bilo kakve korekcije.','flow'),
 p('inventory-correct','Ispravci i ažuriranje inventure',['Pronađi izvorni zapis brojanja.','Dodaj ispravak ili novo brojanje.','Ponovno izračunaj i provjeri razliku.'],'Povezuje korektivni zapis i upozorava kad je pregled zastario.','Sažima što se promijenilo nakon ponovnog brojanja.','Ovlaštena osoba potvrđuje ispravak i završni pregled.','flow'),
 p('inventory-planned','Planirana i izvanredna inventura',['Odaberi vrstu i opseg inventure.','Dogovori sudionike i vrijeme.','Pregledaj izvještaj i otvorene zadatke.'],'Priprema raspored, podsjetnike i popis dokumenata.','Sažima napredak i preostale iznimke.','Tim potvrđuje raspored i rezultate.'),
 p('inventory-docs','Pregled dokumenata i izvještaja',['Odaberi lokaciju i razdoblje.','Otvori povezane dokumente.','Provjeri rezultate i neriješene razlike.'],'Grupira dokumente po inventuri i statusu.','Priprema sažetak izvještaja s poveznicama na izvore.','Odgovorna osoba potvrđuje rezultate.','manage')
]},
{id:7,title:'Otpisi, zamjene i razlike',processes:[
 p('writeoff','Oštećenje i otpis',['Odvoji robu koja nije za prodaju.','Zabilježi artikl, količinu i razlog.','Predaj prijedlog na pregled.'],'Kreira nacrt i prati odobrenje te povezani dokument.','Priprema objašnjenje iz prijavljenih podataka.','Osoba provjerava robu i odobrava postupanje.','store'),
 p('article-exchange','Zamjena šifre artikla',['Označi povezane artikle i razlog.','Pripremi zahtjev za odgovornu osobu.','Prati odluku i povezani zapis.'],'Povezuje zahtjev s artiklima bez izmjene stvarne zalihe.','Sažima potrebne podatke za provjeru.','Odgovorna osoba odobrava odgovarajući postupak.','store'),
 p('stock-issue','Prijava razlike',['Označi artikl, lokaciju i uočenu razliku.','Dodaj kontekst i pregledaj prijavu.','Predaj na obradu i prati odgovor.'],'Dodjeljuje predmet odgovornoj osobi i čuva status.','Priprema sažetak i predlaže koje podatke provjeriti.','Odgovorna osoba istražuje uzrok i odlučuje.','flow')
]},
{id:8,title:'Blagajna, računi i akcije',processes:[
 p('pos-checkout','Prodaja i načini plaćanja',['Provjeri artikle i količine.','Odaberi način plaćanja i potvrdi naplatu.','Provjeri rezultat i dokument.'],'Predlaže obračun i prikazuje status plaćanja iz potvrđenog POS-a.','Objašnjava sljedeći korak i eventualnu grešku.','Djelatnik potvrđuje naplatu; demo ne naplaćuje.','cash'),
 p('pos-payment-error','Odbijeno ili kombinirano plaćanje',['Provjeri status pojedinog plaćanja.','Riješi odbijeni ili preostali dio.','Završi tek kad je rezultat potvrđen.'],'Razdvaja statuse načina plaćanja i upozorava na nepotpuni iznos.','Sažima koje plaćanje treba provjeriti.','Djelatnik provjerava terminal i stvarni rezultat.','cash'),
 p('pos-business-invoice','Podaci za poslovni račun',['Pronađi ili unesi podatke kupca.','Poveži podatke s odgovarajućim dokumentom.','Pregledaj nacrt prije službenog izdavanja.'],'Provjerava obvezna polja prema konfiguriranim pravilima.','Pomaže pronaći nedostajuće podatke bez izmišljanja vrijednosti.','Ovlaštena osoba i POS/računovodstvo potvrđuju dokument.','sales'),
 p('pos-cancel','Storno ili ispravak računa',['Pronađi izvorni račun.','Provjeri razlog i ovlasti.','Pokreni odgovarajući korektivni postupak.'],'Povezuje korektivni zahtjev s izvornim dokumentom.','Objašnjava status i priprema razlog za pregled.','Ovlaštena osoba provjerava uvjete; demo ne stornira.','cash'),
 p('pos-fiscal','Provjera fiskalnih potvrda',['Pregledaj dokumente s otvorenim statusom.','Provjeri razlog i potrebnu radnju.','Potvrdi rezultat u stvarnom sustavu.'],'Upozorava na nepotvrđene dokumente i prati obradu.','Sažima grešku i upućuje na postupak.','Ovlaštena osoba provjerava stvarni fiskalni rezultat.','cash'),
 p('pos-return','Povrat ili zamjena po računu',['Pronađi izvorni dokument.','Odaberi stavke i provjeri stanje robe.','Pripremi povrat ili zamjenu za provjeru.'],'Povezuje zahtjev sa stavkama i prati robu i plaćanje odvojeno.','Sažima kontekst i priprema prijedlog za djelatnika.','Osoba potvrđuje prava, stanje robe i financijski postupak.','sales'),
 p('pos-cash-balance','Provjera blagajne i predaja',['Usporedi očekivano i prebrojeno.','Evidentiraj odstupanje ili predaju.','Označi provjeru i odgovornu osobu.'],'Podsjeća na provjere i označava odstupanja.','Priprema kratak sažetak razlike za voditelja.','Osoba fizički broji novac i potvrđuje rezultate.','cash'),
 p('pos-close','Zatvaranje dana',['Provjeri obračune i otvorene dokumente.','Riješi stavke koje blokiraju zaključivanje.','Potvrdi zatvaranje i pregled izvještaja.'],'Skuplja preduvjete i upozorava na nedovršene stavke.','Objašnjava zašto korak čeka i što pregledati.','Ovlaštena osoba provodi zatvaranje u POS-u.','cash'),
 p('pos-promotion','Cijene i akcije na blagajni',['Pronađi artikl i važeću cijenu.','Provjeri prikaz i eventualno odstupanje.','Predaj razliku na pregled.'],'Uspoređuje odobrene cijene s dostupnim prikazima.','Sažima razlike i traži potvrdu izvora.','Odgovorna osoba odobrava promjenu cijene.','store')
]},
{id:9,title:'Doček i odnos s kupcem',processes:[
 p('welcome','Doček i prioritet kupca',['Pripremi prostor i dočekaj kupca.','Posveti pozornost njegovom zahtjevu.','Nastavi ostale zadatke kada je primjereno.'],'Omogućuje pauziranje zadatka i nastavak kasnije.','Predlaže kratki podsjetnik za profesionalnu komunikaciju.','Djelatnik odlučuje kako pomoći osobi.','learn'),
 p('customer-help','Pomoć kupcu',['Saslušaj pitanje.','Provjeri pouzdan izvor informacija.','Odgovori ili uključi odgovornu osobu.'],'Prikazuje odobrene informacije uz aktualni kontekst.','Sažima provjerene informacije i navodi ograničenja.','Djelatnik provjerava i daje odgovor.','assistant')
]},
{id:10,title:'Postupak prodaje',processes:[
 p('sales-service','Usluga i evidentiranje artikla',['Utvrdi što kupac treba.','Provjeri artikle i količine na blagajni.','Potvrdi iznos i dovrši naplatu.'],'Povezuje artikl, cijenu i potvrđeni događaj prodaje.','Pomaže pronaći odobrene informacije i objašnjava postupak.','Djelatnik provjerava kupca, artikl i naplatu.','sales'),
 p('sales-complaint','Reklamacija i pomoć nakon prodaje',['Saslušaj kupca i evidentiraj zahtjev.','Poveži zahtjev s raspoloživim dokazom kupnje.','Predaj iznimku na odluku.'],'Prati predmet, odgovornu osobu i status.','Priprema nacrt odgovora iz odobrenih informacija.','Osoba odlučuje i komunicira s kupcem.','sales'),
 p('sales-replenish','Dopuna i uvjeti čuvanja',['Pregledaj dostupnost artikala.','Dopuni iz odgovarajuće zalihe.','Provjeri uvjete čuvanja i označi odstupanja.'],'Predlaže zadatak za dopunu i podsjetnik za uvjete čuvanja.','Sažima proizvode i lokacije koje treba provjeriti.','Osoba fizički provjerava robu i uvjete.','store')
]},
{id:11,title:'Uvjeti i ograničenja prodaje',processes:[
 p('sales-conditions','Radno vrijeme i uvjeti',['Provjeri prikaz radnog vremena.','Potvrdi da je obavijest ažurna.','Prijavi odstupanje voditelju.'],'Podsjeća na pregled istaknutih podataka.','Sažima odobrene informacije za osoblje.','Voditelj potvrđuje podatke i izmjene.'),
 p('age-check','Provjera uvjeta za ograničenu prodaju',['Prepoznaj stavku s ograničenjem.','Osobno provjeri uvjete prema važećim pravilima.','Nastavi ili odbij prodaju prema provjeri.'],'Prikazuje upozorenje i zahtijeva potvrdu odgovorne osobe.','Upućuje na odobrenu i ažuriranu uputu; ne utvrđuje identitet.','Djelatnik provodi provjeru; pravila treba potvrditi prema važećim propisima.','learn')
]},
{id:12,title:'Raspored proizvoda u poslovnici',processes:[
 p('layout-plan','Raspored i vidljivost',['Otvori odobreni raspored lokacije.','Usporedi stvarno stanje s planom.','Označi odstupanja za ispravak.'],'Prikazuje zadatke prema lokaciji i verziji plana.','Sažima odstupanja i priprema popis za pregled.','Voditelj potvrđuje plan i stvarno stanje.','store'),
 p('layout-labels','Oznake na polici',['Provjeri odgovara li artikl oznaci.','Pregledaj čitljivost i dostupnost cijene.','Označi razliku odgovornoj osobi.'],'Upozorava na stavke bez potvrđene oznake.','Pomaže opisati razliku bez samostalne promjene cijene.','Djelatnik fizički provjerava policu.','store')
]},
{id:13,title:'Održavanje artikala i opreme',processes:[
 p('expiry','Rokovi i uvjeti čuvanja',['Pregledaj rokove i uvjete.','Izdvoji artikle koje treba dodatno provjeriti.','Zabilježi postupanje i odgovornu osobu.'],'Priprema podsjetnike iz dostupnih podataka o rokovima.','Sažima stavke za pregled bez odlučivanja o zbrinjavanju.','Osoba provjerava fizičku robu i pravila.','store'),
 p('product-hygiene','Urednost i higijena',['Pregledaj police, ambalažu i opremu.','Očisti ili prijavi nedostatak.','Potvrdi završetak zadatka.'],'Dodaje periodične zadatke i prati otvorene prijave.','Predlaže kratak pregled otvorenih zadataka.','Djelatnik obavlja i potvrđuje čišćenje.'),
 p('damaged-goods','Oštećeni ili neprodajni artikli',['Odvoji i evidentiraj robu.','Dodaj razlog i potrebne podatke.','Predaj prijedlog postupanja na odobrenje.'],'Povezuje evidenciju s odgovornom osobom i statusom.','Priprema nacrt prijave bez knjiženja.','Ovlaštena osoba potvrđuje postupak.','store'),
 p('cooling-maintenance','Rashladna oprema',['Pregledaj stanje uređaja.','Zabilježi čišćenje ili potrebu za servisom.','Prati otvorene servisne zadatke.'],'Priprema podsjetnik i evidentira prijavljenu potrebu.','Sažima povijest održavanja za odgovornu osobu.','Osoba provjerava uređaj i potvrđuje servis.'),
 p('new-product','Uvođenje novog artikla',['Provjeri podatke i pakiranje.','Potvrdi prijam i oznaku.','Postavi artikl prema odobrenom rasporedu.'],'Povezuje artikl, cijenu i potrebne zadatke za poslovnicu.','Priprema kontrolni popis podataka koji nedostaju.','Ovlaštena osoba potvrđuje podatke i izlaganje.','store')
]},
{id:14,title:'Police i skladište',processes:[
 p('shelves-plan','Raspored polica',['Otvori odobreni raspored.','Usporedi artikle i oznake.','Ispravi ili prijavi odstupanje.'],'Prikazuje aktualni plan i otvorene zadatke.','Sažima što treba provjeriti.','Djelatnik potvrđuje fizičko stanje.','store'),
 p('warehouse-space','Red i prohodnost skladišta',['Pregledaj prolaze i odlaganje.','Ukloni ili prijavi prepreke.','Potvrdi urednost prostora.'],'Dodaje periodični zadatak i evidentira prijavu.','Sažima neriješene stavke za predaju smjene.','Djelatnik provodi fizički pregled.')
]},
{id:15,title:'Raspored hladnjaka',processes:[
 p('fridge-plan','Raspored po rashladnom uređaju',['Odaberi odgovarajući uređaj.','Usporedi sadržaj s odobrenim rasporedom.','Označi i riješi odstupanja.'],'Prikazuje pripadajući plan i zadatke pregleda.','Priprema sažetak otvorenih stavki.','Osoba provjerava stvarni uređaj.','store')
]},
{id:16,title:'Izlog',processes:[
 p('window-check','Pregled izloga',['Provjeri urednost i čistoću.','Usporedi postav s odobrenim rasporedom.','Prijavi ili otkloni odstupanje.'],'Priprema ponavljajući zadatak pregleda.','Sažima zadatke za odgovornu osobu.','Djelatnik provjerava izlog i pravila izlaganja.')
]},
{id:17,title:'Dodaci i stalci',processes:[
 p('accessory-display','Raspored dodataka',['Pronađi odgovarajući stalak.','Provjeri raspored i oznake.','Dopuni ili označi nedostatke.'],'Prikazuje dogovoreni raspored i otvorene zadatke.','Priprema popis potrebnih provjera.','Osoba potvrđuje fizičko stanje.','store')
]},
{id:18,title:'Cijene i oznake',processes:[
 p('prices-match','Usporedba cijene i naziva',['Provjeri naziv artikla i oznaku na polici.','Usporedi s odobrenim izvorom cijene.','Prijavi razliku prije izmjene.'],'Upozorava na prijavljena neslaganja i prati pregled.','Sažima odstupanje i povezuje relevantni artikl.','Ovlaštena osoba potvrđuje stvarnu cijenu.','store'),
 p('prices-label','Postavljanje oznaka',['Pripremi odobrenu oznaku.','Postavi je uz odgovarajući artikl.','Potvrdi čitljivost i usklađenost.'],'Prati zadatak nakon odobrene promjene cijene.','Priprema popis oznaka za provjeru.','Osoba potvrđuje da je oznaka pravilno postavljena.','store')
]},
{id:19,title:'Opće smjernice i tim',processes:[
 p('conduct','Profesionalno ponašanje i tim',['Pregledaj odobrenu uputu za komunikaciju.','Uključi kolegu ili voditelja kada je potrebno.','Predaj otvorene stavke sljedećoj smjeni.'],'Prikuplja otvorene zadatke za predaju smjene.','Priprema sažetak otvorenih tema.','Ljudi odlučuju i komuniciraju uz poštovanje.'),
 p('opening','Otvaranje i zatvaranje prostora',['Provjeri raspored i pripremu prostora.','Pregledaj zadatke i otvorene iznimke.','Potvrdi predaju ili završetak.'],'Prikazuje raspored i popis aktivnosti za smjenu.','Sažima što još čeka.','Djelatnik potvrđuje fizičko otvaranje i zatvaranje.'),
 p('safety','Sigurnost i izvanredne situacije',['Prepoznaj i prijavi problem.','Slijedi odobrenu sigurnosnu uputu.','Uključi odgovornu osobu ili hitne službe kada je potrebno.'],'Prikazuje kontakt i prati prijavu prema pravilima.','Pomaže pronaći odobrenu uputu bez samostalnog odlučivanja.','Osoba provodi sigurnosni postupak i traži pomoć.'),
 p('customer-complaint','Pritužbe i eskalacija',['Saslušaj i evidentiraj zahtjev.','Provjeri može li se riješiti na licu mjesta.','Po potrebi predaj odgovornoj osobi.'],'Prati predmet i odgovornu osobu.','Priprema nacrt odgovora za pregled.','Osoba donosi odluku i odgovara kupcu.','sales'),
 p('training-team','Edukacija, privatnost i ovlasti',['Pregledaj dodijeljenu edukaciju i upute.','Vježbaj kroz primjer.','Potvrdi razumijevanje prema dogovorenom postupku.'],'Prikazuje dodijeljene materijale i podsjetnike.','Objašnjava odobrene upute bez izlaganja nepotrebnih podataka.','Voditelj definira ovlasti i potvrđuje stvarnu evidenciju edukacije.','learn'),
 p('cash-security','Rukovanje novcem i sigurnost podataka',['Pregledaj primjenjive upute za smjenu.','Prijavi greške ili odstupanja.','Predaj otvorene stavke ovlaštenoj osobi.'],'Prikazuje provjere i čuva trag prijavljenih iznimaka.','Sažima postupke iz odobrenih izvora.','Odgovorna osoba kontrolira pristup i izvršenje.','cash')
]},
{id:20,title:'Korištenje prostora',processes:[
 p('sales-floor','Prodajni prostor',['Provjeri urednost i radne materijale.','Označi stvari koje treba premjestiti ili ukloniti.','Potvrdi pregled prostora.'],'Prikazuje popis prema vrsti prostora i smjeni.','Sažima otvorene provjere.','Djelatnik provjerava prostor.'),
 p('staff-facilities','Sanitarni i pomoćni prostor',['Provjeri čistoću i potrepštine.','Prijavi nedostatak ili potrebu održavanja.','Označi dovršeni pregled.'],'Podsjeća na redovne provjere i prati potrebe.','Priprema sažetak potrebe za nabavu.','Osoba fizički pregleda i održava prostor.'),
 p('backroom','Skladišni i osobni prostor',['Provjeri raspored i sigurnost prostora.','Odvoji osobne i poslovne stvari prema pravilima.','Predaj nepravilnosti odgovornoj osobi.'],'Dodjeljuje kontrolne točke i prati prijave.','Upućuje na odobrenu uputu o korištenju prostora.','Voditelj potvrđuje postupanje i eventualne iznimke.')
]}
];
