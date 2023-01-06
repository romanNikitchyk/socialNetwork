import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/Post/MyPostsContainer";
import {ProfileType} from "../../Redux/profileReducer";

type ProfilePropsType = {
  profile: null | ProfileType
  status: string
  updateUserStatus: (status: string) => void
  isOwner: boolean
  savePhoto:(file: File)=>void
}
const Profile = (props: ProfilePropsType) => {

  return (
    <div>
      <ProfileInfo
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
      />
      <MyPostsContainer
      />
    </div>
  );
};

export default Profile;