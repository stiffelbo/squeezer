import React, {useEffect, useState} from 'react';
import Chart from "react-apexcharts";

//Comp
import SelectMui from './../../common/selectMui';

//Mui
import {Box, Typography, Grid} from '@mui/material';

//Services
import { getKlines, intervals, limits } from '../../../services/binance';

//Utils
import { convert } from '../../../utils/convertForApex';

const Ticker = ({current}) => {

    const [data, setData] = useState([]);
    const [inter, setInter] = useState(['1d']);
    const [limit, setLimit] = useState(['200']);

    useEffect(async ()=> {
        const {data} = await getKlines(current, inter, limit);        
        setData(convert(data));
    }, [current, inter, limit])


    const handleInterval = e => {
        const val = e.target.value;
        setInter(val);
    }

    const handleLimit = e => {
        const val = e.target.value;
        setLimit(val);
    }

    return ( <Box>
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
        </Grid>
        
        <Chart 
            type="candlestick"
            series={data}
            width={800}
            height={600}
            options={{}}        
        />
    </Box> );
}
 
export default Ticker;