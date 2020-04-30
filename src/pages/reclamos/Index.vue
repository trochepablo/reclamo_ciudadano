<template>
  <q-page class="bg-grey-3">
    <div class="row">
      <div class="col-auto q-pl-md q-pt-md q-pb-xs">
        <q-btn color="secondary" label="Agregar reclamo" to="/altaReclamo" />
      </div>
    </div>
    <div class="row">
      <div class="col-auto col-12 q-pl-md q-pb-md q-pr-md q-pt-xs">
        <q-table
          title="Reclamos"
          :data="reclamos"
          :columns="columns"
          row-key="titulo"
          flat
          :filter="filter"
          bordered
          no-data-label="No hay reclamos disponibles">
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter"  filled type="search" label="Busqueda">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
            </q-td>
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="q-pa-md row items-start q-gutter-md">
                <q-card class="my-card" flat bordered>
                  <q-card-section horizontal>
                    <q-card-section class="col-auto" >
                      <div class="text-overline">Información de reclamo</div>
                      <div class="text-h5 q-mt-sm q-mb-xs">{{props.row.titulo}}</div>
                      <div class="text-caption text-grey">
                        {{props.row.descripcion}}
                      </div>
                      <!-- <div class="q-pa-md q-gutter-sm">
                        <q-btn color="primary" icon="mail" label="Ver descripción del reclamo" @click="showPageText(props.row)" />
                      </div> -->
                    </q-card-section>

                    <q-card-section class="col-auto flex flex-right">
                      <img
                        class="rounded-borders"
                        :src=props.row.imageurl
                      />
                    </q-card-section>
                  </q-card-section>

                  <q-separator />

                  <q-card-actions>
                    <q-btn flat round icon="location_on" />
                    <div class="text-h5"> Comuna N° {{props.row.comuna}} </div>
                  </q-card-actions>
                </q-card>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      </div>
    </div>
    <!-- <div>
      <pageText v-show="showDesc">
      </pageText>
    </div> -->
  </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
// import pageText from 'src/components/pageText'

export default {
  // components: {
  //   pageText
  // },
  name: 'listReclamos',
  computed: {
    ...mapGetters('reclamos', ['reclamos'])
  },
  created: function () {
    this.getReclamos()
  },
  data () {
    return {
      showDesc: false,
      filter: null,
      columns: [
        { name: 'titulo', label: 'Titulo', field: 'titulo', sortable: true, align: 'center' },
        { name: 'descripcion', label: 'Descripción', field: 'descripcion', sortable: true, align: 'center' },
        { name: 'comuna', label: 'Comuna', field: 'comuna', align: 'center', sortable: true }
      ]
    }
  },
  methods: {
    showPageText (reclamo) {
      debugger
      this.setReclamoToShow(reclamo)
      this.showDesc = !this.showDesc
    },
    ...mapActions('reclamos', ['getReclamos']),
    ...mapMutations('reclamos', ['setReclamos', 'setReclamoToShow'])
  }
}
</script>
