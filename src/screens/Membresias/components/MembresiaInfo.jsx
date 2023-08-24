import React from 'react'
import {api} from '../../../helpers/api'
import Moment from 'react-moment'
const MembresiaInfo = ({item}) => {       
 return (  
    <div className="w-full">
      <div className="justify-center flex text-center p-2">
       <img
          alt="cliente"
          className="h-36 w-36 rounded-full shadow-xl p-2 border"
          src={api + "/static/images/clientes/lg/" + item.filename}
        />              
      </div>
      <div className="mt-2 border border-gray-300 rounded-lg m-2 p-2 text-[10px] text-gray-600 shadow-md">
        <h5 className="font-bold">Nombres:</h5>                 
        <h5 className="ml-2 border-b truncate">{item.nombres}</h5>           
        <h5 className="font-bold">CI:</h5>                 
        <h5 className="ml-2 border-b">{item.ci}</h5>           
        <h5 className="font-bold">Fecha de registro:</h5>         
        <h5 className="ml-2 border-b"><Moment format="DD/MM/YYYY">{item.createdAt}</Moment></h5>
        <h5 className="font-bold">Dirección:</h5>         
        <h5 className="ml-2 border-b">{item.direccion}</h5>
        <h5 className="font-bold">País:</h5>         
        <h5 className="ml-2 border-b">{item.pais}</h5>
        <h5 className="font-bold">Tipo:</h5>         
        <h5 className="ml-2 border-b">{item.tipo}</h5>
        <h5 className="font-bold">Teléfono:</h5>         
        <h5 className="ml-2 border-b">{item.telefono || 'sin registro'}</h5>
      </div>         
    </div>     
        
        
     );
}
 
export default MembresiaInfo;