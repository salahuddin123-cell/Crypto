import React, { useState,useEffect } from 'react'
import millify from 'millify'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useGetNewsQuery } from '../redux/NewsApiSlice'
import ClipLoader from "react-spinners/ClipLoader";
import {Helmet} from "react-helmet";
//import { priceHistry } from '../context/Api'
import { useGetCoinsQuery } from '../redux/ApiSlce'
const Home = () => {
   const navigate=useNavigate()
   const {data:newsdata}=useGetNewsQuery({category:'cryptocurrency'})
  const { data, error, isLoading } =useGetCoinsQuery()
  const [coin,setCoin]=useState(null)
  const[stats,setStats]=useState(null)
   
  useEffect(()=>{
    setCoin(data!=null?data.data.coins:null)
    setStats(data!=null?data.data.stats:null)
    
  //  console.log(data)
  },[data])
  
 const onCryptoClick=async(uuid)=>{ 
     navigate('cryptodetails/'+uuid)
 }

  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>The Coins</title>  
      </Helmet>
  { stats && coin?
    <div className='mt-10 '>
    <div className='w-9/12  flex flex-row total flex-wrap m-auto shadow-lg   p-10'>
  {stats&&
 <> 
  <p>Total Coin <br /><b>{stats?.totalCoins}</b></p>
  <p>Tottal Markets <br /><b>{stats?.totalMarkets}</b></p>
  <p>Total Exchanges <br /><b>{stats?.totalExchanges}$</b></p>
  <p>total 24hVolume <br /><b>{millify(stats?.total24hVolume)}$</b></p>
  <p>total MarketCap <br /> <b>{millify(stats?.totalMarketCap)}$</b></p></>
  }  
    </div>
    <h1 className=' flex justify-center text-white text-2xl my-10'>Top 10 Crypto Currency</h1>
    <div className='flex m-6 flex-wrap justify-center flex-row p-4'>
    {coin?.slice(0,10).map((elem,i)=>{
            return <div key={i} onClick={()=>onCryptoClick(elem.uuid)} className='w-56 flex justify-center flex-col rounded-md items-center h-48 m-3 bg-white'>
                <img className='w-16 h-16' src={elem.iconUrl} alt="no" />
                <b> {elem.rank}.{elem.name}</b>
                
                <b> <small>price</small>  {parseFloat(elem.price).toFixed(2)}$</b>
                <b> <small> change</small> {parseFloat(elem.change).toFixed(3)}%</b>
                </div>
        })}
    
    
    </div>
    <div className='flex justify-end text-white mr-10'><Link to="/allcrypto" className='bg-btncolor rounded-r-md p-2'>See other currencies..</Link></div>
  {/* <div className='flex justify-center text-white text-2xl'>  <h1 >Read the latest news</h1></div>
    <div className=' p-4 m-auto flex gap-4 justify-center items-center flex-col md:flex-row flex-wrap'>
 {newsdata?.value.slice(0,6).map((elem,i)=>{
  return <div key={i} className='flex flex-col p-4 border rounded-sm h-56  overflow-hidden w-7/12 md:w-3/12 bg-white'>
    <div className='flex flex-row'>
       <a className='font-bold' href={elem.url}>{elem.name}</a>
     <img className='rounded-sm' src={elem.image?.thumbnail?.contentUrl} alt="nill" />
     </div>
     <small className='py-2'>{elem.description}</small>
  </div>
 })}

    </div>
    <div className='flex justify-end text-white mr-10'><Link to="/news" className='bg-btncolor rounded-r-md p-2'>Read more news..</Link></div> */}
    
    </div>:<div className='grid place-items-center mt-20'> <ClipLoader
        color={'red'}
        loading={true}
      
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>}</>
    
  )
}

export default Home