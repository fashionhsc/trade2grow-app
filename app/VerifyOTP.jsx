import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
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
import { auth } from '../config/firebase';
import { firebaseLoginPhone } from '../store/slices/authSlice';

const VerifyOtp = () => {
    const dispatch = useDispatch();
    const { phoneNumber, verificationId } = useLocalSearchParams();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]);
    const [resendTime, setResendTime] = useState(30);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const router = useRouter();


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
        try {
            const credential = PhoneAuthProvider.credential(verificationId, fullOtp);
            const userCredential = await signInWithCredential(auth, credential);

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
            }

        } catch (err) {
            console.error("OTP verification failed", err.message);
        }
    };

    const handleResend = () => {
        if (resendTime === 0) {
            console.log('Resending OTP...');
            setResendTime(30);
        }
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
                            <TouchableOpacity onPress={() => router.push('/Login')}>
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
                                disabled={resendTime !== 0}
                                className="bg-gray-900 py-3 mt-2 items-center rounded-lg"
                            >
                                <Text className={`ml-2 font-semibold ${resendTime === 0 ? 'text-yellow-400' : 'text-gray-500'}`}>
                                    I haven't received OTP {resendTime !== 0 ? `(${resendTime})s` : ''}
                                </Text>
                            </TouchableOpacity>

                            {/* Verify Button */}
                            <TouchableOpacity
                                onPress={handleVerify}
                                disabled={!isButtonEnabled}
                                className={`py-3 rounded-lg mt-2 ${isButtonEnabled ? 'bg-yellow-400' : 'bg-gray-700'}`}
                            >
                                <Text className={`text-center text-base font-bold ${isButtonEnabled ? 'text-black' : 'text-gray-400'}`}>
                                    Verify OTP
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
