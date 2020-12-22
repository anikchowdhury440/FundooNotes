import React, {Component} from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, Button, Avatar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashBoardStyle from '../../styles/DashBoard.styles';

export default class HeaderToolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView : true
        }
    }

    selectView = async () => {
        const {onPress} = this.props
        await this.setState({
            listView : !this.state.listView
        })
        onPress()
    }

    render() {
        return(
            <View style = {DashBoardStyle.mainContainer}>
                <View>
                    <Appbar style = {DashBoardStyle.container}>
                        <Appbar.Action
                            icon = 'menu'
                            onPress={() => console.log('Pressed button')}
                            />
                        <Appbar.Content
                            titleStyle = {DashBoardStyle.appbar_content_style}
                            title = "Search your notes"
                            onPress={() => console.log('Pressed button')}
                            />
                        <Appbar.Action
                            icon = {this.state.listView ? 'view-grid-outline' : 'view-agenda-outline'}
                            onPress={this.selectView}
                            />
                        <TouchableOpacity
                            style = {DashBoardStyle.avatar_style}
                            onPress = {() => console.log('Button Pressed')}>
                            <Avatar.Image size={24} source={require('../../assets/app-logo.png')} />
                        </TouchableOpacity>
                    </Appbar>
                </View>
                <ScrollView style = {{marginBottom : 60}}>
                    <Button 
                        onPress = { async () => {
                        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
                        this.props.navigation.push('Login')
                        }}>Logout</Button>
                    
                </ScrollView>
                <View style = {DashBoardStyle.bottombar_view}>
                    <Appbar style = {DashBoardStyle.bottombar}>
                        <Appbar.Action
                            icon = 'check-box-outline'
                            onPress={() => console.log('Pressed button')}
                            />
                        <Appbar.Action
                            icon = 'draw'
                            onPress={() => console.log('Pressed button')}
                            />
                        <Appbar.Action
                            icon = 'microphone-outline'
                            onPress={() => console.log('Pressed button')}
                            />
                        <Appbar.Action
                            icon = 'panorama'
                            onPress={() => console.log('Pressed button')}
                            />
                        <Appbar.Content/>
                        <Appbar.Action  
                            style = {DashBoardStyle.plus_button_style} 
                            icon = 'plus'
                            onPress={() => console.log('Pressed button')}
                            />
                    </Appbar>
                </View>
            </View>
        )
    }
}