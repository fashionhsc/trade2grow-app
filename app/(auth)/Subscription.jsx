import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ImageBackground, TouchableOpacity } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import bgImage from "../../assets/images/bg_coinandcandle.png";
import SubscriptionComponent from "../../components/SubscriptionComponent";
import SuccessScreen from "../../components/SuccessScreen";
import api from "../../services/api";
import { COLORS } from "../../constants/theme";


const SubscriptionScreen = () => {
    const { user } = useSelector(state => state.auth)
    const router = useRouter();
    const [selectedPlan, setSelectedPlan] = useState("annual");
    const [showSuccess, setShowSuccess] = useState(false);


    const handlePayNow = async () => {
        try {
            // Step 1: Create order on backend
            const { data } = await api.post('/user/payment/create-order', {
                userId: user._id,
                amount: selectedPlan === 'annual' ? 4999 : 499, // ₹
                planType: selectedPlan
            });
            // Step 2: Open Razorpay Checkout
            var options = {
                description: 'Stage Subscription',
                image: 'https://yourlogo.com/logo.png',
                currency: data.currency,
                key: data.key,
                amount: data.amount,
                name: 'Trade2Grow',
                order_id: data.orderId,
                prefill: {
                    email: user?.email,
                    contact: user?.phone,
                    name: `${user?.firstName} ${user?.lastName}`
                },
                theme: { color: `${COLORS.primary}` }
            };

            RazorpayCheckout.open(options).then(async (paymentResult) => {
                // Step 3: Verify payment on backend
                await api.post('/user/payment/verify-payment', {
                    orderId: paymentResult.razorpay_order_id,
                    paymentId: paymentResult.razorpay_payment_id,
                    signature: paymentResult.razorpay_signature
                });

                Alert.alert("Payment Success", `Congratulation, Your payment has successfully received!`);

                unlockStage();

            }).catch((error) => {
                console.log('paymentResult error>>', error)
                Alert.alert("Payment Failed", error.description);
            });

        } catch (error) {
            console.log("Error 1 : ", error.response);
            console.log("Error 2 : ", error.request);
            console.log("Error 3 : ", error.message);
            Alert.alert("Error : ", "Something went wrong");
        }
    };


    const unlockStage = async () => {
        try {
            const resp = await api.post(`/user/stage/unlock-stage`, user);
            console.log('Stage unlocked response :', resp.data);
            if (resp?.data?.success) {
                setShowSuccess(true);
            }
        } catch (error) {
            console.log("Error : ", JSON.stringify(error));
        }
    }


    const handleCloseSuccess = () => {
        setShowSuccess(false);
    }

    return (
        showSuccess ? (
            <SuccessScreen handleCloseSuccess={handleCloseSuccess}/>
        ) : (
            <ImageBackground
                source={bgImage}
                style={{ flex: 1 }}
                resizeMode="cover"
            >

                {/* Foreground content */}
                <SafeAreaView className="flex-1 bg-black/80 p-5">
                    {/* Close icon */}
                    <TouchableOpacity onPress={() => router.push('/(auth)/VideoSubscribe')}>
                        <Ionicons name="close" size={24} color="#fff" />
                    </TouchableOpacity>

                    <SubscriptionComponent
                        selectedPlan={selectedPlan}
                        setSelectedPlan={setSelectedPlan}
                        handlePayNow={handlePayNow}
                        onTrial={() => alert("Trial started")}
                    />
                </SafeAreaView>
            </ImageBackground>
        )
    );
};

export default SubscriptionScreen;
