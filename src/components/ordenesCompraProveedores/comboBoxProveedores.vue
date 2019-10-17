<template lang="pug">
#ComboBoxProveedores
 v-select(
   :items="proveedores"
   v-model="proveedor"
   return-object
   chips
   item-text="razonSocial"
   item-value="razonSocial"
   label="Selecciona un Proveedor")
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ComboBoxProveedores',
  data: () => ({
    loading: true,
    proveedores: [],
  }),
   beforeMount() {
    this.$http.get('Proveedores/Listar')
      .then(({ status, data }) => {
        if (status === 200) {
          this.proveedores = data;
          this.loading = false;
        }
      }).catch(error => console.error(error));
  },
  methods: {
    text: item => `${item.idProveedor} - ${item.razonSocial}`,
  },
  computed: {
    ...mapState(['OrdenCompraProveedor']),
    proveedor: {
      get() { return this.OrdenCompraProveedor.proveedor; },
      set(proveedor) {
        this.$store.commit('set_orden_compra_proveedor', { proveedor });
      },
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
