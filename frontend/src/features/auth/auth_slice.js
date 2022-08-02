import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "./auth_service";

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

/// Register User
export const syncAuth = createAsyncThunk("auth/syncAuth", async (secretKey, thunkAPI) => {
    try {
        return await authService.syncAccount(secretKey)
    } catch (error) {
        const message = error.response.data.msg ?? error.response.statusText
        return thunkAPI.rejectWithValue(message)
    }
})

/// Authenticate User
export const confirmOtp = createAsyncThunk("auth/confirmOtp", async (otpData, thunkAPI) => {
    try {
        return await authService.confirmOtp(otpData)
    } catch (error) {
        const message = error.response.data.msg ?? error.response.statusText
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = {}
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(syncAuth.pending, (state) => {
                state.isLoading = true
            })
            .addCase(syncAuth.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(syncAuth.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            }).addCase(confirmOtp.pending, (state) => {
                state.isLoading = true
            })
            .addCase(confirmOtp.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(confirmOtp.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = authSlice.actions

export default authSlice.reducer;