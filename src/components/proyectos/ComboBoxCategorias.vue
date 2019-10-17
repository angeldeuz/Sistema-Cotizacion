<template lang="pug">
v-autocomplete.mt-4(
  v-model="selected"
  :items="categorias"
  item-text="nombre"
  :error="error"
  :error-messages="mensajeError"
  item-value="idCategoria"
  label="Selecciona una categoria"
  return-object)
</template>

<script>
import EventBus from '@/plugins/event-bus';

export default {
  name: 'ComboBoxCategorias',
  props: ['servicio'],
  data: () => ({
    categorias: [],
    selected: null,
    error: false,
    mensajeError: '',
  }),
  created() {
    const self = this;
    EventBus.$on('limpiar', () => {
      self.selected = null;
    });
  },
  methods: {
    obtener_categorias() {
      const self = this;
      const { servicio } = self;
      if (Object.keys(servicio).length > 0) {
        self.$http
          .get(`Categorias/BuscarPorServicio/${servicio.idServicio}`)
          .then(({ data, status }) => {
            if (status === 200) {
              self.categorias = data;
            } else {
              throw new Error('No se ha podido obtener las categorias');
            }
          })
          .catch(({ message }) => {
            self.error = true;
            self.mensajeError = message;
          });
      }
    },
  },
  watch: {
    servicio() {
      const self = this;
      if (self.servicio) {
        self.obtener_categorias();
      }
    },
    selected(categoria) {
      const self = this;
      self.$emit('categoria_seleccionada', categoria);
    },
  },
};
</script>

<style lang="scss" scoped>
.backround-tile {
  background-color: #eceff1;
}
</style>
