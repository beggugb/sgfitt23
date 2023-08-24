import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";


const TableSimple = ({data,handleDelete,handleEdit}) =>{    
    return(   
        <div className="flex-1 mx-auto  mt-2">
          <table className="border-collapse text-[10px] w-full text-gray-600">          
            <thead>
                <tr className="h-6 bg-gray-100">                
                    <th className='w-1/6 border'>Código</th>                    
                    <th className='w-4/6 border'>Nombre</th>
                    <th className='w-2/6 border'>Abreviación</th>
                    <th className='w-1/6 border bg-gray-200'></th>                    
                </tr>
            </thead>
            {data.length > 0 ?
            <tbody>
                { data.map((item,index) =>(
                <tr key={index} className="hover:bg-sky-200 h-7 border">                     
                    <td className="border text-center">{item.id}</td>
                    <td className="border pl-1">{item.nombre}</td>
                    <td className="border text-center">{item.abreviacion}</td>                                                        
                    <td className="border pl-1 flex-row flex">
                        <button 
                        className="w-8 h-5 border rounded bg-red-400 hover:bg-red-300 text-xs text-white"
                        onClick={() => handleDelete(item.id)} >
                        <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button 
                        className="w-8 h-5 border rounded bg-sky-400 hover:bg-sky-300 text-xs text-white"
                        onClick={() => handleEdit(item)}>
                        <FontAwesomeIcon icon={faEdit} />
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
            : 
            <tbody>                
                <tr>                    
                   <td colSpan={5}>Sin resultados</td>                                        
                </tr>                
            </tbody>
            }           
        </table> 
        </div>       
    )
}

export default TableSimple;