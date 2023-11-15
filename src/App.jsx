import { useState,useCallback,useEffect,useRef } from 'react'



function App() {
  const [length,setLength]=useState(8)
  const[numallow,setNum]=useState(false);
  const[charallow,setChar]=useState(false)
  const[password,setPassword]=useState("")

  //useRef hook
  const passwordRef=useRef(null)

  
  const paaswordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWabcdefghijklmnopqrstuvwxyz"
    if(numallow){
      str+="0123456789"
    }
    if(charallow){
      str+="!@#$%^&*()~"
    }
   
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)

  },[length,numallow,charallow,setPassword])

  const copyPassToClip=useCallback(()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{paaswordGenerator()},[length,numallow,charallow,paaswordGenerator])


  return (
    <>
       <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800 '>
          <h1 className='text-white text-center my-3'>Password Generator</h1>
       <div className='flex shadow rounded-lg overflow-hidden mb-4'> 
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0'
           onClick={copyPassToClip}
          >Copy</button>
       </div>
       <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
        <input type="range" min={8} max={100} value={length} className='cursor-pointer' 
        onChange={(e)=>{setLength(e.target.value)}}/>
        <label>Length : {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
           type="checkbox"
           defaultChecked={numallow}
           id="numberInput"
           onChange={()=>{setNum((prev)=>!prev)}}
           
          
          />
          <label htmlFor='numberInput'>Number</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
           id="charInput"
           defaultChecked={charallow} 
           onChange={()=>{setChar((prev)=>!prev)}}
           />
           <label>Character</label>

        </div>
       </div>
       </div>
    </>
  )
}

export default App
