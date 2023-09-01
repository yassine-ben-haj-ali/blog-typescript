import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customRequest } from "../config/Api";

const initialState = {
    loading: false,
    data: [],
    error: ""
}


export const fetchPosts = createAsyncThunk("post/fetchPosts", () => {
    return customRequest.get("post").then(res => res.data)
})


const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
            state.error = ""
        })
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false
            state.data = []
            state.error = action.error.message || "something went wrong!"
        })

    }
})

export default postSlice.reducer