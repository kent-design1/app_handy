import {View, Text, Button} from 'react-native'
import React from 'react'
import {router} from "expo-router";

const SignUp = () => {
    return (
        <View>
            <Text>SignUp</Text>
            <Button title="SignUp" onPress={() => router.push('/sign-in')} />
        </View>
    )
}
export default SignUp
