import React, { Component } from 'react';
/*  Components  */
import { AddClientsForm } from '../entities/clients/addClientsForm';
import { AddCoinForm } from '../entities/coins/addCoinForm';
import { AddShippingsForm } from '../entities/shippings/addShippingsForm';
import { AddDesignForm } from '../entities/designs/addDesignForm';
import { AddClientAddress } from '../entities/clients/addClientAddress';
import { AddClientContact } from '../entities/clients/addClientContact';
import { AddDostawcaForm } from '../entities/suppliers/addDostawcaForm';
import { AddUslugaForm } from '../entities/services/addUslugaForm';
import { AddInvoiceForm } from '../entities/invoices/addInvoiceForm';
import { AddItAssetForm } from '../entities/itAssets/addItAssetForm';
import { MainNav } from "./mainNav";
import {CloseAddNew} from '../utils/closeAddNew';

//redux
import { connect } from 'react-redux';
import { getAddNew } from '../../store/addNewRedux';
//Comp
import DrawerMui from '../common/drawerMui';

//MUI
import { Container, Box, CssBaseline } from '@mui/material';
//Theme
import { ThemeProvider } from '@mui/material/styles';
import { themeGermania } from './../../themes/germania';
import { AddDokumentForm } from '../entities/dokumenty/addDokumentForm';

class MainLayout extends Component {

  renderNewComp = () => {
    const {comp} = this.props;
    switch (comp) {
      case 'Klient':
        return (<AddClientsForm />);
      case 'Adres':
        return (<AddClientAddress idClient={''} show={true}/>);
      case 'Kontakt':
        return (<AddClientContact idClient={''} show={true}/>);
      case 'Moneta':
        return (<AddCoinForm />);
      case 'Design':
        return (<AddDesignForm />);
      case 'Wysylka':
        return (<AddShippingsForm />);
      case 'Dostawca':
        return (<AddDostawcaForm />);     
      case 'Usluga':
        return (<AddUslugaForm />);
      case 'Faktura':
        return (<AddInvoiceForm />);
      case 'It Asset':
        return (<AddItAssetForm id={''} />);
      case 'Dokument':
        return (<AddDokumentForm id={''} />);
     
      default:
        return null;
    }
  }

  render() { 
    const {user, comp, setDrawer, drawer, drawerCount} = this.props;
    return (
      <Box sx={{
        backgroundImage: 'url("http://192.168.1.234/asana_generator/img/tablica/background.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',

      }}>  
          <CssBaseline />
            <ThemeProvider theme={themeGermania} >
              <MainNav user={user} drawer={drawer} setDrawer={setDrawer} drawerCount={drawerCount}/>
            </ThemeProvider>
          <Box sx={{width : '100%', textAlign : 'right', paddingRight : '1em'}}>
              {comp && <CloseAddNew />}
          </Box>
          <Box sx={{width : '65%'}}>
              {this.renderNewComp()}
          </Box>
        
          <Box sx={{width : '100%'}}>
              {this.props.children}
          </Box>
      </Box>
    );
  }
}
 
export default MainLayout;

const mapStateToProps = state => ({
  comp: getAddNew(state),
});

const Cont = connect(mapStateToProps, null)(MainLayout);
 
export {  
    Cont as MainLayout, 
}