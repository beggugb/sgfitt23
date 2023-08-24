import React from 'react'
import Pagination from '../../../components/Pagination'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faTrash, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Moment from 'react-moment';

const MembresiaTable = ({data,total,pagina,paginas,makeHttpRequestWithPage,delHandler}) => {  
     
    return (  
        <div >     
            <div className="flex-1 mx-auto">
              <table className="border-collapse text-[10px] w-full">
                <thead>
                <tr className="h-6 bg-gray-100 border text-[10px] text-gray-600">                    
                    <th className="w-4/12 ">Paquete</th>
                    <th className="w-2/12 ">Total</th>                    
                    <th className="w-2/12 ">F.Registro</th>
                    <th className="w-2/12 ">F.Vencimiento</th>
                    <th className="w-1/12 ">Estado</th>                    
                    <th className="w-1/12 "></th>
                    </tr>
                </thead>
                <tbody>
                    { data && (
                        data.map((item,index) =>(
                            <tr key={item.id} className="hover:bg-sky-100 text-gray-600 h-7 border-stone-300">
                                <td className="border pl-1 ">{item.paquete}</td>
                                <td className="border text-center">                                    
                                    {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.ingresos)}
                                </td>                                
                                <td className="border text-center"><Moment format="DD/MM/YYYY">{item.ivigencia}</Moment></td>
                                <td className="border text-center"><Moment format="DD/MM/YYYY">{item.fvigencia}</Moment></td>
                                <td className="border text-center">{item.est}</td>
                                <td className="pl-1 pt-1  flex-row flex">
                                    {item.estado === false ? 
                                    <>
                                    <button 
                                        className="w-10 h-6 reounded  bg-sky-400 hover:bg-sky-300 text-xs text-white"
                                        onClick={() => {delHandler(item.id)}} >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <Link to={`/admin/notas/${item.id}`}>
                                        <button className="w-10 h-6 reounded bg-orange-400 hover:bg-orange-300 text-xs text-white">
                                            <FontAwesomeIcon icon={faDollarSign} />
                                        </button>
                                    </Link>
                                    </>
                                    : 
                                    <button 
                                    className="w-10 h-6 rounded bg-red-400 hover:bg-red-300 text-xs text-white">
                                        <FontAwesomeIcon icon={faFilePdf} />
                                    </button>}
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
        </div>
     );
}
 
export default MembresiaTable;