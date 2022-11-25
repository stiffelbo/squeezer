import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { connect } from 'react-redux';

import { setRwdMode } from "./store/rwdRedux";
//import { loadUserRequest, getAuth } from "./store/authRedux";
import { loadActivityStreamRequest } from "./store/activityStreamRedux";
import {getSelectedProjects} from "./store/projectsRedux";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import auth from "./services/authService";
import {listenCookieChange} from "./utils/cookieListener";
//Mui
import { Box } from "@mui/material";

//COMP
import { Loader } from "./components/utils/loader";

import {MainLayout} from "./components/layout/mainLayout";
import NotFound from "./components/notFound";
import DrawerMui from "./components/common/drawerMui";
import LoginForm from "./components/entities/auth/loginForm";
import Logout from "./components/entities/auth/logout";
import {Coins} from './components/entities/coins/coins';
import {Designs} from './components/entities/designs/designs';
import {Projects} from './components/entities/projects/projects';
import {Clients} from './components/entities/clients/clients';
import {Dostawcy} from './components/entities/suppliers/dostawcy';
import {Uslugi} from './components/entities/services/uslugi';
import {Shippings} from './components/entities/shippings/shippings';
import {Inventory} from './components/entities/inventory/inventory';
import {Cenniki} from './components/entities/pricelists/cenniki';
import {Periods} from './components/entities/periods/periods';
import {Materials} from './components/entities/materials/materials';
import {Maszyny} from './components/entities/maszyny/maszyny';
import {RodzajeWad} from './components/entities/wadyMonet/rodzajeWad';
import {Invoices} from './components/entities/invoices/invoices';
import {CoinsQuality} from './components/entities/coinQuality/coinsQuality';
import {ProductionTasks} from './components/entities/productionTasks/productionTasks';
import {Reklamacje} from './components/entities/reklamacje/reklamacje';

import {TestForm} from './components/testForm';
import { Statuses } from "./components/entities/statuses/statuses";
import { Types } from "./components/entities/types/types";
import { Kapsle } from "./components/entities/capsules/kapsle";
import { Proceses } from "./components/entities/proceses/proceses";
import { Ennoblings } from "./components/entities/ennoblings/ennoblings";
import { ShippingMethods } from "./components/entities/shippingMethods/shippingMethods";
import { Users } from "./components/entities/users/users";
import { Departments } from "./components/entities/departments/departments";
import { ActivityStream } from "./components/entities/activityStream/activityStream";
import { ItAssets } from "./components/entities/itAssets/itAssets";
import { ItAssetsShifts } from "./components/entities/itAssetsShifts/itAssetsShifts";
import { Dokumenty } from "./components/entities/dokumenty/dokumenty";
import ProtectedRoute from "./components/common/protectedRoute";

import {ShipProjects} from "./components/entities/projects/shipProjects";
import {Cart} from "./components/entities/cart/cart";

class App extends Component {
  state = {
    drawer: '',
  };

  componentDidMount(){
    const {setRwd, loadActivityStream} = this.props;
    const user = auth.getCurrentUser();
    setInterval(()=>loadActivityStream(user.id), 5 * 60 * 1000);
    //RWD
    const height = window.innerHeight;
    const width = window.innerWidth;
    setRwd({height, width});
    window.addEventListener('resize', e => {
      const height = e.target.window.innerHeight;
      const width = e.target.window.innerWidth;
      setRwd({height, width});
    });
    //prevent cookie change
    const banUser = async (was) => {
      //await auth.logout();
      //location.reload();
      const oldVal = was.oldValue;
      const newVal = was.newValue;
      console.log(oldVal, newVal);
    }
    listenCookieChange(banUser, 5000);

    this.setState({ user });
  }

  handleCloseDrawer = () => {
    this.setState({drawer : ''});
  }

  handleSetDrawer = compName => {
    this.setState({drawer : compName});
  }

  render() {
    const { drawer, user} = this.state;
    const {selectedProjects} = this.props;
    const drawerCount = selectedProjects.length;
    return (
      <MainLayout user={user} setDrawer={this.handleSetDrawer} drawer={drawer} drawerCount={drawerCount} >
        <Loader />
        <ToastContainer />
        <DrawerMui 
            open={drawer} 
            anchor={'right'}
            onClose={()=>this.handleCloseDrawer()}         
          >
            <Box 
              role="presentation"
            >
              {drawer === 'Shipping' && <ShipProjects />}
              {drawer === 'Cart' && <Cart />}
            </Box>
        </DrawerMui>

        <Switch location={location}>

          <Route path="/gem/login" component={LoginForm} />
          <Route path="/gem/logout" component={Logout} />
          <ProtectedRoute path="/gem/pracownicy" component={Users} />
          <ProtectedRoute path="/gem/projects/:id" component={Projects} />
          <ProtectedRoute path="/gem/projects" component={Projects} />
          <ProtectedRoute path="/gem/design/:id" component={Designs} />
          <ProtectedRoute path="/gem/design" component={Designs} />
          <ProtectedRoute path="/gem/coins" component={Coins} />                 
          <ProtectedRoute path="/gem/quality" component={CoinsQuality} />                 
          <ProtectedRoute path="/gem/clients" component={Clients} />                 
          <ProtectedRoute path="/gem/suppliers" component={Dostawcy} />                 
          <ProtectedRoute path="/gem/services" component={Uslugi} />                 
          <ProtectedRoute path="/gem/shippings" component={Shippings} />                 
          <ProtectedRoute path="/gem/inventory" component={Inventory} />                 
          <ProtectedRoute path="/gem/pricelists" component={Cenniki} />                 
          <ProtectedRoute path="/gem/periods" component={Periods} />                 
          <ProtectedRoute path="/gem/materials" component={Materials} />                 
          <ProtectedRoute path="/gem/machines" component={Maszyny} />                 
          <ProtectedRoute path="/gem/rodzajeWad" component={RodzajeWad} />                 
          <ProtectedRoute path="/gem/invoices" component={Invoices} />                 
          <ProtectedRoute path="/gem/prodTasks" component={ProductionTasks} />                 
          <ProtectedRoute path="/gem/dokumenty" component={Dokumenty} />                 
          <Route path="/gem/reklamacje" component={Reklamacje} />                 
          <Route path="/gem/statuses" component={Statuses} />                 
          <Route path="/gem/types" component={Types} />                 
          <Route path="/gem/proceses" component={Proceses} />                 
          <Route path="/gem/capsules" component={Kapsle} />                 
          <Route path="/gem/ennoblings" component={Ennoblings} />                 
          <Route path="/gem/departments" component={Departments} />                 
          <Route path="/gem/shippingMethods" component={ShippingMethods} />                              
          <Route path="/gem/not-found" component={NotFound} />
          <Route path="/gem/test" component={TestForm} />
          <Route path="/gem/itAssets" component={ItAssets} />
          <Route path="/gem/itAssetsShifts" component={ItAssetsShifts} />
          <Redirect from="/gem/not-found" exact to="/gem/projects" />
          {!user && <Redirect from="/gem" to="/gem/login" />}
          <Route path="/gem/" component={ActivityStream} />
        </Switch>

      </MainLayout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setRwd : mode => dispatch(setRwdMode(mode)),
  loadActivityStream : id => dispatch(loadActivityStreamRequest(id)),
});

const mapStateToProps = state => ({
  selectedProjects : getSelectedProjects(state),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

export {Container as  App};
