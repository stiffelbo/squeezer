import React from 'react';

//MUI
import { Grid } from '@mui/material';

const FilterBar = ({children}) => {
    return ( 
        <Grid container  maxWidth="false" sx={{ padding: "0.5em 1.5em", justifyContent : "space-between", backgroundColor: '#f5f5f5'}}>
            {children}
        </Grid>
     );
}
 
export default FilterBar;