# OVAMO AI — smjer implementacije

**Datum: 21. listopada 2026.**  
**Status: prijedlog budućeg sustava, bez produkcijske implementacije.**

[Podstranica OVAMO AI](../ai.html) prikazuje kako bi prijavljena osoba razgovarala s poslovanjem i pripremala radnje. Podaci i odgovori u demonstraciji unaprijed su pripremljeni. Stranica ne provodi autentikaciju, ne poziva AI API, ne povezuje MCP server i ne mijenja stvarne poslovne zapise. Ne traži lozinke ni API ključeve.

## Cilj i zajednička poslovna osnova

OVAMO bi trebao imati jednu skupinu poslovnih servisa za artikle, skladišta, trgovine, prodaju, nabavu i dokumente. Web, mobilna i računalna aplikacija te AI koriste iste provjere i iste zapise. MCP je dodatno sučelje prema tim servisima, a ne nova, odvojena evidencija zaliha ili računovodstva.

Predloženi tok je: korisnička aplikacija ili AI klijent → autorizirani poslovni servis → transakcijski podaci i integracije s POS/ERP sustavom. Udaljeni MCP server izlaže odabrane alate preko HTTPS-a. Za vanjske klijente prednost ima Streamable HTTP uz provjeru kompatibilnosti s odabranim verzijama klijenata. Server, autentikacija i radnici za automatizaciju trebaju odgovarajući backend hosting; GitHub Pages ovdje služi za prezentaciju i demonstraciju.

Postoje dva iskustva: osoba povezuje svoj OVAMO račun u podržanom Claude/OpenAI klijentu, ili koristi AI ugrađen u OVAMO aplikaciju. Drugo iskustvo zahtijeva zasebnu API integraciju, upravljanje potrošnjom i sesijama. Dostupnost priključaka ovisi o proizvodu, korisničkom planu i administratorskim postavkama; provjerava se pri implementaciji.

## Identitet, uloge i pristup lokacijama

Vanjski klijent koristi OAuth prijavu i odobrenje pristupa na OVAMO autorizacijskom servisu. Ne prima korisnikovu lozinku. Tokeni imaju ograničen opseg i rok valjanosti; korisnik ili administrator mogu opozvati vezu. API ključevi modela i poslovnih integracija ostaju na serveru.

Predložene uloge su vlasnica, voditelj lokacije, nabava i računovodstvo. Vlasnica može imati pregled svih lokacija, voditelj svoje trgovine, nabava dopuštene dobavljače i narudžbe, a računovodstvo odobrene dokumente. Prava na podatke i prava na izvršavanje radnji odvojena su. Ni jedna uloga nije automatski ovlaštena za svaku radnju.

Backend pri svakom zahtjevu provjerava identitet, tvrtku, lokacije, dokument i dopuštenu radnju. Prompt i skriveni gumb nisu zaštita. Zajednički API ključ ne zamjenjuje osobni identitet. AI dobiva samo potreban podskup podataka, bez neograničenog SQL-a ili pristupa cijeloj bazi.

## Izvještaji s provjerljivim izvorima

Početni alati mogu dohvaćati stanje artikla po lokacijama, artikle ispod minimuma, prodaju po razdoblju, dospjele obveze i postojeće dokumente. Svaki rezultat navodi izvor, vremenski obuhvat, posljednju sinkronizaciju i poveznicu ili identifikator zapisa. Nepotpuni ili zastarjeli podaci jasno se označavaju.

Količine proizlaze iz evidencije kretanja robe: primka, prijenos, prodaja, povrat i odobrena korekcija. AI tumači rezultate; poslovni servis računa stanje i financijske pokazatelje. Prihod, bruto marža i novčani tok prikazuju se odvojeno. Neto dobit zahtijeva cjelovite troškove i rashode; prodaja i nabavna cijena sami nisu dovoljne. Projekcije potražnje i nabave navode pretpostavke, razdoblje i ograničenja podataka.

## Nacrt → odobrenje → izvršenje

Prvi alati za pisanje stvaraju nacrte: prijedlog prijenosa robe, narudžbenicu, odgovor kupcu ili dokument za računovodstvo. Nacrt prikazuje stavke, količine, lokacije, primatelja, iznose i posljedice. Ovlaštena osoba potvrđuje točno taj sadržaj prema pravilima OVAMO-a.

