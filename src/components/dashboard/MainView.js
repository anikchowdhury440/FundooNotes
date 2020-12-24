import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Strings } from '../../Language/Strings';
import DrawerContent from './DrawerContent';

export default class MainView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style = {{marginBottom : 60}}>
                <Button 
                    onPress = { async () => {
                        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
                        this.props.navigation.push('Login')
                    }}>
                        {Strings.logout}
                    </Button>           
            </ScrollView>
        )
    }
}