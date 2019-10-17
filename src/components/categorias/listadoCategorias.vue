<template lang="pug">
#ListadoCategorias
  modal-categorias(:mostrarModalCategorias='mostrarModalCategorias' :evento='evento' @obtener_categorias='obtener_categorias' @mostrarModal='mostrarModal')
  v-card
    v-card-title
      v-btn(color='primary mt-3' dark @click='agregar_categoria')
        | Agregar Categoria
      v-spacer
      v-text-field(v-model='buscar' append-icon='search' label='Buscar' single-line hide-details)
    v-card-text
      v-data-table.elevation-2.mt-2(:headers='headers' :items='categorias' :loading='loading' :search='buscar' no-results-text='No se encontraron resultados' no-data-text='No se encontraron resultados')
        template(v-slot:items='props')
          td.text-left {{props.item.idCategoria}}
          td.text-left {{props.item.nombre}}
          td.text-left {{props.item.servicio}}
          td.text-center
            v-icon(small @click='editar_categoria(props.item)') edit
</template>

<script>
import ModalCategorias from '@/components/categorias/modalCategorias.vue';
import HEADERS_CATEGORIAS from '@/headers/categorias';

export default {
  name: 'ListadoCategorias',
  components: { ModalCategorias },
  data: () => ({
    mostrarModalCategorias: false,
    evento: 0,
    buscar: '',
    categoria: {},
    categorias: [],
    loading: false,
    dialog: false,
    headers: HEADERS_CATEGORIAS,
  }),
  beforeMount() { this.obtener_categorias(); },
  methods: {
    mostrarModal(valor) { this.mostrarModalCategorias = valor; },
    obtener_categorias() {
      const self = this;
      self.loading = true;
      self.$http.get('Categorias/Listar')
        .then((response) => { self.categorias = response.data; })
        .catch((error) => { self.error = error.error; })
        .finally(() => { self.loading = false; });
    },
    editar_categoria(categoria) {
      const self = this;
      self.mostrarModalCategorias = !self.mostrarModalCategorias;
      self.evento = 2;
      self.$store.commit('set_categoria_new', categoria);
    },
    agregar_categoria() {
      const self = this;
      self.mostrarModalCategorias = !self.mostrarModalCategorias;
      self.evento = 1;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
