<template lang="pug">
#ListadoServicios
  modal-servicios(:mostrarModalServicios='mostrarModalServicios' :evento='evento' @obtener_servicios='obtener_servicios' @mostrarModal='mostrarModal')
  v-card
    v-card-title
      v-btn(color='primary mt-3' dark @click='agregar_servicio')
        | Agregar Servicio
      v-spacer
      v-text-field(v-model='buscar' append-icon='search' label='Buscar' single-line hide-details)
    v-card-text
      v-data-table.elevation-2.mt-2(:headers='headers' :items='servicios' :loading='loading' :search='buscar' no-results-text='No se encontraron resultados' no-data-text='No se encontraron resultados')
        template(v-slot:items='props')
          td.text-left {{props.item.idServicio}}
          td.text-left {{props.item.nombre}}
          td.text-center
            v-icon(small='' @click='editar_servicio(props.item)') edit
</template>

<script>
import ModalServicios from '@/components/servicios/modalServicios.vue';
import HEADERS_SERVICIOS from '@/headers/servicios';

export default {
  name: 'ListadoServicios',
  components: { ModalServicios },
  data: () => ({
    mostrarModalServicios: false,
    evento: 0,
    buscar: '',
    servicio: {},
    servicios: [],
    loading: false,
    dialog: false,
    headers: HEADERS_SERVICIOS,
  }),
  beforeMount() { this.obtener_servicios(); },
  methods: {
    mostrarModal(valor) { this.mostrarModalServicios = valor; },
    obtener_servicios() {
      const self = this;
      self.loading = true;
      self.$http.get('Servicios/Listar')
        .then(({ data }) => { self.servicios = data; })
        .catch((error) => { self.error = error.error; })
        .finally(() => { self.loading = false; });
    },
    editar_servicio(servicio) {
      const self = this;
      self.mostrarModalServicios = !self.mostrarModalServicios;
      self.evento = 2;
      self.$store.commit('set_servicio_new', servicio);
    },
    agregar_servicio() {
      const self = this;
      self.mostrarModalServicios = !self.mostrarModalServicios;
      self.evento = 1;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
