import React,{ useEffect} from "react";
import FormProducto from "../Forms/FormProducto";
import { Link } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import FormImagen from '../../../../../components/Imagen/FormImagen'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { inventarioActions }  from '../../../../../redux/actions/inventario'
import QRCode from "qrcode.react";
import Barcode from "react-barcode"
import Switch from 'react-switch'
import SelectData from '../../../../../components/selects/SelectDataRedux'
import FormImg from '../../../../../components/frms/FormImgs'

const ProductoEdit = () =>{
    const dispatch = useDispatch() 
    const { item } = useSelector(state => state.producto)   
    const categorias = useSelector(state => state.categoria.items)
    const marcas = useSelector(state => state.marca.items)
    const modelos = useSelector(state => state.modelo.items)
    const unidades = useSelector(state => state.unidad.items)
    const origenes = useSelector(state => state.origen.items)
    const industrias = useSelector(state => state.industria.items)
    const volumenes = useSelector(state => state.volumen.items)
    const tipos = useSelector(state => state.tipo.items)
    
  


   useEffect(() => {    
    dispatch(inventarioActions.getItems('categoriasLista','categorias'))
    dispatch(inventarioActions.getItems('marcasLista','marcas'))
    dispatch(inventarioActions.getItems('modelosLista','modelos'))    
    dispatch(inventarioActions.getItems('origenesLista','origenes')) 
    dispatch(inventarioActions.getItems('unidadesLista','unidades')) 
    dispatch(inventarioActions.getItems('industriasLista','industrias')) 
    dispatch(inventarioActions.getItems('volumenesLista','volumenes')) 
    dispatch(inventarioActions.getItems('tiposLista','tipos')) 
    return () => {
        dispatch({type:'productoReset'}) 
    };
   }, []);


   const handleChange = (e) =>{
    const { value, name } = e.target        
    dispatch({type:'productoChange',name:name,value:value}) 
  }

  const changeSwitch = (checked,name) => {      
    dispatch({type:'productoChange',name:name,value:checked})     
  }
  
  const submitHandle = event =>{
      event.preventDefault()    
    if(item.id){            
        dispatch(inventarioActions.putUpdate('productoAdd','productos',item,'unit'))
    }else{        
        dispatch(inventarioActions.postAdd('productoAdd','productos',item,'unit'))
    }
  }
  
  const handleChanges = (vale,name,redx) =>{
    const { label, value } = vale
    dispatch({type:redx,name:name,value:value})  
  }
  const handleDelete = (name,redx) =>{    
    dispatch({type:redx,name:name,value:0})  
  }

    return(
        <div className="justify-center items-center flex-1">
          <div className="border-b-2 h-8 flex flex-row pt-1 pl-2 text-sm text-gray-500 font-bold">       
            <Link to={"/admin/inventario/productos/list"}>
            <div className="h-5 w-10 text-center rounded-l-md bg-sky-400 hover:bg-sky-300 mr-1">                        
              <FontAwesomeIcon icon={faArrowLeft} color="#fff" size="sm"/> 
            </div>
            </Link>
              <span className="pl-2 text-xs">Edición de producto</span>
          </div>

          <div className="h-500 p-1 flex flex-row border">   
                <div className="w-1/3 border rounded flex-col">
                    <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                        <span className='font-bold ml-1 text-gray-500 text-[10px]'>  
                            Imagen
                        </span>
                    </div>
                    <div className='m-4 flex justify-center items-center p-2 border-2'>                        
                        <FormImg
                            item={item}
                            payload={"articulo"}
                            payloads={"articulos"}/>                      
                    </div> 
                      
                </div>     
                <div className="w-2/3 border rounded ml-1">  
                    <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                        <span className='font-bold ml-1 text-gray-500 text-[10px]'>  
                            Datos de producto
                        </span>
                    </div>  
                   
                    <form onSubmit={submitHandle} className="rounded p-2 flex-col text-[10px] ">    
                          <div className='w-full flex p-2 rounded-md'>
                                <div className="w-4/6 flex-col mr-2">
                                    <label htmlFor="codigo" className="p-1 font-bold text-gray-500">Código</label>
                                    <input
                                        type="text"
                                        onChange={(e) => handleChange(e)}                                                                    
                                        value={item.codigo}
                                        name="codigo"
                                        className="h-7 pt-2 pl-2 block w-full text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                                                                         
                                </div>                                                            
                                <div className="w-2/6 flex-col mr-2">
                                    <label htmlFor="estado" className="p-1 font-bold text-gray-500">Estado</label>
                                    <div className="h-7 border pl-2 items-center flex">
                                    <Switch                                               
                                      onChange={ (e) =>{ changeSwitch(e,'estado')}}    
                                      checked={item.estado} 
                                      height={20}
                                      width={48}
                                      borderRadius={20}
                                      onColor="#86d3ff"
                                      onHandleColor="#2693e6"
                                      offHandleColor="#c1c1c1"
                                    />
                                    </div>
                                </div>                                                            
                                <div className="w-2/6 flex-col">
                                    <label htmlFor="oferta" className="p-1 font-bold text-gray-500">Oferta</label>
                                    <div className="h-7 border pl-2 items-center flex">
                                    <Switch                                               
                                      onChange={ (e) =>{ changeSwitch(e,'inOferta')}}  
                                      checked={item.inOferta}  
                                      height={20}
                                      width={48}
                                      borderRadius={20}
                                      onColor="#86d3ff"
                                      onHandleColor="#2693e6"
                                      offHandleColor="#c1c1c1"
                                    />
                                    </div>
                                </div>                                                            
                            </div>   

                            <div className='w-full flex p-2 rounded-md'>
                                <div className="w-4/6 flex-col mr-2">
                                    <label htmlFor="nombre" className="p-1 font-bold text-gray-500">Nombre</label>
                                    <input
                                        type="text"
                                        onChange={(e) => handleChange(e)}                                                                    
                                        value={item.nombre}
                                        name="nombre"
                                        className="h-7 pt-2 pl-2 block w-full text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                                                                         
                                </div>                                                            
                                <div className="w-2/6 flex-col mr-2">
                                    <label htmlFor="precioVenta" className="p-1 font-bold text-gray-500">Precio Venta</label>
                                    <input
                                        type="number"
                                        onChange={(e) => handleChange(e)}                                                                    
                                        value={item.precioVenta}
                                        name="precioVenta"
                                        className="h-7 pt-2 pl-2 block w-full text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                                                                         
                                   
                                </div>                                                            
                                <div className="w-2/6 flex-col">
                                    <label htmlFor="precioCompra" className="p-1 font-bold text-gray-500">Precio Compra</label>
                                    <input
                                        type="number"
                                        onChange={(e) => handleChange(e)}                                                                    
                                        value={item.precioCompra}
                                        readOnly={true}
                                        name="precioCompra"
                                        className="h-7 pt-2 pl-2 block w-full bg-gray-100 text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                                                                         
                                </div>                                                            
                            </div>

                            <div className='w-full flex p-2 rounded-md'>                                                                                          
                                <div className="w-1/3 flex-col mr-2">                                    
                                    <label htmlFor='categoriaId' className='w-1/3 pl-1'> Categoría </label>                 
                                    <div className='w-full flex'>
                                        <SelectData
                                            options={categorias}
                                            option={item.categoriaId}
                                            handleChange={handleChanges}   
                                            handleDelete={handleDelete}                                                                                              
                                            name={"categoriaId"}
                                            redux={"productoChange"}
                                        />          
                                    </div>     
                                </div>                                                            
                                <div className="w-1/3 flex-col mr-2 ">                                    
                                    <label htmlFor='marcaId' className='w-1/3 pl-1'> Marcas </label>                 
                                    <div className='w-full flex'>
                                        <SelectData
                                            options={marcas}
                                            option={item.marcaId}
                                            handleChange={handleChanges}   
                                            handleDelete={handleDelete}                                                                                              
                                            name={"marcaId"}
                                            redux={"productoChange"}
                                        />      
                                    </div>     
                                </div>
                                <div className="w-1/3 flex-col">                                    
                                    <label htmlFor='marcaId' className='w-1/3 pl-1'> Modelos </label>                 
                                    <div className='w-full flex'>
                                        <SelectData
                                            options={modelos}
                                            option={item.modeloId}
                                            handleChange={handleChanges}   
                                            handleDelete={handleDelete}                                                                                              
                                            name={"modeloId"}
                                            redux={"productoChange"}
                                        />      
                                    </div>     
                                </div>                                                            
                            </div>

                            <div className='w-full flex p-2 rounded-md'>                                                                                          
                                <div className="w-1/3 flex-col mr-2">                                    
                                    <label htmlFor='origenId' className='w-1/3 pl-1'> Origen </label>                 
                                    <div className='w-full flex'>
                                        <SelectData
                                            options={origenes}
                                            option={item.origenId}
                                            handleChange={handleChanges}   
                                            handleDelete={handleDelete}                                                                                              
                                            name={"origenId"}
                                            redux={"productoChange"}
                                        />          
                                    </div>     
                                </div>                                                            
                                <div className="w-1/3 flex-col mr-2 ">                                    
                                    <label htmlFor='unidadId' className='w-1/3 pl-1'> Unidad </label>                 
                                    <div className='w-full flex'>
                                        <SelectData
                                            options={unidades}
                                            option={item.unidadId}
                                            handleChange={handleChanges}   
                                            handleDelete={handleDelete}                                                                                              
                                            name={"unidadId"}
                                            redux={"productoChange"}
                                        />      
                                    </div>     
                                </div>
                                <div className="w-1/3 flex-col">                                    
                                    <label htmlFor='industriaId' className='w-1/3 pl-1'> Industria </label>                 
                                    <div className='w-full flex'>
                                        <SelectData
                                            options={industrias}
                                            option={item.industriaId}
                                            handleChange={handleChanges}   
                                            handleDelete={handleDelete}                                                                                              
                                            name={"industriaId"}
                                            redux={"productoChange"}
                                        />      
                                    </div>     
                                </div> 
                            </div>

                            <div className='w-full flex p-2 rounded-md'>                                                                                          
                                <div className="w-1/3 flex-col mr-2">                                    
                                    <label htmlFor='volumenId' className='w-1/3 pl-1'> Volumen </label>                 
                                    <div className='w-full flex'>
                                        <SelectData
                                            options={volumenes}
                                            option={item.volumenId}
                                            handleChange={handleChanges}   
                                            handleDelete={handleDelete}                                                                                              
                                            name={"volumenId"}
                                            redux={"productoChange"}
                                        />          
                                    </div>     
                                </div>                                                            
                                <div className="w-1/3 flex-col mr-2 ">                                    
                                    <label htmlFor='tipoId' className='w-1/3 pl-1'> Tipo </label>                 
                                    <div className='w-full flex'>
                                        <SelectData
                                            options={tipos}
                                            option={item.tipoId}
                                            handleChange={handleChanges}   
                                            handleDelete={handleDelete}                                                                                              
                                            name={"tipoId"}
                                            redux={"productoChange"}
                                        />      
                                    </div>     
                                </div> 
                                <div className="w-1/3 flex justify-end">                                    
                                    <button
                                        className="mt-3 ml-1 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="submit"> {item.id ? "Actualizar":"Registrar"}
                                    </button>
                                </div>                                
                            </div>

                    </form> 
                    { item.id &&
                        <div className="h-20 flex">                            
                            <div className="w-4/6 flex border justify-center">
                                <Barcode value={item.codigo || 0 } width={1.7} height={40} fontSize={12} />
                            </div>
                            <div className="w-2/6 flex border justify-center items-center">
                                <QRCode value={item.codigo} style={{ width: 60, height: 60, padding:2, border: 'solid 1px #c1c1c1', marginRight: 5 }}/>
                            </div>
                        </div>                
                    }                    
                  </div>         
            </div>

                
      </div> 
    )
}

export default ProductoEdit