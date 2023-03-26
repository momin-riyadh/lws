import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getTags} from "./tagsApi";

const initialState = {
    tags: [],
    isLoading: false,
    isError: false,
    error: "",
}

//Async Thunk
export const fetchTags = createAsyncThunk('tags/fetchTags',
    async () => {
        const tags = await getTags();
        return tags;
    });

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTags.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tags = action.payload;
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.isLoading = false;
                state.tags = [];
                state.isError = true;
                state.error = action.error?.message;
            })
    }
});

export default tagsSlice.reducer;
