import React,{useEffect, useRef} from "react";
import { useSelector, useDispatch} from 'react-redux'
import { useReactToPrint } from 'react-to-print';
import Moment from 'react-moment'
import 'moment/locale/es-mx'
import { PrinterIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { nombreEmpresa, direccionEmpresa, telefonoEmpresa } from '../../../../../helpers/data'
let user = JSON.parse(localStorage.getItem('@usuarioFitt')) 



const ComponentToPrint = React.forwardRef((props,ref)=>{    
    const fechaHoy = new Date()        
    return(
        <div ref={ref} className="p-4 text-[9px] text-gray-600">
        <div className="h-10 border-b flex border-gray-200 mt-8">
            <div className="w-1/2">
                              
            </div>
            <div className="w-1/2">                    
                <p className="text-right pl-2 font-bold ">{ nombreEmpresa }</p>                
                <p className="text-right pl-2 ">{ direccionEmpresa }</p>
                <p className="text-right pl-2 ">{ telefonoEmpresa }</p>
            </div>
        </div>
            
        <div className="flex-col text-center mt-4">
            <div className='h-6 items-center flex justify-center text-[9px]'>
                <span>Resumen de Compra # <b>{props.pitem.id}</b></span>                     
            </div>                
            <div className='h-5 items-center flex'>
                <div className='w-4/6 flex'>
                    <span className={props.pitem.estado === "pendiente" ? "bg-red-200 pl-1 pr-1 rounded":"bg-green-200 pl-1 pr-1 rounded" }>{props.pitem.estado}</span> 
                </div>
                <div className='w-2/6 flex justify-end'>
                    <h6 className='text-right'>Expresado en : Bolivianos</h6>
                </div>
            </div>
        </div>
                
        {/* end content */}
        <div className="flex-col border w-full mt-1"> 
            <div className="border-b flex h-6 justify-center items-center">
                <p className="w-1/4 pl-1 font-bold">Proveedor</p>
                <p className="w-3/4 pl-1">: { props.pitem.proveedor.razonSocial || "" }</p>
            </div>
                          
            <div className="border-b flex h-6 justify-center items-center">
                <p className="w-2/6 pl-1 font-bold">Fecha</p>
                <p className="w-2/6 pl-1">:<Moment format="DD-MM-YYYY">{ props.pitem.fechaCompra}</Moment></p>
                <p className="w-2/6  pl-1 font-bold">Tipo</p>
                <p className="w-2/6 pl-1">: { props.pitem.tipo }</p>
            </div>

            <div className="border-b flex h-6 justify-center items-center">
                <p className="w-2/6 pl-1 font-bold">Cantidad Items</p>
                <p className="w-2/6 pl-1">: { props.pitem.nroItems}</p>
                <p className="w-2/6 pl-1 font-bold">Total General</p>
                <p className="w-2/6 pl-1">
                : {new Intl.NumberFormat('es-BO',{minimumFractionDigits: 2}).format(props.pitem.totalGeneral)}
                </p>
            </div>

            <div className="flex h-6 justify-center items-center">
                <p className="w-1/4 pl-1 font-bold">Observaciones</p>
                <p className="w-3/4 pl-1">: { props.pitem.observaciones }</p>
            </div>

        </div>        
        {/* end content */}

        <div className='w-full mt-1'>
        <h1 className='h-6 bg-gray-50 border-t border-l border-r pl-1 pt-1 font-bold text-gray-500'>Productos</h1>  
        <div className="flex-1 mx-auto border border-gray-200 p-1">
              <table className="border-collapse text-[9px] w-full">            
            <thead>
                <tr>                                                                             
                    <th className="w-2/12 border border-slate-300 bg-gray-200">Código</th>                                     
                    <th className="w-4/12 border border-slate-300 bg-gray-200">Nombre</th>                    
                    <th className="w-2/12 border border-slate-300 bg-gray-200">Cantidad</th>
                    <th className="w-2/12 border border-slate-300 bg-gray-200">Precio</th>
                    <th className="w-2/12 border border-slate-300 bg-gray-200">SubTotal</th>
                </tr>
            </thead>
            {props.pitems && 
            <tbody>
                { props.pitems.map((it,index) =>(
                <tr key={index}>                                                          
                    <td td className="border pl-1">{it.codigo}</td>                                        
                    <td td className="border pl-1">{it.nombre}</td>
                    <td td className="border text-center">{it.cantidad} / {it.unidad}</td>
                    <td td className="border text-center">
                    {new Intl.NumberFormat('es-BO',{style: "currency",currency:"BOB",minimumFractionDigits: 2}).format(it.valor)} 
                    </td>
                    <td td className="border text-center">
                    {new Intl.NumberFormat('es-BO',{style: "currency",currency:"BOB",minimumFractionDigits: 2}).format(it.subTotal)}  
                    </td>
                </tr>
                ))}
            </tbody>}           
        </table>     
        </div>  
        
    </div>

    <div className='w-full mt-1'>
       
            <h1 className='h-6 bg-gray-50 border-t border-l border-r pl-1 pt-1 font-bold text-gray-500'>Información Financiera</h1> 
                   <div className="h-32 text-center mt-1 text-[9px] flex flex-row">
                        
                        <div className="border w-2/6">
                            <div className="flex flex-row text-left items-center">
                                <p className="h-6 pl-1 w-2/4 font-bold">Nro:</p> 
                                <p className="h-6 pl-1 w-2/4 border-b">{ props.pnota.id}</p>                                                                  
                            </div>                                
                            <div className="flex flex-row text-left items-center">
                                <p className="h-6 pl-1 w-2/4 font-bold">Vencimiento:</p> 
                                <p className="h-6 pl-1 w-2/4 border-b">{ props.pnota.fechaVencimiento}</p>                                                                  
                            </div>
                            <div className="flex flex-row text-left items-center">
                                <p className="h-6 pl-1 w-2/4 font-bold">N. Cuotas:</p> 
                                <p className="h-6 pl-1 w-2/4 border-b">{ props.pnota.cuotas}</p>                                                                  
                            </div>
                            <div className="flex flex-row text-left items-center">
                                <p className="h-6 pl-1 w-2/4 font-bold">Tipo:</p> 
                                <p className="h-6 pl-1 w-2/4 border-b">{ props.pnota.tipo}</p>                                                                  
                            </div>
                            <div className="flex flex-row text-left items-center">
                                <p className="h-6 pl-1 w-2/4 font-bold">Monto Total:</p> 
                                <p className="h-6 pl-1 w-2/4 border-b">
                                {new Intl.NumberFormat('es-BO',{minimumFractionDigits: 2}).format(props.pnota.monto)}
                                </p>
                            </div>
                        </div>

                        <div className="border w-4/6 ml-1">                        
                            <div className="flex-1 mx-auto  p-1">
                                <table className="border-collapse text-[9px] w-full">           
                                        <thead>
                                            <tr>                                                                             
                                                <th className="w-3/12 border border-slate-300 bg-gray-200">Cuota</th>
                                                <th className="w-3/12 border border-slate-300 bg-gray-200">Monto</th>                    
                                                <th className="w-2/12 border border-slate-300 bg-gray-200">F.Pago</th>                    
                                                <th className="w-2/12 border border-slate-300 bg-gray-200">Estado</th>
                                                <th className="w-2/12 border border-slate-300 bg-gray-200">F.Pago</th>                                                
                                            </tr>
                                        </thead>
                                        {props.pplan && 
                                        <tbody>
                                            { props.pplan.map((it,index) =>(
                                            <tr key={index}>                                                          
                                                <td td className="border pl-1">{it.cuota}</td>                    
                                                <td td className="border pl-1">
                                                {new Intl.NumberFormat('es-BO',{minimumFractionDigits: 2}).format(it.importe)}
                                                </td>
                                                <td td className="border pl-1"><Moment format="DD-MM-YYYY">{it.fechaPago}</Moment></td>
                                                <td td className="border pl-1">{it.estado}</td>
                                                <td td className="border pl-1 truncate">{it.fechaPagado ? it.fechaPagado : "sin pago"}</td>
                                            </tr>
                                            ))}
                                        </tbody>}           
                                    </table> 
                            </div>  
                        </div>

                   </div>
    </div>
               

    <div className='flex mt-10'>
        <h5 className="w-1/2 text-left pl-1  italic">fecha emisión : <Moment format="DD/MM/YYYY - HH:mm">{ fechaHoy }</Moment></h5>   
        <h5 className="w-1/2 text-right pr-1  italic">user : { user.nombres }</h5>            
    </div> 

    </div>
    )
})


const CompraView = ({showModal, setShowModal}) =>{
    const dispatch = useDispatch()
    const { nota, plan,  item, items  } = useSelector(state => state.compra)

    const componentRef = useRef()

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

    useEffect(() => {        
        return () => {
            dispatch({type:'compraReset'})
        };
    }, []);

    return(
        
        <>
         { showModal ?
         <>
        <div className="justify-center items-center flex-1 fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="p-1 relative w-auto my-3 mx-auto max-w-lg flex-row justify-between">
                <div className="h-620 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="ml-1 fixed h-10 w-500 border rounded shadow-md flex p-1 justify-between bg-white">                        
                        <button 
                            onClick={() =>handlePrint()}
                            className="w-10 rounded bg-sky-400 text-xs hover:text-gray-200 flex justify-center items-center text-white">                           
                           <PrinterIcon className="h-4 w-4 text-gray-50" />
                        </button>
                        <button 
                            onClick={() => setShowModal(false)}
                            className="w-7 h-7 rounded-full bg-red-400 text-xs flex items-center justify-center text-white font-bold mr-4">                            
                            <XMarkIcon className="h-4 w-4 text-gray-50" />
                        </button>
                    </div>
                    
                    <div className="overflow-y-scroll">
                        <ComponentToPrint
                            ref={componentRef}    
                            pitem={item} 
                            pitems={items}
                            pnota={nota}
                            pplan={plan}
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

export default CompraView