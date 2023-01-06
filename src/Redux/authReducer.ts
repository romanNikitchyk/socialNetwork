import {authAPI} from "../api/api";
import {ActionsTypes, AppThunk} from "./redux-store";

export type authStateType = {
  userId: null | string
  email: null | string
  login: null | string
  isAuth: boolean
}
let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
}

const authReducer = (state: authStateType = initialState, action: ActionsTypes) => {
  switch (action.type) {
    case "AUTH/SET-USER-DATA":
      return {...state, ...action.data}
    case "AUTH/LOG-OUT":
      return {userId: null, email: null, login: null, isAuth: false,}
    default:
      return state
  }
}

export const setAuthUserDataAC = (userId: string, email: string, login: string, isAuth: boolean): SetAuthUserDataACTYPE => {
  return {type: "AUTH/SET-USER-DATA", data: {userId, email, login, isAuth}}
}
export const logOutAC = (): logOutACType => {
  return {type: "AUTH/LOG-OUT"}
}

export const getAuthUserData = (): AppThunk =>

  async (dispatch) => {
    try {
      let response = await authAPI.me()

      if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserDataAC(id, email, login, true))
      }
    }
    catch (err) {
      console.log(err)
    }
  }




export const loginThunkCreator = (email: string, password: string, rememberMe?: boolean): AppThunk => {
  return async(dispatch) => {
 let response = await authAPI.login(email, password, rememberMe)
      try {
        if (response.data.resultCode === 0) {
          dispatch(getAuthUserData())
        }
      }
      catch (err){
        console.log(err)
      }
  }
}
export const logOutThunkCreator = (): AppThunk => {
  return async (dispatch) => {
   await authAPI.logout()
      try {
        dispatch(logOutAC())
      }
      catch (err){
        console.log(err)
      }
  }
}

export type SetAuthUserDataACTYPE = {
  type: "AUTH/SET-USER-DATA"
  data: {
    userId: string
    email: string
    login: string
    isAuth: boolean
  }
}
export type logOutACType = {
  type: "AUTH/LOG-OUT"
}

export default authReducer