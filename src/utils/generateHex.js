const alphabet = 'abcćdeęfghijklłmnńoópqrstuvwxyzźż';

const cutString = (str = '', pieces = 3) => {

    let arr = [];
    if(str.length == 0){
        for (let index = 0; index < pieces; index++) {
            arr.push('');            
        }
        return arr;
    }
    
    if(str.length < pieces){
        for (let index = 0; index < pieces; index++) {
           if(index < str.length){
                console.log(str[index]);
                arr.push(str[index]); 
           }else{
                arr.push(''); 
           }        
        }
        return arr;
    }

    if(str.length >= pieces){
        for (let index = 0; index < pieces; index++) {
            arr.push('');
        }
        for (let index = 0; index < str.length; index++) {
            let indexInArr = index % pieces;
            arr[indexInArr] += str[index];
        }
        return arr;
    }
}

export const strToHex = str => {
    const arr = cutString(str);
    let hex = '#';
    arr.length && arr.map(item => {
        let num = 0;
        if(item.length){
            item.split('').map(letter => num = num += alphabet.indexOf(letter) + 1);
            num = num % 255;
            hex += num.toString(16);
        }else{
            hex += '00';
        }
    });
    return hex;
}

