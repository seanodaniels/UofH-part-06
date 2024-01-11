import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'
import { useReducer, useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteItem = ({ anecdote }) => {

  const queryClient = useQueryClient()

  const [notificationMessage, notificationDispatch] = useContext(NotificationContext)

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })
    }
  })
  
  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    notificationDispatch({ 
      type: 'notification', 
      payload: `anecdote '${anecdote.content}' voted` 
    })
  }  
   
  return (
    <div>      
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  )
}
export default AnecdoteItem