
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const newsApiHeaders =  {
    'x-rapidapi-key': '6482e15532msh91b527b8d8f948ap16d0a3jsn2b886bbe28c9',
    'x-rapidapi-host': 'google-news13.p.rapidapi.com'
  }
const createRequest = (url) => ({ URL,headers:newsApiHeaders})
export const newsSlice = createApi({

    reducerPath: 'newsSlice',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://google-news13.p.rapidapi.com/search'
    }),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({category}) => createRequest(`https://google-news13.p.rapidapi.com/search/{categpory}`)
        }),
       
    })
})
export const { useGetNewsQuery} = newsSlice
