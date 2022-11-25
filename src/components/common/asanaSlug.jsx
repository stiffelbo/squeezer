import React from 'react';

const AsanaSlug = ({slug}) => {

    if(slug.indexOf('_') == -1 && slug.length < 20) 
        return <div style={{height:'100%', fontSize: '12px', padding: '3px', display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems: 'flex-start', width: '100%'}}>
                    <span>{slug}</span>
                </div>;


    const numer = slug ? slug.split(' - ')[0] : '';
        const data = slug ? slug.split(' - ')[1] && slug.split(' - ')[1].split('_') : [];
        const data_slugs = [];
        let subIndex = 0;
        let data_slug = '';
        if(data){
            for (let index = 0; index < data.length; index++) {
           
                if(subIndex < 4){
                    if(data_slug == ''){
                        data_slug += data[index];
                    }else{
                        data_slug += "_" + data[index];
                    }
                    subIndex++;
                    if(index == data.length -1){
                        data_slugs.push(data_slug);
                    }
                }else{
                    data_slugs.push(data_slug);                
                    subIndex = 1;
                    data_slug = data[index];
                    if(index == data.length -1){
                        data_slugs.push(data_slug);
                    }
                }                
            }
        }        
        return <div style={{height:'100%', fontSize: '12px', padding: '3px', display : 'flex', flexDirection : 'column', justifyContent : 'center', alignItems: 'flex-start', width: '100%'}}>
                    <span>{numer} - </span>
                    {data_slugs && data_slugs.map(item => <span key={item}>{item}</span>)}    
                </div>
}
 
export default AsanaSlug;