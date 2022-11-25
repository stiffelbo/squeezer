import React from 'react';

import { deepPurple, indigo } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

const FormItemIcon = ({icon, input, clear = false ,required = true, labelSpan = 2, iconTitle = ''}) => {
    let avatar =  { bgcolor: deepPurple[500] };
    if(!required) avatar =  { bgcolor: indigo[300] };
    const ls = labelSpan > 0 && labelSpan < 12 ? true : false;
    if(ls){
        return (
            <Grid container style={{marginBottom: '16px'}} >
                <Grid item md={labelSpan} sx={{display: 'flex', flexDirection : 'row', justifyContent: 'right', alignItems: 'center', paddingRight: '1em'}}>                    
                        {icon}
                </Grid>
                <Grid item md={12-labelSpan} >
                    { 
                        <Grid container>
                            <Grid item md={11}>{input}</Grid>
                            <Grid item md={1}>{clear && clear}</Grid>
                        </Grid>
                    }             
                </Grid>
            </Grid>
        );
    }else{
        return (
            <Grid container style={{marginBottom: '16px'}}>
                <Grid item md={2} sx={{display: 'flex', flexDirection : 'row', justifyContent: 'right', alignItems: 'center', paddingRight: '1em'}}>
                        {icon}
                </Grid>
                <Grid item md={10}>
                    { 
                        <Grid container>
                            <Grid item md={11}>{input}</Grid>
                            <Grid item md={1}>{clear && clear}</Grid>
                        </Grid>
                    }             
                </Grid>
            </Grid>
        );
    }
    
}

export default FormItemIcon;