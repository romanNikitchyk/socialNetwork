import React, {ComponentType} from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
  getUserProfile,
  getUserStatus,
  ProfileType,
  savePhotoTC,
  saveProfileDataTC,
  updateUserStatus
} from "../../Redux/profileReducer";
import {AppStateType} from "../../Redux/redux-store";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {WithAuthRedirect} from "../../HOC/AuthRedirect";
import {compose} from "redux";
import {ProfileDataType} from "../../api/api";


type ProfileContainerType = RouteComponentProps<ParamTypes> & MapStatePropsType & MapDispatchPropsType
type ParamTypes = {
  userId: string | undefined
}

class ProfileContainer extends React.Component<ProfileContainerType> {

  componentDidMount() {
    this.props.getUserProfile(this.props.userId || "")
    this.props.getUserStatus(this.props.userId || "")
  }

  render() {

    return (
      <Profile
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
        savePhoto={this.props.savePhotoTC}
        saveProfileDataTC={this.props.saveProfileDataTC}
      />
    )
  }
}

type MapStatePropsType = {
  profile: null | ProfileType
  status: string
  userId: null | string
}
let mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  userId: state.auth.userId,
})

type MapDispatchPropsType = {
  getUserProfile: (userId: string) => void
  getUserStatus: (userId: string) => void
  updateUserStatus: (status: string) => void
  savePhotoTC:(file: File)=>void
  saveProfileDataTC:(value: ProfileDataType)=>void
}

export default compose<ComponentType>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhotoTC,
    saveProfileDataTC
  }),
  WithAuthRedirect,
  withRouter,
)
(ProfileContainer)