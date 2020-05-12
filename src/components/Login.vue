<template>
    <div>
        <form @submit.prevent="login">
            <input v-model="user" type="text" placeholder="Usuario">
            <input v-model="password" type="password" placeholder="Contraseña">
            <input type="submit" value="Acceder">
        </form>
        <pre>
            {{ $data }}
        </pre>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      user: '',
      password: ''
    }
  },
  methods: {
    login () {
      firebase.auth().signInWithEmailAndPassword(this.user, this.password)
        .then((user) => alert('usuario conectado'), (error) => console.error(error))
        .catch(function (error) {
        // Handle Errors here.
        // eslint-disable-next-line no-unused-vars
          var errorCode = error.code
          // eslint-disable-next-line no-unused-vars
          var errorMessage = error.message
        // ...
        })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
