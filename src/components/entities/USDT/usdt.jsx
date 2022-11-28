import React, {useEffect, useState} from 'react';
//SErvices
import {getUsdt} from '../../../services/binance';

//Config
import { layoutConfig as lc } from '../../../config';

//Comp
import USDTDataGrid from './usdtDataGrid';
import USDTFilters from './usdtFilters';
import TickerChart from './tickerChart';

//Mui
import {Box} from '@mui/material';

//Redux
import { connect } from 'react-redux';
import { loadCandlesRequest, getSymbolsData } from '../../../store/candlestickDataRedux';

const USDT = ({rwd, loadSymbol, symbolsData}) => {
    const [data, setData] = useState([]);
    const [timeFrame, setTimeFrame] = useState('1h');
    const [analized, setAnalized] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [refresh, setRefresh] = useState('');
    const [loadData, setLoadData] = useState('');
    const [isPending, setIsPending] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [current, setCurrent] = useState(null);

    useEffect ( async () => {
        setIsPending(true);
        const {data} = await getUsdt();
        setData(data);
        setIsPending(false);
    }, [refresh]);

    useEffect (async () => {         
        if(loadData !== ''){
            setIsLoading(true);
            data.map(item => loadSymbol(item.symbol, timeFrame));
        }        
    }, [loadData]); 

    useEffect(()=>{
        if(symbolsData.length > 0 && symbolsData.length === data.length){
            const analized = symbolsData?.map(item => {
                const elem = {
                   symbol : item.symbol,
                   ...item.data[item.data.length -1]
               }
            return elem;
            });
            setAnalized(analized);
            setIsLoading(false); 
        }             
    }, [symbolsData]);

    useEffect(()=>{}, [analized]);

    const renderFilters = () => {
        const dataset = analized.length ? analized : data;
        return (
            <USDTFilters 
                    data={dataset} 
                    isPending={isPending}
                    isLoading={isLoading}
                    timeFrame={timeFrame}
                    current={current}
                    clearCurrent={()=>setCurrent(null)}
                    onTimeFrameChange={setTimeFrame}
                    onFilter={data=>setFilteredData(data)} 
                    onRefresh={()=>setRefresh(new Date().toLocaleTimeString())}    
                    onLoadData={()=>setLoadData(new Date().toLocaleTimeString())}
                /> 
        );
    }

    const renderTable = () => {
        const gridData = analized.length ? filteredData : data;
        return (<USDTDataGrid data={gridData} onItemChange={setCurrent} current={current} rwd={rwd}/>);
    }

    if(!current){
        
        return ( 
            <Box sx={{height: `${rwd.height}px`, width: '100%', paddingLeft: '1em', paddingRight: '1em'}}>
                {renderFilters()}
                {renderTable()}      
            </Box>
        );
    }else{
        return  ( 
            <Box sx={{height: `${rwd.height}px`, width: '100%', paddingLeft: '1em', paddingRight: '1em'}}>
                {renderFilters()}
                <Box sx={{width: '100%', height :`${rwd.height - lc.filterBarHeight}px`, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Box sx={{width: '29%', height: '100%', maxHeight: '100%', overflowY: 'auto'}} >
                        {renderTable()} 
                    </Box>
                    <Box sx={{width: '69%', height: '100%', maxHeight: '100%'}} >
                        <TickerChart current={current} />
                    </Box>
                </Box>                      
            </Box>);
    }    
}
 
const mapStateToProps = state => ({
    symbolsData : getSymbolsData(state),
});

const mapDispatchToProps = (dispatch) => {
    return {
      loadSymbol: (symbol, timeFrame) => dispatch(loadCandlesRequest(symbol, timeFrame)),
    }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(USDT);
 
export {  
    Container as USDT, 
}