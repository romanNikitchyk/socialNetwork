import React, {useState} from 'react';
import classes from "./ProfileInfo.module.css"
import {ProfileType} from "../../../Redux/profileReducer";
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import Preloader from "../../preloader/Preloader";
import {ProfileDataForm} from "./ProfileDataForm";
import {ProfileData} from "./ProfileData";
import {ProfileDataType} from "../../../api/api";

type ProfileInfoPropsType = {
  profile: null | ProfileType
  status: string
  updateUserStatus: (status: string) => void
  isOwner: boolean
  savePhoto: (file: File) => void
  saveProfileDataTC:(value: ProfileDataType)=>void
}


const ProfileInfo = (props: ProfileInfoPropsType) => {
  const [editMode, setEditMode] = useState(false)

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
      {editMode
        ? <ProfileDataForm saveProfileDataTC={props.saveProfileDataTC} profile={props.profile} isOwner={props.isOwner} exitFromEditMode={()=>{setEditMode(false)}}/>
        : <ProfileData goToEditMode={()=>{setEditMode(true)}} profile={props.profile} isOwner={props.isOwner}/>}

    </div>
  );
};

export const Contact = ({title, value}: { title: string, value: string | null }) => {
  return <div className={classes.contacts}><b>{title}:</b>{value}</div>
}

export default ProfileInfo;