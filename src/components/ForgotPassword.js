import React, { Component } from 'react';
import {View, Text, ScrollView, TextInput, TouchableOpacity, Image} from 'react-native';
import UserServices from '../../services/UserServices';
import ForgotPasswordStyle from '../styles/ForgotPassword.styles'
import Strings from '../Language/Strings'

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email : '',
            invalidEmail : false,
            emailEmpty : false,
        }
    }

    emailHandler = async (email) => {
        await this.setState({
            email : email,
            invalidEmail : false,
            emailEmpty : false,
        })
    }

    handleResetPasswordButton = async () => {
        const {onPress} = this.props
        if(this.state.email != '') {
            await UserServices.forgotPassword(this.state.email)
                .then(user => {
                    //alert('Reset Password link is send in your mail')
                    this.props.navigation.navigate('Login')
                })
                .catch(error => {
                    if(error == 'Email not Found') {
                        this.setState({
                            invalidEmail : true
                        })
                    }
                })
        }
        else {
            if(this.state.email == '') {
                await this.setState({
                    emailEmpty : true
                })
            }
        }
        //onPress();
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
                            <Text style = {ForgotPasswordStyle.forgetPassword_text}>{Strings.forgotPassword}</Text>
                        </View>
                        <View style = {ForgotPasswordStyle.textinput_view_style}>
                            <TextInput 
                                placeholder = {Strings.email} 
                                maxLength = {30}
                                style = {ForgotPasswordStyle.textinput_style}
                                onChangeText = {this.emailHandler}/>
                        </View>
                        <View>    
                            <Text style = {ForgotPasswordStyle.text_error_style}>
                                {(this.state.emailEmpty) ? 'required..' : (this.state.invalidEmail) ? 'Email not Found..' : null}
                            </Text>
                        </View>                        
                        <View>
                            <TouchableOpacity 
                                style = {ForgotPasswordStyle.resetPassword_button_styles}
                                onPress = {this.handleResetPasswordButton}>    
                                    <Text style = {ForgotPasswordStyle.resetPassword_button_text}>{Strings.ResetPasswordButton}</Text>
                            </TouchableOpacity> 
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}