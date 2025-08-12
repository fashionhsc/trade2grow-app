import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useSelector } from "react-redux";

export default function AdminLayout() {
    const { isAuthenticate, user } = useSelector(state => state.auth);

    if (!isAuthenticate) return <Redirect href={'/(auth)'} />

    if (isAuthenticate && user.role == 'user') return <Redirect href={'/(tabs)/home'} />

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#007bff",
                tabBarInactiveTintColor: "#999",
            }}
        >
            <Tabs.Screen
                name="dashboard/index"
                options={{
                    title: "Dashboard",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="speedometer-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="stage/index"
                options={{
                    title: "Stages",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="flag-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="category/index"
                options={{
                    title: "Category",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="layers-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="strategies/index"
                options={{
                    title: "Strategies",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bulb-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
