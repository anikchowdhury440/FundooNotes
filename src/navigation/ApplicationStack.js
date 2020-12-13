import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../components/LoginScreen';
import RegisterScreen from '../components/RegisterScreen';
import ForgotPasswordScreen from '../components/ForgotPasswordScreen';
import DashboardScreen from '../components/DashboardScreen';

const Stack = createStackNavigator();

function ApplicationStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName = "Login"
                screenOptions = {{headerShown : false}}>
                <Stack.Screen name = "Login" component = {LoginScreen}/>
                <Stack.Screen name = "Register" component = {RegisterScreen}/>
                <Stack.Screen name = "ForgotPassword" component = {ForgotPasswordScreen}/>
                <Stack.Screen name = "Dashboard" component = {DashboardScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ApplicationStack;