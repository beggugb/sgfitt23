import React,{ useEffect} from "react";
import { useSelector, useDispatch} from 'react-redux'
import { inventarioActions } from '../../../redux/actions/inventario'
import Pagination from '../../../components/Pagination'
import TableUnidad from "../../../components/Tables/TableSimple";
import FormSearch from "../../../components/Forms/FormSearch";
import FormUnidad from '../../../components/Forms/FormSimple'
import Loading from '../../../components/snippets/Loading'

const UnidadesView = () =>{
    const dispatch = useDispatch()      
    const { data, item, total, pagina, paginas } = useSelector(state => state.unidad) 
    const {loading }= useSelector(state => state.usuario) 


    const chargeData = (page,num) =>{
        if(page > 0){
            dispatch(inventarioActions.getData('unidadesData','unidades',page,num,'nombre','ASC'))
        }        
    }
    const chargeDatas = (page,num) =>{
        dispatch(inventarioActions.getData('unidadesData','unidades',page,num,'nombre','ASC'))
    }  
  
    useEffect(() => {
        chargeDatas(1,12)
        return () => {
            dispatch({type:'unidadesReset'})
        };
    }, []);
    
    const handleDelete = (pky) =>{        
        dispatch(inventarioActions.dDelete('unidadesData','unidades',pky))        
    }   

    const handleEdit = (ite) =>{                
        dispatch({type:'unidadAdd',response:ite})          
    } 

    const handleChange = (e) =>{
        const { value, name } = e.target
        dispatch({type:'unidadChange',name:name,value:value}) 
    }

    const submitHandle = event =>{
        event.preventDefault()    
        if(item.id){            
            dispatch(inventarioActions.putUpdate('unidadesData','unidades',item,'unit'))
        }else{            
            dispatch(inventarioActions.postAdd('unidadesData','unidades',item,'unit'))
        }
        dispatch({type:'unidadReset'}) 
    }
 return(   
    <div className="justify-center items-center flex-1">
        <div className="h-500 p-1 flex flex-row">   
            <div className="w-1/4 border rounded flex-col">
                <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                    <span className='font-bold ml-1 text-gray-500 text-[10px]'>  
                        Datos
                    </span>
                </div>
                <div className='m-2 flex justify-center items-center p-2 border-2'>                        
                    <FormUnidad
                    handleChange={handleChange}                        
                    item={item}
                    submitHandle={submitHandle}
                    />                        
                </div> 
                    
            </div>     
            <div className="w-3/4 border flex-col rounded ml-1">  
                <div className='h-8 border-b bg-gray-50 rounded-t flex items-center'>
                    <FormSearch
                    xredux={'unidadesData'}
                    payload={'unidades'}
                    model={"Unidades"}
                    />
                </div>  
                <div className='h-max flex-col'>
                    <div className="pt-1 pl-1 pr-1">
                        <TableUnidad
                        data={data}                
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        />  
                    </div>    
                    <div className="pl-1 pr-1">
                    <Pagination
                        makeHttpRequestWithPage={ chargeData}
                        total={total}
                        paginas={paginas}
                        pagina={pagina}
                        num={12}
                        />
                    </div> 
                </div>              
            </div>         
        </div>
        <Loading loading={loading}/>          
</div>        
    )
}

export default UnidadesView
