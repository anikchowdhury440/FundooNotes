import React, {Component} from 'react'
import {View, ScrollView, TextInput} from 'react-native'
import { Appbar } from 'react-native-paper'
import AddNoteScreenStyle from '../../styles/AddNoteScreen.styles'

export default class AddNoteScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title : '',
            description : '' 
        }
    }

    handleTitle = async (title) => {
        await this.setState({
            title : title
        })
        console.log(this.state.title);
    }

    handleDescription = async (description) => {
        await this.setState({
            description : description
        })
        console.log(this.state.description);
    }

    render() {
        return (
            <View style = {AddNoteScreenStyle.mainContainer}>
                <View>
                    <Appbar style = {AddNoteScreenStyle.header_style}>
                        <Appbar.Action 
                            style = {{marginLeft : 10}}
                            icon = 'keyboard-backspace'/>
                        <Appbar.Content />
                        <Appbar.Action
                            style = {AddNoteScreenStyle.header_icon_style}                             
                            icon = 'pin-outline'/>
                        <Appbar.Action    
                            style = {AddNoteScreenStyle.header_icon_style}                          
                            icon = 'bell-plus-outline'/>
                        <Appbar.Action 
                            icon = 'archive-arrow-down-outline'/>
                    </Appbar>
                </View>
                <ScrollView style = {{marginBottom : 60}}> 
                    <TextInput
                        style = {AddNoteScreenStyle.title_style}
                        multiline = {true} 
                        placeholder = 'Title'
                        onChangeText = {this.handleTitle}
                    />
                    <TextInput
                        style = {AddNoteScreenStyle.note_style}
                        multiline = {true} 
                        placeholder = 'Note'
                        onChangeText = {this.handleDescription}
                    />
                </ScrollView>
                <View style = {AddNoteScreenStyle.bottom_view}>
                    <Appbar style = {AddNoteScreenStyle.bottom_appbar_style}>
                        <Appbar.Action 
                            icon = 'plus-box-outline'/>
                        <Appbar.Content/>
                        <Appbar.Action 
                            icon = 'undo-variant'/>
                        <Appbar.Action 
                            icon = 'redo-variant'/>
                        <Appbar.Content/>
                        <Appbar.Action 
                            icon = 'dots-vertical'/>
                    </Appbar>
                </View>
            </View>
        )
    }
}