import React,{useEffect} from 'react'
import Pagination from '../../../components/Pagination'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux'
import { crudActions } from '../../../redux/actions/crud'
import Moment from 'react-moment'

const MemTable = ({setShowModal,setShowView}) => {   
    const dispatch = useDispatch()  
    const {data, total ,pagina, paginas, promp }= useSelector(state => state.membresias)
  
    const edit = (pky) =>{
        dispatch(crudActions.getItem('membresiaItem','mem','unit',pky)) 
        setShowModal(true)
    }
  
    const submitHandles = (page,num) =>{        
        let iok={
            page:page ? page : 1,
            num:num ? num : 12,
            nombres : promp,
            
        }
        dispatch(crudActions.searchList('membresiasData','mem',iok))
    }
    const submitHandle = (page,num) =>{        
        if(page > 0){
            let iok={
                page:page ? page : 1,
                num:num ? num : 12,
                nombres : promp,
                
            }
            dispatch(crudActions.searchList('membresiasData','mem',iok))
        }        
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
                    <th className="w-2/12">CLIENTE</th>                                  
                    <th className="w-2/12">PAQUETE</th>
                    <th className="w-1/12">USUARIO</th>
                    <th className="w-1/12">I.VIGENCIA</th>
                    <th className="w-1/12">F.VIGENCIA</th>
                    <th className="w-1/12 bg-gray-50"></th>
                    </tr>
                </thead>
                <tbody>
                    { data && (
                        data.map(item =>(
                            <tr key={item.id} className="hover:bg-sky-100 text-gray-600 h-7 border-stone-300">
                                <td className="text-center border truncate">{item.id}</td>                                                       
                                <td className="pl-1 border truncate">{item.cliente || ''}</td>
                                <td className="pl-1 border truncate">{item.paquete || ''}</td>                                
                                <td className="pl-1 border truncate">{item.usuario || ''}</td>

                                <td className="text-center border truncate"><Moment format="DD/MM/YYYY">{item.ivigencia}</Moment></td>
                                <td className="text-center border truncate"><Moment format="DD/MM/YYYY">{item.fvigencia}</Moment></td>

                                <td className="border bg-gray-50">                               
                                    <div className='flex w-full items-center justify-center'>
                                    <button
                                        onClick={() => edit(item.id)}
                                        className="w-7 h-5 rounded bg-sky-400 hover:bg-sky-300 text-xs text-white">
                                        <FontAwesomeIcon icon={faEdit} size="sm"/>     
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
 
export default MemTable;