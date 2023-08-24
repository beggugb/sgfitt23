import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { crudActions } from '../../../../redux/actions/crud'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Switch from "react-switch";
import { PlusIcon } from "@heroicons/react/24/outline";




const PaqueteForm = () => {     
  const dispatch = useDispatch()  
  const {item} = useSelector(state => state.paquetes)   

  const onChange = event => {    
    const { name, value } = event.target         
     dispatch({type:'paquetesChange',props:name,value:value}) 
  }
  
  const changeHa = (checked) => {               
     dispatch({type:'paquetesChange',props:'diario',value:checked}) 
  }


 const changeAA = (checked) => {               
    dispatch({type:'paquetesChange',props:'enabled',value:checked}) 
 }
  
  const submitHandle = event => {       
      event.preventDefault()    
      if(item.id)
      {
        
        dispatch(crudActions.putList('paquetesAdd','paquetes',item))            
      }else{
        dispatch(crudActions.createList('paquetesAdd','paquetes',item))      
      }    
      dispatch({type:'paqueteReset'})
   }

   const clean = () => {               
    dispatch({type:'paqueteReset'})
 }



 return (  
    <div className="border w-full rounded"> 
        <div className='h-8 w-full border-b items-center justify-start flex bg-gray-50'>
            <button
            onClick={() => clean() }
            className='border w-14 h-7 bg-sky-400 rounded items-center ml-1 justify-center flex text-[10px] text-white font-bold'
            >
            Nuevo
            </button>            
        </div>
        <form onSubmit={submitHandle} className="rounded p-2 flex-col text-[10px] ">    
            <div className='w-full flex rounded-md mb-1'>
                <div className="w-full flex-col">
                    <label htmlFor="nombre" className="p-1 font-bold text-gray-500">Nombre</label>
                    <input
                    type="text"
                    onChange={(e)=>{ onChange(e)}}                                                                    
                    value={item.nombre}
                    name="nombre"
                    className="h-7 pt-2 pl-2 block w-full text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                               
                </div>                                                            
            </div> 
            <div className='w-full flex rounded-md mb-1'>
                <div className="w-full flex-col">
                    <label htmlFor="valor" className="p-1 font-bold text-gray-500">Valor (Bs.)</label>
                    <input
                    type="number"
                    onChange={(e)=>{ onChange(e)}}                                                                    
                    value={item.valor}
                    name="valor"
                    className="h-7 pt-2 pl-2 block w-full text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                               
                </div>                                                            
            </div>
            <div className='w-full flex rounded-md mb-1'>
                <div className="w-full flex-col">
                    <label htmlFor="enabled" className="p-1 font-bold text-gray-500">Habilitado </label>
                    <div className='flex'>
                    <Switch                         
                        onChange={ changeAA }  
                        checked={item.enabled} 
                        offColor="#ef4444"  
                        onColor="#4ade80"      
                        height={20}       
                        width={47}
                        onHandleColor="#737373"
                        offHandleColor="#737373"            
                        />
                    </div>    
                </div>                                                            
            </div>
            <div className='w-full flex rounded-md mb-1'>
                <div className="w-full flex-col">
                    <label htmlFor="meses" className="p-1 font-bold text-gray-500">Meses</label>
                    <input
                    type="number"
                    onChange={(e)=>{ onChange(e)}}                                                                    
                    value={item.meses}
                    step="0.01"
                    name="meses"
                    className="h-7 pt-2 pl-2 block w-full text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                               
                </div>                                                            
            </div>
            <div className='w-full flex rounded-md mb-1'>
                <div className="w-full flex-col">
                    <label htmlFor="diario" className="p-1 font-bold text-gray-500">Diario </label>
                    <div className='flex'>
                    <Switch                         
                        onChange={ changeHa }  
                        checked={item.diario} 
                        offColor="#ef4444"
                        onColor="#4ade80"      
                        height={20}       
                        width={47}
                        onHandleColor="#737373"
                        offHandleColor="#737373"              
                        />
                    </div>
                    
                </div>                                                            
            </div>

            <div className='w-full flex rounded-md'>
                <div className="w-full flex-col">
                <button 
                    type="submit"
                    className={item.id ? "h-8 border w-full mt-1 rounded bg-orange-400 hover:bg-sky-300 p-1 text-[11px] text-white" : "h-8 border w-full mt-1 rounded bg-sky-400 hover:bg-sky-300 p-1 text-[11px] text-white"}>
                    <FontAwesomeIcon icon={faSave} size="sm" />  
                    {' '} {item.id ? " Actualizar" : " Guardar"}
                </button>                    
                </div>                                                            
            </div>
        </form>                    
    </div>     
  );
}
 
export default PaqueteForm;