<template lang="pug">
#VistaPreviaCotizacion
 v-layout(row justify-center)
  v-dialog(v-model="mostrarVistaPrevia" fullscreen hide-overlay transition="dialog-bottom-transition")
   v-card(v-if="cotizacion")
    v-toolbar(dark color="primary")
     v-btn(icon dark)
      v-icon(@click="cerrar_modal") close
     v-toolbar-title
      span.title  Vista Previa Cotización
    v-container(grid-list-xs text-xs-center)
     v-layout(row wrap)
      v-flex(xs-8)
       v-card
        v-card-text
         v-container(grid-list-xs)
          v-layout(row wrap)
           v-flex(xs4)
            img.logo-parnet(:src="logoParnet" alt="logo_parnet")
           v-flex(xs4)
            h3 ParNet Ingeniería, S.A. de C.V.
            p
             | Corona ote 1131
             br
             | Saltillo, Coahuila México C.P 25000
             br
             | Teléfono: (844) 414 - 2707,08,09
           v-flex
            h3
             | COTIZACIÓN
             br
             | {{ `COD${cotizacion[0].idCotizacion}` }}
             br
             | {{ cotizacion[0].fechaRegistro }}
       v-card.mt-3
        v-card-text.text-xs-left
         v-container
          v-layout
           v-flex(xs11 offset-xs1)
            p
             strong {{ cotizacion[0].clientes[0].razonSocial }}
             br
             strong RFC:
             | {{ cotizacion[0].clientes[0].rfc }}
             br
             strong Correo:
             | {{ cotizacion[0].clientes[0].correo }}
             br
             strong Moneda:
             | {{ cotizacion[0].moneda }}
       v-card.mt-3
        v-card-text
         template(v-for="servicio in cotizacion[0].datosCotizacion.servicios")
          v-toolbar(color="blue-grey lighten-3" :key="servicio.nombreServicio")
           v-toolbar-title
            v-toolbar-title {{ `SERVICIO: ${servicio.nombreServicio}` }}
          template(v-for="(categoria, indexCategoria) in servicio.categorias")
           v-toolbar(color="grey lighten-5" :key="categoria.nombreCategoria")
            v-toolbar-title
             v-toolbar-title {{ `CATEGORIA: ${categoria.nombreCategoria}` }}
           v-data-table.mb-2(:items="categoria.productos" :headers="HEADERS_VISTA_PREVIA" :key="categoria.nombreCategoria+indexCategoria" hide-actions="")
            template(v-slot:items="props")
             td.text-xs-left {{ props.item.clave }}
             td.text-xs-left {{ props.item.cantidad  }}
             td.text-xs-left {{ props.item.precio }}
             td.text-xs-left ${{ props.item.precioCotizacion }}
      v-flex(xs5 offset-xs7)
       v-card.mt-3
        v-card-text.text-xs-right
         h3 TOTAL: ${{cotizacion[0].total}}
</template>

<script>
import logoParnet from '@/assets/parnet_blue.png';
import HEADERS_VISTA_PREVIA from '@/headers/cotizacion/MostrarCotizacion';

export default {
  name: 'VistaPreviaCotizacion',
  props: ['cotizacion', 'mostrarVistaPrevia'],
  data: () => ({
    dialog: false,
    logoParnet,
    HEADERS_VISTA_PREVIA,
  }),
  methods: {
    cerrar_modal() {
      const self = this;
      self.$emit('cerrar_modal');
    },
  },
};
</script>

<style lang="scss" scoped>
.logo-parnet {
  width: 150px;
}
</style>
