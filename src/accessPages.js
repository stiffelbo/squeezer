import {isAdmin, isDesigner, isPM, isIT, isEnnobler, isControling, isSuper} from './permissions';
import { getCurrentUser } from './services/authService';

const pages = [
    {link: "gem/projects", label: "tampondruk", roles : (isPM()||isDesigner()||isEnnobler())},
    {link: "gem/design", label: "asana", roles : (isPM()||isDesigner()||isEnnobler())},
    {link: "gem/quality", label: "przeglad wad", roles : (isPM()||isEnnobler())},
    {link: "gem/coins", label: "baza monet", roles : (isPM()||isDesigner()||isEnnobler())},
    {link: "gem/clients", label: "klienci", roles : (isPM()||isDesigner())},
    {link: "gem/pricelists", label: "cenniki", roles : (isPM())},
    {link: "gem/suppliers", label: "dostawcy", roles : (isPM()||isDesigner())},
    {link: "gem/services", label: "uslugi", roles : (isPM()||isDesigner())},    
    //{link: "gem/shippings", label: "wysylki / dostawy", roles : (isSuper())}, 
    {link: 'gem/invoices', label: 'faktury', roles : (isPM()||isDesigner())},
    {link: 'gem/prodTasks', label: 'zadania', roles : (isPM()||isAdmin())},
    {link: 'gem/reklamacje', label: 'reklamacje', roles : (isAdmin()||isPM())},
    {link: 'gem/itAssets', label: 'it assets', roles : (isSuper()||isIT())},
    {link: 'gem/itAssetsShifts', label: 'wydania it', roles : (isSuper()||isIT())},
    //{link: "gem/inventory", label: "magazyn", roles: true},    
];

const admin = [    
    {link: '/gem/dokumenty', label: 'Dokumenty', roles : (isPM()||isAdmin())},
    {link: '/gem/departments', label: 'Działy', roles : (isAdmin()||isIT())},
    {link: "/gem/pracownicy", label: "Pracownicy", roles : (isAdmin()||isIT()||isControling())}, 
    {link: '/gem/statuses', label: 'Statusy', roles : (isAdmin()||isIT())}, 
    {link: '/gem/capsules', label: 'Kapsle', roles : (isAdmin()||isPM())}, 
    {link: '/gem/types', label: 'Typy', roles : (isAdmin()||isPM()||isIT())}, 
    {link: '/gem/proceses', label: 'Procesy', roles : (isAdmin()||isPM())}, 
    {link: '/gem/materials', label: 'Materiały', roles : (isAdmin()||isPM())}, 
    {link: '/gem/machines', label: 'Maszyny', roles : (isAdmin()||isPM())}, 
    {link: '/gem/ennoblings', label: 'Uszlachetnienia', roles : (isAdmin()||isPM())}, 
    {link: '/gem/shippingMethods', label: 'Metody Dostawy', roles : (isAdmin()||isPM())},
    {link: '/gem/periods', label: 'Wynagrodzenia', roles : (isSuper()||isControling())},
    {link: '/gem/rodzajeWad', label: 'Rodzaje Wad', roles : (isAdmin()||isPM())},
    {link: '/gem/test', label: 'Test', roles : (isAdmin())},
];

export const addNew = [
    {id: 'Klient', value: 'Dodaj Klienta', roles: (isPM())},
    {id: 'Adres', value: 'Dodaj Adres Klienta', roles: (isPM())},
    {id: 'Kontakt', value: 'Dodaj Kontakt Klienta', roles: (isPM())},
    {id: 'Moneta', value: 'Dodaj Monetę', roles: (isPM() || isDesigner())},
    {id: 'Dostawca', value: 'Dodaj Dostawce', roles: (isPM())},
    {id: 'Usluga', value: 'Dodaj Uslugę', roles: (isPM())},
    {id: 'Design', value: 'Dodaj Design', roles: (isPM())},
    {id: 'Wysylka', value: 'Dodaj Wysylkę', roles: (isPM())},
    {id: 'Faktura', value: 'Dodaj Fakturę', roles: (isPM() || isDesigner())},
    {id: 'It Asset', value: 'Dodaj Asset', roles: (isAdmin || isIT())},
    {id: 'Dokument', value: 'Dodaj Dokument', roles: (isAdmin || isPM())},
];

