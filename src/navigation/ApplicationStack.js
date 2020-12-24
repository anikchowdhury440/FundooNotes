import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../components/pages/LoginScreen';
import RegisterScreen from '../components/pages/RegisterScreen';
import ForgotPasswordScreen from '../components/pages/ForgotPasswordScreen';
import DrawerNavigator from './DrawerNavigationStack';

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
                <Stack.Screen name = "Home" component = {DrawerNavigator}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default ApplicationStack;