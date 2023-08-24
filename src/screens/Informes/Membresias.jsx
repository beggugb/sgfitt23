import React,{useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useReactToPrint } from 'react-to-print';
import Moment from 'react-moment';
import { PrinterIcon } from "@heroicons/react/24/outline";
import { nombreEmpresa, direccionEmpresa, telefonoEmpresa } from '../../helpers/data'
const ComponentToPrint = React.forwardRef((props,ref)=>{    
    const fechaHoy = new Date();
    return ( 
        <div ref={ref} className="pl-8 pr-8 pt-2 text-[9px] text-gray-500 w-full">            
        
        <div className="h-10 border-b flex border-gray-200 mt-4">
            <div className="w-1/2">
                              
            </div>
            <div className="w-1/2">                    
                <p className="text-right pl-2 font-bold ">{ nombreEmpresa }</p>                
                <p className="text-right pl-2 ">{ direccionEmpresa }</p>
                <p className="text-right pl-2 ">{ telefonoEmpresa }</p>
            </div>
        </div>

        <div className="h-9 text-center mt-8">
            <h6 className="font-bold">Informe de Membresias</h6>                                                           
            <h6>
                ( <Moment format="DD/MM/YYYY">{props.pdesde}</Moment> ) - 
                ( <Moment format="DD/MM/YYYY">{props.phasta}</Moment> )
            </h6>
            <h6 className="ml-3" >Total: 
            {new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(props.pdetalle)}
            </h6> 
        </div>

        <div className="h-5 text-left mt-4">            
        <h6 >Expresado en : (Bolivianos)</h6>                                             
        </div>

        

        <div className='w-full mt-4'>
            <table className='border-collapse w-full'>
                <thead>
                    <tr className='h-7 border bg-gray-100'>                    
                        <th className='w-1/12 border'>#</th>           
                        <th className='w-3/12 border'>Nombres</th>           
                        <th className='w-2/12 border'>Paquetes</th>                                                                                         
                        <th className='w-2/12 border'>F.Registro</th>    
                        <th className='w-2/12 border'>Monto</th>
                        <th className='w-2/12 border'>Usuario</th>                        
                    </tr>
                </thead>

                <tbody>
                    { props.pdata.map((it,index)=>(
                        <tr key={index} >
                            <td className='border text-center'>{it.id}</td>
                            <td className="border pl-1 truncate">{it.cliente ? it.cliente : 'n'}</td>                              
                            <td className="border pl-1">{it.paquete ? it.paquete : 'n'}</td>
                            <td className='border text-center'>                                
                            <Moment format="DD/MM/YYYY">{it.registro}</Moment></td>                                               
                            <td className="border text-center">
                                                               {new Intl.NumberFormat('es-BO',{minimumFractionDigits: 2}).format(it.ingresos)}</td>
                            <td className="border pl-1">{it.usuario ? it.usuario : 'n'}</td>
                            
                        </tr>
                    ))}     
                </tbody>
            </table>    
        </div>           

    
        
        <div className='flex mt-6 mb-6'>
            <h5 className="w-1/2 text-left pl-1 italic">fecha emisión : <Moment format="DD/MM/YYYY - HH:mm">{ fechaHoy }</Moment></h5>   
            <h5 className="w-1/2 text-right pr-1 italic">user : {props.puser.username}</h5>            
        </div>            
        {/* end content */}

    </div>
     );
    }
)

const Membresias = () => {    
    const dispatch = useDispatch()
    const componentRef = useRef();   
    const {detalle, membresias, desde, hasta } = useSelector(state => state.informes)
    let us = JSON.parse(localStorage.getItem('@usuarioFitt'))  
   
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    
     useEffect(() =>{        
         return () =>{            
            dispatch({type:'INFORMES_RESET'})  
        };
      }, []);

    return(
        <div className="h-auto w-full flex-col justify-center">
        <div className='h-7  border-gray-200 border flex w-full bg-gray-50 justify-end p-4 items-center'>                 
                <button 
                    onClick={() =>handlePrint()}
                    className="ml-2 h-6 w-10 bg-gray-50 hover:bg-gray-100 rounded border-2 hover:text-gray-200 flex justify-center items-center text-white">                                           
                    <PrinterIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                </button> 
        </div>

        <div className='h-500 flex w-full overflow-y-scroll p-1 justify-center'>
            <div className='h-max border shadown flex w-9/12 bg-white'>
                <ComponentToPrint
                ref={componentRef}                          
                pdetalle={detalle}
                pdata={membresias}
                pdesde={desde}
                phasta={hasta}
                puser={us}
                />
            </div>
        </div>
</div> 
         )
    }



 
export default Membresias;