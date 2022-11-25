import React from 'react';

//MUI
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectMui = ({value, label, options, onChange, variant="standard", size = 'small', width="100px", dis = false, sx={}}) => {    
    const disabled = dis ? dis : false;
    /*
    const valueInRange = options.find(item => item.id == value);
    if(!valueInRange){
        console.log('Nieporawna wartość Selecta: ', label, value);
    }
    */
    return <FormControl size={size} sx={{ width: width }} variant={variant}>
                <InputLabel id={label}>{label}</InputLabel>
                <Select
                    labelId={`${label}_label`}
                    id={label}
                    value={value}
                    label={label}
                    onChange={onChange}
                    disabled={disabled}
                    sx={sx}
                    >
                    <MenuItem key={label} name={label} value="">{label}</MenuItem>
                    {options && options.map(item => {
                        if(item['disabled']){
                            return (<MenuItem key={item.id} name={label} value={item.id} disabled={true}>{item.value}</MenuItem>);
                        }else{
                            return (<MenuItem key={item.id} name={label} value={item.id}>{item.value}</MenuItem>);
                        }                            
                    })}
                </Select>
            </FormControl>
}
 
export default SelectMui;