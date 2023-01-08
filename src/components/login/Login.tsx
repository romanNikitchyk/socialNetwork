import React from 'react';
import {useForm} from "react-hook-form";
import s from "../login/Login.module.css"
import {connect} from "react-redux";
import {loginThunkCreator} from "../../Redux/authReducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../Redux/redux-store";
import {ProfileType} from "../../Redux/profileReducer";

type FormDataType = {
  login: string
  password: string
  rememberMe: boolean
}
type LoginOBJ = {
  login: string
  password: string
  rememberMe: boolean
}
const Login = (props: any) => {

  if (props.isAuth) {
    return <Redirect to={"/profile"}/>
  }
  return (<div>
      <h1>LOGIN</h1>
      <LoginForm loginThunkCreator={props.loginThunkCreator}/>
    </div>
  );
};


const LoginForm = (props: any) => {
  const {register, handleSubmit, reset, formState: {errors}} = useForm<LoginOBJ>()
  const onSubmit = (formData: FormDataType) => {
    let {login, password, rememberMe} = formData
    props.loginThunkCreator(login, password, rememberMe)
    reset()
  }
  return (<form onSubmit={handleSubmit(onSubmit)}>
      {props.captchaUrl && <img src={props.captchaUrl}/>}
      <div><input className={errors.login?.message === "required field" ? s.input : ""}
                  {...register("login",
                    {required: "required field", minLength: 1})} placeholder="LOGIN"/>
      </div>
      <div><input className={errors.password?.message === "required field" ? s.input : ""}
                  {...register("password",
                    {required: "required field", minLength: 1})} placeholder={"PASSWORD"} type="password"/></div>
      <div><input {...register("rememberMe")} type="checkbox"/>Remember me</div>
      <div>
        <button>Login</button>
      </div>
    </form>


  );
};
type MapStatePropsType = {
  isAuth: boolean
  captchaUrl: string | null
}
const mapStateToProps = (state: AppStateType):MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})


export default connect(mapStateToProps, {loginThunkCreator})(Login);