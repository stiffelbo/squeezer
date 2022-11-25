import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const Add = ({onAdd}) => {
    return ( 

        <Fab color="success" size="small" onClick={()=>onAdd()} title="dodaj...">
            <AddIcon />
        </Fab>
     );
}
 
export default Add;