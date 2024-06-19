import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchData = createAsyncThunk("fetchData", async (path)=>{
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_DB_TOKEN}`
        }
      }
    const data = await fetch(`${import.meta.env.VITE_DB_URL}${path}?language=ru-RU`, options)
    return data.json()
})

const initialState = {
    popularMovies:null,
    popularSeries:null,
    upcomingMovies:null,
    upcomingSeries:null,
    searchResults:null,
    rating:null,
    infoMovie:null,
    infoSerie:null,
    castsMovie:null,
    castsSerie:null,
    recommendMovie:null,
    recommendSerie:null,
    videoMovie:null,
    videoSerie:null,
}

const dataSlice = createSlice({
    name:"data",
    initialState:initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchData.fulfilled, (state,action)=>{
            const path = action.meta.arg
            if (path.includes('movie/popular')) {
                state.popularMovies = action.payload
            }else if (path.includes('movie/upcoming')) {
                state.upcomingMovies = action.payload
            }else if (path.includes('movie/top_rated')) {
                state.rating = action.payload
            }else if (path.includes('tv/popular')) {
                state.popularSeries = action.payload
            }else if (path.includes('tv/airing_today')) {
                state.upcomingSeries = action.payload
            }else if (path.includes('search/multi')) {
                state.searchResults = action.payload
            }else if (path.match(/movie\/\d+$/)) {
                state.infoMovie = action.payload
            }else if (path.match(/tv\/\d+$/)) {
                state.infoSerie = action.payload
            }else if (path.match(/movie\/\d+\/credits$/)) {
                state.castsMovie = action.payload
            }else if (path.match(/tv\/\d+\/credits$/)) {
                state.castsSerie = action.payload
            }else if (path.match(/movie\/\d+\/recommendations$/)) {
                state.recommendMovie = action.payload
            }else if (path.match(/tv\/\d+\/recommendations$/)) {
                state.recommendSerie = action.payload
            }else if (path.match(/movie\/\d+\/videos$/)) {
                state.videoMovie = action.payload
            }else if (path.match(/tv\/\d+\/videos$/)) {
                state.videoSerie = action.payload
            }
            
        })
    }
})

export default dataSlice.reducer