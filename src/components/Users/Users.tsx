import React from "react"
import styles from "./users.module.css";
import userPhoto from "../../images/user.png";
import {UsersType} from "../../Redux/usersReducer";
import {NavLink} from "react-router-dom";
import {Paginator} from "../common/Paginator";


type UsersPropsType = {
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    totalItemsCount: number
    pageSize: number
    followingInProgress: Array<number>
    follow:(userId:number)=>void
    unfollow:(userId:number)=>void
}





const Users = (props: UsersPropsType) => {


    let pageCount = Math.ceil(props.totalItemsCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return <div>
        <div>
            <Paginator
              totalUsersCount={props.totalItemsCount}
              pageSize={props.pageSize}
              currentPage={props.currentPage}
              onPageChanged={props.onPageChanged}
              portionSize={10}
            />
        </div>
        {props.users.map(u => <div key={u.id}>

                <span>
                    <div>
                        <NavLink to={`/Profile/${u.id}`}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={styles.photo}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed
                            ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                      onClick={() => {props.unfollow(u.id)}}>Unfollow</button>

                            : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                      onClick={() => {props.follow(u.id)}}>Follow</button>}

                    </div>
                </span>
            <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                {/*<span>*/}
                {/*     <div>{u.location.country}</div>*/}
                {/*    <div>{u.location.city}</div>*/}
                {/* </span>*/}
                </span>
        </div>)
        }
    </div>;
}
export default Users;