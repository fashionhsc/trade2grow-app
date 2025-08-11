import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SubscriptionComponent from "../../components/SubscriptionComponent";
import bgImage from "../../assets/images/bg_coinandcandle.png";


const SubscriptionScreen = () => {
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState("annual");

    return (
        <ImageBackground
            source={bgImage}
            style={{ flex: 1 }}
            resizeMode="cover"
        >

            {/* Foreground content */}
            <SafeAreaView className="flex-1 bg-black/80 p-5">
                {/* Close icon */}
                <TouchableOpacity onPress={() => router.push('/(auth)/VideoSubscribe')}>
                    <Ionicons name="close" size={24} color="#fff" />
                </TouchableOpacity>

                <SubscriptionComponent
                    selectedPlan={selectedPlan}
                    setSelectedPlan={setSelectedPlan}
                    handlePayNow={() => alert(selectedPlan)}
                    onTrial={() => alert("Trial started")}
                />
            </SafeAreaView>
        </ImageBackground>
    );
};

export default SubscriptionScreen;
