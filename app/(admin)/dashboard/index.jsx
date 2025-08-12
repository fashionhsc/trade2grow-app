import { StyleSheet, Text, View } from "react-native";

const DashboardScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Admin Dashboard</Text>
        </View>
    );
}

export default DashboardScreen;
const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    text: { fontSize: 22, fontWeight: "bold" },
});

