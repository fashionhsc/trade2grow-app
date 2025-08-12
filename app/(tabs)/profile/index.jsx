import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Image, ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import bgImage from '../../../assets/images/bg_dark.png';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const AVATAR_SIZE = SCREEN_WIDTH * 0.3; // 30% of screen width
const PROGRESS_BAR_WIDTH = SCREEN_WIDTH * 0.5;

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('1');

  const handleBack = () => {
    router.replace('/(tabs)/home');
  };


  console.log('user>>>>>', user)


  //  {"__v": 0, "_id": "689b2e35950cd43cd797a3ac", "badges": [], "category": {"__v": 0, "_id": "689b2dad950cd43cd797a3a3", "createdAt": "2025-08-12T12:03:57.351Z", "description": "For users interested in short-term market opportunities, technical analysis, and quick decision-making.", "name": "Trader"}, "coins": 0, "countryCode": "+91", "email": "nishant@gmail.com", "firstName": "Nishant", "isPaidUser": false, "joinedAt": "2025-08-12T12:06:13.624Z", "lastName": "Rathore", "phone": "8800784843", "role": "user", "uid": "kKK2hsZo6JN4GyEZRoxMWma8zhY2", "unlockedStrategies": [], "xp": 0}


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
                backgroundColor: '#ccc',
                width: AVATAR_SIZE,
                height: AVATAR_SIZE,
                borderRadius: AVATAR_SIZE / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: AVATAR_SIZE * 0.4, fontWeight: 'bold', color: 'black' }}>
                {user?.firstName?.[0] || ''}{user?.lastName?.[0] || ''}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1, backgroundColor: 'black', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 24 }}>
            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600', fontSize: 18 }}>
              {user?.firstName + ' ' + user?.lastName}
            </Text>

            {/* Stats Row */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20, paddingHorizontal: 8 }}>
              {/* Coins */}
              <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', }}>
                <Image source={require('../../../assets/images/coin.png')} style={{ width: 20, height: 20, marginRight: 8 }} />
                <Text style={{ color: 'white', fontSize: 14 }}>{user?.coins ?? 0}</Text>
              </View>

              {/* Progress Bar */}
              <View style={{ flex: 0.5, marginHorizontal: 8, position: 'relative' }}>
                <View style={{ height: 8, backgroundColor: 'white', borderRadius: 20, overflow: 'hidden' }}>
                  <View
                    style={{
                      width: `${(user?.currentStage || 0) * 20}%`,
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
                <Text style={{ color: 'white', fontSize: 14 }}>{user?.xp ?? 0}</Text>
              </View>
            </View>

            {/* Navigation Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              {['Badge', 'Subscribe', 'Setting'].map((tabLabel, index) => {
                const tabValue = (index + 1).toString();
                const isActive = activeTab === tabValue;
                return (
                  <TouchableOpacity key={tabLabel} onPress={() => setActiveTab(tabValue)} style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 }}>
                    <Text style={{ color: isActive ? '#FFD700' : 'white', fontWeight: '600', textAlign: 'center' }}>
                      {tabLabel}
                    </Text>
                    {isActive && (
                      <View
                        style={{
                          width: 8,
                          height: 8,
                          backgroundColor: '#FFD700',
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
}

export default Profile