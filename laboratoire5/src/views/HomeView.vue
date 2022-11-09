<template>
  <main>
    <div v-if="!userId">
      <button @click="createUser">Créer mon compte !</button>
    </div>
    <div v-if="userId">
      <h3>Bonjour utilisateur {{ userId }}</h3>

      <h2 v-if="editingTaskId">Edition de la tâche</h2>
      <h2 v-else>Création d'une tâche</h2>

      <label>Le nom de la tâche (Obligatoire)</label>

      <input type="text" v-model="inputText" placeholder="edit me" />
      <p v-if="inputError" style="color: red">
        Erreur: veulliez rentrer au moins un caractere (autre que espace)
      </p>
      <button v-if="editingTaskId" @click="editTask">Changer la tâche</button>
      <button v-else @click="createTask">Créer la tâche</button>
    </div>
    <ul>
      <li v-for="(task, index) in tasks" v-bind:key="index">
        <label for="taskDone">{{ index + 1 }} : {{ task.name }}</label>
        <button
          name="taskDone"
          @click="deleteTask(task.id)"
          :disabled="isDoneBtnDisable"
        >
          Done
        </button>
        <button
          @click="startEditTask(task.id, task.name)"
          :disabled="isUpdateBtnDisable"
        >
          edit
        </button>
      </li>
    </ul>
  </main>
</template>

<script>
import * as api from '../service/api'
export default {
  data() {
    return {
      userId: null,
      inputText: '',
      message: '',
      tasks: null,
      editingTaskId: null,
      blockActions: false,
      inputError: false,
    }
  },
  methods: {
    async createTask() {
      if (this.isInputValid(this.inputText)) {
        const res = await api.addTask(this.userId, this.inputText)
        if (res) {
          this.updateList()
        }
        this.inputText = null
      }
    },
    async deleteTask(id) {
      this.blockActions = true
      const res = await api.deleteTask(this.userId, id)
      if (res) {
        this.updateList()
      }
    },
    async updateList() {
      this.tasks = await api.getAllTasks(this.userId)
      this.blockActions = false
    },
    async startEditTask(id, text) {
      this.editingTaskId = id
      this.inputText = text
    },
    async editTask() {
      if (this.isInputValid(this.inputText)) {
        let res = await api.updateTask(
          this.userId,
          this.editingTaskId,
          this.inputText
        )
        if (res) {
          this.message = res
          this.editingTaskId = null
          this.inputText = null
        }
        this.updateList()
      }
    },
    isInputValid(input) {
      if (!input.replace(/\s/g, '').length) {
        this.inputError = true
        return false
      } else {
        this.inputError = false
        return true
      }
    },
  },
  computed: {
    createUser: (e) => {
      e.userId = api.createUser
    },
    isUpdateBtnDisable() {
      return this.editingTaskId || this.blockActions ? true : false
    },
    isDoneBtnDisable() {
      return this.editingTaskId || this.blockActions ? true : false
    },
  },
}
</script>
