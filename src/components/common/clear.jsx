import React from 'react';

import IconButton from '@mui/material/IconButton';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const Clear = ({onClear, title = ""}) => {
    return ( 

        <IconButton color="error" size="small" onClick={()=>onClear()} title={title}>
            <ClearOutlinedIcon />
        </IconButton>
     );
}
 
export default Clear;