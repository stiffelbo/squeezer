import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
//auth

// entities reducers
import activityStreamReducer from './activityStreamRedux';
import usersReducer from './usersRedux';
import coinsReducer from './coinsRedux';
import cennikiReducer from './cennikiRedux';
import designsReducer from './designsRedux';
import projectsReducer from './projectsRedux';
import statusesReducer from './statusesRedux';
import typesReducer from './typesRedux';
import departmentsReducer from './departmentsRedux';
import kapsleReducer from './kapsleRedux';
import procesesReducer from './procesesRedux';
import clientsReducer from './clientsRedux';
import categoriesReducer from './categoriesRedux';
import shippingsReducer from './shippingsRedux';
import shippingMethodsReducer from './shippingMethodsRedux';
import tabsReducer from './tabsRedux';
import tabReducer from './tabRedux';
import addNewReducer from './addNewRedux';
import stocksReducer from './stocksRedux';
import filtersReducer from './filtersRedux';
import ennoblingsReducer from './ennoblingsRedux';
import dostawcyReducer from './dostawcyRedux';
import uslugiReducer from './uslugiRedux';
import periodsReducer from './periodsRedux';
import materialsReducer from './materialsRedux';
import maszynyReducer from './maszynyRedux';
import rodzajeWadReducer from './rodzajeWadRedux';
import invoicesReducer from './invoicesRedux';
import coinsQualityReducer from './coinsQualityRedux';
import productionTasksReducer from './productionTasksRedux';
import itAssetsReducer from './itAssetsRedux';
import itAssetsShiftsReducer from './itAssetsShiftsRedux';
import dokumentyReducer from './dokumentyRedux';
import reklamacjeReducer from './reklamacjeRedux';
//aplication flow reducers
import {rwdReducer} from './rwdRedux';
import currenReducer from './currenRedux';
import navReducer from './navRedux';
import spotReducer from './spotRedux';

// define reducers
const reducers = {
  users: usersReducer,
  activityStream : activityStreamReducer,
  coins: coinsReducer,
  capsules: kapsleReducer,
  designs: designsReducer,
  projects: projectsReducer,
  statuses: statusesReducer,
  types: typesReducer,
  departments: departmentsReducer,
  proceses: procesesReducer,
  clients: clientsReducer,
  dostawcy: dostawcyReducer,
  uslugi: uslugiReducer,
  categories: categoriesReducer,
  shippings : shippingsReducer,
  shippingMethods : shippingMethodsReducer,
  tabs: tabsReducer,
  tab: tabReducer,
  addNew : addNewReducer, 
  stocks : stocksReducer,
  ennoblings : ennoblingsReducer,
  cenniki : cennikiReducer,
  filters : filtersReducer, 
  rwd : rwdReducer,
  curren : currenReducer,
  nav : navReducer, 
  periods: periodsReducer,
  materials: materialsReducer,
  maszyny: maszynyReducer,
  spot: spotReducer,
  rodzajeWad : rodzajeWadReducer,
  invoices : invoicesReducer,
  coinsQuality : coinsQualityReducer,
  productionTasks : productionTasksReducer,
  itAssets : itAssetsReducer,
  itAssetsShifts: itAssetsShiftsReducer,
  dokumenty: dokumentyReducer,
  reklamacje: reklamacjeReducer,
};

// combine reducers
const rootReducer = combineReducers(reducers);

const store = createStore(
  rootReducer,
  compose(
		applyMiddleware(thunk),
	)
);

export default store;