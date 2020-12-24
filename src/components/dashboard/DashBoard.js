import React, {Component} from 'react';
import { View} from 'react-native';
import DashBoardStyle from '../../styles/DashBoard.styles';
import TopBar from './TopBar';
import BottomBar from './Bottombar';
import MainView from './MainView';
import DrawerContent from './DrawerContent';

export default class DashBoard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style = {DashBoardStyle.mainContainer}>
                <TopBar navigation = {this.props.navigation}/>
                <MainView navigation = {this.props.navigation}/>
                <BottomBar/> 
            </View>
        )
    }
}