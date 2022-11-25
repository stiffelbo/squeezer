const data = {
    'pricelists' : 'cenniki',
    'clients' : 'klienci',
    'coins' : 'monety',
    'design' : 'designy',
    'projects' : 'zlecenia',
    'invoices' : 'faktury',
    'suppliers' : 'dostawcy',
    'services' : 'uslugi / towary',
    'itAssets' : 'sprzęt IT',
    'shippings' : 'wysyłki',
};

export const translator = title => {
    if(data[title]){
        return data[title];
    }else{
        return title;
    }
};