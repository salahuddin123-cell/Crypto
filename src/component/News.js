import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import {Helmet} from "react-helmet";
import { useGetNewsQuery } from '../redux/NewsApiSlice'
const News = () => {
    const {data}=useGetNewsQuery({category:'cryptocurrency'})
   
  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Crypto news</title>  
      </Helmet>
    {data ?
    <div className='mt-10'>
    <div className='grid place-items-center text-white text-2xl'>  <h1 >Top cryptocurrency news</h1></div>
    <div className=' p-4 m-auto   flex gap-4 justify-center items-center flex-col md:flex-row flex-wrap'>
 {data?.articles?.map((elem,i)=>{
  return <div key={i} className='flex flex-col p-4 border rounded-sm  h-60 overflow-hidden  w-9/12 md:w-3/12 bg-white'>
    <div className='flex flex-row'>
       <a className='font-bold' href={elem.url}>{elem.title}</a>
     <img className='rounded-sm' src={elem.articlesarticlesarticles} alt="nill" />
     </div>
     <small className='py-2'>{elem.description}</small>
  </div>
 })}
    </div></div>:<div className='grid place-items-center mt-20'> <ClipLoader
        color={'red'}
        loading={true}
      
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>}
      </>
  )
}

export default News
