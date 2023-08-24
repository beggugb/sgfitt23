import React,{ useState, useRef} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import Moment from 'react-moment'
import { inventarioActions } from '../../../redux/actions/inventario'
import {nombreEmpresa, subEmpresa } from '../../../helpers/data'
import {toastr} from 'react-redux-toastr'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useReactToPrint } from 'react-to-print';
const hoy = new Date()

const ComponentToPrint = React.forwardRef((props,ref)=>{        
    return ( 
        <div ref={ref} className='text-[10px]'>
            <div className="h-14 text-center pt-3">
                <h6 className="font-bold">{nombreEmpresa}</h6>
                <h6 className="font-bold">{subEmpresa}</h6>
            </div>
                        <div className="h-4 p-1 flex flex-row justify-center text-[9px] mt-1">                
                            <p className="w-1/5">Fecha:</p> <p className="pl-3 w-4/5"><Moment format="DD/MM/YYYY">{hoy}</Moment></p>                
                        </div>
                        <div className="h-4 p-1 flex flex-row justify-center text-[9px]">                
                            <p className="w-1/5">Cliente:</p> <p className="pl-3 w-4/5">genérico</p>
                        </div>
                        <div className="h-7 p-1 flex flex-row justify-center text-[9px] border-b">                
                            <p className="w-1/5">Vigencia:</p> <p className="pl-3 w-4/5">
                                <Moment format="DD/MM/YYYY">{hoy}</Moment> - <Moment format="DD/MM/YYYY">{hoy}</Moment>
                            </p>
                        </div>

                        <div className="h-min p-1 mt-1 flex flex-col text-[9px] rounded border">                
                                <div className="h-5 flex p-1 bg-stone-200">   
                                    <span className="w-6/12">Detalle</span>
                                    <span className="w-2/12 text-center">P/U</span>
                                    <span className="w-2/12 text-center">Cant.</span>
                                    <span className="w-2/12 text-center">SubTotal</span>
                                </div>
                                    { props.items.length > 0 ?                                      
                                        props.items.map((it,index)=>(   
                                            <div key={index} className="h-6 flex border-b min-h-max p-1">   
                                                <span className="w-6/12">{it.nombre}</span>
                                                <span className="w-2/12 text-center">{it.valor}</span>
                                                <span className="w-2/12 text-center">{it.cantidad}</span>
                                                <span className="w-2/12 text-center">
                                                {new Intl.NumberFormat('es-BO',{minimumFractionDigits: 2}).format(it.subTotal)}
                                                </span>
                                            </div>
                                        ))
                                    : null
                                    }
                        </div>
                        <div className="h-6 flex bg-stone-100 font-bold text-[9px] pt-1 my-4">
                            <span className="w-4/5 pl-2">
                                Totales
                            </span>                            
                            <span className="w-3/12">
                            {new Intl.NumberFormat('es-BO',{minimumFractionDigits: 2}).format(props.item.totalGeneral)}
                            </span>                           
                        </div>
                        <div className="h-6 flex mt-3 text-[9px] pt-1 italic">
                            <span className="w-4/5 pl-2">
                                Usuario
                            </span>                            
                            <span className="w-3/12">
                            {props.us.nombre}
                            </span>                           
                        </div>
    </div>  
    
    );
})
const FormVenta = ({showModal, setShowModal}) => {    
    const dispatch = useDispatch()        
    const { items, item, categoriaId } = useSelector(state => state.venta) 
    const [ingresado, setingresado] = useState(0);    
    const [cambio, setcambio] = useState(0);
    const componentRef = useRef();

  

    let us = JSON.parse(localStorage.getItem('@usuarioFitt'))

    const submitHandle = event => {       
        event.preventDefault()      
        let nn = item
        nn.usuarioId = us.id
        nn.sucursalId = 1
        nn.clienteId = 2
        nn.categoriaId = categoriaId
        let dato ={
            item: nn,
            items: items
        } 
        
        if( item.totalGeneral > 0){
            dispatch(inventarioActions.postAdd('productosItems','tpv',dato,'unit'))       
            handlePrint()
            setShowModal(false)            
            let ites = []
            let cTotal = 0        
            let gTotal = 0
            dispatch({type:'ventasSetItems',values:ites, cantidad: cTotal, value: gTotal})
        }else{
            toastr.error("Datos faltantes", 'El valor no puede ser 0')   
        }
        
    }

    const calcular = (val) => {
        setingresado(val)
        let cc = parseFloat(val) - parseFloat(item.totalGeneral)  
        let suma = val > 0 && cc > 0 ?  parseFloat(val) - parseFloat(item.totalGeneral)   : 0
        setcambio(suma)
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

    return (         
        <>
        {showModal ?
        <>
        <div className="justify-center items-center flex-1 overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-3 mx-auto max-w-xl flex-row justify-between">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                 <button 
                        onClick={() => setShowModal(false)}
                        className="w-7 h-7 bg-red-500 rounded-full text-xs text-white mt-1 mr-4">
                        <FontAwesomeIcon icon={faTimes} color="#fff" />
                 </button>
                
                <div className="h-96 flex flex-row justify-around p-2">      
                    <div className="w-6/12 border p-2">
                        <ComponentToPrint
                            ref={componentRef}       
                            item={item} 
                            items={items} 
                            us={us}
                        /> 
                    </div>              
                
                    <div className="w-5/12 border-2 p-2">
                        <form onSubmit={ submitHandle} className='mt-4 border w-full rounded p-2'>                                                               
                            <div className="w-full flex">
                                <label className="text-[10px] w-2/5 p-2 block text-gray-500 tracking-wide text-grey-darker font-bold ">
                                    Total
                                </label>
                                <input 
                                    className="text-[10px] h-7 border-gray-300 block w-3/5 bg-grey-lighter text-gray-500 rounded px-2 " 
                                    id="total" 
                                    name="total"
                                    type="number" 
                                    value={item.totalGeneral}
                                    onChange={(e)=>{ ingresado(e.target.value)}} 
                                    readOnly={true}
                                />
                            </div>

                            <div className="w-full flex flex-row mt-3">
                                <label 
                                className="text-[10px] w-2/5 p-2 block text-gray-500 tracking-wide text-grey-darker font-bold ">
                                    Ingresado 
                                </label>
                                <input 
                                    className="text-[10px] h-7 border-gray-300 block w-3/5 bg-grey-lighter text-gray-500 rounded px-2 " 
                                    id="ingresado" 
                                    name="ingresado"
                                    type="number" 
                                    value={ingresado}
                                    onChange={(e)=>{ calcular(e.target.value)}} 
                                />
                            </div>

                            <div className="w-full flex flex-row mt-3">
                                <label 
                                className="text-[10px] w-2/5 p-2 block text-gray-500 tracking-wide text-grey-darker font-bold ">
                                    Cambio
                                </label>
                                <input 
                                    className="text-[10px] h-7 border-gray-300 block w-3/5 bg-grey-lighter text-gray-500 rounded px-2 " 
                                    id="cambio" 
                                    name="cambio"
                                    type="text" 
                                    value={parseFloat(cambio)}
                                    readOnly={true}
                                />
                            </div>

                            <div className="h-10 mt-4 w-full flex items-center justify-center text-[10px]">       
                                <button
                                    className={ingresado >= item.totalGeneral ?"w-40 h-7 border bg-green-600 text-white rounded" :"w-40 h-7 border bg-green-200 text-white rounded cursor-not-allowed"}
                                    type="submit"> Pagar                                
                                </button>                                
                            </div>

                        </form> 
                    </div> 
                </div>                                                          
              </div>
            </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    : null  }
    </> 
    );
}
 
export default FormVenta;



