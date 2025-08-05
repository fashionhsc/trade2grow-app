import { API_URL } from '@env';
import { AntDesign } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
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
import { useDispatch } from 'react-redux';



const Signup = () => {
    const dispatch = useDispatch(state => state.auth);
    const router = useRouter();
    const { phoneNumber, uid, email } = useLocalSearchParams();
    const [form, setForm] = useState({
        uid: uid,
        firstName: '',
        lastName: '',
        email: email || '',
        phone: phoneNumber || '',
        gender: '',
    });
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [touched, setTouched] = useState({});
    const [emailCheckTimer, setEmailCheckTimer] = useState(null);


    const handleChange = (key, value) => {
        const updatedForm = { ...form, [key]: value };
        setForm(updatedForm);

        if (key === 'email') {
            // Clear existing timer
            if (emailCheckTimer) clearTimeout(emailCheckTimer);

            // Start new debounce timer
            const timer = setTimeout(() => {
                checkEmailAvailability(value);
            }, 500); // wait 500ms after typing stops

            setEmailCheckTimer(timer);

            setErrors(prev => {
                const { email, ...rest } = prev;
                return rest;
            });
        }
        const updatedErrors = validateForm(updatedForm);
        setErrors(prev => ({ ...prev, ...updatedErrors }));

    };

    const checkEmailAvailability = async (email) => {
        try {
            const { data } = await axios.post(`${API_URL}/auth/checkEmail`, { email });
            if (data?.success) {
                setErrors(prev => {
                    const { email, ...rest } = prev;
                    return rest;
                });
            } else {
                setErrors(prev => ({
                    ...prev,
                    email: data?.message || 'Email is already registered',
                }));
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Something went wrong';
            setErrors(prev => ({
                ...prev,
                email: errorMessage,
            }));

        }
    };


    const handleBlur = (key) => {
        setTouched({ ...touched, [key]: true });
    };

    const handleGenderSelect = (gender) => {
        const updatedForm = { ...form, gender };
        setForm(updatedForm);

        const updatedErrors = validateForm(updatedForm);
        setErrors(updatedErrors);
        setTouched({ ...touched, gender: true });
    };

    const handleSubmit = async () => {
        const validationErrors = validateForm(form);
        if (Object.keys(validationErrors).length !== 0) return;
        console.log('Form Data:', form)
        router.push({
            pathname: "/categorySelection",
            params: { form: JSON.stringify(form) },
        });

    };


    const validateForm = (formToValidate = form) => {
        const newErrors = { ...errors };

        // First Name
        if (!formToValidate.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        } else if (!/^[A-Za-z\s]+$/.test(formToValidate.firstName)) {
            newErrors.firstName = 'First name must contain only letters';
        } else {
            delete newErrors.firstName;
        }

        // Last Name
        if (!formToValidate.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        } else if (!/^[A-Za-z\s]+$/.test(formToValidate.lastName)) {
            newErrors.lastName = 'Last name must contain only letters';
        } else {
            delete newErrors.lastName;
        }


        // Email
        if (!email) {
            if (!formToValidate.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formToValidate.email)) {
                newErrors.email = 'Invalid email format';
            }
        }

        // Phone
        if (!phoneNumber) {
            if (!formToValidate.phone.trim()) {
                newErrors.phone = 'Phone number is required';
            } else if (!/^\d{10}$/.test(formToValidate.phone)) {
                newErrors.phone = 'Phone number must be 10 digits';
            } else {
                delete newErrors.phone;
            }
        }

        // Gender
        if (!formToValidate.gender) {
            newErrors.gender = 'Please select a gender';
        } else {
            delete newErrors.gender;
        }
        console.log('email>>', email)
        console.log('newErrors>>', newErrors)
        setIsFormValid(Object.keys(newErrors).length === 0);
        return newErrors;
    };



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
                                        onBlur={() => handleBlur('firstName')}
                                    />
                                </View>
                                {touched.firstName && errors.firstName && (
                                    <Text className="text-red-500 text-sm mt-1">{errors.firstName}</Text>
                                )}
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
                                        onBlur={() => handleBlur('lastName')}
                                    />
                                </View>
                                {touched.lastName && errors.lastName && (
                                    <Text className="text-red-500 text-sm mt-1">{errors.lastName}</Text>
                                )}
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
                                        onBlur={() => handleBlur('email')}
                                        keyboardType="email-address"
                                    />
                                </View>
                                {touched.email && errors.email && (
                                    <Text className="text-red-500 text-sm mt-1">{errors.email}</Text>
                                )}
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
                                        onBlur={() => handleBlur('phone')}
                                    />
                                </View>
                                {touched.phone && errors.phone && (
                                    <Text className="text-red-500 text-sm mt-1">{errors.phone}</Text>
                                )}
                            </View>


                            {/* Gender */}
                            <View>
                                <Text className="text-[#767C8C] font-medium text-lg">Gender</Text>
                                <View className="flex-row justify-between gap-4">
                                    <TouchableOpacity onPress={() => handleGenderSelect('male')} className={`flex-1 py-3 rounded-md border items-center ${form.gender === 'male' ? 'bg-yellow-400 border-yellow-400' : 'bg-zinc-900 border-gray-600'}`}>
                                        <Text className={`font-bold ${form.gender === 'male' ? 'text-black' : 'text-gray-300'}`}>
                                            Male
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleGenderSelect('female')} className={`flex-1 py-3 rounded-md border items-center ${form.gender === 'female' ? 'bg-yellow-400 border-yellow-400' : 'bg-zinc-900 border-gray-600'}`}>
                                        <Text className={`font-bold ${form.gender === 'female' ? 'text-black' : 'text-gray-300'}`}>
                                            Female
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                {touched.gender && errors.gender && (
                                    <Text className="text-red-500 text-sm mt-1">{errors.gender}</Text>
                                )}
                            </View>
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity onPress={handleSubmit} disabled={!isFormValid} className={`py-3 rounded-lg mt-10 ${isFormValid ? 'bg-yellow-400' : 'bg-gray-700'}`} >
                            <Text className={`text-center text-base font-bold ${isFormValid ? 'text-black' : 'text-gray-400'}`} >
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
