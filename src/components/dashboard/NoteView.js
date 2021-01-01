import React, {Component} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper'
import * as Keychain from 'react-native-keychain';
import NoteViewStyle from '../../styles/NoteView.style';
import UserNoteServices from '../../../services/UserNoteServices';
import NoteCard from './NoteCard';
import SQLiteServices from '../../../services/SQLiteServices';
import NoteCardStyle from '../../styles/NoteCard.style';

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
        // UserNoteServices.getNoteFromDatabase(UserCredential.user.uid)
        //     .then(async data => {
        //         console.log(data)
        //         let notes = data ? data : {}
        //         await this.setState({
        //             userNotes : notes
        //         })
        //     })
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
        let noteID = Object.keys(this.state.userNotes);
        return (
            <ScrollView style = {NoteViewStyle.container}>
                {/* <View style = {NoteViewStyle.list_conatiner}>
                    { noteID.length > 0 ?
                        noteID.reverse().map(key => ( 
                            <React.Fragment key = {key}>
                                {this.state.userNotes[key].notes.isDeleted == 0 ? (
                                    <NoteCard listView = {this.props.listView} notes = {this.state.userNotes[key].notes} noteKey = {key} navigation = {this.props.navigation}/>)
                                : null}
                                
                            </React.Fragment>
                        )) 
                        :
                        null
                    }
                </View>      */}
                <View style = {NoteViewStyle.list_conatiner}>
                    {this.state.userNotes.length > 0 ?
                        this.state.userNotes.map(val => (
                            <React.Fragment key = {val.note_id}>
                                {val.is_deleted == 0 ? (
                                    <NoteCard listView = {this.props.listView} notes = {val} noteKey = {val.note_id} navigation = {this.props.navigation}/>)
                                : null}
                                
                            </React.Fragment>
                        ))
                     : null}
                </View>     
            </ScrollView>
        )
    }
}