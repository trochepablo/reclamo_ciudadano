/* eslint-disable no-unused-vars */
<template>
  <q-page class="bg-grey-3 row flex flex-center">
    <div class="bg-white col-auto q-pa-xl" style="border: 4px solid #ccc;">
      <h4><u>Información del reclamo</u></h4>
      <q-form ref="formReclamo" @submit="onSubmit"
        class="q-gutter-md col-auto">
          <q-input
            filled
            v-model="reclamo.titulo"
            label="Titulo *"
            hint="Titulo del reclamo"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor ingrese titulo']"/>

          <q-input
            filled
            v-model="reclamo.descripcion"
            label="Descripción *"
            hint="Por favor ingrese descripción"
            type="textarea"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Por favor ingrese descripción']"/>

          <q-select
          option-value="value"
          option-label="label"
          emit-value
          map-options
          outlined
          stack-label
          v-model="reclamo.comuna"
          :options="comunas" label="Comuna"
          :rules="[ val => !!val || 'Por favor ingrese comuna']"/>

          <q-file required  v-model="selectedFile" @input="uploadImage(selectedFile)"  filled label="Restringido para imagenes" accept=".jpg, .png, image/*">
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>

          <div class="flex flex-center q-pt-xl">
            <q-btn label="Agregar" type="submit" color="primary" icon="save"/>
            <q-btn label="Cancelar" to="/" color="red"  icon="cancel" class="q-ml-sm" />
          </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Reclamo from 'src/entity/reclamo'
const initReclamo = new Reclamo()

export default {
  name: 'altaReclamo',
  computed: {
    ...mapGetters('comunas', ['comunas']),
    showLoading () {
      return this.$store.state.isLoading
    }
  },
  data () {
    return {
      selectedFile: null,
      reclamo: Object.assign({}, initReclamo)
    }
  },
  methods: {
    ...mapActions('reclamos', ['getReclamos', 'saveReclamo', 'uploadImage']),
    ...mapMutations('reclamos', ['updateReclamo', 'setimageName']),
    onSubmit () {
      this.$refs.formReclamo.validate().then(success => {
        if (success) {
          this.saveReclamo()
          this.getReclamos()
          this.selectedFile = null
          this.reclamo = Object.assign({}, initReclamo)
          this.$refs.formReclamo.resetValidation()
        }
      })
    }
  },
  watch: {
    reclamo: {
      handler (newReclamo) {
        this.updateReclamo(newReclamo)
      },
      deep: true
    }
  }
}
</script>
