import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

const Podium = ({ data }) => {
    if (!data || data.length < 3) return null;

    const sorted = [...data].sort((a, b) => b.coins - a.coins);
    const [first, second, third] = sorted;

    const podiumHeights = {
        first: 200,  // tallest
        second: 152, // medium
        third: 126,   // shortest
    };

    const PodiumColumn = ({ user, rank }) => {
        const fullName = `${user?.userId?.firstName} ${user?.userId?.lastName}`;
        const coins = new Intl.NumberFormat('en-IN').format(user?.coins) || 0;
        const initials = `${user?.userId?.firstName?.[0]}${user?.userId?.lastName?.[0]}`;

        const getInitialsStyle = (color) => ({
            backgroundColor: color || '#ccc',
            width: 80,
            height: 80,
            borderRadius: 50,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
        });

        return (
            <View className="items-center">
                {/* Avatar */}
                <View style={getInitialsStyle(user.bgColor)}>
                    <Text className='text-4xl font-bold'>{initials}</Text>
                </View>

                {/* Name */}
                <Text className="text-white text-lg font-semibold">{fullName}</Text>

                {/* XP badge */}
                <View className="bg-yellow-400 rounded-full px-3 py-1 mt-1">
                    <Text className="text-black font-semibold text-lg">{coins} coins</Text>
                </View>

                {/* Podium block */}
                <LinearGradient
                    colors={['#9C6ADE', '#C3A7F6']}
                    start={{ x: 0.5, y: 1 }}
                    end={{ x: 0.5, y: 0 }}
                    style={{
                        marginTop: 10,
                        width: 100,
                        height: podiumHeights[rank],
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Text className="text-white text-8xl font-bold mb-2">
                        {rank === 'first' ? '1' : rank === 'second' ? '2' : '3'}
                    </Text>
                </LinearGradient>
            </View>
        );
    };

    return (
        <View className="flex-row items-end justify-center my-6 gap-4">
            <PodiumColumn user={second} rank="second" />
            <PodiumColumn user={first} rank="first" />
            <PodiumColumn user={third} rank="third" />
        </View>
    );
};

export default Podium;
