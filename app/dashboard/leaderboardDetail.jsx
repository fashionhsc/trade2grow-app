import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Image, ImageBackground, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import bgImage from '../../assets/images/bg_dark.png';
import { resetLeaderboardUser } from '../../store/slices/leaderboard';


const leaderboardDetail = () => {
    const dispatch = useDispatch();
    const { leaderboardUser } = useSelector(state => state.leaderboard)

    const handleBack = () => {
        dispatch(resetLeaderboardUser());
        router.push('/dashboard/leaderboard')
    }

    console.log('leader board detail:', leaderboardUser);
    return (
        <ImageBackground
            source={bgImage}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
        >
            <View className='px-4' style={{ height: '100%' }}>
                {/* header */}
                <View className='flex flex-row justify-between' style={{ height: '5%' }}>
                    <AntDesign onPress={handleBack} name="arrowleft" size={24} color="#fff" />
                    <Ionicons name="settings" size={24} color="#fff" />
                </View>

                <View style={{ height: '90%' }}>
                    {/* initial */}
                    <View style={{ height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
                        <View style={{ backgroundColor: leaderboardUser.bgColor, height: 100, width: 100, borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 40, fontWeight: '700', color: '#000' }}>{leaderboardUser?.userId?.firstName[0] + leaderboardUser?.userId?.lastName[0]}</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: '#000', height: '90%', borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: 30 }}>
                        <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600', fontSize: 20 }}>{leaderboardUser?.userId?.firstName + ' ' + leaderboardUser?.userId?.lastName}</Text>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 10,
                            borderRadius: 10,
                            gap: 10
                        }}>
                            {/* Coins */}
                            <View style={{ flex: 0.3, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', }}>
                                <Image
                                    source={require('../../assets/images/coin.png')}
                                    style={{ width: 20, height: 20, marginRight: 6 }}
                                />
                                <Text style={{ color: '#fff', fontSize: 14 }}>{leaderboardUser?.coins}</Text>
                            </View>

                            {/* Progress Bar */}
                            <View style={{ flex: 0.5, marginHorizontal: 12, position: 'relative' }}>
                                <View style={{
                                    height: 10,
                                    backgroundColor: '#fff',
                                    borderRadius: 5,
                                    overflow: 'hidden',
                                }}>
                                    <View style={{
                                        width: `${(leaderboardUser?.userId?.currentStage || 0) * 20}%`,
                                        height: '100%',
                                        backgroundColor: '#5C01A0',
                                        borderRadius: 5
                                    }} />
                                </View>
                                <Image source={require('../../assets/images/silver.png')} style={{ width: 15, height: 15, position: 'absolute', right: 0, top: -3 }} />
                            </View>

                            {/* XP */}
                            <View style={{ flex: 0.3, flexDirection: 'row', alignItems: 'center', }}>
                                <Image
                                    source={require('../../assets/images/xp.png')}
                                    style={{ width: 20, height: 20, marginRight: 6 }}
                                />
                                <Text style={{ color: '#fff', fontSize: 14 }}>{leaderboardUser?.xp}</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        </ImageBackground>
    )

}

export default leaderboardDetail