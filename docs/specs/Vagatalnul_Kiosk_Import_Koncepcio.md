# Vágatlanul – Kiosk adatimport és fájlrendszer koncepció

## 🎯 Cél
Egyszerű, ismételhető, ember által ellenőrizhető adatimport-folyamat létrehozása a kioszk alkalmazáshoz.
A megoldás célja, hogy a múzeum által előállított Excel- és képfájl-struktúrából egy konzisztens, offline használható
adatállomány keletkezzen, amely később a webes rendszerben is felhasználható.

---

## 📂 Kimeneti struktúra (import után)

```
/kiosk_data/
  data.json                ← szöveges/meta adatok HU/EN
  cities.json              ← várospontok (lat/lon, megjelenített nevek)
  images/
    <studio_slug>/
      thumbs/              ← előre legenerált bélyegképek (gyors UI)
      originals/           ← eredeti (vagy webre optimalizált) képek
      _manifest.json       ← képfájlok listája ABC-sorrendben
```

---

## 🧱 Adatformátumok

### 1. `data.json` – Szöveges és strukturált adatok

```json
{
  "studios": [
    { "id": "mu_001", "name_hu": "Műterem 1", "name_en": "Studio 1", "slug": "mu_001" }
  ],
  "items": [
    {
      "id": "mu_001_0001",
      "studio_id": "mu_001",
      "city_code": "BP",
      "title_hu": "Cím HU",
      "title_en": "Title EN",
      "desc_hu": "Leírás HU",
      "desc_en": "Description EN",
      "year": 1932
    }
  ]
}
```

- Az Excel sorai az `items[]` tömbbe kerülnek.
- Képek **nem** szerepelnek az Excelben.
- A képek listáját az adott mappa `_manifest.json` fájlja tartalmazza.

---

### 2. `cities.json` – Várospontok

```json
[
  { "code": "BP", "lat": 47.4979, "lon": 19.0402, "name_hu": "Budapest", "name_en": "Budapest" },
  { "code": "DEB", "lat": 47.5316, "lon": 21.6273, "name_hu": "Debrecen", "name_en": "Debrecen" }
]
```

- Fix, egyszeri lista (ritkán változik).
- Az Excel `city` mezőjét pontos egyezéssel mappeljük `city_code`-ra.

---

### 3. `<studio_slug>/_manifest.json` – Képfájlok listája

```json
{
  "images": [
    "originals/0001.jpg",
    "originals/0002.jpg",
    "originals/0003.jpg"
  ],
  "thumbs": [
    "thumbs/0001.jpg",
    "thumbs/0002.jpg",
    "thumbs/0003.jpg"
  ]
}
```

- A képfájlok listája **ABC-sorrendben** kerül ide az import során.
- A kioszk alkalmazás innen tölti be a képek megjelenítési sorrendjét.
- A sorrend bármikor módosítható a JSON fájl kézi szerkesztésével.

---

## 🧮 Folyamat (import és ellenőrzés)

1. **Bemenet:**  
   - Mappák műtermenként: `/<műterem>/meta.xlsx` + képek ugyanott.

2. **Import lépések:**  
   - Excel → `data.json` konverzió (kétnyelvű szövegek).  
   - Képek átnézése → `thumbs` generálás (pl. 600px hosszabb él).  
   - ABC-sorrend generálása → `_manifest.json` írása műtermenként.

3. **Kimenet:**  
   - `/kiosk_data` mappa (JSON + képek).

4. **Validálás:**  
   - Nincs automatikus ellenőrzés.  
   - A kioszk app futtatása után **szemrevételezéssel** történik az ellenőrzés.

5. **Javítás:**  
   - Hibás adat vagy hiányzó kép esetén az Excel vagy a képek frissíthetők.  
   - Az import újrafuttatható – minden futás idempotens (teljesen újraépíti az outputot).

---

## 🧩 Bélyegképek (thumbs)

- A kioszk galéria teljesítményét növelik.  
- Generálás be van kalkulálva a ráfordításbecslésbe.  
- Az eredeti képek is elérhetők maradnak az `originals/` mappában.  
- A thumbnail-generálás során nincs egyedi méretezés vagy vízjel.

---

## 🔁 Kompatibilitás a jövőbeni webes CMS-sel

Ez a fájlrendszeri és adatformátum **teljes mértékben újrahasznosítható** a webes megoldásban is, ha a MuseumPlus helyett saját CMS-t kell fejlesztenünk.

- A `data.json` és a képmappák struktúrája közvetlenül betölthető egy webes backendbe.  
- A `_manifest.json`-os képlista ideális kiindulópont lehet későbbi adminisztrációs felületen történő képrendezéshez.  
- Az adattartalom változtatás nélkül felhasználható online publikálásra.

---

## 📋 Összegzés

| Elem | Cél | Megjegyzés |
|------|-----|-------------|
| `data.json` | Szöveges metaadatok HU/EN | Excelből generálva |
| `cities.json` | Városadatok, térképes megjelenítéshez | Egyszeri lista |
| `_manifest.json` | Képek listája, sorrend | ABC-sorrend, könnyen módosítható |
| `thumbs/` | Bélyegképek | Ráfordításbecslésben benne van |
| `originals/` | Eredeti képek | Megőrizve |
| Validálás | Szemrevételezéssel | Egyszerű folyamat |

---

📄 *A kioszk importfolyamat célja: egyszerűség, átláthatóság és újrahasznosíthatóság a későbbi webes rendszerben is.*
