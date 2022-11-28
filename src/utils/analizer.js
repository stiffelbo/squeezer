const defaultSettings = {
    ma: [31, 81, 200],
    volMa: [31],
    low: [31, 81, 200],
    high: [31, 81, 200],
}

class Analizer{
    constructor(data, settings = defaultSettings){
        const comp = this;
        comp.data = data;
        comp.settings = settings;
        comp.initActions();
        comp.emit();
    }

    convertData(){
        const comp = this;
        comp.data = comp.data.map(item => {
            const elem = {
                openTime : item[0],
                o : item[1],
                h : item[2],
                l : item[3],
                c : item[4],
                vol : item[5],
                qVol : item[7],
                trades : item[8],
            };
            return elem;
        });
    }

    ma(prices, window, keyIndex = 'c', lab = 'sma'){
        const label = `${lab}${window}`;
        if (!prices || prices.length < window) {
            return [];
        }

        for (let index = 0; index < prices.length; index++) {
            if(index < window){
                prices[index][label] = null;
            }else{
                const windowSlice = prices.slice(index - window, index);
                const sum = windowSlice.reduce((sum, curr) => sum + +curr[keyIndex], 0);
                const avg = sum / window;
                prices[index][label] = avg;
            }        
        }
        return prices;
    }

    low(prices, window, keyIndex = 'l', lab = 'min'){
        const label = `${lab}${window}`;
        if (!prices || prices.length < window) {
            return [];
        }
        for (let index = 0; index < prices.length; index++) {
            if(index < window){
                prices[index][label] = null;
            }else{
                const windowSlice = prices.slice(index - window, index);
                prices[index][label] = Math.min(...windowSlice.map(item => +item[keyIndex]));
            }        
        }
        return prices;
    }

    high(prices, window, keyIndex = 'h', lab = 'max'){
        const label = `${lab}${window}`;
        if (!prices || prices.length < window) {
            return [];
        }
        for (let index = 0; index < prices.length; index++) {            
            if(index < window){
            }else{
                const windowSlice = prices.slice(index - window, index);
                const values = [...windowSlice.map(item => +item[keyIndex])];
                prices[index][label] = Math.max(...values);
            }        
        }
        return prices;
    }

    initActions(){
        const comp = this;
        this.convertData();
        this.settings.ma.map(len => {
            comp.data = this.ma(comp.data, len, 'c');
        });
        this.settings.volMa.map(len => {
            comp.data = this.ma(comp.data, len, 'qVol', 'volSma');
        });
        this.settings.low.map(len => {
            comp.data = this.low(comp.data, len, 'l', 'min');
        });
        this.settings.high.map(len => {
            comp.data = this.high(comp.data, len, 'h', 'max');
        });
    }

    emit(){
        return this.data;
    }
}

export default Analizer;