import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice';
import leaderboardSlice from './slices/leaderboard'

const store = configureStore({
    reducer: {
        auth: authSlice,
        leaderboard:leaderboardSlice
    }
})

export default store;