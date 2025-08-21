import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../constants/theme";
import api from "../services/api";
import { setUser, updateUserState } from "../store/slices/authSlice";


const SubscriptionComponent = ({ setShowSuccess }) => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [selectedPlan, setSelectedPlan] = useState("annual");


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
                const updateUser = await api.get(`/user/getSingleUser/${user?._id}`);
                dispatch(updateUserState(updateUser?.data?.user))
                setShowSuccess(true);
            }
        } catch (error) {
            console.log("Error : ", JSON.stringify(error));
        }
    }


    return (
        <ScrollView className="flex-1 bg-transparent my-5 " contentContainerStyle={{ justifyContent: 'space-between' }}>
            <View className='items-center my-5'>
                {/* Title */}
                <View>
                    <Text className="text-4xl text-center  md:text-3xl font-bold text-white my-5">Start Using trading with Premium Benefits</Text>
                </View>

                {/* Benefits */}
                <View className='w-full px-3 my-2'>
                    <Text className="text-white text-xl md:text-base mb-2">✓ Save unlimited Quiz to a single Trading</Text>
                    <Text className="text-white text-xl md:text-base mb-2">✓ Create unlimited Trade and Learn</Text>
                    <Text className="text-white text-xl md:text-base mb-5">✓ Daily backups to keep your data safe</Text>
                </View>

                {/* Price Options */}
                <View className="flex-row justify-between my-5 gap-4 px-3">
                    {/* Annual */}
                    <TouchableOpacity className={`rounded-lg items-center p-4 w-[48%] ${selectedPlan === "annual" ? "border border-primary" : "bg-black/30 border border-[#333]"}`} onPress={() => setSelectedPlan("annual")}>
                        <Text className={`text-base md:text-lg font-medium ${selectedPlan === "annual" ? "text-primary" : "text-white"}`}>Annual</Text>
                        <Text className={`text-2xl md:text-2xl font-bold ${selectedPlan === "annual" ? "text-primary" : "text-white"}`}>₹4999</Text>
                        <Text className={`text-xs md:text-sm ${selectedPlan === "annual" ? "text-primary" : "text-gray-400"}`}>per year</Text>
                    </TouchableOpacity>

                    {/* Monthly */}
                    <TouchableOpacity className={`rounded-lg items-center p-4 w-[48%] ${selectedPlan === "monthly" ? "border border-primary" : "bg-black/30 border border-[#333]"}`} onPress={() => setSelectedPlan("monthly")}>
                        <Text className={`text-base md:text-lg font-medium ${selectedPlan === "monthly" ? "text-primary" : "text-white"}`}>Monthly</Text>
                        <Text className={`text-2xl md:text-2xl font-bold ${selectedPlan === "monthly" ? "text-primary" : "text-white"}`}>₹499</Text>
                        <Text className={`text-xs md:text-sm ${selectedPlan === "monthly" ? "text-primary" : "text-gray-400"}`}>per month</Text>
                    </TouchableOpacity>
                </View>

            </View>

            {/* Buttons */}
            <View className='w-full px-3'>
                <TouchableOpacity className="bg-primary py-4 rounded-full items-center mb-3" onPress={() => handlePayNow()}>
                    <Text className="text-base md:text-lg font-bold text-black">Pay now</Text>
                </TouchableOpacity>

                <TouchableOpacity className="border border-white py-4 rounded-full items-center">
                    <Text className="text-white text-base md:text-lg">7 day trial</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SubscriptionComponent;
