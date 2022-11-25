import React, { Component } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { themeGermania } from './../../themes/germania';
import { ThemeProvider } from '@mui/material/styles';

class TabsMui extends Component {
    render() { 
        const {tabs, handleChange, currentTab} = this.props; 
        return (
            <ThemeProvider theme={themeGermania}>
                <Box sx={{width: '100%', display: 'flex', justifyContent : 'center',}}>
                        <Tabs
                            value={currentTab}
                            onChange={handleChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs example"
                            TabIndicatorProps={{
                                sx : {
                                    display: 'none'
                                }
                            }}
                            sx={{
                                "& button:hover" : {
                                    color: 'germania.dark'
                                },
                                "& button.Mui-selected" : {
                                    color: 'germania.main',
                                    fontWeight : 600
                                }
                            }}
                        >
                            {tabs && tabs.map(item => {
                                if(item && item.roles){
                                    return (<Tab key={item.label} label={item.label} value={item.value} />)
                                }                        
                            })}
                        </Tabs>                       
                </Box>
            </ThemeProvider>
        );
    }
}
 
export default TabsMui;

