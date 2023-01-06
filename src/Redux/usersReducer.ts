import {apiUsers} from "../api/api";
import {ActionsTypes, AppThunk} from "./redux-store";


export type UsersType = {
    followed: boolean
    id: number
    name: string
    photos: {small: null | string, large: null | string}
    status: null | string
    uniqueUrlName: null | string
}

export type UsersInitStateType = {
    users: UsersType[]
    pageSize:number
    totalUsersCount:number
    currentPage:number
    isFetching:boolean
    followingInProgress: Array<number>
}

const initialState: UsersInitStateType = {
    users: [] as UsersType[],
    pageSize:5,
    totalUsersCount:0,
    currentPage:1,
    isFetching:false,
    followingInProgress: [],
}
export const followAC = (userId: number): FollowACType => {
    return {type: "FOLLOW", userId}
}
export const unfollowAC = (userId: number): UnFollowACType => {
    return {type: "UNFOLLOW", userId}
}
export const setUsers = (users: UsersType[]): SetUsersACType => {
    return {type: "SET-USERS", users}
}
export const setCurrentPage = (currentPage:number): SetCurrentPageACType => {
    return {type: "SET-CURRENT-PAGE", currentPage}
}
export const setTotalUsersCount = (totalCount:number): SetTotalUsersCountACType => {
    return {type: "SET-TOTAL-USERS-COUNT", totalCount}
}
export const toggleIsFetching = (isFetching:boolean):ToggleIsFetchingACType=>{
    return{type:"TOGGLE-IS-FETCHING", isFetching}
}
export const toggleFollowingProgress = (isFetching:boolean, userId:number):ToggleFollowingProgressACType=>{
    return{type:"TOGGLE-IS-FOLLOWING-PROGRESS", isFetching, userId}
}


export const usersReducer = (state = initialState, action: ActionsTypes): UsersInitStateType => {
    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === +action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === +action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }

        case "SET-USERS":
            return {...state, users: action.users}

        case "SET-CURRENT-PAGE":
            return {...state, currentPage: action.currentPage}

        case "SET-TOTAL-USERS-COUNT":
            return {...state, totalUsersCount: action.totalCount}

        case "TOGGLE-IS-FETCHING":
            return {...state, isFetching:action.isFetching}

        case "TOGGLE-IS-FOLLOWING-PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                ? [...state.followingInProgress, action.userId]
                : state.followingInProgress.filter(id => id != action.userId)
            }

        default:
            return state
    }
};


export const getUsersTC = (currentPage:number, pageSize:number): AppThunk =>{
    return async(dispatch) => {
        dispatch(toggleIsFetching(true))
        //dispatch(setCurrentPage(currentPage))
       let response = await apiUsers.getUsers(currentPage, pageSize)
            try{
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(response.data.items))
                dispatch(setTotalUsersCount(response.data.totalCount))
            }
            catch (err){
                console.log(err)
            }
    }
}

export const followUnfollowFlow = async (dispatch:any, userId:number, apiMethod:any, action:any) => {
        dispatch(toggleFollowingProgress(true, userId))
       let response = await apiMethod(userId)
            if (response.data.resultCode === 0) {
                dispatch(action(userId))
            }
            dispatch(toggleFollowingProgress(false, userId))
    }

export const unfollowTC = (userId:number):AppThunk=> {
    return (dispatch)=>{
      followUnfollowFlow(dispatch, userId,apiUsers.unfollow.bind(userId),unfollowAC)
    }
}

export const followTC = (userId:number):AppThunk=> {
    return (dispatch)=>{
        followUnfollowFlow(dispatch, userId,apiUsers.follow.bind(userId),followAC)
    }
}


export type FollowACType = {
    type: "FOLLOW"
    userId: number
}
export type UnFollowACType = {
    type: "UNFOLLOW"
    userId: number
}
export type SetUsersACType = {
    type: "SET-USERS"
    users: UsersType[]
}
export type SetCurrentPageACType = {
    type: "SET-CURRENT-PAGE"
    currentPage: number
}
export type SetTotalUsersCountACType = {
    type: "SET-TOTAL-USERS-COUNT"
    totalCount: number
}
export type ToggleIsFetchingACType = {
    type: "TOGGLE-IS-FETCHING"
    isFetching: boolean
}
export type ToggleFollowingProgressACType = {
    type: "TOGGLE-IS-FOLLOWING-PROGRESS"
    isFetching: boolean
    userId: number
}

export default usersReducer;