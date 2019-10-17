<template lang="pug">
#ListadoProductos
 p(v-if="loading") cargando...
 v-list.scroll-y(three-line subheader style="max-height: 380px;height: 380px;" v-if="!loading")
  v-subheader Listado de Productos
  v-list-tile(
    v-for="(producto, index) in productos"
    :key="producto.clave+index"
    style="margin-bottom: 10px; height: 110px; margin-top: 10px;")
   v-list-tile-action
    v-checkbox(v-model="productosSeleccionados" :value="producto")
   v-list-tile-content(style="height: 120px;")
    v-list-tile-title(style="height: 22px;") Producto: {{producto.clave}}
    v-list-tile-sub-title(style="height: 80px;")
     p
      | Cantidad: {{`${producto.cantidad} ${producto.unidadMedida} / Stock: ${producto.stock} ${producto.unidadMedida}`}}
      br
      v-text-field(solo v-model="producto.cantidadOrdenCompra" label="Cantidad" type="number")
</template>

<script>
import { mapState } from 'vuex';
import EventBus from '@/plugins/event-bus';

export default {
  name: 'ListadoProductos',
  data: () => ({
    productos: [],
    productosSeleccionados: [],
    loading: false,
  }),
  beforeMount() { this.obtener_productos_cotizacion(); },
  created() {
    const self = this;
    EventBus.$on('agregar_productos_oc', () => {
      self.$store.commit('set_productosSeleccionados_ordenCompra_proveedor', self.productosSeleccionados);
      self.productosSeleccionados.map(producto => self.productos.splice(producto, 1));
      self.productosSeleccionados = [];
    });

    EventBus.$on('reingresar_productos', (productos) => {
      productos.map(producto => self.productos.unshift(producto));
    });
  },
  methods: {
    obtener_productos_cotizacion() {
      const self = this;
      const { idCotizacion } = self.OrdenCompraProveedor.cotizacion;
      const categorias = [];
      self.productos = [];
      self.productosSeleccionados = [];
      if (idCotizacion > 0) {
        self.$http.get(`Cotizaciones/Mostrar/${idCotizacion}`)
          .then(({ status, data }) => {
            if (status === 200) {
              const { datosCotizacion } = data[0];
              datosCotizacion.servicios.map((servicio) => {
                servicio.categorias.map((categoria) => {
                  categorias.push(categoria);
                  return categoria;
                });
                return servicio;
              });
              categorias.map((categoria) => {
                categoria.productos.map((producto) => {
                  self.productos.push(producto);
                  return producto;
                });
                return categoria.productos;
              });
              self.loading = false;
            }
          }).catch((error) => { console.error(error); });
      }
    },
    obtener_productos_general() {
      const self = this;
      self.$http.get('Productos/Listar')
        .then(({ status, data }) => {
          if (status === 200) {
            self.productos = data;
            self.loading = false;
          }
        }).catch(error => console.error(error));
    },
  },
  computed: { ...mapState(['OrdenCompraProveedor']) },
  watch: {
    OrdenCompraProveedor({ tipo }) {
      const self = this;
      self.productos = [];
      self.loading = true;
      switch (tipo) {
        case 'cotizacion':
          self.obtener_productos_cotizacion();
          break;
        case 'general':
          self.obtener_productos_general();
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
