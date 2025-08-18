import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice';
import leaderboardSlice from './slices/leaderboard'
import pushTokenSlice from './slices/pushTokenSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        leaderboard:leaderboardSlice,
        pushtoken:pushTokenSlice
    }
})

export default store;