import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom';
import { cajaActions } from '../../redux/actions/caja'
import CajasItemsTable from './components/CajasItemsTable'
import CajaDetalle from '../Cajas/components/CajaDetalle'
import CajasItemsForm from './components/CajasItemsForm'
import Moment from 'react-moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons";

function CajasItemsView({...props}) {     
  const dispatch = useDispatch()  
  const caja = useSelector(state => state.cajas.item)   
  let { cajaId } = useParams();   
  
  useEffect(() =>{            
    dispatch(cajaActions.getItemo('CAJAS_ITEMS_DATA','cajas',cajaId))     
    return () =>{            
      dispatch({type:'resetMembresia'}) 
      dispatch({type:'clientesResetItem'}) 
    };
  }, []);

    return (
    <div className="h-max p-1 border-2">
    <div className="border-b h-8 flex flex-row text-sm text-gray-500 font-bold">       
      <div className="w-3/5 flex">
        <Link to={"/admin/cajas"}>
          <div className="h-8 w-10 text-center rounded-l-md bg-sky-400 hover:bg-sky-300 pt-1">                        
            <FontAwesomeIcon icon={faArrowLeft} color="#fff" size="lg"/>
          </div>
        </Link>
      </div>
      <div className="w-2/5 pt-1 flex justify-around">
        <span className="w-1/2 pl-2 text-xs">Caja Nº : { caja.id } </span> 
        <span className="w-1/2 pl-2 text-xs">Fecha : <Moment format="DD-MM-YYYY">{ caja.registro }</Moment></span>
      </div>
    </div>

    <div className="flex flex-row">            
      <div className='h-500 w-1/4 p-1'>
        <CajasItemsForm/>
      </div>
      <div className='h-500 w-3/4 border-l p-1'>
       <CajaDetalle/>
       <CajasItemsTable/> 
      </div>
    </div>
  </div>     
 );  
}

export default CajasItemsView