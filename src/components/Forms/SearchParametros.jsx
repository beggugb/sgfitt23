import React,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from 'react-redux'
import { inventarioActions } from '../../redux/actions/inventario'


const SearchParametros = ({xredux,payload,inicial}) =>{
    const dispatch = useDispatch()    
    const [value, setValue] = useState("");  

    const submitSearch = event =>{
        event.preventDefault()
        let params = {
            value, 
            prop: inicial
        }
        dispatch(inventarioActions.postSearch(xredux,payload,params))        
    }      

    const handleDelete = () =>{        
        let params = {
            value:"",
            prop: inicial
        }
        dispatch(inventarioActions.postSearch(xredux,payload,params)) 
        setValue("")
    }

return(
        <form onSubmit={submitSearch} className="rounded w-full flex-col text-[10px] ">                
                <div className="w-full flex p-1">                    
                    <input
                        type="text" 
                        name="value" 
                        value={value || ''} 
                        onChange={(e) => setValue(e.target.value)} 
                        className="h-7 pt-2 pl-2 block w-full text-[10px] border text-gray-600 border-gray-300 rounded focus:bg-gray-50 focus:border-gray-100"/>                                                   
                    <button
                        onClick={() => handleDelete()}
                        type="button"
                        className={value ? "h-7 w-10 -ml-20 z-10 text-sm text-red-400":"h-7 w-10 -ml-20 z-10 text-sm text-white" }>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <button
                        type="submit"
                        className="h-7 w-10 z-0 text-sm text-gray-600">  
                        <FontAwesomeIcon icon={faSearch} />
                    </button>    
                </div>                                                                        
        </form>                    
    
)}

export default SearchParametros