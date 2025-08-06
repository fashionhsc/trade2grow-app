import React, { useState } from "react";
import { TextInput, View } from "react-native";
import CountryPicker from "react-native-country-picker-modal";

const PhoneNumberInput = ({ onChange }) => {
    const [countryCode, setCountryCode] = useState("IN");
    const [callingCode, setCallingCode] = useState("91");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handlePhoneChange = (text) => {
        // Remove non-digit characters
        const digitsOnly = text.replace(/\D/g, '');

        // Limit to 10 digits
        const limited = digitsOnly.slice(0, 10);
        setPhoneNumber(limited);
        onChange && onChange({ countryCode, callingCode, phoneNumber: limited });
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
        <View className="flex-row items-center border border-gray-500 bg-zinc-900 rounded-lg px-3">
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
                maxLength={10}
            />
        </View>
    );
};

export default PhoneNumberInput;
