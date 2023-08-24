import React from 'react';
import { useSelector } from 'react-redux'
function CajaDetalle() {              
  const item  = useSelector(state => state.cajas.item)  

  return (    
  <div className='h-max w-full flex-col text-[10px] text-gray-600'>
    <div className='h-5 flex w-full'>
        <div className='h-5 bg-sky-200 w-1/4 flex items-center justify-center'>
          <span>Inicial</span>
        </div>
        <div className='h-5 bg-green-200 w-1/4 flex items-center justify-center'>
          <span>Σ Ingresos</span>
        </div>
        <div className='h-5 bg-red-200 w-1/4 flex items-center justify-center'>
          <span>Σ Egresos</span>
        </div>
        <div className='h-5 bg-stone-200 w-1/4 flex items-center justify-center'>
          <span>Σ Total</span>
        </div>
    </div>
    <div className='h-7 flex w-full'>
        <div className='h-7 border w-1/4 flex items-center justify-center'>
          <span>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoInicial)}</span>
        </div>
        <div className='h-7 border w-1/4 flex items-center justify-center'>
          <span>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoIngreso)}</span>
        </div>
        <div className='h-7 border w-1/4 flex items-center justify-center'>
          <span>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoEgreso)}</span>
        </div>
        <div className='h-7 border w-1/4 flex items-center justify-center'>
          <span>{new Intl.NumberFormat('de-DE',{style: "currency",currency:"BOB"}).format(item.montoFinal)}</span>
        </div>
    </div>
  </div> 

  );
}

export default CajaDetalle