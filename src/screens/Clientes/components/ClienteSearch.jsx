import React from 'react'

import { crudActions } from '../../../redux/actions/crud'
import { useSelector, useDispatch } from 'react-redux'
import { MagnifyingGlassIcon, XMarkIcon, PlusIcon, TableCellsIcon, IdentificationIcon } from "@heroicons/react/24/outline";




const ClienteSearch = ({estado, setEstado, setShowModal}) => {  
    const dispatch = useDispatch() 
    const { promp }= useSelector(state => state.cliente)
    
    const cleanSearch = () =>{              
        let iok={
          nombres : '',
          ci:'',
          nit:'',
          page:1,
          num:12
        }
        dispatch(crudActions.searchList('clientesData','clientes',iok))
        dispatch({type:'setPromp',value:''}) 
      }
            
      const submitHandle = event =>{
        event.preventDefault() 
        let iok={
          nombres : promp,
          ci:'',
          nit:'',
          page:1,
          num:12
        }
        dispatch(crudActions.searchList('clientesData','clientes',iok))        
      }   
      const submitHandles = () =>{        
        let iok={
          nombres : promp,
          ci:'',
          nit:'',
          page:1,
          num:12
        }
        dispatch(crudActions.searchList('clientesData','clientes',iok))        
      } 

      const setParametro = (e) =>{
     
        dispatch({type:'setPromp',value:e}) 
      }
     
    return ( 
        <div className="h-10 flex border bg-white gray-50 items-center">
          <div className='w-2/6 flex pl-2 items-center'>
              <button 
                    className="text-xs font-bold h-6 w-12 bg-sky-500 items-center flex justify-center rounded text-white hover:bg-white hover:text-sky-500 hover:border-sky-500 hover:border"
                    onClick={() =>setShowModal(true)}>
                    <PlusIcon className="h-5 w-5 text-gray-50" />
              </button> 
          </div>
          <div className='border w-1/6 flex'>
                <button
                  onClick={()=>setEstado(true)}
                  className={estado ? "w-2/4 text-center text-white bg-sky-500 items-center flex justify-center" : "w-2/4 text-center text-stone-400 items-center justify-center flex"}>
                  <TableCellsIcon className={estado ? "h-5 w-5 text-gray-50" : "h-6 w-6 text-gray-500"} />               
                </button>
                <button 
                  onClick={()=>setEstado(false)}
                  className={estado ? "w-2/4 text-center text-stone-400 items-center flex justify-center" : "w-2/4 text-center text-white bg-sky-500 items-center justify-center flex"}>
                  <IdentificationIcon className={estado ? "h-5 w-5 text-gray-500" : "h-6 w-6 text-gray-50"} />               
                </button>
          </div>
          <div className=' w-1/6 flex justify-end mr-1'>
                { promp &&                  
                  <div                   
                  onClick={() => cleanSearch()}
                  className="flex h-7 text-[10px] rounded p-1 items-center"
                  >
                  <XMarkIcon className="h-5 w-5 text-red-500" />
                  <span className="ml-4">{promp}</span>
                  </div>                                
                }
          </div>
          <div className='w-2/6 flex mr-1'>
              <form  onSubmit={ submitHandle} className="w-full">                                        
                <input 
                  type="text" 
                  name="parametro" 
                  value={promp} 
                  onChange={(e) => setParametro(e.target.value)} 
                  className="w-full h-7 focus:border-gray-400 block shadow-sm sm:text-[10px] border-gray-300 rounded-md"/>                                                                                      
                </form> 
                <button 
                  onClick={()=>submitHandles()}                      
                  className="h-7 w-7 border z-10 -ml-10 border-transparent shadow-sm text-[10px] font-medium rounded-full text-gray-700">                  
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                </button> 
          </div>
        </div>
     );
}
 
export default ClienteSearch;



                        
