export const hoursToDecimal = (hours, minutes) => {
    const h = +hours + Math.floor(+minutes / 60);
    const m = +(+minutes % 60).toFixed(2);
    const hDecimal = m / 60;
    console.log([+h + hDecimal]);
    return +h + hDecimal;
}

export const decimalToHoursMinutes = (val) => {
    let h, m;
    if(val){
        h = Math.floor(+val);
        m = Math.floor((+val - h) / 100 * 6000);
    }else{           
        h = 0;
        m = 0;
    }
    console.log([h, m]);
    return [h, m];
}