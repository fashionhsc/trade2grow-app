import { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import api from '../../services/api';
import { setLeaderboardList, setLeaderboardUser } from '../../store/slices/leaderboard';
import { router } from 'expo-router';

const Leaderboard = () => {
    const dispatch = useDispatch();
    const [leaderboard, setLeaderboard] = useState([]);
    const [isMonthlySelected, setIsMonthlySelected] = useState(true);
    const [colorsMap, setColorsMap] = useState({});
    const rankImages = {
        1: require('../../assets/images/rank_1.png'),
        2: require('../../assets/images/rank_2.png'),
        3: require('../../assets/images/rank_3.png'),
    };
    const fetchLeaderboard = async () => {
        try {
            const resp = await api.get(`/user/leaderboard/all`);
            if (resp.data?.data) {
                setLeaderboard(resp.data.data);
                dispatch(setLeaderboardList(resp.data.data))
            }
        } catch (error) {
            console.log('Error fetching leaderboard:', error?.response?.data || error.message);
        }
    };

    const toggleMethod = () => setIsMonthlySelected((prev) => !prev);

    const handleLeaderboardPress = (data, bgColor) => {
        const leaderboardUser = { ...data, bgColor };
        dispatch(setLeaderboardUser(leaderboardUser));
        router.push('/dashboard/leaderboardDetail');
    }

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    useEffect(() => {
        fetchLeaderboard();
    }, [])

    useEffect(() => {
        if (leaderboard && leaderboard.length > 0) {
            const newColors = {};
            leaderboard.forEach(entry => {
                newColors[entry._id] = getRandomColor();
            });
            setColorsMap(newColors);
        }
    }, [leaderboard]);

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
                        const bgColor = colorsMap[entry._id];

                        return (
                            <TouchableOpacity
                                key={entry._id}
                                onPress={() => handleLeaderboardPress(entry, bgColor)}
                                style={{ backgroundColor: '#fff', display: 'flex', flexDirection: 'row', padding: 10, justifyContent: 'center', alignItems: 'center' }}
                                className='rounded-2xl'
                            >
                                {/* Rank */}
                                <View style={{ width: '10%', alignItems: 'center' }}>
                                    <Text style={{ paddingVertical: 4, paddingHorizontal: 10, borderWidth: 2, borderRadius: 50, borderColor: '#E6E6E6' }}>{index + 1}</Text>
                                </View>

                                {/* Initials */}
                                <View style={{ width: '15%', height: 55, backgroundColor: bgColor, borderRadius: 50, marginHorizontal: 10 }}>
                                    <Text className='font-semibold text-2xl m-auto'>{initials}</Text>
                                </View>

                                {/* Full name + Points */}
                                <View style={{ width: '50%' }}>
                                    <Text className='font-medium text-xl'>{fullName}</Text>
                                    <Text className='text-gray-500 text-sm'>{coins} Points</Text>
                                </View>

                                {/* Category */}
                                <View style={{ width: '20%' }}>
                                    <Image
                                        source={rankImages[index + 1]}
                                        style={{ width: 50, height: 50 }}
                                    />
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
