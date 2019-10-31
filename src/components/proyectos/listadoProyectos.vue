<template lang="pug">
#ListadoProyectos
  v-card
    v-card-title
      v-btn.ml-0(to="/proyectos/crear" large color="primary") Crear una cotización
      v-spacer
      v-text-field(v-model='buscar' append-icon='search' label='Buscar' single-line hide-details)
    v-card-text
      v-data-table.elevation-2.mt-2(:headers='headers' :items='proyectos' :loading='loading' :search='buscar' no-results-text='No se encontraron resultados' no-data-text='No se encontraron resultados')
        template(v-slot:items='props')
          td.text-left {{props.item.idCotizacion}}
          td.text-left {{props.item.nombre}}
          td.text-left {{props.item.total}}
          td.text-left {{props.item.fechaRegistro}}
          td.text-left {{props.item.estatus}}
          td.text-xs-left.iconos
            v-tooltip(bottom)
             template(v-slot:activator="{ on }")
              v-icon(small v-on="on" @click.prevent="mostrar_cotizacion(props.item)") visibility
             span Visualizar
            v-tooltip(bottom)
             template(v-slot:activator="{ on }")
              v-icon(small v-on="on") edit
             span Editar
            v-tooltip(bottom)
             template(v-slot:activator="{ on }")
              v-icon(small v-on="on" @click.prevent="mostrar_ah(props.item)") assignment
             span Asignar horas
  VistaPreviaCotizacion(
    @cerrar_modal="mostrarVistaPrevia = !mostrarVistaPrevia"
    :mostrarVistaPrevia="mostrarVistaPrevia"
    :cotizacion="cotizacionSeleccionada")
  AsignarHoras(
    :mostrarAH="mostrarAH" 
    :cotizacion="cotizacionSeleccionada"
     @cerrar_modal="mostrarAH = !mostrarAH"
     @shown="displayNotif($event)"
  )
  SNotification(ref="notif")
</template>

<script>
import HEADERS_PROYECTOS from "@/headers/proyectos";
import VistaPreviaCotizacion from "@/components/proyectos/VistaPreviaCotizacion/vistaPreviaCotizacion.vue";
import AsignarHoras from "@/components/proyectos/AsignarHoras/AsignarHoras.vue";
import SNotification from "@/components/proyectos/AsignarHoras/SNotification.vue";

export default {
  name: "ListadoProyectos",
  components: { VistaPreviaCotizacion, AsignarHoras, SNotification },
  data() {
    return {
      mostrarAH: false,
      buscar: "",
      headers: HEADERS_PROYECTOS,
      loading: true,
      proyectos: [],
      mostrarVistaPrevia: false,
      cotizacionSeleccionada: null,
      fmodal: false
    };
  },
  beforeMount() {
    this.obtener_proyectos();
  },
  methods: {
    obtener_proyectos() {
      const self = this;
      self.$http
        .get("Cotizaciones/Listado")
        .then(({ data, status }) => {
          if (status === 200) {
            self.proyectos = data;
            self.loading = false;
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    mostrar_cotizacion({ idCotizacion }) {
      const self = this;
      self.$http
        .get(`Cotizaciones/Mostrar/${idCotizacion}`)
        .then(({ status, data }) => {
          if (status === 200) {
            self.cotizacionSeleccionada = data;
            self.mostrarVistaPrevia = true;
          }
        });
    },
    mostrar_ah({ idCotizacion }) {
      const self = this;
      self.$http
        .get(`Cotizaciones/Mostrar/${idCotizacion}`)
        .then(({ status, data }) => {
          if (status === 200) {
            self.cotizacionSeleccionada = data;
            self.mostrarAH = true;
          }
        });
    },
    displayNotif(e) {
      this.$refs['notif'].showNotif(e);
    }
  }
};
</script>

<style lang="scss" scoped>
.iconos {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 5px !important;
}
</style>
