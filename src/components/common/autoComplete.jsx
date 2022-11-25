import React, { Component } from 'react';

//MUI
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SelectMui from './selectMui';
import Grid from '@mui/material/Grid';

class AutoComplete extends Component {
    state = { 
        filtered : [],
        val : '',
    } 

    componentDidMount() {
        this.filter();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data !== this.props.data){
            this.filter();
        }
        if(prevState.val !== this.state.val){
            this.filter();
        }
        if(prevState.filtered !== this.state.filtered){
            this.render();
        }
    }

    handleSearch = e => {
        const input = e.target;
        const value = input.value;
        this.setState({val: value});
    }

    handleSelect = e => {
        const input = e.target;
        const value = input.value;
        this.props.onChange(value);
    }

    filter = () => {
        const {properties} = this.props;
        const {val} = this.state;
        let filtered = this.props.data;
        if(val && properties){
            filtered = filtered.filter(item => {
                let itemslug = ''
                properties.map(prop => itemslug += ` ${item[prop]}`);
                return itemslug.toLowerCase().includes(val.toLowerCase());  
            });
        }
        this.setState({filtered});
    }

    render() { 
        const {idProp, valProp, value, searchLabel} = this.props;
        const {filtered} = this.state;
        const options = filtered.map(item => {
            let props = [];
            valProp.map(prop => props.push(item[prop]));
            return {id: item[idProp], value: props.join(' - ')}
        });
        return (
            <Box width="100%">
                <Grid container>
                    <Grid item md={12}>
                        <TextField value={this.state.val} label={searchLabel} onChange={this.handleSearch} variant="standard"></TextField>
                    </Grid>
                    <Grid item md={12}>
                        <SelectMui value={value} options={options} onChange={e=>this.handleSelect(e)} width="100%"/>
                    </Grid>
                </Grid>  
            </Box>
        );
    }
}
 
export default AutoComplete;