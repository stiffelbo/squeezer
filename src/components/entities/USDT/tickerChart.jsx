import React, {useEffect, useState} from 'react';
import Chart from "react-apexcharts";

//Comp
import SelectMui from './../../common/selectMui';

//Mui
import {Box, Typography, Grid, TextField} from '@mui/material';

//Services
import { getKlines, intervals, limits } from '../../../services/binance';

//Utils
import { convertCandles, convertLine } from '../../../utils/convertForApex';
import Analizer from './../../../utils/analizer';

const TickerChart = ({current}) => {

    const [data, setData] = useState([]);
    const [analized, setAnalized] = useState([]);

    const [candles, setCandles] = useState([]);
    const [plotSma, setPlotSma] = useState([]);
    const [plotSma2, setPlotSma2] = useState([]);
    const [plotSma3, setPlotSma3] = useState([]);
    const [plotHigh, setPlotHigh] = useState([]);
    const [plotLow, setPlotLow] = useState([]);

    const [inter, setInter] = useState("1h");
    const [limit, setLimit] = useState(500);
    const [maLen, setMaLen] = useState(31);
    const [ma2Len, setMa2Len] = useState(81);
    const [ma3Len, setMa3Len] = useState(200);

    useEffect(async ()=> {
        const {data} = await getKlines(current, inter, limit);
        setData(data); 
    }, [current, inter, limit])

    useEffect(()=>{
        if(data.length){
            const settings = {
                ma: [maLen, ma2Len, ma3Len],
                volMa: [maLen],
                low: [maLen, ma2Len, ma3Len],
                high: [maLen, ma2Len, ma3Len],
            }
            const analized = new Analizer(data, settings);
            setAnalized(analized.data);
        }        
    }, [data, maLen, ma2Len, ma3Len]);

    useEffect (()=>{
        setCandles(convertCandles(analized, {time: 'openTime', o: "o", h : "h", l : 'l', c : "c"}));
        setPlotSma(convertLine(analized, {time: 'openTime', val: `sma${maLen}`}));
        setPlotSma2(convertLine(analized, {time: 'openTime', val: `sma${ma2Len}`}));
        setPlotSma3(convertLine(analized, {time: 'openTime', val: `sma${ma3Len}`}));
        setPlotHigh(convertLine(analized, {time: 'openTime', val: `max${ma2Len}`}));
        setPlotLow(convertLine(analized, {time: 'openTime', val: `min${ma2Len}`}));
    }, [analized]);

    useEffect (()=>{
    }, [plotSma3]);

    const renderChart = () => {
        const options = {
            xaxis: {
                type: 'datetime'
            },
            plotOptions: {
                candlestick: {
                  colors: {
                    upward: '#00B746',
                    downward: '#EF403C'
                  },
                  wick: {
                    useFillColor: true
                  }
                }
            },
            stroke: {
                show: true,
                curve: 'smooth',
                lineCap: 'butt',
                colors: undefined,
                width: 2,
                dashArray: 0,      
            }
        };
        return <Chart 
        series ={[
            {
                name: `${current}`,
                type: 'candlestick',
                data: candles.data,
            },
            {
                name: `SMA ${maLen}`,
                type: 'line',
                data: plotSma.data,
            },
            {
                name: `SMA ${ma2Len}`,
                type: 'line',
                data: plotSma2.data,
            },                
            {
                name: `SMA ${ma3Len}`,
                type: 'line',
                data: plotSma3.data,
            },                
            {
                name: `High ${ma2Len}`,
                type: 'line',
                data: plotHigh.data,
            },                
            {
                name: `Low ${ma2Len}`,
                type: 'line',
                data: plotLow.data,
            },                
        ]}
        width={'100%'}
        height={'60%'}
        options={options}        
    />
    }

    const handleInterval = e => {
        const val = e.target.value;
        setInter(val);
    }

    const handleLimit = e => {
        const val = e.target.value;
        setLimit(val);
    }
    const handleMaLen = e => {
        const val = e.target.value;
        setMaLen(val);
    }
    const handleMa2Len = e => {
        const val = e.target.value;
        setMa2Len(val);
    }
    const handleMa3Len = e => {
        const val = e.target.value;
        setMa3Len(val);
    }

    return ( <Box sx={{height: '100%'}}>
        <Grid container>
            <Grid item md={2}>
                <Typography variant="h5">{current}</Typography>
            </Grid>
            <Grid item >
                <SelectMui value={inter} options={intervals} onChange={handleInterval} label={"Interval"}/>
            </Grid>
            <Grid item >
                <SelectMui value={limit} options={limits} onChange={handleLimit} label={"Candles.."}/>
            </Grid>
            <Grid item >
                <TextField value={maLen} type="number" inputProps={{min: 3, max: 201}} size="small" onChange={handleMaLen} label={"fast ma lenth.."} sx={{width: '100px'}}/>
            </Grid>
            <Grid item >
                <TextField value={ma2Len} type="number" inputProps={{min: 3, max: 201}} size="small" onChange={handleMa2Len} label={"medium ma lenth.."} sx={{width: '100px'}}/>
            </Grid>
            <Grid item >
                <TextField value={ma3Len} type="number" inputProps={{min: 3, max: 201}} size="small" onChange={handleMa3Len} label={"slow ma lenth.."} sx={{width: '100px'}}/>
            </Grid>
        </Grid>
        {renderChart()}
    </Box> );
}
 
export default TickerChart;