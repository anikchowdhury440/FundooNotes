import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';

import LoginStyle from '../styles/Login.styles'

export default class Login extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
                <View style = {LoginStyle.container} >
                    <View style = {LoginStyle.signin_container}>
                        <View>
                            <Text style = {LoginStyle.signin_text}>Sign in</Text>
                        </View>
                        <View>
                            <TextInput placeholder = {"Email"} style = {LoginStyle.textinput_style}/>
                        </View>
                        <View>
                            <TextInput placeholder = {"Password"} 
                                style = {LoginStyle.textinput_style}
                                secureTextEntry = {true}/>
                        </View>
                        <View>
                            <TouchableOpacity style = {LoginStyle.signin_button_styles}>    
                                <Text style = {LoginStyle.signin_button_text}>SIGN IN</Text>
                            </TouchableOpacity> 
                        </View>
                        <View style = {LoginStyle.signup_block}>
                            <Text>Don't have an account? </Text>
                            <TouchableOpacity onPress = {() => this.props.navigation.navigate("Register")}>
                                <Text style = {LoginStyle.signup_text}>SIGN UP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        )
    }
}