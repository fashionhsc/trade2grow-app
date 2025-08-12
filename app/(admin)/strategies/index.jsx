import { StyleSheet, Text, View } from 'react-native'

const StrategiesScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Manage Strategies</Text>
        </View>
    )
}

export default StrategiesScreen

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    text: { fontSize: 22, fontWeight: "bold" },
});