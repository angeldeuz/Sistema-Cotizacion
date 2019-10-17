<template lang="pug">
#ListadoProductos
  modal-productos(:mostrarModalProductos='mostrarModalProductos' :evento='evento' @obtener_productos='obtener_productos' @mostrarModal='mostrarModal')
  v-card
    v-card-title
      v-btn(color='primary mt-3' dark @click='agregar_producto')
        | Agregar Producto
      v-spacer
      v-text-field(v-model='buscar' append-icon='search' label='Buscar' single-line hide-details)
    v-card-text
      v-data-table.elevation-2.mt-2(:headers='headers' :items='productos' :loading='loading' :search='buscar' no-results-text='No se encontraron resultados' no-data-text='No se encontraron resultados')
        template(v-slot:items='props')
          td.text-left {{props.item.clave}}
          td.text-left {{props.item.nombre}}
          td.text-left {{props.item.unidadMedida}}
          td.text-left(width='20%') {{props.item.categoria}}
          td.text-left {{props.item.stock}}
          td.text-center $ {{props.item.manoObra}}
          td.text-center $ {{props.item.precioProducto}}
          td.text-center $ {{props.item.precio}}
          td.text-center
            v-icon(small='' @click='editar_producto(props.item)') edit
</template>

<script>
import ModalProductos from '@/components/productos/modalProductos.vue';
import HEADERS_PRODUCTOS from '@/headers/productos';

export default {
  name: 'ListadoProductos',
  components: { ModalProductos },
  data: () => ({
    mostrarModalProductos: false,
    categorias: [],
    productos: [],
    evento: 1,
    loading: false,
    buscar: '',
    dialog: false,
    headers: HEADERS_PRODUCTOS,
  }),
  beforeMount() { this.obtener_productos(); },
  methods: {
    mostrarModal(valor) { this.mostrarModalProductos = valor; },
    obtener_productos() {
      const self = this;
      self.loading = true;
      self.$http.get('Productos/Listar')
        .then((response) => { self.productos = response.data; })
        .catch((error) => { self.error = error; })
        .finally(() => { self.loading = false; });
    },
    editar_producto(producto) {
      const self = this;
      self.mostrarModalProductos = !self.mostrarModalProductos;
      self.evento = 2;
      self.$store.commit('set_producto', producto);
    },
    agregar_producto() {
      const self = this;
      self.mostrarModalProductos = !self.mostrarModalProductos;
      self.evento = 1;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
