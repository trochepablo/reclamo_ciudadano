<template>
<q-layout>
<q-page-container>
  <q-page class="bg-grey-3 row q-pa-xl flex flex-center">
    <div style="width: 444px">
        <form @submit.prevent="login">
            <q-card>
              <q-card-section>
                <q-card-section>
                  <div class="text-h5 q-mt-sm q-mb-xs">Ingreso de usuario</div>
                </q-card-section>
                <div class="flex flex-center">
                  <q-avatar size="200px">
                    <img src="statics/avatar_circle_blue.png">
                  </q-avatar>
                </div>
                <div class="q-pa-xs">
                  <q-input outlined  v-model="user" label="Usuario/Correo"/>
                </div>
                <div class="q-pa-xs">
                  <q-input outlined  v-model="password" type="password" label="Contraseña"/>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-actions vertical>
                <q-btn label="Acceder" type="submit" color="primary" icon="input"/>
                <q-btn label="Registrar" to="/register" type="button" color="positive" icon="person_add"/>
              </q-card-actions>
            </q-card>
        </form>
    </div>
      </q-page>
</q-page-container>
</q-layout>
</template>

<script>
import firebase from 'firebase'
import { Notify } from 'quasar'

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
        .then((user) => Notify.create({
          message: `Bienvenido! ${user.user.email}`,
          color: 'info',
          position: 'bottom'
        }), (error) => {
          Notify.create({
            message: error.message,
            color: 'negative',
            position: 'bottom'
          })
        })
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
