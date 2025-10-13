# VÁGATLANUL - Térképes Alkalmazás Specifikáció

## Projekt Áttekintés

**Megrendelő:** Néprajzi Múzeum (NM)

**Projekt neve:** Vágatlanul - Térképes alkalmazás

**Projekt leírása:** Dual-platform megoldás történelmi fotóműtermek és munkáik bemutatására interaktív térképes felületen keresztül.

**Projektfázisok:**
- **1. Fázis:** Kioszk verzió (kiállításban működő verzió)
- **2. Fázis:** Webes verzió (online platform CMS-sel)

---

## Időzítés és Határidők

| Fázis | Verzió | Deadline | Megnyitó |
|-------|--------|----------|----------|
| 1. Fázis | Kioszk verzió | 2026. január vége | 2026. február 12. |
| 2. Fázis | Webes verzió | 2026. július 5. | - |

**Support időzítés:**
- Fejlesztés után: 2026. július 12-ig intenzív support
- Folyamatos: Webes verzió támogatása
- Éves rendelkezésre állás: Havi 2-3 óra (éves szinten összevonható)

---

# 1. FÁZIS: KIOSZK VERZIÓ

## 1.1 Áttekintés

**Platform:** Érintőképernyős kiállítási alkalmazás
**Működési mód:** Teljes offline működés, helyi adatbázis
**Telepítés helye:** Kiállítási tér
**Célközönség:** Kiállítás látogatói

## 1.2 Felhasználói Történet (User Story)

A látogató a kiállításban lévő érintőképernyőn egy képernyővédőn Magyarország térképével lát animációt, ami színben és stílusban igazodik a kiállításhoz.

**Használati folyamat:**
1. A képernyő megérintésével betöltődik az app
2. Látogató választ nyelvet (magyar/angol) - nyelvváltó gomb végig látható
3. Térképen kiemelt helységek egyikét megérinti
4. Full screen lightbox megnyílik:
   - Első képernyő: Fotóműterem szöveges infója (név, hely, stb)
   - Swipelésre: Fotók jelennek meg (10-20 db/műterem)
   - Fotók mellett/alatt: Szöveges metaadatok
5. Lightbox bezárása után visszatér a térképre
6. Inaktivitás után: Screensaver CTA gombbal

## 1.3 Funkcionális Követelmények

### 1.3.1 Térkép
- **Típus:** Magyarország térképe
- **Interakció:** Fix, NEM zoomolható
- **Megjelenítés:** 21 kiemelt fotóműterem
- **Kiemelés:** Speciális szín vagy vizuális jelölés
- **Térkép forrása:**
  - Vagy NM biztosít kész grafikát
  - Vagy ingyenes, nyílt forráskódú térkép testreszabása

### 1.3.2 Fotóműtermek Megjelenítése

**Térképen:**
- Helységnévvel jelölve
- Kattintható/érintehető

**Fotóműterem Adatok:**
- Név
- Születési-halálozási adatok
- Műterem helye
- Címe
- Üvegnegatívok száma
- Leltári számok

**Adatforrás:**
- Excel táblázat
- Képfile-ok mappába rendezve
- 70-80 helyszín összesen (ebből 21 kiemelt a kioszkban)
- Helyszínenként 10-20 kép
- **Fontos:** GPS koordináták NINCSENEK, csak helységnevek

### 1.3.3 Fotógaléria (Lightbox)

**Funkcionalitás:**
- Full screen lightbox
- Lapozható VAGY swipeolható
- Becsukható
- Első képernyő: Info panel műterem adatokkal
- Swipelésre: Fotók (álló és fekvő képek vegyesen)

**Fotó Metaadatok:**
- Cím
- Készítés helye
- Készítés ideje
- Készítő neve
- Leltári szám

**Képek száma:** 10-20 db/fotóműterem

### 1.3.4 Többnyelvűség

**Támogatott nyelvek:**
- Magyar (alapértelmezett)
- Angol

**Megvalósítás:**
- Nyelvváltó gomb folyamatosan látható az alkalmazásban
- Fordítást NM biztosítja Excel formátumban

### 1.3.5 Screensaver és Inaktivitás

**Működés:**
- X perc inaktivitás után automatikusan elindul
- Magyarország térkép animáció
- Kiállítási arculathoz illeszkedő színek és stílus
- CTA (Call-to-Action) gomb a visszatéréshez

**Cél:** Látogatók figyelmének felkeltése

### 1.3.6 Automatikus Működés

**Napi újraindítás:**
- PC automatikusan újraindul naponta egyszer
- App automatikusan elindul emberi beavatkozás nélkül
- Teljes automata működés

**Offline működés:**
- NINCS szükség internet kapcsolatra
- NINCS szükség adatbázis kapcsolatra
- Minden adat helyben tárolva

## 1.4 Technikai Követelmények

