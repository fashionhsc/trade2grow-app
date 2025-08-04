import React, { useState } from "react";
import { TextInput, View } from "react-native";
import CountryPicker from "react-native-country-picker-modal";

const PhoneNumberInput = ({ onChange }) => {
    const [countryCode, setCountryCode] = useState("IN");
    const [callingCode, setCallingCode] = useState("91");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handlePhoneChange = (text) => {
        setPhoneNumber(text);
        onChange && onChange({ countryCode, callingCode, phoneNumber: text });
    };

    const handleCountrySelect = (country) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0]);
        onChange &&
            onChange({
                countryCode: country.cca2,
                callingCode: country.callingCode[0],
                phoneNumber,
            });
    };

    return (
        <View className="flex-row items-center border border-borderColor rounded-lg px-3 py-2 bg-transparent">
            <CountryPicker
                countryCode={countryCode}
                withFlag
                withCallingCode
                withFilter
                onSelect={handleCountrySelect}
                containerButtonStyle={{ marginRight: 10 }}
            />
            <TextInput
                className="flex-1 text-white text-base"
                keyboardType="phone-pad"
                placeholder="Phone number"
                placeholderTextColor="#aaa"
                onChangeText={handlePhoneChange}
                value={phoneNumber}
            />
        </View>
    );
};

export default PhoneNumberInput;
