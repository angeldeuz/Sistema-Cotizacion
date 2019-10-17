<template lang="pug">
#GenerarOCP
 h1 GENERAR ORDEN DE COMPRA
 v-layout.mt-3(row wrap)
  v-flex(xs12)
   tipo-orden-compra
  v-flex.mt-3(xs5)
   v-card
    v-container(fluid)
     combo-box-cotizaciones(v-if="OrdenCompraProveedor.tipo === 'cotizacion'")
     listado-productos
  v-flex(xs2)
   actions
  v-flex.mt-3(xs5)
   v-card
    v-container(fluid)
     combo-box-proveedores
     listado-productos-seleccionados
     hr
     v-btn.mt-4(large dark color="primary" @click="mostrarVistaPrevia = !mostrarVistaPrevia") Generar Orden Compra
     modal-vista-previa(:mostrarVistaPrevia="mostrarVistaPrevia")
</template>

<script>
import { mapState } from 'vuex';
import TipoOrdenCompra from '@/components/ordenesCompraProveedores/tipoOrdenCompra.vue';
import ListadoProductos from '@/components/ordenesCompraProveedores/listadoProductos.vue';
import ListadoProductosSeleccionados from '@/components/ordenesCompraProveedores/listadoProductosSeleccionados.vue';
import ComboBoxCotizaciones from '@/components/ordenesCompraProveedores/comboBoxCotizaciones.vue';
import ComboBoxProveedores from '@/components/ordenesCompraProveedores/comboBoxProveedores.vue';
import Actions from '@/components/ordenesCompraProveedores/actions.vue';
import ModalVistaPrevia from '@/components/ordenesCompraProveedores/modalVistaPrevia.vue';
import EventBus from '@/plugins/event-bus';

export default {
  name: 'GenerarOCP',
  components: {
    TipoOrdenCompra,
    ListadoProductos,
    ListadoProductosSeleccionados,
    ComboBoxCotizaciones,
    ComboBoxProveedores,
    Actions,
    ModalVistaPrevia,
  },
  data: () => ({ idCotizacion: 0, mostrarVistaPrevia: false }),
  computed: { ...mapState(['OrdenCompraProveedor']) },
  created() {
    const self = this;
    EventBus.$on('cancelar_orden_compra', () => { self.mostrarVistaPrevia = false; });
  },
};
</script>

<style lang="scss" scoped>
</style>
