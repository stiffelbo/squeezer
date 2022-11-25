import React, { Component } from 'react';

class Draggable extends Component {

    handleDragStart = e => {
        const target = e.target;
        target.classList.add('border-warning');
    }

    handleDragEnd = e => {
        const target = e.target;
        target.classList.remove('border-warning');
    }

    render() { 
        const {bgColor, disabled} = this.props;
        const styles = {
            margin: '0.1em', 
            padding: '0.5em', 
            border: disabled ? '1px solid black' : '1px dashed black', 
            borderRadius : '5px',
            backGroundColor : bgColor,
        };
        if(disabled){
            return (
                <div 
                    style={styles}
                > 
                {this.props.children}
            </div>
            );
        }else{
            return (
                <div 
                    style={{...styles, cursor : 'pointer'}}
                    draggable="true" 
                    onDrag={()=>this.props.drag()}
                    onDragStart={e=>this.handleDragStart(e)}
                    onDragEnd={e=>this.handleDragEnd(e)}
                > 
                {this.props.children}
            </div>
            );
        }
        
    }
}
 
export default Draggable;

Draggable.defaultProps = {
    bgColor : 'white',
    disabled : false,
}