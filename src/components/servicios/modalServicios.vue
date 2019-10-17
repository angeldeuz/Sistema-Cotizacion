<template lang="pug">
#ModalServicios
  v-dialog(v-model='mostrarModal' max-width='700px' persistent)
    v-card
      v-card-title
        h1 {{ Actualizar_O_Crear }} Servicio
        v-spacer
        v-btn(icon @click='cerrarModal')
          v-icon close
      v-card-text
        formulario-servicios(:evento="evento")
        v-flex(xs12)
          template(v-if='evento == 1')
            v-btn(color='primary' :disabled="hablitar_boton_guardar"  @click='mostrarModalConfirmacion = !mostrarModalConfirmacion')
              | Guardar
          template(v-if='evento == 2')
            v-btn(color='primary' @click='mostrarModalConfirmacion = !mostrarModalConfirmacion')
              | Actualizar
          v-btn(color='light' @click='cerrarModal')
            | Cancelar
  modal-confirmacion(modelo="servicio" :mostrar-modal-confirmacion='mostrarModalConfirmacion' :accion="Actualizar_O_Crear")
    template
      v-btn(color='light' flat @click='mostrarModalServicios = false') Cancelar
      v-btn(color='blue' dark @click='guardar_servicio')
        | Continuar
  v-snackbar(color='green darken-1' v-model='notificacion' :right='true' :timeout='2000' :top='true')
    | El Servicio ha sido guardado correctamente.
</template>

<script>
import ModalConfirmacion from '@/components/generales/modalConfirmacion.vue';
import FormularioServicios from '@/components/servicios/formularioServicios.vue';

export default {
  name: 'ModalServicios',
  props: ['mostrarModalServicios', 'evento'],
  components: { ModalConfirmacion, FormularioServicios },
  data() {
    return {
      nombre: null,
      dialog: this.mostrarModalServicios,
      mostrarModalConfirmacion: false,
      notificacion: false,
    };
  },
  watch: { dialog() { this.$emit('mostrarModal', this.dialog); } },
  computed: {
    Actualizar_O_Crear() { return (this.evento === 1) ? 'Crear' : 'Actualizar'; },
    mostrarModal() {
      const self = this;
      self.dialog = self.mostrarModalServicios;
      return self.dialog;
    },
    hablitar_boton_guardar() {
      const self = this;
      const { Servicio } = self.$store.state;
      if (Servicio.nombre !== '') {
        return false;
      }
      return true;
    },
  },
  methods: {
    cerrarModal() {
      const self = this;
      self.dialog = !self.dialog;
      self.mostrarModalConfirmacion = false;
      const { Servicio } = self.$store.state;
      Servicio.nombre = '';
    },
    guardar_servicio() {
      const self = this;
      const { Servicio } = self.$store.state;
      const funcion = (self.evento === 1) ? 'Crear' : 'Actualizar';
      self.$http.post(`Servicios/${funcion}`, { ...Servicio })
        .then(({ status }) => {
          if (status === 200) {
            self.$emit('obtener_servicios');
            self.cerrarModal();
            self.mostrarModalConfirmacion = false;
            self.notificacion = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
