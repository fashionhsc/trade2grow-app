import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Stage = () => {
    return (
        <SafeAreaView className="flex-1 bg-black justify-center items-center">
            <Text className="text-white text-2xl">👤 Admin Stage Screen</Text>
        </SafeAreaView>
    )
}

export default Stage