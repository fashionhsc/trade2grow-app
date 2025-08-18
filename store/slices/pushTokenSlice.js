import { API_URL } from '@env';
import axios from "axios";


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    pushToken: null
}

export const savePushToken = createAsyncThunk('/notify/save-token',
    async (requestObj, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/notify/save-token`, requestObj, {
                withCredentials: true,
            });
            return response.data;
        } catch (err) {
            return rejectWithValue(
                err.response?.data || { message: err.message }
            );
        }
    }
);



const pushTokenSlice = createSlice({
    name: 'pushtoken',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(savePushToken.pending, (state) => {
                state.pushToken = null;
            })
            .addCase(savePushToken.fulfilled, (state, action) => {
                state.pushToken = action.payload.data || null;
            })
            .addCase(savePushToken.rejected, (state, action) => {
                state.pushToken = null;
            })
    }
})


export default pushTokenSlice.reducer;