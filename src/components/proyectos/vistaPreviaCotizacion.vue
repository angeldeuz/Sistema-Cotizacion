<template lang="pug">
#VistaPreviaCotizacion.mt-4
 v-layout
  v-flex(xs12)
   v-card
    v-card-title(primary-title)
     h2.headline.mb-0 Vista Previa
    v-card-text
     template(v-for="(servicio, index) in serviciosCotizacion")
      v-toolbar(color="blue-grey lighten-3" :key="servicio.nombre+index")
       v-toolbar-title {{`Servicio: ${servicio.nombre} - $${servicio.totalServicio}`}}
       v-spacer
       v-toolbar-items
        v-btn(icon flat @click="remover_servicio_cotizacion(servicio)")
         v-icon close
      template(v-for="(categoria, indexCat) in servicio.categorias")
       v-toolbar(color="grey lighten-5" :key="categoria.nombre+indexCat")
        v-toolbar-title {{`Categoria: ${categoria.nombre}`}}
        v-spacer
        v-toolbar-items
         v-btn(icon flat @click="remover_categoria_cotizacion(categoria, servicio)")
          v-icon close
       v-data-table(:headers="headers" hide-actions :items="categoria.productos" :key="categoria.nombre+indexCat+2")
        template(v-slot:items="props")
         td.text-xs-left {{ props.item.nombre }}
         td.text-xs-left
          v-text-field(
            @input="actualizar_cantidad($event, props.item ,categoria, servicio)"
            label='Cantidad'
            hide-details
            type='number'
            min="0"
            v-model='props.item.cantidad'
            solo)
         td.text-xs-left {{ props.item.precio }}
         td.text-xs-left {{ props.item.precioCotizacion }}
         td.text-xs-center
          v-icon(small flat @click="remover_producto(props, categoria, servicio)") close
        template(slot="footer")
         td.text-xs-right(colspan="3")
          h3 TOTAL:
         td.text-xs-left(colspan="2") {{`$${categoria.totalCategoria}`}}
</template>
<script>
import { mapGetters } from 'vuex';
import HEADERS_VISTA_PREVIA from '@/headers/cotizacion/vistaPrevia';

export default {
  name: 'VistaPreviaCotizacion',
  data() {
    return { headers: HEADERS_VISTA_PREVIA };
  },
  computed: { ...mapGetters(['serviciosCotizacion']) },
  methods: {
    actualizar_cantidad(valor, producto, categoria, servicio) {
      const self = this;
      self.$store.commit('act_cantidad_producto_cotizacion',
        {
          valor, producto, categoria, servicio,
        });
    },
    // AL PARECER SE LIMPIARÁ ESTA FUNCIÓN (SIN USO, POR EL MOMENTO)
    suma_productos_categoria(productos) {
      const total = productos.reduce((suma, valor) => (parseFloat(suma) + parseFloat(valor.precioCotizacion)), 0);
      return `$ ${total.toFixed(2)}`;
    },
    remover_producto({ item }, categoria, servicio) {
      const self = this;
      self.$store.commit('remover_producto_cotizacion', {
        producto: item,
        categoria,
        servicio,
      });
    },
    remover_categoria_cotizacion(categoria, servicio) {
      const self = this;
      self.$store.commit('remover_categoria_cotizacion', { categoria, servicio });
    },
    remover_servicio_cotizacion(servicio) {
      const self = this;
      self.$store.commit('remover_servicio_cotizacion', servicio);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
