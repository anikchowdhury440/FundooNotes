import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import RegisterStyle from '../styles/Register.styles';

export default class Register extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            firstName : '',
            lastName : '',
            email : '',
            password : '',
            confirmPassword : '',
            firstNameValidation : true,
            lastNameValidation : true,
            emailValidation : true,
            passwordValidation : true,
            confirmPasswordValidation : true,
            secureTextPassword : true,
            secureTextConfirmPassword : true, 
        }
    }

    firstNameHandler = async (firstName) => {
        await this.setState({
            firstName : firstName
        })
        this.validateFirstName();
    }

    lastNameHandler = async (lastName) => {
        await this.setState({
            lastName : lastName
        })
        this.validateLastName();
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

    confirmPasswordHandler = async (confirmPassword) => {
        await this.setState({
            confirmPassword : confirmPassword
        })
        this.validateConfirmPassword();
    }

    validateFirstName = () => {
        const nameRegex = new RegExp("^[A-Z][a-z]{1,}$")
        if(nameRegex.test(this.state.firstName)) {
            this.setState({
                firstNameValidation : true
            })
        }
        else {
            this.setState({
                firstNameValidation : false
            })
        }
    }

    validateLastName = () => {
        const nameRegex = new RegExp("^[A-Z][a-z]{1,}$")
        if(nameRegex.test(this.state.lastName)) {
            this.setState({
                lastNameValidation : true
            })
        }
        else {
            this.setState({
                lastNameValidation : false
            })
        }
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

    handleSecureTextPassword = async () => {
        if(this.state.secureTextPassword == true) {
            await this.setState({
                secureTextPassword : false
            })
        }
        else {
            await this.setState({
                secureTextPassword : true
            })
        }
    }

    handleSecureTextConfirmPassword = async () => {
        if(this.state.secureTextConfirmPassword == true) {
            await this.setState({
                secureTextConfirmPassword : false
            })
        }
        else {
            await this.setState({
                secureTextConfirmPassword : true
            })
        }
    }

    render() {
        return(
            <ScrollView>
                <View style = {RegisterStyle.container}>
                    <View style = {RegisterStyle.signup_container}>
                        <View>
                            <Text style = {RegisterStyle.signup_text}>Sign Up</Text>
                        </View>
                        <View style = {RegisterStyle.textinput_view_style}>
                            <TextInput 
                                placeholder = {"First Name"} 
                                style = {RegisterStyle.textinput_style}
                                onChangeText = {this.firstNameHandler}/>
                        </View>
                        <View>
                            <Text style = {RegisterStyle.text_error_style}>
                                {(this.state.firstNameValidation || this.state.firstName == '') ? null : 'Invalid First Name..'}
                            </Text>
                        </View>
                        <View style = {RegisterStyle.textinput_view_style}>
                            <TextInput 
                                placeholder = {"Last Name"} 
                                style = {RegisterStyle.textinput_style}
                                onChangeText = {this.lastNameHandler}/>
                        </View>
                        <View>
                            <Text style = {RegisterStyle.text_error_style}>
                                {(this.state.lastNameValidation || this.state.lastName == '') ? null : 'Invalid Last Name..'}
                            </Text>
                        </View>
                        <View style = {RegisterStyle.textinput_view_style}>
                            <TextInput 
                                placeholder = {"Email"} 
                                style = {RegisterStyle.textinput_style}
                                onChangeText = {this.emailHandler}/>
                        </View>
                        <View>    
                            <Text style = {RegisterStyle.text_error_style}>
                                {(this.state.emailValidation || this.state.email == '') ? null : 'Invalid Email..'}
                            </Text>
                        </View>
                        <View style = {RegisterStyle.textinput_view_style}>
                            <TextInput placeholder = {"Password"} 
                                style = {[RegisterStyle.textinput_style, RegisterStyle.password_textinput_style]}
                                secureTextEntry = {this.state.secureTextPassword}
                                onChangeText = {this.passwordHandler}/>

                                {(this.state.secureTextPassword) ?
                                    <TouchableOpacity 
                                        style = {RegisterStyle.icon}
                                        onPress = {this.handleSecureTextPassword}>
                                            <Image style = {RegisterStyle.icon_style} source = {require('../assets/eye-off.png')}/>
                                    </TouchableOpacity> 
                                    : 
                                    <TouchableOpacity 
                                        style = {RegisterStyle.icon}
                                        onPress = {this.handleSecureTextPassword}>
                                            <Image style = {RegisterStyle.icon_style} source = {require('../assets/eye.png')}/>
                                    </TouchableOpacity>  
                                }
                            
                        </View>
                        <View>    
                            <Text style = {RegisterStyle.text_error_style}>
                                {(this.state.passwordValidation || this.state.password == '') ? null : 'Weak Password..'}
                            </Text>
                        </View>
                        <View style = {RegisterStyle.textinput_view_style}>
                            <TextInput placeholder = {"Confirm Password"} 
                                style = {[RegisterStyle.textinput_style, RegisterStyle.password_textinput_style]}
                                secureTextEntry = {this.state.secureTextConfirmPassword}
                                onChangeText = {this.confirmPasswordHandler}/>
                            
                            {(this.state.secureTextConfirmPassword) ?
                                <TouchableOpacity 
                                    style = {RegisterStyle.icon}
                                    onPress = {this.handleSecureTextConfirmPassword}>
                                        <Image style = {RegisterStyle.icon_style} source = {require('../assets/eye-off.png')}/>
                                </TouchableOpacity> 
                                : 
                                <TouchableOpacity 
                                    style = {RegisterStyle.icon}
                                    onPress = {this.handleSecureTextConfirmPassword}>
                                    <Image style = {RegisterStyle.icon_style} source = {require('../assets/eye.png')}/>
                                </TouchableOpacity>  
                            }
                        </View>
                        <View>    
                            <Text style = {RegisterStyle.text_error_style}>
                                {(this.state.confirmPasswordValidation || this.state.confirmPassword == '') ? null : 'Password not matching..'}
                            </Text>
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
