import configService from "../services/imagenService";
import {toastr} from 'react-redux-toastr'
export const imagenActions = {  
  uploadCliente,
  uploadArticulo
};

/*--------------------------------------------------------------------*/
function uploadArticulo(xredux, payload, data, datoId) {
  return (dispatch) => {    
    dispatch({type:"setLoading", state: true}) 
    configService._upImagen(payload, data, datoId)
      .then((response) => {       
        setTimeout(function(){
          toastr.success(payload, 'Imagen Cargada')
          dispatch({type:"setLoading", state: false})
        }, 1000); 
      })
      .catch((err) => {        
        dispatch({type:"setLoading", state: false})
      });
  };
}

/*--------------------------------------------------------------------*/
function uploadCliente(xredux, payload, data, datoId) {

  return (dispatch) => {   
    dispatch({type:"setLoading", state: true})     
    configService._upImagen(payload, data, datoId)
      .then((response) => {       
        setTimeout(function(){
          toastr.success(payload, 'Imagen Cargada')
          dispatch({type:"setLoading", state: false})
        }, 1000);   
      })
      .catch((err) => {        
        dispatch({type:"setLoading", state: false})
      });
  };
}
