import React from "react";


const TableProducto = ({data,setIndicador,indicador}) =>{
    return(   
    <div className="flex-1 mx-auto p-1"> 
         <table className="border-collapse w-full text-[10px] border-2">          
            <thead>
                <tr className="h-6 bg-gray-200 text-gray-600">                    
                    <th className="w-1/12 border border-slate-300 ">#</th>                    
                    <th className="w-2/12 border border-slate-300">Código</th>
                    <th className="w-5/12 border border-slate-300">Nombre</th>
                    <th className="w-2/12 border border-slate-300">Categoría</th>
                    <th className="w-2/12 border border-slate-300">Industria</th>                    
                </tr>
            </thead>
            {data.length > 0 ?
            <tbody>
                { data.map((item,index) =>(
                <tr key={index} className="hover:bg-gray-100 h-8">
                    <td className="border text-center">
                        <input type="checkbox" 
                          onChange={() => { setIndicador(item.id) }} 
                          checked={ item.id === indicador ? true : false}
                          />
                    </td>                    
                    <td className="border pl-1">{item.codigo}</td>
                    <td className="border pl-1">{item.nombre}</td>
                    <td className="border pl-1">{item.categoria.nombre}</td>                    
                    <td className="border pl-1">{item.industria.nombre}</td>                    
                </tr>
                ))}
            </tbody>
            : 
            <tbody>                
                <tr>                    
                   <td colSpan={5}>Sin resultados</td>                                        
                </tr>                
            </tbody>
            }           
        </table> 
        </div>       
    )
}

export default TableProducto;