import { StyleSheet, Text, View } from 'react-native'

const CategoryScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Manage Categories</Text>
        </View>
    )
}

export default CategoryScreen

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center", justifyContent: "center" },
    text: { fontSize: 22, fontWeight: "bold" },
});