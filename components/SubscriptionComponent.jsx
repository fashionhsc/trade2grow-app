import { Text, TouchableOpacity, View } from "react-native";

const SubscriptionComponent = ({ selectedPlan, setSelectedPlan, handlePayNow, onTrial }) => {

    return (
        <View className="flex-1 bg-transparent my-5 justify-between">
            <View className='items-center my-5'>
                {/* Title */}
                <View>
                    <Text className="text-4xl text-center  md:text-3xl font-bold text-white my-5">
                        Start Using trading with Premium Benefits
                    </Text>
                </View>

                {/* Benefits */}
                <View className='w-full px-3 my-2'>
                    <Text className="text-white text-xl md:text-base mb-2">
                        ✓ Save unlimited Quiz to a single Trading
                    </Text>
                    <Text className="text-white text-xl md:text-base mb-2">
                        ✓ Create unlimited Trade and Learn
                    </Text>
                    <Text className="text-white text-xl md:text-base mb-5">
                        ✓ Daily backups to keep your data safe
                    </Text>
                </View>

                {/* Price Options */}
                <View className="flex-row justify-between my-5 gap-4 px-3">
                    {/* Annual */}
                    <TouchableOpacity
                        className={`rounded-lg items-center p-4 w-[48%] ${selectedPlan === "annual" ? "border border-[#FFD700]" : "bg-black/30 border border-[#333]"}`}
                        onPress={() => setSelectedPlan("annual")}
                    >
                        <Text className={`text-base md:text-lg font-medium ${selectedPlan === "annual" ? "text-[#FFD700]" : "text-white"}`}>
                            Annual
                        </Text>
                        <Text className={`text-2xl md:text-2xl font-bold ${selectedPlan === "annual" ? "text-[#FFD700]" : "text-white"}`}>
                            $79.99
                        </Text>
                        <Text className={`text-xs md:text-sm ${selectedPlan === "annual" ? "text-[#FFD700]" : "text-gray-400"}`}>
                            per year
                        </Text>
                    </TouchableOpacity>

                    {/* Monthly */}
                    <TouchableOpacity
                        className={`rounded-lg items-center p-4 w-[48%] ${selectedPlan === "monthly" ? "border border-[#FFD700]" : "bg-black/30 border border-[#333]"}`}
                        onPress={() => setSelectedPlan("monthly")}
                    >
                        <Text className={`text-base md:text-lg font-medium ${selectedPlan === "monthly" ? "text-[#FFD700]" : "text-white"}`}>
                            Monthly
                        </Text>
                        <Text className={`text-2xl md:text-2xl font-bold ${selectedPlan === "monthly" ? "text-[#FFD700]" : "text-white"}`}>
                            $7.99
                        </Text>
                        <Text className={`text-xs md:text-sm ${selectedPlan === "monthly" ? "text-[#FFD700]" : "text-gray-400"}`}>
                            per month
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

            {/* Buttons */}
            <View className='w-full px-3'>
                <TouchableOpacity
                    className="bg-[#FFD700] py-4 rounded-full items-center mb-3"
                    onPress={() => handlePayNow()}
                >
                    <Text className="text-base md:text-lg font-bold text-black">
                        Pay now
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="border border-white py-4 rounded-full items-center"
                    onPress={onTrial}
                >
                    <Text className="text-white text-base md:text-lg">
                        7 day trial
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SubscriptionComponent;
