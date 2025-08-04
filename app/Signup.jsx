import { AntDesign } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Signup = () => {
    const router = useRouter();
    const { phoneNumber, uid } = useLocalSearchParams();

    const [form, setForm] = useState({
        uid: uid,
        firstName: '',
        lastName: '',
        email: '',
        phone: phoneNumber,
        gender: '',
    });


    const handleChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const handleGenderSelect = (gender) => {
        setForm({ ...form, gender });
    };

    const handleSubmit = () => {
        console.log('Form Data:', form)
    };

    const isFormValid =
        form.firstName && form.lastName && form.email && form.phone && form.gender;

    return (
        <SafeAreaView className="flex-1 bg-black">
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1 p-10">
                        {/* Header */}
                        <View className="flex flex-row gap-5 items-baseline mb-6">
                            <TouchableOpacity onPress={() => router.back()}>
                                <AntDesign name="left" size={20} color="white" />
                            </TouchableOpacity>
                            <Text className="text-white text-2xl font-bold">Sign Up</Text>
                        </View>

                        {/* Input Fields */}
                        <View className="gap-4">
                            <View>
                                <Text className="text-[#767C8C] font-medium text-lg">First Name</Text>
                                <View className="relative">
                                    <Feather
                                        name="user"
                                        size={20}
                                        color="#fff"
                                        style={{ position: 'absolute', top: 18, left: 10, zIndex: 10 }}
                                    />

                                    <TextInput
                                        className="bg-zinc-900 border border-gray-600 rounded-md text-white px-10 py-5"
                                        placeholder="First Name"
                                        placeholderTextColor="#999"
                                        value={form.firstName}
                                        onChangeText={(text) => handleChange('firstName', text)}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text className="text-[#767C8C] font-medium text-lg">Last Name</Text>
                                <View className="relative">
                                    <Feather
                                        name="user"
                                        size={20}
                                        color="#fff"
                                        style={{ position: 'absolute', top: 18, left: 10, zIndex: 10 }}
                                    />

                                    <TextInput
                                        className="bg-zinc-900 border border-gray-600 rounded-md text-white px-10 py-5"
                                        placeholder="First Name"
                                        placeholderTextColor="#999"
                                        value={form.lastName}
                                        onChangeText={(text) => handleChange('lastName', text)}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text className="text-[#767C8C] font-medium text-lg">Email</Text>
                                <View className="relative">
                                    <Fontisto name="email" size={20} color="#fff" style={{ position: 'absolute', top: 18, left: 10, zIndex: 10 }} />
                                    <TextInput
                                        className="bg-zinc-900 border border-gray-600 rounded-md text-white px-10 py-5"
                                        placeholder="abc@xyz.com"
                                        placeholderTextColor="#999"
                                        value={form.email}
                                        onChangeText={(text) => handleChange('email', text)}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text className="text-[#767C8C] font-medium text-lg">Phone</Text>
                                <View className="relative">
                                    <Ionicons name="call-outline" size={20} color="#767C8C" style={{ position: 'absolute', top: 18, left: 10, zIndex: 10 }} />
                                    <TextInput
                                        className="bg-zinc-900 border border-gray-600 rounded-md text-[#767C8C] px-10 py-5"
                                        value={form.phone}
                                        onChangeText={(text) => handleChange('phone', text)}
                                        editable={form.phone ? false : true}
                                    />
                                </View>
                            </View>


                            {/* Gender */}
                            <View>
                                <Text className="text-[#767C8C] font-medium text-lg">Gender</Text>
                                <View className="flex-row justify-between gap-4">
                                    <TouchableOpacity
                                        onPress={() => handleGenderSelect('male')}
                                        className={`flex-1 py-3 rounded-md border items-center ${form.gender === 'male'
                                            ? 'bg-yellow-400 border-yellow-400'
                                            : 'bg-zinc-900 border-gray-600'
                                            }`}
                                    >
                                        <Text
                                            className={`font-bold ${form.gender === 'male'
                                                ? 'text-black'
                                                : 'text-gray-300'
                                                }`}
                                        >
                                            Male
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => handleGenderSelect('female')}
                                        className={`flex-1 py-3 rounded-md border items-center ${form.gender === 'female'
                                            ? 'bg-yellow-400 border-yellow-400'
                                            : 'bg-zinc-900 border-gray-600'
                                            }`}
                                    >
                                        <Text
                                            className={`font-bold ${form.gender === 'female'
                                                ? 'text-black'
                                                : 'text-gray-300'
                                                }`}
                                        >
                                            Female
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={!isFormValid}
                            className={`py-3 rounded-lg mt-10 ${isFormValid ? 'bg-yellow-400' : 'bg-gray-700'
                                }`}
                        >
                            <Text
                                className={`text-center text-base font-bold ${isFormValid ? 'text-black' : 'text-gray-400'
                                    }`}
                            >
                                Continue
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Signup;
