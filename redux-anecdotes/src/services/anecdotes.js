import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getAnecdote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createNew = async (content) => {
  const object = {
    content: content,
    votes: 0
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  const anecdote = response.data
  const votedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  const dbResponse = await axios.put(`${baseUrl}/${id}`, votedAnecdote)
  return dbResponse.data
}

export default {
  getAll,
  createNew,
  getAnecdote,
  vote
}