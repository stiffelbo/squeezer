import React from 'react';

//Config
import { layoutConfig as lc } from '../../../config';

import {Box, IconButton} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadingIcon from '@mui/icons-material/Downloading';

const USDTFilters = ({data, onFilter, onRefresh, isPending}) => {
    const icon = isPending ? <DownloadingIcon /> : <RefreshIcon />
    return ( 
        <Box sx={{height: lc.filterBarHeight}}>
            <IconButton onClick={onRefresh}>{icon}</IconButton>
        </Box>
     );
}
 
export default USDTFilters;