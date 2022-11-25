import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';

//redux
import {connect} from 'react-redux';
import {setDesignsTab, setProjectsTab, setCoinsTab, setClientTab} from '../../store/tabsRedux';

//Icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const NavMenuMui = ({label, options}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const icon = open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
  if(options.length === 0) return (<></>)
  else{
    return (
      <>
        <Button
          variant="text"
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{color: 'white'}}
          endIcon={icon}
        >
          {label}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {options && options.map(item =>  {
            if(item.roles){
              return (<MenuItem key={item.label} onClick={handleClose}>
                <NavLink to={item.link} style={{color: 'black', textDecoration: 'none'}}>
                  <Button sx={{color: 'black', '&:hover' : {color: 'germania.dark'}}}>{item.label}</Button>
                </NavLink>
              </MenuItem>)
            }
            })
          }
        </Menu>
      </>
    );
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
    tabCoins: tab => dispatch(setCoinsTab(tab)),
    tabDesigns: tab => dispatch(setDesignsTab(tab)),
    tabProjects: tab => dispatch(setProjectsTab(tab)),
    tabClient: tab => dispatch(setClientTab(tab)),
  }
}

const Container = connect(null, mapDispatchToProps)(NavMenuMui);

export {  
  Container as NavMenuMui, 
}

