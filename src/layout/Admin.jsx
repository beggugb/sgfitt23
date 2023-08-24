import React,{useEffect,useState} from "react";
import { getModulos } from '../routes'
import { Outlet, Routes, Route, Link  } from 'react-router-dom'
import Dashboard from '../screens/Inicio/Dashboard'
import Clientes from '../screens/Clientes/ClientesInicio'
import Membresia from '../screens/Membresias/MembresiaInicio'
import Nota from '../screens/Notas/NotasInicio'
import Caja from '../screens/Cajas/CajasInicio'
import Informes from "../screens/Informes/InformesView";
import Registros from "../screens/Registro/RegistroView"
import Reportes from "../screens/Reportes/ReportesView";
import Configuracion from "../screens/Configuraciones/Inicio"
import Inventario from "../screens/Inventario/Inicio"
import Adquisiciones from "../screens/Adquisiciones/InicioView"
import CajaItems from "../screens/CajasItems/CajasItemsView"
import Tpdv from "../screens/Tpdv/Inicio"
import Membresias from "../screens/Mem/MemInicio"
import { nombreEmpresa } from '../helpers/data'


import { AuthContext }  from '../auth/auth-context'
import NoMatch from '../layout/NoMatch'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";

function Admin(){  
  const { onLogout } = React.useContext(AuthContext)
  const [modulos, setmodulos] = useState([]);
  const [setu, setsetu] = useState(0);  
  let us = JSON.parse(localStorage.getItem('@usuarioFitt')) 
 
  useEffect(() => {
      let kk = getModulos(us.rolId)
      setmodulos(kk)
  }, []);

  const setsetus = (pky,_key) =>{
    setsetu(pky)
    /*dispatch(setModulo(_key))    */
 }

  return(
    <div className="flex-1 mx-auto h-3/4">
      <nav className="h-10 flex bg-gray-500 shadow-lg mb">   
        <div className="w-2/12 p-2 bg-gray-600 text-gray-200 font-bold">
	        {nombreEmpresa}        
        </div>
        <div className="w-7/12 flex-row flex uppercase pl-1 items-center">
          { modulos.map((prop,index)=>(
              <Link 
              onClick={() => setsetus(index,prop.key)}
                to={prop.layout+prop.path}
                className={index === setu ? " bg-sky-500 border-sky-600 uppercase flex items-center justify-left pl-1 pr-1 h-8":"h-8 uppercase border border-gray-500 pl-1 pr-1  hover:bg-sky-400 flex items-center justify-left"}        
                key={prop.key}> 
              <p className="text-[10px] p-2 text-white">{prop.name}</p>
              </Link>              
          ))}
        </div>
        <div className="w-2/12 flex-row flex p-3">
            <FontAwesomeIcon icon={faUser} size="xs" color="#fff"  />
            <span className="pl-5 text-xs text-gray-100">{us.nombre}</span> 
        </div>
        <div className="w-1/12 flex p-1 justify-end">
            <button
              className="shadow-base w-12 h-7 bg-rose-400 text-sm font-bold"
              onClick={() => onLogout()}>
              <FontAwesomeIcon icon={faSignOut} size="1x" color="#fff"  />
            </button>
        </div>
      </nav>
      <Outlet/>
     
      <Routes>
        <Route path="inicio" element={<Dashboard />}/> 
        <Route path="clientes" element={<Clientes />}/> 
        <Route path="cajas" element={<Caja />}/>
        <Route path="informes" element={<Informes />}/>        
        <Route path="reportes" element={<Reportes />}/>
        <Route path="registros" element={<Registros />}/>
        <Route path="tpdv" element={<Tpdv />}/>
        <Route path="configuracion/*" element={<Configuracion />}/>                
        <Route path="membresia/:clienteId" element={<Membresia />}/>        
        <Route path="cajasitems/:cajaId" element={<CajaItems />}/>
        <Route path="notas/:notaId" element={<Nota />}/> 
        <Route path="inventario/*" element={<Inventario />}/>        
        <Route path="adquisiciones/*" element={<Adquisiciones />}/>
        <Route path="membresias" element={<Membresias />}/>
   
        <Route path="*" element={<NoMatch />} /> 
      </Routes>      
    </div>  
    )
}
export default Admin;

