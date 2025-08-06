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
import PhoneNumberInput from '../components/PhoneInput';
import { regex } from '../constants/regex';


const Signup = () => {
    const router = useRouter();
    let { phoneNumber, uid, email } = useLocalSearchParams();
    // phoneNumber = ''
    const [form, setForm] = useState({
        uid: uid,
        firstName: '',
        lastName: '',
        email: email || '',
        phone: phoneNumber || '',
        gender: 'male',
    });
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [touched, setTouched] = useState({});
    const [emailCheckTimer, setEmailCheckTimer] = useState(null);
    const [phoneCheckTimer, setPhoneCheckTimer] = useState(null);

    const handleChange = (key, value) => {
        const updatedForm = { ...form, [key]: value };
        setForm(updatedForm);
        setTouched({ ...touched, [key]: true });
        switch (key) {
            case 'email': {
                const emailRegex = regex.email;
                if (!value || value.trim() === '') {
                    setErrors(prev => ({ ...prev, email: 'Email is required' }));
                    break;
                }

                if (!emailRegex.test(value.trim())) {
                    setErrors(prev => ({ ...prev, email: 'Enter a valid email address' }));
                    break;
                }
                setErrors(prev => {
                    const updated = { ...prev };
                    delete updated.email;
                    return updated;
                });
                if (emailCheckTimer) clearTimeout(emailCheckTimer);
                const emailTimer = setTimeout(() => checkEmailAvailability(value.trim()), 500);
                setEmailCheckTimer(emailTimer);

                break;
            }

            case 'phone': {
                const trimmed = typeof value === 'string' ? value.trim() : value?.phoneNumber?.trim();

                if (!trimmed) {
                    setErrors(prev => ({ ...prev, phone: 'Phone is required' }));
                    break;
                }

                const phoneRegex = regex.phone; // India 10-digit number starting with 6-9
                if (!phoneRegex.test(trimmed)) {
                    setErrors(prev => ({ ...prev, phone: 'Enter a valid 10-digit Indian phone number' }));
                    break;
                }

                setErrors(prev => {
                    const updated = { ...prev };
                    delete updated.phone;
                    return updated;
                });

                if (phoneCheckTimer) clearTimeout(phoneCheckTimer);
                const phoneTimer = setTimeout(() => checkPhoneAvailability(trimmed), 500);
                setPhoneCheckTimer(phoneTimer);

                break;
            }


            case 'firstName':
            case 'lastName': {
                const trimmed = value.trim();
                const fieldLabel = key === 'firstName' ? 'First name' : 'Last name';

                if (!trimmed) {
                    setErrors(prev => ({ ...prev, [key]: `${fieldLabel} is required` }));
                    break;
                }

                const nameRegex = /^[A-Za-z]+$/;
                if (!nameRegex.test(trimmed)) {
                    setErrors(prev => ({ ...prev, [key]: `${fieldLabel} should contain only letters` }));
                    break;
                }

                if (trimmed.length < 2) {
                    setErrors(prev => ({ ...prev, [key]: `${fieldLabel} is too short` }));
                    break;
                }

                if (trimmed.length > 20) {
                    setErrors(prev => ({ ...prev, [key]: `${fieldLabel} is too long` }));
                    break;
                }

                // Valid – remove error
                setErrors(prev => {
                    const updated = { ...prev };
                    delete updated[key];
                    return updated;
                });

                break;
            }
            default:
                break;
        }


        const isValid = validateForm(updatedForm, errors);
        setIsFormValid(isValid);
    };


    const validateForm = (form, errors) => {
        const hasEmpty = Object.entries(form).some(([key, value]) => {
            if (typeof value === 'string') return value.trim() === '';
            return !value;
        });
        return !hasEmpty && Object.keys(errors).length === 0;
    };


    const updateFieldError = (field, message) => {
        setErrors(prev => {
            const updatedErrors = { ...prev };

            if (message) {
                updatedErrors[field] = message;
            } else {
                delete updatedErrors[field];
            }
            setIsFormValid(Object.keys(updatedErrors).length === 0);
            return updatedErrors;
        });
    };


    // Email check
    const checkEmailAvailability = async (email) => {
        try {
            const { data } = await axios.post(`${API_URL}/auth/checkEmail`, { email });
            updateFieldError('email', data?.success ? null : data?.message || 'Email is already registered');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Something went wrong';
            updateFieldError('email', errorMessage);
        }
    };

    // Phone check
    const checkPhoneAvailability = async (phone) => {
        try {
            const { data } = await axios.post(`${API_URL}/auth/checkphone`, { phone });
            updateFieldError('phone', data?.success ? null : data?.message || 'Phone is already registered');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Something went wrong';
            updateFieldError('phone', errorMessage);
        }
    };


    const handleGenderSelect = (gender) => {
        if (!gender || gender == '') return setErrors((prev => ({ ...prev, 'gender': 'Gender is required' })))
        const updatedForm = { ...form, gender };
        setForm(updatedForm);

        setTouched({ ...touched, gender: true });
    };


    const handleSubmit = async () => {
        const validationErrors = validateForm(form,errors);
        if (Object.keys(validationErrors).length !== 0) return;
        console.log('Form Data:', form)
        router.push({
            pathname: "/categorySelection",
            params: { form: JSON.stringify(form) },
        });

    };

    const handlePhoneChange = (data) => {
        handleChange('phone', data)
    }



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
                                        placeholder="Last Name"
                                        placeholderTextColor="#999"
                                        value={form.lastName}
                                        onChangeText={(text) => handleChange('lastName', text)}
                                    />
                                </View>
                                {touched.lastName && errors.lastName && (
                                    <Text className="text-red-500 text-sm mt-1">{errors.lastName}</Text>
                                )}
                            </View>
                            <View>
                                <Text className="text-[#767C8C] font-medium text-lg">Email</Text>
                                <View className="relative">
                                    <Fontisto name="email" size={20} color={`${email ? 'gray' : 'white'}`} style={{ position: 'absolute', top: 18, left: 10, zIndex: 10 }} />
                                    <TextInput
                                        className={`bg-zinc-900 border border-gray-600 rounded-md ${email ? 'text-[#767C8C]' : 'text-white'} px-10 py-5`}
                                        placeholder="abc@xyz.com"
                                        placeholderTextColor="#999"
                                        value={form.email}
                                        onChangeText={(text) => handleChange('email', text)}
                                        editable={email ? false : true}
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
                                    {
                                        phoneNumber ? (
                                            <>
                                                <Ionicons name="call-outline" size={20} color="#767C8C" style={{ position: 'absolute', top: 18, left: 10, zIndex: 10 }} />
                                                <TextInput
                                                    className="bg-zinc-900 border border-gray-600 rounded-md text-[#767C8C] px-10 py-5"
                                                    value={form.phone}
                                                    onChangeText={(text) => handleChange('phone', text)}
                                                    editable={false}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <PhoneNumberInput onChange={handlePhoneChange} />
                                                {touched.phone && errors.phone && (
                                                    <Text className="text-red-500 text-sm mt-1">{errors.phone}</Text>
                                                )}
                                            </>
                                        )
                                    }
                                </View>
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
