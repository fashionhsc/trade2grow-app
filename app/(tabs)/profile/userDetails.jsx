import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import bgImage from '../../../assets/images/bg_dark.png';
import { resetLeaderboardUser } from '../../../store/slices/leaderboard';
import { COLORS } from '../../../constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AVATAR_SIZE = SCREEN_WIDTH * 0.3; // 30% of screen width
const PROGRESS_BAR_WIDTH = SCREEN_WIDTH * 0.5;

const UserDetails = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { leaderboardUser } = useSelector(state => state.leaderboard);
    const [activeTab, setActiveTab] = useState('1');

    const handleBack = () => {
        dispatch(resetLeaderboardUser());
        router.replace('/leaderboard');
    };

    return (
        <ImageBackground
            source={bgImage}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <StatusBar barStyle="light-content" backgroundColor="black" />

            <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
                {/* Header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: SCREEN_HEIGHT * 0.06, alignItems: 'center' }}>
                    <AntDesign onPress={handleBack} name="arrowleft" size={24} color="#fff" />
                    <Ionicons name="settings" size={24} color="#fff" />
                </View>

                <View style={{ flex: 1 }}>
                    {/* Initial */}
                    <View style={{ height: SCREEN_HEIGHT * 0.12, justifyContent: 'center', alignItems: 'center', zIndex: 10 }}>
                        <View
                            style={{
                                backgroundColor: leaderboardUser.bgColor || '#ccc',
                                width: AVATAR_SIZE,
                                height: AVATAR_SIZE,
                                borderRadius: AVATAR_SIZE / 2,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ fontSize: AVATAR_SIZE * 0.4, fontWeight: 'bold', color: 'black' }}>
                                {leaderboardUser?.userId?.firstName?.[0] || ''}{leaderboardUser?.userId?.lastName?.[0] || ''}
                            </Text>
                        </View>
                    </View>

                    <View style={{ flex: 1, backgroundColor: 'black', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 24 }}>
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 18 }}>
                            {leaderboardUser?.userId?.firstName + ' ' + leaderboardUser?.userId?.lastName}
                        </Text>

                        {/* Stats Row */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20, paddingHorizontal: 8 }}>
                            {/* Coins */}
                            <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', }}>
                                <Image source={require('../../../assets/images/coin.png')} style={{ width: 20, height: 20, marginRight: 8 }} />
                                <Text style={{ color: 'white', fontSize: 14 }}>{leaderboardUser?.coins ?? 0}</Text>
                            </View>

                            {/* Progress Bar */}
                            <View style={{ flex: 0.5, marginHorizontal: 8, position: 'relative' }}>
                                <View style={{ height: 8, backgroundColor: 'white', borderRadius: 20, overflow: 'hidden' }}>
                                    <View
                                        style={{
                                            width: `${(leaderboardUser?.userId?.currentStage || 0) * 20}%`,
                                            height: '100%',
                                            backgroundColor: '#5C01A0',
                                            borderRadius: 20,
                                        }}
                                    />
                                </View>
                                <Image
                                    source={require('../../../assets/images/Silver.png')}
                                    style={{ width: 20, height: 20, position: 'absolute', right: 0, top: -6 }}
                                />
                            </View>

                            {/* XP */}
                            <View style={{ flex: 0.3, flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../../../assets/images/xp.png')} style={{ width: 20, height: 20, marginRight: 8 }} />
                                <Text style={{ color: 'white', fontSize: 14 }}>{leaderboardUser?.xp ?? 0}</Text>
                            </View>
                        </View>

                        {/* Navigation Buttons */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            {['Badge', 'Subscribe', 'Setting'].map((tabLabel, index) => {
                                const tabValue = (index + 1).toString();
                                const isActive = activeTab === tabValue;
                                return (
                                    <TouchableOpacity key={tabLabel} onPress={() => setActiveTab(tabValue)} style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 }}>
                                        <Text style={{ color: isActive ? `${COLORS.primary}` : 'white', fontWeight: '600', textAlign: 'center' }}>
                                            {tabLabel}
                                        </Text>
                                        {isActive && (
                                            <View
                                                style={{
                                                    width: 8,
                                                    height: 8,
                                                    backgroundColor: `${COLORS.primary}`,
                                                    borderRadius: 4,
                                                    marginTop: 6,
                                                    alignSelf: 'center',
                                                }}
                                            />
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Content */}
                        <View style={{ flex: 1, backgroundColor: 'black' }}>
                            {/* {activeTab === '1' && <Badges />}
                            {activeTab === '2' && <Subscription />}
                            {activeTab === '3' && <UserDetails />} */}
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default UserDetails;
