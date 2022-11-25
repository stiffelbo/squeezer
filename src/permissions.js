//services
import {getCurrentUser} from './services/authService';

const user = getCurrentUser();

const id = user ? user.id : null;

export const technolog = [10, 31];

export const euroClientsIds = [10, 9, 31, 3, 57, 99];

export const isCurrentUserId = idUser => {
    return +idUser === +id;
}

//helper functions
const allowedUsers = arr => {    
    if(!id){
        return false;
    }
    const uid = parseInt(id);
    if(arr.indexOf(uid) > -1){
        return true;
    }else{
        return false;
    }  
}

// filtruje arr o indexy w comb -> taki filtr grzebieniowy
const combArray = (arr, comb = []) => {
    if(typeof arr === 'object'){
        const result = arr.filter((item, index) => {
            if(comb.indexOf(index) === -1){
                return true;
            }else{
                return false;
            }
        });
        return result;
    }else{
        return [];
    }
}

//ROLES
export const isSuper = () => {
    const res = allowedUsers([31]);
    return res;
}


export const isAdmin = () => {
    const res = allowedUsers([31, 43, 63, 45, 10]) || isSuper();
    return res;
}

export const isControling = () => {
    const res = allowedUsers([93, 31]) || isSuper();
    return res;
}

export const isManager = () => {
    const res = allowedUsers([31, 43]) || isSuper();
    return res;
}

export const isPM = () => {
    const res = allowedUsers([31, 43, 42, 52, 84, 56, 82, 46, 93, 63]) || isSuper();   
    return res;  
}

export const isDesigner = () => {
    const res = allowedUsers([91, 46, 4, 3]) || isSuper();   
    return res;  
}

export const isIT = () => {
    const dept = user ? +user.departmentID : 0;
    return +dept === 18 || isSuper();
}

export const isEnnobler = () => {
    const dept = user ? +user.departmentID : 0;
    return [1,2,3,5,6,10,11,12].includes(dept) || isSuper();
}

export const isUV = () => {
    const dept = user ? +user.departmentID : 0;
    return [5].includes(dept) || isSuper();
}

/********* ENTITIES ********/
//designs

export const accesDesignTabs = tabs => {
    if(isDesigner()){
        return combArray(tabs, [3]);
    }
    if(isPM()){
        return combArray(tabs, [4]);
    }
}

//projects
export const projectsDelete = () => {
    return allowedUsers([31, 43]);
}

//projects tabs
export const accessProjectTabs = tabs => {
    if(isPM() || isDesigner()){        
        return tabs;
    }else{
        return combArray(tabs, [2,3,4]);
    }
}

//users
export const usersAccess = () => {
    return allowedUsers([31, 93, 63, 43]);
}

export const canAddUser = () => {
    return allowedUsers([31, 43, 10, 63]);
}

//client
export const clientFileDelete = idUser => {
    if(+id === +idUser){
        return true;
    }else{
        return allowedUsers([31, 43]);
    }
}


export const canAddDiscountToPricelist = () => {
    return allowedUsers([31, 43]);
}
//shippings

export const shippingsDelete = () => {
    return allowedUsers([31, 43]);
}

export const shippingsFinish = idUser => {
    if(allowedUsers([31, 43]) || +id === +idUser){
        return true;
    }
    return false;
}

//shipping files

export const shippingFileDelete = idUser => {
    return allowedUsers([31, 43]);
}
//wady monet

export const canAddWady = () => {
    return allowedUsers([38, 8, 7, 6, 5]);
}

export const canAddWadyFile = () => {
    return allowedUsers([38, 8, 7, 6, 5]);
}


//It Assets

export const itAssetFileDelete = () =>{
    return allowedUsers([31]);
}
