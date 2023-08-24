import React,{ useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { api } from '../../../helpers/api'

const ListaVentas = () => {    
    const dispatch = useDispatch()        
    const { items, item } = useSelector(state => state.venta) 

    const handleAsignar = (producto) => {         
        
      } 

    return (                
        <>            
            { items.length > 0 ?          
                items.map((it,index)=>(   
                    <div key={index} className="h-8 flex-1 border-b border-gray-300 w-full text-[10px]">            
                        <div className='h-4 flex w-full pl-1 truncate font-bold text-gray-600'>
                            {it.nombre}
                        </div>
                        <div className='h-4 flex w-full'>
                            <div className='w-3/6 flex italic'>
                               <div className='flex w-full justify-start mr-1 pl-1'>
                               p.unitario {' '} 
                            ({new Intl.NumberFormat('es-BO',{minimumFractionDigits: 2}).format(it.valor)})                            
                               </div>                            
                            </div>
                            <div className='w-1/6 flex italic'>
                             * {it.cantidad} = 
                            </div>
                            <div className='w-2/6 flex justify-center font-bold'>
                                <span>
                                    {new Intl.NumberFormat('es-BO',{minimumFractionDigits: 2}).format(it.subTotal)}
                                </span>                            
                            </div>
                        </div>
                    </div>
                ))
            : null
            }                
        </>             
     );
}
 
export default ListaVentas;



