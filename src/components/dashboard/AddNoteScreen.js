import React, {Component} from 'react'
import {View, ScrollView, TextInput} from 'react-native'
import { Appbar } from 'react-native-paper'
import AddNoteScreenStyle from '../../styles/AddNoteScreen.styles'
import * as Keychain from 'react-native-keychain'
import Firebase from '../../../config/Firebase'
import { Strings } from '../../Language/Strings';

export default class AddNoteScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title : '',
            note : '' 
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
        if(this.state.title != '' || this.state.note != '') {
            const credential = await Keychain.getGenericPassword();
            const UserCredential = JSON.parse(credential.password);
            Firebase.database().ref('notes/' + UserCredential.user.uid).push({
                title : this.state.title,
                note : this.state.note
            })
            .then(() => console.log('Note Added')) 
            .catch((error) => console.log(error))  
        }
        this.props.navigation.push('Home')
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