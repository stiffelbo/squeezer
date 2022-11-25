import React, { Component } from 'react';
import {NavLink } from "react-router-dom";

//redux
import { connect } from 'react-redux';
import { getNavCurrent, setNavCurrent } from '../../store/navRedux';
import { getActivityStream } from '../../store/activityStreamRedux';

//refresh store
import {getMaxIdProjects, loadRecentProjectsRequest} from '../../store/projectsRedux';
import {getMaxIdDesigns, loadRecentDesignsRequest, getCart} from '../../store/designsRedux';
import {getMaxIdCoins, loadRecentCoinsRequest} from '../../store/coinsRedux';
import { loadInvoicesRequest } from '../../store/invoicesRedux';
import { loadActivityStreamRequest } from '../../store/activityStreamRedux';
//Access
import { getCurrentUser } from '../../services/authService';
import {access, accessAdmin} from '../../accessPages';
//Comp
import {NavMenuMui} from '../common/navMenuMui';
import { AddNewMenu } from '../utils/addNewMenu';
import User from '../entities/auth/user';
import {Spot} from '../entities/spot/spot';
import ScrollerX from './../common/scrollerX';

//MUI
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

//Icons
import SummarizeIcon from '@mui/icons-material/Summarize';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

class MainNav extends Component {

    componentDidMount() {
      const {setCurrent, current} = this.props;
      window.addEventListener('click', e=>{
        let url = window.location.pathname;
        url = url.substr(1, url.length -1);
        if (url != current) {
          setCurrent(url);
        }
      });
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevProps.current !== this.props.current){
        this.render();
      }
      if(prevProps.cart !== this.props.cart){
        this.render();
      }
      if(prevProps.drawerCount !== this.props.drawerCount){
        this.render();
      }
    }

    handleChange = async current => {
      const {setCurrent} = this.props;
      setCurrent(current);
      if(current == 'zlecenia'){
        const {maxProject, getRecentProjects} = this.props;
        if(maxProject){
          await getRecentProjects(maxProject);
        }
      }
      if(current == 'designy'){
        const {maxDesign, getRecentDesigns} = this.props;
        if(maxDesign){
          await getRecentDesigns(maxDesign);
        }        
      }
      if(current == 'monety'){
        const {maxCoin, getRecentCoins} = this.props;
        if(maxCoin){
          await getRecentCoins(maxCoin);
        }
      }
      if(current == 'faktury'){
        const {loadInvoices} = this.props;
        await loadInvoices();
      }
      if(current == 'activityStream'){
        const {loadActivityStream} = this.props;
        const user = getCurrentUser();
        await loadActivityStream(user.id);
      }
    }

    renderAdminMenu = () => {
      const adminPages = accessAdmin();
      let showAdmin = false;
      adminPages.length && adminPages.map(item => item.roles === true ? showAdmin = true : null);
      if(showAdmin){
        return (<NavMenuMui options={adminPages} label={'Admin'}/>);
      }else{
        return <div></div>;
      }
    }

    renderActivityStream = () => {
      const {activityStream} = this.props;
      let active = 0;
      if(activityStream.length > 0){
        activityStream.map(item => {
          if(item.active === '1'){
            active += 1;
          }
        });
      } 

      return (
        <Box sx={{width: '3em'}}>
          <Badge badgeContent={active} color="warning">
            <NavLink  to={`/gem/`}>
              <img src='http://192.168.1.234/asana_generator/img/logo_72.png' style={{width: '100%'}} onClick={()=>this.handleChange('activityStream')}/>
            </NavLink>
          </Badge>
        </Box>                         
      );
    }   
 
    renderLinks = () => {
      let {current} = this.props;

      const pages = access({id: 31});

      const elems = [];

      pages.map((page) => {
        if(!page.roles){
          return;
        }
        if(current === page.link || current === page.link + '/'){
          elems.push(
            <Button
              key={page.link}
              variant="text"
              component="span"
            >
              <NavLink  to={`/${page.link}`}>                
                <Button 
                variant="contained" 
                size="small"
                color="inherit" 
                sx={{"color" : "black", "backgroundColor": 'germania.main', "&:hover" : {"backgroundColor": "germania.dark"}}}
                onClick={()=>this.handleChange(page.label)}
                >{page.label}</Button>                    
              </NavLink>   
            </Button>                               
          );
        }else{
          elems.push(
            <Button
              key={page.link}
              variant="text"
            >
              <NavLink  to={`/${page.link}`}>                
                <Button 
                  variant="text" 
                  size="small" 
                  component="span" 
                  color="inherit" 
                  sx={{"color" : "white", "backgroundColor": "inherit", "&:hover" : {"backgroundColor": "germania.dark"}}}
                  onClick={()=>this.handleChange(page.label)}
                >{page.label}</Button>                    
              </NavLink>   
            </Button>                               
            );
        }
      });
      return elems;
    }

    renderDrawerControlShipping = () => {
      const {setDrawer, drawer, drawerCount} = this.props;
      if(drawerCount > 0){
        return <IconButton 
          onClick={()=>setDrawer('Shipping')}
          sx={{color: 'white'}}
          size="small"
        >
          <Badge badgeContent={drawerCount} color="warning">
            <SummarizeIcon />
          </Badge>          
        </IconButton>
      }
    }

    renderDrawerControlCart = () => {
      const {setDrawer, drawer, cart} = this.props;
      if(cart.length > 0){
        return <IconButton 
          onClick={()=>setDrawer('Cart')}
          sx={{color: 'white'}}
          size="small"
        >
          <Badge badgeContent={cart.length} color="warning">
            <ShoppingCartIcon />
          </Badge>          
        </IconButton>
      }
    }

    render() { 
      
      const pages = access();
      const user = getCurrentUser();
      if(!user){
        return ( <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{backgroundColor : "#121b21"}}>

          </AppBar>
          </Box>)
      }
      if(!pages){
        return (<div></div>);
      }else{
        return ( <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{backgroundColor : "#121b21"}}>
            <Toolbar>
              <Box sx={{width: '48px'}}>
                {this.renderActivityStream()}                
              </Box>
              <Box sx={{width: '62px', display: 'flex', flexDirection: 'row'}}>
                {this.renderDrawerControlShipping()}
                {this.renderDrawerControlCart()}
              </Box>
              <Box sx={{width: '36px'}}>
                <AddNewMenu />
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, width: '70%'}}>
                <ScrollerX elems={[...this.renderLinks(), this.renderAdminMenu(), <Spot />]} buttonWidthPercent={3} muiColor="inherit"/>                
              </Box>
              <Box>
                <User />
              </Box>              
            </Toolbar>
          </AppBar>
        </Box> );
      }
    }
}
 
const mapStateToProps = state => ({
  current: getNavCurrent(state),
  maxProject: getMaxIdProjects(state),
  maxDesign: getMaxIdDesigns(state),
  maxCoin: getMaxIdCoins(state),
  activityStream: getActivityStream(state),
  cart: getCart(state)
});

const mapDispatchToProps = (dispatch) => {
  return {    
    setCurrent: id => dispatch(setNavCurrent(id)),
    getRecentProjects: id => dispatch(loadRecentProjectsRequest(id)),
    getRecentDesigns: id => dispatch(loadRecentDesignsRequest(id)),
    getRecentCoins: id => dispatch(loadRecentCoinsRequest(id)),
    loadInvoices: () => dispatch(loadInvoicesRequest()),
    loadActivityStream: id => dispatch(loadActivityStreamRequest(id)),
  }
}

const Container = connect(mapStateToProps, mapDispatchToProps)(MainNav);

export {  
  Container as MainNav, 
}