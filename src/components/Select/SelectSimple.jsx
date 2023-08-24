import React,{useEffect, useState} from 'react'
import { crudActions } from '../../redux/actions/crud'
import { useSelector, useDispatch } from 'react-redux'
import{ getFecha, addM, addMM, add_months, getInicio} from '../../helpers/functions'
import SelectData from '../../components/selects/SelectData'
const SelectSimple = () =>{     
    const dispatch = useDispatch()    
    const [startDate, setStartDate] = useState(new Date());   
    const [endDate, setEndDate] = useState(new Date());
    const { data, item }= useSelector(state => state.paquetes)
    const getCharge = () =>{        
         dispatch(crudActions.getList('paquetesLista','paquetes'))   
    }
    
    useEffect(() => {
        getCharge()
        return () => {
            /*dispatch({type:'resetMembresia'})*/
            };
    }, []);
    
    const handleChange = (it) =>{        
        let io = it ? it.value: 0
        let va = it ? it.valor: 0
        let da = it ? it.diario: false           
        let md = it ? it.meses: 0

        dispatch({type:'membresiasChange',props:'paqueteId',value:io})
        dispatch({type:'paquetesChange',props:'id',value:io})          
        dispatch({type:'paquetesChange',props:'valor',value:va}) 
        dispatch({type:'paquetesChange',props:'diario',value:da}) 

        let ivigencia = ""
        let fvigencia = ""
        
        
        if(va !== '0' && va !== 0 )
        {
            
            if(md === '0.5')
            {            
                ivigencia = getInicio()
                fvigencia = addM(startDate)            
                
            }else if(da){              
                ivigencia = getInicio()
                fvigencia = getInicio()
            }
            else{         
                ivigencia = getFecha(startDate)
                let iok = parseInt(md) + 1            
                fvigencia = addMM(iok)
            }
          
            dispatch({type:'membresiasChange',props:'ivigencia',value:ivigencia})
            dispatch({type:'membresiasChange',props:'fvigencia',value:fvigencia})
        }else{
            dispatch({type:'membresiasChange',props:'ivigencia',value:startDate})
            dispatch({type:'membresiasChange',props:'fvigencia',value:endDate})
        }
            
    }

    return(
        <> 
        <label htmlFor='paqueteId' className='w-1/3 pl-1'> Paquetes :</label>                 
        <div className='w-2/3 flex'>
        <SelectData
         options={data}
         option={item.id}
         handleChange={handleChange}                                                         
         name={"paqueteId"}/>          
        </div>        
        </>        
    )
}

export default SelectSimple