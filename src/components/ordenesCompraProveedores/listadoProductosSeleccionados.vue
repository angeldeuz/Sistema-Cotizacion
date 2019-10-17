<template lang="pug">
#ListadoProductosSeleccionados
 v-list.scroll-y(two-line subheader style="max-height: 380px;height: 380px;")
  v-subheader Productos Seleccionados
  v-list-tile(v-for="producto in OrdenCompraProveedor.productosSeleccionados" :key="producto.clave")
   v-list-tile-action
    v-checkbox(v-model="productosSeleccionados" :value="producto")
   v-list-tile-content
    v-list-tile-title
     | {{ producto.clave }}
    v-list-tile-sub-title
     p
      | Cantidad: {{ producto.cantidadOrdenCompra }}
</template>

<script>
import { mapState } from 'vuex';
import EventBus from '@/plugins/event-bus';

export default {
  name: 'ListadoProductosSeleccionados',
  data: () => ({ productosSeleccionados: [] }),
  computed: { ...mapState(['OrdenCompraProveedor']) },
  created() {
    const self = this;
    EventBus.$on('descartar_productos_oc', () => {
      self.$store.commit(
        'unset_productosSeleccionados_ordenCompra_proveedor',
        self.productosSeleccionados,
      );
      EventBus.$emit('reingresar_productos', self.productosSeleccionados);
      self.productosSeleccionados = [];
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
