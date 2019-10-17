<template lang="pug">
#TipoOrdenCompra
 v-card
  v-container(fluid)
   h3 ¿De que tipo es tu Orden de Compra?
   v-radio-group(v-model="tipo" row :mandotary="true")
    v-radio(label="Ingreso material de una cotización" value="cotizacion")
    v-radio(label="Ingreso material en general" value="general")
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TipoOrdenCompra',
  data: () => ({}),
  computed: {
    ...mapState(['OrdenCompraProveedor']),
    tipo: {
      get() { return this.OrdenCompraProveedor.tipo; },
      set(tipo) { this.$store.commit('set_orden_compra_proveedor', { tipo }); },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
