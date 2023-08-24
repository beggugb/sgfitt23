import React,{ useEffect} from "react";
import { useSelector, useDispatch} from 'react-redux'
import { inventarioActions }  from '../../../../../redux/actions/inventario'
import TableProveedor from '../Tables/TableProveedor'
import Pagination from '../../../../../components/Pagination'
import FormSearch from "../../../../../components/Forms/SearchParametros";
import { useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faPlus, faCopy, faTrash, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Loading from '../../../../../components/snippets/Loading'

const ProveedoresTable = () =>{
    const dispatch = useDispatch()  
    let navigate = useNavigate();        
    const [showModal, setShowModal] = React.useState(false);
    const { data, item, total, pagina, paginas,indicador,modalView } = useSelector(state => state.proveedor)    
    const {loading }= useSelector(state => state.usuario) 

    const chargesData = (page,num) =>{
        dispatch(inventarioActions.getData('proveedoresData','proveedores',page,num,'razonSocial','ASC'))
    }  

    const chargeData = (page,num) =>{
        if(page > 0){
            dispatch(inventarioActions.getData('proveedoresData','proveedores',page,num,'razonSocial','ASC'))
        }        
    }
    const setIndicador = (pky) => {            
        let iok = pky === indicador  ? 0 : pky
        dispatch({type:'proveedorIndicador',response:iok}) 
      };
    useEffect(() => {
        chargesData(1,12)
        return () => {
            //*cleanup
        };
    }, []);
     
    const editar = () =>{
        if(indicador !==0){
            dispatch(inventarioActions.getItem('proveedorAdd','proveedores',indicador))
            navigate('/admin/adquisiciones/proveedores/new');
        }else{
            navigate('/admin/adquisiciones/proveedores/new');
        }        
    }

    const toggleModalView = (view) => {  
                  
        if(indicador !== 0){
            setShowModal(true)
            dispatch(inventarioActions.getItem('proveedorAdd','proveedores',indicador))
        }                 
    };  
    
    const copyItem = () =>{
        if(indicador !== 0){
            dispatch(inventarioActions.getCopy('proveedoresData','proveedores',indicador))
        }        
    }

    const deleteItem = () =>{
        if(indicador !== 0 ){
            dispatch(inventarioActions.dDelete('proveedoresData','proveedores',indicador))
        }
    }
   

    return(
        <>
        <div className="h-full w-full flex-col">              
            <div className='h-10 w-full bg-gray-100 flex items-center'>
                <div className="w-2/6 flex items-center">
                <div 
                    onClick={()=> editar(indicador)}
                    className="h-6 w-10 text-center ml-1 bg-sky-400 hover:bg-sky-300 rounded-l border-r border-gray-50">                        
                    <FontAwesomeIcon icon={faPlus} color="#fff" size="sm"/>
                </div>
                <div 
                onClick={()=> editar(indicador)}                
                className={indicador === 0  ? "h-6 w-10 text-center bg-sky-200 border-r border-gray-50" :
                "h-6 w-10 text-center bg-sky-400 hover:bg-sky-300 border-r border-gray-50"}>                        
                <FontAwesomeIcon icon={faFileExport} color="#fff" size="sm"/>
                </div>
                <div 
                    onClick={()=> copyItem()}
                    className={indicador === 0 ? "h-6 w-10 text-center bg-sky-200 border-r border-gray-50" :
                    "h-6 w-10 text-center bg-sky-400 hover:bg-sky-300 border-r border-gray-50"}>
                    <FontAwesomeIcon icon={faCopy} color="#fff" size="sm"/>
                </div>                
                <div 
                    onClick={()=> deleteItem()}
                    className={indicador === 0 ? "h-6 w-10 text-center bg-sky-200 border-r border-gray-50" :
                    "h-6 w-10 text-center bg-sky-400 hover:bg-sky-300 border-r border-gray-50"}>
                    <FontAwesomeIcon icon={faTrash} color="#fff" size="sm"/>
                </div>                
                
                </div>
    
             
                <div className="w-2/6"></div>
                <div className="w-2/6 flex justify-end pr-4">               
                    <FormSearch
                    xredux={'proveedoresData'}
                    payload={'proveedores'}
                    inicial={'razonSocial'}
                    />                            
                </div>
            </div>  

            <div className='h-400 w-full flex-col border'>
                <div className="">
                <TableProveedor
                    data={data}
                    setIndicador={setIndicador}
                    indicador={indicador}
                /> 
                </div>
                <div className="p-1">
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
        <Loading loading={loading}/>
      </>
    )
}

export default ProveedoresTable