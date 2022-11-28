import React from 'react';

//config
import { layoutConfig as lc } from '../../../config';

//Mui
import {DataGrid} from '@mui/x-data-grid';
import {Box, Button} from '@mui/material';

const USDTDataGrid = ({data, onItemChange = null, current = null, rwd}) => {
    
    //Render functions

    const renderTicker = params => {
        //is current
        const symbol = params.value;
        if(current === symbol){
            return <Button 
                        onClick={()=>onItemChange(null)}
                        variant="contained"
                        color="warning"
                        size="small"
                    >
                        {symbol}
                    </Button>
        }else{
            return <Button 
                        onClick={()=>onItemChange(symbol)}
                        variant="text"
                        color="primary"
                        size="small"
                    >
                        {symbol}
                    </Button>
        }
    }
  
    
    const getRows = () => {
        const rows = [];
        data && data.map((item, index) => {
            const row = {              
                id: `${index}_${item.symbol}`,
                symbol: item.symbol,
                o: +item.o,
                h: +item.h,
                l: +item.l,
                c: item.lastPrice ? +item.lastPrice : +item.c,
                low31: +item.min31,
                low81: +item.min81,
                low200: +item.min200,
                max31: +item.max31,
                max81: +item.max81,
                max200: +item.max200,
                sma31: +item.sma31,
                sma81: +item.sma81,
                sma200: +item.sma200,
                qVol: +item.qVol,
                volSma31: +item.volSma31,
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
            renderCell : params => renderTicker(params),
        },
        {
            field: 'c',
            headerName: 'Cena',
            width: 120,
            editable: false,
        },
        {
            field: 'qVol',
            headerName: 'Volume',
            width: 120,
            editable: false,
        },
        {
            field: 'low31',
            headerName: 'Min 31',
            width: 120,
            editable: false,
        },
        {
            field: 'low81',
            headerName: 'Min 81',
            width: 120,
            editable: false,
        },
        {
            field: 'low200',
            headerName: 'Min 200',
            width: 120,
            editable: false,
        },
        {
            field: 'max31',
            headerName: 'Max 31',
            width: 120,
            editable: false,
        },
        {
            field: 'max81',
            headerName: 'Max 81',
            width: 120,
            editable: false,
        },
        {
            field: 'max200',
            headerName: 'Max 200',
            width: 120,
            editable: false,
        },
    ];

    const getRowClass = params => {
        return "";
    }

    return ( 
        <Box sx={{ height :`${rwd.height - lc.filterBarHeight}px`, width: '100%', maxWidth: '100%'}}>
            <DataGrid
                rows={getRows()}
                columns={columns}
                rowHeight={80}
                pageSize={100}
                getRowClassName={getRowClass}
                sx={{backgroundColor: 'white', fontSize : '12px'}}
            />
      </Box>
     );
}
 
export default USDTDataGrid;