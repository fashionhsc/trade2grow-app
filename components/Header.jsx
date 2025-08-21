import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { COLORS } from "../constants/theme";

export default function Header() {
    const { user } = useSelector(state => state.auth)
    return (
        <View className="flex-row items-center justify-between px-4 py-2">
            <View className="flex-row items-center">
                <Text className="text-2xl" style={{ color: COLORS.text }}>
                    👋 Hi, {user?.firstName}!
                </Text>
            </View>

            <View className="flex-row items-center space-x-3">
                <View className="flex-row items-center space-x-1">
                    <Text className="text-xl" style={{ color: COLORS.gold }}>🪙</Text>
                    <Text className="text-xl" style={{ color: COLORS.text }}>{user?.coins}</Text>
                </View>

                <View className="flex-row items-center space-x-1">
                    <Text className="text-xl" style={{ color: COLORS.highlight }}>⭐</Text>
                    <Text className="text-xl" style={{ color: COLORS.text }}>{user?.xp} XP</Text>
                </View>
            </View>
        </View>
    );
}
