<template lang="pug">
div
 v-select(
   v-model="categoria"
   :items="categorias"
   label="Categoria(s)"
   item-text="nombre"
   chips
   item-value="idCategoria"
   :loading="loading"
   @change="seleccionar_categoria")
</template>

<script>
export default {
  name: 'ComboBoxCategorias',
  data: () => ({
    categorias: [],
    categoria: null,
    error: '',
    loading: false,
  }),
  beforeMount() {
    const self = this;
    self.obtener_categorias();
  },
  methods: {
    obtener_categorias() {
      const self = this;
      self.loading = true;
      self.$http.get('/Categorias/Listar')
        .then((response) => {
          self.categorias = response.data;
        })
        .catch((error) => {
          self.error = error.error;
        })
        .finally(() => {
          self.loading = false;
        });
    },
    seleccionar_categoria() {
      const self = this;
      self.$emit('seleccionar_categoria', self.categoria);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
