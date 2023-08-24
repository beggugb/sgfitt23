import React from 'react'
import Pagination from '../../../components/Pagination'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../redux/actions/crud'
import {api} from '../../../helpers/api'
import { ShieldCheckIcon, PencilSquareIcon } from "@heroicons/react/24/outline";




const ClienteCuadros = ({setShowModal}) => {   
    const dispatch = useDispatch()      
    const {data, total ,pagina, paginas, promp }= useSelector(state => state.cliente)
    
  

    const edit = (pky) =>{
        dispatch(crudActions.getItem('clienteItem','clientes','unit',pky)) 
        setShowModal(true)
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
  
     
  
    return (  
        <>       
        <div className="flex-1 mx-auto">
            <div className="h-460 w-full border p-1">
            {
                data.map((item, index)=>(
                    <div key={index} className='h-auto flex-col w-40 border float-left mr-1 mb-1'>
                     <img
                        alt="cliente"
                        className="h-20 w-full border p-1 rounded" 
                        src={`${api}/static/images/clientes/md/` + item.filename}
                      />                        
                      <div className='border w-full p-1'>
                        <p className="text-stone-600 text-[10px] truncate pl-1">{item.nombres}</p> 
                        <p className="text-stone-600 text-[10px] truncate pl-1">{item.ci}</p> 
                      </div>
                      <div className='h-7 border w-full flex justify-around bg-gray-100'>
                            <button
                                className="h-5 w-1/2 flex"
                                onClick={() => edit(item.id)}>                                    
                                 <PencilSquareIcon className="h-5 w-5 text-gray-500" />
                            </button>
                            
                            <Link to={`/admin/membresia/${item.id}`}
                            className="h-5 w-1/2 flex ">                            
                                <ShieldCheckIcon className="h-5 w-5 text-gray-500" />
                            
                            </Link>
                        
                      </div>  
                    </div>
                ))
            }    
            </div>
            <div className="">
               <Pagination
               makeHttpRequestWithPage={ submitHandle }
               total={total}
               paginas={paginas}
               pagina={pagina}
               num={12}
               />
            </div>
        </div>           
        </>
     );
}
 
export default ClienteCuadros;