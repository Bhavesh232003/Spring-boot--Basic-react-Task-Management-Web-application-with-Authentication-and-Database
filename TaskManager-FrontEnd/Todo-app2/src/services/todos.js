import axios from 'axios'

const API_URL = 'http://localhost:8080/api/todos'

const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return { headers: { Authorization: `Bearer ${token}` } }
}

export default {
  getAll: async () => {
    const response = await axios.get(API_URL, getAuthHeader())
    return response.data
  },
  create: async (todoData) => {
    await axios.post(API_URL, todoData, getAuthHeader())
  },
  update: async (id, todoData) => {
    await axios.put(`${API_URL}/${id}`, todoData, getAuthHeader())
  },
  delete: async (id) => {
    await axios.delete(`${API_URL}/${id}`, getAuthHeader())
  }
}