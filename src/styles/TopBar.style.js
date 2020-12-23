import { StyleSheet } from 'react-native';

const TopBarStyle = StyleSheet.create({

    container : {
        backgroundColor : 'white',
        marginLeft : 20,
        marginRight : 20,
        marginTop : 10,
        marginBottom : 20,
        borderRadius : 10,
        borderWidth : 1,
        borderColor : '#CACFD2',
    },

    appbar_content_style : {
        fontSize: 18,
        color : 'grey'
    },

    avatar_style : {
        marginRight : 15, 
        marginLeft : 5
    }, 

})

export default TopBarStyle;