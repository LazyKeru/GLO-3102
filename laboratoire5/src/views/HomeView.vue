<template>
  <main>
    <div v-if="!userId">
      <button @click="createUser">Créer mon compte !</button>
    </div>
    <div v-if="userId">
      <h3>Bonjour utilisateur {{userId}}</h3>
      <h2 v-if="!editingTaskId" >Création d'une tâche</h2>
      <h2 v-if="editingTaskId" >Edition de la tâche</h2>
      <label>Le nom de la tâche (Obligatoire)</label>
      <input type="text" v-model="inputText" placeholder="edit me"/>
      <button v-if="!editingTaskId" @click="createTask">Créer la tâche</button>
      <button v-if="editingTaskId" @click="editTask">Changer la tâche</button>
      <p>{{response}}</p>
    </div>
    <li v-for="task in tasks">
      <label for="task">{{task.name}} </label> <button @click="deleteTask(task.id)">-</button><button @click="startEditTask(task.id, task.name)">edit</button>
    </li>
  </main>
</template>

<script>
import * as api from '../service/api'
export default{
  data() {
    return {
      userId: null,
      inputText: '',
      response: '',
      tasks: null,
      editingTaskId: null,
    }
  },
  methods: {
    async createTask() {
      this.response = await api.addTask(this.userId, this.inputText) 
      this.updateList()
    },
    async deleteTask(id) {
      await api.deleteTask(this.userId, id) 
      this.updateList()
    },
    async updateList(){
      this.tasks = await api.getAllTasks(this.userId)
    },
    async startEditTask(id, text){
      this.editingTaskId = id
      this.inputText = text
    },
    async editTask(){
      this.response = await api.updateTask(this.userId, this.editingTaskId, this.inputText)
      if(this.response){
        this.editingTaskId = null
        this.inputText = null
      }
      this.updateList()
    }
  },
  computed: {
    createUser: (e) =>{
      e.userId = api.createUser
    }
  },
}
</script>