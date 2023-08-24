import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { cajaActions } from '../../../redux/actions/caja'
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Select from '../../../components/selects/Select'
const tipos =  [                                
                {"value":"ingreso","label":"ingreso"},
                {"value":"egreso","label":"egreso"},                                              
                ];



function CajasItemsForm () {     
  const dispatch = useDispatch()  
  const caja = useSelector(state => state.cajas.item)   
  const item = useSelector(state => state.cajasitems.item)

  const changeHandler = event => {    
  const { name, value } = event.target    
   dispatch({type:'CAJAS_ITEMS_CHANGE',name:name,value:value}) 
 }


 const changesHandler = (name,val) => {            
    dispatch({type:'CAJAS_ITEMS_CHANGE',name:name,value:val})    
 }

const submitHandle = event => {       
    event.preventDefault()           
    
    let dat = {}
    dat.monto = item.monto > 0 ? parseInt(item.monto):0
    dat.tipo = item.tipo
    dat.label = item.label
    dat.cajaId = caja.id    
    console.log(dat)
    dispatch(cajaActions.createList('CAJAS_ITEMS_DATAS','cajasitems',dat))      
      
    dispatch({type:'CAJAS_ITEMS_RESET_ITEM'}) 
 }


         
  return (    
    <div className='h-max border'>
    <div className='h-8 border-b w-full bg-gray-100 font-bold pl-2 text-[10px] pt-2 text-gray-600'>
       Datos de registro 
    </div>
    <div className='h-9 flex items-center pr-1 mt-1'>
        <label htmlFor="monto" className='w-1/3 pl-2 text-[11px] text-gray-500 font-bold'>Monto (BOB) :</label>
        <input                              
          type="text"
          onChange={changeHandler}
          value={item.monto || ""}                
          name="monto"
          className="h-7 w-2/3 text-[11px] pt-2 pl-2 block border border-gray-300  rounded  focus:border-gray-200 focus:bg-gray-50 text-gray-500 focus:text-gray-600"
        />
    </div>
    <div className='h-9 flex items-center pr-1'>
      <label htmlFor="tipo" className='w-1/3 pl-2 text-[11px] text-gray-500 font-bold'>Tipo :</label>
      <div className='w-2/3 flex'>
      <Select
        options={tipos}
        option={item.tipo}                                    
        handleChange={changesHandler} 
        name={"tipo"}
        tipo={"local"}/> 
      </div>      
    </div>
    <div className='h-24 flex-col items-center pr-1'>
      <label htmlFor="label" className='w-1/3 pl-2 text-[11px] text-gray-500 font-bold'>Detalle :</label>
      <textarea                            
          type="text"
          onChange={changeHandler}
          value={item.label || ""}                
          name="label"
          className="w-11/12  text-[11px] ml-2 block border border-gray-300  rounded  focus:border-gray-200 focus:bg-gray-50 text-gray-500 focus:text-gray-600"
        />
    </div> 
    <div className='h-9 flex items-center mt-2 pr-1 pl-1'>
        <button 
          onClick={submitHandle}
          type="submit"
          className="w-full h-6 rounded-md bg-sky-400 flex items-center justify-center text-gray-100">
          <ChevronRightIcon  className="h-5 w- text-gray-50" />                          
        </button>
    </div> 
  </div>                        
  );
}

export default CajasItemsForm