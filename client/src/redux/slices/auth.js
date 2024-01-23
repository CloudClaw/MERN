import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';

const initialState = {
    data: null,
    status: 'loading',
};

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/login', params);
    return data;
});

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async () => {
    const { data } = await axios.get('/me');
    return data;
});

export const fetchRegistration = createAsyncThunk('auth/fetchRegistration', async (params) => {
    const { data } = await axios.post('/registration', params);
    return data;
});


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(fetchAuth.rejected, (state) => {
            state.status = 'error';
            state.data = [];
        });

        builder.addCase(fetchLogin.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(fetchLogin.rejected, (state) => {
            state.status = 'error';
            state.data = null;
        });

        builder.addCase(fetchRegistration.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchRegistration.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        });
        builder.addCase(fetchRegistration.rejected, (state) => {
            state.status = 'error';
            state.data = null;
        });
    },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
