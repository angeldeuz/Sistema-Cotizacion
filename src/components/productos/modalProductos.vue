<template lang="pug">
#ModalProductos
  v-dialog(v-model='mostrarModal' max-width='700px' persistent)
    v-card
      v-card-title
        h1 {{ Actualizar_O_Crear }} Producto
        v-spacer
        v-btn(icon @click='cerrarModal')
          v-icon close
      v-card-text
        formulario-productos(:evento="evento")
        v-flex(xs12)
          template(v-if='evento == 1')
            v-btn(color='primary' @click.prevent='guardar_producto')
              | Guardar
          template(v-if='evento == 2')
            v-btn(color='primary' @click="mostrarModalConfirmacion = !mostrarModalConfirmacion")
              | Actualizar
          v-btn(color='light' @click='cerrarModal')
            | Cancelar
  modal-confirmacion(modelo="producto" :mostrar-modal-confirmacion='mostrarModalConfirmacion' :accion="Actualizar_O_Crear")
    template
      v-btn(color='light' flat @click='mostrarModalConfirmacion = false') Cancelar
      v-btn(color='blue' dark @click='guardar_producto')
        | Continuar
  v-snackbar(color='green darken-1' v-model='notificacion' :right='true' :timeout='2000' :top='true')
    | El producto ha sido guardado correctamente.
</template>

<script>
import FormularioProductos from '@/components/productos/formularioProductos.vue';
import ModalConfirmacion from '@/components/generales/modalConfirmacion.vue';

export default {
  name: 'ModalProductos',
  components: { FormularioProductos, ModalConfirmacion },
  props: ['mostrarModalProductos', 'evento'],
  data() {
    return {
      valid: true,
      dialog: this.mostrarModalProductos,
      mostrarModalConfirmacion: false,
      notificacion: false,
    };
  },
  computed: {
    Actualizar_O_Crear() { return (this.evento === 1) ? 'Crear' : 'Actualizar'; },
    mostrarModal() {
      const self = this;
      self.dialog = self.mostrarModalProductos;
      return self.dialog;
    },
  },
  watch: { dialog() { this.$emit('mostrarModal', this.dialog); } },
  methods: {
    guardar_producto() {
      const self = this;
      const { Producto } = self.$store.state;
      const funcion = (self.evento === 1) ? 'Crear' : 'Actualizar';
      self.$http.post(`Productos/${funcion}`, { ...Producto })
        .then(() => {
          self.limpiarCamposProducto();
          self.$emit('obtener_productos');
          self.cerrarModal(); // Hacer accion
          self.mostrarModalConfirmacion = false;
          self.notificacion = true;
        })
        .catch(() => {
          console.error('no se ha podido realizar la operacion...');
        });
    },
    cerrarModal() {
      const self = this;
      self.dialog = !self.dialog;
      self.limpiarCamposProducto();
    },
    limpiarCamposProducto() {
      const self = this;
      const { Producto } = self.$store.state;
      Producto.idProducto = 0;
      Producto.clave = '';
      Producto.nombre = '';
      Producto.idCategoria = 0;
      Producto.unidadMedida = '';
      Producto.stock = 0;
      Producto.precioProducto = 0;
      Producto.manoObra = 0;
      Producto.precio = 0;
      self.$store.commit('set_producto', Producto);
    },
    validar_objeto() {
      const self = this;
      const { Producto } = self.$store.state;
      let validacion = true;
      Object.keys(Producto).forEach((item) => {
        if (Producto[item] === null || Producto[item] === 0 || Producto[item] === '' || typeof Producto[item] === 'undefined') {
          validacion = false;
        }
      });
      return validacion;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
