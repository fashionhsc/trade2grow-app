import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, logout } from '../../store/slices/authSlice';

export default function DashboardLayout() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);

    useEffect(() => {
        dispatch(checkAuth())
    }, []);

    if (loading || !user) return null;

    const isAdmin = user?.role === 'admin';


    const handleLogout = () => {
        dispatch(logout());
        router.push('/'); // Navigate to login or landing page
    };

    return (
        <Drawer
            screenOptions={{
                headerStyle: { backgroundColor: 'black' },
                headerTintColor: 'white',
                drawerStyle: { backgroundColor: '#121212' },
                drawerActiveTintColor: '#facc15',
                drawerInactiveTintColor: 'white',
            }}
            drawerContent={(props) => (
                <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
                    <DrawerItemList {...props} />
                    <View style={{ marginTop: 'auto', borderTopWidth: 1, borderColor: '#333' }}>
                        <DrawerItem
                            label="Logout"
                            labelStyle={{ color: 'red' }}
                            onPress={handleLogout}
                        />
                    </View>
                </DrawerContentScrollView>
            )}
        >
            <Drawer.Screen name="index" options={{ title: 'Dashboard' }} />
            <Drawer.Screen name="profile" options={{ title: 'Profile' }} />
            <Drawer.Screen name="leaderboard" options={{ title: 'Leaderboard' }} />

            {/* Admin-only screens */}
            {isAdmin && (
                <>
                    <Drawer.Screen name="category" options={{ title: 'Manage Categories' }} />
                    <Drawer.Screen name="stage" options={{ title: 'Manage Stages' }} />
                </>
            )}
        </Drawer>
    );
}
