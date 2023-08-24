import React, { useState } from 'react';
import { usuarioActions } from '../../redux/actions/usuario'
import { useSelector, useDispatch } from 'react-redux'
import { UserIcon, KeyIcon } from "@heroicons/react/24/outline";

const  Login = () => {
    const dispatch = useDispatch()
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const { bandera }= useSelector(state => state.usuario)

    const submitHandle = event => {       
        event.preventDefault()        
        let us = {
            username : username,
            password: password
        }
        dispatch(usuarioActions.login(us))
    }


    return ( 
        <div className="h-full w-2/3 flex-col p-2">
        <div className='h-14 flex'>
          
        </div>
        <div className='h-440 flex border shadow-md'>
          <div className='flex w-1/2 bg-black items-center justify-center'>              
              <img
              alt="..."
              className="h-14"
              src={require("../../assets/img/logo.png")}
              />
          </div>
  
          <div className='flex-col w-1/2 p-4'>
            <div className="h-20 flex items-center justify-center">
              <UserIcon className="h-10 w-10 text-gray-400" />               
            </div>
            <div className="h-10 flex items-center justify-center">
               <span className='text-gray-400 font-bold' >Login</span>   
            </div>
  
            <form onSubmit={submitHandle} className="h-48 mt-2 w-full p-2"> 
              <div className="mt-2 flex-col border-b text-[11px] text-gray-500">
                  <label htmlFor='username'>Usuario</label>
                  <input
                    className="w-full h-8 border-none text-[10px] hover:border-gray-100 rounded-md"
                    id="username"
                    type="text"
                    name="username"
                    value={username}                    
                    onChange={(e)=>{setusername(e.target.value)}}
                    required
                  />
              </div>
  
              <div className="mt-2 flex-col border-b text-[11px] text-gray-500">
                  <label htmlFor='password'>Password</label>
                  <input
                    className="w-full h-8 border-none text-[10px] hover:border-gray-100 rounded-md"
                    id="password"
                    type="password"
                    name="password"
                    value={password}                    
                    onChange={(e)=>{setpassword(e.target.value)}}
                    required
                  />
              </div>
              <div className="flex-col mt-4 text-[11px] text-gray-500">
                  <button 
                    className="h-8 w-full bg-sky-400 hover:bg-sky-300 rounded-md items-center justify-center flex text-white">
                    ingresar
                  </button> 
              </div>
            </form>  
          </div>
        </div>
        <div className='h-max w-full'>           
           <div className='h-5 w-full flex items-center justify-center text-[9px]'>
            <div className='w-1/2 flex items-center justify-end pr-2'>
              <span className='text-gray-500 font-bold'>developed by</span>
            </div>
            <div className='w-1/2 border-l flex items-center justify-start pl-2'>
              <span className='text-sky-500 font-bold'>Beggu' Gnu</span>
            </div>
           </div>

           <div className='h-5 w-full flex items-center justify-center text-[9px]'>
            <div className='w-1/2 flex items-center justify-end pr-2'>
              <span className='text-gray-500 font-bold'>www.beggu-bo.com</span>
            </div>
            <div className='w-1/2 flex border-l items-center justify-start pl-2'>
              <span className='text-gray-500 font-bold'>Tel: (591) - 78554476</span>
            </div>
           </div>

           <div className='h-5 w-full flex items-center justify-center text-[9px]'>
            <div className='w-full flex items-center justify-center'>
              <span className='text-gray-500 font-bold'>Email: gabgpa@gmail.com</span>
            </div>            
           </div>
        </div>
        
      </div>             
     );
}
 

export default Login ;