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
                lastPrice: +item.lastPrice,
                change: +item.priceChangePercent,
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
            field: 'lastPrice',
            headerName: 'Cena',
            width: 120,
            editable: false,
        },
        {
            field: 'change',
            headerName: '%Change',
            width: 120,
            editable: false,
        },
    ];

    const handleRowClick = e => {
        console.log(e)
    }

    const getRowClass = params => {
        return "";
    }

    return ( 
        <Box sx={{ height :`${rwd.height - lc.filterBarHeight}px`, width: '100%', maxWidth: '100%'}}>
            <DataGrid
                rows={getRows()}
                columns={columns}
                rowHeight={80}
                onRowClick={handleRowClick}
                pageSize={100}
                getRowClassName={getRowClass}
                sx={{backgroundColor: 'white', fontSize : '12px'}}
            />
      </Box>
     );
}
 
export default USDTDataGrid;