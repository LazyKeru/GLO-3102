const baseUrl = 'https://glo3102lab4.herokuapp.com'

const createUser = async () => {
  const res = await fetch(baseUrl + '/users', {
    method: 'POST',
  }).then((res) => res.status === 200 ? res.json() : false)

  return res.id
}

const getAllTasks = async (userId) => {
  const res = await fetch(baseUrl + '/' + userId + '/tasks', {
    method: 'GET',
  }).then((res) => res.status === 200 ? res.json() : false)
  return res
}

const addTask = async (userId, note) => {
  const res = await fetch(baseUrl + '/' + userId + '/tasks', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  }).then((res) => res.status === 200 ? res.json() : false)
  return res
}

const updateTask = async (userId, noteId, newNote) => {
  const res = await fetch(baseUrl + '/' + userId + '/tasks/' + noteId, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newNote),
  }).then((res) => res.status === 200 ? res.json() : false)
  return res
}

//returns true if deleted succesfully false otherwise
const deleteTask = async (userId, noteId) => {
  const res = await fetch(baseUrl + '/' + userId + '/tasks/' + noteId, {
    method: 'DELETE',
  }).then((res) => res.status === 204 || res.status === 200 ? true : false)
  return res
}


// test function - gonna be removed
const test = async () => {
  console.log("create user ---- ")
  const userId = await createUser()
  console.log(userId)

  const note = {
    'name': 'finir le tp',
  }
  const note2 = {
    'name' : 'j ai faim'
  }
  console.log("add task ---- ")
  const noteId = await addTask(userId, note)
  console.log(noteId)
  console.log("add task2 ---- ")
  const noteId2 = await addTask(userId, note2)
  console.log(noteId2)

  console.log("get tasks ---- ")
  const tasks = await getAllTasks(userId)
  console.log(tasks)

  console.log("update task ----")
  const newNote = {
    'name': 'finir le tp 2: electric boogaloo',
  }
  const updatedNote = await updateTask(userId, noteId.id, newNote)
  console.log("get tasks ---- ")
  const tasksUpdated = await getAllTasks(userId)
  console.log(tasksUpdated)

  console.log("delete task ---- ")
  const res = await deleteTask(userId, noteId.id)
  console.log(res)

  console.log("get tasks ---- ")
  const tasksUpdated2 = await getAllTasks(userId)
  console.log(tasksUpdated2)
}

test()
