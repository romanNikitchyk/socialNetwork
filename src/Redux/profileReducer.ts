import {v1} from "uuid";
import {ActionsTypes, AppThunk} from "./redux-store";
import {apiUsers, profileAPI} from "../api/api";
import {PostOBJ} from "../components/Profile/MyPosts/MyPosts";

const initialState: profilePageType = {
  posts: [
    {id: v1(), message: "Hi how are you?", likesCount: 15},
    {id: v1(), message: "It is my first post!", likesCount: 25}
  ],

  profile: null as null | ProfileType,
  status: ""
}
export const addPostActionCreator = (post: PostOBJ): ActionsTypes => {
  return {type: "ADD-POST", post}
}
export const setUserProfileActionCreator = (profile: ProfileType): ActionsTypes => {
  return {type: "SET-USER-PROFILE", profile}
}
export const setStatusActionCreator = (status: string): ActionsTypes => {
  return {type: "SET-STATUS", status}
}
export const deletePostAC = (postId: string): ActionsTypes => ({type: 'DELETE_POST', postId})

export const savePhotoSuccessAC = (photos: any): ActionsTypes => ({type: 'SAVE-PHOTO', photos})


export const profileReducer = (state = initialState, action: ActionsTypes) => {
  switch (action.type) {
    case "ADD-POST":
      let newPost = {id: v1(), message: action.post.post, likesCount: 0}
      return {...state, posts: [newPost, ...state.posts]}
    case "SET-USER-PROFILE":
      return {...state, profile: action.profile}
    case "SET-STATUS":
      return {...state, status: action.status}
    case "DELETE_POST":
      return {...state, posts: state.posts.filter((p) => p.id !== action.postId)}
    case "SAVE-PHOTO":
      return {...state, profile:{...state.profile, photos:action.photos}}
    default:
      return state
  }
};

export const getUserProfile = (userId: string): AppThunk => {
  return async (dispatch) => {
    let response = await apiUsers.userProfile(userId)
    try {
      dispatch(setUserProfileActionCreator(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const getUserStatus = (userId: string): AppThunk => {
  return async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    try {
      dispatch(setStatusActionCreator(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const updateUserStatus = (status: string): AppThunk => {
  return async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    try {
      if (response.data.resultCode === 0) {
        dispatch(setStatusActionCreator(status))
      }
    } catch (err) {
      console.log(err)
    }
  }
}
export const savePhotoTC = (file: File): AppThunk => {
  return async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
    try {
      if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccessAC(response.data.photos))
      }
    } catch (err) {
      console.log(err)
    }
  }
}


//types
export type profilePageType = {
  posts: Array<PostsType>
  profile: any
  status: string
}

export type PostsType = {
  id: string
  message: string
  likesCount: number
}
export type ProfileType = {
  aboutMe: string,
  contacts: ContactsType,
  lookingForAJob: boolean,
  lookingForAJobDescription: string,
  fullName: string,
  userId: number,
  photos: PhotosType
}
export type ContactsType = {
  facebook: string,
  website: null | string,
  vk: string,
  twitter: string,
  instagram: string,
  youtube: null | string,
  github: string,
  mainLink: null | string
}
export type PhotosType = {
  small: string,
  large: string
}

export type SetStatusActionType = {
  type: "SET-STATUS"
  status: string
}
export type SetUserProfileActionType = {
  type: "SET-USER-PROFILE"
  profile: ProfileType
}
export type AddPostActionType = {
  type: "ADD-POST"
  post: PostOBJ
}
export type DeletePostActionType = {
  type: 'DELETE_POST'
  postId: string
}
export type SavePhotoSuccessActionType = {
  type: "SAVE-PHOTO"
  photos: any
}


export default profileReducer;