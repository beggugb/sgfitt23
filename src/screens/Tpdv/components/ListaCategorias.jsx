import React,{ useEffect, useState} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { inventarioActions } from '../../../redux/actions/inventario'

const ListaCategorias = () =>{ 
    const dispatch = useDispatch()    
    const { data } = useSelector(state => state.categoria) 
    const [category, setcategory] = useState(0);


    const chargeDatas = (page,num) =>{      
      dispatch(inventarioActions.getData('categoriasData','categorias',page,num,'nombre','asc'))
    }
 
    const chargeProductos = (pky) =>{   
      let iok = {
        categoriaId: pky,
        value: ""
      }   
      dispatch(inventarioActions.items('productosItems','stock',iok))
      dispatch({type:"ventasCategoria",value:pky})
      setcategory(pky)
    }

    useEffect(() => {
        chargeDatas(1,14)
        return () => {
            dispatch({type:'categoriasReset'})
        };
    }, []);


 return(   
  <div className=" overflow-y-scroll justify-center items-center flex-1 border border-stone-200 pl-1 pr-1">  
    { data &&
            data.map((itt,inde)=>(
              <button 
              key={inde} 
              onClick={() => chargeProductos(itt.id)}
              className={category === itt.id ? 'h-8 w-full hover:bg-sky-200 bg-gray-500 border flex mt-1 rounded items-center justify-center hover:text-gray-500 text-gray-50':'h-8 w-full bg-sky-200 hover:bg-gray-500 border flex mt-1 rounded items-center justify-center text-gray-500 hover:text-gray-50'} >
                <span className='text-[10px] ' >{itt.nombre}</span>
              </button>      
            ))
          }  
  
  </div>      
    )
}

export default ListaCategorias
