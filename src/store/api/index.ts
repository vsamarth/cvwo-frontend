import { createApi, fetchBaseQuery,  Api} from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
 const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9000' }),
    tagTypes: ["Tag","Task"],
  endpoints: () => ({}),
})

export default baseApi;