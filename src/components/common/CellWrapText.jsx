import React from 'react';

import Typography from '@mui/material/Typography';

const CellWrapText = ({val, fontSize = 12}) => {
   
    if(!val){
        return (<div></div>);
    }else if(typeof val === 'string'){
        return (
            <Typography variant='body1' sx={{wordBreak: 'break-word', whiteSpace: 'break-spaces', fontSize: `${fontSize}px`}}>{val}</Typography>
        );
    }else{
        return (<div>data error</div>);
    }
    
}
 
export default CellWrapText;