
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
        baseUrl:'https://bing-news-search1.p.rapidapi.com/news'
    }),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({category}) => createRequest(`https://bing-news-search1.p.rapidapi.com/news/search?q=${category}&freshness=Day&textFormat=Raw&safeSearch=Off&count=10`)
        }),
       
    })
})
export const { useGetNewsQuery} = newsSlice