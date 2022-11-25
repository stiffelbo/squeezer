export const calculator = (positions = [], qty = 0, diameter = 0, stempel = '', gmi = 0, elaborated = 0, discount_unit = 0) => {

    const quantities = [50, 100, 250, 500, 1000, 2000, 5000];
    const combinationDiscounts = {
        partialSpace : {
            setup : 0.5,
            reorder : 0.5,
            unit_s : 0.5,
            unit_m : 0.5,
            unit_l : 0.5,
            unit_xl : 0.5,
        },
        partialPlating : {
            setup : 0.5,
            reorder : 0.5,
            unit_s : 0.5,
            unit_m : 0.5,
            unit_l : 0.5,
            unit_xl : 0.5,
        },
        fullPlating : {
            setup : 0.5,
            reorder : 0.5,
            unit_s : 0.5,
            unit_m : 0.5,
            unit_l : 0.5,
            unit_xl : 0.5,
        }
    }
    //agregation
    let dictionary = {};
    let checkedGroups = {};   

    //discounts   
    let projectDisounts = {};  
    let anyDiscounts = false;                
    let discountingFulls = [];                
    let full_plating_discount = false;
    let topPartialObverse = null;
    let topPartialReverse = null;
    let partialSpaceDiscount = null;
    let kod = [];

    //calculated prices
    let basePrices = []; //ceny z ew discountami za kombinacje
    let discountPrices = []; //ceny z ew discountami za kombinacje + discounty projektowe

    let baseTotal = {
        setup: 0,
        reorder: 0,
        unit: 0,
    }; //total ceny bazowej z ew discountami za kombinacje
    let prices = []; //ceny za szt dla nakładów, baseTotal dla danego nakładu


    const emit = () => {
        return ({
            total: baseTotal,
            discountPrices,
            positionPrices : basePrices,
            pricelist : prices,
            kod : kod.join('_'),
        });
    }

    const priceDefault = item => {
    
        const price = {
            id: item
        }
        price['name'] = dictionary[item]['name'];
        price['kod'] = dictionary[item]['kod'];
        price['type'] = dictionary[item]['type'];
        price['side'] = dictionary[item]['side'];
        price['opis'] = dictionary[item]['opis'];
        price['setup'] = +dictionary[item]['setup'];
        price['reorder'] = +dictionary[item]['reorder'];
        price['unit_s'] = +dictionary[item]['unit_s'];
        price['unit_m'] = +dictionary[item]['unit_m'];
        price['unit_l'] = +dictionary[item]['unit_l'];
        price['unit_xl'] = +dictionary[item]['unit_xl'];
        price['discounted'] = false;
        basePrices.push(price);
    }

    const stampDiscount = str => {
        let discount = 1;
        if(!str){
            return discount;
        }
        if(str && str.toLowerCase().indexOf('proof') > -1){
            discount += 0.25;
        }
        if(str && str.toLowerCase().indexOf('hr') > -1 || str.toLowerCase().indexOf('High Relief') > -1){
            discount += 0.25;
        }
        return discount;
    }

    const diameterCheck = diameter => {
        if(diameter < 14){
            return 'xs';
        }
        if(diameter > 13.99 && diameter < 31){
            return 'unit_s';
        }
        if(diameter >= 31 && diameter < 42){
            return 'unit_m';
        }
        if(diameter >= 42 && diameter <= 65){
            return 'unit_l';
        }else{
            return 'unit_xl'
        }
    }

    const quantityDiscount = qty => {       
        let result = 0
        if (isNaN(qty) || qty <= 0){
            result = 0;
        }else if (qty > 0 && qty < 50){
            result = 0;
        }else if (qty >= 50 && qty < 100){
            result = 0.08;
        }else if (qty >= 100 && qty < 250){
            result = 0.10;
        }else if (qty >= 250 && qty < 500){
            result = 0.15;
        }else if (qty >= 500 && qty < 1000){
            result = 0.20;
        }else if (qty >= 1000 && qty < 2000){
            result = 0.23;
        }else if (qty >= 2000 && qty < 5000){
            result = 0.25;
        }else {
            result = 0.28;
        }
        return result;
    }

    const makeDictionary = () => {
        dictionary = {};
        positions?.map(item => {
            if(item['opis'] == 'discountPartial'){
                discountingFulls.push(item['id_ennobling']);
            }
            dictionary[item['id_ennobling']] = {
                setup: item['setup'],
                reorder: item['reorder'],
                unit_s: item['unit_s'],
                unit_m: item['unit_m'],
                unit_l: item['unit_l'],
                unit_xl: item['unit_xl'],
                side: item['side'],
                type: item['type'],
                kod: item['kod'],
                opis: item['opis'],
                name: item['nazwa']
            }
            kod.push(item['kod']);
        });
        return (makeCheckedGroups());
    }

    const makeCheckedGroups = () => {    
        checkedGroups = {};
        positions.forEach(item => {           
            const group = `${item['side']}_${item['type']}`;
            const value = item['id_ennobling'];
            checkedGroups[group] ? checkedGroups[group].push(value) : checkedGroups[group] = [value];          
        });
        return(setCombinationDiscountFactors());
    }

    const setCombinationDiscountFactors = () => {
    
        const keys = Object.keys(checkedGroups);
        const hasPartials = keys.indexOf('Obverse_Plating') > -1 || keys.indexOf('Reverse_Plating') > -1 ? true : false;
        anyDiscounts = false;
        full_plating_discount = false;
        topPartialObverse = null;
        topPartialReverse = null;
        partialSpaceDiscount = null;
        if(keys.length){
            if(keys.indexOf('Obverse_Coating') > -1 && keys.indexOf('Reverse_Coating') > -1){
                partialSpaceDiscount = checkedGroups['Reverse_Coating'][0];
                anyDiscounts = true;
            }
            keys.map(key => {
                //sprawdzam czy stosować rabat za full plating
                if(hasPartials && key == 'Full_Plating'){                 
                    checkedGroups[key].map(id => {
                        if(discountingFulls.find(item => item == id)){
                            full_plating_discount = true;
                            anyDiscounts = true;
                        }
                    });
                }
                if(key == 'Obverse_Plating' && checkedGroups[key].length > 1){                    
                    //szukam najdroższej po kolumnie unit_m
                    const arr = checkedGroups[key];
                    let top_price = 0;
                    arr.map(item => {
                        if(dictionary[item]['unit_m'] > top_price){
                            top_price = dictionary[item]['unit_m'];
                            topPartialObverse = item;
                        }
                    });
                    anyDiscounts = true;
                }
                if(key == 'Reverse_Plating' && checkedGroups[key].length > 1){                    
                    //szukam najdroższej po kolumnie unit_m
                    const arr = checkedGroups[key];
                    let top_price = 0;
                    arr.map(item => {
                        if(dictionary[item]['unit_m'] > top_price){
                            top_price = dictionary[item]['unit_m'];
                            topPartialReverse = item;
                        }
                    });
                    anyDiscounts = true;
                }
            });
        }
        return(makeBasePrices());
    }

    const makeBasePrices = () => {
        const keys = Object.keys(checkedGroups);
        basePrices = [];
        if(anyDiscounts){
            keys.map(key => {
                if(key == 'Reverse_Coating'){
                    checkedGroups[key].map(item => {
                        if(item == partialSpaceDiscount){
                            const price = {
                                id: item
                            }
                            price['type'] = dictionary[item];
                            price['name'] = dictionary[item]['name'];
                            price['side'] = dictionary[item]['side'];
                            price['kod'] = dictionary[item]['kod'];
                            price['setup'] = dictionary[item]['setup'] * combinationDiscounts['partialSpace']['setup'];
                            price['reorder'] = dictionary[item]['reorder'] * combinationDiscounts['partialSpace']['reorder'];
                            price['unit_s'] = dictionary[item]['unit_s'] * combinationDiscounts['partialSpace']['unit_s'];
                            price['unit_m'] = dictionary[item]['unit_m'] * combinationDiscounts['partialSpace']['unit_m'];
                            price['unit_l'] = dictionary[item]['unit_l'] * combinationDiscounts['partialSpace']['unit_l'];
                            price['unit_xl'] = dictionary[item]['unit_xl'] * combinationDiscounts['partialSpace']['unit_xl'];
                            price['discounted'] = true;    
                            basePrices.push(price);
                        }else{
                            priceDefault(item);
                        }                        
                    });
                }else if(key == 'Obverse_Plating'){
                    if(full_plating_discount){
                        checkedGroups[key].map(item => {
                            const price = {
                                id: item
                            }
                            price['type'] = dictionary[item];
                            price['name'] = dictionary[item]['name'];
                            price['side'] = dictionary[item]['side'];
                            price['kod'] = dictionary[item]['kod'];
                            price['setup'] = dictionary[item]['setup'] * combinationDiscounts['fullPlating']['setup'];
                            price['reorder'] = dictionary[item]['reorder'] * combinationDiscounts['fullPlating']['reorder'];
                            price['unit_s'] = dictionary[item]['unit_s'] * combinationDiscounts['fullPlating']['unit_s'];
                            price['unit_m'] = dictionary[item]['unit_m'] * combinationDiscounts['fullPlating']['unit_m'];
                            price['unit_l'] = dictionary[item]['unit_l'] * combinationDiscounts['fullPlating']['unit_l'];
                            price['unit_xl'] = dictionary[item]['unit_xl'] * combinationDiscounts['fullPlating']['unit_xl'];
                            price['discounted'] = true;    
                            basePrices.push(price);
                        });
                    }else if(topPartialObverse){
                        checkedGroups[key].map(item => {
                            if(topPartialObverse != item){
                                const price = {
                                    id: item
                                }
                                price['type'] = dictionary[item];
                                price['name'] = dictionary[item]['name'];
                                price['side'] = dictionary[item]['side'];
                                price['kod'] = dictionary[item]['kod'];
                                price['setup'] = dictionary[item]['setup'] * combinationDiscounts['partialPlating']['setup'];
                                price['reorder'] = dictionary[item]['reorder'] * combinationDiscounts['partialPlating']['reorder'];
                                price['unit_s'] = dictionary[item]['unit_s'] * combinationDiscounts['partialPlating']['unit_s'];
                                price['unit_m'] = dictionary[item]['unit_m'] * combinationDiscounts['partialPlating']['unit_m'];
                                price['unit_l'] = dictionary[item]['unit_l'] * combinationDiscounts['partialPlating']['unit_l'];
                                price['unit_xl'] = dictionary[item]['unit_xl'] * combinationDiscounts['partialPlating']['unit_xl'];
                                price['discounted'] = true;
        
                                basePrices.push(price);
                            }else{
                                priceDefault(item);
                            }                            
                        });
                    }                    
                }else if(key == 'Reverse_Plating'){
                    if(full_plating_discount){
                        checkedGroups[key].map(item => {
                            const price = {
                                id: item
                            }
                            price['type'] = dictionary[item];
                            price['name'] = dictionary[item]['name'];
                            price['side'] = dictionary[item]['side'];
                            price['kod'] = dictionary[item]['kod'];
                            price['setup'] = dictionary[item]['setup'] * combinationDiscounts['fullPlating']['setup'];
                            price['reorder'] = dictionary[item]['reorder'] * combinationDiscounts['fullPlating']['reorder'];
                            price['unit_s'] = dictionary[item]['unit_s'] * combinationDiscounts['fullPlating']['unit_s'];
                            price['unit_m'] = dictionary[item]['unit_m'] * combinationDiscounts['fullPlating']['unit_m'];
                            price['unit_l'] = dictionary[item]['unit_l'] * combinationDiscounts['fullPlating']['unit_l'];
                            price['unit_xl'] = dictionary[item]['unit_xl'] * combinationDiscounts['fullPlating']['unit_xl'];
                            price['discounted'] = true;
    
                            basePrices.push(price);
                        });
                    }else if(topPartialReverse){
                        checkedGroups[key].map(item => {
                            if(topPartialReverse != item){
                                const price = {
                                    id: item
                                }
                                price['type'] = dictionary[item];
                                price['name'] = dictionary[item]['name'];
                                price['side'] = dictionary[item]['side'];
                                price['kod'] = dictionary[item]['kod'];
                                price['setup'] = dictionary[item]['setup'] * combinationDiscounts['partialPlating']['setup'];
                                price['reorder'] = dictionary[item]['reorder'] * combinationDiscounts['partialPlating']['reorder'];
                                price['unit_s'] = dictionary[item]['unit_s'] * combinationDiscounts['partialPlating']['unit_s'];
                                price['unit_m'] = dictionary[item]['unit_m'] * combinationDiscounts['partialPlating']['unit_m'];
                                price['unit_l'] = dictionary[item]['unit_l'] * combinationDiscounts['partialPlating']['unit_l'];
                                price['unit_xl'] = dictionary[item]['unit_xl'] * combinationDiscounts['partialPlating']['unit_xl'];
                                price['discounted'] = true;        
                                basePrices.push(price);
                            }else{
                                priceDefault(item);
                            }
                        });
                    }else{
                        checkedGroups[key].map(item => {                            
                            priceDefault(item);                           
                        });
                    }
                }else{
                    checkedGroups[key].map(item => {                            
                        priceDefault(item);                       
                    });
                }
            });
        }else{
            keys.map(key => {
                checkedGroups[key].map(item => {
                    priceDefault(item);
                });
            });
        }
        return(discountBasePrices());
    }

    const discountBasePrices = () => {
        //licze rabaty
        const factor = calculateUnitDiscountFactor(qty, stempel, gmi, elaborated, discount_unit);
        const stampFactor = stampDiscount(stempel);
        
        for (let index = 0; index < basePrices.length; index++) {
            let possition = {...basePrices[index]};
            if(basePrices[index]['type'] !== 'Service'){
                possition['unit'] = possition[diameterCheck(diameter)] ? stampFactor * (possition[diameterCheck(diameter)] - (possition[diameterCheck(diameter)] * factor)) : 0;
 
            }else{
                possition['unit'] = possition[diameterCheck(diameter)] ? possition[diameterCheck(diameter)] : 0;
            }
            discountPrices.push(possition);      
        }
        return(makeBaseTotal());
    }

    const makeBaseTotal = () => {

        if(basePrices.length > 0){
            discountPrices.map(item => {
                baseTotal['setup'] += +item['setup'];
                baseTotal['reorder'] += +item['reorder'];
                baseTotal['unit'] += item['unit'];
            });
            return(emit());
        }
    }

    const calculateUnitDiscountFactor = (qty, stempel, gmi, elaborated, discount_unit) => {
        
        const gmiFactor = gmi ? 0.02 : 0;
        const elaboratedFactor = elaborated ? 0.25 : 0;
        const stampFactor = stampDiscount(stempel);
        const qtyFactor = quantityDiscount(qty);

        const factor = gmiFactor + qtyFactor + (+discount_unit/100);
        return factor;
    }

    return (makeDictionary());
};


export const staticQuantity = qty =>{
    if(qty < 50){
        return 25;
    }
    if(qty >= 50 && qty < 100){
        return 70;
    }
    if(qty >= 100 && qty < 250){
        return 140;
    }
    if(qty >= 250 && qty < 500){
        return 300;
    }
    if(qty >= 500 && qty < 1000){
        return 700;
    }
    if(qty >= 1000 && qty < 2500){
        return 1200;
    }
    if(qty >= 2500 && qty < 5000){
        return 2500;
    }
    if(qty >= 5000 && qty < 10000){
        return 5000;
    }
}



















