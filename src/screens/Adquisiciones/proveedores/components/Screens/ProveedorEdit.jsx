import React,{ useState, useEffect} from "react";
import ProveedorImagen from '../../../../../components/Imagen/FormImagen'
import Mapas from "./ProveedorMapa";
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { inventarioActions }  from '../../../../../redux/actions/inventario'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import FormImgp from '../../../../../components/frms/FormImgp'
import Select from '../../../../../components/selects/Select'
import { _ciudades, tiposFiscal, tiposProveedor } from '../../../../../data/dataLoad'

const ProveedorEdit = () =>{
    const dispatch = useDispatch()  
    const { item, indicador } = useSelector(state => state.proveedor)   
   
   useEffect(() => {    
    return () => {
        dispatch({type:'proveedorReset'}) 
    };
   }, []);
  
   const handleChange = (e) =>{
    const { value, name } = e.target
    dispatch({type:'proveedorChange',name:name,value:value}) 
}
const handleChangePais = (e) =>{
    const { value, indice  } = e ? e : ''
    dispatch({type:'proveedorChange',name:'pais',value:value}) 
   /* let dat = ciudades.filter(d=>(d.indice === indice))
    setcitys(dat)   */
}
const submitHandle = event =>{
    event.preventDefault()    
    if(item.id){
     
        dispatch(inventarioActions.putUpdate('proveedorAdd','proveedores',item,'unit'))
    }else{
       
        dispatch(inventarioActions.postAdd('proveedorAdd','proveedores',item,'unit'))
    }
}

const handleChanges = (prp,val) =>{    
  dispatch({type:'proveedorChange',name:prp,value:val}) 
}

    return(
      <div className="justify-center items-center flex-1">
      <div className="border-b-2 h-8 flex flex-row pt-1 pl-2 text-sm text-gray-500 font-bold">       
      <Link to={"/admin/adquisiciones/proveedores/list"}>
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
                <FormImgp
                  item={item}
                  payload={"proveedor"}
                  payloads={"proveedores"}/>             
                </div> 
                  
            </div>     
            <div className="w-3/4 border rounded ml-1">  
                <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                    <span className='font-bold ml-1 text-gray-500 text-[10px]'>  
                       Datos Proveedor
                    </span>
                </div>
                <form onSubmit={submitHandle} className="rounded p-2 flex-col text-[10px] ">    
                            <div className='w-full flex p-2 rounded-md'>
                                <div className="w-3/4 flex-col mr-2">
                                    <label htmlFor="razonSocial" className="p-1 font-bold text-gray-500">Razon Social</label>
                                    <input
                                        type="text"
                                        onChange={(e)=>{ handleChange(e)}}                                                                   
                                        value={item.razonSocial}
                                        name="razonSocial"
                                        className="h-7 pt-2 pl-2 block w-full text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                                                   
                                </div>  
                                <div className="w-1/4 flex-col ml-2">
                                    <label htmlFor="codigo" className="p-1 font-bold text-gray-500">Código</label>
                                    <input
                                        type="text"
                                        onChange={(e)=>{ handleChange(e)}}                                                                   
                                        value={item.codigo}
                                        name="codigo"
                                        className="h-7 pt-2 pl-2 block w-full text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                                                   
                                </div>                                                          
                            </div>  

                            <div className='w-full flex p-2 rounded-md'>
                                <div className="w-1/4 flex-col">
                                    <label htmlFor="nit" className="p-1 font-bold text-gray-500">NIT</label>
                                    <input
                                        type="text"
                                        onChange={(e)=>{ handleChange(e)}}                                                                   
                                        value={item.nit}
                                        name="nit"
                                        className="h-7 pt-2 pl-2 block w-full text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                                                   
                                </div>

                                <div className="w-1/4 flex-col ml-2">
                                    <label htmlFor="tipoFiscal" className="p-1 font-bold text-gray-500">Tipo Fiscal </label>
                                    <Select
                                      options={tiposFiscal}
                                      option={item.tipoFiscal}                                    
                                      handleChange={handleChanges} 
                                      name={"tipoFiscal"}
                                      tipo={"local"}/>
                                </div>  
                                <div className="w-1/4 flex-col ml-2">
                                    <label htmlFor="tipoProveedor" className="p-1 font-bold text-gray-500">Tipo Proveedor </label>
                                    <Select
                                      options={tiposProveedor}
                                      option={item.tipoProveedor}                                    
                                      handleChange={handleChanges} 
                                      name={"tipoProveedor"}
                                      tipo={"local"}/>
                                </div>  
                                <div className="w-1/4 flex-col ml-2">
                                    <label htmlFor="ciudad" className="p-1 font-bold text-gray-500">Ciudad</label>
                                    <Select
                                      options={_ciudades}
                                      option={item.ciudad}                                    
                                      handleChange={handleChanges} 
                                      name={"ciudad"}
                                      tipo={"local"}/>
                                </div>  
                                                                           
                            </div>

                            <div className='w-full flex p-2 rounded-md'>
                                <div className="w-1/2 flex-col mr-2">
                                    <label htmlFor="direccion" className="p-1 font-bold text-gray-500">Dirección</label>
                                    <input
                                        type="text"
                                        onChange={(e)=>{ handleChange(e)}}                                                                   
                                        value={item.direccion}
                                        name="direccion"
                                        className="h-7 pt-2 pl-2 block w-full text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                                                   
                                </div>  
                                <div className="w-1/2 flex-col ml-2">
                                    <label htmlFor="email" className="p-1 font-bold text-gray-500">Email</label>
                                    <input
                                        type="email"
                                        onChange={(e)=>{ handleChange(e)}}                                                                   
                                        value={item.email}
                                        name="email"
                                        className="h-7 pt-2 pl-2 block w-full text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                                                   
                                </div>                                                          
                            </div> 
                            
                            <div className='w-full flex p-2 rounded-md'>
                                <div className="w-2/3 flex-col">
                                    <button
                                        type="submit"
                                        className='h-7 w-20 border bg-orange-400  hover:bg-orange-300 rounded-md'>                                    
                                        <span className='font-bold  text-gray-50'>{item.id ? "Actualizar": "Registrar"}</span>
                                    </button>
                                </div>                                                       
                            </div>
                    </form> 
                           
              </div>         
        </div>

            
  </div> 
    )
}

export default ProveedorEdit