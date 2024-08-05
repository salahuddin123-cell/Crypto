
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const newsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': process.env.REACT_APP_NEWS_KEY,
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}
const createRequest = (url) => ({ url, headers: newsApiHeaders })
export const newsSlice = createApi({

    reducerPath: 'newsSlice',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://newsapi.org/v2/everything'
    }),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({category}) => createRequest(`https://newsapi.org/v2/everything?q=Apple&from=2024-08-05&sortBy=popularity&apiKey=f0c3d57a81464c7bb27ef68bb0138a26`)
        }),
       
    })
})
export const { useGetNewsQuery} = newsSlice
