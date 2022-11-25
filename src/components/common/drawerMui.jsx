import React from 'react';

//Mui
import { Drawer } from '@mui/material';

const DrawerMui = ({open, anchor, onClose, children}) => {
    const isOpen = open.length > 0 ? true : false;
    return ( 
        <Drawer 
            open={isOpen}
            anchor={anchor}
            onClose={onClose}
        >
            {children}    
        </Drawer>
     );
}
 
export default DrawerMui;