/* eslint-disable spaced-comment */
<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lFf" container style="height: 400px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-toolbar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          <q-toolbar-title>
            <strong>Quasar</strong> Framework
          </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page padding>
          <p>
            {{reclamo.descripcion}}
          </p>
          <!-- place QPageScroller at end of page -->
          <q-page-scroller expand position="top" :scroll-offset="150" :offset="[0, 0]">
            <div class="col cursor-pointer q-pa-sm bg-accent text-white text-center">
              Scroll back up...
            </div>
          </q-page-scroller>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import Reclamo from 'src/entity/reclamo'
// const initReclamo = new Reclamo()

export default {
  name: 'pageText',
  computed: {
    ...mapGetters('reclamos', ['getReclamoActual'])
  },
  data () {
    return {
      // eslint-disable-next-line spaced-comment
      // Object.assign(initReclamo)
    }
  }
}
</script>
