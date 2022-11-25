import React from 'react';
//Access
import { isPM, isDesigner, isEnnobler, isAdmin, isIT, isControling } from '../../permissions';
import { getCurrentUser } from '../../services/authService';

//Service
import { getQuote } from '../../services/quotesService';

//Redux
import { connect } from 'react-redux';

import { loadActivityStreamRequest } from '../../store/activityStreamRedux';
import { loadMaszynyRequest } from '../../store/maszynyRedux';
import { loadUsersRequest } from '../../store/usersRedux';
import { loadCoinsRequest } from '../../store/coinsRedux';
import { loadKapsleRequest } from '../../store/kapsleRedux';
import { loadDesignsRequest, loadRecentDesignsRequest } from '../../store/designsRedux';
import { loadProjectsRequest, loadRecentProjectsRequest } from '../../store/projectsRedux';
import { loadStatusesRequest } from '../../store/statusesRedux';
import { loadDepartmentsRequest } from '../../store/departmentsRedux';
import { loadProcesesRequest } from '../../store/procesesRedux';
import { loadClientsRequest } from '../../store/clientsRedux';
import { loadDostawcyRequest } from '../../store/dostawcyRedux';
import { loadCategoriesRequest } from '../../store/categoriesRedux';
import { loadShippingMethodsRequest } from '../../store/shippingMethodsRedux';
import { loadEnnoblingsRequest } from '../../store/ennoblingsRedux';
import { loadTypesRequest } from '../../store/typesRedux';
//import { loadStockRequest } from '../../store/stocksRedux';
import { loadCennikiRequest } from '../../store/cennikiRedux';
import { loadUslugiRequest } from '../../store/uslugiRedux';
import { loadPeriodsRequest } from '../../store/periodsRedux';
import { loadMaterialsRequest } from '../../store/materialsRedux';
import { loadSpotRequest } from '../../store/spotRedux';
import { loadRodzajeWadRequest } from '../../store/rodzajeWadRedux';
import { loadInvoicesRequest } from '../../store/invoicesRedux';
import { loadDokumentyRequest } from '../../store/dokumentyRedux';

const Loader = ({loadActivityStream, loadCategories, loadUsers, loadInvoices, loadCoins, loadCapsules, loadDesigns, 
    loadProjects, loadStatuses, loadProceses, loadDepartments, loadClients, loadShippingMethods, loadTypes, loadStock,
    loadEnnoblings, loadCenniki, loadDostawcy, loadUslugi, loadPeriods, loadMaterials, loadMaszyny, loadSpot, loadRodzajeWad, loadDokumenty}) => {

    const load = () => {

        const user = getCurrentUser();
        if(user){
            (isPM() || isDesigner() || isEnnobler() || isAdmin()) && loadDokumenty();
            (isPM() || isDesigner() || isEnnobler() || isAdmin()) && loadCoins();
            (isPM() || isDesigner() || isEnnobler() || isAdmin()) && loadCapsules();
            (isPM() || isDesigner() || isEnnobler() || isAdmin()) && loadDesigns();
            (isPM() || isDesigner() || isEnnobler() || isAdmin()) && loadProjects();
            (isPM() || isDesigner() || isEnnobler() || isAdmin()) && loadEnnoblings();
            (isPM() || isDesigner() || isEnnobler() || isAdmin()) && loadProceses();
            (isPM() || isDesigner() || isEnnobler() || isAdmin()) && loadClients();
            (isPM() || isDesigner() || isEnnobler() || isAdmin()) && loadDostawcy();
            (isPM() || isDesigner() || isEnnobler() || isAdmin()) && loadUslugi();
            (isPM() || isDesigner() || isEnnobler() || isAdmin()) && loadShippingMethods();
            //(isPM() || isDesigner() || isEnnobler() || isAdmin()) && loadStock();
            loadActivityStream(user.id);
            (isPM() || isDesigner() || isAdmin()) && loadInvoices(),
            //Admin Data
            (isPM() || isDesigner() || isEnnobler() || isAdmin() || isIT() || isControling()) && loadUsers();    
            (isPM() || isDesigner() || isEnnobler() || isAdmin() || isIT()) && loadStatuses();    
            (isPM() || isDesigner() || isEnnobler() || isAdmin() || isIT()) && loadDepartments();    
            (isPM() || isDesigner() || isEnnobler() || isAdmin() || isIT()) && loadCategories();    
            (isPM() || isDesigner() || isEnnobler() || isAdmin() || isIT()) && loadTypes();
            (isPM() || isAdmin()) && loadCenniki();
            (isAdmin() || isControling()) && loadPeriods();
            (isPM() || isDesigner() || isEnnobler() || isAdmin()) && loadMaterials();
            (isPM() || isDesigner() || isEnnobler() || isAdmin()) && loadMaszyny();
            loadSpot();
            (isPM() || isDesigner() || isEnnobler() || isAdmin()) && loadRodzajeWad();
        }      
    }

    load();
    return ( <div>

    </div> );
}
 
const mapDispatchToProps = dispatch => ({
    loadUsers: () => dispatch(loadUsersRequest()),
    loadCoins: () => dispatch(loadCoinsRequest()),
    loadCapsules: () => dispatch(loadKapsleRequest()),
    loadCenniki: () => dispatch(loadCennikiRequest()),
    loadDesigns: () => dispatch(loadDesignsRequest()),
    updateDesigns: id => dispatch(loadRecentDesignsRequest(id)),
    loadProjects: () => dispatch(loadProjectsRequest()),
    updateProjects: id => dispatch(loadRecentProjectsRequest(id)),
    loadStatuses: () => dispatch(loadStatusesRequest()),
    loadProceses: () => dispatch(loadProcesesRequest()),
    loadEnnoblings: () => dispatch(loadEnnoblingsRequest()),
    loadDepartments: () => dispatch(loadDepartmentsRequest()),
    loadClients: () => dispatch(loadClientsRequest()),
    loadDostawcy: () => dispatch(loadDostawcyRequest()),
    loadUslugi: () => dispatch(loadUslugiRequest()),
    loadCategories: () => dispatch(loadCategoriesRequest()),
    loadShippingMethods: () => dispatch(loadShippingMethodsRequest()),
    loadTypes: () => dispatch(loadTypesRequest()),
    loadStock: () => dispatch(loadStockRequest()),
    loadPeriods: () => dispatch(loadPeriodsRequest()),
    loadMaterials: () => dispatch(loadMaterialsRequest()),
    loadMaszyny: () => dispatch(loadMaszynyRequest()),
    loadSpot: () => dispatch(loadSpotRequest()),
    loadRodzajeWad: () => dispatch(loadRodzajeWadRequest()),
    loadActivityStream : id => dispatch(loadActivityStreamRequest(id)),
    loadInvoices : () => dispatch(loadInvoicesRequest()),
    loadDokumenty : () => dispatch(loadDokumentyRequest()),
    setRwd : mode => dispatch(setRwdMode(mode)),
  });
  
  const mapStateToProps = state => ({
  });
  
  const Container = connect(mapStateToProps, mapDispatchToProps)(Loader);
  
  export {Container as  Loader};

