import React, { Component } from 'react';
import {View, Text, ScrollView, TextInput, TouchableOpacity, Image} from 'react-native';
import * as KeyChain from 'react-native-keychain'

import ForgotPasswordStyle from '../styles/ForgotPassword.styles'

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email : '',
            password : '',
            confirmPassword : '',
            invalidEmail : false,
            passwordValidation : true,
            confirmPasswordValidation : true,
            secureTextPassword : true,
            secureTextConfirmPassword : true,
        }
    }

    emailHandler = async (email) => {
        await this.setState({
            email : email,
            invalidEmail : false
        })
    }

    passwordHandler = async (password) => {
        await this.setState({
            password : password
        })
        this.validatePassword();
        if(this.state.confirmPassword != '') {
            this.validateConfirmPassword();
        }
    }

    confirmPasswordHandler = async (confirmPassword) => {
        await this.setState({
            confirmPassword : confirmPassword
        })
        this.validateConfirmPassword();
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

    validateConfirmPassword = () => {
        if(this.state.password == this.state.confirmPassword) {
            this.setState({
                confirmPasswordValidation : true
            })
        }
        else {
            this.setState({
                confirmPasswordValidation : false
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

    handleSecureConfirmTextPassword = () => {
        if(this.state.secureTextConfirmPassword == true) {
            this.setState({
                secureTextConfirmPassword : false
            })
        }
        else {
            this.setState({
                secureTextConfirmPassword : true
            })
        }
    }

    handleResetPasswordButton = async () => {
        if(this.state.email != '' && this.state.password != '' && this.state.confirmPassword != '') {
            try{
                const credential = await KeyChain.getGenericPassword();
                if(credential.username == this.state.email) {
                    await KeyChain.setGenericPassword(credential.username, this.state.password)
                    this.props.navigation.navigate('Login');
                }
                else {
                    this.setState({
                        invalidEmail : true
                    })
                }
            }
            catch(error) {
                console.log('Error', error);
            }
        }
    }

    render() {
        return(
            <ScrollView>
                <View style = {ForgotPasswordStyle.image_view_style}>
                    <Image style = {ForgotPasswordStyle.image_style} source = {require('../assets/app-logo.png')}/>
                </View>
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
                                {(this.state.email == '') ? 'required..' : null}
                            </Text>
                        </View>
                        <View style = {ForgotPasswordStyle.textinput_view_style}>
                            <TextInput placeholder = {"New Password"} 
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
                        <View style = {ForgotPasswordStyle.textinput_view_style}>
                            <TextInput placeholder = {"Confirm Password"} 
                                style = {[ForgotPasswordStyle.textinput_style, ForgotPasswordStyle.password_textinput_style]}
                                secureTextEntry = {this.state.secureTextConfirmPassword}
                                onChangeText = {this.confirmPasswordHandler}/>

                                {(this.state.secureTextConfirmPassword) ?
                                    <TouchableOpacity 
                                        style = {ForgotPasswordStyle.icon}
                                        onPress = {this.handleSecureConfirmTextPassword}>
                                            <Image style = {ForgotPasswordStyle.icon_style} source = {require('../assets/eye.png')}/>
                                    </TouchableOpacity> 
                                    : 
                                    <TouchableOpacity 
                                        style = {ForgotPasswordStyle.icon}
                                        onPress = {this.handleSecureConfirmTextPassword}>
                                            <Image style = {ForgotPasswordStyle.icon_style} source = {require('../assets/eye-off.png')}/>
                                    </TouchableOpacity>  
                                }
                            
                        </View>
                        <View>    
                            <Text style = {ForgotPasswordStyle.text_error_style}>
                                {(this.state.confirmPassword == '') ? 'required..' : (this.state.confirmPasswordValidation) ? null : 'Password does not matching'}
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity 
                                style = {ForgotPasswordStyle.resetPassword_button_styles}
                                onPress = {this.handleResetPasswordButton}>    
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