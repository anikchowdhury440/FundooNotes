import React, { Component } from 'react';
import {View, Text, ScrollView, TextInput, TouchableOpacity, Image} from 'react-native';
import UserServices from '../../../services/UserServices';
import ForgotPasswordStyle from '../../styles/ForgotPassword.styles'
import {Strings} from '../../Language/Strings';
import { Dialog, Portal, Button, Provider, Paragraph } from 'react-native-paper';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email : '',
            invalidEmail : false,
            emailEmpty : false,
            visible : false
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
            UserServices.forgotPassword(this.state.email)
                .then(user => {
                    this.setState({
                        visible : true
                    })
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
        onPress();
    }

    hideDialog = async  () => {
        const {onDismiss} = this.props
        await this.setState({
            visible : false
        })
        onDismiss();
    }

    handleDialogButton = () => {
        const {onPress} = this.props
        this.props.navigation.navigate('Login')
        onPress()
    }

    render() {
        return(
            <Provider>
                <ScrollView>
                    <View style = {ForgotPasswordStyle.image_view_style}>
                        <Image style = {ForgotPasswordStyle.image_style} source = {require('../../assets/app-logo.png')}/>
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
                                    {(this.state.emailEmpty) ? Strings.requiredfield : (this.state.invalidEmail) ? Strings.emailNotFound : null}
                                </Text>
                            </View>    
                                                
                            <View>
                                <TouchableOpacity 
                                    style = {ForgotPasswordStyle.resetPassword_button_styles}
                                    onPress = {this.handleResetPasswordButton}>    
                                        <Text style = {ForgotPasswordStyle.resetPassword_button_text}>{Strings.ResetPasswordButton}</Text>
                                </TouchableOpacity> 
                            </View>

                            <Portal>
                                <Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
                                    <Dialog.Content>
                                        <Paragraph style = {{fontSize : 20, paddingTop : 20}}>{Strings.sendMailMessage}</Paragraph>
                                    </Dialog.Content>
                                    <Dialog.Actions>
                                        <Button onPress={this.handleDialogButton}>{Strings.ok}</Button>
                                    </Dialog.Actions>
                                </Dialog>
                            </Portal>
                        </View>
                    </View>
                </ScrollView>
            </Provider>
        )
    }
}