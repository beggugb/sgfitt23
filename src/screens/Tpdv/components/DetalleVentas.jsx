const DetalleVentas = ({item}) => {    
    return ( 
        <div className="h-14 w-full flex-col text-[11px] font-bold bg-sky-200">            
            <div className="h-7 flex pl-1 border-b text-gray-600 ">
                <div className="w-1/2 flex pt-1 pl-1">
                Cantidad:
                </div>
                <div className="w-1/2 flex border-l pt-1 pl-1">
                {item.nroItems}
                </div>             
            </div>
            
            <div className="h-7 pl-1 flex border-b border-gray-50">
                <div className="w-1/2 flex pt-1 pl-1">
                Total:
                </div>
                <div className="w-1/2 flex border-l pt-1 pl-1">
                {new Intl.NumberFormat('es-BO',{style: "currency",currency:'BOB',minimumFractionDigits: 2}).format(item.totalGeneral)}
                </div>            
            </div>
        </div>     
     );
}
 
export default DetalleVentas;



