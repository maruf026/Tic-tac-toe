 import {useState} from 'react';
 
 function Square(){
  const [value, setValue] = useState(null); 
  function clickhandle(){
    setValue('X')
  }
    return (
      <button onClick={clickhandle} className='h-12 w-12 border border-gray-400 m-1 text-lg '>{value}</button>
    );
}


export default function Board(){
    return (
        <>
         <div className='flex'>
         <Square />
         <Square />
         <Square />
         
         </div>

         <div className='flex'>
         <Square />
         <Square />
         <Square />
         
         </div>

         <div className='flex'>
         <Square />
         <Square />
         <Square />
         
         </div>
        </>
    );
}