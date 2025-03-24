import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "AIzaSyBHu93a71VFyGyfXWt-9d3sQgKS4WDmHxo";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tenor.googleapis.com/v2/",
  }),
  endpoints: (builder) => ({
    getSearchResult: builder.query({
      query: (searchTerm) =>
        `search?q=${encodeURIComponent(searchTerm)}&key=${API_KEY}&limit=10`,
    }),
  }),
});

export const { useGetSearchResultQuery } = searchApi;

export default searchApi;
