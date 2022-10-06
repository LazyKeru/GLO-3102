const baseUrl = 'https://glo3102lab4.herokuapp.com'

const createUser = async () => {
  const res = await fetch(baseUrl + '/users', {
    method: 'POST',
  }).then((res) => (res.status === 200 ? res.json() : false))

  return res.id
}

const getAllTasks = async (userId) => {
  const res = await fetch(baseUrl + '/' + userId + '/tasks', {
    method: 'GET',
  }).then((res) => (res.status === 200 ? res.json() : false))
  return res
}

const addTask = async (userId, note) => {
  const res = await fetch(baseUrl + '/' + userId + '/tasks', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  }).then((res) => (res.status === 200 ? res.json() : false))
  return res
}

const updateTask = async (userId, noteId, newNote) => {
  const res = await fetch(baseUrl + '/' + userId + '/tasks/' + noteId, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newNote),
  }).then((res) => (res.status === 200 ? res.json() : false))
  return res
}

//returns true if deleted succesfully false otherwise
const deleteTask = async (userId, noteId) => {
  const res = await fetch(baseUrl + '/' + userId + '/tasks/' + noteId, {
    method: 'DELETE',
  }).then((res) => (res.status === 204 || res.status === 200 ? true : false))
  return res
}

export { createUser, addTask, getAllTasks, updateTask, deleteTask }
