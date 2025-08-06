import { Image, Text, TouchableOpacity, View } from 'react-native';

const GoogleLoginButton = () => {

    return (
        <TouchableOpacity className="bg-black py-3 rounded-lg mb-4">
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
