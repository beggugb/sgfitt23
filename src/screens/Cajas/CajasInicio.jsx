import React, {useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../redux/actions/crud'
import CajasTable from './components/CajasTable'

import CajaView from './components/CajaView'
import {toastr} from 'react-redux-toastr'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave  } from "@fortawesome/free-solid-svg-icons";

const CajasInicio = () => {
    const dispatch = useDispatch()    
    const [parametro, setparametro] = useState('');
    const [view, setview] = useState(false);
    const { item}= useSelector(state => state.cajas)
    
    let us = JSON.parse(localStorage.getItem('@usuarioFitt'))

   
  
    const submitHandle = event => {       
        event.preventDefault()    
        if(parseInt(parametro) > -1)
        {
            let dat = {
                montoInicial : parseInt(parametro),
                estado : false,
                montoEgreso : 0,
                montoFinal : parseInt(parametro),
                montoIngreso : 0,
                usuarioId : us.id        
            }
        
            dispatch(crudActions.createList('CAJAS_DATA','cajas',dat))          
            setparametro('')
        }else{
            toastr.warning("Error", 'Debe ingresar un valor')
        }
        
          
     }

    const viewModal = (it) =>{        
        if(it){
            dispatch(crudActions.cajaItems('cajas',it))
            setview(true)
          } 
    }

    const closeHandler = (pky) => {     
        let dato = pky
        dato.usuarioId = us.id       
        dato.estado = true
        dispatch(crudActions.putList('CAJAS_DATA','cajas',dato))            
     }

    return ( 

        <div className="h-550 border p-1">    
        
        <div className="h-10 flex border bg-white gray-50 items-center">
            <div className='w-2/6 flex pl-2 items-center text-[10px] text-gray-500 font-bold'>
            Gestion de Cajas
            </div>
            <div className='w-3/6 flex'>
             
            </div>            
            <div className='w-2/6 flex mr-1'>
                <div className="w-4/5">                        
                <input 
                type="number" 
                name="parametro" 
                value={parametro} 
                onChange={(e) => setparametro(e.target.value)} 
                className="w-full h-7 focus:border-gray-400 block shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                </div>
                <div className="w-1/5">                        
                <button 
                    type="submit"
                    onClick={(e)=>submitHandle(e)}                      
                    className="h-7 w-8 ml-2 bg-sky-500 text-white rounded-md">
                    <FontAwesomeIcon icon={faSave} />
                </button>
                </div>
            </div>
        </div>
        
        <CajasTable              
            viewModal={viewModal}
            closeHandler={closeHandler}/>
        
        <CajaView view={view} setview={setview}/>
      
      </div>      
     
     );
}
 
export default CajasInicio;