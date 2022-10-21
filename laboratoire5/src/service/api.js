const baseUrl = 'https://glo3102lab4.herokuapp.com'

const checkStatus = (response) => {
  if(!response.ok)
    throw new Error(response.status + ": " + response.statusText)
  return response
}

const createUser = await fetch(baseUrl + '/users', {
      method: 'POST',
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(data => data.id)
    .catch(error => alert(error))

const getAllTasks = async (userId) => await fetch(baseUrl + '/' + userId + '/tasks', {
      method: 'GET',
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(data => data.tasks)
    .catch(error => alert(error))

const addTask = async (userId, noteName) => await fetch(baseUrl + '/' + userId + '/tasks', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: noteName}),
    })
    .then(checkStatus)
    .then(response => response.json())
    .catch(error => alert(error))

const updateTask = async (userId, noteId, newNoteName) => await fetch(baseUrl + '/' + userId + '/tasks/' + noteId, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: newNoteName}),
    })
    .then(checkStatus)
    .then(response => response.json())
    .catch(error => alert(error))

//returns true if deleted succesfully false otherwise
const deleteTask = async (userId, noteId) => await fetch(baseUrl + '/' + userId + '/tasks/' + noteId, {
      method: 'DELETE',
    })
    .then(checkStatus)
    .then(() => true)
    .catch(error => alert(error))

export { createUser, addTask, getAllTasks, updateTask, deleteTask }
