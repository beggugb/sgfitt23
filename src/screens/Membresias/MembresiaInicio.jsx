import React, {useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom';
import { crudActions } from '../../redux/actions/crud'
import MembresiaTable from './components/MembresiaTable'
import MembresiaInfo from './components/MembresiaInfo'
import MembresiaForm from './components/MembresiaForm'
/**data,total,pagina,paginas,makeHttpRequestWithPage,edit */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons";
const MembresiaInicio = () => {
    const dispatch = useDispatch()         
    let { clienteId } = useParams(); 
    const { item }= useSelector(state => state.cliente)
    const { data, total, pagina, paginas }= useSelector(state => state.membresias)



    const makeHttpRequestWithPage =  (page, num) =>{
      if(page > 0){
        dispatch(crudActions.getDetalle('membresiasData','membresias',page, num, item.id))  
      }      
      
  }
    
    const delHandler = (pky) => {               
      dispatch(crudActions.deleteList('membresiasData','membresias',pky))          
    }

    useEffect(() =>{        
      dispatch(crudActions.getItem('clienteItem','clientes','list',clienteId))      
      return () =>{            
        dispatch({type:'resetMembresia'}) 
        /*dispatch({type:'clientesResetItem'}) */
      };
    }, []);


    return ( 
      <div className="h-550 p-1 border-b ">
        <div className="flex flex-col mb-1">
          <div className="h-8 flex flex-row w-full">
            <div className="w-1/12 pl-1 border-b justify-end">
              <Link to={"/admin/clientes"}>
                <div className="h-7 w-8 text-center rounded-l-md bg-sky-400 hover:bg-sky-300">                        
                  <FontAwesomeIcon icon={faArrowLeft} color="#fff" size="sm"/>
                </div>
              </Link>
            </div>            
            <div className="w-11/12 pl-1 pt-1 border-b">
            <span className="pl-2 text-xs">Edición de membresias  cliente: ( {item.nombres} )</span>    
            </div>           
          </div>

          <div className="h-500 flex p-1"> 
                <div className="w-3/12 border border-gray-300 rounded flex-col">
                    <div className='h-8 border-b bg-gray-100 rounded-t flex items-center pl-2'>
                        <span className='font-bold ml-1 text-gray-500 text-[10px]'>  
                            Datos
                        </span>
                    </div>
                    <div className='flex justify-center items-center p-1'>                        
                      <MembresiaInfo item={item}/>                      
                    </div>          
                </div>     
                <div className="w-9/12 border border-gray-100 rounded ml-1">  
                    <div className='h-12 flex items-center p-1'>
                      <MembresiaForm/>   
                    </div>
                    <div>
                    <MembresiaTable
                      data={data} 
                      total={total}
                      pagina={pagina}
                      paginas={paginas}
                      makeHttpRequestWithPage={makeHttpRequestWithPage}
                      delHandler={delHandler}
                      />
                    </div>
                </div> 
          </div>

          
        </div>
        
      </div>     
     );
}
 
export default MembresiaInicio;