import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ImageBackground, StatusBar, Text, TouchableOpacity, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import bgImage from "../../../assets/images/bg_candle.jpg";
import { COLORS } from "../../../constants/theme";

const TradePage = () => {
    const router = useRouter();

    const [selected, setSelected] = useState("real");

    return (
        <ImageBackground source={bgImage} className="flex-1" resizeMode="cover" blurRadius={15} >
            <SafeAreaView className="flex-1 px-4">
                <StatusBar barStyle="light-content" backgroundColor="black" />

                {/* Header */}
                <View className="flex-row items-center mb-6">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text className="text-white text-lg font-semibold ml-3">Select Trading</Text>
                </View>

                {/* Body */}
                <View className="flex-1 justify-between items-center mt-12">
                    {/* Logo */}
                    <Image source={require("../../../assets/images/trade_logo.png")} className="w-72 h-64" resizeMode="contain" />

                    {/* Toggle + CTA */}
                    <View className="w-full items-center mb-8">
                        {/* Toggle Buttons */}
                        <View className="flex-row justify-center mb-6">
                            {/* Real Trade */}
                            <TouchableOpacity onPress={() => setSelected("real")} className={`flex-row items-center px-6 py-3 rounded-full mx-2 ${selected === "real" ? "bg-primary" : "bg-card"}`}>
                                <Ionicons name="trending-up" size={18} color={selected === "real" ? "#fff" : COLORS.subtext} />
                                <Text className={`ml-2 font-semibold text-white`}>Real Trade</Text>
                            </TouchableOpacity>

                            {/* Paper Trade */}
                            <TouchableOpacity onPress={() => setSelected("paper")} className={`flex-row items-center px-6 py-3 rounded-full mx-2 ${selected === "paper" ? "bg-primary" : "bg-card"}`}>
                                <Ionicons name="document-text" size={18} color={selected === "paper" ? "#fff" : COLORS.subtext} />
                                <Text className={`ml-2 font-semibold text-white`}>Paper Trade</Text>
                            </TouchableOpacity>
                        </View>

                        {/* CTA */}
                        <TouchableOpacity className="bg-primary px-12 py-4 rounded-full items-center w-3/4">
                            <Text className="text-white font-bold text-base">Let's Trade</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default TradePage;
