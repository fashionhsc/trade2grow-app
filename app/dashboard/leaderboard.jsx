import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import api from '../../services/api';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [isMonthlySelected, setIsMonthlySelected] = useState(true);

    const fetchLeaderboard = async () => {
        try {
            const resp = await api.get(`/user/leaderboard/all`);
            if (resp.data?.data) {
                setLeaderboard(resp.data.data);
            }
        } catch (error) {
            console.log('Error fetching leaderboard:', error?.response?.data || error.message);
        }
    };

    const toggleMethod = () => setIsMonthlySelected((prev) => !prev);

    const handleLeaderboardPress = (data) => {
        console.log('data>>>>', data)
    }

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useFocusEffect(
        useCallback(() => {
            fetchLeaderboard();
        }, [])
    );

    return (
        <View className="bg-black flex-1 px-3">
            {/* Toggle Options */}
            <View className="flex-row justify-between gap-4 mb-5 mt-3">
                <TouchableOpacity
                    onPress={toggleMethod}
                    className={`flex-1 flex-row items-center justify-center py-3 px-4 border rounded-lg gap-2 ${isMonthlySelected ? 'bg-yellow-400' : 'border-gray-600'}`}>
                    <Text className={`text-base font-semibold ${isMonthlySelected ? 'text-black' : 'text-white'}`}>
                        Weekly
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={toggleMethod}
                    className={`flex-1 flex-row items-center justify-center py-3 px-4 border rounded-lg gap-2 ${!isMonthlySelected ? 'bg-yellow-400' : 'border-gray-600'}`}>
                    <Text className={`text-base font-semibold ${!isMonthlySelected ? 'text-black' : 'text-white'}`}>
                        All Time
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView className="w-full bg-black">
                <View className='flex gap-4'>
                    {leaderboard?.length > 0 && leaderboard.map((entry, index) => {
                        const { userId, coins, category } = entry;

                        const fullName = `${userId?.firstName} ${userId?.lastName}`;
                        const initials = `${userId?.firstName[0]}${userId?.lastName[0]}`;

                        return (
                            <TouchableOpacity
                                key={entry._id}
                                onPress={() => handleLeaderboardPress(entry)}
                                style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center' }}
                                className='rounded-2xl'
                            >
                                {/* Rank */}
                                <View style={{ width: '10%', alignItems: 'center' }}>
                                    <Text style={{ paddingVertical: 4, paddingHorizontal: 10, borderWidth: 2, borderRadius: 50, borderColor: '#E6E6E6' }}>{index + 1}</Text>
                                </View>

                                {/* Initials */}
                                <View style={{ width: '20%', alignItems: 'center' }}>
                                    <Text className='font-semibold text-2xl' style={{ paddingVertical: 12, paddingHorizontal: 15, borderWidth: 2, borderRadius: 50, borderColor: '#E6E6E6', backgroundColor: getRandomColor() }}>{initials}</Text>
                                </View>

                                {/* Full name + Points */}
                                <View style={{ width: '50%' }}>
                                    <Text className='font-medium text-xl'>{fullName}</Text>
                                    <Text className='text-gray-500 text-sm'>{coins} Points</Text>
                                </View>

                                {/* Category */}
                                <View style={{ width: '20%' }}>
                                    {/* <Text className='text-gray-400 text-sm'>{category?.name}</Text> */}
                                </View>
                            </TouchableOpacity>
                        );
                    })}

                </View>
            </ScrollView >
        </View >
    );
};

export default Leaderboard;
