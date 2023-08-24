import React from "react";
const FormSimple = ({handleChange,item,submitHandle}) =>{      
    return(        
    <div className="bg-white px-2  mb-2 flex flex-col w-full"> 
        <form onSubmit={ submitHandle}>
        <div className="-mx-3">
            <div className="md:w-full mb-1">
            <label className="block text-gray-500 tracking-wide text-grey-darker text-[10px] font-bold mb-2">
                Nombre
            </label>
            <input 
                className="h-7 border-gray-300 block w-full bg-grey-lighter text-[10px] text-grey-darker rounded py-2 px-2 mb-2" 
                id="nombre" 
                name="nombre"
                type="text" 
                value={item.nombre}
                required={true}
                onChange={(e)=>{ handleChange(e)}} 
                />                
                {/*<p className="text-red text-[10px] italic">Please fill out this field.</p>*/}
            </div>   
        </div>  
        <div className="-mx-3">
            <div className="md:w-full mb-1">
            <label className="block text-gray-500 tracking-wide text-grey-darker text-[10px] font-bold mb-2">
                Abreviación
            </label>
            <input 
                className="h-7 border-gray-300 block w-full bg-grey-lighter text-[10px] text-grey-darker rounded py-2 px-2 mb-2" 
                id="abreviacion" 
                name="abreviacion"
                value={item.abreviacion}
                onChange={(e)=>{ handleChange(e)}} 
                type="text" />                
                {/*<p className="text-red text-[10px] italic">Please fill out this field.</p>*/}
            </div>   
        </div>
        <div className="-mx-3 flex">
            <button 
                type="submit"
                className="border-2 w-full mt-1 rounded bg-sky-400 hover:bg-sky-300 p-1  text-[10px] text-white">
              
                {' '} {item.id ? " Actualizar" : " Guardar"}
            </button>
        </div>
      </form>  
    </div>          
    )    
}

export default FormSimple