Pri izvršenju server ponovno provjerava ovlasti i verziju podataka. Promijenjena cijena, stanje ili sadržaj nacrta zahtijevaju ponovnu provjeru i, kada utječu na odobreni sadržaj, novo odobrenje. Jedinstveni ključ operacije sprječava dvostruko knjiženje pri ponovljenom zahtjevu; provjera verzije sprječava izvršavanje zastarjelog prijedloga. Povezane promjene provode se u transakciji ili usklađenom integracijskom procesu.

Audit zapis povezuje korisnika, AI klijent, alat, ulazne parametre, odobrenje, vrijeme, rezultat i nastali dokument. Vanjski AI klijent može imati vlastitu potvrdu alata, ali ona ne zamjenjuje poslovno odobrenje na serveru. Slanje narudžbi, izmjene cijena, povrati i službeno knjiženje zadržavaju dogovorene kontrolne točke. Računi i fiskalizacija prolaze odabrani poslovni sustav i njegovu validaciju.

## Automatizacija i tri faze isporuke

MCP omogućuje poziv alata; raspored rada i okidači implementiraju se zasebno. Scheduler ili red poslova pokreće jutarnji izvještaj, upozorenje o minimumu ili obradu događaja iz prodaje. Potrebni su ograničenja opsega, ponavljanje nakon greške, sprečavanje duplikata, evidencija i mogućnost zaustavljanja.

1. **Čitanje i analiza.** Povezati stvarne izvore, osobnu prijavu i ograničenja lokacija. Potvrditi izvještaje usporedbom s POS/ERP zapisima, uključujući povrate i nepotpunu sinkronizaciju.
2. **Nacrti i odobrenja.** Uvesti pripremu odabranih dokumenata te ovlašteno izvršenje. Provjeriti odbijena prava, promijenjene podatke, ponovljene zahtjeve i trag odobrenja.
3. **Ograničena automatizacija.** Automatizirati provjerene rutine prema unaprijed odobrenim pravilima. Početi jednom lokacijom i uskim skupom radnji; širiti nakon praćenja rezultata i iznimki.

## Opseg i cijena

Ovaj dokument ne daje novu ponudu ni rok. AI/MCP, poslovne aplikacije, integracije i automatizacija **nisu uključeni u preostalih 2.500 € za osnovnu web-stranicu i katalog**. Njihov opseg, hosting, API potrošnja i održavanje procjenjuju se zasebno nakon provjere postojećeg POS/ERP sustava. Početnih 2.000 € obračunava se prema objavljenoj ponudi, bez dvostrukog pribrajanja projektu.

## Buduća arhitektura: Sirius na Macu i privatna mreža

**Prijedlog za pilot, bez konfiguriranja uređaja.** Sirius bi se mogao prilagoditi u središnji poslovni servis na namjenskom Macu, a odobreni uređaji pristupati njegovoj web aplikaciji preko Tailscale mreže. Prvo treba pregledati postojeći Sirius: može li raditi bez otvorenog korisničkog sučelja, podržava li više istodobnih korisnika te kako čuva podatke i provodi ovlasti. Sama dostupnost aplikacije preko mreže ne rješava te zahtjeve.

### Pristup zaposlenika

