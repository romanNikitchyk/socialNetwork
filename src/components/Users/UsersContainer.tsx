import {connect} from "react-redux";
import {AppStateType, AppThunk} from "../../Redux/redux-store";
import {
    getUsersTC,
    setCurrentPage,
    UsersType,
    followTC,
    unfollowTC,
} from "../../Redux/usersReducer";
import React, {ComponentType} from "react";
import Users from "./Users";
import Preloader from "../preloader/Preloader";
import {WithAuthRedirect} from "../../HOC/AuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching, getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../Redux/usersSelectors";


type UsersContainerPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (p: number) => void
    setTotalUsersCount: (response: any) => void
    isFetching: boolean
    toggleIsFetching: (isFetching: boolean) => void
    toggleFollowingProgress:(isFetching:boolean, userId:number)=>void
    followingInProgress:Array<number>
    getUsers:(currentPage:number, pageSize:number)=>void
    follow:(userId:number)=>void
    unfollow:(userId:number)=>void
}

class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
         this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ?
                <Preloader/> :
                <Users
                    users={this.props.users}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    pageSize={this.props.pageSize}
                    totalItemsCount={this.props.totalUsersCount}
                    followingInProgress={this.props.followingInProgress}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                />}
        </>
    }
}

type mapStateToPropsType = {
    users: Array<UsersType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching:boolean
    followingInProgress:Array<number>
}

let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress:getFollowingInProgress(state)
    }
}

type mapObjectDispatchToPropsType = {
    setCurrentPage: (currentPage: number) => void,
    getUsers:(currentPage:number, pageSize:number)=>AppThunk
    follow:(userId:number)=>AppThunk
    unfollow:(userId:number)=>AppThunk
}
let mapObjectDispatchToProps = {
    setCurrentPage,
    getUsers: getUsersTC,
    follow: followTC,
    unfollow: unfollowTC,
}

export default compose<ComponentType>(
    connect<mapStateToPropsType, mapObjectDispatchToPropsType, any, AppStateType>(mapStateToProps, mapObjectDispatchToProps),
    WithAuthRedirect
    )(UsersContainer)
