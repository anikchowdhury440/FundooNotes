import React from 'react';
import { View, Text} from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashBoard from './DashBoard'

const DashboardScreen = ({navigation}) => {
    return (
        <View style = {{backgroundColor : 'white', height : '100%'}}>
            <DashBoard/>
            <Button onPress = { async () => {
                await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
                navigation.push('Login')
            }}>Logout</Button>
        </View>
    )
}

export default DashboardScreen;