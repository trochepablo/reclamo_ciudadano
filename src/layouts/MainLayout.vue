<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          Reclamo Ciudadano
        </q-toolbar-title>

        <div>{{ todaysDate }}</div>
      </q-toolbar>
    </q-header>
    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="200"
        :breakpoint="500"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item clickable v-ripple to="/">
              <q-item-section avatar>
                <q-icon name="view_list" />
              </q-item-section>
              <q-item-section>
                Ver reclamos
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/altaReclamo">
              <q-item-section avatar>
                <q-icon name="post_add" />
              </q-item-section>

              <q-item-section>
                Realizar reclamo
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/comunas">
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
                Comunas
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

    <q-page-container>
      <breadcrumbs />
      <!-- <keep-alive> -->
        <router-view />
      <!-- </keep-alive> -->
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from 'quasar'
import Breadcrumbs from '../components/Breadcrumbs'

export default {
  name: 'MainLayout',

  components: {
    Breadcrumbs
  },
  computed: {
    todaysDate () {
      return date.formatDate(Date.now(), 'DD/MM/YYYY HH:mm')
    }
  },
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
