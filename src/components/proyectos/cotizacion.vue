<template lang="pug">
#cotizacion
 h1 Cotización
 modal-cotizacion
 vista-previa-cotizacion
</template>

<script>
import ModalCotizacion from '@/components/proyectos/modalCotizacion.vue';
import VistaPreviaCotizacion from '@/components/proyectos/vistaPreviaCotizacion.vue';

export default {
  name: 'Cotizacion',
  components: { ModalCotizacion, VistaPreviaCotizacion },
};
</script>

<style lang="scss" scoped>

</style>