export const access = () => {
    const user = getCurrentUser();
    if(user){
        return pages;
    }else{
        return [];
    }    
}

export const accessAdmin = () => {
   return admin;  
}

//Tabsy

export const tabs = {
    clients : [
        {label: 'Nowy Klient', value: 'addClient', roles: true},
        {label: 'Edycja', value: 'edit', roles: true},
        {label: 'Designy', value: 'designs', roles: true},
        {label: 'Kontakty', value: 'contacts', roles: true},
        {label: 'Adresy', value: 'adresses', roles: true},
        {label: 'Notatki', value: 'notes', roles: true},
        {label: 'Pliki', value: 'files', roles: true},
        {label: 'Stock', value: 'stock', roles: true},
        {label: 'Cenniki', value: 'pricelists', roles: true},
    ],
    suppliers : [
        {label: 'Nowy Dostawca', value: 'addSupplier', roles: true},
        {label: 'Edycja', value: 'edit', roles: true},
        {label: 'Usługi / Towary', value: 'goods', roles: true},
        {label: 'Kontakty', value: 'contacts', roles: true},
        {label: 'Adresy', value: 'adresses', roles: true},
        {label: 'Notatki', value: 'notes', roles: true},
        {label: 'Pliki', value: 'files', roles: true},
        {label: 'Zakupy', value: 'purchase', roles: true},
        {label: 'Oferty', value: 'offers', roles: true},
    ],
    services : [
        {label: 'Nowa Usluga', value: 'addService', roles: true},
        {label: 'Edycja', value: 'edit', roles: true},
        {label: 'Sprzedaż', value: 'sale', roles: true},
    ],
    quality : [
        {label: 'Edycja', value: 'edit', roles: true},
    ],
    machines : [
        {label: 'Nowa Maszyna', value: 'addMachine', roles: true},
        {label: 'Edycja', value: 'edit', roles: true},
    ],
    rodzajeWad : [
        {label: 'Nowy Rodzaj Wady', value: 'addRodzajWAdy', roles: true},
        {label: 'Edycja', value: 'edit', roles: true},
    ],
    itAssets : [
        {label: 'Nowy Asset', value: 'addAsset', roles: (isAdmin() || isIT())},
        {label: 'Edycja', value: 'edit', roles: (isAdmin() || isIT())},
        {label: 'Pliki', value: 'files', roles: (isAdmin() || isIT())},
        {label: 'Wydania', value: 'shifts', roles: (isAdmin() || isIT())},
    ],
    itAssetsShifts : [
        {label: 'Edycja', value: 'edit', roles: (isAdmin() || isIT())},
        {label: 'Pliki', value: 'files', roles: (isAdmin() || isIT())},
    ],
    capsules : [
        {label: 'Nowy Kapsel', value: 'addCapsule', roles: true},
        {label: 'Edycja', value: 'edit', roles: true},
    ],
    invoices : [
        {label: 'Nowa Faktura', value: 'addInvoice', roles: true},
        {label: 'Edycja', value: 'edit', roles: true},
        {label: 'Pozycje', value: 'positions', roles: true},
    ],
    coins : [
        {label: 'Nowa Moneta', value: 'addCoin', roles: isPM()},
        {label: 'Edycja', value: 'edit', roles: true},
        {label: 'Dodaj Design', value: 'addDesign', roles: isPM()},
        {label: 'Designy', value: 'designs', roles: true},
    ],
    design : [
        {label: 'Nowy Design', value: 'addDesign', roles: isPM()},
        {label: 'Edycja', value: 'edit', roles: (isDesigner() || isPM() || isEnnobler())},
        {label: 'Moneta', value: 'coin', roles: true},
        {label: 'Dodaj Zlecenie', value: 'addProject', roles: isPM()},
        {label: 'Dodaj Czas', value: 'addWorklog', roles: true},
        {label: 'Dodaj Sub', value: 'addSubDesign', roles: isPM()},
    ],
    projects : [
        {label: 'Edycja', value: 'edit', roles: true},
        {label: 'Design', value: 'designContent', roles: true},
        {label: 'Dodaj Zlecenie', value: 'addProject', roles: isPM()},
        {label: 'Wycena', value: 'price', roles: isPM()},
        {label: 'Zakupy', value: 'supply', roles: (isPM() || isDesigner())},
        {label: 'Czasy', value: 'czasy', roles: true},
        {label: 'Dodaj Czas', value: 'czasyAdd', roles: true},
        {label: 'Wady Monet', value: 'wadyMonet', roles: true},
        {label: 'Zadania', value: 'tasks', roles: (isPM() || isAdmin())},
    ],
    reklamacje : [
        {label: 'Edycja', value: 'edit', roles: (isPM() || isAdmin())},
    ],
    departments : [
        {label: 'Nowy Dział', value: 'addDept', roles: true},
        {label: 'Edycja', value: 'edit', roles: true},
    ],
    prodTasks : [
        {label: 'Edycja', value: 'edit', roles: true},
    ],
    materials : [
        {label: 'Nowy Materiał', value: 'addMaterial', roles: true},
        {label: 'Edycja', value: 'edit', roles: true},
        {label: 'Ceny', value: 'prices', roles: true},
    ],
    statuses : [
        {label: 'Nowy Status', value: 'addStatus', roles: true},
        {label: 'Edycja', value: 'edit', roles: true},
    ],
    pricelists : [
        {label: 'Nowy Cennik', value: 'addPricelist', roles: true},
        {label: 'Edycja', value: 'edit', roles: true},
        {label: 'Pozycje', value: 'positions', roles: true},
    ],
    types : [
        {label: 'Nowy Typ', value: 'addStatus', roles: true},
        {label: 'Edycja', value: 'edit', roles: true},
    ],
    proceses : [
        {label: 'Nowy Proces', value: 'addProcess', roles: true},
        {label: 'Edycja', value: 'edit', roles: true},
        {label: 'Materiały', value: 'materials', roles: true},
        {label: 'Maszyny', value: 'machines', roles: true},
    ],
    shippingMethods : [
        {label: 'Nowa Metoda Dostawy', value: 'addShippingMethod', roles: true},
        {label: 'Edycja', value: 'edit', roles: true},
    ],
    ennoblings : [
        {label: 'Nowe Uszlachetnienie', value: 'addEnnobling', roles: true},
        {label: 'Edycja', value: 'edit', roles: true},
        {label: 'Blokowanie', value: 'blocking', roles: true},
    ],
    pracownicy : [
        {label: 'Nowy Użytkownik', value: 'addUser', roles : (isAdmin() || isIT())},
        {label: 'Edycja', value: 'edit', roles : (isSuper())},
        {label: 'Procesy', value: 'proceses', roles : (isAdmin())},
        {label: 'Worklog', value: 'worklog', roles : (isAdmin() || isControling())},
        {label: 'Current', value: 'Current', roles : (isSuper())},
    ],
    shippings : [
        {label: 'Nowa Wysyłka', value: 'addShipping', roles: true},
        {label: 'Edycja', value: 'edit', roles: true},
        {label: 'Zawartosc', value: 'content', roles: true},
        {label: 'Pliki', value: 'files', roles: true},
    ],
    dokumenty : [
        {label: 'Nowy Dokument', value: 'addDocument', roles: true},
        {label: 'Edycja', value: 'edit', roles: true},
    ],
    inventory : [
        {label: 'Wydania Produkcyjne', value: 'productionShifts', roles: true},
        {label: 'test', value: 'edit', roles: true},
        {label: 'test2', value: 'content', roles: true},
        {label: 'test3', value: 'files', roles: true},
    ],
    periods : [
        {label: 'Edycja', value: 'edit', roles: (isControling())},
        {label: 'Stawki Pracowników', value: 'Rates', roles: (isControling())},
        {label: 'Cuw', value: 'Cuw', roles: (isControling())},
    ],
}



