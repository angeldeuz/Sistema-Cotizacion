<template lang="pug">
#productos
  v-card
    v-card-title
      slot
      v-spacer
      v-text-field(v-model="buscar" append-icon="search" label="Buscar" single-line hide-details)
    v-card-text
      v-data-table.elevation-1(:headers="headers" :items="productos" :search="buscar" v-model="selected" item-key="idProducto" select-all no-data-text="No se han encontrado resultados" :loading="loading")
        template(v-slot:items="props")
          td
            v-checkbox(v-model="props.selected" primary hide-details)
          td.text-xs-left {{ props.item.clave }}
          td.text-xs-left
            v-text-field(label='Cantidad' hide-details type='number' min="0" v-model='props.item.cantidad' solo)
          td.text-xs-left {{ props.item.unidadMedida }}
          td.text-xs-left {{ props.item.nombre }}
          td.text-xs-left $ {{ props.item.precio }}
          td.text-xs-left {{ props.item.stock }}
          td.text-xs-left
            v-text-field(
              readonly
              hide-details
              type="number"
              :value="props.item.precioCotizacion = suma_precio_producto(props.item.cantidad, props.item.precio)"
              v-model="props.item.precioCotizacion")
      div.text-xs-right.pt-2
        v-btn(
          color="primary"
          @click="agregar_productos_cotizacion"
          :disabled="!habilitar_boton_AgregarProductos")
          | Agregar Productos Y Categoria
        div
</template>

<script>
import { mapGetters } from 'vuex';
import EventBus from '@/plugins/event-bus';
import HEADERS_PRODUCTOS from '@/headers/cotizacion/productos';

export default {
  name: 'productos',
  props: ['categoria'],
  data() {
    return {
      selected: [],
      buscar: null,
      productos: [],
      loading: false,
      headers: HEADERS_PRODUCTOS,
      suma: 0,
    };
  },
  computed: {
    ...mapGetters(['listarProductosProyecto']),
    habilitar_boton_AgregarProductos() {
      const { selected } = this;
      const valida = selected.some(({ cantidad }) => (!cantidad));
      if (selected.length > 0 && !valida) {
        return true;
      }
      return false;
    },
  },
  created() {
    const self = this;
    EventBus.$on('limpiar', () => {
      self.selected = [];
      self.productos = [];
    });
  },
  methods: {
    suma_precio_producto(cantidad, precio) {
      const precioProducto = cantidad * precio;
      if (precioProducto > 0) {
        return precioProducto.toFixed(2);
      }
      return 0;
    },
    deleteItem(producto) {
      const self = this;
      self.$store.commit('eliminarProductoProyecto', producto);
    },
    obtenerProductosPorCategoria({ idCategoria }) {
      const self = this;
      self.loading = true;
      self.$http.get(`Productos/BuscarPorCategoria/${idCategoria}`)
        .then((response) => { self.productos = response.data; })
        .catch((error) => { self.error = error.error; })
        .finally(() => { self.loading = false; });
    },
    agregar_productos_cotizacion() {
      // ÉSTA FUNCION AGREGA LOS PRODUCTOS Y CATEGORIAS AL LISTADO DEL SERVICIO
      const self = this;
      self.$emit('agregar_productos_cotizacion', self.selected);
    },
  },
  watch: {
    categoria(categoria) {
      const self = this;
      if (categoria) { self.obtenerProductosPorCategoria(categoria); }
    },
  },
};
</script>

<style lang="scss" scoped>
.totales {
  border: 1px solid #000;
}
</style>
