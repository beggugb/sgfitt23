import React from 'react'
import PaqueteForm from '../Paquetes/component/PaqueteForm'
import PaqueteTable from '../Paquetes/component/PaqueteTable'

const Inicio = () => {
 return ( 
      <div className="h-500 w-full flex">         
         <div className="w-1/4 border flex-col">
            <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                <span className='font-bold ml-1 text-gray-500 text-[10px]'>  
                    Datos de Registro
                </span>
            </div>
            <div className='flex justify-center items-center p-1'>  
            <PaqueteForm/>
            </div>  
         </div>
         <div className="w-3/4 border flex-col ml-1">
            <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                <span className='font-bold ml-1 text-gray-500 text-[10px]'>  
                    Paquetes
                </span>
            </div> 
            <PaqueteTable/> 
         </div>                           
        
      </div>     
 );
}
 
export default Inicio;