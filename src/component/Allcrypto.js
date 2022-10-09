import {useState,useEffect} from 'react'
import { useGetCoinsQuery } from '../redux/ApiSlce'
import ClipLoader from "react-spinners/ClipLoader";
import {Helmet} from "react-helmet";
import { useNavigate } from 'react-router-dom'
const Allcrypto = () => {
  const [input,setinput]=useState(null)
    const { data } =useGetCoinsQuery()
    const [coin,setCoin]=useState(null)
    const navigate=useNavigate()
    const onChange=(e)=>{
       setinput(e.target.value)
    }
    useEffect(()=>{
        setCoin(data!=null?data.data.coins:null)
    
        console.log(data)
      },[data])
      
     const onCryptoClick=async(uuid)=>{ 
         navigate('/cryptodetails/'+uuid)
     }
  return (
    <>
         <Helmet>
        <meta charSet="utf-8" />
        <title>Currencies</title>  
      </Helmet>
 {
    coin?
    <div className='flex flex-col mt-10 justify-center items-center'>
    <div> <input type="text" placeholder='Search the Coin' className='mt-10 w-48 md:w-64 border-0 p-3 rounded-sm h-6 md:h-10' onChange={onChange} value={input} /> </div>
    
    <div className='flex flex-wrap justify-center flex-row p-4'>
    {coin && input!==null?coin.filter(item=>item.name.toLowerCase().includes(input.toLowerCase())).map((elem,i)=>{
            return <div key={i} onClick={()=>onCryptoClick(elem.uuid)} className='w-52   flex justify-center flex-col rounded-md items-center h-48 my-3 mx-12 bg-white'>
                <img className='w-16 h-16' src={elem.iconUrl} alt="no" />
                <b> {elem.rank}.{elem.name}</b>
                
                <b> <small>price</small>  {parseFloat(elem.price).toFixed(2)}$</b>
                <b> <small> change</small> {parseFloat(elem.change).toFixed(3)}%</b>
                </div>
        }):
        coin.map((elem,i)=>{
          return <div key={i} onClick={()=>onCryptoClick(elem.uuid)} className='w-52   flex justify-center flex-col rounded-md items-center h-48 my-3 mx-12 bg-white'>
              <img className='w-16 h-16' src={elem.iconUrl} alt="no" />
              <b> {elem.rank}.{elem.name}</b>
              
              <b> <small>price</small>  {parseFloat(elem.price).toFixed(2)}$</b>
              <b> <small> change</small> {parseFloat(elem.change).toFixed(3)}%</b>
              </div>
      })
        }
    
    
    </div>
    </div>:<div className='grid place-items-center mt-20'> <ClipLoader
        color={'red'}
        loading={true}
      
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>
}
      </>
  )
}

export default Allcrypto