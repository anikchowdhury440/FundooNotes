import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image} from 'react-native';
import UserServices from '../../services/UserServices';
import LoginStyle from '../styles/Login.styles'
import { Button } from 'react-native-paper';
import SocialServices from '../../services/SocialServices';

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email : '',
            password : '',
            invalidEmail : false,
            invalidPassword : false,
            secureTextPassword : true,
            emailEmpty : false,
            passwordEmpty : false,
        }
    }

    emailHandler = async (email) => {
        await this.setState({
            email : email,
            invalidEmail : false,
            invalidPassword : false,
            emailEmpty : false
        })
    }

    passwordHandler = async (password) => {
        await this.setState({
            password : password,
            invalidEmail : false,
            invalidPassword : false,
            passwordEmpty : false
        })
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

    handleSignUpButton = async () => {
        const {onPress} = this.props;
        this.props.navigation.navigate("Register")
        //onPress();
    }

    handleSignInButton = async () => {
        const {onPress} = this.props
        if(this.state.email != '' && this.state.password != '')
        {
            await UserServices.login(this.state.email, this.state.password)
                .then(UserCredential => {
                    this.props.navigation.navigate('Dashboard')
                })
                .catch(error => {
                    if(error == 'Email not Found') {
                        this.setState({
                            invalidEmail : true
                        })
                    }
                    if(error == 'Incorrect Password') {
                        this.setState({
                            invalidPassword : true
                        })
                    }
                })
        }
        else{
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
        }
        //onPress();
    }

    handleForgotPasswordButton = () => {
        const {onPress} = this.props;
        this.props.navigation.navigate("ForgotPassword")
        //onPress();
    }

    handleFacebookLoginButton = async () => {
        const {onPress} = this.props;
        SocialServices.facebookLogin()
            .then(UserCredential => {
                SocialServices.writeUserDataForFacebookLogin(UserCredential);
                this.props.navigation.navigate('Dashboard')
            })
            .catch(error => {
                console.log(error)
            })
        //onPress();
    }
    
    render() {
        return(
            <ScrollView>
                <View style = {LoginStyle.image_view_style}>
                    <Image style = {LoginStyle.image_style} source = {require('../assets/app-logo.png')}/>
                </View>
                <View style = {LoginStyle.container} >
                    <View style = {LoginStyle.signin_container}>
                        <View>
                            <Text style = {LoginStyle.signin_text}>Sign in</Text>
                        </View>
                        <View style = {LoginStyle.textinput_view_style}>
                            <TextInput 
                                placeholder = {"Email"} 
                                maxLength = {30}
                                style = {LoginStyle.textinput_style}
                                onChangeText = {this.emailHandler}/>
                        </View>
                        <View>
                            <Text style = {LoginStyle.text_error_style}>
                                {(this.state.emailEmpty) ? 'required..' : (this.state.invalidEmail) ? 'Email not Found..' : null}
                            </Text>
                        </View>
                        <View style = {LoginStyle.textinput_view_style}>
                            <TextInput placeholder = {"Password"} 
                                style = {[LoginStyle.textinput_style, LoginStyle.password_textinput_style]}
                                onChangeText = {this.passwordHandler}
                                maxLength = {20}
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
                                {(this.state.passwordEmpty) ? 'required..' : (this.state.invalidPassword) ? 'Invalid Password..' : null}
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
                        <View>
                            <Text style = {LoginStyle.or_text}>Or</Text>
                        </View>
                        <View style = {LoginStyle.facebook_button_container}>
                            <Button icon = "facebook" 
                                style = {LoginStyle.facebook_button_style} 
                                color = {'white'} 
                                onPress={this.handleFacebookLoginButton}>
                                    Login with Facebook
                            </Button>
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