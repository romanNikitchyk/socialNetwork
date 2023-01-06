import {ComponentType} from "react";
import {dialogsPageType, sendMessageActionCreator} from "../../Redux/dialogsReducer";
import Dialogs, {MessageOBJ} from "./Dialogs";
import {connect} from "react-redux";
import {AppStateType} from "../../Redux/redux-store";
import {Dispatch, compose} from "redux"
import {WithAuthRedirect} from "../../HOC/AuthRedirect";

type MapStateToPtopsType = {
    dialogsPage: dialogsPageType
}

let mapStateToProps = (state: AppStateType): MapStateToPtopsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

type mapDispatchToPropsType = {
    onSendMessageClickCB: (data:MessageOBJ) => void
}

let mapDispathToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        onSendMessageClickCB: (data:MessageOBJ) => {
            dispatch(sendMessageActionCreator(data))
        }
    }
}

export default compose<ComponentType>(
    connect<MapStateToPtopsType, mapDispatchToPropsType, {}, AppStateType>(mapStateToProps, mapDispathToProps),
    WithAuthRedirect,
)(Dialogs);