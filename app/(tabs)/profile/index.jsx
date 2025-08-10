import { ImageBackground, StatusBar, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import bgImage from '../../../assets/images/bg_dark.png';

const Profile = () => {
  return (
    <ImageBackground
      source={bgImage}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView className=" flex-1 px-3">
        <StatusBar barStyle="light-content" backgroundColor="black" />

        <Text className='text-white'>Profile</Text>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default Profile