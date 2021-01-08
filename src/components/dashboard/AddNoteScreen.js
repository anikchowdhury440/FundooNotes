import React, {Component} from 'react'
import {View, ScrollView, TextInput, TouchableWithoutFeedback, Text} from 'react-native'
import { Appbar, Snackbar, Provider, Portal, Dialog, Paragraph, Button} from 'react-native-paper'
import AddNoteScreenStyle from '../../styles/AddNoteScreen.styles'
import * as Keychain from 'react-native-keychain'
import { Strings } from '../../Language/Strings';
import RBSheet from 'react-native-raw-bottom-sheet'
import DotsVerticalRBSheetMenu from './DotsVerticalRBSheetMenu'
import NoteDataController from '../../../services/NoteDataController'
import DotsVerticalRestoreRBSheetMenu from './DotsVerticalRestoreRBSheetMenu'
import { connect } from 'react-redux'

class AddNoteScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noteKey : '',
            title : '',
            note : '',
            userId : '',
            isDeleted : 0,
            labelId : [],
            isArchived : 0,
            isNoteNotAddedDeleted : false,
            deleteForeverDialog : false, 
            restoreDeleteSnackbar : false,
            restoreSnackbar : false,
            noteUnArchivedSnackbar : false,
            labelName : ''
        }
    }

    componentDidMount = async () => {
        const credential = await Keychain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);
        await this.setState({
            userId : UserCredential.user.uid
        })
        if(!this.props.route.params.newNote) {
            await this.setState({
                noteKey : this.props.route.params.noteKey,
                title : this.props.route.params.notes.title,
                note : this.props.route.params.notes.note,
                isDeleted : this.props.route.params.notes.is_deleted,
                labelId : JSON.parse(this.props.route.params.notes.label_id),
                isArchived : this.props.route.params.notes.is_archived,
            })
        } else {
            if(this.props.route.params.labelId == undefined) {
                if (this.props.route.params.notes != undefined) {
                    await this.setState({
                        noteKey : this.props.route.params.noteKey,
                        title : this.props.route.params.notes.title,
                        note : this.props.route.params.notes.note,
                        isDeleted : this.props.route.params.notes.is_deleted,
                        labelId : JSON.parse(this.props.route.params.notes.label_id),
                        isArchived : this.props.route.params.notes.is_archived,
                    })
                } else {
                    await this.setState({
                        noteKey : this.generateNoteKey()
                    })
                }
            } else {
                await this.setState({
                    noteKey : this.generateNoteKey(),
                    labelId : JSON.parse(this.props.route.params.labelId)
                })
            }
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
    
    generateNoteKey = () => {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i < 20; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    handleBackIconButton = async () => {
        // const {onPress} = this.props
        const notes = {
            title : this.state.title,
            note : this.state.note,
            isDeleted : this.state.isDeleted,
            labelId : JSON.stringify(this.state.labelId),
            isArchived : this.state.isArchived
        }
        if(this.state.title != '' || this.state.note != '') {
            if(this.props.route.params.newNote) {
                NoteDataController.storeNote(this.state.noteKey, this.state.userId, notes)
                    .then(() => this.props.navigation.push('Home', {screen : 'Notes'}))
            } else if(this.state.isDeleted == 1) {
                this.props.navigation.push('Home', {screen : 'Deleted'})
            } else if(this.state.isArchived == 1) {
                NoteDataController.updateNote(this.state.noteKey, this.state.userId, notes)
                    .then(() => this.props.navigation.push('Home', {screen : 'Notes'}))
            } else {
                NoteDataController.updateNote(this.state.noteKey, this.state.userId, notes)
                    .then(() => this.props.navigation.push('Home', {screen : 'Notes'}))
            }
        } else {
            if(this.props.route.params.newNote) {
                this.props.navigation.push('Home', { screen: 'Notes', params : {isEmptyNote : true}}) 
            } else {
                NoteDataController.removeNote(this.state.userId, this.state.noteKey)
                    .then(() => this.props.navigation.push('Home', {screen : 'Notes', params : {isEmptyNote : true}}))
            }
        }
        //onPress();  
    }

    handleDeleteButton = async() => {
        this.RBSheet.close()
        await this.setState({
            isDeleted : 0
        })
        const notes = {
            title : this.state.title,
            note : this.state.note,
            isDeleted : this.state.isDeleted,
            labelId : JSON.stringify(this.state.labelId),
            isArchived : this.state.isArchived
        }
        if(this.props.route.params.newNote){
            await this.setState({
                isNoteNotAddedDeleted : true
            })
        } else {
            NoteDataController.deleteNote(this.state.userId, this.state.noteKey, notes)
                .then(() => this.props.navigation.push('Home', { screen : 'Notes', params : {isNoteDeleted : true, 
                                                                                            noteKey : this.state.noteKey,
                                                                                            userId : this.state.userId}}))    
        }
    }

    isNotAddedNoteDeletedSnackbarHandler = async () => {
        const {onDismiss} = this.props
        await this.setState({ 
            isNoteNotAddedDeleted : false
        })
        //onDismiss();
    }

    handleDeleteForeverDialogDismiss = async () => {
        const {onDismiss} = this.props
        await this.setState({
            deleteForeverDialog : false
        })
        //onDismiss()
    }

    handleDeleteForeverButton = async () => {
        const {onPress} = this.props
        this.RBSheet.close()
        await this.setState({
            deleteForeverDialog : true
        })
        //onPress();
    }

    handleRestoreButton = () => {
        this.RBSheet.close()
        NoteDataController.restoreNote(this.state.userId, this.state.noteKey)
            .then(async () => {
                await this.setState({
                    isDeleted : 0,
                    restoreDeleteSnackbar : true
                })
            })
    }

    handleDeleteForeverActionButton = () => {
        NoteDataController.removeNote(this.state.userId, this.state.noteKey)
            .then(() => this.props.navigation.push('Home', {screen : 'Deleted'}))
    }

    restoreDeleteSnackbarDismiss = () => {
        const {onDismiss} = this.props
        this.setState({
            restoreDeleteSnackbar : false
        })
        //onDismiss();
    }

    restoreDeleteSnackbarAction = async () => {
        const {onPress} = this.props
        await this.setState({
            isDeleted : 1
        })
        const notes = {
            title : this.state.title,
            note : this.state.note,
            isDeleted : this.state.isDeleted,
            labelId : JSON.stringify(this.state.labelId),
            isArchived : this.state.isArchived
        }
        NoteDataController.deleteNote(this.state.userId, this.state.noteKey, notes)
        //onPress()
    }

    handlePressDisabledTextInput = () => {
        const {onPress} = this.props
        if(this.state.isDeleted == 1) {
            this.setState({
                restoreSnackbar : true
            })
        }
        //onPress()
    }

    restoreSnackbarDismiss = () => {
        const {onDismiss} = this.props
        this.setState({
            restoreSnackbar : false
        })
        //onDismiss()
    }

    restoreSnackbarAction = () => {
        const {onPress} = this.props
        NoteDataController.restoreNote(this.state.userId, this.state.noteKey)
            .then(() => {
                this.setState({
                    isDeleted : 0
                })
            })
        //onPress()
    }

    handleLabelButton = () => {
        this.RBSheet.close();
        const notes = {
            title : this.state.title,
            note : this.state.note,
            isDeleted : this.state.isDeleted,
            labelId : this.state.labelId,
            isArchived : this.state.isArchived
        }
        if(this.props.route.params.newNote) {
            this.props.navigation.push('SelectLabel', { noteKey : this.state.noteKey, notes : notes, newNote : true})
        } else {
            this.props.navigation.push('SelectLabel', { noteKey : this.state.noteKey, notes : notes, newNote : false})
        }
    }

    handleArchiveDownButton = async () => {
        await this.setState({
            isArchived : 1
        })
        const notes = {
            title : this.state.title,
            note : this.state.note,
            isDeleted : this.state.isDeleted,
            labelId : JSON.stringify(this.state.labelId),
            isArchived : this.state.isArchived
        }
        if(this.state.title != '' || this.state.note != '') {
            if(this.props.route.params.newNote) {
                NoteDataController.storeNote(this.state.noteKey, this.state.userId, notes)
                    .then(() => this.props.navigation.push('Home', {screen : 'Notes', params : {isNoteArchived : true, 
                                                                                                noteKey : this.state.noteKey,
                                                                                                userId : this.state.userId,
                                                                                                notes : notes}}))
            } else {
                NoteDataController.updateNote(this.state.noteKey, this.state.userId, notes)
                    .then(() => this.props.navigation.push('Home', {screen : 'Notes', params : {isNoteArchived : true, 
                                                                                                noteKey : this.state.noteKey,
                                                                                                userId : this.state.userId,
                                                                                                notes : notes}}))
            }
        } else {
            if(this.props.route.params.newNote) {
                this.props.navigation.push('Home', { screen: 'Notes', params : {isEmptyNote : true}}) 
            } else {
                NoteDataController.removeNote(this.state.userId, this.state.noteKey)
                    .then(() => this.props.navigation.push('Home', {screen : 'Notes', params : {isEmptyNote : true}}))
            }
        }
        //onPress();
    }

    handleArchiveUpButton = async () => {
        await this.setState({
            isArchived : 0,
            noteUnArchivedSnackbar : true
        })
        const notes = {
            title : this.state.title,
            note : this.state.note,
            isDeleted : this.state.isDeleted,
            labelId : JSON.stringify(this.state.labelId),
            isArchived : this.state.isArchived
        }
        NoteDataController.updateNote(this.state.noteKey, this.state.userId, notes)
    }

    unArchiveSnackbarDismiss = () => {
        this.setState({
            noteUnArchivedSnackbar : false
        })
    }

    archiveSnackbarAction = async () => {
        await this.setState({
            isArchived : 1,
        })
        const notes = {
            title : this.state.title,
            note : this.state.note,
            isDeleted : this.state.isDeleted,
            labelId : JSON.stringify(this.state.labelId),
            isArchived : this.state.isArchived
        }
        NoteDataController.updateNote(this.state.noteKey, this.state.userId, notes)
    }

    render() {
        return (
            <Provider>
                <View style = {AddNoteScreenStyle.mainContainer}>
                    <View>
                        <Appbar style = {AddNoteScreenStyle.header_style}>
                            <Appbar.Action 
                                style = {{marginLeft : 10}}
                                icon = 'keyboard-backspace'
                                onPress = {this.handleBackIconButton}/>
                            <Appbar.Content />
                            {
                                (this.state.isDeleted == 0) ? 
                                <Appbar style = {{backgroundColor : 'transparent'}}>
                                    <Appbar.Action
                                        style = {AddNoteScreenStyle.header_icon_style}                             
                                        icon = 'pin-outline'/>
                                    <Appbar.Action    
                                        style = {AddNoteScreenStyle.header_icon_style}                          
                                        icon = 'bell-plus-outline'/>
                                    {
                                        (this.state.isArchived == 0) ?
                                            <Appbar.Action 
                                                icon = 'archive-arrow-down-outline'
                                                onPress = {this.handleArchiveDownButton}/>
                                            :
                                            <Appbar.Action 
                                                icon = 'archive-arrow-up-outline'
                                                onPress = {this.handleArchiveUpButton}/>
                                    }
                                </Appbar>
                                :
                                null
                            }
                        </Appbar>
                    </View>
                    <ScrollView style = {{marginBottom : 60}}> 
                        <TouchableWithoutFeedback onPress = {this.handlePressDisabledTextInput}>
                            <View>
                                <TextInput
                                    style = {AddNoteScreenStyle.title_style}
                                    multiline = {true} 
                                    placeholder = {Strings.title}
                                    onChangeText = {this.handleTitle}
                                    value = {this.state.title}
                                    editable = {(this.state.isDeleted == 1) ? false : true} 
                                />
                                <TextInput
                                    style = {AddNoteScreenStyle.note_style}
                                    multiline = {true} 
                                    placeholder = {Strings.note}
                                    onChangeText = {this.handleNote}
                                    value = {this.state.note}
                                    editable = {(this.state.isDeleted == 1) ? false : true}
                                />
                                <View style = {AddNoteScreenStyle.label_text_container}>
                                {
                                    (this.state.labelId.length > 0) ?
                                        this.props.userLabel.map(labels => (
                                            this.state.labelId.includes(labels.label_id) ?
                                               <React.Fragment key = {labels.label_id}>
                                                    <TouchableWithoutFeedback onPress = {this.handleLabelButton}>
                                                        <View>
                                                            <Text style = {AddNoteScreenStyle.label_text}>{labels.label}</Text>
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                </React.Fragment>
                                            :
                                            null
                                        ))
                                        :
                                        null
                                }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                    <View style = {AddNoteScreenStyle.bottom_view}>
                        <Appbar style = {AddNoteScreenStyle.bottom_appbar_style}>
                            <Appbar.Action 
                                icon = 'plus-box-outline'/>
                            <Appbar.Content/>
                            {
                                (this.state.isDeleted == 0) ? 
                                <Appbar style = {{backgroundColor : 'transparent'}}>
                                    <Appbar.Action 
                                        icon = 'undo-variant'/>
                                    <Appbar.Action 
                                        icon = 'redo-variant'/>
                                </Appbar>
                                :
                                null
                            }
                            <Appbar.Content/>
                            <Appbar.Action 
                                icon = 'dots-vertical'
                                onPress = {this.handleDotIconButton}/>
                        </Appbar>
                    </View>
                    {this.state.isDeleted == 0 ?
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
                            <DotsVerticalRBSheetMenu delete = {this.handleDeleteButton} label = {this.handleLabelButton}/>
                    </RBSheet>
                    :
                    <RBSheet
                        ref = {ref => {this.RBSheet = ref}}
                        height = {110}
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
                            <DotsVerticalRestoreRBSheetMenu restore = {this.handleRestoreButton} deleteForever = {this.handleDeleteForeverButton}/>
                    </RBSheet>
                    }
                    <Snackbar
                        style = {{marginBottom : 100}}
                        visible={this.state.isNoteNotAddedDeleted}
                        onDismiss={this.isNotAddedNoteDeletedSnackbarHandler}
                        duration = {10000}>
                        {Strings.notAddedNoteDeleted}
                    </Snackbar>
                    <Snackbar
                        style = {{marginBottom : 100}}
                        visible={this.state.restoreDeleteSnackbar}
                        onDismiss={this.restoreDeleteSnackbarDismiss}
                        duration = {10000}
                        action = {{
                            label : Strings.undo,
                            onPress : this.restoreDeleteSnackbarAction
                        }}>
                            {Strings.noteRestored}
                    </Snackbar>
                    <Snackbar
                        style = {{marginBottom : 100}}
                        visible={this.state.restoreSnackbar}
                        onDismiss={this.restoreSnackbarDismiss}
                        duration = {10000}
                        action = {{
                            label : Strings.restore,
                            onPress : this.restoreSnackbarAction
                        }}>
                            {Strings.notEditRecycleBin}
                    </Snackbar>
                    <Snackbar
                        style = {{marginBottom : 100}}
                        visible={this.state.noteUnArchivedSnackbar}
                        onDismiss={this.unArchiveSnackbarDismiss}
                        duration = {10000}
                        action = {{
                            label : Strings.undo,
                            onPress : this.archiveSnackbarAction
                        }}>
                            {Strings.noteUnarchived}
                    </Snackbar>
                    <Portal>
                        <Dialog visible = {this.state.deleteForeverDialog} onDismiss = {this.handleDeleteForeverDialogDismiss}>
                            <Dialog.Content>
                                <Paragraph style = {{fontSize : 16}}>Delete this note forever?</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button color = 'blue' onPress = {this.handleDeleteForeverDialogDismiss}>Cancel</Button>
                                <Button color = 'blue' onPress = {this.handleDeleteForeverActionButton}>Delete</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
            </Provider>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        userLabel : state.createLabelReducer.userLabel
    }
}

export default connect(mapStateToProps)(AddNoteScreen)
