import { Line } from 'react-chartjs-2'
import { Chart as ChartJs } from 'chart.js/auto'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import millify from 'millify'
import { useGetHistoryQuery, useGetDetailsQuery } from '../redux/ApiSlce'
import { useGetNewsQuery } from '../redux/NewsApiSlice'
import ClipLoader from "react-spinners/ClipLoader";
const time = ['7d', '3h', '24h', '30d', '3m', '1y', '3y', '5y']

//import LineChart from './LineChart'
const CryptoDetails = () => {
    const { uuid } = useParams()
    const [timePeriod, settimePeriod] = useState('7d')
    const { data } = useGetHistoryQuery({ uuid, timePeriod })
    const { data: coinDetails } = useGetDetailsQuery(uuid)

    const [details, setDetails] = useState(null)
    const [prices, setprices] = useState(null)
    const [pricelist, setpriceList] = useState(null)
    const [datelist, setdateList] = useState(null)

    const {data:newsData}=useGetNewsQuery({category:details?.name})
    useEffect(() => {
        const list = coinDetails != null ? coinDetails.data.coin : null
        console.error(coinDetails ? data : null)
        setDetails(list)
        setprices(data?.data?.history)
        const priceList = []
        const dateList = []
        for (let i = 0; i < prices?.length; i++) {
            priceList.push(prices[i].price)
            // let date=new Date(prices[i].timestamp*1000)
            if(timePeriod=='3h'||timePeriod=='24h'){
                dateList.push((new Date(prices[i].timestamp * 1000).toLocaleTimeString()))
            }else{
                dateList.push((new Date(prices[i].timestamp * 1000).toLocaleDateString()))
            }
            
        }
        setpriceList(priceList !== [] ? priceList.reverse() : null)
        setdateList(dateList !== [] ? dateList.reverse() : null)
    }, [coinDetails, data, prices, timePeriod, uuid])

    return (
        details?
       <div className=' flex flex-col justify-center mt-10'>
            <div className='w-9/12 h-2/5 m-auto shadow-lg text-white p-5'>
                <h1 className='text-2xl font-extrabold'>{details?.name}</h1>
                <p> Price <br /><b>{parseFloat(details?.price).toFixed(2)}$</b></p>
                <p>Market Cap <br /><b>{millify(parseFloat(details?.marketCap).toFixed(2))}</b></p>
                <p>Changes <br /><b>{parseFloat(details?.change).toFixed(2)}</b></p>
                <p>listed at <br /> <b>{new Date(details?.listedAt * 1000).toLocaleDateString()}</b></p>
            </div>
        
            
            <div className='self-center my-10'>
                <select onChange={(e) => settimePeriod(e.target.value)}>
                    {time.map(elem => {
                        return <option value={elem}>{elem}</option>
                    })}

                </select>
            </div>

            <div className=' w-9/12  m-auto bg-black '>
                <Line

                    data={{
                        labels: datelist,
                        datasets: [{
                            label: 'Prices',
                            data: pricelist,

                            backgroundColor: 'green',   
                            borderColor: 'blue',


                            borderWidth: 1
                        }]
                    }}

                />
            </div>
            <div className='flex items-center justify-center text-white text-2xl'>
                <h1>Top {details?.name||''} news from Today</h1>
            </div>
            <div className=' p-4 m-auto flex gap-4 justify-center items-center flex-col md:flex-row flex-wrap'>
 {newsData?.value.slice(0,6).map(elem=>{
  return <div className='flex flex-col p-4 border rounded-sm h-60 overflow-hidden w-9/12 md:w-3/12 bg-white'>
    <div className='flex flex-row'>
       <a className='font-bold' href={elem.url}>{elem.name}</a>
     <img className='rounded-sm' src={elem.image?.thumbnail?.contentUrl} alt="nill" />
     </div>
     <small className='py-2'>{elem.description}</small>
  </div>
 })}
    </div>
        </div>:<div className='grid place-items-center mt-20'> <ClipLoader
        color={'red'}
        loading={true}
      
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>
    )
}

export default CryptoDetails