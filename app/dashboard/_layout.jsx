import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function DashboardLayout() {
    const router = useRouter();
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/');
        }
    }, [loading, user]);

    if (loading || !user) return null;

    const isAdmin = user?.role === 'admin';


    return (
        <Drawer
            screenOptions={{
                headerStyle: { backgroundColor: 'black' },
                headerTintColor: 'white',
                drawerStyle: { backgroundColor: '#121212' },
                drawerActiveTintColor: '#facc15',
                drawerInactiveTintColor: 'white',
            }}
        >
            <Drawer.Screen name="index" options={{ title: 'Dashboard' }} />
            <Drawer.Screen name="profile" options={{ title: 'Profile' }} />
            <Drawer.Screen name="leaderboard" options={{ title: 'Leaderboard' }} />

            {/* Admin-only screens */}
            {isAdmin && (
                <>
                    <Drawer.Screen name="admin/category" options={{ title: 'Manage Categories' }} />
                    <Drawer.Screen name="admin/stage" options={{ title: 'Manage Stages' }} />
                </>
            )}
        </Drawer>
    );
}
