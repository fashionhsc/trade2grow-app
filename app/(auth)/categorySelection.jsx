import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import bgImage from "../../assets/images/bg_coinandcandle.png";
import api from '../../services/api';
import { firebaseRegisterPhone } from '../../store/slices/authSlice';
import { showErrorToast, showSuccessToast } from '../../utils/toast';


const CategorySelection = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { form } = useLocalSearchParams();
    let parsedForm = JSON.parse(form);
    const [selectedCat, setSelectedCat] = useState({});
    const [categories, setCategories] = useState([]);

    const handleSubmit = async () => {
        try {
            parsedForm.category = selectedCat._id;
            if (parsedForm?.phone?.callingCode && parsedForm?.phone?.phoneNumber) {
                const fullPhone = `+${parsedForm.phone.callingCode}${parsedForm.phone.phoneNumber}`;
                parsedForm.phone = fullPhone;
            }
            const resp = await dispatch(firebaseRegisterPhone(parsedForm))
            console.log(resp?.payload)
            if (resp?.payload?.success) {
                showSuccessToast(resp?.payload?.message)
                router.push('/VideoSubscribe');

            } else {
                showErrorToast(resp?.payload?.message || 'Registration failed');
            }
        } catch (error) {
            console.log("registeration is failed", err.message);
            showErrorToast(err.message || 'Internal error');
        }
    }

    const fetchCategories = async () => {
        try {
            const resp = await api.get(`/category/list/user`);
            if (resp.data?.categories) {
                setCategories(resp.data.categories);
            }
        } catch (error) {
            console.log('Error fetching categories:', error?.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <ImageBackground source={bgImage} style={{ flex: 1 }} resizeMode="cover" >

            <StatusBar barStyle="light-content" backgroundColor="black" />
            <View className="flex-1 py-20 px-6 justify-between">
                <View>
                    <Text className="text-white text-2xl font-bold mb-6 text-center">Select Category</Text>

                    <View className="gap-4">
                        {categories.map((item, index) => (
                            <TouchableOpacity key={index} activeOpacity={0.7} onPress={() => setSelectedCat(item)} className={`rounded-2xl p-6 border items-center ${selectedCat.name === item.name
                                ? 'bg-primary border-primary'
                                : 'bg-zinc-900 border-gray-600'
                                }`}>
                                <Image source={{ uri: item?.image }} style={{ width: 40, height: 40 }} resizeMode="contain" />
                                <Text className={`text-lg font-semibold ${selectedCat.name === item.name ? 'text-black' : 'text-white'
                                    }`}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <TouchableOpacity onPress={handleSubmit} disabled={!selectedCat.name} className={`py-3 mb-5 rounded-lg mt-10 ${selectedCat.name ? 'bg-primary' : 'bg-gray-700'}`} >
                    <Text className={`text-center text-base font-bold ${selectedCat.name ? 'text-black' : 'text-gray-400'}`} >
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default CategorySelection;
