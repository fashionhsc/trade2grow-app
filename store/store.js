import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slices/authSlice';
import leaderboardSlice from './slices/leaderboard';
import pushTokenSlice from './slices/pushTokenSlice';
import stageSlice from './slices/stageSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        leaderboard: leaderboardSlice,
        pushtoken: pushTokenSlice,
        stages: stageSlice,
    }
})

export default store;