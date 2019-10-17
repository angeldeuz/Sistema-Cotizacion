<template lang="pug">
#FormularioProducto
  v-container(grid-list-md)
    v-form(ref="form" lazy-validation v-model="valid")
      v-layout(wrap)
        v-flex(xs12)
          v-text-field(label='Clave*' v-model='clave' required)
        v-flex(xs12)
          v-text-field(label='Nombre*' v-model='nombre')
        v-flex(xs12)
          v-select(:items='categorias' label='Categoria(s)' item-text='nombre' chips item-value='idCategoria' v-model='idCategoria')
        v-flex(xs6)
          v-text-field(type='number' label='Stock' v-model='stock')
        v-flex(xs6)
          v-select(:items='UnidadesMedida.data' label='Selecciona una Unidad de Medida' v-model='unidadMedida')
        v-flex(xs6)
          v-text-field(type='number' label='$ Mano de Obra' v-model='manoObra')
        v-flex(xs6)
          v-text-field(type='number' label='$ Precio Producto' step='0.01' min='0' v-model='precioProducto')
        v-flex(xs12)
          v-text-field(v-model='precio' label='$ Precio Total' readonly)
</template>

<script>
import UnidadesMedida from '@/objetos/unidadesMedida';
import { mapState } from 'vuex';

export default {
  name: 'FormularioProductos',
  props: ['evento'],
  data: () => ({
    UnidadesMedida,
    categorias: [],
    valid: true,
  }),
  beforeMount() { this.obtener_categorias(); },
  methods: {
    validar() {
      const self = this;
      self.$store.dispatch('ejemplo_context');
    },
    suma_precio_producto() {
      const self = this;
      self.Producto.precio = parseFloat(parseFloat(self.Producto.manoObra)
                            + parseFloat(self.Producto.precioProducto)).toFixed(2);
    },
    obtener_categorias() {
      const self = this;
      self.loading = true;
      self.$http.get('/Categorias/Listar')
        .then((response) => { self.categorias = response.data; })
        .catch((error) => { self.error = error.error; })
        .finally(() => { self.loading = false; });
    },
  },
  watch: {
    Producto: {
      deep: true,
      handler() {
        const self = this;
        self.suma_precio_producto();
      },
    },
  },
  computed: {
    ...mapState(['Producto']),
    clave: {
      get() { return this.Producto.clave; },
      set(clave) { this.$store.commit('set_producto', { clave }); },
    },
    nombre: {
      get() { return this.Producto.nombre; },
      set(nombre) { this.$store.commit('set_producto', { nombre }); },
    },
    idCategoria: {
      get() { return this.Producto.idCategoria; },
      set(idCategoria) { this.$store.commit('set_producto', { idCategoria }); },
    },
    stock: {
      get() { return this.Producto.stock; },
      set(stock) { this.$store.commit('set_producto', { stock }); },
    },
    unidadMedida: {
      get() { return this.Producto.unidadMedida; },
      set(unidadMedida) { this.$store.commit('set_producto', { unidadMedida }); },
    },
    precioProducto: {
      get() { return this.Producto.precioProducto; },
      set(precioProducto) { this.$store.commit('set_producto', { precioProducto }); },
    },
    manoObra: {
      get() { return this.Producto.manoObra; },
      set(manoObra) { this.$store.commit('set_producto', { manoObra }); },
    },
    precio: {
      get() { return this.Producto.precio; },
      set(precio) { this.$store.commit('set_producto', { precio }); },
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
