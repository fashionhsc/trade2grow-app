import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import bgImage from '../../../assets/images/bg_dark.png';
import Podium from '../../../components/Podium';
import api from '../../../services/api';
import { setLeaderboardList, setLeaderboardUser } from '../../../store/slices/leaderboard';


const Leaderboard = () => {
    const router = useRouter();
    const { user } = useSelector(state => state.auth);
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

    const userRank =
        leaderboard.findIndex(entry => entry.userId._id === user._id) + 1;

    const percentile =
        leaderboard.length > 0
            ? Math.round(((leaderboard.length - userRank) / leaderboard.length) * 100)
            : 0;

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
        <ImageBackground
            source={bgImage}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <SafeAreaView className="bg-transparent flex-1 px-3">
                <StatusBar barStyle="light-content" backgroundColor="black" />

                <View className='flex flex-row  my-5 items-center'>
                    <AntDesign onPress={() => router.replace('/(tabs)/home')} name="arrowleft" size={22} color="#fff" />
                    <Text className='text-2xl text-white font-semibold m-auto'>Leaderboard</Text>
                </View>

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
                <ScrollView className="w-full bg-transparent">

                    <View className='bg-[#9C6ADE] flex-row py-4 px-5 gap-3 rounded-3xl'>
                        <View className='bg-[#520AEE] justify-center p-3 rounded-2xl'>
                            <Text className='text-4xl font-bold text-white'>#{userRank || '--'}</Text>
                        </View>
                        <View className='w-[85%]'>
                            <Text className='text-2xl font-bold text-white flex-wrap'>You are doing better than {percentile}% of other players!</Text>
                        </View>
                    </View>

                    <Podium
                        data={leaderboard.slice(0, 3).map(entry => ({
                            ...entry,
                            bgColor: colorsMap[entry._id]
                        }))}
                    />

                    <View className="flex gap-4">
                        {leaderboard?.length > 0 && leaderboard.slice(3).map((entry, index) => {
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
                                            {index + 4}
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
        </ImageBackground>
    );
};

export default Leaderboard;
