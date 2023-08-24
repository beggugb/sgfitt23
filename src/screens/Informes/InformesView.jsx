import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { crudActions } from '../../redux/actions/crud'
import DatePicker from "react-datepicker";
import Loading from '../../components/snippets/Loading'
import Select from '../../components/selects/Select'
import Clientes from './Clientes'
import Membresias from './Membresias'
import Cajas from './Cajas'
import Consolidado from './Consolidado'
import Registro from './Registro'
import Ventas from './Ventas'
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)

const tipos = [
    {label:'Clientes',value:"Clientes"},
    {label:'Membresias',value:"Membresias"},
    {label:'Cajas',value:"Cajas"},
    {label:'Consolidado',value:"Consolidado"},
    {label:'Registro',value:"Registro"},
    {label:'Ventas',value:"Ventas"},
]

const InformesView = () => {
    const dispatch = useDispatch()  
    const [value1, onChange1] = useState(new Date());    
    const [value2, onChange2] = useState(new Date());  
    const [tipo, settipo] = useState('Clientes');
    const [component, setcomponent] = useState(<Clientes/>);
    let us = JSON.parse(localStorage.getItem('@usuarioFitt')) 
    const {loading }= useSelector(state => state.usuario) 
    
    const handleChange = (prop,val) =>{  
        switch(val){
            case 'Clientes':
                setcomponent(<Clientes/>);
                settipo(val)
            break;   
            case 'Cajas':
                setcomponent(<Cajas/>);
                settipo(val)
            break; 
            case 'Membresias':
                setcomponent(<Membresias/>);
                settipo(val);
            break;
            case 'Consolidado':
                setcomponent(<Consolidado/>);
                settipo(val)
            break;  
            case 'Registro':
                setcomponent(<Registro/>);
                settipo(val)
            break;
            case 'Ventas':
                setcomponent(<Ventas/>);
                settipo(val)
            break;
            default:
                setcomponent(null);
                break;    
        }
    }
   
    const submitHandle = () => {  
        dispatch({type:'INFORMES_RESET'})        
        
        const item = {
         desde : value1,
         hasta : value2,
         usuarioId : us.id         
        }
        switch(tipo){
            case 'Clientes':
                dispatch(crudActions.informes('INFORMES_CLIENTES','clientes',item,value1,value2))
            break;   
            case 'Cajas':
                dispatch(crudActions.informes('INFORMES_CAJAS','cajas',item,value1,value2))
            break; 
            case 'Membresias':
                dispatch(crudActions.informes('INFORMES_MEMBRESIAS','membresias',item,value1,value2)) 
            break;  
            case 'Consolidado':
                dispatch(crudActions.informes('INFORMES_CONSOLIDADO','consolidado',item,value1,value2))          
            break; 
            case 'Registro':
                dispatch(crudActions.informes('INFORMES_REGISTROS','registro',item,value1,value2))   
            break;    
            case 'Ventas':
                dispatch(crudActions.informes('INFORMES_VENTAS','ventas',item,value1,value2))   
            break;   
            default:
                setcomponent(null);
            break;  
        }
                  
        
    }
 
    return ( 
        <>
        <div className="h-full flex-1 p-1">
          <div className="h-550 flex flex-row justify-between ">
            
            <div className="w-1/5 border-gray-300  flex-col text-[10px] text-gray-600">
              <div className="h-9 bg-gray-50 p-1 border-gray-200 border flex items-center">
                <span className='pl-2'>Parametros</span>
              </div>
      
              <div className='h-auto flex-col m-1 border'>
                  <div className="flex-col rounded p-2 flex">
                      <label htmlFor="tipo" className="h-4 pl-1 font-bold text-gray-500 text-[10px]">Tipo</label>
                      <Select
                          options={tipos}
                          option={tipo}                                    
                          handleChange={handleChange} 
                          name={"tipo"}
                          tipo={"local"}
                      />
                  </div>
              
                  <div className="flex-col rounded p-1 flex">
                    <label htmlFor="desde" className="h-4 pl-2 font-bold text-gray-500 text-[10px]">Desde</label>    
                    <DatePicker 
                      className="text-center p-1 h-7 w-full text-gray-500 rounded border-gray-300 hover:bg-gray-100 hover:border-sky-200 text-[10px]"
                      locale="es"
                      selected={value1} 
                      onChange={(date) => onChange1(date)}
                      dateFormat="PP"/>
                  </div>
                  <div className="flex-col rounded p-2 flex">
                      <label htmlFor="hasta" className="p-1 font-bold text-gray-500">Hasta</label>
                      <DatePicker 
                      className="text-center p-1 h-7 w-full text-gray-500 rounded border-gray-300 hover:bg-gray-100 hover:border-sky-200 text-[10px]"
                      locale="es"
                      selected={value2} 
                      onChange={(date) => onChange2(date)}
                      dateFormat="PP"/>       
                      
                  </div>
                  

                 
                  <div className="flex-col rounded p-1 flex">
                      <button
                          onClick={() => submitHandle()}
                          className="h-7 w-full text-center bg-sky-400 rounded text-[10px] text-gray-50 font-bold hover:bg-sky-300"
                          type="button"> Generar
                      </button> 
                  </div>
              </div>
      
      
      
      
            </div>
      
            <div className="w-4/5  bg-gray-100 border">        
            { component }  
            </div>                            
          </div>    
        </div>
        <Loading
        loading={loading}
        /> 
        </>   
     );
}
 
export default InformesView;