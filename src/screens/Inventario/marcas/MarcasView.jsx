import React,{ useEffect} from "react";
import { useSelector, useDispatch} from 'react-redux'
import { inventarioActions } from '../../../redux/actions/inventario'
import Pagination from '../../../components/Pagination'
import TableMarca from "../../../components/Tables/TableSimple";
import FormSearch from '../../../components/Forms/FormSearch'
import FormMarca from '../../../components/Forms/FormSimple'
import Loading from '../../../components/snippets/Loading'

const MarcasView = () =>{
    const dispatch = useDispatch()      
    const { data, item, total, pagina, paginas } = useSelector(state => state.marca) 
    const {loading }= useSelector(state => state.usuario) 

    const chargeDatas = (page,num) =>{
        dispatch(inventarioActions.getData('marcasData','marcas',page,num,'nombre','ASC'))
    }  

    const chargeData = (page,num) =>{
        if(page > 0){
            dispatch(inventarioActions.getData('marcasData','marcas',page,num,'nombre','ASC'))
        }        
    } 
  
    useEffect(() => {
        chargeDatas(1,12)
        return () => {
            dispatch({type:'marcasReset'})
        };
    }, []);
    
    const handleDelete = (pky) =>{        
        dispatch(inventarioActions.dDelete('marcasData','marcas',pky))        
    }   

    const handleEdit = (ite) =>{                
        dispatch({type:'marcaAdd',response:ite})          
    } 

    const handleChange = (e) =>{
        const { value, name } = e.target
        dispatch({type:'marcaChange',name:name,value:value}) 
    }

    const submitHandle = event =>{
        event.preventDefault()    
        if(item.id){            
            dispatch(inventarioActions.putUpdate('marcasData','marcas',item,'unit'))
        }else{            
            dispatch(inventarioActions.postAdd('marcasData','marcas',item,'unit'))
        }
        dispatch({type:'marcaReset'}) 
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
                <FormMarca
                handleChange={handleChange}                        
                item={item}
                submitHandle={submitHandle}
                />                        
            </div> 
                
        </div>     
        <div className="w-3/4 border flex-col rounded ml-1">  
            <div className='h-8 border-b bg-gray-50 rounded-t flex items-center'>
                <FormSearch
                xredux={'marcasData'}
                payload={'marcas'}
                model={"Marcas"}
                />
            </div>  
            <div className='h-max flex-col'>
                <div className="pt-1 pl-1 pr-1">
                  <TableMarca
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

export default MarcasView
