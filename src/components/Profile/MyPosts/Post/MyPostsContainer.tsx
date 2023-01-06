import React from 'react';
import MyPosts, {PostOBJ} from "../MyPosts";
import {addPostActionCreator, profilePageType} from "../../../../Redux/profileReducer";
import {connect} from "react-redux";
import {AppStateType} from "../../../../Redux/redux-store";
import {Dispatch} from "redux";

type MapStatePropsType = {
    profilePage:profilePageType
}

let mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return{
        profilePage:state.profilePage
    }
}

type MapDispatchPropsType = {
    addPostMessageCB:(post:PostOBJ)=>void
}

let mapDispathToProps =(dispatch:Dispatch)=>{
    return{
        addPostMessageCB:(post:PostOBJ)=>{dispatch(addPostActionCreator(post))},
    }
}
const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, any, AppStateType >(mapStateToProps,mapDispathToProps)(MyPosts)

export default MyPostsContainer;