### 1.4.1 Hardver

**Elsődleges platform:**
- Raspberry Pi 5
- Debian alapú Linux operációs rendszer

**Alternatív platform:**
- Régebbi PC
- Fedora Linux operációs rendszer

**Kijelző:**
- Múzeumi full HD érintőképernyő
- Múzeum biztosítja

**Fontos:** Hardver tesztelési lehetőség rendelkezésre áll a fejlesztés során

### 1.4.2 Adatkezelés

**Adatbázis:** Helyi (offline) adatbázis

**Adatforrás:**
- Excel táblázatok
- Képfile-ok mappákban szervezve

**Adatstruktúra:**
- Fotóműtermek: 21 kiemelt helyszín
- Fotók: 10-20 db/műterem
- Metaadatok: név, dátumok, helyek, címek, leltári számok

### 1.4.3 Installálás

- Helyszíni telepítés szükséges
- Minimum egy alkalommal ki kell menni a helyszínre

## 1.5 UX/UI Követelmények

### 1.5.1 Design Elvárások

**Általános:**
- Igényes, modern UI
- Jelenkori elvárásokhoz és trendekhez igazodó
- Látogatóközönség UX folyamatait figyelembe vevő
- Részletesen kidolgozott, szofisztikált megoldások

**Arculat:**
- NM biztosítja az arculati elemeket és szabályokat
- Kiállítási designhoz illeszkedő

### 1.5.2 Animációk és Motion Design

**Kiemelten fontos területek:**
- Loading állapotok
- Transition-ök
- Animált mozgások
- Szépen felépülő design elemek
- Szofisztikált motion design

### 1.5.3 Tesztelés

**Tesztelendő területek:**
- Érintőképernyő funkcionalitás
- Automatikus újraindítás
- Offline működés
- Screensaver aktiválás
- Nyelvváltás
- Galéria navigáció
- Bugfixek

---

# 2. FÁZIS: WEBES VERZIÓ

## 2.1 Áttekintés

**Platform:** Online webalkalmazás
**Működési mód:** MuseumPlus API integráció
**Eszközök:** Desktop, mobil, múzeumi 55" érintőképernyő
**Célközönség:** Online látogatók, kutatók

## 2.2 Felhasználói Történet (User Story)

A felhasználó belép az online felületre, elvégzi a süti beállításokat (desktopon és álló mobilon is). A kezdő képernyőn látja, elolvassa és megérti az alkalmazás lényegét.

**Használati folyamat:**
1. Térképen navigál (nagyítható, kicsinyíthető)
2. Jelzett helyekre kattint → lightbox nyílik szöveges infókkal és képekkel
3. Lista nézetben böngészik, sorrendezhet
4. Szabadszavas keresést használ, filterez
5. Információs oldalakat olvas (impresszum, projekt infó)

## 2.3 Funkcionális Követelmények

### 2.3.1 Térkép

**Funkciók:**
- Nagyítható (zoom-olható)
- Kicsinyíthető
- Panolható (görgetés)

**Fontos:** Nincsenek Magyarországon kívüli helyek

**Kiválasztott kép/műterem esetén a térképen megjelenítendő adatok** (képenként változik):
1. Műterem helye (pl. Baja)
2. Kép készítésének helye, ha kiment a fotós (pl. Szeremle)
3. Vonzáskörzet - ahonnan jött a fényképzett (pl. Dávod)

### 2.3.2 Adatintegráció

**MuseumPlus API:**
- API dokumentáció: https://docs.zetcom.com/framework-public/index.html
- Adatok és képek forrása: MuseumPlus adatbázis

**Adatstruktúra:**
- Név
- Születési-halálozási adatok
- Műterem helye
- Címe
- Leltári számok

**További adatok:**
- Excel táblázatból: pl. vonzáskörzet
- 70-80 műterem helyszín
- Vonzáskörzetek: 0-102 db/helyszín
- Összesen 600 kapcsolódó helység
- Évekre lebontva ~3000 kép folyamatos feltöltése

### 2.3.3 CMS (Content Management System)

**Minimál CMS követelmények:**

**Jogosultságok:**
- Egy role: szerkesztő + publikáló kombinálva
- Korlátlan szimultán belépés

**Funkciók:**
- Szövegszerkesztés
- Képek feltöltése
- Képek törlése
- Képek sorrendezése
- Undo lehetőség
- Publikálás előtti preview

**Fontos döntés - két opcióra árazni:**
1. **MuseumPlus CMS bővítése:** Tartalomszerkesztési funkció fejlesztése a MuseumPlus-ba
2. **Külön frontend CMS:** WYSIWYG szerkesztő (valószínűleg egyszerűbb)

