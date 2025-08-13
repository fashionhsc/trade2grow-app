import Ionicons from '@expo/vector-icons/Ionicons';
import { Dimensions, Image, View } from 'react-native';
import { useSelector } from 'react-redux';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const BADGE_SIZE = SCREEN_WIDTH * 0.20;
const BADGE_MARGIN = BADGE_SIZE * 0.25;

const BadgeImages = {
    1: require('../../../assets/images/Bronze.png'),
    2: require('../../../assets/images/Silver.png'),
    3: require('../../../assets/images/Gold.png'),
    4: require('../../../assets/images/Silver.png'),
    5: require('../../../assets/images/Gold.png'),
};

const Badges = () => {
    const { leaderboardUser } = useSelector(state => state.leaderboard);
    const userUnlockedBadgeLevel = leaderboardUser?.userId?.currentStage?.stageId ?? 0;

    const badges = Object.entries(BadgeImages).map(([id, source]) => ({
        id: Number(id),
        image: source,
    }));

    return (
        <View
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                paddingHorizontal: BADGE_MARGIN,
                // You can add paddingVertical if needed
            }}
        >
            {badges.map(badge => {
                const isLocked = badge.id > userUnlockedBadgeLevel;

                return (
                    <View
                        key={badge.id}
                        style={{
                            alignItems: 'center',
                            marginRight: BADGE_MARGIN,
                            marginBottom: BADGE_MARGIN,
                            width: BADGE_SIZE,
                        }}
                    >
                        <View style={{ width: BADGE_SIZE, height: BADGE_SIZE, position: 'relative' }}>
                            <Image
                                source={badge.image}
                                style={{
                                    width: BADGE_SIZE,
                                    height: BADGE_SIZE,
                                    opacity: isLocked ? 0.4 : 1,
                                    borderRadius: BADGE_SIZE * 0.125,
                                }}
                                resizeMode="contain"
                            />
                            {isLocked && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: [{ translateX: -BADGE_SIZE * 0.23 }, { translateY: -BADGE_SIZE * 0.23 }],
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                        width: BADGE_SIZE * 0.45,
                                        height: BADGE_SIZE * 0.45,
                                        borderRadius: (BADGE_SIZE * 0.45) / 2,
                                    }}
                                >
                                    <Ionicons name="lock-closed" size={BADGE_SIZE * 0.3} color="rgba(255,255,255,0.9)" />
                                </View>
                            )}
                        </View>
                    </View>
                );
            })}
        </View>
    );
};

export default Badges;
