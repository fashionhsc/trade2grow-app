import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { COLORS } from "../constants/theme";

const SuccessScreen = ({ handleCloseSuccess }) => {
    const confettiRef = useRef(null);

    return (
        <View style={styles.container}>
            {/* Confetti */}
            <ConfettiCannon
                count={500}
                origin={{ x: -10, y: 0 }}
                fadeOut
                autoStart
                fallSpeed={4000}
            />

            <TouchableOpacity style={styles.closeButton} onPress={handleCloseSuccess}>
                <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Nice Work</Text>

            {/* Check Circle */}
            <View style={styles.checkCircle}>
                <Ionicons name="checkmark" size={40} color="#fff" />
            </View>

            {/* Stars */}
            <View style={styles.starsContainer}>
                <Ionicons name="star" size={28} color={`${COLORS.primary}`} />
                <Ionicons name="star" size={28} color={`${COLORS.primary}`} />
                <Ionicons name="star-outline" size={28} color={`${COLORS.primary}`} />
            </View>

            {/* XP Earned */}
            <Text style={styles.xpText}>You Earned 80 XP</Text>

            {/* Buttons */}
            <TouchableOpacity style={styles.nextStageBtn}>
                <Text style={styles.nextStageText}>Next Stage</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.playAgainBtn}>
                <Text style={styles.playAgainText}>Play Again</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SuccessScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
    },
    closeButton: {
        position: "absolute",
        top: 50,
        left: 20,
        padding: 8,
        zIndex: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        marginTop: 60,
    },
    checkCircle: {
        marginVertical: 20,
        backgroundColor: COLORS.primary,
        padding: 20,
        borderRadius: 100,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.8,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: 0 },
        elevation: 8,
    },
    starsContainer: {
        flexDirection: "row",
        marginVertical: 10,
        gap: 5,
    },
    xpText: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 30,
    },
    nextStageBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginBottom: 12,
    },
    nextStageText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    playAgainBtn: {
        borderWidth: 1,
        borderColor: "#fff",
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    playAgainText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },
});