Tailscale ima klijente za macOS, Windows, Linux, iOS i Android. [Serve](https://tailscale.com/docs/features/tailscale-serve) može izložiti lokalni web servis samo unutar odobrene privatne mreže, uz mrežna pravila pristupa. Zaposlenik koristi Tailscale vezu i zasebnu OVAMO prijavu. Mrežna dozvola određuje može li doći do servisa; OVAMO uloga određuje koje poslovnice, dokumente i radnje smije koristiti. Bazu otvara samo server; uređaji šalju zahtjeve API-ju, umjesto da dijele datoteku baze preko mrežnog diska.

### Povezivanje vanjskog AI-ja

Claude i ChatGPT u oblaku ne postaju članovi privatne Tailscale mreže zato što je korisnikov uređaj povezan. Za pilot je jednostavno da Sirius sam poziva odabrani AI API i lokalno izvršava odobrene poslovne alate. Odabrani podaci potrebni modelu tada se šalju AI pružatelju; lokalni server ne znači da sva AI obrada ostaje na Macu.

Za izravni vanjski MCP pristup postoje zasebni tuneli. OpenAI dokumentira [Secure MCP Tunnel](https://developers.openai.com/api/docs/guides/secure-mcp-tunnels), uz stalno pokrenut klijent, povezivanje s odgovarajućim radnim prostorom i ovlasti za korištenje tunela. Claude također ima [platformske MCP tunele](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/overview); pristup iz same Claude aplikacije trenutačno je [istraživački Enterprise pregled na zahtjev](https://claude.com/docs/connectors/mcp-tunnels/overview). Dostupnost se provjerava prije odabira rješenja.

[Funnel](https://tailscale.com/docs/features/tailscale-funnel) javno izlaže odabrani servis. Stoga nije zamjena za privatni Serve. Ako se odabere javni MCP ulaz, objavljuje se samo ograničen i autentificiran API, uz prethodno dogovorenu konfiguraciju. Nijedna od ovih mogućnosti nije uključena ili postavljena ovom demonstracijom.

### Pouzdanost pilota i širenje

Za pilot preporučujemo namjenski stalno uključen Mac, žičnu vezu, UPS, nadzor servisa, kontrolirane nadogradnje i provjeren postupak ponovnog pokretanja. macOS nudi postavke sprečavanja spavanja i oporavka nakon nestanka struje, ovisno o modelu. Treba provjeriti i ponašanje servisa nakon restarta te zahtjev za otključavanjem šifriranog diska. Sigurnosne kopije baze moraju biti konzistentne, šifrirane i spremljene i izvan tog Maca; oporavak se praktično provjerava.

Jedan Mac i jedna internetska veza ostaju zajednička točka prekida. Za mrežu trgovina diljem Hrvatske predlažemo izdvojiti pouzdanu središnju bazu/API ili osigurati rezervni poslužitelj i dokumentiran prijelaz. Blagajne trebaju vlastiti podržani način rada pri prekidu i naknadno usklađivanje prema mogućnostima odabranog POS sustava. Dostupnost prodaje ne bi smjela ovisiti o AI odgovoru. Zaštita, rezervni kapacitet i oporavak projektne su preporuke, a ne automatske značajke Tailscalea.

Za komercijalnu uporabu treba odgovarajući poslovni Tailscale plan: njihov Personal plan namijenjen je nekomercijalnoj uporabi. Troškovi uređaja, poslovnog plana, AI-ja i održavanja utvrđuju se zasebno, nakon pregleda Siriusa i broja korisnika/lokacija.

## Službeni izvori

Dokumentacija pregledana 21. listopada 2026.; mogućnosti proizvoda ponovno provjeriti prije razvoja:

- [OpenAI: Connectors and remote MCP servers](https://developers.openai.com/api/docs/guides/tools-connectors-mcp)
- [OpenAI: Build a custom MCP server](https://developers.openai.com/api/docs/guides/custom-mcp-server)
- [Claude: Get started with custom connectors using remote MCP](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)
- [Claude: Authentication for connectors](https://claude.com/docs/connectors/building/authentication)
- [Claude API: MCP connector](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector)
- [MCP: Understanding authorization](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/authorization)
- [MCP: Tools and user interaction](https://modelcontextprotocol.io/specification/2026-07-28/server/tools)
- [Tailscale: Serve — privatni pristup servisima](https://tailscale.com/docs/features/tailscale-serve)
- [Tailscale: Funnel — javni pristup servisima](https://tailscale.com/docs/features/tailscale-funnel)
- [Tailscale: podržane platforme](https://tailscale.com/download)
- [Tailscale: planovi i komercijalna uporaba](https://tailscale.com/pricing)
- [Apple: postavke energije stolnog Maca](https://support.apple.com/guide/mac-help/change-energy-settings-mchlp1168/mac)
- [OpenAI: Secure MCP Tunnel](https://developers.openai.com/api/docs/guides/secure-mcp-tunnels)
- [Claude Platform: MCP tunnels](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/overview)
- [Claude aplikacija: MCP tunnels i uvjeti pristupa](https://claude.com/docs/connectors/mcp-tunnels/overview)

Poslovne uloge, odobrenja, evidencija i faze u ovom dokumentu projektni su prijedlog za OVAMO, a ne ugrađena jamstva protokola MCP ili pojedinog AI klijenta.
