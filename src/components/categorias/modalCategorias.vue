<template lang="pug">
#ModalCategorias
  v-dialog(v-model='mostrarModal' max-width='700px' persistent)
    v-card
      v-card-title
        h1 {{ Actualizar_O_Crear }} Categoria
        v-spacer
        v-btn(icon @click='cerrarModal')
          v-icon close
      v-card-text
        formulario-categorias(:evento="evento")
        v-flex(xs12)
          template(v-if='evento == 1')
            v-btn(color='primary' :disabled="hablitar_boton_guardar"  @click='mostrarModalConfirmacion = !mostrarModalConfirmacion')
              | Guardar
          template(v-if='evento == 2')
            v-btn(color='primary' @click='mostrarModalConfirmacion = !mostrarModalConfirmacion')
              | Actualizar
          v-btn(color='light' @click='cerrarModal')
            | Cancelar
  modal-confirmacion(modelo="categoria" :mostrar-modal-confirmacion='mostrarModalConfirmacion' :accion="Actualizar_O_Crear")
    template
      v-btn(color='light' flat @click='mostrarModalCategorias = false') Cancelar
      v-btn(color='blue' dark @click='guardar_categoria')
        | Continuar
  v-snackbar(color='green darken-1' v-model='notificacion' :right='true' :timeout='2000' :top='true')
    | La Categoria ha sido guardado correctamente.
</template>

<script>
import ModalConfirmacion from '@/components/generales/modalConfirmacion.vue';
import FormularioCategorias from '@/components/categorias/formularioCategorias.vue';

export default {
  name: 'ModalCategorias',
  components: { ModalConfirmacion, FormularioCategorias },
  props: ['mostrarModalCategorias', 'evento'],
  data() {
    return {
      dialog: this.mostrarModalCategorias,
      mostrarModalConfirmacion: false,
      notificacion: false,
    };
  },
  watch: { dialog() { this.$emit('mostrarModal', this.dialog); } },
  computed: {
    Actualizar_O_Crear() { return (this.evento === 1) ? 'Crear' : 'Actualizar'; },
    mostrarModal() {
      const self = this;
      self.dialog = self.mostrarModalCategorias;
      return self.dialog;
    },
  },
  methods: {
    cerrarModal() {
      const self = this;
      self.dialog = !self.dialog;
      self.mostrarModalConfirmacion = false;
      self.$store.commit('set_categoria_new', { nombre: '', idServicio: 0 });
    },
    guardar_categoria() {
      const self = this;
      const { Categoria } = self.$store.state;
      const funcion = (self.evento === 1) ? 'Crear' : 'Actualizar';
      self.$http.post(`Categorias/${funcion}`, Categoria)
        .then(({ status }) => {
          if (status === 200) {
            self.$emit('obtener_categorias');
            self.cerrarModal();
            self.notificacion = true;
          }
        }).catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
