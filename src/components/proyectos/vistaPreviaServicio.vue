<template lang="pug">
#VistaPreviaServicio
 h1.mb-3(v-if="servicio") {{`Vista Previa - ${servicio.nombre} - $${precio_servicio} `}}
 template(v-for="(categoria, index) in categorias" v-show="categorias")
  v-toolbar(color="blue-grey lighten-5" :key="index")
   v-toolbar-title.text-xs-center
    | Categoria - {{categoria.nombre}}
   v-spacer
   v-toolbar-items
    v-btn(icon flat @click="remover_categoria(categoria)")
     v-icon close
  v-data-table.mb-3(:key="categoria.nombre + index" :headers="headers" hide-actions :items="categoria.productos")
   template(v-slot:items="props")
    td.text-xs-left {{ props.item.nombre }}
    td.text-xs-left
     v-text-field(
       label='Cantidad'
       hide-details
       type='number'
       min="0"
       v-model='props.item.cantidad'
       solo)
    td.text-xs-left {{ props.item.precio }}
    td.text-xs-left
      v-text-field(
        readonly
        hide-details
        type="number"
        :value="props.item.precioCotizacion = suma_precio_producto(props.item.cantidad, props.item.precio)"
        v-model="props.item.precioCotizacion")
    td.text-xs-center
     v-icon(small flat @click="remover_producto(props, categoria)") close
   template(slot="footer")
    tr
     td.text-xs-right(colspan="3")
      h3 TOTAL CATEGORIA:
     td.text-xs-left(colspan="2") {{`$${categoria.totalCategoria}` }}
</template>

<script>
import HEADERS_VISTA_PREVIA from '@/headers/cotizacion/vistaPrevia';

export default {
  name: 'VistaPreviaServicio',
  props: ['categorias', 'servicio'],
  data: () => ({ headers: HEADERS_VISTA_PREVIA }),
  computed: {
    precio_servicio() {
      const self = this;
      const total = self.categorias.reduce((suma, valor) => (parseFloat(suma) + parseFloat(valor.totalCategoria)), 0);
      return total;
    },
  },
  methods: {
    remover_categoria(categoria) {
      const self = this;
      self.$emit('remover_categoria', categoria);
    },
    remover_producto(producto, categoria) {
      const self = this;
      const indexProducto = producto.index;
      self.$emit('remover_producto', { indexProducto, categoria });
    },
    suma_precio_producto(cantidad, precio) {
      const precioProducto = cantidad * precio;
      if (precioProducto > 0) {
        return precioProducto.toFixed(2);
      }
      return 0;
    },
  },
};

</script>

<style lang="scss">
table.v-table thead th {
  font-size: 1.1rem !important;
}
</style>
