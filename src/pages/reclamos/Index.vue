<template>
  <q-page class="bg-grey-3">
    <div class="row">
      <div class="col-auto q-pl-md q-pt-md q-pb-xs">
        <q-btn color="secondary" label="Agregar reclamo" to="/altaReclamo" icon="post_add" />
      </div>
    </div>
    <div class="row">
      <div class="col-auto col-12 q-pa-md">
        <q-table
          title="Reclamos"
          :data="reclamos"
          :columns="columns"
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
              <q-th auto-width>
                Acciones
             </q-th>
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" >
            <q-td auto-width>
              <q-btn size="md" color="primary" dense @click="props.expand = !props.expand" :icon="props.expand ? 'expand_less' : 'expand_more'" />
              <q-btn size="md" color="red" dense icon="delete" @click="showDialogDelete(props.row)" />
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
              <div class="">
                <q-card class="my-card" flat bordered>
                    <q-card-section horizontal>
                      <q-card-section class="q-pt-xs">
                        <div class="text-overline">Código del reclamo: {{props.row.id}}</div>
                        <div class="text-h5 q-mt-sm q-mb-xs">{{props.row.titulo}}</div>
                        <div class="text-caption text-grey">
                          {{props.row.descripcion}}
                        </div>
                      </q-card-section>

                      <q-card-section class="col-5 flex flex-right">
                        <img class="rounded-borders" :src=props.row.imageurl />
                      </q-card-section>
                    </q-card-section>

                    <q-separator />

                    <q-card-actions>
                      <q-btn flat round icon="location_on" />
                      <q-btn flat>
                        {{comunaDesc(props.row.comuna)}}
                      </q-btn>
                    </q-card-actions>
                  </q-card>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { Dialog } from 'quasar'

export default {
  name: 'listReclamos',
  computed: {
    ...mapGetters('reclamos', ['reclamos']),
    ...mapGetters('comunas', ['comunas'])
  },
  mounted: function () {
    this.getReclamos()
    console.log('created :' + this.getReclamos())
  },
  data () {
    return {
      confirm: false,
      showDesc: false,
      filter: null,
      selectedRow: null,
      columns: [
        { name: 'id', label: 'id', field: 'id', sortable: true, align: 'center' },
        { name: 'titulo', label: 'Titulo', field: 'titulo', sortable: true, align: 'center' },
        { name: 'descripcion', label: 'Descripción', field: 'descripcion', sortable: true, align: 'center' },
        { name: 'comuna', label: 'Comuna', field: 'comuna', align: 'center', sortable: true }
      ]
    }
  },
  methods: {
    showDialogDelete (reclamo) {
      Dialog.create({
        title: 'Eliminar reclamo',
        message: 'Esta seguro que desea eliminar reclamo?',
        cancel: {
          push: true,
          label: 'Cancelar'
        },
        ok: {
          push: true,
          color: 'negative',
          label: 'Eliminar'
        },
        persistent: true
      }).onOk(() => {
        this.deleteReclamo(reclamo.id)
      })
    },
    comunaDesc (comunaSelected) {
      return this.comunas.find(comuna => comuna.value === comunaSelected).label
    },
    ...mapActions('reclamos', ['getReclamos', 'deleteReclamo']),
    ...mapMutations('reclamos', ['setReclamos', 'setReclamoToShow'])
  }
}
</script>
