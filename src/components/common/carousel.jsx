import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

//MUI
import IconButton from '@mui/material/IconButton';
//Icons
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

class Carousel extends Component {
    state = { 
        index: 0,
    }

    componentDidMount() {
        const {data, item} = this.props;
        if(item){
            const i = data?.indexOf(data.find(val => val.url === item));
            this.setState({index: i});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {data, item} = this.props;
        if(prevProps.item !== this.props.item){
            const i = data?.indexOf(data?.find(val => val.url === item));
            this.setState({index: i});
        }
        if(prevState.index !== this.state.index){
            this.render();
        }
        if(prevProps.data !== this.props.data){
            this.setState({index: 0});
        }
    }
    
    handleSwitch = (dir = 1) => {
        const {index} = this.state;
        const {data} = this.props;

        if(dir === 1){
            if((index) == data.length -1){
                this.setState({index: 0});
            }else{
                this.setState({index: index + 1});
            }
        }
        if(dir === -1){
            if((index) == 0){
                this.setState({index: data.length - 1});
            }else{
                this.setState({index: index - 1});
            }
        }        
    }

    renderLeft = () => {
        return (
            <IconButton onClick={()=>this.handleSwitch(-1)} variant="contained" color="primary">
                <ArrowBackIosIcon />
            </IconButton>
        )
    }

    renderRight = () => {
        return (
            <IconButton onClick={()=>this.handleSwitch(1)} variant="contained" color="primary">
                <ArrowForwardIosIcon />
            </IconButton>
        )
    }

    handleClick = e => {
        if(this.props.onClick){
            this.props.onClick(e);
        }else{
            this.handleSwitch();
        }
    }

    renderCaption = () => {
        const {data} = this.props;
        const {index} = this.state;
        return (
            <div>
                {data?.map((item, idx) => {
                    if(idx !== index){
                        return (
                            <IconButton  onClick={()=>this.setState({index: idx})}>
                                <RadioButtonUncheckedIcon />
                            </IconButton>
                        )
                    }else{
                        return (
                            <IconButton color="primary">
                                <RadioButtonCheckedIcon />
                            </IconButton>
                        )
                    }
                })}
            </div>
        )
    }

    renderImage = () => {
        const {index} = this.state;
        const {data} = this.props;
        const item = data[index];
        const image = item ? item['url'] : '';
        const title = item ? item['name'] : '';
        return (
            <div style={{height: '100%', textAlign: 'center'}}>
                <div style={{height: '100%', width: 'auto', display: 'flex', flexDirection: 'column', alignItems:'center'}}>
                    <img src={image} style={{height: '100%', cursor: 'pointer'}} onClick={e => this.handleClick(e)} title={title}/>
                    {this.renderCaption()}
                </div>
            </div>         
        )
    }
    
    render() { 
        return (<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%', maxWidth: '100%'}}>
            {this.renderLeft()}
            {this.renderImage()}
            {this.renderRight()}
        </div>);
    }
}

Carousel.propTypes = {
    data : PropTypes.array.isRequired,
    item: PropTypes.string,
    onClick : PropTypes.func
}
 
export default Carousel;
