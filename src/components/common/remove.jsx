import React from 'react';

import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Remove = ({onRemove, title = ""}) => {
    return ( 

        <IconButton color="error" size="small" onClick={()=>onRemove()} title={title}>
            <DeleteForeverIcon />
        </IconButton>
     );
}
 
export default Remove;