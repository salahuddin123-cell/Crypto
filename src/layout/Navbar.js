import React,{useState,useEffect} from 'react'
import DehazeIcon from '@mui/icons-material/Dehaze';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom'
import logo from '../img/svglogo.svg'
const Navbar = () => {
const [open,setOpen]=useState(false)
const style= !open?'visible':'hidden'



  return (
    <div className='flex flex-col md:flex-row fixed  w-full bg-black justify-between px-2 md:px-24  list-none nav '>
     <div className='flex flex-row justify-between'>
     <div className='flex flex-row '>
     <img  className='w-10 h-10 ' src={logo} alt="no" />
      <li><Link to='/'>The Coins</Link></li>
      </div>
     <div className='block md:hidden'>
      {!open? <DehazeIcon onClick={()=>setOpen(!open)} className=' text-white mt-3'  />:
      <CloseIcon onClick={()=>setOpen(!open)} className=' text-white mt-3'  />
  }</div>
    
     </div>
     
       
    
  <div className={` flex-col md:flex-row gap-2 md:gap-12  ${open?'flex':'hidden'} md:flex  py-2 md:py-0 m-auto md:m-0` }>
       <li><Link to='/'>Home</Link></li>
        <li><Link to='/allcrypto'>Crypto Currencies</Link></li>
        <li><Link to='/news'>News</Link></li>
 
    </div>
   
    </div>
  )
}


export default Navbar