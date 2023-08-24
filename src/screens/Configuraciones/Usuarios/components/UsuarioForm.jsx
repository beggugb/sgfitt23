import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { crudActions } from '../../../../redux/actions/crud'
import { roles } from '../../../../helpers/data'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Switch from "react-switch";
import Select from '../../../../components/selects/SelectData'

const UsuarioForm = () => {     
  const dispatch = useDispatch()  
  const {item} = useSelector(state => state.usuario)   
  const [password, setpassword] = useState('');

  const onChange = event => {    
    const { name, value } = event.target      
     dispatch({type:'changeUsuario',props:name,value:value}) 
  }
  const onChanges = prop => event => {    
    const { value } = event ? event : ''     
    dispatch({type:'changeUsuario',props:prop,value:value}) 
  }
  
 
  
  const submitHandle = event => {       
      event.preventDefault()    
      if(item.id)
      {
        
        dispatch(crudActions.putList('usuariosData','usuarios',item))            
      }else{
        dispatch(crudActions.createList('usuariosData','usuarios',item))      
      }    
      dispatch({type:'usuarioReset'})
      
  }
  const submitHandles = event => {       
    event.preventDefault()    
    let nn ={
      id: item.id,
      usuarioId: item.id,
      password : password,
      bandera: 'pin'
    }    
    if(item.id)
    {      
      dispatch(crudActions.putList('usuariosData','usuarios',nn))            
    }  
    setpassword('')
    dispatch({type:'usuarioReset'})

    
}

  const changeHa = (checked) => {               
    dispatch({type:'changeUsuario',props:'enabled',value:checked}) 
  }

  const clean = () => {               
    dispatch({type:'usuarioReset'})
  }

 
  const onChangesd = (val) => {               
    const { value } = val
    dispatch({type:'changeUsuario',props:'rolId',value:value}) 
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
              <label htmlFor="rolId" className="p-1 font-bold text-gray-500">Rol</label>
               <Select
                options={roles}
                option={item.rolId}                                    
                handleChange={onChangesd} 
                name={"rolId"}
                tipo={"valor"}/> 
          </div>                                                            
      </div>
      <div className='w-full flex rounded-md mb-1'>
          <div className="w-full flex-col">
              <label htmlFor="enabled" className="p-1 font-bold text-gray-500">Habilitado </label>
              <div className='flex'>
              <Switch                         
                  onChange={ changeHa }  
                  checked={item.enabled || false} 
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
              <label htmlFor="username" className="p-1 font-bold text-gray-500">Username</label>
              <input
              type="text"
              onChange={(e)=>{ onChange(e)}}                                                                    
              value={item.username}              
              name="username"
              className="h-7 pt-2 pl-2 block w-full text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                               
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
  { item.id &&
  <form onSubmit={submitHandles} className="rounded p-2 flex-col text-[10px] ">    
      <div className='w-full flex rounded-md mb-1'>
          <div className="w-full flex-col">
              <label htmlFor="password" className="p-1 font-bold text-gray-500">Password</label>
              <input
              type="password"
              onChange={(e)=>{ setpassword(e.target.value) }}                                                                   
              value={password}              
              name="password"
              className="h-7 pt-2 pl-2 block w-full text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                               
          </div>                                                            
      </div>
     

      <div className='w-full flex rounded-md'>
          <div className="w-full flex-col">
          <button 
              type="submit"
              className="h-8 border w-full mt-1 rounded bg-sky-400 hover:bg-sky-300 p-1 text-[11px] text-white">
              <FontAwesomeIcon icon={faSave} size="sm" />  
              Actualizar password
          </button>                    
          </div>                                                            
      </div>
  </form>    }              
</div> 
        
     );
}
 
export default UsuarioForm;
