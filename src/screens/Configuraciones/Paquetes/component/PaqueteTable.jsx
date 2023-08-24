import React,{useEffect} from 'react'
import Pagination from '../../../../components/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { crudActions} from '../../../../redux/actions/crud'

const MembresiaTable = () => {  
    const dispatch = useDispatch() 
    const { data,total,pagina,paginas } = useSelector(state => state.paquetes)  


    const makeHttpRequestWithPages = (page, num) =>{
        dispatch(crudActions.getData('paquetesData','paquetes', page, num,'nombre','ASC'))   
    }
    const makeHttpRequestWithPage = (page, num) =>{
        if(page>0){
            dispatch(crudActions.getData('paquetesData','paquetes', page, num,'nombre','ASC'))   
        }        
    }
    const itemHandler = (pky) =>{
        dispatch(crudActions.getItem('paquetesItem','paquetes','unit',pky))
    }

    useEffect(() =>{        
        makeHttpRequestWithPages(1,12);    
         return () =>{                                
            dispatch({type:'paquetesReset'})
        };
      }, []);


    return (  
        <>     
            <div className="flex-1 mx-auto  p-1 m-1">
              <table className="border-collapse text-[10px] w-full">
                <thead>
                <tr className="h-6 bg-gray-100 border text-[10px] text-gray-600">                                        
                    <th className="w-5/12 border bg-gray-100 ">Nombre</th>
                    <th className="w-2/12 border bg-gray-100 ">Valor</th>                    
                    <th className="w-1/12 border bg-gray-100 ">Tipo</th>                    
                    <th className="w-1/12 border bg-gray-100 ">Meses</th>
                    <th className="w-2/12 border bg-gray-100 ">Estado</th>
                    <th className="w-1/12 border bg-gray-100 "></th>
                    </tr>
                </thead>
                <tbody>
                    { data && (
                        data.map((item,index) =>(
                            <tr key={item.id} className="hover:bg-sky-100 text-gray-600 h-7 border-stone-300">
                                <td className="border pl-1">{item.nombre}</td>
                                <td className="border text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.valor)}</td>                      
                                <td className="border text-center">{item.diario ? 'diario': 'normal'}</td>                                
                                <td className="border pl-1 text-center">{item.meses}</td>
                                <td className={item.enabled ? "border pl-1 bg-green-300 text-center":"text-center border pl-1 bg-red-300"}>{item.enabled ? "Habilitado":"Desabilitado"}</td>
                                <td className="border">   
                                <div className='h-6 flex justify-center items-center'>
                                    <button 
                                    className="w-10 h-5 rounded bg-sky-400 hover:bg-sky-300 text-xs text-white"
                                    onClick={() => {itemHandler(item.id)}} >
                                    <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </div>                                                          
                                </td>
                            </tr>
                        ))
                    )
                    }                    
                    
                </tbody>
                </table>
            </div>
            <div className="pl-1 pr-1">
               <Pagination
               makeHttpRequestWithPage={ makeHttpRequestWithPage}
               total={total}
               paginas={paginas}
               pagina={pagina}
               num={12}
               />
            </div>
        </>
     );
}
 
export default MembresiaTable;