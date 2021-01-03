import React, {Component} from 'react';
import { View, Text} from 'react-native';
import {Snackbar, Provider, Modal, Portal} from 'react-native-paper'
import NoteScreenStyle from '../../styles/NoteScreen.styles';
import TopBar from './TopBar';
import BottomBar from './Bottombar';
import NoteView from './NoteView';
import Profile from './Profile';
import UserServices from '../../../services/UserServices'
import * as Keychain from 'react-native-keychain'
import NoteDataController from '../../../services/NoteDataController';

export default class NoteScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            listView : true,
            showEmptyNoteSnackbar : false,
            showDeletedNoteSnackbar : false,
            showProfileModal : false,
            photo : '',
            userId : ''
        }
        
    }

    async componentDidMount() {
        const credential = await Keychain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);
        await this.setState({
            userId : UserCredential.user.uid
        })
        if(this.props.route.params != undefined) {
            if(this.props.route.params.isEmptyNote != undefined) {
                await this.setState({
                    showEmptyNoteSnackbar : true
                })
            }
            if(this.props.route.params.isNoteDeleted != undefined) {
                await this.setState({
                    showDeletedNoteSnackbar : true
                })
            }
        }
        await this.readImage()
    }

    readImage = async () => {
        await UserServices.readUserDataFromRealtimeDatabase(this.state.userId)
            .then(async data => {
                if(data.photo != undefined){
                    await this.setState({
                        photo : data.photo
                    })
                }
            })
    }

    selectView = async () => {
        const {onPress} = this.props
        await this.setState({
            listView : !this.state.listView
        })
        //onPress()
    }

    emptyNoteSnackbarHandler = async () => {
        const {onDismiss} = this.props
        await this.setState({ 
            showEmptyNoteSnackbar : false
        })
        this.props.navigation.setParams({isEmptyNote : false})
        //onDismiss()
    }

    deletedNoteSnackbarHandler = async () => {
        const {onDismiss} = this.props
        await this.setState({ 
            showDeletedNoteSnackbar : false
        })
        this.props.navigation.setParams({isNoteDeleted : false})
        //onDismiss()
    }

    restoreNotes = async() => {
        const {onPress} = this.props
        NoteDataController.restoreNote(this.props.route.params.userId, this.props.route.params.noteKey)
            .then(() => this.props.navigation.push('Home', {screen : 'Notes'}))
        //onPress()
    }

    showModal = async() => {
        const {onPress} = this.props
        await this.setState({
            showProfileModal : true
        })
        //onPress();
    }

    hideModal = async() => {
        const {onDismiss} = this.props
        await this.setState({
            showProfileModal : false
        })
        //onDismiss();
    }

    changeImage = async () => {
        const {onPress} = this.props
        this.readImage()
        await this.setState({
            showProfileModal : false
        })
        //onPress()
    }

    render() {
        return(
            <Provider>
                <View style = {NoteScreenStyle.mainContainer}>
                    <TopBar 
                        photo = {this.state.photo}
                        navigation = {this.props.navigation} 
                        onPressView = {this.selectView} 
                        listView = {this.state.listView} 
                        onPressProfile = {this.showModal} />
                    <NoteView 
                        navigation = {this.props.navigation} 
                        listView = {this.state.listView}/>
                    <BottomBar navigation = {this.props.navigation}/> 
                    <Snackbar
                        style = {{marginBottom : 100}}
                        visible={this.state.showEmptyNoteSnackbar}
                        onDismiss={this.emptyNoteSnackbarHandler}
                        duration = {10000}>
                            Empty Note Discarded
                        </Snackbar>
                    <Snackbar
                        style = {{marginBottom : 100}}
                        visible={this.state.showDeletedNoteSnackbar}
                        onDismiss={this.deletedNoteSnackbarHandler}
                        duration = {10000}
                        action = {{
                            label : 'Undo',
                            onPress : this.restoreNotes
                        }}>
                            Note Moved to Bin
                    </Snackbar>
                    <Portal>
                        <Modal 
                            visible={this.state.showProfileModal} 
                            onDismiss={this.hideModal} 
                            contentContainerStyle={NoteScreenStyle.modal_container_style}>
                                <Profile 
                                    navigation = {this.props.navigation} 
                                    photo = {this.state.photo}
                                    changeImage = {this.changeImage}/>
                        </Modal>
                    </Portal>
               </View>
            </Provider>
        )
    }
}