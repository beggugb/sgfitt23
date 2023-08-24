import React,{ useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector} from 'react-redux'
import { inventarioActions } from '../../../../../redux/actions/inventario'

const InputSearch = () =>{
    const dispatch = useDispatch()    
    const pitems  = useSelector(state => state.producto.items)
    const {items, item }  = useSelector(state => state.compra)
    const [name, setname] = useState("");
    const [view, setview] = useState(false);    
    const [cantidad, setCantidad] = useState(0);
    const [valor, setValor] = useState(0);    
    const [producto, setproducto] = useState();
    const fechaHoy = new Date()
    const mes = fechaHoy.getMonth() + 1
    const anio = fechaHoy.getFullYear()

    const handleSearch = () =>{
        let dato = {
            prop: 'nombre',
            value: name
        }        
        dispatch(inventarioActions.postSearchs('productosItems','productos',dato))
        setview(true)
    }
    const asignar = (it) =>{        
        setproducto(it)
        setname(it.nombre)
        setview(false)

    }
    const agregar = () =>{                
        let newItems = [...items]
        let repeat = false   

        newItems.map((ite,index)=>{            
            if(ite.productoId === producto.id)
            {
                repeat = true
            }
            return null
        })

        if(!repeat){
            let newItem ={
                cantidad: cantidad,
                codigo:producto.codigo,
                nombre: producto.nombre,
                valor: valor,
                categoria: producto.categoria.nombre,
                marca: producto.marca.nombre,
                gestion: anio,
                mes: mes,
                subTotal: parseFloat(cantidad) * parseFloat(valor),
                unidad: producto.unidad.nombre,
                compraId: item.id,
                productoId: producto.id                
            }        
            newItems.push(newItem)                
            let nTotal = parseFloat(item.totalGeneral) + (parseFloat(cantidad) * parseFloat(valor))
            let nItems = parseInt(item.nroItems) + parseInt(cantidad)
            dispatch({type:"comprasItems",cantidad:nItems,value:nTotal,values:newItems})
            
        }        
        clear()        
    }
    

    const clear = () =>{
        setname('')
        setview(false)
        setproducto('')
        setCantidad(0)
        setValor(0)
    }

  

    /*console.log(items)*/


    return( 
      <>
        <div className="h-max bg-white w-full flex items-center">
            <div className="h-7 w-4/12 flex items-center">
                <label className="w-2/6 block text-gray-500 tracking-wide text-grey-darker text-[10px] font-bold p-3">
                    Producto :
                </label>
                <input 
                    className="h-7 w-4/6 border-gray-300 block bg-grey-lighter text-gray-500 text-[10px] rounded px-2 " 
                    id="name" 
                    name="name"
                    type="text" 
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                /> 
                <button 
                    onClick={() => clear()}
                    className={name ?"h-7 w-7 border z-10 -ml-14 border-transparent shadow-sm text-[10px] font-medium rounded-full text-red-600" :"h-7 w-7 border z-10 -ml-14 border-transparent shadow-sm text-[10px] font-medium rounded-full text-white"} >
                  X
                </button>
                <button 
                    onClick={() => handleSearch()}
                    className="h-7 w-7 border z-10 border-transparent shadow-sm text-[10px] font-medium rounded-full text-gray-600">
                    <FontAwesomeIcon icon={faSearch} />
                </button> 
            
            { view && pitems.length > 0 ?
                        <div className="ml-10 mt-24 absolute w-56 z-10 shadow-md border bg-gray-100 p-1">
                            <table className="border-collapse w-full">
                                <tbody>
                                    {pitems.map((ite,index)=>(
                                    <tr 
                                    key={index}
                                    onClick={() => asignar(ite)}>                                                                            
                                        <td className="h-6 border-b border-gray-300 text-[10px] text-gray-700 hover:bg-gray-200">{ite.nombre} - ({ite.categoria.nombre})</td>                                        
                                    </tr>
                                    ))}                                
                                </tbody>
                            </table>
                        </div>  : null                 
            }
            </div>
            <div className="h-7 w-3/12 flex items-center">
                <label className="w-3/6 block text-gray-500 tracking-wide text-grey-darker text-[10px] font-bold p-3">
                    Cantidad :
                </label>
                <input 
                    className="h-7 w-3/6 border-gray-300 block bg-grey-lighter text-gray-500 text-[10px] rounded px-2 " 
                    id="cantidad" 
                    name="cantidad"
                    type="text" 
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                />
            </div>

            <div className="h-7 w-3/12 flex items-center">
                <label className="w-3/6 block text-gray-500 tracking-wide text-grey-darker text-[10px] font-bold p-3">
                    Valor :
                </label>
                    <input 
                        className="h-7 w-3/6 border-gray-300 block bg-grey-lighter text-gray-500 text-[10px] rounded px-2 " 
                        id="valor" 
                        name="valor"
                        type="text" 
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                    /> 
            </div>
            <div className="h-7 w-2/12 flex items-end justify-end pr-4">
                <button 
                onClick={() => agregar()}
                className="w-10 h-6 bg-green-500 hover:bg-green-400 p-1 rounded text-white flex items-center justify-center">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </div>     
        
      </> 
    )

}


export default InputSearch