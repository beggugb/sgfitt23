import React,{useEffect} from 'react'
import Pagination from '../../../../components/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { DocumentTextIcon, PencilIcon, TrashIcon, TagIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { crudActions} from '../../../../redux/actions/crud'

const UsuarioTable = () => {  
    const dispatch = useDispatch()     
    const { data,total,pagina,paginas } = useSelector(state => state.usuario)  


    const makeHttpRequestWithPage = (page, num) =>{        
        dispatch(crudActions.getData('usuariosData','usuarios',page, num,'nombre','ASC'))    
    }
    const itemHandler = (pky) =>{
        dispatch(crudActions.getItem('usuarioItem','usuarios','unit',pky))        
    }

   /* const itemHandlers = (pky) =>{
        dispatch(crudActions.getItem('usuarioItem','usuarios','unit',pky))
    }*/

    useEffect(() =>{        
        makeHttpRequestWithPage(1,12);    
         return () =>{                                
            dispatch({type:'paquetesReset'})
        };
      }, []);


    return (  
        <>     
        <div className="flex-1 mx-auto border p-1 mt-1 ml-1 mr-1">
          <table className="border-collapse text-[10px] w-full">
                <thead>
                    <tr>                    
                    <th className="w-5/12 border border-slate-300 bg-gray-200 ">Nombres</th>
                    <th className="w-3/12 border border-slate-300 bg-gray-200 ">Username</th>                    
                    <th className="w-2/12 border border-slate-300 bg-gray-200 ">Rol</th>                    
                    <th className="w-1/12 border border-slate-300 bg-gray-200 ">Estado</th>
                    <th className="w-1/12 border border-slate-300 bg-gray-200 "></th>
                    </tr>
                </thead>
                <tbody>
                    { data && (
                        data.map(item =>(
                            <tr key={item.id} className="hover:bg-gray-100 h-8">
                                <td className="border pl-1">{item.nombre}</td>
                                <td className="border pl-1">{item.username}</td>                                            
                                <td className="border pl-1">{item.nrol || item.rol.nombre}</td>      
                                <td className="pl-1 border">
                                    <div className='flex'>                                        
                                        {item.enabled ?
                                        <div className='flex items-center justify-center'>
                                        <span className='w-2/3 mr-2'>Habilitado</span>
                                        <CheckIcon className="h-5 w-5 text-green-400" />
                                        </div>
                                        :  
                                        <>
                                        <span className='w-2/3 mr-1'>Deshabilitado</span>
                                        <XMarkIcon className="h- w-5 text-red-400" />        
                                        </> }                             
                                    </div>                                
                                </td>                         
                                <td className="border">                             
                                <div className='flex items-center justify-center'>
                                <button 
                                   className="w-8 h-5  rounded bg-sky-400 hover:bg-sky-300 text-xs text-white flex items-center justify-center"
                                   onClick={() => {itemHandler(item.id)}} >
                                   <PencilIcon className="h-5 w-5 text-white" />
                                </button>            
                                </div>                                                    
                                </td>
                            </tr>
                        ))
                    )
                    }                    
                    
                </tbody>
                </table>
            </div>
            <div className="pl-1 pr-1">
               <Pagination
               makeHttpRequestWithPage={ makeHttpRequestWithPage}
               total={total}
               paginas={paginas}
               current={pagina}
               pagina={12}
               />
            </div>
        </>
     );
}
 
export default UsuarioTable;