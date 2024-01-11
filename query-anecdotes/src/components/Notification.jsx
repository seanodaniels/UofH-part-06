import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [notificationMessage, notificationDispatch] = useContext(NotificationContext)

  let message = notificationMessage

  setTimeout(() => {
    notificationDispatch({
      type: 'notification',
      payload: `App is ready.`
    })
  }, 5000)

  return (
    <div style={style}>
      <span>{message}</span>     
    </div>
  )
}

export default Notification
