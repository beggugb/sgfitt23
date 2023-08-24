import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {toastr} from 'react-redux-toastr'
import SelectSimple from '../../../components/Select/SelectSimple'
import { crudActions } from '../../../redux/actions/crud'

const MembresiaForm = () => {     
    const dispatch = useDispatch()    
    const item = useSelector(state => state.membresias.item)
    const paquete = useSelector(state => state.paquetes.item)  
    const cliente = useSelector(state => state.cliente.item) 
    let us = JSON.parse(localStorage.getItem('@usuarioFitt'))
     
    const submitHandle = () => {  
      
    let dat = item
    dat.orden = '1'
    dat.num = 1
    dat.ingresos = parseInt(paquete.valor)
    dat.intros = 30
    /*dat.ivigencia = getFecha(startDate)
    dat.fvigencia = paquete.diario ? getFecha(startDate) : paquete.meses === '0.5' ? addM(startDate,15)  :  getFecha(endDate)*/
    dat.clienteId = cliente.id     
    dat.usuarioId = us.id
       
    if(dat.paqueteId){
        dispatch(crudActions.postList('membresiasData','membresias',item))  
        dispatch({ type: 'resetMembresia' }); 
        dispatch({ type: 'paqueteReset' });             
    }else{
        toastr.error('Error', 'debe seleccionar paquete') 
    }
    
 }

 const handleChange = (e) =>{
    /*console.log(e)*/
    dispatch({type:'membresiasChange',props:'ivigencia',value:e})  
 }
 const handleChanges = (e) =>{
    /*console.log(e)*/
    dispatch({type:'membresiasChange',props:'fvigencia',value:e})  
 }

 return (  
        <div className="h-10 w-full flex border rounded-md text-[10px] text-gray-500">          
                <div className='h-8  w-1/4 flex items-center'>
                    <SelectSimple/> 
                </div>
                <div className='h-8  w-1/4 flex items-center'>
                    <label htmlFor="ivigencia" className='w-1/3 pl-2 text-[10px] text-gray-500 font-bold'>I.Vigencia :</label>
                    <input                              
                    type="date"
                    onChange={(e) => handleChange(e.target.value)}
                    required={true} 
                    value={item.ivigencia}                
                    name="ivigencia"
                    className="pt-1 pl-2 h-7 w-2/3  block text-[10px] border border-gray-300  rounded"
                    />
                </div>

                <div className='h-8  w-1/4 flex items-center'>
                    <label htmlFor="fvigencia" className='w-1/3 pl-2 text-[10px] text-gray-500 font-bold'>F.Vigencia :</label>
                    <input                              
                    type="date"
                    onChange={(e) => handleChanges(e.target.value)}
                    required={true} 
                    value={item.fvigencia}                
                    name="fvigencia"
                    className="pt-1 pl-2 h-7 w-2/3  block text-[10px] border border-gray-300  rounded"
                    />
                </div>  
                <div className="w-1/4 flex items-center justify-end p-1">
                    <button
                        onClick={() =>submitHandle()}
                        className="h-7 bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-[10px] px-5 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        > Registrar
                    </button> 
                </div>        
        </div>    
        
     );
}
 
export default MembresiaForm;