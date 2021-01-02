import React, {Component} from 'react';
import {ScrollView, View, Text} from 'react-native';
import * as Keychain from 'react-native-keychain';
import NoteViewStyle from '../../styles/NoteView.style';
import UserNoteServices from '../../../services/UserNoteServices';
import NoteCard from './NoteCard';
import SQLiteServices from '../../../services/SQLiteServices';

export default class NoteView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userNotes : [],
            connectionStatus : 'Offline'
        }
    }

    async componentDidMount() {
        const credential = await Keychain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);
        SQLiteServices.selectNoteFromSQliteStorage(UserCredential.user.uid)
            .then(async result => {
                var temp = [];
                if(result.rows.length != 0) {
                    for (let i = 0; i < result.rows.length; ++i)
                        temp.push(result.rows.item(i));
                    await this.setState({
                        userNotes : temp
                    })
                }                
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <ScrollView style = {NoteViewStyle.container}>
                <View style = {NoteViewStyle.list_conatiner}>
                    {this.state.userNotes.length > 0 ?
                        this.state.userNotes.map(note => (
                            <React.Fragment key = {note.note_id}>
                                {note.is_deleted == 0 ? (
                                    <NoteCard listView = {this.props.listView} notes = {note} noteKey = {note.note_id} navigation = {this.props.navigation}/>)
                                : null}
                                    
                            </React.Fragment>
                        ))
                    : null}
                </View>     
            </ScrollView>
        )
    }
}