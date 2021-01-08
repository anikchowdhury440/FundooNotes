import React, {Component} from 'react';
import {ScrollView, View, Text} from 'react-native';
import * as Keychain from 'react-native-keychain';
import NoteViewStyle from '../../styles/NoteView.style';
import NoteCard from './NoteCard';
import SQLiteServices from '../../../services/SQLiteServices';
import NoteDataController from '../../../services/NoteDataController';
import SQLiteLabelServices from '../../../services/SQLiteLabelServices';

export default class NoteView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNotes : [],
        }
    }

    async componentDidMount() {
        const credential = await Keychain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);
        await NoteDataController.retrieveDataFromFirebase(UserCredential.user.uid)
        await SQLiteServices.selectNoteByArchiveFromSQliteStorage(UserCredential.user.uid, 0, 0)
            .then(async result => {
                var temp = [];
                if(result.rows.length != 0) {
                    for (let i = 0; i < result.rows.length; ++i)
                        temp.push(result.rows.item(i));
                    await this.setState({
                        userNotes : temp.reverse()
                    })
                }                
            })
            .catch(error => console.log('Error', error))
    }

    render() {
        return (
            <ScrollView style = {NoteViewStyle.container}>
                <View style = {NoteViewStyle.list_conatiner}>
                    {this.state.userNotes.length > 0 ?
                        this.state.userNotes.map(note => (
                            <React.Fragment key = {note.note_id}>
                                { <NoteCard listView = {this.props.listView} notes = {note} noteKey = {note.note_id} navigation = {this.props.navigation}/> }
                            </React.Fragment>
                        ))
                    : null}
                </View>     
            </ScrollView>
        )
    }
}