export const clientTabs = [
    {label: 'Nowy Klient', value: 'addClient', roles: true},
    {label: 'Edycja', value: 'edit', roles: true},
    {label: 'Designy', value: 'designs', roles: true},
    {label: 'Kontakty', value: 'contacts', roles: true},
    {label: 'Adresy', value: 'adresses', roles: true},
    {label: 'Notatki', value: 'notes', roles: true},
    {label: 'Pliki', value: 'files', roles: true},
    {label: 'Stock', value: 'stock', roles: true},
    {label: 'Cenniki', value: 'pricelists', roles: true},
];

export const dostawcaTabs = [
    {label: 'Nowy Dostawca', value: 'addSupplier', roles: true},
    {label: 'Edycja', value: 'edit', roles: true},
    {label: 'Usługi / Towary', value: 'goods', roles: true},
    {label: 'Kontakty', value: 'contacts', roles: true},
    {label: 'Adresy', value: 'adresses', roles: true},
    {label: 'Notatki', value: 'notes', roles: true},
    {label: 'Pliki', value: 'files', roles: true},
    {label: 'Zakupy', value: 'purchase', roles: true},
    {label: 'Oferty', value: 'offers', roles: true},
];

export const uslugaTabs = [
    {label: 'Nowa Usluga', value: 'addService', roles: true},
    {label: 'Edycja', value: 'edit', roles: true},
    {label: 'Sprzedaż', value: 'sale', roles: true},
];

