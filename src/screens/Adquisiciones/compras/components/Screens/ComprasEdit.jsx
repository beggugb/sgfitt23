import React,{ useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { inventarioActions }  from '../../../../../redux/actions/inventario'
import { Link } from 'react-router-dom'
import FormCompra from '../Forms/FormCompra'
import InputSearch from '../Inputs/InputSearch'
import ProductosLista from '../../../compras/components/Lists/ProductosLista'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const ComprasEdit = () =>{
    const dispatch = useDispatch()  
    const { item, items, indicador } = useSelector(state => state.compra)     
    
   const handleChange = (e) =>{
        const { value, name } = e.target        
        dispatch({type:'compraChange',name:name,value:value}) 
   }
 
  

   const submitHandle = event =>{
    event.preventDefault()        
    const dato ={
        item: item,
        items: items
    }
    dispatch(inventarioActions.putUpdates('compraAdd','compras',dato,indicador,'unit'))    
   } 
   
   useEffect(() => {    
    return () => {
        dispatch({type:'compraReset'}) 
    };
   }, []);

   
    return(
      <div className="justify-center items-center flex-1">
      <div className="border-b-2 h-8 flex flex-row pt-1 pl-2 text-sm text-gray-500 font-bold">       
      <Link to={"/admin/adquisiciones/compras/list"}>
        <div className="h-5 w-10 text-center rounded-l-md bg-sky-400 hover:bg-sky-300 mr-1">                        
          <FontAwesomeIcon icon={faArrowLeft} color="#fff" size="sm"/> 
        </div>
        </Link>
          <span className="pl-2 text-xs">Edición de compra</span>
      </div>

      <div className="h-500 p-1 flex flex-row border">   
            <div className="w-1/4 border rounded flex-col">
                <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                    <span className='font-bold ml-1 text-gray-500 text-[10px]'>  
                       Datos de Compra
                    </span>
                </div>
                <div className='m-1 flex justify-center items-center p-2 border-2'>                        
                <FormCompra
                    handleChange={handleChange}                
                    item={item}     
                    submitHandle={submitHandle}     
                />                 
                </div> 
                  
            </div>     
            <div className="w-3/4 border rounded ml-1">  
                <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                    <span className='font-bold ml-1 text-gray-500 text-[10px]'>  
                        Productos
                    </span>
                </div>
                <div className='h-10 border-b bg-gray-50 flex items-center'>
                  <InputSearch/>
                </div> 

                <div className='w-full flex items-center'>
                <ProductosLista />
                </div>           
              </div>         
        </div>

            
  </div> 
    )
}

export default ComprasEdit