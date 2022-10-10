
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const cryptoApiHeaders = {
    'X-RapidAPI-Key': process.env.REACT_APP_COIN_KEY,
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}
const createRequest = (url) => ({ url, headers: cryptoApiHeaders, params: { referenceCurrencyUuid: 'yhjMzLPhuIDl' } })
export const dataSlice = createApi({

    reducerPath: 'dataSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://coinranking1.p.rapidapi.com/'
    }),
    endpoints: (builder) => ({
        getCoins: builder.query({
            query: () => createRequest('coins')
        }),
        getHistory: builder.query({
            query: ({ uuid, timePeriod }) => createRequest(`coin/${uuid}/history?timePeriod=${timePeriod}`)
        }),
        getDetails: builder.query({
            query: (uuid) => createRequest(`coin/${uuid}`)
        })
    })
})
export const { useGetCoinsQuery, useGetHistoryQuery, useGetDetailsQuery } = dataSlice