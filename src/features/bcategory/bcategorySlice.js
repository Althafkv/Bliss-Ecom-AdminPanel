import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bcategoryService from "./bcategoryService";

// Get Categories
export const getCategories = createAsyncThunk('blogCategory/get-categories', async (thunkAPI) => {
    try {
        return await bcategoryService.getBlogCategories()
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

// Create New Blog Category 
export const createNewblogCat = createAsyncThunk('blogCategory/create-category', async (catData, thunkAPI) => {
    try {
        return await bcategoryService.createBlogCategory(catData)
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

// Get a Blog Category
export const getABlogCat = createAsyncThunk('blogCategory/get-category', async (id, thunkAPI) => {
    try {
        return await bcategoryService.getBlogCategory(id)
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

// Update a Blog Category
export const updateABlogCat = createAsyncThunk('blogCategory/update-category', async (blogCat, thunkAPI) => {
    try {
        return await bcategoryService.updateBlogCategory(blogCat)
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

// Delete a Blog Category
export const deleteABlogCat = createAsyncThunk('blogCategory/delete-category', async (id, thunkAPI) => {
    try {
        return await bcategoryService.deleteBlogCategory(id)
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const resetState = createAction("Reset_all")
const initialState = {
    bCategories: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const bcategorySlice = createSlice({
    name: "bCategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.bCategories = action.payload
            })
            .addCase(getCategories.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(createNewblogCat.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNewblogCat.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.createBlogCategory = action.payload
            })
            .addCase(createNewblogCat.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(getABlogCat.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getABlogCat.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.blogCatName = action.payload.title
            })
            .addCase(getABlogCat.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(updateABlogCat.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateABlogCat.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.updatedBlogCategory = action.payload
            })
            .addCase(updateABlogCat.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(deleteABlogCat.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteABlogCat.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.deletedBlogCategory = action.payload
            })
            .addCase(deleteABlogCat.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
            .addCase(resetState, () => initialState)
    }
})


export default bcategorySlice.reducer
