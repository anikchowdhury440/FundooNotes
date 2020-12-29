import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import * as Keychain from 'react-native-keychain';
import NoteViewStyle from '../../styles/NoteView.style';
import UserNoteServices from '../../../services/UserNoteServices';
import NoteCard from './NoteCard';

export default class NoteView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNotes : []
        }
    }

    async componentDidMount() {
        const credential = await Keychain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);
        UserNoteServices.getNoteFromDatabase(UserCredential.user.uid)
            .then(async data => {
                let notes = data ? data : {}
                await this.setState({
                    userNotes : notes
                })
            })
    }

    render() {
        let noteID = Object.keys(this.state.userNotes);
        return (
            <ScrollView style = {NoteViewStyle.container}>
                <View style = {NoteViewStyle.list_conatiner}>
                    { noteID.length > 0 ?
                        noteID.reverse().map(key => ( 
                            <React.Fragment key = {key}>
                                {!this.state.userNotes[key].notes.isDeleted ? (
                                    <NoteCard listView = {this.props.listView} notes = {this.state.userNotes[key].notes} noteKey = {key} navigation = {this.props.navigation}/>)
                                : null}
                                
                            </React.Fragment>
                        )) 
                        :
                        null
                    }
                </View>     
            </ScrollView>
        )
    }
}