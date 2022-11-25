//gnt 2022-07-21 10:08:40
        
import http from "./httpService";

import { apiUrl } from "../config.js";
const apiEndpoint = apiUrl + '/worklogs.php';


export function getAllWorklogs() {
    return http.get(apiEndpoint);
}

export function getWorklogById(id) {
    return http.get(`${apiEndpoint}?id=${id}`);
}

export function getUsersWorklog(id) {
    return http.get(`${apiEndpoint}?idUser=${id}`);
}

export function getRefIdRefWorklog(ref,id) {
    return http.get(`${apiEndpoint}?idRef=${id}&ref=${ref}`);
}

export function getRefIdRefUserWorklog(ref, id) {
    return http.get(`${apiEndpoint}?idRef=${id}&ref=${ref}&user=true`);
}

export function saveWorklog(data){
    return http.post(apiEndpoint, data);
}

export function updateWorklog(data){
    return http.post(apiEndpoint, data);
}

export function removeWorklog(id){
    return http.delete(`${apiEndpoint}?delete=${id}`);
}

export function updateField(field, value, id){
  if(id){
    const body = {
      id,
      field,
      'field_value' : value
    }
    return http.put(apiEndpoint, body);
    }
}
