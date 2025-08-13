import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../../../constants/theme';

export default function UserDetails() {
    const { user } = useSelector(state => state.auth);

    const details = [
        { label: "Name", value: `${user.firstName} ${user.lastName}`, icon: "person" },
        { label: "Email", value: user.email, icon: "mail" },
        { label: "Phone", value: `${user.countryCode} ${user.phone}`, icon: "call" },
        { label: "Gender", value: user.gender || "Not set", icon: "male-female" },
        { label: "Category", value: user.category?.name || "N/A", icon: "briefcase" },
        { label: "Coins", value: `${user.coins}`, icon: "cash" },
        { label: "XP", value: `${user.xp}`, icon: "star" },
        { label: "Current Stage", value: `${user.currentStage?.name} - ${user.currentStage?.stageId}` || "Not started", icon: "flag" },
        { label: "Paid User", value: user.isPaidUser ? "Yes" : "No", icon: "card" },
        { label: "Joined At", value: new Date(user.joinedAt).toLocaleDateString(), icon: "calendar" },
    ];

    return (

        < ScrollView
            className="mt-5"
            contentContainerStyle={{ paddingBottom: 40 }}
        >
            {
                details.map((item, index) => (
                    <View
                        key={index}
                        className="flex-row items-center border-b border-neutral-800 p-5"
                    >
                        <Ionicons name={item.icon} size={22} color={COLORS.primary} />
                        <Text className="text-neutral-400 ml-3 flex-1">{item.label}</Text>
                        <Text className="text-white font-semibold text-right flex-1">
                            {item.value}
                        </Text>
                    </View>
                ))
            }
        </ScrollView >
    );
}
