import React, {Component} from 'react'
import {View, ScrollView, TextInput} from 'react-native'
import { Appbar, Snackbar} from 'react-native-paper'
import AddNoteScreenStyle from '../../styles/AddNoteScreen.styles'
import * as Keychain from 'react-native-keychain'
import { Strings } from '../../Language/Strings';
import UserNoteServices from '../../../services/UserNoteServices'
import RBSheet from 'react-native-raw-bottom-sheet'
import DotsVerticalRBSheetMenu from './DotsVerticalRBSheetMenu'

export default class AddNoteScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noteKey : '',
            title : '',
            note : '',
            userId : '',
            isNoteNotAddedDeleted : false 
        }
    }

    componentDidMount = async () => {
        const credential = await Keychain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);
        await this.setState({
            userId : UserCredential.user.uid
        })
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

    handleDotIconButton = async() => {
        const {onPress} = this.props
        this.RBSheet.open()
        //onPress()
    }

    handleBackIconButton = async () => {
        // const {onPress} = this.props
        if(this.state.title != '' || this.state.note != '') {
            if(this.props.route.params == undefined) {
                console.log(this.state.title)
                UserNoteServices.storeNoteinDatabase(this.state.userId, this.state.title, this.state.note)
                    .then(() => this.props.navigation.push('Home', {screen : 'Notes'}))
                    .catch(error => console.log(error)) 
            } 
            else {
                UserNoteServices.updateNoteInFirebase(this.state.userId, this.state.noteKey, this.state.title, this.state.note)
                    .then(() => this.props.navigation.push('Home', {screen : 'Notes'}))
                    .catch(error => console.log(error))
            }
        }
        else{
            if(this.props.route.params == undefined) {
                this.props.navigation.push('Home', { screen: 'Notes', params : {isEmptyNote : true}}) 
            } 
            else {
                UserNoteServices.removeNoteInFirebase(this.state.userId, this.state.noteKey)
                    .then(() => this.props.navigation.push('Home', {screen : 'Notes', params : {isEmptyNote : true}}))
                    .catch(error => console.log(error))
            }
        }
        // onPress();  
    }

    handleDeleteButton = async() => {
        this.RBSheet.close()
        if(this.props.route.params == undefined){
            await this.setState({
                isNoteNotAddedDeleted : true
            })
        }
        else {
            UserNoteServices.deleteNoteInFirebase(this.state.userId, this.state.noteKey, this.state.title, this.state.note)
                    .then(() => this.props.navigation.push('Home', { screen : 'Notes', 
                                                                    params : {isNoteDeleted : true, 
                                                                            noteKey : this.state.noteKey,
                                                                            title : this.state.title,
                                                                            note : this.state.note,
                                                                            userId : this.state.userId}}))
                    .catch(error => console.log(error))
        }
    }

    isNotAddedNoteDeletedSnackbarHandler = async () => {
        const {onDismiss} = this.props
        await this.setState({ 
            isNoteNotAddedDeleted : false
        })
        //onDismiss();
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
                            icon = 'dots-vertical'
                            onPress = {this.handleDotIconButton}/>
                    </Appbar>
                </View>
                <RBSheet
                    ref = {ref => {this.RBSheet = ref}}
                    height = {250}
                    customStyles = {{
                        container : {
                            marginBottom : 50,
                            borderTopWidth : 1,
                            borderColor : "#d3d3d3", 
                        },
                        wrapper: {
                            backgroundColor: "transparent",
                        },
                    }}>
                        <DotsVerticalRBSheetMenu delete = {this.handleDeleteButton}/>
                </RBSheet>
                <Snackbar
                    style = {{marginBottom : 100}}
                    visible={this.state.isNoteNotAddedDeleted}
                    onDismiss={this.isNotAddedNoteDeletedSnackbarHandler}
                    duration = {10000}>
                    Notes not added can't be deleted
                </Snackbar>
            </View>
        )
    }
}