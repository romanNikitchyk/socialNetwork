import React from "react";
import classes from "./Dialogs.module.css"
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import {ActionsTypes} from "../../Redux/redux-store";
import {dialogsPageType, DialogType, MessageType} from "../../Redux/dialogsReducer";
import {SubmitHandler, useForm} from "react-hook-form";

type DialogsPropsType = {
    dialogsPage: dialogsPageType
    dispatch: (action: ActionsTypes) => void
    onSendMessageClickCB:(data:any)=>void
    messagesElements: MessageType[]
}
export type MessageOBJ = {
    message: string
}
const Dialogs = (props: DialogsPropsType) => {
    let dialogsElements =
        props.dialogsPage.dialogs.map((d: DialogType) => <DialogItem name={d.name} key={d.id} id={d.id}/>);

    let messagesElements =
        props.dialogsPage.messages.map((m: MessageType) => <Message message={m.message} key={m.id}/>);

    let onSendMessageClick:SubmitHandler<MessageOBJ> = (data:MessageOBJ) => {
        props.onSendMessageClickCB(data)
        reset()

    }
    const {register, handleSubmit, reset} = useForm<MessageOBJ>({
        defaultValues:{
            message:""
        }
    })

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <div>
                    <form onSubmit={handleSubmit(onSendMessageClick)}>
                        <div><input {...register("message")} placeholder="enter message" /></div>
                        <div><button>Send</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Dialogs