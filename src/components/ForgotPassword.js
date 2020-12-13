import React, { Component } from 'react';
import {View, Text, ScrollView, TextInput, TouchableOpacity, Image} from 'react-native';

import ForgotPasswordStyle from '../styles/ForgotPassword.styles'

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);

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
    }

    render() {
        return(
            <ScrollView>
                <View style = {ForgotPasswordStyle.container}>
                    <View style = {ForgotPasswordStyle.forgetPassword_container}>
                        <View>
                            <Text style = {ForgotPasswordStyle.forgetPassword_text}>Forgot Password</Text>
                        </View>
                        <View style = {ForgotPasswordStyle.textinput_view_style}>
                            <TextInput 
                                placeholder = {"Email"} 
                                style = {ForgotPasswordStyle.textinput_style}
                                onChangeText = {this.emailHandler}/>
                        </View>
                        <View>    
                            <Text style = {ForgotPasswordStyle.text_error_style}>
                                {(this.state.email == '') ? 'required..' : (this.state.emailValidation) ? null : 'Invalid Email..'}
                            </Text>
                        </View>
                        <View style = {ForgotPasswordStyle.textinput_view_style}>
                            <TextInput placeholder = {"Password"} 
                                style = {[ForgotPasswordStyle.textinput_style, ForgotPasswordStyle.password_textinput_style]}
                                secureTextEntry = {this.state.secureTextPassword}
                                onChangeText = {this.passwordHandler}/>

                                {(this.state.secureTextPassword) ?
                                    <TouchableOpacity 
                                        style = {ForgotPasswordStyle.icon}
                                        onPress = {this.handleSecureTextPassword}>
                                            <Image style = {ForgotPasswordStyle.icon_style} source = {require('../assets/eye.png')}/>
                                    </TouchableOpacity> 
                                    : 
                                    <TouchableOpacity 
                                        style = {ForgotPasswordStyle.icon}
                                        onPress = {this.handleSecureTextPassword}>
                                            <Image style = {ForgotPasswordStyle.icon_style} source = {require('../assets/eye-off.png')}/>
                                    </TouchableOpacity>  
                                }
                            
                        </View>
                        <View>    
                            <Text style = {ForgotPasswordStyle.text_error_style}>
                                {(this.state.password == '') ? 'required..' : (this.state.passwordValidation) ? null : 'Invalid Password..'}
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity 
                                style = {ForgotPasswordStyle.resetPassword_button_styles}>    
                                    <Text style = {ForgotPasswordStyle.resetPassword_button_text}>RESET PASSWORD</Text>
                            </TouchableOpacity> 
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress = {() => this.props.navigation.navigate('Login')}>    
                                    <Text style = {ForgotPasswordStyle.backSignIn_button}>Back to SIGN IN</Text>
                            </TouchableOpacity> 
                        </View>

                    </View>
                </View>
            </ScrollView>
        )
    }
}