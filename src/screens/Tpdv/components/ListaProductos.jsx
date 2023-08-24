import React,{ useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { api } from '../../../helpers/api'

const ListaProductos = () => {    

    const dispatch = useDispatch()
    const [showModal, setShowModal] = React.useState(false);
    const [estado, setEstado] = useState(true);    
    const pitems  = useSelector(state => state.producto.items) 
    const {items, item} = useSelector(state => state.venta) 

    const handleAsignar = (producto) => {  
     
     
 
        if(producto.stock > 0)
        {
            let ites = [...items]
            let cTotal     = item.nroItems
            let gTotal     = item.totalGeneral            
            let repeat = false

            ites.map((itt, index) =>{                              
            if(itt.productoId === producto.productoId)
            { 
              ites[index].cantidad = parseInt(ites[index].cantidad) + 1 
              ites[index].subTotal = ites[index].subTotal + parseFloat(producto.precioVenta)        
              ites[index].stock = ites[index].stock + 1
              
              repeat = true;              
            }
            if(itt.productoId === producto.productoId)
            {                        
              repeat = true;
            }                        
            return null
            })




          if(!repeat)
          {
            let itemVenta = {
                cantidad   : 1,          
                productoId : producto.productoId,        
                valor      : producto.precioVenta,
                unidad     : producto.unidad.nombre || '',
                stock      : 1,
                subTotal   : parseInt(1) * parseFloat(producto.precioVenta),        
                nombre     : producto.nombre, 
                categoria  : producto.categoria.nombre || '',
                marca      : producto.marca.nombre || '',
                codigo     : producto.codigo
            }  
            ites.push(itemVenta);                        
            }
            cTotal  = parseInt(item.nroItems) + 1
            gTotal  = parseFloat(gTotal) + parseFloat(producto.precioVenta)
            dispatch({type:'ventasSetItems',values:ites, cantidad: cTotal, value: gTotal})  
            //
            let newData = [...pitems]
            
            newData.map((itt, index) => {                              
                if(itt.productoId === producto.productoId)
                {                   
                  newData[index].stock = newData[index].stock - 1
                  dispatch({type:'productosItems',response:newData }) 
                }   
                return null 
            })  

        }else{

        }
        
      } 
    return ( 
        <div className="h-full border border-white p-1 w-full overflow-y-scroll">
         { pitems &&
           pitems.map((item,index)=>(
            <div 
                key={index} 
                onClick={()=> handleAsignar(item)}
                className={item.stock > 0 ? "h-28 w-28 border-2 hover:border-2 hover:border-gray-400  shadow-lg rounded float-left mr-2 mb-1" : "h-28 w-28 border-2 shadow-lg rounded float-left mr-2 mb-1 opacity-50 cursor-not-allowed"}>                                                                        
                <h2 className="bg-stone-100 text-[10px] text-stone-500 font-bold p-1 truncate">{item.nombre}</h2>                  
                <div className="w-full flex p-1 justify-center">
                    <img
                    alt="producto"
                    className="h-16 w-16 rounded"                        
                    src={`${api}/static/images/articulos/md/` + item.filename}
                    />                                 
                </div> 
                <div className="flex text-[10px] z-50 justify-center mr-2">
                <div className="w-1/3 z-40 -mt-4 -ml-2  text-center">
                    <div className="w-8 h-6 rounded-full pt-1 text-[10px] font-bold bg-sky-500 text-white">{item.stock || 0}</div>    
                </div>
                <div className="bg-purple-500 font-bold rounded w-3/5 text-center text-white border">
                {new Intl.NumberFormat('es-BO',{style: "currency",currency:'BOB',minimumFractionDigits: 2}).format(item.precioVenta)}
                </div>
            </div>
            </div> 
           ))
         }  
        </div>
     );
}
 
export default ListaProductos;