**Tartalom menedzsment workflow:**
- 70-80 műterem helyszín + vonzáskörzetek hozzárendelése
- NM tölti fel adatokkal
- NM publikál, amikor kész
- 600 kapcsolódó helység struktúráját elő lehet készíteni
- ~3000 kép folyamatos feltöltése évekre lebontva

### 2.3.4 Keresés és Szűrés

**Szabadszavas keresés:**
- Mindenben keres (szövegek, képek, adatok)
- Keresőmező prominens helyen

**Filterek:** 3-6 filter (példák)
- Férfi / Nő
- Egyéni kép / Csoportkép
- Évszám (tartomány)
- Településnév
- Fényképész neve
- NM taggeli a képeket

**Találatok:**
- Sorrendezhető
- Lista nézet

**Technikai megvalósítás:**
- MuseumPlus lekéri a rekordokat API-n keresztül
- Keresés és szűrés a frontenden történik
- Frontend adatszűrés az előre letöltött rekordokon

### 2.3.5 Fotók Megtekintése

**Lista nézetek:**

1. **Összes fotó lista nézet**
   - Minden fotó
   - 3-6 filter
   - Sorrendezés

2. **Kiválasztott hely fotói**
   - Helységre kattintás után jelenik meg
   - "Galéria nézet" vagy hasonló (designtól függ)

**Fotó nagyítás:**
- Belenagyíthatók
- Felhasználási feltételek elfogadása szükséges (külső link)
- Nagyfelbontású letöltés NEM engedélyezett
- "Zoom and pan" VAGY "Zoom crop" funkció
- Mobilon: Pinch-to-zoom (alvállalkozóval pontosítandó)

**Fotó metaadatok:**
- Cím
- Készítés helye
- Készítés ideje
- Készítő
- Leltári szám

### 2.3.6 Link Múzeumi Adatbázishoz

- Képekhez link a MuseumPlus adatbázishoz
- Csak akkor, ha a rekord publikus

### 2.3.7 Azonnali Visszajelzés (Contact Form)

**Funkció:**
- Kép oldalon contact box
- Minden képnek saját URL

**E-mail generálás:**
- Automatikusan nyit email-t
- Prefilled adatok:
  - Kép URL-je
  - Kép leltári száma
- Muzeológus így kapja meg az összes szükséges infót

### 2.3.8 Információs Oldalak

**Impresszum és statikus oldalak:**
- 2-3 sima, szöveges oldal
- Tartalom:
  - Projekt háttere
  - Impresszum
  - Képek felhasználási feltételei
- Minimális szerkesztőfelület (szöveg)

### 2.3.9 Hibaoldal

- 404 oldal
- Egyéb hibaüzenetek
- Felhasználóbarát hibaüzenetek

### 2.3.10 Analitika és Követés

**Google Analytics:**
- Látogatói statisztikák
- Viselkedés követése

**Cookies:**
- Cookie kezelés
- Süti beállítások (GDPR-kompatibilis)
- Desktop és mobil view-ban is

### 2.3.11 Megosztás

**Megosztási opciók:**
- Facebook megosztás
- Link másolása
- Egyedi URL minden képhez

## 2.4 Technikai Követelmények

### 2.4.1 Responsive Design

**Eszközök:**
- Desktop (változó felbontások)
- Álló mobil view (adaptív design)
- Múzeumi hatalmas érintőképernyő: **55 inch optimalizáció**

**Design Tool:**
- Figma használata

### 2.4.2 API Integráció

**MuseumPlus API:**
- Dokumentáció: https://docs.zetcom.com/framework-public/index.html
- Kapcsolat API-n keresztül
- Adatok és képek szinkronizálása

### 2.4.3 Hosting és Környezet

**Offline működés (kiállításon):**
- Offline is működhet
- Nincs távoli hozzáférés
- Nincs SSL tanúsítvány

**Online működés:**
- SSL tanúsítvány elérhető [valami].neprajz.hu domain esetén
- Egyedi domain → külön SSL tanúsítvány szükséges
- Távoli elérés megoldható

### 2.4.4 Technológia Stack

**Nincs előírt technológia stack** - szabadon választható

## 2.5 UX/UI Követelmények

### 2.5.1 Design Elvárások

**Általános:**
- Igényes, modern UI
- Jelenkori elvárásokhoz és trendekhez igazodó
- Figyelembe veszi a felhasználói UX folyamatokat
- Részletesen kidolgozott, szofisztikált megoldások

**Arculat:**
- NM biztosítja az arculati elemeket és szabályokat

### 2.5.2 Animációk és Motion Design

**Kiemelten fontos területek:**
- Loading állapotok
- Transition-ök
- Animált mozgások
- Szépen felépülő design elemek

### 2.5.3 Tesztelés

**Tesztelendő platformok:**
- Mobil (álló view)
- Desktop (különböző felbontások)
- Érintőképernyő (55 inch)

