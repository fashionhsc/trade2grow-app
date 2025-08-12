import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import bgImage from "../../assets/images/bg_coinandcandle.png";

const videoSource =
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const VideoSubscribe = () => {
    const router = useRouter();
    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
    });

    return (
        <ImageBackground
            source={bgImage}
            style={{ flex: 1 }}
            resizeMode="cover"
        >

            <View className="flex-1 justify-center gap-16 p-4 items-center">
                {/* Video Section */}
                <VideoView style={{ width: 350, height: 250, }} player={player} allowsFullscreen allowsPictureInPicture />

                {/* Quiz Card */}
                <View className="bg-black/60 border border-[#8D60EE] rounded-xl py-10 px-10 w-full max-w-xl items-center relative">
                    <Text className="text-2xl md:text-3xl text-[#FFD700] font-bold text-center">
                        Interesting QUIZ Awaits You
                    </Text>
                    <Text className="text-[#ccc] text-xl md:text-lg text-center mt-2">
                        play quizzes with trading and get various prizes
                    </Text>

                    {/* Indicators */}
                    <View className="flex-row mt-4 mb-4 ">
                        <View className="w-3 h-1 rounded-sm bg-[#FFD700] mx-1" />
                        <View className="w-3 h-1 rounded-sm bg-[#555] mx-1" />
                        <View className="w-3 h-1 rounded-sm bg-[#555] mx-1" />
                    </View>

                    {/* Buttons */}
                    <View className='items-center gap-2 absolute bottom-[-60]'>
                        <TouchableOpacity
                            className="bg-[#FFD700] rounded-full px-6 py-3 mt-2 w-11/12 md:w-3/4 flex-row items-center text-center gap-2"
                            onPress={() => router.push('/(auth)/Subscription')}
                        >
                            <Text className="text-black font-bold text-lg md:text-xl">
                                Subscribe
                            </Text>
                            <AntDesign name="arrowright" size={20} color="#000" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.replace('/(tabs)/home')}>
                            <Text className="text-white text-lg md:text-xl mt-2 underline">
                                Skip
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

export default VideoSubscribe;
