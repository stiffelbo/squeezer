import React, {useEffect, useState} from 'react';
//SErvices
import {getUsdt} from '../../../services/binance';

//Config
import { layoutConfig as lc } from '../../../config';

//Comp
import USDTDataGrid from './usdtDataGrid';
import USDTFilters from './usdtFilters';
import Ticker from './ticker';

//Mui
import {Box} from '@mui/material';

const USDT = ({rwd}) => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [refresh, setRefresh] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [current, setCurrent] = useState(null);

    useEffect ( async () => {
        setIsPending(true);
        const {data} = await getUsdt();
        setData(data);
        setIsPending(false);
    }, [refresh]);

    if(!current){
        return ( 
            <Box sx={{height: `${rwd.height}px`, width: '100%', paddingLeft: '1em', paddingRight: '1em'}}>
                <USDTFilters 
                    data={data} 
                    isPending={isPending}
                    onFilter={setFilteredData} 
                    onRefresh={()=>setRefresh(new Date().toLocaleTimeString())} 
    
                />  
                <USDTDataGrid data={data} onItemChange={setCurrent} current={current} rwd={rwd}/>      
            </Box>
        );
    }else{
        return  ( 
            <Box sx={{height: `${rwd.height}px`, width: '100%', paddingLeft: '1em', paddingRight: '1em'}}>
                <USDTFilters 
                    data={data} 
                    isPending={isPending}
                    onFilter={setFilteredData} 
                    onRefresh={()=>setRefresh(new Date().toLocaleTimeString())}    
                /> 
                <Box sx={{width: '100%', height :`${rwd.height - lc.filterBarHeight}px`, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Box sx={{width: '29%', height: '100%', maxHeight: '100%', overflowY: 'auto'}} >
                        <USDTDataGrid data={data} onItemChange={setCurrent} current={current} rwd={rwd}/>
                    </Box>
                    <Box sx={{width: '69%', height: '100%', maxHeight: '100%'}} >
                        <Ticker current={current} />
                    </Box>
                </Box>                      
            </Box>);
    }    
}
 
export default USDT;