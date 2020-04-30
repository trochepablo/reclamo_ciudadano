/* eslint-disable spaced-comment */

import { db, st } from 'boot/firebase'
import { Notify, Loading } from 'quasar'

export async function getReclamos ({ commit }) {
  try {
    Loading.show({
      message: 'Cargando datos.<br/><span class="text-secondary">Por favor espere...</span>'
    })
    const response = await db.collection('reclamos').get()
    const list = []
    response.forEach(res => {
      list.push({ ...res.data() })
    })
    commit('setReclamos', list)
  } catch (error) {
    console.log(error)
    Notify.create({
      message: 'No se puedieron recuperar los reclamos',
      color: 'negative',
      position: 'bottom'
    })
  } finally {
    Loading.hide()
  }
}

export async function saveReclamo ({ state, commit }) {
  try {
    Loading.show({
      message: 'Creando reclamo.<br/><span class="text-secondary">Por favor espere...</span>'
    })
    const reclamo = state.reclamo
    await db.collection('reclamos').add(reclamo)
    Notify.create({
      message: 'Su reclamo ha sido creado con éxito. ',
      color: 'positive',
      position: 'bottom',
      timeout: 5000
    })
    this.$router.back()
  } catch (error) {
    console.log(error)
    Notify.create({
      message: 'No se puedieron guardar el reclamos. ',
      color: 'negative',
      position: 'bottom',
      timeout: 5000
    })
  } finally {
    Loading.hide()
  }
}

export async function uploadImage ({ commit }, fileSelected) {
  try {
    Loading.show({
      message: 'Subiendo imagen.<br/><span class="text-secondary">Por favor espere...</span>'
    })
    const nameUpload = fileSelected.name + Date.now()
    const result = await st.ref('/reclamos').child(nameUpload).put(fileSelected)
    result.ref.getDownloadURL().then((url) => {
      commit('setImageName', { fullPath: result.metadata.fullPath, imageUrl: url })
    })
  } catch (error) {
    console.log(error)
    commit('setImageName', { fullPath: null })
    Notify.create({
      message: 'No se puedieron subir imagen, reintente. ',
      color: 'negative',
      position: 'bottom',
      timeout: 5000
    })
  } finally {
    Loading.hide()
  }
}
