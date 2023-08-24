import React, { useState, useEffect } from 'react';
import { crudActions } from '../../redux/actions/crud'
import { useDispatch, useSelector } from 'react-redux'
import RegistroForm from './components/RegistroForms'
import {api} from '../../helpers/api'
import Moment from 'react-moment'

const  RegistroView = () => { 
  const { cliente, membresia, mensaje, bandera  } = useSelector(state => state.registros)
  const [mount, setMount] = useState(false) 
  const audioTune1 = new Audio(`${api}/static/audios/acceso.mp3`);
  const audioTune2 = new Audio(`${api}/static/audios/denegado.mp3`);

  const [playInLoop1] = useState(false);
  const [playInLoop2] = useState(false);
 
  const playSound1 = () => {
    audioTune1.play();
  }
  const playSound2 = () => {
    audioTune2.play();
  }

   useEffect(() => {
     if(!mount) {
      setMount(true); 
      audioTune1.load();
      audioTune2.load();
    }
    }, [mount,audioTune1,audioTune2])

     useEffect(() => {
      if(!mount) {
      setMount(true); 
      audioTune1.loop = playInLoop1;
      audioTune2.loop = playInLoop2;
      }
    },[playInLoop1,playInLoop2,audioTune1.loop,audioTune2.loop,mount])
 
    switch(bandera){
      case 1:
        playSound1()
      break;
      case 2:
        playSound2()
      break;
      case 3:
        playSound2()
      break;  
      default:
      break;
    }  

 
return ( 
  <div className="h-600 flex-col border-black"> 
    <div className='h-24  bg-black border border-black flex w-full items-center'>
      <div className='w-1/2  border border-black flex justify-start pl-2'>
       <img
        alt="..."
        className="h-20"
        src={require("../../assets/img/logo.png")}
        />
      </div>
      <div className='w-1/2 border border-black flex-col'>
        <div className='w-full h-10 border  border-black flex'>

        </div>
        <div className='w-full h-10 border border-black flex'>
            <RegistroForm/>
        </div>
      </div>
    </div>        
    
    <div className='h-500 border border-black flex w-full'>
        <div className='w-1/2 border border-black flex items-center  justify-center bg-black'>
            <img
                alt=""
                className="h-500 flex w-full bg-gray-600"
                src={api + "/static/images/clientes/lg/" + cliente.filename}
                />
        </div>
        <div className='w-1/2 border border-black flex-col'>
                <div className="h-20 flex flex-row border-2 bg-gray-100 justify-between">
                    <p className="pt-6 pl-4 w-2/5 border-2 bg-green-400">NOMBRES :</p> 
                    <p className="pt-6 pl-4 w-3/5 border-2">{cliente.nombres}</p> 
                </div>

                <div className="h-20 flex flex-row border-2 bg-gray-100 justify-between">
                    <p className="pt-6 pl-4 w-2/5 border-2 bg-green-400">CI :</p> 
                    <p className="pt-6 pl-4 w-3/5 border-2">{cliente.ci}</p> 
                </div>

                <div className="h-20 flex flex-row border-2 bg-gray-100 justify-between">
                    <p className="pt-6 pl-4 w-2/5 border-2 bg-green-400">PAQUETE :</p> 
                    <p className="pt-6 pl-4 w-3/5 border-2">{membresia.paquete}</p> 
                </div>

                <div className="h-20 flex flex-row border-2 bg-gray-100 justify-between">
                    <p className="pt-6 pl-4 w-2/5 border-2 bg-green-400">VENCIMIENTO :</p> 
                    <p className="pt-6 pl-4 w-3/5 border-2">
                    <Moment format="DD/MM/YYYY">{membresia.fvigencia}</Moment>
                    </p> 
                </div>
                <div className="h-44 flex w-full border  text-white text-4xl">
                    <div className={bandera === 1 ?"h-44 items-center justify-center flex w-full bg-green-500 border-2" :"h-44 items-center justify-center flex bg-red-500 w-full border-2" }>
                        <span>{mensaje} </span>
                    </div>                      
                </div> 
        </div>      
    </div>
  </div> 
);
}
 

export default RegistroView ;
