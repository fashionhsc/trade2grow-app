import { API_URL } from '@env';
import { AntDesign } from '@expo/vector-icons';
import { getAuth, PhoneAuthProvider, signInWithCredential } from '@react-native-firebase/auth';
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { firebaseLoginPhone, setUser } from '../store/slices/authSlice';
import { showSuccessToast } from '../utils/toast';




const VerifyOtp = () => {
    const dispatch = useDispatch();
    let { phoneNumber, verificationId, email } = useLocalSearchParams();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const inputs = useRef([]);
    const [resendTime, setResendTime] = useState(30);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    useEffect(() => {
        const filled = otp.every((digit) => digit !== '');
        setIsButtonEnabled(filled);
    }, [otp]);

    useEffect(() => {
        if (resendTime === 0) return;
        const interval = setInterval(() => {
            setResendTime((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [resendTime]);

    const handleChange = (text, index) => {
        if (/^\d?$/.test(text)) {
            const newOtp = [...otp];
            newOtp[index] = text;
            setOtp(newOtp);
            if (text && index < 5) {
                inputs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };


    const handleVerify = async () => {
        const fullOtp = otp.join('')
        setLoading(true);
        try {
            if (email) {
                const resp = await axios.post(`${API_URL}/auth/verify-otp`, { email, fullOtp });
                console.log('resp?.data>>>>', resp?.data?.user)
                if (resp?.data?.success == false && resp?.data?.message == 'user not found') {
                    router.push({
                        pathname: "/Signup",
                        params: {
                            email: email,
                        },
                    });
                } else if (resp?.data?.success) {
                    showSuccessToast('Logged in successfully!')
                    router.push('/dashboard'); // redirect on success
                    dispatch(setUser({ user: resp?.data?.user }))
                }
            } else {
                console.log('verifi :', verificationId)
                const credential = PhoneAuthProvider.credential(verificationId, fullOtp);
                const userCredential = await signInWithCredential(getAuth(), credential);
                const firebaseUser = userCredential.user;
                const resp = await dispatch(firebaseLoginPhone(firebaseUser))
                if (resp?.payload?.success == false && resp?.payload?.message == 'user not found') {
                    router.push({
                        pathname: "/Signup",
                        params: {
                            phoneNumber: phoneNumber,
                            uid: firebaseUser.uid
                        },
                    });
                } else if (resp?.payload?.success) {
                    showSuccessToast('Logged in successfully')
                    router.push('/dashboard'); // redirect on success
                }
            }

        } catch (err) {
            Toast.show({
                type: 'error',
                text1: 'Invalid OTP',
            });
            console.log("OTP verification failed", err);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            if (resendTime === 0) {
                console.log('Resending OTP...');
                setResendTime(30);
            }
        } catch (error) {
            console.error("Resend Otp Error: ", error.message);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-black">
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <View className="flex-1 p-10">
                        {/* Header */}
                        <View className="flex flex-row gap-5 items-baseline mb-6">
                            <TouchableOpacity onPress={() => router.push('/')}>
                                <AntDesign name="left" size={20} color="white" />
                            </TouchableOpacity>
                            <Text className="text-white text-2xl font-bold">Verify OTP</Text>
                        </View>

                        <Text className="text-white font-bold text-xl mb-2">OTP Verification</Text>
                        <Text className="text-white text-base mb-4">
                            We just sent you an SMS with 6-digit code. Looks like you're close to logging in!
                        </Text>

                        {/* OTP Input Boxes */}
                        <View className="flex-row justify-between mb-6">
                            {otp.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => (inputs.current[index] = ref)}
                                    className="w-12 h-14 text-white text-2xl font-bold text-center bg-zinc-900 border border-gray-600 rounded-md"
                                    keyboardType="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChangeText={(text) => handleChange(text, index)}
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                />
                            ))}
                        </View>

                        <View className="gap-10">
                            {/* Resend OTP */}
                            <TouchableOpacity
                                onPress={handleResend}
                                disabled={resendTime !== 0 || loading}
                                className="bg-gray-900 py-3 mt-2 items-center rounded-lg"
                            >
                                <Text className={`ml-2 font-semibold ${resendTime === 0 || !loading ? 'text-yellow-400' : 'text-gray-500'}`}>
                                    I haven't received OTP {resendTime !== 0 ? `(${resendTime})s` : ''}
                                </Text>
                            </TouchableOpacity>

                            {/* Verify Button */}
                            <TouchableOpacity
                                onPress={handleVerify}
                                disabled={!isButtonEnabled || loading}
                                className={`py-3 rounded-lg mt-2 ${isButtonEnabled ? 'bg-yellow-400' : 'bg-gray-700'}`}
                            >
                                <Text className={`text-center text-base font-bold ${isButtonEnabled ? 'text-black' : 'text-gray-400'}`}>
                                    {loading ? 'Verifing...' : 'Verify Otp'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default VerifyOtp;
