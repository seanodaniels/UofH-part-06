import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(r => r.data)

export const createAnecdote = (anecdote) =>
  axios.post(baseUrl, anecdote).then(r => r.data)

export const updateAnecdote = (anecdote) => {
  console.log('anecdote:', anecdote)
  return axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(r => r.data)
}