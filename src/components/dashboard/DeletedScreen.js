import React, {Component} from 'react'
import {View, ScrollView} from 'react-native'
import { Appbar, Card, Title, Paragraph } from 'react-native-paper'
import DeletedScreenStyle from '../../styles/DeletedScreen.style'
import * as Keychain from 'react-native-keychain';
import UserNoteServices from '../../../services/UserNoteServices';
import SQLiteServices from '../../../services/SQLiteServices';
import NetInfo from "@react-native-community/netinfo";

export default class DeletedScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userNotes : [],
            connectionStatus : ''
        }
    }

    async componentDidMount() {
        await NetInfo.addEventListener(state => {
            if(state.isInternetReachable) {
                this.setState({
                    connectionStatus : 'Online'
                })
            }
            else {
                this.setState({
                    connectionStatus : 'Offline'
                })
            }
        });
        const credential = await Keychain.getGenericPassword();
        const UserCredential = JSON.parse(credential.password);
        if(this.state.connectionStatus == 'Online') {
            console.log('online')
            UserNoteServices.getNoteFromDatabase(UserCredential.user.uid)
                .then(async data => {
                    let notes = data ? data : {}
                    await this.setState({
                        userNotes : notes
                    })
                })
        }
        else {
            console.log('offline')
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
    }

    handleMenuButton = async () => {
        const {onPress} = this.props
        this.props.navigation.openDrawer();
        //onPress();
    }

    render() {
        let noteID = Object.keys(this.state.userNotes);
        return(
            <View style = {DeletedScreenStyle.mainContainer}>
                <View style = {{marginBottom : 10}}>
                    <Appbar style = {DeletedScreenStyle.header_style}>
                        <Appbar.Action
                            icon = 'menu'
                            onPress = {this.handleMenuButton}
                            />
                        <Appbar.Content title = 'Deleted'/>
                        {noteID.length > 0 ?
                            (<Appbar.Action icon = 'dots-vertical'/>) : null
                        }
                    </Appbar>
                </View>
                <ScrollView>
                    {
                        (this.state.connectionStatus == 'Online') 
                        ?
                        <View>
                            { noteID.length > 0 ?
                                noteID.reverse().map(key => ( 
                                    <React.Fragment key = {key}>
                                        {this.state.userNotes[key].notes.isDeleted == 1 ? 
                                            (<Card style = {DeletedScreenStyle.list_item_style}>
                                                <Card.Content>
                                                    <Title>
                                                        {this.state.userNotes[key].notes.title}
                                                    </Title>
                                                    <Paragraph>
                                                        {this.state.userNotes[key].notes.note}
                                                    </Paragraph>
                                                </Card.Content>  
                                            </Card>)
                                        : null}
                                        
                                    </React.Fragment>
                                )) 
                                :
                                null
                            }
                        </View>
                        :
                        <View>
                            {this.state.userNotes.length > 0 ?
                                this.state.userNotes.map(val => (
                                    <React.Fragment key = {val.note_id}>
                                        {val.is_deleted == 1 ? (
                                            <Card style = {DeletedScreenStyle.list_item_style}>
                                                <Card.Content>
                                                    <Title>
                                                        {val.title}
                                                    </Title>
                                                    <Paragraph>
                                                        {val.note}
                                                    </Paragraph>
                                                </Card.Content>  
                                            </Card>
                                            )
                                        : null}
                                        
                                    </React.Fragment>
                                ))
                            : null}
                        </View>
                    }
                    
                    
                </ScrollView>
            </View>
        )
    }
}

