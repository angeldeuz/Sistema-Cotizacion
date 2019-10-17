<template lang="pug">
#ModalCotizacion
  v-dialog(
    v-model="dialog"
    fullscreen hide-overlay
    transition="dialog-bottom-transition")
    template(v-slot:activator="{ on }")
      v-btn(color="primary" dark v-on="on") Agregar Servicio y sus productos
    v-card
      v-toolbar(dark color="blue-grey darken-3")
        v-btn(icon @click="cerrando_modal()")
          v-icon close
        v-toolbar-title
          | Agrega un Servicio a la cotización {{ servicioSeleccionado && `| Servicio: ${servicioSeleccionado.nombre}` }}
      v-card
        v-card-text
          v-stepper(v-model="e1")
            v-stepper-header
              v-stepper-step(:complete="e1 > 1" step="1") Servicio
              v-divider
              v-stepper-step(:complete="e1 > 2" step="2") Productos
              v-divider
              v-stepper-step(:complete="e1 > 3" step="3") Vista Previa
            v-stepper-items
              v-stepper-content(step="1")
                v-card.mb-5(height="100%")
                  servicios(@servicio_seleccionado="servicio_seleccionado")
                  v-btn(color="primary" @click="e1 = 2" :disabled="!servicioSeleccionado")
                    | Continuar
                    v-icon arrow_forward
              v-stepper-content(step="2")
                v-card.mb-5(height="100%")
                  v-container(grid-list-md fluid)
                    v-layout(row)
                      v-flex(xs12)
                        productos(:categoria="categoriaSeleccionada" @agregar_productos_cotizacion="agregar_categorias_cotizacion")
                          combo-box-categorias(
                            @categoria_seleccionada="categoria_seleccionada"
                            :servicio="servicioSeleccionado")
                  v-btn(flat @click="e1 = 1")
                    v-icon arrow_back
                    | Regresar
                  v-btn(color="primary" @click="e1 = 3" :disabled="avanzar_vista_previa")
                    | Continuar
                    v-icon arrow_forward
              v-stepper-content(step=3)
                v-card.mb-5(height="100%")
                  v-container(grid-list-md fluid)
                    v-layout(row)
                      v-flex(xs12)
                        vista-previa-servicio(
                          :categorias="categorias"
                          :servicio="servicioSeleccionado"
                          @remover_producto="remover_producto"
                          @remover_categoria="remover_categoria"
                        )
                  v-btn(flat @click="e1 = 2")
                    v-icon arrow_back
                    | Regresar
                  v-btn(color="primary" @click="confirmar_servicio_cotizacion")
                    | Confirmar y Agregar
                    v-icon arrow_forward
  v-snackbar(color='green darken-1' v-model='notificacion' :right='true' :timeout='2000' :top='true' )
    | La categoria y sus productos han sido agregados
</template>

<script>
import Servicios from '@/components/proyectos/servicios.vue';
import Productos from '@/components/proyectos/productos.vue';
import ComboBoxCategorias from '@/components/proyectos/ComboBoxCategorias.vue';
import EventBus from '@/plugins/event-bus';
import VistaPreviaServicio from '@/components/proyectos/vistaPreviaServicio.vue';

export default {
  name: 'ModalCotizacion',
  components: {
    Servicios, Productos, ComboBoxCategorias, VistaPreviaServicio,
  },
  data: () => ({
    dialog: false,
    e1: 1,
    notificacion: false,
    servicioSeleccionado: null,
    categoriaSeleccionada: null,
    categorias: [],
    Cotizacion: {}, // ÉSTE ES PARA AGREGAR A LA COTIZACIÓN CON CATEGORÍAS Y PRODUCTOS
    loadingProductos: false,
  }),
  methods: {
    servicio_seleccionado(servicio) {
      const self = this;
      self.servicioSeleccionado = servicio;
    },
    categoria_seleccionada(categoria) {
      const self = this;
      self.categoriaSeleccionada = categoria;
    },
    agregar_categorias_cotizacion(productos) {
      // PREPARA LAS CATEGORIAS CON SUS PRODUCTOS PARA ANTES DE AGREGARLA A LA COTIZACION
      const self = this;
      const total = productos.reduce((suma, valor) => (parseFloat(suma) + parseFloat(valor.precioCotizacion)), 0);
      const Agregar = {
        ...self.categoriaSeleccionada,
        productos,
        totalCategoria: total.toFixed(2),
      };
      self.categorias.push(Agregar);
      EventBus.$emit('limpiar');
      self.notificacion = true;
      // self.$store.emit('set_cotizacion', self.Cotizacion);
    },
    confirmar_servicio_cotizacion() {
      // AGREGA SERVICIO CON CATEGORIAS Y PRODUCTOS A COTIZACION
      const self = this;
      const total = self.categorias.reduce((suma, valor) => (parseFloat(suma) + parseFloat(valor.totalCategoria)), 0);
      const servicio = {
        ...self.servicioSeleccionado,
        categorias: self.categorias,
        totalServicio: total.toFixed(2),
      };
      self.$store.commit('set_servicio_cotizacion', servicio);
      self.categorias = [];
      self.servicioSeleccionado = null;
      self.dialog = false;
      self.categoriaSeleccionada = null;
      self.e1 = 1;
      EventBus.$emit('CerrarModal');
    },
    remover_producto({ indexProducto, categoria }) {
      // REMUEVE UN PRODUCTO DE LA COTIZACION
      const self = this;
      const { categorias } = self;
      const indexCategoria = categorias.indexOf(categoria);
      categorias[indexCategoria].productos.splice(indexProducto, 1);

      if (categorias[indexCategoria].productos < 1) {
        categorias.splice(indexCategoria, 1);
      }
      if (categorias.length < 1) {
        self.e1 = 2;
      }
    },
    remover_categoria(categoria) {
      const self = this;
      const { categorias } = self;
      const indexCategoria = categorias.indexOf(categoria);
      categorias.splice(indexCategoria, 1);

      if (categorias.length < 1) {
        self.e1 = 2;
      }
    },
    cerrando_modal() {
      const self = this;
      self.dialog = false;
      self.servicioSeleccionado = null;
      EventBus.$emit('CerrarModal');
      self.e1 = 1;
    },
  },
  computed: {
    avanzar_vista_previa() {
      const { categorias } = this;
      if (categorias.length > 0) {
        return false;
      }
      return true;
    },
  },
  watch: {
    servicioSeleccionado(nuevoValor, valorAnterior) {
      const self = this;
      if (nuevoValor !== valorAnterior) {
        self.categorias = [];
        EventBus.$emit('limpiar');
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
