<template lang="pug">
#crear-proyecto
  h1 Crear Cotización
  v-card.mt-3
    v-stepper(v-model="e1")
      v-stepper-header
        v-stepper-step(step="1" :complete="e1 > 1") Datos Generales
        v-divider
        v-stepper-step(step="2" :complete="e1 > 2") Cotización
        v-divider
        v-stepper-step(step="3" :complete="e1 > 3") Descuento
        v-divider
        v-stepper-step(step="4" :complete="e1 > 4") Vista Previa
      v-stepper-items
        v-stepper-content(step="1")
          v-card.mb-5(color="white" height="100% ")
            datos-generales
          v-btn(:disabled="step_1_to_2" color="primary" @click="e1 = 2")
            | Continuar
            v-icon arrow_forward
        v-stepper-content(step="2")
          v-card.mb-5(color="white" height="100%")
            cotizacion
          v-btn(flat @click="e1 = 1")
            v-icon arrow_back
            | Regresar
          v-btn(color="primary" @click="e1 = 3")
            | Continuar
            v-icon arrow_forward
        v-stepper-content(step="3")
          v-card.mb-5(color="white" height="100%")
            descuento
          v-btn(flat @click="e1 = 2")
            v-icon arrow_back
          | Regresar
          v-btn(color="primary" @click="e1 = 4")
            | Continuar
            v-icon arrow_forward
        v-stepper-content(step="4")
          v-card.mb-5(color="white" height="100%")
            vista-previa
          v-btn(color="green" @click="guardar_proyecto" :loading="loading") Guardar
          v-btn(flat) Cancel
  notificacion(:error="error" :verNotificacion="verNotificacion" :mensajeNotificacion="mensajeNotificacion")
</template>
<script>
import DatosGenerales from '@/components/proyectos/datosGenerales.vue';
import Cotizacion from '@/components/proyectos/cotizacion.vue';
import Descuento from '@/components/proyectos/descuento.vue';
import VistaPrevia from '@/components/proyectos/vistaPrevia.vue';
import Notificacion from '@/components/generales/notificacion.vue';
import { mapState } from 'vuex';

export default {
  name: 'CrearProyecto',
  components: {
    DatosGenerales, Descuento, VistaPrevia, Cotizacion, Notificacion,
  },
  data: () => ({
    e1: 1,
    loading: false,
    error: false,
    mensajeNotificacion: '',
    verNotificacion: false,
  }),
  created() {
    // TODO - REALIZAR EVENT LISTENER DE VALIDACIÓN DE SALIDA DE PÁGINA
  },
  computed: {
    ...mapState(['proyecto']),
    step_1_to_2() {
      const self = this;
      const isometrico = self.$store.getters.file_isometrico;
      const cliente = self.$store.getters.clienteProyecto;
      const counter = isometrico.file.length;
      if ((!isometrico.value && cliente !== 0)
         || ((isometrico.value && counter !== 0) && cliente !== 0)) {
        return false;
      }
      if ((isometrico.value && counter >= 0) && cliente === 0) {
        return true;
      }

      return true;
    },
    stepClienteToNext() {
      const self = this;
      const { cliente } = self.$store.state.proyecto;
      if (!cliente) { return true; }
      return false;
    },
  },
  methods: {
    guardar_proyecto() {
      const self = this;
      self.loading = true;
      self.$http.post('Cotizaciones/Guardar', self.proyecto)
        .then(({ status }) => {
          if (status === 200) {
            self.$store.commit('limpiar_proyecto');
            setTimeout(() => {
              self.$router.push({ name: 'proyectos' });
            }, 1000);
            self.error = false;
            self.mensajeNotificacion = 'Cotización registrada correctamente.';
            self.verNotificacion = true;
            self.e1 = 5;
          } else {
            throw new Error('Algo malo ha ocurrido. No se ha podido registrar la Cotización');
          }
        })
        .catch((error) => {
          self.error = true;
          self.mensajeNotificacion = error.message;
          self.verNotificacion = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
