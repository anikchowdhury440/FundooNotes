import React, {Component} from 'react'
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native'
import {Button} from 'react-native-paper'
import ProfileStyle from '../../styles/Profile.styles'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain'
import { Strings } from '../../Language/Strings';
import UserServices from '../../../services/UserServices'

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userDetails : ''
        }
    }

    componentDidMount = async() => {
        const credential = await Keychain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);
        UserServices.readUserDataFromRealtimeDatabase(UserCredential.user.uid)
            .then(async data => {
                await this.setState({
                    userDetails : data
                })
            })
    }

    handleLogoutButton = async () => {
        const {onPress} = this.props;
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
        this.props.navigation.push('Login')
        //onPress()
    }

    render() {
        return (
            <View>
                <View style = {ProfileStyle.image_container_style}>
                    <ImageBackground
                        source = {require('../../assets/blank-profile.png')}
                        style = {{height : 100, width : 100}}>
                            <View style = {{flex : 1, alignItems : 'flex-end'}}>
                                <TouchableOpacity>
                                    <Icon name="edit" size={24} color={'black'}/>
                                </TouchableOpacity>
                            </View>
                    </ImageBackground>
                </View>
                <View style = {{marginTop : 20, marginBottom : 20}}>
                    <View style = {ProfileStyle.text_container_style}>
                        <Text style = {ProfileStyle.text_style}>First Name : </Text>
                        <Text style = {ProfileStyle.text_style}>{this.state.userDetails.firstName}</Text>
                    </View>
                    <View style = {ProfileStyle.text_container_style}>
                        <Text style = {ProfileStyle.text_style}>Last Name : </Text>
                        <Text style = {ProfileStyle.text_style}>{this.state.userDetails.lastName}</Text>
                    </View>
                    <View style = {ProfileStyle.text_container_style}>
                        <Text style = {ProfileStyle.text_style}>Email : </Text>
                        <Text style = {ProfileStyle.text_style}>{this.state.userDetails.email}</Text>
                    </View>
                </View>
                <View style = {{alignSelf : 'center'}}>
                    <Button 
                        style = {ProfileStyle.logout_button_styles}
                        color = 'white'
                        onPress = {this.handleLogoutButton}>
                            {Strings.logout}
                    </Button> 
                </View>
            </View>
        )
    }
}