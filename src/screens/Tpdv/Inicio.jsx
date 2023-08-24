import React,{ useEffect, useState} from 'react'
import ListaCategorias from './components/ListaCategorias'
import ListaProductos from './components/ListaProductos'
import ListaVentas from './components/ListaVentas'
import CalculoVentas from './components/CalculoVentas'
import DetalleVentas from './components/DetalleVentas'
import FormVenta from './components/FormVenta'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../../components/snippets/Loading'
import { inventarioActions } from '../../redux/actions/inventario'

const Inicio = () => {   
 const dispatch = useDispatch()   
 const [showModal, setShowModal] = useState(false);    
 const { item } = useSelector(state => state.venta) 
 const {loading }= useSelector(state => state.usuario) 
 
 useEffect(() => {
  let iok = {
    categoriaId: 1,
    value: ""
  }   
  dispatch(inventarioActions.items('productosItems','stock',iok))
  return () => {
    
  };
 }, []);

 /**
  * effecteffect
  */
 
 return ( 
    <div className="flex flex-col w-full">           
    <div className='h-11 flex border bg-stone-100'>        

    </div>
    <div className='h-auto flex border'>        
      <div className='h-500 w-3/12 border flex-col'>      
      <div className='h-440 border w-full flex-col p-1'>
            <ListaVentas/>
        </div>
        <div className='h-14 border w-full'>
            <DetalleVentas item={item}/> 
        </div>
      </div>
      <div className='h-500 w-7/12 border flex-col'>
        <div className='h-440 border w-full flex'>
            <ListaProductos/>
        </div>
        <div className='h-14 border w-full'>
            <CalculoVentas setShowModal={setShowModal}/>   
        </div>
      </div>
      <div className='h-500 w-2/12 border flex-col'>
        <div className='h-6 flex items-center justify-center bg-gray-100 text-gray-500 text-[10px]'>
          <span>Categorias</span>
        </div>
        <div className='h-470 flex p-1 border-2'>
        <ListaCategorias/>
        </div>        
      </div>      
    </div>  
    <FormVenta showModal={showModal} setShowModal={setShowModal} />
    <Loading loading={loading}/>
  </div>      
  );
}
 
export default Inicio;



