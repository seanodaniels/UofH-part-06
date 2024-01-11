import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useReducer } from 'react'
import { getAnecdotes } from './requests'
import { NotificationContextProvider } from './NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteItem from './components/AnecdoteItem'
import Notification from './components/Notification'

const notificationReducer = (state, action) => {
  return action.payload
}  

const App = () => {
  const [notificationMessage, dispatch] = useReducer(notificationReducer, 'App is Ready.')

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 2
  })

  if ( result.isLoading ) {
    return <div>loading...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems with the server</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContextProvider>
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <AnecdoteItem 
              key={anecdote.id} 
              anecdote={anecdote}  
            />
          </div>
        )}
      </div>
    </NotificationContextProvider>
  )
}

export default App
