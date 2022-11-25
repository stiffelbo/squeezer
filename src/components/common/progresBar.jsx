import React from 'react';
import { Typography } from '@mui/material';

const ProgresBar = ({valDone, valPlan, showVal = true, height = '1.2em'}) => {
    const progress = Math.floor(parseInt(valDone) / parseInt(valPlan) * 100);
    const bgcolor = progress === 100 ? '#6f42c1' : '#6c757d';
    const fontColor = progress < 60 ? 'inherit' : 'white';
    const progressBar = `linear-gradient(90deg, ${bgcolor} ${progress}%, transparent ${progress}%)`;
    return (
        <div style={{backgroundImage : progressBar, 
                    width: '100%', height, border: '1px solid gray', borderRadius: '5px',
                    display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                    fontSize: '0,75em'
                }}
        >
            {showVal &&<Typography variant="body1" color={fontColor}>{`${valDone} / ${valPlan}`}</Typography>}   
        </div>
    );
}
 
export default ProgresBar;