**Tesztelendő funkciók:**
- Responsive működés
- API integráció
- Keresés és szűrés
- CMS funkciók
- Képnagytás
- Megosztás funkciók
- Bugfixek

---

# 3. KÖZÖS KÖVETELMÉNYEK ÉS INFORMÁCIÓK

## 3.1 Support és Karbantartás

**Fejlesztés utáni support:**
- Első körben: 2026. július 12-ig intenzív support
- Utána: Folyamatos webes verzió support

**Éves rendelkezésre állás:**
- Havi 2-3 óra
- Éves szinten összevonható
- Kisebb javítások és frissítések

## 3.2 Műszaki Adatok és Infrastruktúra

### Hardver (Kioszk verzió)

**Elsődleges:**
- Raspberry Pi 5
- Debian alapú Linux

**Alternatíva:**
- Régebbi PC
- Fedora Linux

**Kijelző:**
- Múzeumi full HD érintőképernyő
- NM biztosítja

**Fontos:** Hardver tesztelési lehetőség elérhető

### Hosting (Webes verzió)

**Offline mód:**
- Kiállításon lehet offline
- Nincs távoli hozzáférés
- Nincs SSL

**Online mód:**
- SSL: [valami].neprajz.hu domain alatt automatikus
- Egyedi domain: külön SSL szükséges
- Távoli elérés: megoldható

---

# 4. GYIK (Gyakran Ismételt Kérdések)

## Mi a fejlesztés és az élesítés határideje?
- **Kioszk verzió:** 2026. január vége
- **Webes verzió:** 2026. július 5.
- **Kiállítás megnyitó:** 2026. február 12.

## Van-e elvárt technológia stack?
**Nincs** - A fejlesztő szabadon választhat technológiát

## Az üzemeltetést a múzeum látja el?
**Igen** - A Néprajzi Múzeum üzemelteti az alkalmazást

## Szükség van-e supportra a fejlesztési időszak után?
**Igen**
- Első körben: 2026. július 12-ig
- Utána: Folyamatos webes support
- Éves keret: Havi 2-3 óra (összevonható)

## Van-e lehetőség a hardver tesztelére?
**Igen** - Hardver tesztelési lehetőség rendelkezésre áll a fejlesztés során

## Érintőképernyő paraméterei
- Múzeumi full HD képernyő
- NM biztosítja a hardvert

## PC/Raspberry Pi paraméterei (Kioszk)
- **Elsődleges:** Raspberry Pi 5 (Debian Linux)
- **Alternatíva:** Régebbi PC (Fedora Linux)
- **NM biztosítja** a hardvert

## Hosting és környezet (Webes verzió)
**Offline működés:**
- Kiállításon lehet offline
- Nincs távoli hozzáférés és SSL

**Online működés:**
- SSL: [valami].neprajz.hu alatt automatikus
- Egyedi domain: külön SSL kell
- Távoli elérés megoldható

## A kioszk verzióhoz kell-e internet?
**Nem** - Teljes offline működés:
- Nincs szükség internet kapcsolatra
- Nincs szükség adatbázis kapcsolatra
- Helyi adatbázis és képek
- PC naponta egyszer automatikusan újraindul
- App automatikusan elindul emberi beavatkozás nélkül

---

# 5. ÖSSZEFOGLALÓ ÁTTEKINTÉS

## Projekt Scope

| Elem | Kioszk verzió | Webes verzió |
|------|---------------|--------------|
| **Fotóműtermek** | 21 kiemelt | 70-80 összes |
| **Vonzáskörzetek** | - | 600 helység |
| **Képek száma** | ~210-420 | ~3000 (folyamatosan bővül) |
| **Térkép** | Fix, nem zoomolható | Zoomolható |
| **Működés** | Offline | Online (API integráció) |
| **Platform** | Raspberry Pi 5 / PC | Web (responsive) |
| **Nyelvek** | Magyar, Angol | Magyar, Angol |
| **CMS** | Nincs | Minimál CMS |
| **Keresés** | Nincs | Igen (szabad + filterek) |

## Kulcsfontosságú Információk

✅ **Nincs előírt technológia stack**
✅ **Hardver tesztelési lehetőség van**
✅ **NM biztosítja a hardvert**
✅ **Arculati elemeket NM adja**
✅ **Fordítást NM készíti**
✅ **Nincsenek Magyarországon kívüli helyek**
✅ **GPS koordináták nincsenek, csak helységnevek**

## Fontos Döntési Pontok az Ajánlatban

1. **CMS megoldás:** MuseumPlus bővítés VS külön frontend CMS (mindkettőre lehet árat adni)
2. **Platform választás:** Raspberry Pi 5 VS alternatív PC (mindkettőre kell felkészülni)
3. **Térkép:** NM ad kész grafikát VS nyílt forráskódú térkép testreszabása

---

**Dokumentum vége**
