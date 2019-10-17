<template lang="pug">
#ComboBoxCotizaciones
 v-select(
   v-model="cotizacion"
   chips
   :items="cotizaciones"
   :loading="loading"
   :item-text="text"
   item-value="idCotizacion"
   return-object
   label="Selecciona una Cotización")
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ComboBoxCotizaciones',
  data: () => ({
    cotizaciones: [],
    loading: true,
  }),
  beforeMount() {
    this.$http.get('Cotizaciones/Listado')
      .then(({ status, data }) => {
        if (status === 200) {
          this.cotizaciones = data;
          this.loading = false;
        }
      }).catch(error => console.error(error));
  },
  methods: {
    text: item => `${item.idCotizacion} - ${item.nombre}`,
  },
  computed: {
    ...mapState(['OrdenCompraProveedor']),
    cotizacion: {
      get() { return this.OrdenCompraProveedor.cotizacion; },
      set(cotizacion) {
        this.$store.commit('set_orden_compra_proveedor', { cotizacion });
      },
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
