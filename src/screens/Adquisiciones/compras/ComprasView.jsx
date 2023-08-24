import React,{ useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate} from 'react-router-dom'
import Pagination from '../../../components/Pagination'
import Loading from '../../../components/snippets/Loading'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faPlus, faCopy, faCheck, faTrash, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { inventarioActions } from '../../../redux/actions/inventario'
import FormSearch from "../../../components/Forms/SearchParametros"
import TableCompras from "./components/Tables/TableCompras"
import CompraModel from "./components/View/CompraView"
let user = JSON.parse(localStorage.getItem('@usuarioFitt'))



const ComprasView= () => {
    const dispatch = useDispatch()  
    let navigate = useNavigate();
    const { data, total, pagina, paginas,indicador, indicadorTotal, indicadorEstado, modalView, modalViews } = useSelector(state => state.compra)    
    const {loading }= useSelector(state => state.usuario) 
    const [showModal, setShowModal] = React.useState(false);

    const chargeDatas = (page,num) =>{
        dispatch( inventarioActions.getData('comprasData','compras',page,num,'id','desc'))
    }
    
    const chargeData = (page,num) =>{
        if(page > 0){
            dispatch( inventarioActions.getData('comprasData','compras',page,num,'id','desc'))
        }        
    }
    const setIndicador = (pky,est,total) => {            
        let iok = pky === indicador  ? 0 : pky        
        dispatch({type:'compraIndicador',response:iok,estado:est,total:total}) 
    };
  
    const toggleModalView = () => {            
        if(indicador !== 0){
            setShowModal(true)
            dispatch( inventarioActions.getItem('compraAdd','compras',indicador))
        }                 
    };  

    const toggleModalViews = () => {                 
        if(indicador !== 0){
            setShowModal(true)
            dispatch( inventarioActions.getItem('compraAdd','compras',indicador))
        }                 
    };
    const editar = () =>{
        if(indicador !==0){
            dispatch( inventarioActions.getItem('compraAdd','compras',indicador))
            navigate('/admin/adquisiciones/compras/new');
        }        
    }
    /*plan, nroPagos, contado, banco, inicial, cuota, total, usuarioId */
    const aprobarItem = (plan,cuota) =>{                
        if(indicador !== 0){
            let iok={ 
                id: indicador,
                plan: plan,
                nroPagos: cuota,
                contado: true,
                banco: true,
                inicial: 0,
                cuota: cuota,
                total: indicadorTotal
            }
                             
            dispatch( inventarioActions.putAprobar('comprasData','compras',iok,'unit'))            
        }               
    }

    const deleteItem = () =>{
        if(indicador !== 0 ){
            dispatch( inventarioActions.dDelete('comprasData','compras',indicador))
        }
    }

    const submitHandle = ()=>{                
        if(indicador !==0){
                dispatch( inventarioActions.getItem('compraAdd','compras',indicador))
                navigate('/admin/compras/nuevo');            
        }
        else{
            let dok={
                usuarioId: user.id
            }
            dispatch( inventarioActions.postAdd('comprasData','compras',dok,'unit'))        
        }        
    }


    useEffect(() => {
        chargeDatas(1,12)
        return () => {
            //*cleanup
        };
    }, []);
    
    return ( 
        <>
        <div className="h-full w-full flex-col">              
            <div className='h-10 w-full bg-gray-100 flex items-center'>
                <div className="w-2/6 flex items-center">
                <div 
                    onClick={()=> submitHandle()}
                    className="h-6 w-10 text-center ml-1 bg-sky-400 hover:bg-sky-300 rounded-l border-r border-gray-50">                        
                    <FontAwesomeIcon icon={faPlus} color="#fff" size="sm"/>
                </div>
                <div 
                onClick={()=> editar()}
                
                className={indicador === 0  || indicadorEstado === 'aprobado'? "h-6 w-10 text-center bg-sky-200 border-r border-gray-50" :
                "h-6 w-10 text-center bg-sky-400 hover:bg-sky-300 border-r border-gray-50"}>                        
                <FontAwesomeIcon icon={faFileExport} color="#fff" size="sm"/>
                </div>
                <div 
                    onClick={()=> deleteItem()}
                    className={indicador === 0 || indicadorEstado === 'aprobado' ? "h-6 w-10 text-center bg-sky-200 border-r border-gray-50" :
                    "h-6 w-10 text-center bg-sky-400 hover:bg-sky-300 border-r border-gray-50"}>
                    <FontAwesomeIcon icon={faTrash} color="#fff" size="sm"/>
                </div>                
                <div 
                    onClick={()=> aprobarItem()}
                    className={indicador === 0 || indicadorEstado === 'aprobado' ? "h-6 w-10 text-center bg-sky-200 border-r border-gray-50" :
                    "h-6 w-10 text-center bg-sky-400 hover:bg-sky-300 border-r border-gray-50"}>
                    <FontAwesomeIcon icon={faCheck} color="#fff" size="sm"/>
                </div>                
                <div 
                onClick={()=> toggleModalViews()}
                className={indicador === 0 || indicadorEstado === 'pendiente' ? 
                "h-6 w-10 text-center bg-sky-200 border-r border-gray-50" 
                :"h-6 w-10 text-center bg-sky-400 hover:bg-sky-300 border-r border-gray-50"}>
                <FontAwesomeIcon icon={faFilePdf}  color="#fff" size="sm"/>
                </div>  
                </div>
    
             
                <div className="w-2/6"></div>
                <div className="w-2/6 flex justify-end pr-4">               
                    <FormSearch
                    xredux={'comprasData'}
                    payload={'compras'}
                    inicial={'observaciones'}
                    />                            
                </div>
            </div>  

            <div className='h-400 w-full flex-col border'>
                <div className="">
                <TableCompras
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
        <CompraModel showModal={showModal} setShowModal={setShowModal}/>
        <Loading loading={loading}/>
      </>
     
     );
}
 
export default ComprasView;