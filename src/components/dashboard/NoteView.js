import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Strings } from '../../Language/Strings';
import * as Keychain from 'react-native-keychain';
import NoteViewStyle from '../../styles/NoteView.style';
import UserNoteServices from '../../../services/UserNoteServices';

export default class MainView extends Component {
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

    selectNote = (noteKey) => {
        this.props.navigation.push('AddNote', { noteKey : noteKey, notes : this.state.userNotes[noteKey].notes})
    }

    render() {
        let noteID = Object.keys(this.state.userNotes);
        return (
            <ScrollView style = {{marginBottom : 60}}>
                <View style = {{flexDirection: 'row', flexWrap: 'wrap'}}>
                    { noteID.length > 0 ?
                        noteID.reverse().map(key => (
                            <Card
                                key = {key}
                                style = {(this.props.listView) ? NoteViewStyle.list_item_style :  NoteViewStyle.list_item_grid_style }
                                onPress = {() => this.selectNote(key)} >
                                <Card.Content>
                                    <Title 
                                        style = {(this.state.userNotes[key].notes.note == '') ? NoteViewStyle.list_title_note_empty_style : NoteViewStyle.list_title_style}>
                                            {this.state.userNotes[key].notes.title}
                                    </Title>
                                    <Paragraph
                                        style = {(this.state.userNotes[key].notes.title == '') ? NoteViewStyle.list_note_title_empty_style : NoteViewStyle.note_description_style}>
                                            {this.state.userNotes[key].notes.note}
                                    </Paragraph>
                                </Card.Content>  
                            </Card>
                        )) 
                        :
                        null
                    }
                </View>
                <Button 
                    onPress = { async () => {
                        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
                        this.props.navigation.push('Login')
                    }}>
                        {Strings.logout}
                    </Button>      
            </ScrollView>
        )
    }
}