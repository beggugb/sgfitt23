import React,{useEffect} from 'react'
import Pagination from '../../../components/Pagination'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes, faFilePdf,faLockOpen,faLock, faCheck } from "@fortawesome/free-solid-svg-icons";
import Moment from 'react-moment'
import { crudActions } from '../../../redux/actions/crud'
import { useSelector, useDispatch } from 'react-redux'

const CajasTable = ({viewModal,closeHandler}) => {   
    const dispatch = useDispatch() 
    const {  data, total ,pagina, paginas }= useSelector(state => state.cajas)
    let us = JSON.parse(localStorage.getItem('@usuarioFitt'))
    
    const makeHttpRequestWithPages = (page,num) =>{
        dispatch(crudActions.getListDetalle('CAJAS_DATA','cajas',page,num, us.id)) 
    }

    const makeHttpRequestWithPage = (page,num) =>{
        if(page > 0){
            dispatch(crudActions.getListDetalle('CAJAS_DATA','cajas',page,num, us.id)) 
        }        
    }

    useEffect(() =>{        
        makeHttpRequestWithPages(1,12)                     
    }, []);
    return (  
        <>       
            <div className="flex-1 mx-auto border border-gray-200 p-1 mt-1">
              <table className="border-collapse text-[10px] w-full">
                <thead>
                    <tr className="h-6 bg-gray-100 border text-[10px] text-gray-600">                    
                    <th className="w-1/12">Fecha</th>
                    <th className="w-2/12">Usuario</th>                    
                    <th className="w-2/12">$ Inicial</th>
                    <th className="w-2/12">$ Ingreso</th>
                    <th className="w-2/12">$ Egreso</th>
                    <th className="w-2/12">$ Final</th>                    
                    <th className="w-1/12">F. Cierre</th>
                    <th className="w-1/12"></th>
                    </tr>
                </thead>
                <tbody>
                    { data && (
                        data.map(item =>(
                            <tr key={item.id} className="hover:bg-sky-100 text-gray-600 h-7 border-stone-300">
                                <td className="border pl-1"><Moment format="DD/MM/YYYY">{item.registro}</Moment></td>
                                <td className="border pl-1">{item.usuario.nombre || ''}</td>  
                                <td className="border text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoInicial)}</td>
                                <td className="border text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoIngreso)}</td>
                                <td className="border text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoEgreso)}</td>
                                <td className="border text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoFinal)}</td>                                                              
                               
                                <td className="border pl-1">
                                    {item.fechaCierre ? 
                                        <Moment format="DD/MM/YYYY">{item.fechaCierre}</Moment>
                                        :
                                        <span>abierto</span>
                                    }                      
                                </td>
                                <td className="h-7 border-b pl-1 flex flex-row justify-center">
                                    {item.estado ? 
                                        <button 
                                        onClick={() => {viewModal(item.id)}}
                                        className="w-7 h-5 rounded bg-red-400 hover:bg-red-300 text-xs text-white m-1">
                                            <FontAwesomeIcon icon={faFilePdf} />
                                        </button>
                                        :
                                        <>
                                        <Link to={`/admin/cajasitems/${item.id}`}>
                                        <button 
                                        className="w-7 h-5 rounded bg-sky-400 hover:bg-sky-300 text-xs text-white m-1">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        </Link>
                                        <button 
                                        onClick={() => {closeHandler(item)}}
                                        className="w-7 h-5 rounded bg-green-400 hover:bg-green-300 text-xs text-white m-1">
                                            <FontAwesomeIcon icon={faCheck} />
                                        </button>
                                        </>
                                    }                                                               
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
               makeHttpRequestWithPage={ makeHttpRequestWithPage}
               total={total}
               paginas={paginas}
               pagina={pagina}
               num={12}
               />
            </div>
        </>
     );
}
 
export default CajasTable;
