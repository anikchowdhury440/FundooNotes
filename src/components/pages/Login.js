import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image} from 'react-native';
import UserServices from '../../../services/UserServices';
import LoginStyle from '../../styles/Login.styles'
import { Button } from 'react-native-paper';
import SocialServices from '../../../services/SocialServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Strings} from '../../Language/Strings'
import * as Keychain from 'react-native-keychain'
import {storeUserID, storeUserLabel} from '../../redux/actions/CreateNewLabelActions'
import { connect } from 'react-redux'
import SQLiteLabelServices from '../../../services/SQLiteLabelServices';
import NoteDataController from '../../../services/NoteDataController';

class Login extends Component {
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
            isLoggedIn : false
        }
    }

    async componentDidMount(){
        try {
            const isLoggedIn = JSON.parse(await AsyncStorage.getItem('isLoggedIn'))
            if(isLoggedIn) {
                const credential = await Keychain.getGenericPassword();
                const UserCredential = JSON.parse(credential.password);
                await NoteDataController.retrieveDataFromFirebase(UserCredential.user.uid)
                this.props.storeUserId(UserCredential.user.uid)
                this.storeUserLabel(UserCredential.user.uid)
                this.props.navigation.push('Home', { screen: 'Notes' })
            }
          } 
          catch(e) {
            console.log(e)
          }
    }

    storeUserLabel = (userId) => {
        SQLiteLabelServices.selectLabelFromSQliteStorage(userId)
            .then(async result => {
                var temp = [];
                if(result.rows.length != 0) {
                    for (let i = 0; i < result.rows.length; ++i)
                        temp.push(result.rows.item(i));
                    this.props.storeUserLabel(temp)
                }                
            })
            .catch(error => console.log(error))
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
                .then(async (UserCredential) => {
                    this.storeIteminAsyncStorage()
                    await Keychain.setGenericPassword('UserCredential', JSON.stringify(UserCredential));
                    this.storeUserLabel(UserCredential.user.uid)
                    this.props.navigation.push('Home', { screen: 'Notes' })
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

    storeIteminAsyncStorage = async () => {
        try {
            await this.setState({
                isLoggedIn : true
            })
            await AsyncStorage.setItem('isLoggedIn', JSON.stringify(this.state.isLoggedIn));
        } catch (e) {
            console.log(e);
        }
    }

    handleForgotPasswordButton = () => {
        const {onPress} = this.props;
        this.props.navigation.navigate("ForgotPassword")
        //onPress();
    }

    handleFacebookLoginButton = async () => {
        const {onPress} = this.props;
        SocialServices.facebookLogin()
            .then(async UserCredential => {
                UserServices.readUserDataFromRealtimeDatabase(UserCredential.user.uid)
                    .then(data => {
                        if(data == null) {
                            UserServices.writeUserDataInRealtimeDatabase(
                                UserCredential.user.uid, 
                                UserCredential.additionalUserInfo.profile.first_name, 
                                UserCredential.additionalUserInfo.profile.last_name, 
                                UserCredential.additionalUserInfo.profile.email);
                        }
                    })
                this.storeIteminAsyncStorage()
                await Keychain.setGenericPassword('UserCredential', JSON.stringify(UserCredential));
                this.storeUserLabel(UserCredential.user.uid)
                this.props.navigation.push('Home', { screen: 'Notes' })
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
                    <Image style = {LoginStyle.image_style} source = {require('../../assets/app-logo.png')}
                        resizeMode = "stretch"/>
                </View>
                <View style = {LoginStyle.container} >
                    <View style = {LoginStyle.signin_container}>
                        <View>
                            <Text style = {LoginStyle.signin_text}>{Strings.signIn}</Text>
                        </View>
                        <View style = {LoginStyle.textinput_view_style}>
                            <TextInput 
                                placeholder = {Strings.email} 
                                maxLength = {30}
                                style = {LoginStyle.textinput_style}
                                onChangeText = {this.emailHandler}/>
                        </View>
                        <View>
                            <Text style = {LoginStyle.text_error_style}>
                                {(this.state.emailEmpty) ? Strings.requiredfield : (this.state.invalidEmail) ? Strings.emailNotFound : null}
                            </Text>
                        </View>
                        <View style = {LoginStyle.textinput_view_style}>
                            <TextInput placeholder = {Strings.password} 
                                style = {[LoginStyle.textinput_style, LoginStyle.password_textinput_style]}
                                onChangeText = {this.passwordHandler}
                                maxLength = {20}
                                secureTextEntry = {this.state.secureTextPassword}/>

                            {(this.state.secureTextPassword) ?
                                <TouchableOpacity 
                                    style = {LoginStyle.icon}
                                    onPress = {this.handleSecureTextPassword}>
                                        <Image style = {LoginStyle.icon_style} source = {require('../../assets/eye.png')}/>
                                </TouchableOpacity> 
                                : 
                                 <TouchableOpacity 
                                    style = {LoginStyle.icon}
                                    onPress = {this.handleSecureTextPassword}>
                                        <Image style = {LoginStyle.icon_style} source = {require('../../assets/eye-off.png')}/>
                                 </TouchableOpacity>  
                            }
                            
                        </View>
                        <View>
                            <Text style = {LoginStyle.text_error_style}>
                                {(this.state.passwordEmpty) ? Strings.requiredfield : (this.state.invalidPassword) ? Strings.wrongPassword : null}
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity 
                                style = {LoginStyle.forgot_password_style}
                                onPress = {this.handleForgotPasswordButton}>
                                    <Text style = {LoginStyle.forgot_password_text_style}>{Strings.forgotPassword} ?</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity 
                                style = {LoginStyle.signin_button_styles}
                                onPress = {this.handleSignInButton}>    
                                <Text style = {LoginStyle.signin_button_text}>{Strings.signInButton}</Text>
                            </TouchableOpacity> 
                        </View>
                        <View>
                            <Text style = {LoginStyle.or_text}>{Strings.or}</Text>
                        </View>
                        <View style = {LoginStyle.facebook_button_container}>
                            <Button icon = "facebook" 
                                style = {LoginStyle.facebook_button_style} 
                                color = {'white'} 
                                onPress={this.handleFacebookLoginButton}>
                                    {Strings.loginFacebookButton}
                            </Button>
                        </View>
                        <View style = {LoginStyle.signup_block}>
                            <Text>{Strings.doNotHaveAccount}</Text>
                            <TouchableOpacity onPress = {this.handleSignUpButton}>
                                <Text style = {LoginStyle.signup_text}>{Strings.signupButton}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        userLabel : state.createLabelReducer.userLabel
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        storeUserId : (userId) => dispatch(storeUserID(userId)),
        storeUserLabel : (userLabel) => dispatch(storeUserLabel(userLabel))
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(Login)