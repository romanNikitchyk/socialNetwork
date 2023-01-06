import {v1} from "uuid";
import {ActionsTypes} from "./redux-store";
import {MessageOBJ} from "../components/Dialogs/Dialogs";

export const sendMessageActionCreator = (data:MessageOBJ): SendMessageActionType => {
    return {type: "sendMessage", data}
}



const initialState:dialogsPageType = {
        dialogs: [
            {id: v1(), name: "Roma"},
            {id: v1(), name: "Anya"},
            {id: v1(), name: "Denis"},
            {id: v1(), name: "Vlad"},
            {id: v1(), name: "Valera"},
        ],
        messages: [
            {id: v1(), message: "Hi:)"},
            {id: v1(), message: "How are you?"},
            {id: v1(), message: "Bye:*"}
        ]
    }

export const dialogsReducer = (state = initialState, action:ActionsTypes):dialogsPageType=> {

    switch (action.type) {
        case "sendMessage":
            let newMessage = {id: v1(), message: action.data.message}
            return {...state, messages:[...state.messages, newMessage]}
        default:
            return state
    }
}

export type dialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}
export type DialogType = {
    id: string
    name: string
}
export type SendMessageActionType = {
    type: "sendMessage"
    data:MessageOBJ
}
export type MessageType = {
    id: string
    message: string
}

export default dialogsReducer;