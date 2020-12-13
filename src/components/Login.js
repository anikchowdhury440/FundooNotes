import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import * as KeyChain from 'react-native-keychain'

import LoginStyle from '../styles/Login.styles'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email : '',
            password : '',
            emailValidation : true,
            passwordValidation : true,
            secureTextPassword : true,
        }
    }

    emailHandler = async (email) => {
        await this.setState({
            email : email
        })
        this.validateEmail();
    }

    passwordHandler = async (password) => {
        await this.setState({
            password : password
        })
        this.validatePassword();
    }

    validateEmail = () => {
        const emailRejex = new RegExp("^[0-9a-zA-Z]+([._+-][0-9A-Za-z]+)*@[0-9A-Za-z]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$")
        if(emailRejex.test(this.state.email)) {
            this.setState({
                emailValidation : true
            })
        } 
        else {
            this.setState({
                emailValidation : false
            })
        }
    }

    validatePassword = () => {
        const passwordRegex = new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[*.!@#$%^&(){}:'<>,.>/~`_+=|].).{8,}$");
        if(passwordRegex.test(this.state.password)) {
            this.setState({
                passwordValidation: true
            })
        }
        else {
            this.setState({
                passwordValidation: false
            })
        }
    }

    handleSecureTextPassword = () => {
        //const {onPress} = this.props
        if(this.state.secureTextPassword == true) {
            this.setState({
                secureTextPassword : false
            })
        }
        else {
            this.setState({
                secureTextPassword : true
            })
        }
        //onPress();
    }

    handleSignUpButton = () => {
        //const {onPress} = this.props
        this.props.navigation.navigate("Register")
        //onPress();
    }

    handleSignInButton = async () => {
        try{
            const credential = await KeyChain.getGenericPassword();
            if(credential) {
                if(credential.username == this.state.email && credential.password == this.state.password) {
                    console.log('Valid Credential');
                }
                else {
                    console.log('Invalid Credential');
                }
            }
            else {
                console.log('no credential');
            }
        }
        catch(error) {
            console.log('Error', error);
        }
    }

    handleForgotPasswordButton = () => {
        this.props.navigation.navigate("ForgotPassword")
    }

    render() {
        return(
            <ScrollView>
                <View style = {LoginStyle.container} >
                    <View style = {LoginStyle.signin_container}>
                        <View>
                            <Text style = {LoginStyle.signin_text}>Sign in</Text>
                        </View>
                        <View style = {LoginStyle.textinput_view_style}>
                            <TextInput 
                                placeholder = {"Email"} 
                                style = {LoginStyle.textinput_style}
                                onChangeText = {this.emailHandler}/>
                        </View>
                        <View>
                            <Text style = {LoginStyle.text_error_style}>
                                {(this.state.email == '') ? 'required..' : (this.state.emailValidation) ? null : 'Invalid Email..'}
                            </Text>
                        </View>
                        <View style = {LoginStyle.textinput_view_style}>
                            <TextInput placeholder = {"Password"} 
                                style = {[LoginStyle.textinput_style, LoginStyle.password_textinput_style]}
                                onChangeText = {this.passwordHandler}
                                secureTextEntry = {this.state.secureTextPassword}/>

                            {(this.state.secureTextPassword) ?
                                <TouchableOpacity 
                                    style = {LoginStyle.icon}
                                    onPress = {this.handleSecureTextPassword}>
                                        <Image style = {LoginStyle.icon_style} source = {require('../assets/eye.png')}/>
                                </TouchableOpacity> 
                                : 
                                 <TouchableOpacity 
                                    style = {LoginStyle.icon}
                                    onPress = {this.handleSecureTextPassword}>
                                        <Image style = {LoginStyle.icon_style} source = {require('../assets/eye-off.png')}/>
                                 </TouchableOpacity>  
                            }
                            
                        </View>
                        <View>
                            <Text style = {LoginStyle.text_error_style}>
                                {(this.state.password == '') ? 'required..' : (this.state.passwordValidation) ? null : 'Invalid Password..'}
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity 
                                style = {LoginStyle.forgot_password_style}
                                onPress = {this.handleForgotPasswordButton}>
                                    <Text style = {LoginStyle.forgot_password_text_style}>Forgot Password ?</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity 
                                style = {LoginStyle.signin_button_styles}
                                onPress = {this.handleSignInButton}>    
                                <Text style = {LoginStyle.signin_button_text}>SIGN IN</Text>
                            </TouchableOpacity> 
                        </View>
                        <View style = {LoginStyle.signup_block}>
                            <Text>Don't have an account? </Text>
                            <TouchableOpacity onPress = {this.handleSignUpButton}>
                                <Text style = {LoginStyle.signup_text}>SIGN UP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}