import React, {Component} from 'react';
import {ScrollView, View, Text, FlatList} from 'react-native';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Strings } from '../../Language/Strings';
import * as Keychain from 'react-native-keychain';
import Firebase from '../../../config/Firebase'
import NoteViewStyle from '../../styles/NoteView.style';

export default class MainView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes : []
        }
    }

    async componentDidMount() {
        const credential = await Keychain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);
        await Firebase.database().ref('notes/' + UserCredential.user.uid).once('value').then(async snapshot => {
            let notes = snapshot.val() ? snapshot.val() : {}
            await this.setState({
                notes : notes
            })
        })
    }

    render() {
        let noteID = Object.keys(this.state.notes);
        return (
            <ScrollView style = {{marginBottom : 60}}>
                <View style = {{flexDirection: 'row', flexWrap: 'wrap'}}>
                    { noteID.length > 0 ?
                        noteID.map(key => (
                            <Card
                                key = {key}
                                style = {(this.props.listView) ? NoteViewStyle.list_item_style :  NoteViewStyle.list_item_grid_style } >
                                <Card.Content>
                                    <Title 
                                        style = {(this.state.notes[key].note == '') ? NoteViewStyle.list_title_note_empty_style : NoteViewStyle.list_title_style}>
                                            {this.state.notes[key].title}
                                    </Title>
                                    <Paragraph
                                        style = {(this.state.notes[key].title == '') ? NoteViewStyle.list_note_title_empty_style : NoteViewStyle.note_description_style}>
                                            {this.state.notes[key].note}
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