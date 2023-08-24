import React,{useEffect, useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux'
import { crudActions } from '../../../redux/actions/crud'
import { _validateConfig, _itemCliente  } from '../../../data/models'
import { _ciudades, tipoGenero } from '../../../data/dataLoad'
import Select from '../../../components/selects/Select'
import FormImg from '../../../components/frms/FormImg'

const ClienteForm = ({setShowModal}) => {   
  const dispatch = useDispatch()  
  const { item, pagina , promp} = useSelector(state => state.cliente)  
  const [errors, seterrors] = useState({
    nombres:"",
    apellidos:"",
    direccion:"",
    telefono:"",
    nit:"",
    email:""
}); 

  const makeHttpRequestWithPage = (page,num) =>{        
    let iok={
        page:page,
        num:num, 
        nombres : promp,
        ci:'',
        nit:''
    }
    dispatch(crudActions.searchList('clientesData','clientes',iok))
  }

  
  useEffect(() =>{                
  return () =>{             
      dispatch({type:'clientesResetItem'})               
      makeHttpRequestWithPage(1,12)
    };
}, []);

const handleSubmit = event =>{    
    event.preventDefault();                         
    if(item.id){                            
        dispatch(crudActions.putUnit('clientes',item))
    }else{          
        dispatch(crudActions.createUnit('clienteAdd','clientes',item)) 
    }       
} 

const handleChanges = (e) =>{        
    const { name, value } = e.target        
    dispatch({type:'clienteChange',props:name,value:value})    
    let found = _itemCliente.find(it => it.label === name);   
        if(found){
            let nn = _validateConfig(found.type,value)
            seterrors({
                ...errors,
                [found.label]:nn
            })
        }           
}

const handleChange = (prp,val) =>{
    dispatch({type:'clienteChange',props:prp,value:val}) 
}
    
    return ( 
        <>
        <div className="justify-center items-center flex-1 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-5xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <button 
            className="w-7 h-7 bg-red-500 rounded-full m-1"
            onClick={() => setShowModal(false)}>
            <FontAwesomeIcon icon={faTimes} color="#fff" />
          </button>  
            {/*body*/}

            <div className="h-500 p-1 flex flex-row border-4">   
                <div className="w-1/3 border rounded flex-col">
                    <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                        <span className='font-bold ml-1 text-gray-500 text-[10px]'>  
                            Imagen
                        </span>
                    </div>
                    <div className='m-4 flex justify-center items-center p-2'>                        
                        <FormImg
                            item={item}
                            payload={"cliente"}
                            payloads={"clientes"}/>                        
                    </div>          
                </div>     
                <div className="w-2/3 border rounded ml-1">  
                    <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                        <span className='font-bold ml-1 text-gray-500 text-[10px]'>  
                            Datos de cliente
                        </span>
                    </div>  
                    <form onSubmit={handleSubmit} className="rounded p-2 flex-col text-[10px] ">    
                            <div className='w-full flex p-2 rounded-md'>
                                <div className="w-full flex-col">
                                    <label htmlFor="nombres" className="p-1 font-bold text-gray-500">Nombres</label>
                                    <input
                                        type="text"
                                        onChange={handleChanges}                                                                    
                                        value={item.nombres}
                                        name="nombres"
                                        className="h-7 pt-2 pl-2 block w-full text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                           
                                        {errors.nombres && <p className="pl-2 text-[10px] italic text-red-400">{errors.nombres}</p>}                        
                                </div>                                                            
                            </div>  
                            <div className='w-full flex p-2 rounded-md'>
                                <div className="w-1/3 flex-col">
                                    <label htmlFor="ci" className="p-1 font-bold text-gray-500">CI</label>
                                    <input
                                        type="text"
                                        onChange={handleChanges}                                                                    
                                        value={item.ci}
                                        name="ci"
                                        className="h-7 pt-2 pl-2 block w-full text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                                                   
                                </div> 
                                <div className="w-1/3 flex-col pl-1">
                                    <label htmlFor="nit" className="p-1 font-bold text-gray-500">Nit</label>
                                    <input
                                        type="text"
                                        onChange={handleChanges}                                    
                                        value={item.nit}
                                        name="nit"
                                        className="h-7 pt-2 pl-2 block w-full border text-[10px] text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>
                                    {errors.nit && <p className="italic text-red-400">{errors.nit}</p>} 
                                </div>    
                                <div className="w-1/3 flex-col pl-1">
                                    <label htmlFor="sexo" className="p-1 font-bold text-gray-500">Genero</label>
                                    <Select
                                        options={tipoGenero}
                                        option={item.sexo}                                    
                                        handleChange={handleChange} 
                                        name={"sexo"}
                                        tipo={"local"}/> 
                                </div>                          
                            </div> 
                            <div className='w-full flex p-2 rounded-md'>                                
                                <div className="w-1/3 flex-col pl-1">
                                    <label htmlFor="telefono" className="p-1 font-bold text-gray-500">Teléfono</label>
                                    <input
                                        type="text"
                                        onChange={handleChanges}                                    
                                        value={item.telefono}
                                        name="telefono"
                                        className="h-7 pt-2 pl-2 block w-full border text-[10px] text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                    
                                </div>
                                <div className="w-1/3 flex-col pl-1">
                                    <label htmlFor="celular" className="p-1 font-bold text-gray-500">Celular</label>
                                    <input
                                        type="text"
                                        onChange={handleChanges}                                    
                                        value={item.celular}
                                        name="celular"
                                        className="h-7 pt-2 pl-2 block w-full border text-[10px] text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                    
                                </div>                                  
                                <div className="w-1/3 flex-col pl-1">
                                    <label htmlFor="ciudad" className="p-1 font-bold text-gray-500">Ciudad</label>
                                    <Select
                                      options={_ciudades}
                                      option={item.ciudad}                                    
                                      handleChange={handleChange} 
                                      name={"ciudad"}
                                      tipo={"local"}/>
                                </div>                           
                            </div>

                            <div className='w-full flex p-2 rounded-md'>                                
                                <div className="w-1/2 flex-col pl-1">
                                    <label htmlFor="web" className="p-1 font-bold text-gray-500">Web</label>
                                    <input
                                        type="text"
                                        onChange={handleChanges}                                    
                                        value={item.web}
                                        name="web"
                                        className="h-7 pt-2 pl-2 block w-full border text-[10px] text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>
                                        {errors.web && <p className="italic text-red-400">{errors.web}</p>} 
                                    
                                </div> 
                                <div className="w-1/2 flex-col pl-1">
                                    <label htmlFor="email" className="p-1 font-bold text-gray-500">Email</label>
                                    <input
                                        type="email"
                                        onChange={handleChanges}                                    
                                        value={item.email}
                                        name="email"
                                        className="h-7 pt-2 pl-2 block w-full border text-[10px] text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>
                                        {errors.email && <p className="italic text-red-400">{errors.email}</p>} 
                                </div>                                                             
                            </div>
                            <div className='w-full flex p-2 rounded-md'>
                                <div className="w-full flex-col">
                                    <label htmlFor="direccion" className="p-1 font-bold text-gray-500">Dirección</label>
                                    <textarea
                                        type="text"
                                        onChange={handleChanges}                                                                    
                                        value={item.direccion}
                                        name="direccion"
                                        className="pt-2 pl-2 block w-full text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                           
                                        {errors.direccion && <p className="pl-2 text-[10px] italic text-red-400">{errors.direccion}</p>}                        
                                </div>                                                             
                            </div> 

                          
                            <div className='w-full flex p-2 rounded-md'>
                                <div className="w-2/3 flex-col">
                                    <button
                                        type="submit"
                                        className={errors.nombres === "" && errors.ci === "" ? 'h-7 w-20 border bg-orange-400  hover:bg-orange-300 rounded-md':'h-7 w-20 border bg-orange-300  hover:bg-orange-300 rounded-md'}>                                    
                                        <span className='font-bold  text-gray-50'>{item.id ? "Actualizar": "Registrar"}</span>
                                    </button>
                                </div>                                                       
                            </div>
                    </form>                
                  </div>         


                   
            </div>
            {/*footer*/}                       
            </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
      </>
     );
}
 
export default ClienteForm;



                        
