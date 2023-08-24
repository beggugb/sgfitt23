import { api } from "../../helpers/api";
import axios from 'axios'

const _upImagen = async (endpoint, dato, pky) => {      
    const response = await axios
    .put(api   + `/files/${endpoint}/item/${pky}`, dato);    
    return response.data.result     
};
const configService = {                  
  _upImagen
};
  
export default configService; 

/*
function uploadCliente(payload, dato, datoId) {
  const requestOptions = {
    method: "PUT",
    body: dato,
  };
  return fetch(
    `${api}/${payload}/cliente/item/${datoId}`,
    requestOptions
  ).then(handleResponse);
}


}
*/