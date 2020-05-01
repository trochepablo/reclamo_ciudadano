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
      icon: 'announcement',
      position: 'bottom'
    })
  } finally {
    Loading.hide()
  }
}

export async function saveReclamo ({ dispatch, state, commit }) {
  try {
    Loading.show({
      message: 'Creando reclamo.<br/><span class="text-secondary">Por favor espere...</span>'
    })
    const reclamo = Object.assign({}, state.reclamo)
    await db.collection('reclamos').add(reclamo).then(function (value) {
      reclamo.id = value.id
    }).catch(function (err) {
      Notify.create({
        message: `No se puedieron guardar el reclamos. Error: ${err}`,
        color: 'negative',
        icon: 'announcement',
        position: 'bottom',
        timeout: 5000
      })
    })
    db.collection('reclamos').doc(reclamo.id).update(reclamo)
    Notify.create({
      message: 'Su reclamo ha sido creado con éxito. ',
      color: 'positive',
      icon: 'announcement',
      position: 'bottom',
      timeout: 5000
    })
    this.$router.back()
  } catch (error) {
    console.log(error)
    Notify.create({
      message: 'No se puedo guardar el reclamo. ',
      color: 'negative',
      icon: 'announcement',
      position: 'bottom',
      timeout: 5000
    })
  } finally {
    Loading.hide()
    dispatch('getReclamos')
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
      message: 'No se pudo subir imagen, reintente. ',
      color: 'negative',
      position: 'bottom',
      icon: 'announcement',
      timeout: 5000
    })
  } finally {
    Loading.hide()
  }
}

export async function deleteReclamo ({ dispatch, commit }, id) {
  try {
    Loading.show({
      message: 'Creando reclamo.<br/><span class="text-secondary">Por favor espere...</span>'
    })
    await db.collection('reclamos').doc(id).delete().then(function () {
      Notify.create({
        message: 'Su reclamo ha sido eliminado. ',
        color: 'blue',
        position: 'bottom',
        icon: 'announcement',
        timeout: 5000
      })
    })
  } catch (error) {
    console.log(error)
    Notify.create({
      message: 'No se pudo guardar el reclamo. ',
      color: 'negative',
      icon: 'announcement',
      position: 'bottom',
      timeout: 5000
    })
  } finally {
    Loading.hide()
    dispatch('getReclamos')
  }
}
