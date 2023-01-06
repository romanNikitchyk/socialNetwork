import profileReducer, {addPostActionCreator, deletePostAC, profilePageType, ProfileType} from "./profileReducer";
import {v1} from "uuid";
import post from "../components/Profile/MyPosts/Post/Post";


test('posts.length should be incremented', () => {
  let startState:profilePageType = {
    posts: [
      {id: v1(), message: "Hi how are you?", likesCount: 15},
      {id: v1(), message: "It is my first post!", likesCount: 25}
    ],

    profile: null as null | ProfileType,
    status: ""
  }
  let action = addPostActionCreator({post: "test message"})

  let endState = profileReducer(startState, action)

  expect(endState.posts.length).toBe(3)
  expect(endState.posts[0].message).toBe("test message")
})

test('posts.length should be decremented', () => {
  let startState:profilePageType = {
    posts: [
      {id: v1(), message: "Hi how are you?", likesCount: 15},
      {id: v1(), message: "It is my first post!", likesCount: 25}
    ],

    profile: null as null | ProfileType,
    status: ""
  }
  let postId = startState.posts[1].id
  let action = deletePostAC(postId)

  let endState = profileReducer(startState, action)

  expect(endState.posts.length).toBe(1)
  expect(endState.posts[0].message).toBe("Hi how are you?")
})