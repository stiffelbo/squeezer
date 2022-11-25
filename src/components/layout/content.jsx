import React from 'react';

//MUI
import { Grid } from '@mui/material';

const Content = ({children}) => {
    return ( 
        <Grid container maxWidth='false' sx={{paddingTop: '0.75em', paddingLeft: '1.5em', paddingRight: '1.5em'}}>
            {children}
        </Grid>
     );
}
 
export default Content;