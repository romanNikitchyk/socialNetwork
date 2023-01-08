import {combineReducers, legacy_createStore as createStore, applyMiddleware} from "redux";
import profileReducer, {
  AddPostActionType, DeletePostActionType, SavePhotoSuccessActionType, SetStatusActionType,
  SetUserProfileActionType,
} from "./profileReducer";
import dialogsReducer, {SendMessageActionType} from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer, {
  FollowACType,
  SetCurrentPageACType,
  SetTotalUsersCountACType,
  SetUsersACType, ToggleFollowingProgressACType, ToggleIsFetchingACType,
  UnFollowACType
} from "./usersReducer";
import authReducer, {GetCaptchaUrlActionType, logOutACType, SetAuthUserDataACTYPE} from "./authReducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk"

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
})

export type AppStateType = ReturnType<typeof reducers>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, ActionsTypes>


export let store = createStore(reducers, applyMiddleware(thunkMiddleware))

export type ActionsTypes =
  AddPostActionType
  | SendMessageActionType
  | FollowACType
  | UnFollowACType
  | SetUsersACType
  | SetCurrentPageACType
  | SetTotalUsersCountACType
  | ToggleIsFetchingACType
  | SetUserProfileActionType
  | SetAuthUserDataACTYPE
  | ToggleFollowingProgressACType
  | SetStatusActionType
  | logOutACType
  | DeletePostActionType
  | SavePhotoSuccessActionType
  | GetCaptchaUrlActionType

