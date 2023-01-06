import { AppThunk} from "./redux-store";
import {getAuthUserData} from "./authReducer";

export type appStateType = {
    initialized: boolean
}
let initialState = {
    initialized: false,
}

const appReducer = (state: appStateType = initialState, action: initializedSuccessACTYPE) => {
    switch (action.type) {
        case "INITIALIZED-SUCCESS":
            return {...state, initialized:true}

        default:
            return state
    }
}

export const initializedSuccess = (): initializedSuccessACTYPE => {
    return {type: "INITIALIZED-SUCCESS"}
}

export const initializeApp = (): AppThunk => {
    return (dispatch) => {
        dispatch(getAuthUserData())
        dispatch(initializedSuccess)
    }
}

export type initializedSuccessACTYPE = {
    type: "INITIALIZED-SUCCESS"
}

export default appReducer