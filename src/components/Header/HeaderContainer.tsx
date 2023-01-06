import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {AppStateType, AppThunk} from "../../Redux/redux-store";
import {getAuthUserData, logOutThunkCreator} from "../../Redux/authReducer";


type HeadeCOntainerPropsTYPE = {
    login: null | string
    isAuth: boolean
    authMe:()=>void
    logOut:()=>void
}

class HeaderContainer extends React.Component<HeadeCOntainerPropsTYPE> {
    componentDidMount() {
        this.props.authMe()
    }

    render() {
        return (
            <Header login={this.props.login} isAuth={this.props.isAuth} logOut={this.props.logOut}/>
        );
    }

};
type MapStateToPropsTYPE = {
    login: null | string
    isAuth: boolean
}
let mapStateToProps = (state: AppStateType): MapStateToPropsTYPE => (
    {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }

)


type MapDispatchToPropsTYPE = {
    authMe:()=>AppThunk
    logOut:()=>AppThunk
}

export default connect<MapStateToPropsTYPE, MapDispatchToPropsTYPE, {}, AppStateType>(mapStateToProps, { authMe: getAuthUserData, logOut:logOutThunkCreator})(HeaderContainer);