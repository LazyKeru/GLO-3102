<template>
  <div></div>
</template>
<script>
import Cookies from 'js-cookie'

export default {
  data: {
    loggedIn: false,
    user: {
      username: null,
      password: null,
      apiKey: null
    }
  },
  
  methods: {
    init(){
      const apiKey = Cookies.get("apiKey")
      if(apiKey) {
        this.user = fetchUser()


        
      }
    }
    
  },  

  beforeMount() {
    init()
  } ,
}

</script>
