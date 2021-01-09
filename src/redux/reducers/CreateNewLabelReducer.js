import { STORE_LABELID, STORE_NAVIGATION_SCREEN, STORE_USERID, STORE_USER_LABEL } from '../actions/CreateNewLabelType'
const initialState = {
    userId : '',
    userLabel : [],
    screenName : '',
    labelKey : ''
}

const CreateNewLabelReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_USERID:
            return {
                ...state,
                userId : action.payload
            }
        case STORE_USER_LABEL:
            return {
                ...state,
                userLabel : action.payload
            }
        case STORE_NAVIGATION_SCREEN :
            return {
                ...state,
                screenName : action.payload,
                labelKey : ''
            }
        case STORE_LABELID :
            return {
                ...state,
                labelKey : action.payload
            }
        default:
            return state;
    }
}

export default CreateNewLabelReducer;