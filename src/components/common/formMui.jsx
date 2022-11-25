import React, { Component } from 'react';
import Joi from "joi-browser";

//common
import TinyEditor from './tinyEditor';

//MUI
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import FormHelperText from '@mui/material/FormHelperText';
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

class FormMui extends Component {
    state = {
        data: {},
        errors: {}
    }; 

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;
    
        const errors = {};
        for (let item of error.details) errors[item.path[0]] = item.message;
        console.log(errors);
        return errors;
    };

    disableSubmit = () => {
        const errors = this.validate();
        if(errors) return true;
        return false;
    }
    
    validateProperty = (name, value ) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);
        console.log(error);
        return error ? error.details[0].message : null;
    };

    handleChange = e => {
        
        const input = e.target;
        const name = input.id;
        const value = input.value;
        
        const errorMessage = this.validateProperty(name, value);
        const errors = { ...this.state.errors };
        if (errorMessage) errors[name] = errorMessage;
        else delete errors[name];

        const data = { ...this.state.data };
        data[name] = value;
        this.setState({ data, errors, edited : true });
    };

    handleNumberChange = e => {
        
        const input = e.target;
        const name = input.id;
        const value = input.value.replace(',', '.');
        
        const errorMessage = this.validateProperty(name, value);
        const errors = { ...this.state.errors };
        if (errorMessage) errors[name] = errorMessage;
        else delete errors[name];

        const data = { ...this.state.data };
        data[name] = value;
        this.setState({ data, errors, edited : true });
    };

    handleFileChange = e => {
        const input = e.target;
        const name = input.id;    
        const file = input.files[0];
        const data = { ...this.state.data };
        data[name] = file;
        this.setState({ data, edited : true });
    };

    handleSelectChange = (e, n) => {
        let target = e.target;
        const name = n;
        let value = target.value;
        if(value === undefined){
            value = target.getAttribute("data-value");
        } 
        const errorMessage = this.validateProperty(name, value);
        const errors = { ...this.state.errors };
        if (errorMessage) errors[name] = errorMessage;
        else delete errors[name];
        const data = { ...this.state.data };
        data[name] = value;
        this.setState({ data, errors, edited : true });
    };

    handleAutocompleChange = (name, value) => {
        const errorMessage = this.validateProperty(name, value);
        const errors = { ...this.state.errors };
        if (errorMessage) errors[name] = errorMessage;
        else delete errors[name];

        const data = { ...this.state.data };
        data[name] = value;
        this.setState({ data, errors, edited : true });
    };

    handleAutocompleteOptionsChange = (name, value) => {
        console.log(name, value);
        const errorMessage = this.validateProperty(name, value);
        const errors = { ...this.state.errors };
        if (errorMessage) errors[name] = errorMessage;
        else delete errors[name];

        const data = { ...this.state.data };
        data[name] = value.id;
        this.setState({ data, errors, edited : true });
    };

    handleDateChange = e => {
        const name = e.target.id;
        const value = e.target.value;
        const errorMessage = this.validateProperty(name, value);
        const errors = { ...this.state.errors };
        if (errorMessage) errors[name] = errorMessage;
        else delete errors[name];
        const data = { ...this.state.data };
        data[name] = value;
        this.setState({ data, errors, edited : true });
    }

    handleCheckbox = e => {
        const name = e.target.id;
        const checked = e.target.checked;
        const errorMessage = this.validateProperty(name, checked);
        const errors = { ...this.state.errors };
        if (errorMessage) errors[name] = errorMessage;
        else delete errors[name];
        const data = { ...this.state.data };
        data[name] = checked;
        this.setState({ data, errors, edited : true });
    }

    handleEditor = (value, name) => {
        const data = { ...this.state.data };
        data[name] = value;
        const errorMessage = this.validateProperty(name, value);
        const errors = { ...this.state.errors };
        if (errorMessage) errors[name] = errorMessage;
        else delete errors[name];
        this.setState({ data, errors, edited : true });
    }

    handleClearField = (name) =>{
        const {data} = this.state;
        data[name] = '';
        this.setState({data});
    }

    handleDefault = () => {
        const {data} = this.state;
        const keys = Object.keys(data);
        keys.length && keys.map(item => data[item] = '');
        this.setState({data});
    }
    
    handleSubmit = e => {
        e.preventDefault();
    
        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;
    
        this.doSubmit();
    };

    renderTextInput = (name, label, variant="standard", size = 'small', width=100, rows=1, dis=false) => {
        const { data, errors } = this.state;
        let {disabled} = this.props;
        disabled = disabled ? disabled : dis ? dis : false;
        const errorProp = errors && errors[name] ? true : false;
        const helperText = errors && errors[name] ? errors[name] : '';
        const shrink = data[name] ? true : false;
        if(rows === 1)
            return (
                <TextField                
                    id={name}
                    label={label}
                    value={data[name]}
                    size={size}
                    sx={{width: width}}
                    variant={variant}
                    onChange={this.handleChange}
                    error = {errorProp}
                    helperText = {helperText}
                    disabled = {disabled}
                    InputLabelProps={{shrink}}
                />
            )
        else{
            return (
                <TextField                
                    id={name}
                    label={label}
                    value={data[name]}
                    size={size}
                    sx={{width: width}}
                    variant={variant}
                    multiline
                    rows={rows}
                    onChange={this.handleChange}
                    error = {errorProp}
                    helperText = {helperText}
                    disabled = {disabled}
                    InputLabelProps={{shrink}}
                />
            )
        }
    }    

    renderNumberInput = (name, label, variant="standard", size = 'small', width=100, dis = false, min='', max='') => {
        const { data, errors } = this.state;
        let {disabled} = this.props;
        disabled = disabled ? disabled : dis ? dis : false;
        const errorProp = errors && errors[name] ? true : false;
        const helperText = errors && errors[name] ? errors[name] : '';
        return (
            <TextField                
                id={name}
                label={label}
                value={data[name]}
                size={size}
                sx={{width: width}}
                variant={variant}
                onChange={this.handleNumberChange}
                error = {errorProp}
                helperText = {helperText}
                disabled = {disabled}
                inputProps={{ 
                    inputMode: 'numeric', 
                    pattern: '[0-9]*',
                    min: min,
                    max: max 
                }}
            />
        )
    }

    renderPasswordInput = (name, label, variant="standard", size = 'small', width=100, dis = false) => {
        const { data, errors } = this.state;
        let {disabled} = this.props;
        disabled = disabled ? disabled : dis ? dis : false;
        const errorProp = errors && errors[name] ? true : false;
        const helperText = errors && errors[name] ? errors[name] : '';
        return (
            <TextField                
                id={name}
                label={label}
                type="password"
                value={data[name]}
                size={size}
                sx={{width: width}}
                variant={variant}
                onChange={this.handleChange}
                error = {errorProp}
                helperText = {helperText}
                disabled = {disabled}
            />
        )
    }

    renderDateInput = (name, label, variant="standard", size = 'small', width=100, dis=false, min='', max='') => {
        const { data, errors } = this.state;
        let {disabled} = this.props;
        disabled = disabled ? disabled : dis ? dis : false;
        const errorProp = errors && errors[name] ? true : false;
        const helperText = errors && errors[name] ? errors[name] : '';
        const shrink = true;
        return (
            <TextField                
                id={name}
                value={data[name]}
                label={label}
                //value={data[name]}
                size={size}
                sx={{width: width}}
                variant={variant}
                onChange={this.handleDateChange}
                error = {errorProp}
                helperText = {helperText}
                type = 'date'
                disabled = {disabled}
                InputLabelProps={{shrink}}
                inputProps={{min, max}}
            />
        )
    }

    renderFileInput = (name, label, variant="standard", size = 'small', width=100) => {
        const { data } = this.state;
        return (
            <TextField                
                id={name}
                label={label}
                size={size}
                sx={{width: width}}
                variant={variant}
                onChange={this.handleFileChange}           
                inputProps={{ type: 'file' }}
            />
        )
    }
    
    renderMuiSelectInput = (name, label, options, variant="standard", size = 'small', width="100px", dis = false)=>{        
        const { data, errors } = this.state;
        let {disabled} = this.props;
        disabled = disabled ? disabled : dis ? dis : false;
        const errorProp = errors && errors[name] ? true : false;
        const helperText = errors && errors[name] ? errors[name] : '';
        return <FormControl size={size} sx={{ width: width }} variant={variant} error={errorProp}>
                    <InputLabel id={`${name}_label`}>{label}</InputLabel>
                    <Select
                        labelId={`${name}_label`}
                        id={name}
                        value={data[name]}
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
                    {errorProp && <FormHelperText>{helperText}</FormHelperText>}
                </FormControl>
    }

    renderAutocomplete = (name, label, options, variant="standard", size = 'small', width="100px") => {
        const {data} = this.state;
        const {disabled} = this.props;
        return (
            <Autocomplete
              disablePortal
              id={name}
              options={options}
              sx={{width: width}}
              value={data[name]}
              autoSelect={true}
              noOptionsText="Brak Opcji do wyboru"
              disabled={disabled}
              onChange={(e, v) => this.handleAutocompleChange(name, v)}
              renderInput={(params) => <TextField {...params}                                            
                                            size={size}
                                            label={label}
                                            variant={variant}                                                             
                                            />}
            />
          );
    }

    renderAutocompleteOptions = (name, label, options, variant="standard", size = 'small', width="100px") => {
        const {data} = this.state;
        return( <Autocomplete
            value={data[name]}
            options={options}
            id={name}
            disableClearable
            sx={{width: width}}
            getOptionLabel = {(option) => (option.value)}
            renderInput={(params) => (
                <TextField {...params} label={label} variant={variant} size={size} />
            )}
            onChange={(e, v) => this.handleAutocompleteOptionsChange(name, v)}
        />);
    }

    renderCheckBox = (name, label) => {
        const {data} = this.state;
        const {disabled} = this.props;
        return (
            <FormGroup>
              <FormControlLabel control={<Checkbox id={name} checked={data[name]} onChange={this.handleCheckbox} disabled={disabled} inputProps={{ 'aria-label': 'controlled' }} />} label={label} />
            </FormGroup>
        );
    }

    renderEditor = (name) => {
        const {data} = this.state;
        return (<TinyEditor value={data[name]} onEdit={this.handleEditor} onDismiss={this.handleEditorDissmiss} name={name}/>)
    }

    renderClearButton = () => {
        const {data} = this.state;
        const values = Object.values(data);
        let hasValues = false;
        values.length && values.map(item => item ? hasValues = true : null);
        
        if(!hasValues) return '';
        return <IconButton onClick={this.handleDefault} color="error">
            <ClearIcon />
        </IconButton>
    }

    renderClearFieldButton = (name) => {
        const {data} = this.state;
        const value = data[name];        
        
        if(!value) return '';
        return <IconButton onClick={() => this.handleClearField(name)} color="secondary">
            <ClearIcon />
        </IconButton>
    }

    renderSubmitButton = label => {
        const {disabled} = this.props;
        if(disabled){
            return "";
        }else{
            return (
                <Button disabled={this.disableSubmit()} variant="contained" color="primary" onClick={e => this.handleSubmit(e)}>
                  {label}
                </Button>
              );
        }        
    }
}
 
export default FormMui;

FormMui.defaultProps = {
    disabled: false
};