import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import RegisterStyle from '../styles/Register.styles';

export default class Register extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.navigation);
    }

    render() {
        return(
            <ScrollView>
                <View style = {RegisterStyle.container}>
                    <View style = {RegisterStyle.signup_container}>
                        <View>
                            <Text style = {RegisterStyle.signup_text}>Sign Up</Text>
                        </View>
                        <View>
                            <TextInput placeholder = {"First Name"} style = {RegisterStyle.textinput_style}/>
                        </View>
                        <View>
                            <TextInput placeholder = {"Last Name"} style = {RegisterStyle.textinput_style}/>
                        </View>
                        <View>
                            <TextInput placeholder = {"Email"} style = {RegisterStyle.textinput_style}/>
                        </View>
                        <View>
                            <TextInput placeholder = {"Password"} 
                                style = {RegisterStyle.textinput_style}
                                secureTextEntry = {true}/>
                        </View>
                        <View>
                            <TextInput placeholder = {"Confirm Password"} 
                                style = {RegisterStyle.textinput_style}
                                secureTextEntry = {true}/>
                        </View>
                        <View>
                            <TouchableOpacity style = {RegisterStyle.signup_button_styles}>    
                                <Text style = {RegisterStyle.signup_button_text}>SIGN UP</Text>
                            </TouchableOpacity> 
                        </View>
                        <View style = {RegisterStyle.signin_block}>
                            <Text>Already have an account? </Text>
                            <TouchableOpacity onPress = {() => this.props.navigation.navigate('Login')}>
                                <Text style = {RegisterStyle.signin_text}>SIGN IN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
} 
