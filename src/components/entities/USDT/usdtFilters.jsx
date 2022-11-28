import React, {useState, useEffect} from 'react';

//Config
import { layoutConfig as lc } from '../../../config';

import {Box, IconButton, TextField} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadingIcon from '@mui/icons-material/Downloading';
import ClearIcon from '@mui/icons-material/Clear';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

//Comp
import SelectMui from './../../common/selectMui';

import { intervals } from '../../../services/binance';
import {filtersOptions} from '../../../config';

const USDTFilters = ({data, onFilter, onRefresh, onLoadData, timeFrame, onTimeFrameChange, isPending, isLoading, current, clearCurrent}) => {

    const icon = isPending ? <DownloadingIcon /> : <RefreshIcon />;
    const loadingIcon = isLoading ? <DownloadingIcon /> : <QueryStatsIcon />;
    const disabled = isPending ? true : isLoading ? true : false;
    const handleTimeFrame = e => {
        const val = e.target.value;
        onTimeFrameChange(val);
    }
    //Filters
    const [slug, setSlug] = useState('');
    const [trend, setTrend] = useState('');

    useEffect(()=>{
        filter();
    }, [slug, trend]);

    const checkTrend = item => {
        if(item.sma31){
            
            const itemRange = ((+item.max31 - +item.min31) / +item.max31);
            console.log(itemRange);

            if(+item.c > +item.sma31 && +item.sma31 > +item.sma81 && +item.sma81 > +item.sma200){
                return 1;
            }
            if(+item.c < +item.sma31 && +item.sma31 < +item.sma81 && +item.sma81 < +item.sma200){
                return 2;
            }
            if(itemRange < 0.05 ){
                return 5;
            }
            if(itemRange < 0.1 ){
                return 4;
            }
            if(itemRange < 0.2 ){
                return 3;
            }else{
                return 0;
            }
        }
    }

    const filter = () => {
        let filtered = data;
        if(slug){
            filtered = filtered.filter(item => {
                const itemSlug = item.symbol;
                return itemSlug.toLowerCase().includes(slug.toLowerCase());
            });
        }
        if(trend){
            filtered = filtered.filter(item => {
                const itemTrend = checkTrend(item);
                return itemTrend === trend;
            });
        }
        console.log(filtered);
        onFilter(filtered);
    }

    const renderFilters = () => {
        return (
            <Box>
                <TextField 
                    value={slug} 
                    type="text" 
                    size="small" 
                    label="Ticker"
                    variant="standard"
                    onChange={(e)=>setSlug(e.target.value)}
                />
                <SelectMui 
                    value={trend} 
                    size="small" 
                    label="Trend"
                    variant="standard"
                    options={filtersOptions.trend}
                    onChange={(e)=>setTrend(e.target.value)}
                />
            </Box>
        )
    } 

    return ( 
        <Box sx={{height: lc.filterBarHeight, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Box sx={{height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                <IconButton onClick={onRefresh} disabled={disabled} color={"primary"}>{icon}</IconButton>
                <SelectMui value={timeFrame} options={intervals} onChange={handleTimeFrame}/>
                <IconButton onClick={onLoadData} disabled={disabled} color={"primary"}>{loadingIcon}</IconButton>
                {renderFilters()}
            </Box>
            <Box>
                {current && <IconButton onClick={clearCurrent} color={"error"}><ClearIcon /></IconButton>}
            </Box>            
        </Box>
     );
}
 
export default USDTFilters;