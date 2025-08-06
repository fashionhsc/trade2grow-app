import { API_URL } from '@env';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    isAuthenticate: false,
    user: null,
    error: null
};

export const firebaseLoginPhone = createAsyncThunk('/auth/firebaseLoginPhone',
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/firebaseLoginPhone`, user, {
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

export const firebaseRegisterPhone = createAsyncThunk('/auth/firebaseRegisterPhone',
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/firebaseRegisterPhone`, user, {
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

export const checkAuth = createAsyncThunk('/auth/check-auth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/auth/check-auth`, {
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

export const logout = createAsyncThunk('/auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/logout`, {}, {
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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user ? action.payload.user : null;
            state.isAuthenticate = action.payload.success;
            state.isLoading = false;
            state.error = action.payload.message ? action.payload.message : null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(firebaseLoginPhone.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(firebaseLoginPhone.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticate = action.payload.success;
                state.user = action.payload.user || null;
                state.error = null;
            })
            .addCase(firebaseLoginPhone.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticate = false;
                state.user = null;
                state.error = action.payload || action.error;
            })

            .addCase(firebaseRegisterPhone.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(firebaseRegisterPhone.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticate = action.payload.success;
                state.user = action.payload.user || null;
                state.error = null;
            })
            .addCase(firebaseRegisterPhone.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticate = false;
                state.user = null;
                state.error = action.payload || action.error;
            })

            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticate = action.payload.success;
                state.user = action.payload.user || null;
                state.error = null;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticate = false;
                state.user = null;
                state.error = action.payload || action.error;
            })

            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticate = false;
                state.user = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error;
            });
    }
});

export const { setUser } = authSlice.actions
export default authSlice.reducer;
