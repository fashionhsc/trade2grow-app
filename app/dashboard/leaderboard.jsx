import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const leaderboard = () => {
    return (
        <SafeAreaView className="flex-1 bg-black justify-center items-center">
            <Text className="text-white text-2xl">👤 Leader Board Screen</Text>
        </SafeAreaView>
    )
}

export default leaderboard