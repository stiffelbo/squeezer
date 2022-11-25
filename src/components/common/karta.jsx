import React from 'react';

import IconButton from '@mui/material/IconButton';
import FeedIcon from '@mui/icons-material/Feed';

const Karta = ({onClick, title = ""}) => {
    return ( 

        <IconButton color="primary" size="small" onClick={()=>onClick()} title={title}>
            <FeedIcon />
        </IconButton>
     );
}
 
export default Karta;