export const coinQualityTabs = [
    {label: 'Edycja', value: 'edit', roles: true},
];

export const maszynaTabs = [
    {label: 'Nowa Maszyna', value: 'addMachine', roles: true},
    {label: 'Edycja', value: 'edit', roles: true},
];

export const rodzajWadTabs = [
    {label: 'Nowy Rodzaj Wady', value: 'addRodzajWAdy', roles: true},
    {label: 'Edycja', value: 'edit', roles: true},
];

export const activityTabs = [
    {label: 'Nowa Moneta', value: 'addCoin', roles: true},
    {label: 'Edycja', value: 'edit', roles: true},
];

export const itAssetTabs = [
    {label: 'Nowy Asset', value: 'addAsset', roles: (isAdmin() || isIT())},
    {label: 'Edycja', value: 'edit', roles: (isAdmin() || isIT())},
    {label: 'Pliki', value: 'files', roles: (isAdmin() || isIT())},
    {label: 'Wydania', value: 'shifts', roles: (isAdmin() || isIT())},
];
export const itAssetsShiftTabs = [
    {label: 'Edycja', value: 'edit', roles: (isAdmin() || isIT())},
    {label: 'Pliki', value: 'files', roles: (isAdmin() || isIT())},
];

export const kapselTabs = [
    {label: 'Nowy Kapsel', value: 'addCapsule', roles: true},
    {label: 'Edycja', value: 'edit', roles: true},
];

export const invoiceTabs = [
    {label: 'Nowa Faktura', value: 'addInvoice', roles: true},
    {label: 'Edycja', value: 'edit', roles: true},
    {label: 'Pozycje', value: 'positions', roles: true},
];

export const coinTabs = [
    {label: 'Nowa Moneta', value: 'addCoin', roles: isPM()},
    {label: 'Edycja', value: 'edit', roles: true},
    {label: 'Dodaj Design', value: 'addDesign', roles: isPM()},
    {label: 'Designy', value: 'designs', roles: true},
];

