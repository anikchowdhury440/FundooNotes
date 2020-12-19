import { StyleSheet } from 'react-native';

const ForgotPasswordStyle = StyleSheet.create({
    image_view_style: {
        alignSelf : "center", 
        marginTop : 100, 
        borderWidth : 2, 
        borderRadius : 70
    },

    image_style: {
        width : 80, 
        height : 80, 
        margin : 20
    },

    container : {
        marginTop : 50,
        alignItems : "center",
        marginBottom : 100
    },

    forgetPassword_container : {
        backgroundColor : 'white',
        width : '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        borderRadius : 10
    },

    forgetPassword_text : {
        paddingTop : 20,
        paddingBottom : 20,
        alignSelf : 'center',
        fontWeight : 'bold',
        fontSize : 20
    },

    textinput_view_style : {
        borderWidth : 1, 
        borderColor : '#808080', 
        borderRadius : 10,
        alignSelf : "center",
        width : '80%',
        marginLeft : '10%',
        marginRight : '10%',
        flexDirection : 'row',
    },

    textinput_style : {
        paddingLeft : '5%',
        paddingRight : '5%',
        width : '100%',
        fontSize : 15
    },

    text_error_style : {
        alignSelf : 'flex-end',
        marginRight : '10%',
        marginBottom : 10,
        color : 'red'
    },

    resetPassword_button_styles : {
        width : 230,
        marginBottom : 20,
        backgroundColor : "#339EFF",
        alignSelf : 'center',
        borderRadius : 20,
        height : 40
    },

    resetPassword_button_text : {
        alignSelf : "center",
        color : 'white',
        fontSize : 17,
        padding : 8,
    },

})

export default ForgotPasswordStyle;