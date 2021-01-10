import React, {Component} from 'react'
import {View, Text, FlatList, ScrollView} from 'react-native'
import { Appbar, Snackbar} from 'react-native-paper'
import LabelNoteScreenStyle from '../../styles/LabelNoteScreen.styles'
import BottomBar from './Bottombar'
import { connect } from 'react-redux'
import { storeLabelId, storeNavigationScreen } from '../../redux/actions/CreateNewLabelActions'
import SQLiteServices from '../../../services/SQLiteServices'
import NoteCard from './NoteCard'
import NoteDataController from '../../../services/NoteDataController'

class LabelNoteScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listView : true,
            userArchivedNotes : [],
            userUnArchivedNotes : [],
            archivePresent : false, 
            labelId : this.getLabelId(),
            showEmptyNoteSnackbar : false,
            showDeletedNoteSnackbar : false,
            showArchivedNoteSnackbar : false,
        }
    }

    componentDidMount = async () => {
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
        await SQLiteServices.selectNoteByArchiveFromSQliteStorage(this.props.userId, 1, 0)
            .then(async result => {
                var temp = [];
                if(result.rows.length != 0) {
                    for (let i = 0; i < result.rows.length; ++i)
                        temp.push(result.rows.item(i));
                    await this.setState({
                        userArchivedNotes : temp.reverse()
                    })
                }                
            })
            .catch(error => console.log('Error', error))
        await SQLiteServices.selectNoteByArchiveFromSQliteStorage(this.props.userId, 0, 0)
            .then(async result => {
                var temp = [];
                if(result.rows.length != 0) {
                    for (let i = 0; i < result.rows.length; ++i)
                        temp.push(result.rows.item(i));
                    await this.setState({
                        userUnArchivedNotes : temp.reverse()
                    })
                }                
            })
            .catch(error => console.log('Error', error))
        if(this.state.userArchivedNotes.length > 0) {
            this.state.userArchivedNotes.map(async note => {
                if(JSON.parse(note.label_id).includes(this.props.route.params.labels.label_id)){
                    await this.setState({
                        archivePresent : true
                    })
                }
            })
        }
        this.props.storeNavigationScreen('labelNote')
        this.props.storeLabelId(this.props.route.params.labels)
    }

    getLabelId = () => {
        var temp = []
        temp.push(this.props.route.params.labels.label_id)
        return temp
    }

    selectView = async () => {
        await this.setState({
            listView : !this.state.listView
        })
    }

    handleMenuIconButton = () => {
        this.props.navigation.openDrawer();
    }

    handleSearchIconButton = () => {
        this.props.navigation.navigate('Home', { screen : 'SearchNote'})
    }

    selectNote = (note) => {
        const {onPress} = this.props
        this.props.navigation.push('AddNote', { noteKey : note.note_id, notes : note})
        //onPress();
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
        NoteDataController.restoreNote(this.props.userId, this.props.route.params.noteKey)
            .then(() => this.props.navigation.push('Home', {screen : this.props.screenName, params : {labels : this.props.labelKey}}))
        //onPress()
    }

    unArchivedNote = async() => {
        NoteDataController.updateNoteArchive(this.props.route.params.noteKey, this.props.userId, this.props.route.params.notes)
            .then(() => this.props.navigation.push('Home', {screen : this.props.screenName, params : {labels : this.props.labelKey}}))
    }

    render() {
        return (
            <View style = {LabelNoteScreenStyle.mainContainer}>
                <View style = {{marginBottom : 10}}>
                    <Appbar style = {{backgroundColor : 'transparent'}}>
                        <Appbar.Action 
                            style = {{marginLeft : 10}}
                            icon = 'menu'
                            onPress = {this.handleMenuIconButton}/>
                        <Appbar.Content 
                            title = {this.props.route.params.labels.label_name}/>
                        <Appbar.Action
                            style = {{marginRight : 10}}
                            icon = 'magnify'
                            onPress = {this.handleSearchIconButton}/>
                        <Appbar.Action
                            style = {{marginRight : 10}}
                            icon = {(this.state.listView) ? 'view-grid-outline' : 'view-agenda-outline'}
                            onPress={this.selectView}
                        />
                        <Appbar.Action
                            icon = 'dots-vertical' />
                    </Appbar>
                </View>
                    {/* <FlatList
                        numColumns = {this.state.listView ? 1 : 2}
                        keyExtractor = {(item) => item.note_id}
                        key = {this.state.listView ? 1 : 2}
                        data = {this.state.userUnArchivedNotes.concat(this.state.userArchivedNotes)}
                        renderItem = {({ item }) => (
                            JSON.parse(item.label_id).includes(this.props.route.params.labels.label_id) ? 
                                (<NoteCard 
                                    listView = {this.state.listView}
                                    notes = {item} 
                                    noteKey = {item.note_id} 
                                    navigation = {this.props.navigation}/>)
                            :
                            null
                        )}
                             
                    />  */}
                    
                <ScrollView style = {{marginBottom : 60}}>
                    <View style = {LabelNoteScreenStyle.list_container}>
                        {this.state.userUnArchivedNotes.length > 0 ?
                            this.state.userUnArchivedNotes.map(note => 
                                JSON.parse(note.label_id).includes(this.props.route.params.labels.label_id) ?
                                    <React.Fragment key = {note.note_id}>
                                        { <NoteCard 
                                            listView = {this.state.listView} 
                                            notes = {note} 
                                            noteKey = {note.note_id} 
                                            navigation = {this.props.navigation} /> }
                                    </React.Fragment>
                                :
                                null
                            )
                        : null}
                    </View>
                    <View>
                        {this.state.archivePresent ?
                            (
                                <Text style = {LabelNoteScreenStyle.archive_text_style}>ARCHIVE</Text>
                            )
                            :
                            null
                        }
                    </View>
                    <View style = {LabelNoteScreenStyle.list_container}>
                        {this.state.archivePresent ?
                            this.state.userArchivedNotes.map(note => 
                                JSON.parse(note.label_id).includes(this.props.route.params.labels.label_id) ?
                                    <React.Fragment key = {note.note_id}>
                                        { <NoteCard 
                                            listView = {this.state.listView} 
                                            notes = {note} 
                                            noteKey = {note.note_id} 
                                            navigation = {this.props.navigation}/> }
                                    </React.Fragment>
                                :
                                null
                            )
                        : null}
                    </View>
                </ScrollView>
                <BottomBar 
                    navigation = {this.props.navigation} 
                    labelId = {JSON.stringify(this.state.labelId)}/> 
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
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId : state.createLabelReducer.userId,
        userLabel : state.createLabelReducer.userLabel,
        screenName : state.createLabelReducer.screenName,
        labelKey : state.createLabelReducer.labelKey
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeNavigationScreen : (screenName) => dispatch(storeNavigationScreen(screenName)),
        storeLabelId : (labelKey) => dispatch(storeLabelId(labelKey))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelNoteScreen)