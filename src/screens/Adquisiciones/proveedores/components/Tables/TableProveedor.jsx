import React from "react";

const TableProveedor = ({data,setIndicador,indicador}) =>{
    return(   
        <div className="flex-1 mx-auto p-1"> 
          <table className="border-collapse w-full text-[10px] border-2">             
            <thead>
            <tr className="h-6 bg-gray-200 text-gray-600">                    
                    <th className="w-1/12 border"></th>                    
                    <th className="w-1/12 border">Código</th>
                    <th className="w-5/12 border">Razon Social</th>                    
                    <th className="w-2/12 border">Nit</th>                    
                    <th className="w-2/12 border">Tipo</th>
                    <th className="w-1/12 border">Tipo Fiscal</th>
                </tr>
            </thead>
            {data.length > 0 ?
            <tbody>
                { data.map((item,index) =>(
                <tr key={index} className="hover:bg-gray-300 h-7 border border-stone-300">
                    <td td className="border text-center">
                        <input type="checkbox" 
                          onChange={() => { setIndicador(item.id) }} 
                          checked={ item.id === indicador ? true : false}
                          />
                    </td>                    
                    <td className="pl-1 border">{item.codigo}</td>                    
                    <td className="pl-1 border">{item.razonSocial}</td>
                    <td className="text-center border">{item.nit}</td>
                    <td className="pl-1 border">{item.tipoProveedor}</td>
                    <td className="pl-1 border">{item.tipoFiscal}</td>
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

export default TableProveedor;