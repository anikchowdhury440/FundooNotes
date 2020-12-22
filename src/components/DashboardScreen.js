import React from 'react';
import { View, Text} from 'react-native';
import DashBoard from './DashBoard'

const DashboardScreen = ({navigation}) => {
    return (
        <View style = {{height : '100%'}}>
            <DashBoard navigation = {navigation}/>
        </View>
    )
}

export default DashboardScreen;