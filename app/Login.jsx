import { API_URL } from '@env';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { useRouter } from 'expo-router';
import { signInWithPhoneNumber } from "firebase/auth";
import { useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import GoogleLoginButton from '../components/GoogleLoginButton';
import PhoneNumberInput from '../components/PhoneInput';
import { auth } from '../config/firebase';
import { regex } from '../constants/regex';

const Login = () => {
    const recaptchaVerifier = useRef(null);
    const router = useRouter();
    const [isMobileSelected, setIsMobileSelected] = useState(true);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneData, setPhoneData] = useState({
        countryCode: "IN",
        callingCode: "91",
        phoneNumber: "",
    });

    const handlePhoneChange = (data) => {
        setPhoneData(data)
    }
    const handleEmailChange = (text) => {
        setEmail(text);

        const emailRegex = regex.email;

        if (text.trim() === '') {
            setEmailError('Email is required');
        } else if (!emailRegex.test(text.trim())) {
            setEmailError('Enter a valid email address');
        } else {
            setEmailError('');
        }
    };
    const handleOtpSubmit = async () => {
        try {

            if (email) {
                const res = await axios.post(`${API_URL}/auth/send-otp`, { email });
                if (res?.data?.success) {
                    router.push({
                        pathname: "/VerifyOTP",
                        params: {
                            email: email
                        },
                    });
                }
            } else {
                const { callingCode, phoneNumber } = phoneData;
                const fullPhone = `+${callingCode}${phoneNumber}`;
                const confirmation = await signInWithPhoneNumber(auth, fullPhone, recaptchaVerifier.current);
                router.push({
                    pathname: "/VerifyOTP",
                    params: {
                        phoneNumber: fullPhone,
                        verificationId: confirmation.verificationId,
                    },
                });
            }

        } catch (error) {
            console.error("OTP Error: ", error.message);
        }
    };
    const toggleMethod = () => setIsMobileSelected((prev) => !prev);

    return (
        <KeyboardAvoidingView behavior="padding" className="w-full">
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <Animatable.View
                    animation="slideInUp"
                    duration={800}
                    delay={300}
                    easing="ease-out"
                    className="w-full bg-black p-6 rounded-2xl shadow-lg"
                >
                    <FirebaseRecaptchaVerifierModal
                        ref={recaptchaVerifier}
                        firebaseConfig={auth.app.options}
                    />
                    <Text className="text-white text-xl font-semibold mb-4">Sign in with</Text>

                    {/* Toggle Options */}
                    <View className="flex-row justify-between gap-4 mb-5">
                        {/* Mobile Option */}
                        <TouchableOpacity
                            onPress={toggleMethod}
                            className={`flex-1 flex-row items-center justify-center py-3 px-4 border rounded-lg gap-2 ${isMobileSelected ? 'border-yellow-400' : 'border-gray-600'
                                }`}
                        >
                            {isMobileSelected ? (
                                <AntDesign name="check" size={18} color="#FFD700" />
                            ) : (
                                <MaterialIcons name="call" size={18} color="white" />
                            )}
                            <Text
                                className={`text-base font-semibold ${isMobileSelected ? 'text-yellow-400' : 'text-white'
                                    }`}
                            >
                                Mobile
                            </Text>
                        </TouchableOpacity>

                        {/* Email Option */}
                        <TouchableOpacity
                            onPress={toggleMethod}
                            className={`flex-1 flex-row items-center justify-center py-3 px-4 border rounded-lg gap-2 ${!isMobileSelected ? 'border-yellow-400' : 'border-gray-600'
                                }`}
                        >
                            {!isMobileSelected ? (
                                <AntDesign name="check" size={18} color="#FFD700" />
                            ) : (
                                <AntDesign name="mail" size={18} color="white" />
                            )}
                            <Text
                                className={`text-base font-semibold ${!isMobileSelected ? 'text-yellow-400' : 'text-white'
                                    }`}
                            >
                                Email
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Conditional Input Field */}
                    {isMobileSelected ? (
                        <PhoneNumberInput onChange={handlePhoneChange} />
                    ) : (
                        <>
                            <TextInput
                                placeholder="Enter your Email Id"
                                placeholderTextColor="#aaa"
                                keyboardType="email-address"
                                className="border border-gray-500 bg-zinc-900 text-white rounded-lg px-6 py-3 mb-1"
                                value={email}
                                onChangeText={handleEmailChange}
                            />

                            {emailError ? (
                                <Text className="text-red-500 text-sm mb-2">{emailError}</Text>
                            ) : null}
                        </>
                    )}


                    <TouchableOpacity onPress={handleOtpSubmit} className="bg-borderColor py-3 rounded-lg my-4">
                        <Text className="text-black text-center text-base font-bold">Get OTP</Text>
                    </TouchableOpacity>


                    <View className='my-4'>
                        <GoogleLoginButton />
                    </View>

                    {/* <View className="flex-row items-center justify-center opacity-70 px-4"> */}
                    {/* <View className="flex-1 h-px bg-white" /> */}
                    {/* <Text className="text-white text-base font-bold mx-2 text-center">Don't have an Account</Text> */}
                    {/* <View className="flex-1 h-px bg-white" /> */}
                    {/* </View> */}
                    {/* <TouchableOpacity className="bg-black py-3 border border-borderColor rounded-lg my-4">
                        <Text className="text-borderColor text-center text-base font-bold">Sign up</Text>
                    </TouchableOpacity> */}
                </Animatable.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;