import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text } from 'react-native';
import { useSelector } from 'react-redux';

const DashboardScreen = () => {
    const router = useRouter();
    const user = useSelector((state) => state.auth.user);
    const [menuVisible, setMenuVisible] = useState(false);

    const navigateAndClose = (path) => {
        setMenuVisible(false);
        router.push(path);
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 ,backgroundColor:'black',height:'100%'}}>
            <Text className="text-white text-3xl font-bold mb-4">
                👋 Welcome, {user?.name || 'Trader'}!
            </Text>
            {/* Main dashboard content goes here */}
        </ScrollView>
    );
};

export default DashboardScreen;
