import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { COLORS } from "../../constants/theme";

export default function TabsLayout() {
    const { isAuthenticate, user } = useSelector(state => state.auth);

    if (!isAuthenticate) return <Redirect href={'/(auth)'} />

    if (isAuthenticate && user.role == 'admin') return <Redirect href={'/(admin)/dashboard'} />

    return (
        <Tabs screenOptions={{ headerShown: false, unmountOnBlur: true, }}
            tabBar={({ state, descriptors, navigation }) => {

                const orderedRoutes = [...state.routes].sort((a, b) => {
                    if (a.name.includes("profile")) return 1; // move profile to end
                    if (b.name.includes("profile")) return -1;
                    return 0;
                });


                return <View style={styles.container} >
                    {
                        orderedRoutes.map((route, index) => {
                            const isFocused = state.index === state.routes.indexOf(route);
                            const baseName = route.name.split("/")[0];
                            const iconName = {
                                home: "home",
                                search: "search",
                                leaderboard: "stats-chart",
                                trade: "person",
                                profile: "person",
                            }[baseName] || "ellipse";

                            const onPress = () => {
                                const event = navigation.emit({
                                    type: "tabPress",
                                    target: route.key,
                                    canPreventDefault: true,
                                });
                                if (!isFocused && !event.defaultPrevented) {
                                    navigation.navigate(route.name);
                                }
                            };

                            return (
                                <TouchableOpacity
                                    key={route.key}
                                    onPress={onPress}
                                    style={styles.tab}
                                    accessibilityRole="button"
                                    accessibilityState={isFocused ? { selected: true } : {}}
                                >
                                    <Ionicons
                                        name={iconName}
                                        size={26}
                                        color={isFocused ? `${COLORS.primary}` : "#999"}
                                    />
                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
            }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "black",
        paddingVertical: 25,
        justifyContent: "space-around",
        alignItems: "center",
    },
    tab: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    }
});
