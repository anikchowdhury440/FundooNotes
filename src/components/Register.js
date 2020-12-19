import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import RegisterStyle from '../styles/Register.styles';
import UserServices from '../../services/UserServices';

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
            firstNameEmpty : false,
            lastNameEmpty : false,
            emailEmpty : false,
            passwordEmpty : false,
            confirmPasswordEmpty : false,
            emailPresent : false
        }
    }

    firstNameHandler = async (firstName) => {
        await this.setState({
            firstName : firstName,
            firstNameEmpty : false,
        })
        this.validateFirstName();
    }

    lastNameHandler = async (lastName) => {
        await this.setState({
            lastName : lastName,
            lastNameEmpty : false,
        })
        this.validateLastName();
    }

    emailHandler = async (email) => {
        await this.setState({
            email : email,
            emailEmpty : false,
            emailPresent : false,
        })
        this.validateEmail();
    }

    passwordHandler = async (password) => {
        await this.setState({
            password : password,
            passwordEmpty : false,
        })
        this.validatePassword();
        if(this.state.confirmPassword != '') {
            this.validateConfirmPassword();
        }
    }

    confirmPasswordHandler = async (confirmPassword) => {
        await this.setState({
            confirmPassword : confirmPassword,
            confirmPasswordEmpty : false,
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
        const nameRegex = new RegExp("^[A-Z][a-z]{2,}$")
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

    handleSecureTextPassword = () => {
        const {onPress} = this.props
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
        (onPress == undefined) ? null : onPress();
    }

    handleSecureTextConfirmPassword = () => {
        const {onPress} = this.props
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
        (onPress == undefined) ? null : onPress();
    }

    handleSignInButton = () => {
        const {onPress} = this.props;
        this.props.navigation.push('Login')
        onPress();
    }

    handleSignUpButton = async () => {
        const {onPress} = this.props;
        if(this.state.firstName != '' && 
            this.state.lastName != '' &&
            this.state.email != '' &&
            this.state.password != '' &&
            this.state.confirmPassword != '' &&
            this.state.firstNameValidation == true &&
            this.state.lastNameValidation == true &&
            this.state.emailValidation == true &&
            this.state.passwordValidation == true && 
            this.state.confirmPasswordValidation == true ) {
                await UserServices.register(this.state.email, this.state.password)
                    .then(user => {
                        //alert('You are Registered Successfully')
                        this.props.navigation.push("Login")
                    })
                    .catch(error => {
                        if(error == 'Email Already Exist') {
                            this.setState({
                                emailPresent : true
                            })
                        }
                    })
        }
        else {
            if(this.state.firstName == '') {
                await this.setState({
                    firstNameEmpty : true
                })
            }
            if(this.state.lastName == ''){
                await this.setState({
                    lastNameEmpty : true
                })
            }
            if(this.state.email == '') {
                await this.setState({
                    emailEmpty : true
                })
            }
            if(this.state.password == '') {
                await this.setState({
                    passwordEmpty : true
                })
            }
            if(this.state.confirmPassword == '') {
                await this.setState({
                    confirmPasswordEmpty : true
                })
            }
        }
        onPress();
    }

    render() {
        return(
            <ScrollView>
                <View style = {RegisterStyle.image_view_style}>
                    <Image style = {RegisterStyle.image_style} source = {require('../assets/app-logo.png')}/>
                </View>
                <View style = {RegisterStyle.container}>
                    <View style = {RegisterStyle.signup_container}>
                        <View>
                            <Text style = {RegisterStyle.signup_text}>Sign Up</Text>
                        </View>
                        <View style = {RegisterStyle.textinput_view_style}>
                            <TextInput 
                                placeholder = {"First Name"} 
                                style = {RegisterStyle.textinput_style}
                                maxLength = {20}
                                onChangeText = {this.firstNameHandler}/>
                        </View>
                        <View>
                            <Text style = {RegisterStyle.text_error_style}>
                                {(this.state.firstNameEmpty) ? 'required..' : (this.state.firstNameValidation) ? null : 'Invalid First Name'}
                            </Text>
                        </View>
                        <View style = {RegisterStyle.textinput_view_style}>
                            <TextInput 
                                placeholder = {"Last Name"} 
                                style = {RegisterStyle.textinput_style}
                                maxLength = {20}
                                onChangeText = {this.lastNameHandler}/>
                        </View>
                        <View>
                            <Text style = {RegisterStyle.text_error_style}>
                                {(this.state.lastNameEmpty) ? 'required..' : (this.state.lastNameValidation) ? null : 'Invalid Last Name..'}
                            </Text>
                        </View>
                        <View style = {RegisterStyle.textinput_view_style}>
                            <TextInput 
                                placeholder = {"Email"}
                                maxLength = {30} 
                                style = {RegisterStyle.textinput_style}
                                onChangeText = {this.emailHandler}/>
                        </View>
                        <View>    
                            <Text style = {RegisterStyle.text_error_style}>
                                {(this.state.emailEmpty) ? 'required..' : (this.state.emailValidation) ? (this.state.emailPresent) ? 'Email Already Exist' : null : 'Invalid Email..'}
                            </Text>
                        </View>
                        <View style = {RegisterStyle.textinput_view_style}>
                            <TextInput placeholder = {"Password"} 
                                style = {[RegisterStyle.textinput_style, RegisterStyle.password_textinput_style]}
                                secureTextEntry = {this.state.secureTextPassword}
                                maxLength = {25}
                                onChangeText = {this.passwordHandler}/>

                                {(this.state.secureTextPassword) ?
                                    <TouchableOpacity 
                                        style = {RegisterStyle.icon}
                                        onPress = {this.handleSecureTextPassword}>
                                            <Image style = {RegisterStyle.icon_style} source = {require('../assets/eye.png')}/>
                                    </TouchableOpacity> 
                                    : 
                                    <TouchableOpacity 
                                        style = {RegisterStyle.icon}
                                        onPress = {this.handleSecureTextPassword}>
                                            <Image style = {RegisterStyle.icon_style} source = {require('../assets/eye-off.png')}/>
                                    </TouchableOpacity>  
                                }
                            
                        </View>
                        <View>    
                            <Text style = {RegisterStyle.text_error_style}>
                                {(this.state.passwordEmpty) ? 'required..' : (this.state.passwordValidation) ? null : 'Invalid Password..'}
                            </Text>
                        </View>
                        <View style = {RegisterStyle.textinput_view_style}>
                            <TextInput placeholder = {"Confirm Password"} 
                                style = {[RegisterStyle.textinput_style, RegisterStyle.password_textinput_style]}
                                secureTextEntry = {this.state.secureTextConfirmPassword}
                                maxLength = {25}
                                onChangeText = {this.confirmPasswordHandler}/>
                            
                                {(this.state.secureTextConfirmPassword) ?
                                    <TouchableOpacity 
                                        style = {RegisterStyle.icon}
                                        onPress = {this.handleSecureTextConfirmPassword}>
                                            <Image style = {RegisterStyle.icon_style} source = {require('../assets/eye.png')}/>
                                    </TouchableOpacity> 
                                    : 
                                    <TouchableOpacity 
                                        style = {RegisterStyle.icon}
                                        onPress = {this.handleSecureTextConfirmPassword}>
                                        <Image style = {RegisterStyle.icon_style} source = {require('../assets/eye-off.png')}/>
                                    </TouchableOpacity>  
                                }
                        </View>
                        <View>    
                            <Text style = {RegisterStyle.text_error_style}>
                                {(this.state.confirmPasswordEmpty) ? 'required..' : (this.state.confirmPasswordValidation) ? null : 'Password does not matching'}
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity 
                                style = {RegisterStyle.signup_button_styles}
                                onPress = {this.handleSignUpButton}>    
                                    <Text style = {RegisterStyle.signup_button_text}>SIGN UP</Text>
                            </TouchableOpacity> 
                        </View>
                        <View style = {RegisterStyle.signin_block}>
                            <Text>Already have an account? </Text>
                            <TouchableOpacity onPress = {this.handleSignInButton}>
                                <Text style = {RegisterStyle.signin_text}>SIGN IN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
} 
