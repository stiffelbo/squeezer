import React from 'react';

import Chip from '@mui/material/Chip';

const PinnToTop = ({id, isPinned, onPinn, onUnPinn, type}) => {

    if(isPinned == '1'){
        return (
            <Chip
                variant="outlined"
                label="Unpin"
                clickable={true}
                onClick={() => onUnPinn(id, type)}
                color='secondary'
            />
        )
    }else{
        return (
            <Chip
                variant="outlined"
                label="PinToTop"
                clickable={true}
                onClick={() => onPinn(id, type)}
                color='primary'
            />
        )
    }
}
 
export default PinnToTop;