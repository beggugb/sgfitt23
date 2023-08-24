import React from 'react'
import UsuarioTable from './components/UsuarioTable'
import UsuarioForm from './components/UsuarioForm'
import { useDispatch, useSelector } from 'react-redux'


const Inicio = () => {
    const dispatch = useDispatch()

    const handleReset = () =>{        
        dispatch({type:'usuarioReset'})
    }

    return ( 
        <div className="h-500 w-full flex">         
        <div className="w-1/4 border flex-col">
           <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
               <span className='font-bold ml-1 text-gray-500 text-[10px]'>  
                   Datos de Registro
               </span>
           </div>
           <div className='flex justify-center items-center p-2'>  
            <UsuarioForm/>
           </div>  
        </div>
        <div className="w-3/4 border flex-col ml-1">
           <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
               <span className='font-bold ml-1 text-gray-500 text-[10px]'>  
                   Usuarios
               </span>
           </div> 
           <UsuarioTable/>
        </div>                           
       
     </div>  
       
   );
}
 
export default Inicio;