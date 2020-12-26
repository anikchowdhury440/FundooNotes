import React, {Component} from 'react'
import {View, ScrollView, TextInput} from 'react-native'
import { Appbar, Snackbar } from 'react-native-paper'
import AddNoteScreenStyle from '../../styles/AddNoteScreen.styles'
import * as Keychain from 'react-native-keychain'
import { Strings } from '../../Language/Strings';
import UserNoteServices from '../../../services/UserNoteServices'
import Firebase from '../../../config/Firebase'

export default class AddNoteScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noteKey : '',
            title : '',
            note : '', 
        }
    }

    componentDidMount = async () => {
        if(this.props.route.params != undefined) {
            await this.setState({
                noteKey : this.props.route.params.noteKey,
                title : this.props.route.params.notes.title,
                note : this.props.route.params.notes.note
            })
        }
    }

    handleTitle = async (title) => {
        await this.setState({
            title : title
        })
    }

    handleNote = async (note) => {
        await this.setState({
            note : note
        })
    }

    handleBackIconButton = async () => {
        const {onPress} = this.props
        const credential = await Keychain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);
        if(this.state.title != '' || this.state.note != '') {
            if(this.props.route.params == undefined) {
                UserNoteServices.storeNoteinDatabase(UserCredential.user.uid, this.state.title, this.state.note)
                    .then(() => this.props.navigation.push('Home'))
                    .catch(error => console.log(error)) 
            } 
            else {
                UserNoteServices.updateNoteInFirebase(UserCredential.user.uid, this.state.noteKey, this.state.title, this.state.note)
                    .then(() => this.props.navigation.push('Home'))
                    .catch(error => console.log(error))
            }
        }
        else{
            if(this.props.route.params == undefined) {
                this.props.navigation.push('Home', { screen: 'Notes', params : {isEmptyNote : true}}) 
            } 
            else {
                UserNoteServices.updateNoteInFirebase(UserCredential.user.uid, this.state.noteKey, this.state.title, this.state.note)
                    .then(() => this.props.navigation.push('Home'))
                    .catch(error => console.log(error))
            }
        }
        //onPress();  
    }

    render() {
        return (
            <View style = {AddNoteScreenStyle.mainContainer}>
                <View>
                    <Appbar style = {AddNoteScreenStyle.header_style}>
                        <Appbar.Action 
                            style = {{marginLeft : 10}}
                            icon = 'keyboard-backspace'
                            onPress = {this.handleBackIconButton}/>
                        <Appbar.Content />
                        <Appbar.Action
                            style = {AddNoteScreenStyle.header_icon_style}                             
                            icon = 'pin-outline'/>
                        <Appbar.Action    
                            style = {AddNoteScreenStyle.header_icon_style}                          
                            icon = 'bell-plus-outline'/>
                        <Appbar.Action 
                            icon = 'archive-arrow-down-outline'/>
                    </Appbar>
                </View>
                <ScrollView style = {{marginBottom : 60}}> 
                    <TextInput
                        style = {AddNoteScreenStyle.title_style}
                        multiline = {true} 
                        placeholder = {Strings.title}
                        onChangeText = {this.handleTitle}
                        value = {this.state.title}
                    />
                    <TextInput
                        style = {AddNoteScreenStyle.note_style}
                        multiline = {true} 
                        placeholder = {Strings.note}
                        onChangeText = {this.handleNote}
                        value = {this.state.note}
                    />
                </ScrollView>
                <View style = {AddNoteScreenStyle.bottom_view}>
                    <Appbar style = {AddNoteScreenStyle.bottom_appbar_style}>
                        <Appbar.Action 
                            icon = 'plus-box-outline'/>
                        <Appbar.Content/>
                        <Appbar.Action 
                            icon = 'undo-variant'/>
                        <Appbar.Action 
                            icon = 'redo-variant'/>
                        <Appbar.Content/>
                        <Appbar.Action 
                            icon = 'dots-vertical'/>
                    </Appbar>
                </View>
            </View>
        )
    }
}