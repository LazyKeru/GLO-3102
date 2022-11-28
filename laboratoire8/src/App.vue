<template>
  <div v-if="loggedIn">
    <h1>Hello {{ user.username }} !</h1>
    <p>You're username : {{ user.username }}</p>
    <p>
      You're password : {{ user.password }} (It is stored very securely in a
      high tech backend server i promise)
    </p>
    <p>You're api key : {{ user.apiKey }}</p>
    <button @click="disconnect">Disconnect</button>
  </div>
  <div v-else>
    <input type="text" v-model="usernameInput" />
    <input type="password" v-model="passwordInput" />
    <button @click="loginCallback">Login</button>
    <button @click="createUserCallback">Create account</button>
    <p v-if="inputError" style="color: red">
      Erreur: veulliez rentrer au moins un caractere (autre que espace)
    </p>
  </div>
</template>
<script>
import Cookies from 'js-cookie'

export default {
  name: 'App',
  data() {
    return {
      loggedIn: false,
      user: {
        username: null,
        password: null,
        apiKey: null,
      },
      apiUrl: 'http://localhost:8000',
      inputError: false,
      usernameInput: '',
      passwordInput: '',
    }
  },
  methods: {
    disconnect() {
      this.loggedIn = false
      this.user = {
        username: null,
        password: null,
        apiKey: null,
      }
      Cookies.remove('apiKey')
    },
    async loginCallback() {
      if (
        this.isInputValid(this.usernameInput) &&
        this.isInputValid(this.passwordInput)
      ) {
        this.login(this.usernameInput, this.passwordInput)
        this.usernameInput = ''
        this.passwordInput = ''
      }
    },
    async createUserCallback() {
      if (
        this.isInputValid(this.usernameInput) &&
        this.isInputValid(this.passwordInput)
      ) {
        this.createUser(this.usernameInput, this.passwordInput)
        this.usernameInput = ''
        this.passwordInput = ''
      }
    },
    async init() {
      const apiKey = Cookies.get('apiKey')
      console.log(apiKey)
      if (apiKey) {
        await this.fetchUser(apiKey)
        if(this.user.username) {
          this.loggedIn = true
        }
      }
    },
    async fetchUser(apiKey) {
      const res = await fetch(this.apiUrl + '/users/' + apiKey, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => this.validateResponse(response))

      const data = await res?.json()
      if (data) {
        this.user = data
      }
    },
    async login(username, password) {
      const res = await fetch(this.apiUrl + '/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((response) => this.validateResponse(response))

      const data = await res?.json()
      if(data) {
        this.user.apiKey = data.apiKey
        this.fetchUser(data.apiKey)
        Cookies.set('apiKey', data.apiKey)
        this.loggedIn = true
      }
    },
    async createUser(username, password) {
      const res = fetch(this.apiUrl + '/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
      }).then((response) =>
        response.ok
          ? alert('User has been succesfuly created')
          : alert(response.statusText)
      )
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
    validateResponse(res) {
      if (res.ok) {
        return res
      } else {
        alert(res.status + ' : ' + res.statusText)
      }
    },
  },
  async beforeMount() {
    await this.init()
  },
}
</script>
