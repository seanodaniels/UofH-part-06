import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useReducer, useContext } from 'react'
import { createAnecdote } from '../requests'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const [notificationMessage, notificationDispatch] = useContext(NotificationContext)
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })
      notificationDispatch({
        type: 'notification',
        payload: `anecdote '${anecdote.content}' created` 
      })
 
    },
    onError: () => {
      notificationDispatch({
        type: 'notification',
        payload: 'Error: Anecdote must be at least 5 characters long.'
      })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({
      content,
      votes: 0
    })
    
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
