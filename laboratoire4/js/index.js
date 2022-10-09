import * as api from './api.js'

let userId = null
let updatingTask = null

const createUser = async () => {
  const user = await api.createUser()
  if (!user) {
    alert("Une erreur s'est produite - erreur API createUser")
  } else {
    userId = user
    switchToConnectedView()
    generateTaskList()
  }
}

const createTask = async () => {
  const input = document.getElementById('createTask-input')
  const inputValue = input.value
  if (!inputValue.replace(/\s/g, '').length) {
    displayCreateNoNameError()
  } else {
    hideCreateNoNameError()
    const newTask = await api.addTask(userId, inputValue)
    if (!newTask) {
      alert("Une erreur s'est produite - erreur API addTask")
    } else {
      generateTaskList()
      input.value = ''
    }
  }
}

const taskDone = async (id) => {
  if (id) {
    disableStyleTask(id)
    const res = await api.deleteTask(userId, id)
    if (res) {
      generateTaskList()
    } else {
      alert("Une erreur s'est produite - erreur API deleteTask")
    }
  } else {
    alert("Une erreur s'est produite - impossible de suprrimer cette tache")
  }
}

const updateTask = async () => {
  const updateInput = document.getElementById('updateTask-input')
  const updateValue = updateInput.value
  if (!updateValue.replace(/\s/g, '').length) {
    displayUpdateNoNameError()
  } else {
    hideUpdateNoNameError()
    const updatedTask = await api.updateTask(userId, updatingTask, updateValue)
    if (updatedTask) {
      switchToConnectedView()
      generateTaskList()
      updateInput.value = ''
    } else {
      alert("Une erreur s'est produite - erreur API updateTask")
    }
  }
}

const goToUpdateTaskView = (id) => {
  if (id) {
    updatingTask = id
    switchToUpdateTaskView()
  } else {
    alert("Une erreur s'est produite - impossible de mettre à jour cette tache")
  }
}

const updateTasksEventListeners = () => {
  const tasks = document.getElementsByClassName('taskCheckbox')
  const updateBtns = document.getElementsByClassName('updateBtn')

  Array.from(tasks).forEach((task) =>
    task.addEventListener('change', function () {
      taskDone(this.parentElement.id)
    })
  )

  Array.from(updateBtns).forEach((task) =>
    task.addEventListener('click', function () {
      goToUpdateTaskView(this.parentElement.id)
    })
  )
}

const generateTaskList = async () => {
  if (userId) {
    const tasks = await api.getAllTasks(userId)
    if (!tasks) {
      alert("Une erreur s'est produite - erreur API getAllTasks")
    } else {
      const list = document.getElementById('taskList')
      if (tasks.length == 0) {
        list.innerHTML = "Il n'y a aucune tâche"
      } else {
        const tasksHtml = []
        tasks.forEach((task) => {
          const tmp = `<li class="task" id="${task.id}"><input class="taskCheckbox" type="checkbox" >${task.name}</input>
          <button class="updateBtn">Mettre à jour</button></li>`
          tasksHtml.push(tmp)
        })
        list.innerHTML = tasksHtml.join('')
        updateTasksEventListeners()
      }
    }
  } else {
    alert("Une erreur s'est produite - pas d'utilisateur connecté")
  }
}

const getTaskName = async (id) => {
  const tasks = await api.getAllTasks(userId)
  if (tasks && tasks.length > 0) {
    let name = ""
    tasks.forEach((task) => {
      console.log(task.id == id)
      if (task.id == id) name = task.name
    })
    return name
  } else {
    alert("Une erreur s'est produite - erreur API getAllTasks dans getTaskName")
    return "erreur"
  }
}

// element display management
const switchToConnectedView = () => {
  const createTaskDiv = document.getElementById('createTask')
  const taskListContainer = document.getElementById('taskListContainer')
  const createUser = document.getElementById('createUser')
  const updateTask = document.getElementById('updateTask')

  createTaskDiv.style.display = 'inherit'
  taskListContainer.style.display = 'inherit'
  createUser.style.display = 'none'
  updateTask.style.display = 'none'

  enableStyleAllTasks()
}

const switchToUpdateTaskView = async () => {
  const createTaskDiv = document.getElementById('createTask')
  const taskListContainer = document.getElementById('taskListContainer')
  const createUser = document.getElementById('createUser')
  const updateTask = document.getElementById('updateTask')

  const updateTitle = updateTask.querySelector('.subtitle')
  const taskName = await getTaskName(updatingTask)

  updateTitle.innerHTML = 'Mettre à jour la tâche : ' + taskName

  createTaskDiv.style.display = 'none'
  taskListContainer.style.display = 'inherit'
  createUser.style.display = 'none'
  updateTask.style.display = 'inherit'

  disableStyleAllTasks()
}

const disableStyleTask = (id) => {
  const parentLi = document.getElementById(id)
  const btn = parentLi.querySelector('.updateBtn')
  const checkbox = parentLi.querySelector('.taskCheckbox')

  btn.disabled = true
  checkbox.disabled = true
}

const disableStyleAllTasks = () => {
  const tasks = document.getElementsByClassName('taskCheckbox')

  Array.from(tasks).forEach((task) => disableStyleTask(task.parentElement.id))
}

const enableStyleTask = (id) => {
  const parentLi = document.getElementById(id)
  const btn = parentLi.querySelector('.updateBtn')
  const checkbox = parentLi.querySelector('.taskCheckbox')

  btn.disabled = false
  checkbox.disabled = false
}

const enableStyleAllTasks = () => {
  const tasks = document.getElementsByClassName('taskCheckbox')

  Array.from(tasks).forEach((task) => enableStyleTask(task.parentElement.id))
}

const displayCreateNoNameError = () => {
  const error = document.getElementById('createTask-noNameError')

  error.style.display = 'inherit'
}

const hideCreateNoNameError = () => {
  const error = document.getElementById('createTask-noNameError')

  error.style.display = 'none'
}

const displayUpdateNoNameError = () => {
  const error = document.getElementById('updateTask-noNameError')

  error.style.display = 'inherit'
}

const hideUpdateNoNameError = () => {
  const error = document.getElementById('updateTask-noNameError')

  error.style.display = 'none'
}

//listeners
document.getElementById('createUser-btn').addEventListener('click', createUser)
document
  .getElementById('createTask-input-btn')
  .addEventListener('click', createTask)
document
  .getElementById('updateTask-input-btn')
  .addEventListener('click', updateTask)
