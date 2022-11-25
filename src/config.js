
require('dotenv').config();

const devLocal = 'http://localhost/gms_server/';
const prodServer = 'http://192.168.1.234/asana_generator/';

export const apiUrl = process.env.NODE_ENV == 'development' ? `${prodServer}API` : `${prodServer}API`;
export const url = process.env.NODE_ENV == 'development' ? `${prodServer}` : `${prodServer}`;

export const designFilesOptions = [
  {id: 'wizualizacja', value: 'wizualizacja'},
  {id: 'pliki od klienta', value: 'pliki od klienta'},
  {id: 'zdjecia realizacji', value: 'zdjecia realizacji'},
  {id: 'foto komentarz', value: 'foto komentarz'},
];

export const currencyOptions = [
  {id: 'PLN', value: 'PLN'},
  {id: 'EUR', value: 'EUR'},
  {id: 'USD', value: 'USD'},  
];

export const storeUpdateIntervals = {
  projects : 5*60*1000,
  designs: 5*60*1000,
}

//Pricelist Configurator
export const fullOrder = ["Plating", "Coating", "Antique", "Service", "Varnishing", "Engraving"];
export const sideOrder = ["Plating", "Coating", "Coloring", "Coloring Digital", "Antique", "Hologram",  "Glow", "Engraving", "Inserting", "Numbering",  "Sticker 3d"];
