<template lang="pug">
#servicios
  h1 Servicio
  br
  v-autocomplete(
    v-model="selected"
    :items="servicios"
    item-text="nombre"
    item-value="idServicio"
    chips
    :error="error"
    :error-messages="mensajeError"
    :loading="loading"
    label="Selecciona un servicio"
    no-data-text="No se encontraron resultados"
    return-object)
</template>

<script>
import EventBus from '@/plugins/event-bus';

export default {
  name: 'servicios',
  data: () => ({
    selected: null,
    loading: true,
    error: false,
    mensajeError: '',
    servicios: [],
  }),
  created() {
    const self = this;
    EventBus.$on('CerrarModal', () => {
      self.selected = null;
    });
  },
  beforeMount() { this.obtener_servicios(); },
  methods: {
    remove(item) {
      const self = this;
      const index = self.selected.indexOf(item);
      if (index >= 0) self.selected.splice(index, 1);
    },
    obtener_servicios() {
      const self = this;
      self.$http.get('Servicios/Listar')
        .then(({ status, data }) => {
          if (status === 200) {
            self.servicios = data;
          } else {
            throw new Error('Algo malo ha ocurrido, no se ha podido obtener los servicios.');
          }
        })
        .catch((error) => {
          self.error = true;
          self.mensajeError = error.message;
        })
        .finally(() => { self.loading = false; });
    },
  },
  watch: {
    selected(valor) {
      const self = this;
      self.$emit('servicio_seleccionado', valor);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
