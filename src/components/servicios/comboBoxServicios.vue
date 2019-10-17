<template lang="pug">
div
 v-select(
   v-model="servicio"
   :items="servicios"
   label="Selecciona un servicio"
   item-text="nombre"
   chips
   item-value="idServicio"
   :loading="loading")
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'comboBoxServicios',
  data: () => ({
    loading: true,
    servicios: [],
  }),
  beforeMount() {
    this.obtener_categorias();
  },
  methods: {
    obtener_categorias() {
      const self = this;
      self.$http.get('Servicios/Listar')
        .then(({ data, status }) => {
          if (status === 200) {
            self.servicios = data;
            self.loading = false;
          }
        })
        .catch((error) => { console.error(error); });
    },
  },
  computed: {
    ...mapState(['Categoria']),
    servicio: {
      get() { return this.Categoria.idServicio; },
      set(idServicio) { this.$store.commit('set_categoria_new', { idServicio }); },
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
