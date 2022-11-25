import React, { Component } from "react";

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

//Theme
import { ThemeProvider } from '@mui/material/styles';
import { themeGermania } from '../../themes/germania';

//utils
import { debounce } from './../../utils/debounce';

class Filter extends Component {

    componentDidMount() {
        this.setState({arrays : this.getArrays(this.props.data)});
        this.filter();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data !== this.props.data){
            this.setState({arrays : this.getArrays(this.props.data)});
            this.filter();
        }
        if(prevState.filters !== this.state.filters) {
            this.filter();
        }
        if(prevState.filtered !== this.state.filtered) {
            this.setState({arrays : this.getArrays(this.state.filtered)});
        }
    }

    handleDefault = () => {
        const {filters} = this.state;
        const keys = Object.keys(filters);
        keys.length && keys.map(item => {
            if(item !== 'mode'){
                filters[item] = '';
            }            
        });
        this.setState({filters});
    }
 
    handleChange = (name, val) => {
        const filters = {...this.state.filters};
        delete filters[name];
        filters[name] = val;
        this.setState({filters});
    }

    handleSelectChange = (e, n) => {
        let target = e.explicitOriginalTarget;
        let name, value;
        if(!target){
            target = e.target;
            name = n;
            value = target.value;
        }else{
            name = target.getAttribute("name");
            value = target.getAttribute("data-value");
        }        
        this.handleChange(name, value);
    };

    renderMuiTextInput = (name, label, value, width="110px") =>{
        const classes = value ? 'bg-warning' : '';
        return <ThemeProvider theme={themeGermania} ><TextField
            id={name}
            label={label}
            value={value}
            className={classes}
            onChange={e=>this.handleChange(name, e.currentTarget.value)}
            size='small'
            sx={{width: width, backgroundColor: 'white'}}
        /></ThemeProvider>
    }

    renderMuiNumberInput = (name, label, value, width="110px") =>{
        const classes = value ? 'bg-warning' : '';
        return <ThemeProvider theme={themeGermania} ><TextField
            id={name}
            label={label}
            className={classes}
            value={value}
            onChange={e=>this.handleChange(name, e.currentTarget.value)}
            size='small'
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            sx={{width: width, backgroundColor: 'white'}}
        
        /></ThemeProvider>
    }

    renderMuiDateInput = (name, label, value, width="110px") =>{
        const classes = value ? 'bg-warning' : '';
        return <ThemeProvider theme={themeGermania} ><TextField
            id={name}
            label={label}
            className={classes}
            value={value}
            onChange={e=>this.handleChange(name, e.currentTarget.value)}
            size='small'
            type='date'
            sx={{width: width, backgroundColor: 'white'}}
            InputLabelProps={{shrink: true}}
        
        /></ThemeProvider>
    }

    renderSelectOptions = (options, name) => {
        const o = [];
        options.map(item => o.push({id: item, value: item}));
        return o.map((option, i) => (
          <MenuItem key={option.id} name={name} value={option.value}>{option.value}</MenuItem>
        ));
    };

    renderMuiSelectInput = (name, label, value, options, width=100) =>{
        const classes = value ? 'bg-warning' : '';
        return <ThemeProvider theme={themeGermania} ><FormControl size="small" sx={{ minWidth: width }}>
                    <InputLabel id={`${name}_label`}>{label}</InputLabel>
                    <Select
                        labelId={`${name}_label`}
                        id={name}
                        value={value}
                        label={label}
                        onChange={e => this.handleSelectChange(e, name)}
                        className={classes}
                        sx={{backgroundColor: 'white'}}
                        
                        >
                        <MenuItem key={name} name={name} value="">{label}</MenuItem>
                            {options && this.renderSelectOptions(options, name)}
                    </Select>
                </FormControl></ThemeProvider>
    }

    renderClearButton = () => {
        const {filters} = this.state;
        const values = Object.values(filters);
        let hasValues = false;
        values.length && values.map(item => item ? hasValues = true : null);
        
        if(!hasValues) return '';
        return <IconButton onClick={this.handleDefault} color="error">
            <ClearIcon />
        </IconButton>
    }   

    renderSearchButton = (onSearch) => {
        return <IconButton onClick={onSearch} color="primary">
            <SearchIcon />
        </IconButton>
    }   
}
 
export default Filter;