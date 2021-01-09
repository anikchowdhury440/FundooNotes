import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class TestChild extends Component {
    render() {
        return (
            // <View>
            // <Text>Hello World</Text>
            // <Text>Hello Anik</Text>
            // </View>
             <React.Fragment>
                <Text>Hello World</Text>
                <Text>Hello Anik</Text>
             </React.Fragment>
        )
    }
}