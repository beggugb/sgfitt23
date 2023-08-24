import React from "react";
import {  ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon,ChevronDoubleRightIcon, XMarkIcon, CheckIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";

function Pagination({makeHttpRequestWithPage,total,paginas,pagina, num}) {
  let renderPageNumbers;

  const pageNumber = [];
  if (total !== null) {
    for (let i = 1; i <= paginas; i++) {
      pageNumber.push(i);
    }
    renderPageNumbers = pageNumber.map((number) => {
      let classes = pagina === number ? "border-r-2 h-6 w-8 border-white text-center bg-sky-500 text-white hover:bg-sky-400 text-sm font-bold" 
      : "border-r-2 h-6 w-8 text-gray-500 border-white text-center bg-sky-100 hover:text-white hover:bg-sky-400 focus:outline-none disabled:opacity-25 disabled text-sm";

      if (
        number === 1 ||
        number === total ||
        (number >= pagina - 2 && number <= pagina + 2)
      ) {
        return (
          <button
            key={number}
            className={classes}
            onClick={() => makeHttpRequestWithPage(number, num)}
          >
            {number}
          </button>
        );
      } else {
        return null;
      }
    });
}
return (
  <div className="h-10 border-b border-l border-r flex  bg-gray-50">
      <div className="w-2/6 flex justify-start items-center pr-1 pt-1">
        <div className='w-2/3 flex'>
            <label className='w-32 text-[10px] text-gray-600 pl-2'>Mostrar {num} de {total} items </label>
        </div>
        <div className='w-1/3 flex'>
          
        </div> 
      </div>
      <div className="w-4/6 flex justify-end">
        <ul className="flex p-1 text-xs"> 
          <li 
            className={pagina === 1 ? "border rounded border-gray-200 flex items-center justify-center h-6 w-6 text-gray-400 mr-1 cursor-not-allowed p-1": "border rounded border-gray-300 flex items-center h-6 w-6 text-gray-400 mr-1 hover:bg-gray-200 justify-center p-1" } 
            onClick={() => makeHttpRequestWithPage(pagina === 1 ? 0 : 1,num)}>        
            <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-400"/>
          </li>          
          <li
          className={pagina === 1 ? "border rounded border-gray-200 flex items-center h-6 w-6 justify-center text-gray-400 mr-1 cursor-not-allowed p-1": "border rounded border-gray-300 flex items-center h-6 w-6 text-gray-400 mr-1 hover:bg-gray-200 justify-center p-1" } 
          onClick={() =>makeHttpRequestWithPage(pagina === 1 ? 0: pagina - 1,num)}>        
          <ChevronLeftIcon className="h-5 w-5 text-gray-400" />
          </li>
          <li
          className="h-6 flex items-center">        
          {renderPageNumbers}
          </li>                            
          <li        
          className={pagina === paginas ? "border rounded border-gray-200 flex items-center justify-center h-6 w-6 text-gray-400 mr-1 cursor-not-allowed p-1": "border rounded border-gray-300 flex items-center h-6 w-6 text-gray-400 mr-1 hover:bg-gray-200 justify-center p-1" } 
          onClick={() => makeHttpRequestWithPage(pagina === paginas ? 0 : pagina + 1,num)}>          
          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
          </li>
          <li
          className={paginas === pagina ? "border rounded border-gray-200   flex items-center justify-center h-6 w-6 text-gray-400 mr-1 cursor-not-allowed p-1": "border rounded border-gray-300 h-6 w-6 text-gray-400 mr-1 hover:bg-gray-200 flex items-center justify-center p-1" } 
          onClick={() => makeHttpRequestWithPage(pagina === paginas ? 0: paginas,num)}>
          <ChevronDoubleRightIcon className="h-4 w-4 text-gray-500" />  
          </li>     
        </ul>
     </div> 

  </div>  

  )}

export default Pagination
