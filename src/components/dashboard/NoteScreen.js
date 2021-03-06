import React, {Component} from 'react';
import { View} from 'react-native';
import {Snackbar, Provider, Modal, Portal} from 'react-native-paper'
import NoteScreenStyle from '../../styles/NoteScreen.styles';
import TopBar from './TopBar';
import BottomBar from './Bottombar';
import NoteView from './NoteView';
import Profile from './Profile';
import UserServices from '../../../services/UserServices'
import NoteDataController from '../../../services/NoteDataController';
import { connect } from 'react-redux'
import { storeNavigationScreen } from '../../redux/actions/CreateNewLabelActions'

class NoteScreen extends Component {
    constructor (props) {
        super(props);
        this.state = {
            listView : true,
            showEmptyNoteSnackbar : false,
            showDeletedNoteSnackbar : false,
            showArchivedNoteSnackbar : false,
            showProfileModal : false,
            photo : '',
        }
        
    }

    async componentDidMount() {
        this.props.storeNavigationScreen('Notes')
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
            if(this.props.route.params.isNoteArchived != undefined) {
                await this.setState({
                    showArchivedNoteSnackbar : true
                })
            }
        }
        await this.readImage()
    }

    readImage = async () => {
        await UserServices.readUserDataFromRealtimeDatabase(this.props.state.createLabelReducer.userId)
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
        this.props.navigation.setParams({isEmptyNote : undefined})
        //onDismiss()
    }

    deletedNoteSnackbarHandler = async () => {
        const {onDismiss} = this.props
        await this.setState({ 
            showDeletedNoteSnackbar : false
        })
        this.props.navigation.setParams({isNoteDeleted : undefined})
        //onDismiss()
    }

    archivedNoteSnackbarHandler = async () => {
        await this.setState({ 
            showArchivedNoteSnackbar : false
        })
        this.props.navigation.setParams({isNoteArchived : undefined})
    }

    restoreNotes = async() => {
        const {onPress} = this.props
        NoteDataController.restoreNoteSnackbar(this.props.state.createLabelReducer.userId, this.props.route.params.noteKey, this.props.route.params.notes, this.props.route.params.reminder)
            .then(() => this.props.navigation.push('Home', {screen : this.props.screenName}))
        //onPress()
    }

    unArchivedNote = async() => {
        NoteDataController.updateNoteArchive(this.props.route.params.noteKey, this.props.state.createLabelReducer.userId, this.props.route.params.notes)
            .then(() => this.props.navigation.push('Home', {screen : this.props.screenName}))
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

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return;
        };
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
                    <BottomBar 
                        navigation = {this.props.navigation} /> 
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
                    <Snackbar
                        style = {{marginBottom : 100}}
                        visible={this.state.showArchivedNoteSnackbar}
                        onDismiss={this.archivedNoteSnackbarHandler}
                        duration = {10000}
                        action = {{
                            label : 'Undo',
                            onPress : this.unArchivedNote
                        }}>
                            Note Archived
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

const mapStateToProps = state => {
    return {state}
}

const mapDispatchToProps = dispatch => {
    return {
        storeNavigationScreen : (screenName) => dispatch(storeNavigationScreen(screenName))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NoteScreen)