import React from "react";
import Moment from 'react-moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPencil } from "@fortawesome/free-solid-svg-icons";

const TableCompra = ({data,setIndicador,indicador}) =>{
    return(   
        <div className="flex-1 mx-auto p-1"> 
          <table className="border-collapse w-full text-[10px] border-2">              
            <thead>
               <tr className="h-6 bg-gray-200 text-gray-600">                      
                    <th className="w-1/12 border border-slate-300"></th>                    
                    <th className="w-1/12 border border-slate-300">Fecha</th>
                    <th className="w-1/12 border border-slate-300">Tipo</th>
                    <th className="w-5/12 border border-slate-300">Detalle</th>
                    <th className="w-3/12 border border-slate-300">Proveedor</th>
                    <th className="w-1/12 border border-slate-300">Estado</th>
                </tr>
            </thead>
            {data.length > 0 ?
            <tbody>
                { data.map((item,index) =>(
                <tr key={index} className="hover:bg-gray-100 h-7">
                    <td className="border text-center">
                        <input type="checkbox" 
                          onChange={() => { setIndicador(item.id, item.estado, item.totalGeneral) }} 
                          checked={ item.id === indicador ? true : false}
                          />
                    </td>                    
                    <td className="border text-center"><Moment format="DD-MM-YYYY">{item.fechaCompra}</Moment></td>
                    <td className="border text-center">{item.tipo}</td>
                    <td className="border pl-1">{item.observaciones}</td>
                    <td className="border pl-1">{item.proveedor.razonSocial || ''}</td>                   
                    <td className="border pl-1">{item.estado}{item.estado === 'pendiente' ? <FontAwesomeIcon icon={faPencil} size="sm" color="#38bdf8" />: null} </td>                   
                </tr>
                ))}
            </tbody>
            : 
            <tbody>                
                <tr>                    
                   <td className="border pl-1" colSpan={5}>Sin resultados</td>                                        
                </tr>                
            </tbody>
            }           
        </table> 
        </div>       
    )
}

export default TableCompra;