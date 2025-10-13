# Vágatlanul projekt – Architektúrális döntések és irányelvek

## 🎯 Cél
Ez a dokumentum rögzíti a Vágatlanul projekt architektúrális irányait és a fő döntéseket. 
Nem célja minden technológiai részlet véglegesítése — az itt leírt koncepciók irányt adnak, 
de teret hagynak egy később csatlakozó architekt számára, hogy az aktuális környezethez 
és csapatpreferenciákhoz igazítsa a konkrét megvalósítást.

---

## 🏗️ Áttekintés
A projekt két fő komponensből áll:
1. **KIOSZK alkalmazás** – offline, helyben futó interaktív megoldás.
2. **WEBES alkalmazás** – online, MuseumPlus integrációval működő nyilvános webes felület.

Mindkét rendszer hasonló technológiai alapokon nyugszik, és közös adatszerkezetet, 
logikai réteget és fejlesztési szemléletet használ. A cél a **komponensek újrafelhasználhatósága** 
és a **minimális komplexitás**.

---

## ⚙️ Architektúra fő elemei

### 1. Backend-for-Frontend (BFF) elv
Mind a kioszk, mind a webes alkalmazás esetében a frontend egy **BFF rétegen** keresztül 
kommunikál az adatokkal. A BFF:
- absztrahálja az adatforrásokat (MuseumPlus API, helyi JSON-tár);
- konzisztens JSON-válaszokat ad a frontendnek;
- biztosítja a biztonságos és kontrollált hozzáférést az adatokhoz;
- cache-elési és logolási funkciókat lát el.

A kioszkban ez egy **BFF-mini**, amely lokálisan, offline fut, és csak a fájlrendszert olvassa.  
A webes verzióban a BFF a MuseumPlus API-t is eléri, és write-through cache-t valósít meg.

---

### 2. Adattárolás és adatszinkronizálás
- Az adatok **entitás-szintű JSON fájlokban** tárolódnak (egy műterem = egy fájl, egy kép = egy fájl).
- Az adatok elsődleges forrása mindig a **MuseumPlus**.
- A webes BFF minden lekérdezéskor **write-through módon** tükrözi a válaszokat a helyi fájlrendszeri tárba.
- A cache invalidálás **TTL-alapú**, a háttér-refresh opcionális.
- Nincs visszaírás a MuseumPlus-ba.
- A fájlírás **atomi**, `temp → rename` módszerrel.

---

### 3. Frontend alapelvek
- Modern SPA (Single Page Application) keretrendszer, pl. **React** vagy **Angular**.
- Közös komponensstruktúra kioszk és web között (pl. galéria, térkép, képlista, kereső).
- Kétnyelvűség (HU/EN) i18n JSON alapokon.
- A frontend mindig a BFF API-t hívja, közvetlenül nem éri el a fájlrendszert vagy a MuseumPlus API-t.
- A dizájn egyszerű, reszponzív, a múzeum arculatát követi.

---

### 4. Biztonság és stabilitás
- A BFF az egyetlen adat-hozzáférési pont (white-listed útvonalak).
- HTTPS minden környezetben.
- A MuseumPlus API kulcsai biztonságosan tárolva (pl. secrets manager).
- Cache-invalidation és write-through atomi működéssel biztosítja, hogy a fájlok soha ne legyenek sérültek.
- A webes megoldás fallback módban is működőképes (MuseumPlus kiesése esetén a cache-ből olvas).

---

### 5. Fejlesztési és üzemeltetési irányelvek
- **Nyelv és környezet:** a backend számára javasolt modern, típusbiztos környezet, pl. **.NET 8**, **Node.js**, vagy **Python FastAPI**.  
  A pontos választás az üzemeltetési környezet és a csapat tapasztalata alapján dönthető el.
- **Adatformátum:** JSON maradjon a kommunikáció alapja (API és fájlréteg is).
- **CI/CD:** automatizált build és deploy pipeline (Git alapokon, pl. Azure DevOps, GitHub Actions).
- **Monitoring:** minimális metrikák (cache hit rate, MP latency, hibaarány) legyenek elérhetők.
- **Deployment modell:** kioszk lokálisan fut, webes verzió konténerizált (Docker), a BFF külön szolgáltatásként.

---

### 6. Skálázhatóság és kiterjeszthetőség
- A webes architektúra horizontálisan skálázható (stateless BFF).
- A fájlrendszeri cache tárolható megosztott tárban (pl. NFS, blob storage).
- A CMS komponens később külön microservice-szé bontható.
- A JSON-séma verziózható, így később új mezők is felvehetők a kompatibilitás megtartásával.

---

### 7. Nyitott döntési pontok (az architekt számára)
A később csatlakozó architekt vagy vezető fejlesztő dönthet több kulcskérdésben:
- konkrét frontend framework: React / Angular;
- backend implementáció: .NET / Node.js / Python;
- pontos fájltár struktúra és naming convention;
- cache TTL paraméterei (időtartamok);
- CI/CD eszközlánc (Azure / GitHub / Jenkins);
- logolás és monitoring technológia (pl. ELK / OpenTelemetry / Application Insights).

---

## ✅ Összefoglalás
Az architektúra célja egyszerű, stabil és újrafelhasználható alapot biztosítani a Vágatlanul projekt számára.  
A kioszk és a webes verzió közös adatszerkezeten és elven működik, a rendszer biztonságos, és működik offline és online környezetben is.  
A tervezés szándékosan nyitott, hogy később bővíthető, korszerűsíthető és más projektekben is újrahasznosítható legyen.
