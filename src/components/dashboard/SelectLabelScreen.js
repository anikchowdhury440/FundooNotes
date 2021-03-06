import React, {Component} from 'react'
import {View, TextInput, ScrollView} from 'react-native'
import SelectLabelScreenStyle from '../../styles/SelectLabelScreen.styles'
import { connect } from 'react-redux'
import {Appbar} from 'react-native-paper';
import SelectLabelAppbar from './SelectLabelAppbar';

class SelectLabelScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search : '',
            userLabelAfterSearch : this.props.state.createLabelReducer.userLabel,
            selectedLabel : this.props.route.params.notes.labelId
        }
    }

    handleSelectedLabel = async (labelKey, operation) => {
        var labels = this.state.selectedLabel
        if(operation == 'add') {
            labels.push(labelKey)
            await this.setState({
                selectedLabel : labels
            })
        }
        else {
            let index = labels.indexOf(labelKey)
            labels.splice(index, 1)
            await this.setState({
                selectedLabel : labels
            })
        }
    }

    handleBackIconButton = () => {
        const notes = {
            title : this.props.route.params.notes.title,
            note : this.props.route.params.notes.note,
            is_deleted : this.props.route.params.notes.isDeleted,
            label_id : JSON.stringify(this.state.selectedLabel),
            is_archived : this.props.route.params.notes.isArchived,
            reminder : this.props.route.params.notes.reminder,
        }
        if(this.props.route.params.newNote) {
            this.props.navigation.push('AddNote', { noteKey : this.props.route.params.noteKey, notes : notes, newNote : true})
        }
        else {
            this.props.navigation.push('AddNote', { noteKey : this.props.route.params.noteKey, notes : notes, newNote : false})
        }
    }

    handleSearchTextInput = async (searchText) => {
        await this.setState({
            search : searchText,
        })
        if(this.state.search != '') {
            let temp = [];
            for(let i = 0; i < this.props.state.createLabelReducer.userLabel.length; i++) {
                if(this.props.state.createLabelReducer.userLabel[i].label_name.toLowerCase().includes(searchText.toLowerCase())) {
                    temp.push(this.props.state.createLabelReducer.userLabel[i])
                }
            }
            this.setState({
                userLabelAfterSearch: temp,
            })
        }
        else {
            await this.setState({
                userLabelAfterSearch : this.props.state.createLabelReducer.userLabel
            })
        }
    }

    render() {
        return (
            <View style = {SelectLabelScreenStyle.mainContainer}>
                <View style = {SelectLabelScreenStyle.appbar_container_style}>
                    <Appbar style = {SelectLabelScreenStyle.header_style}>
                        <Appbar.Action  
                            style = {{marginLeft : 10}}
                            icon = 'keyboard-backspace'
                            onPress = {this.handleBackIconButton}/>
                        <TextInput    
                            style = {SelectLabelScreenStyle.textinput_style}
                            placeholder = 'Enter Label Name'
                            onChangeText = {this.handleSearchTextInput}
                            autoFocus = {false}
                            value = {this.state.search}/>
                    </Appbar>
                </View>
                <ScrollView>
                    <View>
                        {
                            (this.state.userLabelAfterSearch.length > 0) ?
                                this.state.userLabelAfterSearch.map(labels => (
                                    <React.Fragment key = {labels.label_id}>
                                        <SelectLabelAppbar 
                                            labelKey = {labels.label_id} 
                                            labels = {labels} 
                                            selectedLabel = {this.state.selectedLabel}
                                            handleSelectedLabel = {this.handleSelectedLabel}/>
                                    </React.Fragment>
                                ))
                                :
                                null
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return { state }
}

export default connect(mapStateToProps)(SelectLabelScreen)

