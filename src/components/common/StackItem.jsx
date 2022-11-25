import React from 'react';

//Mui
import { Box } from '@mui/system';

const StackItem = ({children, style = {width: '100%', paddding: '0.5em', marginBottom: '0.5em'}}) => {
    return (
        <Box sx={style}>
            {children}
        </Box>
    )
}
 
export default StackItem;