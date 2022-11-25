import React, {Component} from 'react';
import { PropTypes } from 'prop-types';

//utils
import {debounce} from '../../utils/debounce';
import { hoursToDecimal, decimalToHoursMinutes } from '../../utils/hoursToDecimal';
//MUI
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

class TimePicker extends Component{
    state = {
        hours : 0,
        minutes : 0,
        emit: false,
    }

    populate = () => {
        const {val} = this.props;
        const result = decimalToHoursMinutes(val);
        this.setState({hours : result[0], minutes : result[1], emit: false});
    }

    d_onChange = debounce(this.props.onChange, 500);

    componentDidMount() {
        this.populate();
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.hours !== this.state.hours){
            this.state.emit && this.d_onChange(this.hoursToNum());
            this.render();
        }
        if(prevState.minutes !== this.state.minutes){
            this.state.emit && this.d_onChange(this.hoursToNum());
            this.render();
        }
        if(prevProps.val !== this.props.val){
            this.populate();
        }
    }

    hoursToNum = () => {
        const {hours , minutes} = this.state;
        const h = +hours;
        const m = +minutes;
        return +(hoursToDecimal(h, m));
    }

    handleHours = e => {
        const input = e.target;        
        let value = input.value
        this.setState({hours:value, emit: true});
    }

    handleMinutes = e => {
        const input = e.target;        
        let value = input.value
        this.setState({minutes:value, emit: true});
    }
   
    render() {
        if(!this.props.disabled){
            return (  <Grid container>
                <Grid item md={6}>
                    <TextField
                        id="Godziny"
                        label="Godziny"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{ style: {textAlign: 'center'}, inputMode: 'numeric', min: 0, step: '1',  pattern: '[0-9]*' 
                            }}
                        sx={{width: '100%'}}
                        variant="standard"
                        value={this.state.hours}
                        onChange={e => this.handleHours(e)}
                        disabled={this.props.disabled}
                    />
                </Grid>
                <Grid item md={6}>
                    <TextField
                        id="Minuty"
                        label="Minuty"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{ style: {textAlign: 'center'},inputMode: 'numeric', min: 0, max: 59, step: '1',  pattern: '[0-9]*' 
                            }}
                        sx={{width: '100%'}}
                        variant="standard"
                        value={this.state.minutes}
                        onChange={e => this.handleMinutes(e)}
                        disabled={this.props.disabled}
                    />
                </Grid>
            </Grid>);
        }else{
            const minutes = this.state.minutes < 10 ? `0${this.state.minutes}` : `${this.state.minutes}`;
            return ( 
                <Typography variant="body1">{`${this.state.hours} : ${minutes}`}</Typography>
            );
        }        
    }    
}

export default TimePicker;

TimePicker.propTypes = {
    onChange : PropTypes.func,
    val: PropTypes.number.isRequired,
    disabled : PropTypes.bool.isRequired,
}

TimePicker.defaultProps = {
    val : 0,
    disabled : false,
}