import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import api from '../../../services/api';
import { setLeaderboardList, setLeaderboardUser } from '../../../store/slices/leaderboard';

const Leaderboard = () => {
    const dispatch = useDispatch();
    const [leaderboard, setLeaderboard] = useState([]);
    const [isMonthlySelected, setIsMonthlySelected] = useState(true);
    const [colorsMap, setColorsMap] = useState({});
    const getInitialsStyle = (color) => ({
        backgroundColor: color || '#ccc',
        width: 65,
        height: 65,
        borderRadius: 50,
        overflow: 'hidden',
    });

    const rankImages = {
        1: require('../../../assets/images/rank_1.png'),
        2: require('../../../assets/images/rank_2.png'),
        3: require('../../../assets/images/rank_3.png'),
    };

    const fetchLeaderboard = async () => {
        try {
            const resp = await api.get(`/user/leaderboard/all`);
            if (resp.data?.data) {
                setLeaderboard(resp.data.data);
                dispatch(setLeaderboardList(resp.data.data));
            }
        } catch (error) {
            console.log('Error fetching leaderboard:', error?.response?.data || error.message);
        }
    };

    const toggleMethod = () => setIsMonthlySelected((prev) => !prev);

    const handleLeaderboardPress = (data, bgColor) => {
        const leaderboardUser = { ...data, bgColor };
        dispatch(setLeaderboardUser(leaderboardUser));
        router.push('/(tabs)/leaderboard/leaderboardDetail');
    };

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
    }, []);

    useEffect(() => {
        if (leaderboard.length > 0) {
            const newColors = {};
            leaderboard.forEach(entry => {
                newColors[entry._id] = getRandomColor();
            });
            setColorsMap(newColors);
        }
    }, [leaderboard]);

    return (
        <SafeAreaView className="bg-black flex-1 px-3">
            <StatusBar barStyle="light-content" backgroundColor="black" />


            {/* Toggle Options */}
            <View className="flex-row justify-between gap-4 mb-5 mt-3">
                <TouchableOpacity
                    onPress={toggleMethod}
                    className={`flex-1 flex-row items-center justify-center py-3 px-4 border rounded-lg gap-2 ${isMonthlySelected ? 'bg-yellow-400' : 'border-gray-600'}`}
                >
                    <Text className={`text-base font-semibold ${isMonthlySelected ? 'text-black' : 'text-white'}`}>
                        Weekly
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={toggleMethod}
                    className={`flex-1 flex-row items-center justify-center py-3 px-4 border rounded-lg gap-2 ${!isMonthlySelected ? 'bg-yellow-400' : 'border-gray-600'}`}
                >
                    <Text className={`text-base font-semibold ${!isMonthlySelected ? 'text-black' : 'text-white'}`}>
                        All Time
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Leaderboard List */}
            <ScrollView className="w-full bg-black">
                <View className="flex gap-4">
                    {leaderboard?.length > 0 && leaderboard.map((entry, index) => {
                        const { userId, coins } = entry;
                        const fullName = `${userId?.firstName} ${userId?.lastName}`;
                        const initials = `${userId?.firstName[0]}${userId?.lastName[0]}`;
                        const bgColor = colorsMap[entry._id];

                        return (
                            <TouchableOpacity
                                key={entry._id}
                                onPress={() => handleLeaderboardPress(entry, bgColor)}
                                className="bg-white flex-row p-2.5 justify-center items-center rounded-2xl"
                            >
                                {/* Rank */}
                                <View className="w-[10%] items-center">
                                    <Text className="py-1 px-2 border-2 rounded-full border-[#E6E6E6]">
                                        {index + 1}
                                    </Text>
                                </View>

                                {/* Initials */}
                                <View
                                    className="mx-2.5 justify-center items-center flex-shrink-0"
                                    style={getInitialsStyle(bgColor)}
                                >
                                    <Text className="font-semibold text-3xl text-black">
                                        {initials}
                                    </Text>
                                </View>



                                {/* Full name + Points */}
                                <View className="w-[50%]">
                                    <Text className="font-medium text-xl">{fullName}</Text>
                                    <Text className="text-gray-500 text-sm">{coins} Points</Text>
                                </View>

                                {/* Category */}
                                <View className="w-[20%]">
                                    {rankImages[index + 1] && (
                                        <Image
                                            source={rankImages[index + 1]}
                                            className="w-[50px] h-[50px]"
                                        />
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Leaderboard;
