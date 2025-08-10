import { StatusBar, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Search = () => {
    return (
        <SafeAreaView className="bg-black flex-1 px-3">
            <StatusBar barStyle="light-content" backgroundColor="black" />

            <Text className='text-white'>Search</Text>
        </SafeAreaView>
    )
}

export default Search