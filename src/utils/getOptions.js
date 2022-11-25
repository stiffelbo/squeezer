import __ from "lodash";

const getOptions = (data, value, text, sortCollumn = 'name', sortOrder = 'asc') =>{
    const options = [];
    const unique = [];
    data && data.map(item => {
        if(item[value] && item[value] !== '0' && unique.indexOf(item[value]) === -1){
            let name = '';
            text && text.map((prop, index) => {
                if(index < text.length -1){
                    name += `${item[prop]} `
                }else{
                    name += `${item[prop]}`
                }                
            })
            const option = {id : item[value], name}
            unique.push(item[value]);
            options.push(option);
        }
    });
    const sorted = __.orderBy(options, sortCollumn, sortOrder);
    return sorted;
}

export default getOptions;