/**
 * Hungary county seats (vármegyeszékhelyek) with coordinates - 2025
 * Source: OpenStreetMap and official Hungarian administrative data
 */

export type CountySeat = {
  name: string;
  county: string;
  latitude: number;
  longitude: number;
  hasStudio: boolean; // Will be determined by checking against studio data
};

export const COUNTY_SEATS: CountySeat[] = [
  { name: 'Budapest', county: 'Budapest', latitude: 47.4979, longitude: 19.0402, hasStudio: false },
  { name: 'Pécs', county: 'Baranya', latitude: 46.0727, longitude: 18.2328, hasStudio: false },
  { name: 'Kecskemét', county: 'Bács-Kiskun', latitude: 46.9077, longitude: 19.6912, hasStudio: false },
  { name: 'Békéscsaba', county: 'Békés', latitude: 46.6836, longitude: 21.0894, hasStudio: false },
  { name: 'Miskolc', county: 'Borsod-Abaúj-Zemplén', latitude: 48.1035, longitude: 20.7784, hasStudio: false },
  { name: 'Szeged', county: 'Csongrád-Csanád', latitude: 46.253, longitude: 20.1414, hasStudio: false },
  { name: 'Székesfehérvár', county: 'Fejér', latitude: 47.1817, longitude: 18.4161, hasStudio: false },
  { name: 'Győr', county: 'Győr-Moson-Sopron', latitude: 47.6875, longitude: 17.6504, hasStudio: false },
  { name: 'Debrecen', county: 'Hajdú-Bihar', latitude: 47.5316, longitude: 21.6273, hasStudio: false },
  { name: 'Eger', county: 'Heves', latitude: 47.9025, longitude: 20.377, hasStudio: false },
  { name: 'Szolnok', county: 'Jász-Nagykun-Szolnok', latitude: 47.1733, longitude: 20.1789, hasStudio: false },
  { name: 'Tatabánya', county: 'Komárom-Esztergom', latitude: 47.5692, longitude: 18.4042, hasStudio: false },
  { name: 'Salgótarján', county: 'Nógrád', latitude: 48.0983, longitude: 19.8028, hasStudio: false },
  { name: 'Kaposvár', county: 'Somogy', latitude: 46.3595, longitude: 17.7966, hasStudio: false },
  { name: 'Nyíregyháza', county: 'Szabolcs-Szatmár-Bereg', latitude: 47.9559, longitude: 21.7186, hasStudio: false },
  { name: 'Szekszárd', county: 'Tolna', latitude: 46.3474, longitude: 18.7094, hasStudio: false },
  { name: 'Szombathely', county: 'Vas', latitude: 47.2308, longitude: 16.6218, hasStudio: false },
  { name: 'Veszprém', county: 'Veszprém', latitude: 47.0929, longitude: 17.9093, hasStudio: false },
  { name: 'Zalaegerszeg', county: 'Zala', latitude: 46.8408, longitude: 16.8411, hasStudio: false },
];
