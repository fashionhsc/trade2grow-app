import { GOOGLE_CLIENT_ID } from '@env';
import { GoogleAuthProvider, getAuth, signInWithCredential } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const GoogleLoginButton = () => {

    const googleSignin = async () => {
        try {
            GoogleSignin.configure({
                webClientId: GOOGLE_CLIENT_ID,
            });
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const signInResult = await GoogleSignin.signIn();
            const idToken = signInResult.data?.idToken;
            const googleCredential = GoogleAuthProvider.credential(idToken);
            const userCredential = await signInWithCredential(getAuth(), googleCredential);
        } catch (error) {
            console.log('Error while signing with Google :', error);
        }
    }

    return (
        <TouchableOpacity className="bg-black py-3 rounded-lg mb-4" onPress={googleSignin}>
            <View className="flex-row items-center justify-center gap-2">
                <Image
                    source={require('../assets/images/google_icon.png')}
                    style={{ width: 18, height: 18 }}
                    resizeMode="contain"
                />
                <Text className="text-white text-base font-bold">
                    Continue with Google
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default GoogleLoginButton;
