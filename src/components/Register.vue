<template>
<q-layout>
<q-page-container>
  <q-page class="bg-grey-3 row q-pa-xl flex flex-center">
    <div style="width: 444px">
        <form @submit.prevent="create">
            <q-card>
              <q-card-section>
                <div class="text-h5 q-mt-sm q-mb-xs">Agregar nuevo usuario</div>
              </q-card-section>
              <q-card-section>
                <div class="q-pa-xs">
                  <q-input outlined  v-model="user" label="Usuario/Correo"/>
                </div>
                <div class="q-pa-xs">
                  <q-input outlined  v-model="password" type="password" label="Contraseña"/>
                </div>
              </q-card-section>
              <q-separator />
              <q-card-actions vertical>
                <q-btn label="Registrar" type="submit" color="primary" icon="person_add"/>
                <q-btn label="Cancelar" to="/login" color="red" icon="keyboard_backspace"/>
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
    create () {
      firebase.auth().createUserWithEmailAndPassword(this.user, this.password)
        .then((user) => this.$router.back(), (error) => {
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
