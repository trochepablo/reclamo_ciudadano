<template>
  <q-page class="bg-grey-3 q-pa-md col-auto">
      <div class="col-auto q-pl-md q-pb-md q-pr-md q-pt-xs">
        <q-table
          title="Listado de comunas de la Ciudad Autónoma de Buenos Aires"
          :data="comunas"
          :columns="columns"
          row-key="value"
          flat
          bordered
          no-data-label="No hay comunas disponibles"/>
      </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  computed: {
    ...mapGetters('comunas', ['comunas'])
  },
  data () {
    return {
      pagination: {
        sortBy: 'desc',
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 3
      },
      columns: [
        { name: 'value', label: 'Número comuna', field: 'value', sortable: true, align: 'center' },
        { name: 'label', label: 'Barrio que la integran', field: 'label', sortable: true, align: 'center' }
      ]
    }
  }
}
</script>
