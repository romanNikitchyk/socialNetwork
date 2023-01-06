import React, {ChangeEvent, useEffect, useState} from 'react';

type ProfileStatusPropsType = {
  status:string
  updateUserStatus:(status:string)=>void
}

export const ProfileStatusWithHooks = (props:ProfileStatusPropsType) => {
const [editMode, setEditMode] = useState<boolean>(false)
const [status, setStatus] = useState<string>('')


  useEffect(()=>{
    setStatus(props.status)
  },[props.status])

  const activateEditMode = () => {
    setEditMode(true)
  }
  const deActivateEditMode = () => {
    props.updateUserStatus(status)
    setEditMode(false)
  }
  const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value)
  }

    return (
      <div>
        {!editMode &&
          <div><span onDoubleClick={activateEditMode}>{props.status ? props.status : 'fakeStatus'}</span>
          </div>
        }
        {editMode &&
          <div><input onChange={onStatusChange} autoFocus={true} onBlur={deActivateEditMode} value={status} />
          </div>
        }
      </div>
    );
  }



