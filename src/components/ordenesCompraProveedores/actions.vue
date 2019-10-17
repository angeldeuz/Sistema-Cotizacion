<template lang="pug">
v-layout(fill-height)
 v-flex(xs12)
  v-layout(align-center justify-center column fill-height)
   v-btn(fab dark large color="primary" @click="agregar_productos")
    v-icon(dark) fas fa-chevron-right
   v-btn(fab dark large color="primary" @click="descartar_productos")
    v-icon(dark) fas fa-chevron-left
</template>

<script>
import EventBus from '@/plugins/event-bus';

export default {
  name: 'actions',
  data: () => ({}),
  methods: {
    agregar_productos() {
      EventBus.$emit('agregar_productos_oc');
    },
    descartar_productos() {
      EventBus.$emit('descartar_productos_oc');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
