<template lang="pug">
div
 h1 ¿Deseas agregar un descuento?
 v-container
  v-layout(row="" wrap="")
   v-flex(xs4="")
    v-text-field(outline="" min="1" v-model="descuento" type="number" label="Ingrese un porcentaje de Descuento")
   v-spacer
   v-flex(xs6="")
    v-card.totales
     v-list(dense="")
      v-list-tile
       v-list-tile-content.font-weight-bold Total:
       v-list-tile-content.align-end.font-weight-bold
        | {{ precio_servicio }}
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'descuento',
  data: () => ({
    value: 0.00,
  }),
  computed: {
    ...mapState(['proyecto']),
    descuento: {
      get() { return this.proyecto.descuento; },
      set(descuento) { this.$store.commit('set_descuento_cotizacion', descuento); },
    },
    precio_servicio() {
      const self = this;
      const subtotal = self.proyecto.servicios.reduce((suma, valor) => (parseFloat(suma) + parseFloat(valor.totalServicio)), 0);
      const totalPorcentaje = (parseFloat(self.descuento) / 100) * (parseFloat(subtotal));
      const total = parseFloat(subtotal) - parseFloat(totalPorcentaje);
      return total.toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
