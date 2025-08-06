import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';


WebBrowser.maybeCompleteAuthSession();

export function useGoogleSignIn() {
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com",
        iosClientId: "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com",
        expoClientId: "545562637314-5tr0uklj70nbji8nj49gimeoeedrhbgo.apps.googleusercontent.com",
        webClientId: "545562637314-5tr0uklj70nbji8nj49gimeoeedrhbgo.apps.googleusercontent.com",
    });

    useEffect(() => {
        if (response?.type === "success") {
            const { id_token } = response.authentication;

            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
                .then((userCredential) => {
                    console.log("User signed in", userCredential.user);
                })
                .catch((error) => {
                    console.error("Firebase sign-in error", error);
                });
        }
    }, [response]);

    return {
        request,
        promptAsync,
    };
}



const GoogleLoginButton = () => {
    const { request, promptAsync } = useGoogleSignIn();

    return (
        <TouchableOpacity
            className="bg-black py-3 rounded-lg mb-4"
            disabled={!request}
            onPress={() => promptAsync()}
        >
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
