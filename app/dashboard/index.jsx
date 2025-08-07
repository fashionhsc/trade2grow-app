import { useRouter } from 'expo-router';
import { ScrollView, Text } from 'react-native';
import { useSelector } from 'react-redux';

const DashboardScreen = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: 'black', height: '100%' }}>
            <Text className="text-white text-3xl font-bold mb-4">
                👋 Welcome, {user?.name || 'Trader'}!
            </Text>
            {/* Main dashboard content goes here */}
        </ScrollView>
    );
};

export default DashboardScreen;
