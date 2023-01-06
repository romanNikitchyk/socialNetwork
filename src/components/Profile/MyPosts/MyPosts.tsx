import React from 'react';
import classes from "./MyPosts.module.css"
import Post from "./Post/Post";
import {PostsType, profilePageType} from "../../../Redux/profileReducer";
import {useForm} from "react-hook-form";

type MyPostsPropsType = {
  profilePage: profilePageType
  addPostMessageCB: (post: PostOBJ) => void
}
export type PostOBJ = {
  post: string
}
const MyPosts = React.memo((props: MyPostsPropsType) => {

  function addPostMessage(post: PostOBJ) {
    props.addPostMessageCB(post)
    reset()
  }

  const {register, handleSubmit, reset} = useForm<PostOBJ>({})

  return (
    <div className={classes.postsBlock}>
      My post
      <div>
        <div>
          <form onSubmit={handleSubmit(addPostMessage)}>
            <div><input {...register("post")} placeholder="make your post"/></div>
            <div>
              <button>ADD POST</button>
            </div>
          </form>
        </div>
      </div>

      <div className={classes.posts}>
        {props.profilePage.posts.map((p: PostsType) =>
          <Post message={p.message}
                likesCount={p.likesCount}
                key={p.id}
          />
        )}
      </div>
    </div>
  );
});

export default MyPosts;