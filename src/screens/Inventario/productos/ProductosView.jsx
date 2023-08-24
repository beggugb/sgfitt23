import React,{ useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import ProductoItem from "./components/Views/ProductoItem"
import FormSearch from "../../../components/Forms/SearchParametros"
import Loading from '../../../components/snippets/Loading'
import TableProducto from "./components/Tables/TableProducto";    
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport, faPlus, faCopy, faTrash, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { inventarioActions } from '../../../redux/actions/inventario'
import { useNavigate} from 'react-router-dom'
import Pagination from '../../../components/Pagination'

const ProductosView= () => {
    const dispatch = useDispatch()  
    let navigate = useNavigate();
    const {loading }= useSelector(state => state.usuario) 
    const [showModal, setShowModal] = React.useState(false);
    const { data,  total, pagina, paginas,indicador, modalView } = useSelector(state => state.producto)    


    const chargeDatas = (page,num) =>{
        dispatch(inventarioActions.getData('productosData','productos',page,num,'nombre','ASC'))
    }  

    const chargeData = (page,num) =>{
        if(page > 0){
            dispatch(inventarioActions.getData('productosData','productos',page,num,'nombre','ASC'))
        }        
    } 
    const setIndicador = (pky) => {            
        let iok = pky === indicador  ? 0 : pky
        dispatch({type:'productoIndicador',response:iok}) 
      };
    useEffect(() => {
        chargeDatas(1,12)
        return () => {
            //*cleanup
        };
    }, []);
     
    const editar = () =>{
        if(indicador !==0){
            dispatch(inventarioActions.getItem('productoAdd','productos',indicador))
            navigate('/admin/inventario/productos/new');
        }else{
            navigate('/admin/inventario/productos/new');
        }        
    }

    const toggleModalView = () => {            
        if(indicador !== 0){
            setShowModal(true)
            dispatch(inventarioActions.getItem('productoAdd','productos',indicador))
        }                 
    };  
    
    const copyItem = () =>{
        if(indicador !== 0){
            dispatch(inventarioActions.getCopy('productosData','productos',indicador))
        }        
    }

    const deleteItem = () =>{
        if(indicador !== 0 ){
            dispatch(inventarioActions.dDelete('productosData','productos',indicador))
        }
    } 

    return ( 
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
                    className={indicador === 0 ? "h-6 w-10 text-center bg-sky-200 border-r border-gray-50 " :"h-6 w-10 text-center bg-sky-400 hover:bg-sky-300 border-r border-gray-50"}>                        
                    <FontAwesomeIcon icon={faFileExport} color="#fff" size="sm"/>
                    </div>
                    <div 
                    onClick={()=> copyItem()}
                    className={indicador === 0 ? "h-6 w-10 text-center bg-sky-200 border-r border-gray-50" :"h-6 w-10 text-center  bg-sky-400 hover:bg-sky-300 border-r border-gray-50"}>
                    <FontAwesomeIcon icon={faCopy} color="#fff" size="sm"/>
                    </div>
                    <div 
                    onClick={()=> deleteItem()}
                    className={indicador === 0 ? "h-6 w-10 text-center bg-sky-200 border-r border-gray-50" :"h-6 w-10 text-center  bg-sky-400 hover:bg-sky-300 border-r border-gray-50"}>
                    <FontAwesomeIcon icon={faTrash} color="#fff" size="sm"/>
                    </div>
                    <div 
                    onClick={()=> toggleModalView()}
                    className={indicador === 0 ? "h-6 w-10 text-center bg-sky-200 rounded-r" :"h-6 w-10 text-center bg-sky-400 hover:bg-sky-300 rounded-r"}>
                    <FontAwesomeIcon icon={faFilePdf}  color="#fff" size="sm"/>
                    </div> 
                </div>
    
             
                <div className="w-2/6"></div>
                <div className="w-2/6 flex justify-end pr-4">               
                    <FormSearch
                    xredux={'productosData'}
                    payload={'productos'}
                    inicial={'nombre'}
                    />                            
                </div>
            </div>  

            <div className='h-400 w-full flex-col border'>
                <div className="">
                <TableProducto
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
        <ProductoItem showModal={showModal} setShowModal={setShowModal}/>
        <Loading loading={loading}/>
      </>
     
     );
}
 
export default ProductosView;