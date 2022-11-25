export const dateJStoPhp = date => {
    if(date){
        return date.split('.').reverse().join('-');
    }
}