import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  return action.payload
} 

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notificationMessage, notificationDispatch] = useReducer(notificationReducer, 'App is ready.')

  return (
    <NotificationContext.Provider value={[notificationMessage, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext