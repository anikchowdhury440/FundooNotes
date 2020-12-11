import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../components/LoginScreen';
import RegisterScreen from '../components/RegisterScreen';

const Stack = createStackNavigator();

function ApplicationStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName = "Login"
                screenOptions = {{headerShown : false}}>
                <Stack.Screen name = "Login" component = {LoginScreen}/>
                <Stack.Screen name = "Register" component = {RegisterScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ApplicationStack;