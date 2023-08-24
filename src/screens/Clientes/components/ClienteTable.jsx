import React,{useEffect} from 'react'
import Pagination from '../../../components/Pagination'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../redux/actions/crud'
import { DocumentTextIcon, PencilIcon, TrashIcon, TagIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";




const ClienteTable = ({setShowModal,setShowView}) => {   
    const dispatch = useDispatch()  
    const {data, total ,pagina, paginas, promp }= useSelector(state => state.cliente)
 
    const edit = (pky) =>{
        dispatch(crudActions.getItem('clienteItem','clientes','unit',pky)) 
        setShowModal(true)
    }
    const show = (pk) =>{
        dispatch(crudActions.getItem('clienteItem','clientes','inf',pk)) 
        setShowView(true)
    }
    const del = (pk) =>{
        dispatch(crudActions.deleteList('clientesData','clientes',pk))         
    }
    const submitHandle = (page,num) =>{       
              
        if(page > 0){
            let iok={
                page:page,
                num:num,
                nombres : promp,
                ci:'',
                nit:''
            }
            dispatch(crudActions.searchList('clientesData','clientes',iok))
        }
        
      }

    const submitHandles = (page,num) =>{        
        let iok={
            page:page ? page : 1,
            num:num ? num : 12,
            nombres : promp,
            ci:'',
            nit:''
        }
        dispatch(crudActions.searchList('clientesData','clientes',iok))
      }      
    useEffect(() =>{                
        submitHandles(1,12)
              
    }, []);


  
    return (  
        <>       
            <div className="flex-1 mx-auto border border-gray-200 p-1 mt-1">
              <table className="border-collapse text-[10px] w-full">
                <thead>
                    <tr className="h-6 bg-gray-100 border text-[10px] text-gray-600">                    
                    <th className="w-1/12">ID</th>
                    <th className="w-6/12">Nombres</th>                                  
                    <th className="w-2/12">CI</th>
                    <th className="w-1/12">Teléfono</th>
                    <th className="w-1/12">Estado</th>                                        
                    <th className="w-1/12 bg-gray-200"></th>
                    </tr>
                </thead>
                <tbody>
                    { data && (
                        data.map(item =>(
                            <tr key={item.id} className="hover:bg-sky-100 text-gray-600 h-7 border-stone-300">
                                <td className="pl-1 border text-center">{item.id}</td>                                                       
                                <td className="pl-1 border">{item.nombres}</td>
                                <td className="pl-1 border">{item.ci}</td>                                
                                <td className="pl-1 border">{item.telefono}</td>
                                <td className="pl-1 border">
                                    <div className='flex'>                                        
                                        {item.estado ?
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
                                <td className="border bg-gray-100">
                                  <div className='flex w-full items-center'>
                                    <button
                                        onClick={() => show(item.id)}
                                        className="w-6 h-5 rounded bg-red-400 hover:bg-red-300 text-[10px] text-white mr-1 flex items-center justify-center">
                                        <DocumentTextIcon className="h-4 w-4 text-gray-50" /> 
                                    </button>
                                    <button
                                        onClick={() => edit(item.id)}
                                        className="w-6 h-5 rounded bg-sky-400 hover:bg-sky-300 text-[10px] text-white flex items-center justify-center">                                        
                                        <PencilIcon className="h-4 w-4 text-gray-50" /> 
                                    </button>
                                    <Link to={`/admin/membresia/${item.id}`}>
                                    <button                                        
                                        className="w-6 h-5 rounded bg-green-400 hover:bg-green-300 text-[10px] text-white ml-1 flex items-center justify-center">
                                        <TagIcon className="h-4 w-4 text-gray-50" /> 
                                    </button>                                    
                                    </Link>
                                    <button
                                        onClick={() => del(item.id)}
                                        className="ml-1 w-6 h-5 rounded bg-red-400 hover:bg-red-300 text-[10px] text-white flex items-center justify-center">
                                        <TrashIcon className="h-4 w-4 text-gray-50" /> 
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
            <div className="">
               <Pagination
               makeHttpRequestWithPage={ submitHandle}
               total={total}
               paginas={paginas}
               pagina={pagina}
               num={12}
               />
            </div>
        </>
     );
}
 
export default ClienteTable;