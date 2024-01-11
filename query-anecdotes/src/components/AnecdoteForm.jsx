import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useReducer, useContext } from 'react'
import { createAnecdote } from '../requests'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const [notificationMessage, notificationDispatch] = useContext(NotificationContext)
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length >= 5) {
      event.target.anecdote.value = ''
      newAnecdoteMutation.mutate({
        content,
        votes: 0
      })
      notificationDispatch({
        type: 'notification',
        payload: `anecdote '${content}' created` 
      })
    } else {      
      notificationDispatch({
        type: 'notification',
        payload: `anecdote needs to be at least 5 characters long.` 
      })
    }
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
