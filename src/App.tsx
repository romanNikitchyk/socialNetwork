import React, {ComponentType} from "react";
import './App.css'
import Navbar from "./components/Navbar/Navbar"
import {Route, Switch} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer"
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/login/Login"
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "./Redux/redux-store";
import {initializeApp} from "./Redux/app-reducer";


type ParamTypes = {
    initializeApp:()=>void
}
class App extends React.Component<ParamTypes> {
    componentDidMount() {
       this.props.initializeApp()
    }

    render() {

        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route path='/Profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/Dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/Users' render={() => <UsersContainer/>}/>
                        <Route path='/News' render={() => <News/>}/>
                        <Route path='/Music' render={() => <Music/>}/>
                        <Route path='/Settings' render={() => <Settings/>}/>
                        <Route path='/login' render={() => <LoginPage/>}/>
                    </Switch>
                </div>
            </div>
        );
    }
}
type mapDispatchToPropsType = {
    initializeApp:()=>void
}




export default compose<ComponentType>(
    connect<null, mapDispatchToPropsType, {}, AppStateType>(null,{initializeApp})
)(App)

