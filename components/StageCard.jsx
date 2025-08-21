import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useEffect, useState } from "react";
import { LayoutAnimation, Platform, Text, TouchableOpacity, UIManager, View } from "react-native";
import { useSelector } from 'react-redux';
import { COLORS } from "../constants/theme";

// Enable LayoutAnimation on Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function StageCard({ stage }) {
    const { user } = useSelector(state => state.auth);

    const [expanded, setExpanded] = useState(false);

    // useEffect(() => {
    //     if (user?.currentStage?.stageId === stage.stageId) {
    //         setExpanded(true);
    //     }
    // }, [user?.currentStage, stage.stageId]);

    const toggleExpand = () => {
        LayoutAnimation.easeInEaseOut();
        setExpanded(prev => !prev);
    };


    const currentStageId = user?.currentStage?.stageId || 0;

    let stageIcon = null;

    if (stage.stageId === currentStageId) {
        stageIcon = <FontAwesome5 name="crown" size={26} color={COLORS.gold} />;
    } else if (stage.stageId < currentStageId) {
        stageIcon = <FontAwesome5 name="check-circle" size={26} color={COLORS.success || "green"} />;
    } else {
        stageIcon = <FontAwesome5 name="lock" size={26} color={COLORS.gold} />;
    }

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={toggleExpand}
            style={{
                backgroundColor: COLORS.card,
                padding: 16,
                marginVertical: 10,
                width: "90%",
                borderRadius: 20,
                alignItems: "center",
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 5,
                borderWidth: 1,
                borderColor:
                    user?.currentStage?.stageId == stage.stageId
                        ? COLORS.gold
                        : COLORS.card,
            }}
        >
            {/* Icon */}
            {stageIcon}

            {/* Title */}
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: COLORS.text,
                    marginTop: 8,
                }}
            >
                STAGE {stage.stageId}
            </Text>
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: COLORS.text,
                    marginTop: 8,
                }}
            >
                {stage.name}
            </Text>

            {/* Description */}
            <Text
                style={{
                    fontSize: 14,
                    color: COLORS.subtext,
                    textAlign: "center",
                    marginTop: 6,
                }}
            >
                {stage.description}
            </Text>

            {/* Highlight Label */}
            {user?.currentStage?.stageId == stage.stageId && (
                <View
                    style={{
                        backgroundColor: COLORS.highlight,
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 12,
                        marginTop: 10,
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                        You're On Fire 🔥
                    </Text>
                </View>
            )}

            {/* Expanded Section */}
            {expanded && (
                <View style={{ marginTop: 12, width: "100%" }}>
                    <Text style={{ color: COLORS.text, fontWeight: "600" }}>
                        Difficulty: {stage.difficultyLevel}
                    </Text>
                    <Text style={{ color: COLORS.text }}>
                        Required Coins: {stage.requiredCoins}
                    </Text>
                    <Text style={{ color: COLORS.text }}>
                        Rewards → Coins: {stage.rewards?.coins}, XP: {stage.rewards?.xp}
                    </Text>

                    {/* Videos */}
                    <Text
                        style={{
                            marginTop: 10,
                            fontWeight: "600",
                            color: COLORS.text,
                            fontSize: 16,
                        }}
                    >
                        Videos:
                    </Text>
                    {stage.videos?.map((video, idx) => (
                        <View
                            key={video._id}
                            style={{
                                marginTop: 6,
                                padding: 8,
                                backgroundColor: COLORS.card,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: COLORS.subtext,
                            }}
                        >
                            <Text style={{ color: COLORS.text, fontWeight: "500" }}>
                                {idx + 1}. {video.title}
                            </Text>
                            <Text style={{ color: COLORS.subtext, fontSize: 12 }}>
                                Duration: {Math.floor(video.duration / 60)} min
                            </Text>
                        </View>
                    ))}
                </View>
            )}
        </TouchableOpacity>
    );
}