export const designTabs = [
    {label: 'Nowy Design', value: 'addDesign', roles: isPM()},
    {label: 'Edycja', value: 'edit', roles: (isDesigner() || isPM() || isEnnobler())},
    {label: 'Moneta', value: 'coin', roles: true},
    {label: 'Dodaj Zlecenie', value: 'addProject', roles: isPM()},
    {label: 'Dodaj Czas', value: 'addWorklog', roles: true},
];

export const projectTabs = [
    {label: 'Edycja', value: 'edit', roles: true},
    {label: 'Design', value: 'designContent', roles: true},
    {label: 'Dodaj Zlecenie', value: 'addProject', roles: isPM()},
    {label: 'Wycena', value: 'price', roles: isPM()},
    {label: 'Zakupy', value: 'supply', roles: (isPM() || isDesigner())},
    {label: 'Czasy', value: 'czasy', roles: true},
    {label: 'Dodaj Czas', value: 'czasyAdd', roles: true},
    {label: 'Wady Monet', value: 'wadyMonet', roles: true},
    {label: 'Zadania', value: 'tasks', roles: true},
];

export const departmentTabs = [
    {label: 'Nowy Dział', value: 'addDept', roles: true},
    {label: 'Edycja', value: 'edit', roles: true},
];

export const productionTaskTabs = [
    {label: 'Edycja', value: 'edit', roles: true},
];

export const materialTabs = [
    {label: 'Nowy Materiał', value: 'addMaterial', roles: true},
    {label: 'Edycja', value: 'edit', roles: true},
    {label: 'Ceny', value: 'prices', roles: true},
];

export const statusTabs = [
    {label: 'Nowy Status', value: 'addStatus', roles: true},
    {label: 'Edycja', value: 'edit', roles: true},
];

export const cennikTabs = [
    {label: 'Nowy Cennik', value: 'addPricelist', roles: true},
    {label: 'Edycja', value: 'edit', roles: true},
    {label: 'Pozycje', value: 'positions', roles: true},
];

export const typeTabs = [
    {label: 'Nowy Typ', value: 'addStatus', roles: true},
    {label: 'Edycja', value: 'edit', roles: true},
];

export const processTabs = [
    {label: 'Nowy Proces', value: 'addProcess', roles: true},
    {label: 'Edycja', value: 'edit', roles: true},
    {label: 'Materiały', value: 'materials', roles: true},
    {label: 'Maszyny', value: 'machines', roles: true},
];

export const shippingMethodTabs = [
    {label: 'Nowa Metoda Dostawy', value: 'addShippingMethod', roles: true},
    {label: 'Edycja', value: 'edit', roles: true},
];
export const ennoblingTabs = [
    {label: 'Nowe Uszlachetnienie', value: 'addEnnobling', roles: true},
    {label: 'Edycja', value: 'edit', roles: true},
    {label: 'Blokowanie', value: 'blocking', roles: true},
];

export const userTabs = [
    {label: 'Nowy Użytkownik', value: 'addUser', roles : (isAdmin() || isIT())},
    {label: 'Edycja', value: 'edit', roles : (isAdmin() || isIT())},
    {label: 'Procesy', value: 'proceses', roles : (isAdmin())},
    {label: 'Worklog', value: 'worklog', roles : (isAdmin() || isControling())},
];

export const shippingTabs = [
    {label: 'Nowa Wysyłka', value: 'addShipping', roles: true},
    {label: 'Edycja', value: 'edit', roles: true},
    {label: 'Zawartosc', value: 'content', roles: true},
    {label: 'Pliki', value: 'files', roles: true},
];

export const inventoryItemTabs = [
    {label: 'Wydania Produkcyjne', value: 'productionShifts', roles: true},
    {label: 'test', value: 'edit', roles: true},
    {label: 'test2', value: 'content', roles: true},
    {label: 'test3', value: 'files', roles: true},
];

export const periodTabs = [
    {label: 'Edycja', value: 'edit', roles: (isControling())},
    {label: 'Stawki Pracowników', value: 'Rates', roles: (isControling())},
];

