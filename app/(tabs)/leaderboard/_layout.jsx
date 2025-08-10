import { Stack } from "expo-router";

export default function LeaderboardLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="badges" />
            <Stack.Screen name="leaderboardDetail" />
            <Stack.Screen name="userDetails" />
            <Stack.Screen name="subscription" />
        </Stack>
    );
}
