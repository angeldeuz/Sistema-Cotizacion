<template lang="pug">
#Cliente
 h3 Cliente
 template
  v-layout(row wrap align-center)
   v-flex(xs6)
    v-autocomplete(
      v-model="cliente"
      :items="clientes"
      item-text="nombre"
      item-value="idCliente"
      chips
      :error="error"
      :error-messages="mensajeError"
      label="Selecciona un cliente"
      @change="set_cliente"
      :loading="selectLoading"
      return-object
      no-data-text="No se encontraron resultados")
</template>

<script>
export default {
  name: 'cliente',
  data: () => ({
    selectLoading: true,
    clientes: [],
    cliente: {},
    error: false,
    mensajeError: '',
  }),
  beforeMount() {
    const self = this;
    self.obtener_clientes();
  },
  methods: {
    obtener_clientes() {
      const self = this;
      self.$http.get('/Clientes/Listar/')
        .then(({ status, data }) => {
          if (status === 200) {
            self.clientes = data;
          } else {
            throw new Error('Algo malo ha ocurrido, no se ha podido obtener los clientes.');
          }
        })
        .catch((error) => {
          self.error = true;
          self.mensajeError = error.message;
        })
        .finally(() => {
          self.selectLoading = false;
        });
    },
    set_cliente() {
      const self = this;
      if (self.cliente) {
        self.$store.commit('set_cliente_project', self.cliente);
      }
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      this.obtener_clientes();
      this.loader = null;
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
