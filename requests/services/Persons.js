import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newPeep => {
  const request = axios.post(baseUrl, newPeep)
  return request.then(response => response.data)
}

const update = (id, updatedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${ baseUrl }/${ id }`, id);
  return request.then(res => res.data);
}

const noteService = {
  getAll,
  create,
  update,
  remove
}

export default noteService