export const convert = data => {
    if(data){
        const converted = [{data : 
            data.map(item =>{
                let date = new Date(item[0]);
                return {x: date, y : [item[1], item[2], item[3], item[4], item[5]]}
                //return [parseInt(item[0] / 1000), [item[1], item[2], item[3], item[4], item[5]]];
                            
                }
            )
        }]

        console.log(converted);
        return converted;
    }else{
        return [];
    }
}