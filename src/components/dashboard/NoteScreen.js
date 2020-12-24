import React, {Component} from 'react';
import { View} from 'react-native';
import NoteScreenStyle from '../../styles/NoteScreen.styles';
import TopBar from './TopBar';
import BottomBar from './Bottombar';
import MainView from './MainView';

export default class NoteScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style = {NoteScreenStyle.mainContainer}>
                <TopBar navigation = {this.props.navigation}/>
                <MainView navigation = {this.props.navigation}/>
                <BottomBar navigation = {this.props.navigation}/> 
            </View>
        )
    }
}