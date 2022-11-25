import React, { useState } from 'react';

import IconButton from '@mui/material/IconButton';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';



const ScrollerX = ({width = '100%', height = '100%', elems = [], buttonWidthPercent = 3 , muiColor="primary"}) => {

    const generateId = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        for ( var i = 0; i < 10; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
       }
       return result;
    }

    const ID = generateId();
    const handleLeft = e => {
        const elem = document.getElementById(ID);
        elem.scrollBy(-300,0);        
    }
    const handleRight = e => {
        const elem = document.getElementById(ID);
        elem.scrollBy(300,0);
    }

    const containerWidth =  `${100 - 2*buttonWidthPercent}%`;

    return ( 
        <div 
            style={{position: 'relative', width, height, display: 'flex', flexDirection: 'row'}}
        >
            
            <div style={{width:`${buttonWidthPercent}%`}}>
                <IconButton 
                    color={muiColor} 
                    onClick={handleLeft} 
                    sx={{position: 'absolute', left: 0, top: 0, zIndex: 3000}}
                    title="przewiń w lewo"
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
            </div>
            <div 
                style={{width: containerWidth, whiteSpace: 'nowrap', overflowX: 'scroll', overflowY: 'hidden', scrollBehavior: 'smooth'}} 
                className="scroll-hide-y"
                id={ID}
            >                
                {elems.map((elem, idx) => {
             
                    return <div style={{display: 'inline-block'}} key={idx}>
                        {elem}
                    </div>    
                    
                })}   
            </div>
            <div style={{width:`${buttonWidthPercent}%`}}>
                <IconButton 
                    color={muiColor} 
                    onClick={handleRight} 
                    sx={{position: 'absolute', right: 0, top: 0, zIndex: 3000}}
                    title="przewiń w prawo"
                    >
                        <KeyboardArrowRightIcon />
                </IconButton>
            </div>
        </div>
     );
}
 
export default ScrollerX;

