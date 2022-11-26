import React, {useEffect, useState} from 'react';
//SErvices
import {getUsdt} from '../../services/binance'

//Mui
import {DataGrid} from '@mui/x-data-grid';
import {Box} from '@mui/material';

const ListUsdtCoins = () => {

    const [data, setData] = useState([]);

    useEffect ( async () => {
        const {data} = await getUsdt();
        console.log('api called');
        setData(data);
    }, []);

    const getRows = () => {
        const rows = [];
        data && data.map((item, index) => {
            const row = {              
                id: `${index}_${item.Symbol}`,
                symbol: item.symbol,
                lastPrice: item.lastPrice,
            };
            rows.push(row);
        });
        return rows;
    }

    const columns = [
        {
            field: 'symbol',
            headerName: 'Ticker',
            width: 150,
            editable: false,
        },
        {
            field: 'lastPrice',
            headerName: 'Cena',
            width: 120,
            editable: false,
        },
    ];

    return ( 
        <Box sx={{ height: '80vh', width: '100%', maxWidth: '100%'}}>
            <DataGrid
                rows={getRows()}
                columns={columns}
                rowHeight={80}
                pageSize={100}
                sx={{backgroundColor: 'white', fontSize : '12px'}}
            />
      </Box>
     );
}
 
export default ListUsdtCoins;