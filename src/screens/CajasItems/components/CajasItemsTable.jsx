import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { cajaActions } from '../../../redux/actions/caja'
import Moment from 'react-moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import Pagination from '../../../components/Pagination'


function CajasItemsTable () {              
  
  const dispatch = useDispatch()    
  const { data, pagina, paginas, total, modalView } = useSelector(state => state.cajasitems)
  const cajai = useSelector(state => state.cajas.item)

  const [citem, setCitem] = useState({
    id:"",
    createdAt:"",
    label:"",
    tipo:"",
    monto:""
  })
    
  
  const makeHttpRequestWithPage = (page, num) =>{        
    if(page > 0){
      dispatch(cajaActions.getListDetalle('CAJAS_ITEMS_DATA','cajasitems',page, num, cajai.id))  
    }    
  }


  useEffect(() =>{    
      
     return () =>{            
       /* dispatch(crudActions.setReset('CAJAS_ITEMS_RESET'))
        dispatch(crudActions.setReset('CAJAS_RESET_ITEM'))        */
    };
  }, []);

  const toggleModalView = (item) => {    
    let est = modalView === true ? false : true;    
    if(item){
      setCitem(item)  
    }else{
      setCitem({id:"",
    createdAt:"",
    label:"",
    tipo:"",
    monto:""})
    }
    
    dispatch(cajaActions.viewModal('CAJAS_ITEMS_VIEW',est))             
  };
    
  return (    
    <>       
            <div className="flex-1 mx-auto border border-gray-200 p-1 mt-2">
              <table className="border-collapse text-[10px] w-full">
                <thead>
                    <tr className="h-6 bg-gray-100 border text-[10px] text-gray-600">                    
                      <th className="w-1/12">#</th>
                      <th className="w-1/12">Fecha</th>                    
                      <th className="w-5/12">Label</th>
                      <th className="w-1/12">Tipo</th>
                      <th className="w-2/12">$ Monto</th>                    
                      <th className="w-1/12"></th>
                    </tr>
                </thead>
                <tbody>
                    { data && (
                        data.map(item =>(
                            <tr key={item.id} className="hover:bg-sky-100 text-gray-600 h-8 border-stone-300">
                                <td className="pl-1 border text-center">{item.id}</td> 
                                <td className="text-center border"><Moment format="DD/MM/YYYY">{item.registro}</Moment></td>                                                                                                                 
                                <td className="pl-1 border">{item.label}</td>                                
                                <td className="border text-center">{item.tipo}</td>
                                <td className="border text-center">{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.monto)}</td>                              
                                <td className="pl-1 border">
                                  <button 
                                    onClick={() => {toggleModalView(item)}}
                                    className="mt-1 w-10 h-6 rounded bg-red-400 hover:bg-red-300 text-xs text-white">
                                      <FontAwesomeIcon icon={faFilePdf} />
                                  </button>                       
                                </td>
                            </tr>
                        ))
                    )
                    }                    
                    
                </tbody>
                </table>
            </div>
            <div className="">
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

export default CajasItemsTable