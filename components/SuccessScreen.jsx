import { Ionicons } from "@expo/vector-icons";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { COLORS } from "../constants/theme";
import { useEffect } from "react";

const { width, height } = Dimensions.get("window");

const SuccessScreen = ({ handleCloseSuccess }) => {
    // Falling coins config
    const coins = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * (width - 40),
        startY: Math.random() * height - height, // random start position anywhere from -height to screen bottom
        delay: Math.random() * 2000,
        speed: 2000 + Math.random() * 2000, // random falling speed
    }));
    return (
        <View className="flex-1 bg-black items-center justify-center gap-5">
            {/* Confetti */}
            <ConfettiCannon
                count={500}
                origin={{ x: -10, y: 0 }}
                fadeOut
                autoStart
                fallSpeed={4000}
            />


            {/* Falling coins in background */}
            {coins.map((coin) => (
                <FallingCoin
                    key={coin.id}
                    x={coin.x}
                    startY={coin.startY}
                    delay={coin.delay}
                    speed={coin.speed}
                />
            ))}

            {/* Close Button */}
            <TouchableOpacity className="absolute top-12 left-5 p-2 z-10" onPress={handleCloseSuccess}>
                <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>

            {/* Title */}
            <Text className="text-white text-4xl font-bold mt-16">Nice Work</Text>

            {/* Check Circle */}
            <View
                className="my-5 rounded-full p-5"
                style={{
                    backgroundColor: COLORS.primary,
                    shadowColor: COLORS.primary,
                    shadowOpacity: 0.8,
                    shadowRadius: 15,
                    shadowOffset: { width: 0, height: 0 },
                    elevation: 8,
                }}
            >
                <Ionicons name="checkmark" size={45} color="#fff" />
            </View>

            {/* Stars */}
            <View className="flex-row my-2 space-x-1 gap-3">
                <Ionicons name="star" size={30} color={COLORS.primary} />
                <Ionicons name="star" size={35} color={COLORS.primary} />
                <Ionicons name="star-outline" size={30} color={COLORS.primary} />
            </View>

            {/* XP Earned */}
            <Text className="text-white text-lg mb-8 mt-2">You Earned 100 XP and 50 coins</Text>

            {/* Buttons */}
            <View className="w-3/4">

                <TouchableOpacity className="rounded-full py-3 px-10 mb-3 items-center" style={{ backgroundColor: COLORS.primary }} >
                    <Text className="text-black text-lg font-bold">Next Stage</Text>
                </TouchableOpacity>

                <TouchableOpacity className="rounded-full border border-white py-3 px-10 items-center">
                    <Text className="text-white text-lg font-bold">Play Again</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

function FallingCoin({ x, startY, delay, speed }) {
    const translateY = useSharedValue(startY);

    useEffect(() => {
        translateY.value = withRepeat(
            withTiming(height, { duration: speed, delay }),
            -1, // infinite repeat
            false
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        left: x,
        position: "absolute",
    }));

    return (
        <Animated.Image
            source={require("../assets/images/coin_icon.png")}
            style={[styles.coin, animatedStyle]}
        />
    );
}

export default SuccessScreen;


const styles = StyleSheet.create({
  coin: {
    width: 40,
    height: 40,
  },
});