import { StyleSheet, Text, View } from 'react-native'

const StagesScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Manage Stages</Text>
        </View>
    )
}

export default StagesScreen

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    text: { fontSize: 22, fontWeight: "bold" },
});