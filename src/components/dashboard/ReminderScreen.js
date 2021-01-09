import React, {Component} from 'react'
import {View, Text} from 'react-native'

export default class ReminderScreen extends Component {
    render() {
        return (
            <View>
                <Text>Hello World</Text>
            </View>
        )
    }
}

// When we use View in child component
{/* <View>
    <View>
        <Text>Hello World</Text>
        <Text>Hello Anik</Text>
    </View>
    <View>
        <Text>Hello World</Text>
        <Text>Hello Anik</Text>
    </View>
</View> */}

//When we use Fragment in Child component
{/* <View>
        <Text>Hello World</Text>
        <Text>Hello Anik</Text>
        <Text>Hello World</Text>
        <Text>Hello Anik</Text>
</View> */}
