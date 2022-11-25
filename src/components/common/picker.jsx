import React from 'react';

const Picker = ({currentId, id, text, onChange}) => {
    const active = currentId === id ? 'active' : '';
    const classes = `btn btn-sm btn-outline-dark ${active} `;
    return ( 
        <p className={classes} onClick={()=>onChange(id)}>{text}</p>
     );
}
 
export default Picker;