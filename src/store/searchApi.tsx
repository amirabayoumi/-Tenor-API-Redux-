import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "AIzaSyBHu93a71VFyGyfXWt-9d3sQgKS4WDmHxo";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tenor.googleapis.com/v2/",
  }),
  endpoints: (builder) => ({
    getSearchResult: builder.query({
      query: (searchTerm) => `search?q=${searchTerm}&key=${API_KEY}&limit=10`,
    }),
    getWordSuggestions: builder.query({
      query: (searchTerm) =>
        `search_suggestions?q=${searchTerm}&key=${API_KEY}`,
    }),
  }),
});

export const { useGetSearchResultQuery, useGetWordSuggestionsQuery } =
  searchApi;

export default searchApi;
