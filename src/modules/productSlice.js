
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// JSON Link
const api = "http://localhost:3000/products";

// Fetching All the Data
export const fetchUsers = createAsyncThunk("productSlice/fetchUsers", async () => {
    const res = await axios.get(api);
    return res.data;
});

// Add Product
export const addProduct = createAsyncThunk("productSlice/addProduct", async (product) => {
    const res = await axios.post(api, product);
    return res.data;
});

// Edit Product
export const editProduct = createAsyncThunk("productSlice/editProduct", async (product) => {
    const res = await axios.put(`${api}/${product.id}`, product);
    return res.data;
});

// Delete Product
export const deleteProduct = createAsyncThunk("productSlice/deleteProduct", async (id) => {
    await axios.delete(`${api}/${id}`);
    return id;
});

// Product Slice
const productSlice = createSlice({
    name: "productSlice",
    initialState: {
        data: [],
        error: false,
        loading: true
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = false;
                console.log("PWorking");
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.data = action.payload;
                state.error = false;
                state.loading = false;
                console.log("FWorking");
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.error = true;
                state.loading = true;
                console.log("RWorking");
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.data = [...state.data, action.payload];
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.data = state.data.map(product =>
                    product.id === action.payload.id ? action.payload : product
                );
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.data = state.data.filter(product => product.id !== action.payload);
            });
    }
});

export default productSlice.reducer;