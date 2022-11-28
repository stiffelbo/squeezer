export const convert = data => {
    if(data){
        const converted = {data : 
            data.map(item =>{
                let date = new Date(item[0]);
                return {x: date, y : [item[1], item[2], item[3], item[4]]}
                //return [parseInt(item[0] / 1000), [item[1], item[2], item[3], item[4], item[5]]];                            
                }
            )
        };
        return converted;
    }else{
        return {data: []};
    }
}

export const convertCandles = (data, options) => {
    if(data){
        const converted = {data : 
            data.map(item =>{
                let date = new Date(item[options.time]);
                return {x: date, y : [item[options.o], item[options.h], item[options.l], item[options.c]]}                    
                }
            )
        };
        return converted;
    }else{
        return {data: []};
    }
}

export const convertLine = (data, options) => {
    if(data){
        const values = [];
        data.map(item =>{
                if(item[options.val]){
                    let date = new Date(item[options.time]);
                    values.push({x: date, y : item[options.val]});          
                }                
            }
        )
        const converted = {data : 
            values
        };
        return converted;
    }else{
        return {data: []};
    }
}