import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ListaView from '../Lists/ListaVista'

const ProductosLista = () =>{    
    const dispatch = useDispatch()
    const { item, items } = useSelector(state => state.compra)    
   
    const handleDelete = (it) =>{           
        if(item.totalGeneral > 0){
            let valor = parseFloat(item.totalGeneral) - (parseFloat(it.cantidad) * parseFloat(it.valor))
            let newData = items.filter(item => item.productoId !== it.productoId )                
            let nItems = parseInt(item.nroItems) - parseInt(it.cantidad)
            dispatch({type:"comprasItems",cantidad:nItems,value:valor,values:newData})            
        }        
    } 

    return(
        <div className="flex-1 mx-auto border border-gray-200 p-1 mt-1">
            { items &&
            <table className="border-collapse text-[10px] w-full">
                <thead>
                    <tr className="h-6 bg-gray-100 border text-[10px] text-gray-600">                       
                        <th className="w-2/12">Código</th>
                        <th className="w-3/12">Nombre</th>
                        <th className="w-2/12">Categoria</th>
                        <th className="w-1/12">Marca</th>
                        <th className="w-1/12">Precio</th>
                        <th className="w-1/12">Cantidad</th>
                        <th className="w-1/12">SubTotal</th>
                        <th className="w-1/12 bg-gray-200"></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item,index)=>(                       
                        <tr key={index}>                       
                                <ListaView
                                item={item}
                                index={index}                                
                                />
                                <td className="border">
                                    <div className='flex items-center justify-center w-full'>
                                        <button className="w-10 h-6 bg-red-500 hover:bg-red-400 p-1 rounded text-white" 
                                            onClick={()=>handleDelete(item)}>
                                            <FontAwesomeIcon icon={faTrash} className="btt"/>
                                        </button>                                
                                    </div>                                    
                               </td>
                        </tr>                 
                    ))}                    
                </tbody>
            </table>
            }
        </div>        
    )
}

export default ProductosLista