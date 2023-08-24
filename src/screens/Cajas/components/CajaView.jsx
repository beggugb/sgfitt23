import React,{useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useReactToPrint } from 'react-to-print';
import { nombreEmpresa } from '../../../helpers/data'
import Moment from 'react-moment';
import { PrinterIcon, XMarkIcon } from "@heroicons/react/24/outline";

const ComponentToPrint = React.forwardRef((props,ref)=>{    
    const fechaHoy = new Date();
    return ( 
        <div ref={ref}>
        <div className="p-1 flex flex-row text-[9px] text-gray-600 mt-10">
            <div className="w-full p-2 justify-center items-center flex"> 
                <div className="w-full">  
                    <div className="h-7 flex flex-row">
                       <h5 className="w-1/2 text-left p-1 font-bold ">{nombreEmpresa}</h5>                         
                    </div>

                    <div class="w-full text-center">
                    <p className="pr-2 text-right italic">Fecha emisión : <Moment format="DD/MM/YYYY - HH:mm">{ fechaHoy }</Moment></p>  
                    <p className="pr-2 text-right italic">Usuario : {props.puser.nombre}</p>  
                </div>



                    <div className="h-16 text-center mt-5">
                        <h6 className="font-bold">Resumen Caja</h6>
                        <h6 className="font-bold">Fecha Caja : <Moment format="DD/MM/YYYY">{ props.pcaja.createdAt }</Moment></h6>
                        <h6 className="font-bold">Fecha Emisión : <Moment format="DD/MM/YYYY">{ fechaHoy }</Moment></h6>
                    </div>

                <div className="p-2">
                    <div className="p-1 flex flex-row justify-center border-b">
                        <p className="w-2/12 font-bold">Nro:</p>                    
                        <p className="w-4/12 ">{props.pcaja.id}</p>

                        <p className="w-2/12 font-bold">Usuario:</p>                    
                        <p className="w-4/12 ">{props.puser.nombre}</p>
                    </div>

                    <div className="p-1 flex flex-row justify-center border-b">
                        <p className="w-2/12 font-bold">Inicial:</p>                    
                        <p className="w-4/12 ">
                        {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(props.pcaja.montoInicial)}
                        </p>

                        <p className="w-2/12 font-bold">Ingresos:</p>                    
                        <p className="w-4/12 ">
                        {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(props.pcaja.montoIngreso)}
                        </p>
                    </div>

                    <div className="p-1 flex flex-row justify-center border-b">
                        <p className="w-2/12 font-bold">Egresos:</p>                    
                        <p className="w-4/12 ">
                        {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(props.pcaja.montoEgreso)}
                        </p>

                        <p className="w-2/12 font-bold">Total:</p>                    
                        <p className="w-4/12 ">
                        {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(props.pcaja.montoFinal)}
                        </p>
                    </div>
                </div>    

                <div className="flex-1 mx-auto border border-gray-200 p-1 mt-1"> 

                <table className="w-full text-[9px] font-gray-600">
                    <thead>
                        <tr>                    
                        <th className="w-1/12 border border-slate-300 bg-gray-100">#</th>
                        <th className="w-2/12 border border-slate-300 bg-gray-100">Fecha/Hora</th>                                            
                        <th className="w-3/12 border border-slate-300 bg-gray-100">Detalle</th>
                        <th className="w-1/12 border border-slate-300 bg-gray-100">Tipo</th>
                        <th className="w-2/12 border border-slate-300 bg-gray-100">Monto</th>
                        <th className="w-2/12 border border-slate-300 bg-gray-100">Membresia</th>
                        <th className="w-1/12 border border-slate-300 bg-gray-100">Vigencia</th>                    
                        </tr>
                    </thead>
                    <tbody>
                        { props.data && (
                            props.data.map(item =>(
                                <tr key={item.id} className="hover:bg-gray-100 h-7">
                                    <td className="border pl-1">{item.id}</td>  
                                    <td className="border pl-1"><Moment format="DD/MM/YYYY">{item.registro}</Moment> - {item.hora}</td>                                    
                                    <td className="border pl-1">{item.label}</td>    
                                    <td className="border pl-1">{item.tipo}</td>    
                                    <td className="border text-center">{new Intl.NumberFormat('es-BO',{minimumFractionDigits: 2}).format(item.monto)}</td>
                                    <td className="border pl-1">{item.membresia}</td>
                                    <td className="border pl-1">{item.vigencia}</td>
                                </tr>
                            ))
                        )
                        }                    
                        
                    </tbody>
                </table>
             
                
                </div> 

                </div>                 
            </div>
        </div>
        </div>
     );
})

const CajaView = ({view,setview }) => {    
    const dispatch = useDispatch()
    const componentRef = useRef();   
    const { item }= useSelector(state => state.cajas)
    const citems = useSelector(state => state.cajasitems.data)
    let user = JSON.parse(localStorage.getItem('@usuarioFitt'))

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    
     useEffect(() =>{        
         return () =>{            
            dispatch({type:'CAJAS_ITEMS_RESET'})
            dispatch({type:'RESET_CAJA'})
        };
      }, []);
    return(
        <>
    { view ?
        <>
        <div className="justify-center items-center flex-1 fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="p-1 relative w-auto my-3 mx-auto max-w-xl flex-row justify-between">
                <div className="h-620 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="ml-1 fixed h-10 w-550 border rounded shadow-md flex p-1 justify-between bg-white">                        
                        <button 
                            onClick={() =>handlePrint()}
                            className="w-10 rounded bg-sky-400 text-xs hover:text-gray-200 flex justify-center items-center text-white">                           
                           <PrinterIcon className="h-4 w-4 text-gray-50" />
                        </button>
                        <button 
                            onClick={() => setview(false)}
                            className="w-7 h-7 rounded-full bg-red-400 text-xs flex items-center justify-center text-white font-bold mr-4">                            
                            <XMarkIcon className="h-4 w-4 text-gray-50" />
                        </button>
                    </div>
                    
                    <div className="overflow-y-scroll">
                        <ComponentToPrint
                           ref={componentRef}          
                           puser={user}
                           pcaja={item}
                           data={citems}      
                        />                          
                    </div>                                                              
                </div>    
            </div>        
        </div>  
        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
        </>
    : null  }
    </>  
         )
    }
 
export default CajaView;