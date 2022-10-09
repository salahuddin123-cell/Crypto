
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
const cryptoApiHeaders = {
    'X-RapidAPI-Key': '456b4ba34dmsheac0887fde14a12p18341ejsn476ca173764b',
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