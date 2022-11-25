import React from 'react';
//Mui
import TextField from '@mui/material/TextField';
//Comp
import Clear from './clear';

const DateMui = ({value, label, variant="standard", onChange, size = 'small', width=100, dis=false, min='', max='', sx={}}) => {
    const disabled = dis ? dis : false;
    const shrink = true;
    const clear = () => {
        console.log('will clear');
    }
    return (
        <TextField                
            id={label}
            value={value}
            label={label}
            size={size}
            sx={{width: width}}
            variant={variant}
            onChange={onChange}
            type = 'date'
            disabled = {disabled}
            InputLabelProps={{shrink}}
            inputProps={{min, max, style : {...sx}}}
        />
    )
}
 
export default DateMui;