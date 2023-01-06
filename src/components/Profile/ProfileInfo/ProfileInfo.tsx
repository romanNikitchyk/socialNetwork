import React from 'react';
import classes from "./ProfileInfo.module.css"
import {ProfileType} from "../../../Redux/profileReducer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import Preloader from "../../preloader/Preloader";

type ProfileInfoPropsType = {
  profile: null | ProfileType
  status: string
  updateUserStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file:File) => void
}

const ProfileInfo = (props: ProfileInfoPropsType) => {
  if (!props.profile) {
    return <Preloader/>
  }
  const onMainPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.savePhoto(e.target.files[0])
    }
  }
  return (
    <div>
        <div className={classes.descriptionBlock}>
          <img
            src={props.profile.photos.large}/>
          {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}
          <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
        </div>

      <div>
        <div><b>Full name: </b>{props.profile.fullName}</div>
        <div>
          <b>Looking for a job: </b> {props.profile.lookingForAJob ? 'YES' : 'NO'}
        </div>
        {props.profile.lookingForAJob &&
          <div>
            <b>My professional skills: </b> {props.profile.lookingForAJobDescription}
          </div>
        }
        <div>
          <b>About me: </b> {props.profile.aboutMe}
        </div>
      </div>



    </div>
  );
};

export default ProfileInfo;