import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick } ) => {
  return(
    <li>
      {anecdote.content}<br />
      has {anecdote.votes}<button onClick={handleClick}>vote</button>
    </li>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const currentFilter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
  const filteredAnecdotes = anecdotes.filter(a => a.content.includes(currentFilter))
  const sortByVotes = filteredAnecdotes.sort((a,b) => {
    if (a.votes > b.votes) {
      return -1
    }
    if (a.votes < b.votes) {
      return 1
    }
    return 0
  })

  const voteHandler = (item) => {
    dispatch(voteAnecdote(item.id))
    // dispatch(setNotification(`you voted '${item.content}'`))
    // setTimeout(() => {
    //   dispatch(setNotification('App is ready.'))
    // }, 5000)
    dispatch(createNotification(`you voted '${item.content}'`, 5000))
  }

  return(
    <div>
      {sortByVotes.map(a => 
        <Anecdote 
          key={a.id} 
          anecdote={a} 
          handleClick={() => voteHandler(a)}
        />
      )}
    </div>    
  )
}

export default Anecdotes