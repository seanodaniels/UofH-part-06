import { createSlice } from '@reduxjs/toolkit'

const initialState = 'App is ready.'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const createNotification = (content, timeOut = 3000) => {
  return async dispatch => {
    dispatch(setNotification(content))
    setTimeout(() => {
      dispatch(setNotification('App is ready.'))
    }, timeOut)
  }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer