import * as api from './api.js'

// test function - gonna be removed
const test = async () => {
  console.log('create user ---- ')
  const userId = await api.createUser()
  console.log(userId)

  const note = {
    name: 'finir le tp',
  }
  const note2 = {
    name: 'j ai faim',
  }
  console.log('add task ---- ')
  const noteId = await api.addTask(userId, note)
  console.log(noteId)
  console.log('add task2 ---- ')
  const noteId2 = await api.addTask(userId, note2)
  console.log(noteId2)

  console.log('get tasks ---- ')
  const tasks = await api.getAllTasks(userId)
  console.log(tasks)

  console.log('update task ----')
  const newNote = {
    name: 'finir le tp 2: electric boogaloo',
  }
  const updatedNote = await api.updateTask(userId, noteId.id, newNote)
  console.log('get tasks ---- ')
  const tasksUpdated = await api.getAllTasks(userId)
  console.log(tasksUpdated)

  console.log('delete task ---- ')
  const res = await api.deleteTask(userId, noteId.id)
  console.log(res)

  console.log('get tasks ---- ')
  const tasksUpdated2 = await api.getAllTasks(userId)
  console.log(tasksUpdated2)
}

test()
