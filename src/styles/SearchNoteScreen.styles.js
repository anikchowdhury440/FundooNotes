import { StyleSheet } from 'react-native';

const SearchNoteScreenStyle = StyleSheet.create({
    mainContainer : {
        flex : 1,
        backgroundColor : 'white'
    },

    header_style : {
        backgroundColor : 'transparent'
    },

    appbar_container_style : {
        marginBottom : 10, 
        borderBottomWidth : 1, 
        borderColor : 'grey',
    },
    
    textinput_style : {
        width : '65%', 
        backgroundColor : 'transparent', 
        paddingLeft : 20, 
        fontSize : 17
    },

    list_item_style : {
        borderWidth : 1, 
        marginLeft : '3%', 
        marginRight : '3%', 
        marginBottom : 10, 
        borderRadius : 10, 
        borderColor : "#bdbdbd",
        width : '94%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    list_title_style : { 
        marginBottom : 5,
        fontSize : 18,
    },

    list_title_note_empty_style : {
        marginBottom : -20,
        fontSize : 18,
    },

    list_note_style : {
        marginBottom : 5
    },

    list_note_title_empty_style : {
        marginTop : -25
    },

    label_text: {
        borderWidth : 1, 
        paddingTop: 3, 
        paddingBottom : 3, 
        paddingLeft : 10, 
        paddingRight : 10, 
        borderColor : 'grey', 
        borderRadius : 40,
        marginTop : 8,
        marginRight : 10,
        marginBottom : 5,
    },
    
    archive_text_style : {
        marginLeft : 20,
        marginTop : 15,
        marginBottom : 10
    },

    chip_style : {
        marginTop : 6, 
        marginRight : 10, 
        borderColor : 'grey', 
        backgroundColor : 'white', 
        borderWidth : 1
    },
})

export default SearchNoteScreenStyle;