import {View, Text, Button, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import CustomINput from "@/components/CustomINput";
import CustomButton from "@/components/CustomButton";
import {createUser} from "@/lib/useAppwrite";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({name : "", email: "", password: ""});
    const submit = async () => {

        const {name, email, password} = form;

        if(!name || !email || !password)
            return Alert.alert("Error", "Please enter a valid email");

        setIsSubmitting(true);

        try {
            await createUser({
                email,
                password,
                name,
            })
            router.replace("/");
        }
        catch (error: any) {
            Alert.alert("Error", error.message);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            <CustomINput
                placeholder={"Enter your full name"}
                value={form.name}
                onChangeText={(text) => {
                    setForm((prevState) => ({...prevState, name: text}));
                }}
                label={"Full Name"}/>

            <CustomINput
                placeholder={"Enter your email"}
                value={form.email}
                onChangeText={(text) => {
                    setForm((prevState) => ({...prevState, email: text}));
                }}
                label={"Email"}
                keyboardType={"email-address"}/>

            <CustomINput
                placeholder={"Enter your password"}
                value={form.password}
                onChangeText={(text) => {
                    setForm((prevState) => ({...prevState, password: text}));
                }}
                label={"Password"}
                secureTextEntry={true} />


            <CustomButton isLoading={isSubmitting} onPress={submit}
                          title={"Sign Up"}/>

            <View className={" flex justify-center mt-5 flex-row gap-2"}>
                <Text className={"base-regular text-gray-100"}>
                   Already have an account?
                </Text>
                <Link href="/sign-in" className={"base-bold text-primary"}>
                    Sign In
                </Link>
            </View>
        </View>
    )
}
export default SignUp
