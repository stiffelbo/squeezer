import React, { Component } from 'react';

//common
import TinyEditor from './tinyEditor';

//MUI
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

class UpdateFormMui extends Component {

    componentDidUpdate(prevProps, prevState) {
        if(prevState.data !== this.state.data){
            this.render();
        }
    }

    handleChange = e => {        
        const input = e.target;
        const name = input.id;
        const value = input.value;
        this.handleUpdate(name, value);
        const data = { ...this.state.data };
        data[name] = value;
        this.setState({ data });
    };
    

    handleSelectChange = (e, n) => {
        let target = e.explicitOriginalTarget;
        let name = n;
        let value;
        if(!target) {
            target = e.target;
            value = target.value;
        }else{
            value = target.getAttribute("data-value");
            name = target.getAttribute("name");
        }  
        this.handleUpdate(name, value);
        const data = { ...this.state.data };
        data[name] = value;
        this.setState({ data });
    };

    handleAutocompleChange = (name, value) => {
        this.handleUpdate(name, value);
        const data = { ...this.state.data };
        data[name] = value;
        this.setState({ data });
    }

    handleDateChange = e => {
        const name = e.target.id;
        const value = e.target.value;
        this.handleUpdate(name, value);
        const data = { ...this.state.data };
        data[name] = value;
        this.setState({ data });
    }

    handleCheckbox = e => {
        const name = e.target.id;
        const checked = e.target.checked;
        const value = checked ? 1 : 0;
        this.handleUpdate(name, value);
        const data = { ...this.state.data };
        data[name] = checked;
        this.setState({ data });
    }

    handleEditor = (value, name) => {
        const data = { ...this.state.data };
        data[name] = value;
        this.handleUpdate(name, value);
        this.setState({ data });
    }

    renderTextInput = (name, label, variant="standard", size = 'small', width=100, rows=1, disabled = false) => {
        const { data } = this.state;
        const value = data[name];
        const shrink = value ? true : false;
        if(rows === 1)
            return (
                <TextField                
                    id={name}
                    label={label}
                    value={value}
                    size={size}
                    sx={{width: width}}
                    variant={variant}
                    onChange={e => this.handleChange(e)}
                    disabled = {disabled}
                    InputLabelProps={{shrink}}
                />
            )
        else{
            return (
                <TextField                
                    id={name}
                    label={label}
                    value={value}
                    size={size}
                    sx={{width: width}}
                    variant={variant}
                    multiline
                    rows={rows}
                    onChange={e => this.handleChange(e)}
                    disabled = {disabled}
                    InputLabelProps={{shrink}}
                />
            )
        }
    }    

    renderNumberInput = (name, label, variant="standard", size = 'small', width=100, disabled = false) => {
        const { data } = this.state;
        const value = data[name];
        return (
            <TextField                
                id={name}
                label={label}
                value={value}
                size={size}
                sx={{width: width}}
                variant={variant}
                onChange={e => this.handleChange(e)}
                disabled = {disabled}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' 
                }}
            />
        )
    }

    renderDateInput = (name, label, variant="standard", size = 'small', width='100%', disabled = false) => {
        const { data } = this.state;
        const value = data[name];
        const shrink = true;
        return (
            <TextField                
                id={name}
                label={label}
                value={`${data[name]}`}
                size={size}
                sx={{width: width}}
                variant={variant}
                onChange={this.handleDateChange}
                type = 'date'
                disabled = {disabled}
                InputLabelProps={{shrink}}
            />
        )
    }
    
    renderMuiSelectInput = (name, label, options, variant="standard", size = 'small', width="100px", disabled = false)=>{

        const { data } = this.state;
        return <FormControl size={size} sx={{ width: width }} variant={variant}>
                    <InputLabel id={`${name}_label`}>{label}</InputLabel>
                    <Select
                        labelId={`${name}_label`}
                        id={name}
                        value={`${data[name]}`}
                        label={label}
                        onChange={e => this.handleSelectChange(e, name)}
                        disabled={disabled}
                        >
                        <MenuItem key={name} name={name} value="">{label}</MenuItem>
                        {options && options.map(item => {
                            if(item['disabled']){
                                return (<MenuItem key={item.id} name={name} value={item.id} disabled={true}>{item.value}</MenuItem>);
                            }else{
                                return (<MenuItem key={item.id} name={name} value={item.id}>{item.value}</MenuItem>);
                            }                            
                        })}
                    </Select>
                </FormControl>
    }

    renderAutocomplete = (name, label, options, variant="standard", size = 'small', width="100px", disabled = false) => {
        const {data} = this.state;
        return (
            <Autocomplete
              disablePortal
              id={name}
              options={options}
              sx={{width: width}}
              value={`${data[name]}`}
              autoSelect={true}
              noOptionsText="Brak Opcji do wyboru"
              onChange={(e, v) => this.handleAutocompleChange(name, v)}
              renderInput={(params) => <TextField {...params}                                            
                                            size={size}
                                            label={label}
                                            variant={variant}                                                             
                                            />}
            />
          );
    }

    renderCheckBox = (name, label, disabled = false) => {
        const {data} = this.state;
    
        return (
            <FormGroup>
                <FormControlLabel control={<Checkbox id={name} checked={data[name]} onChange={this.handleCheckbox} disabled={disabled} inputProps={{ 'aria-label': 'controlled' }} />} label={label} />
            </FormGroup>
        );
            
    }

    renderEditor = (name, disabled = false) => {
        const {data} = this.state;
        if(!disabled){
            return (<TinyEditor value={data[name]} onEdit={this.handleEditor} onDismiss={this.handleEditorDissmiss} name={name}/>)
        }else{
            return (<div dangerouslySetInnerHTML={{ __html: data[name] }} />)
        }
        
    }
}
 
export default UpdateFormMui;
