import {View, Text, TextInput} from 'react-native'
import React, {useState} from 'react'
import {CustomInputProps} from "@/type";
import cn from "clsx";

const CustomINput = ({placeholder = "Enter text"
                         , value, onChangeText, label, secureTextEntry = false, keyboardType = "default" } : CustomInputProps) => {

    const [isFocused, setisFocused] = useState(false)

    return (
        <View className="w-full">
            <Text className="label">{label}</Text>
            <TextInput
                autoCapitalize={"none"}
                autoCorrect={false}
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#888"
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                onFocus={() => {
                    setisFocused(true)
                }}
                onBlur={() => {
                    setisFocused(false)
                }}
                className={cn("input", isFocused ? "border-primary" : "border-gray-300")}
            />
        </View>
    )
}
export default CustomINput
