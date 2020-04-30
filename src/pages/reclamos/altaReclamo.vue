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

            <!-- <q-editor
              v-model="reclamo.descripcion"
              :definitions="{ bold: {label: 'Bold', icon: null, tip: 'My bold tooltip' }}"
              @paste.native="evt => pasteCapture(evt)"
              @drop.native="evt => dropCapture(evt)"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Por favor ingrese titulo']"/> -->

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

          <q-file required  v-model="selectedFile" @input="uploadImage(selectedFile)"  filled label="Seleccione una imagen" accept=".jpg, .png, image/*">
            <template v-slot:prepend>
              <q-icon name="image" />
            </template>
          </q-file>

          <div>
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
import { Notify } from 'quasar'
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
        if (success && this.selectedFile) {
          this.saveReclamo()
          this.getReclamos()
          this.selectedFile = null
          this.reclamo = Object.assign({}, initReclamo)
          this.$refs.formReclamo.resetValidation()
        } else {
          if (!this.selectedFile) {
            Notify.create({
              message: 'Debe seleccionar una imagen.',
              color: 'negative',
              position: 'bottom'
            })
          }
        }
      })
    }
  },
  watch: {
    reclamo: {
      handler (newReclamo) {
        debugger
        this.updateReclamo(newReclamo)
      },
      deep: true
    }
  }
}
</script>
