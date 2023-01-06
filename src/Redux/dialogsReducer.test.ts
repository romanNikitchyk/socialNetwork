import {addPostActionCreator, profilePageType, ProfileType} from "./profileReducer";
import {v1} from "uuid";
import dialogsReducer, {dialogsPageType, sendMessageActionCreator} from "./dialogsReducer";

test('messages.length should be incremented', () => {
  let startState:dialogsPageType = {
    dialogs: [
      {id: v1(), name: "Roma"},
      {id: v1(), name: "Anya"},
      {id: v1(), name: "Denis"},
      {id: v1(), name: "Vlad"},
      {id: v1(), name: "Valera"},
    ],
    messages: [
      {id: v1(), message: "Hi:)"},
      {id: v1(), message: "How are you?"},
      {id: v1(), message: "Bye:*"}
    ]
  }

  let action = sendMessageActionCreator({message: "test message"})

  let endState = dialogsReducer(startState, action)

  expect(endState.messages.length).toBe(4)
  expect(endState.messages[3].message).toBe("test message")
})