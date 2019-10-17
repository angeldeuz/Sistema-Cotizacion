<template>
    <div id="vistaPrevia">
        <h1>Vista Previa</h1>
        <vista-previa-cotizacion></vista-previa-cotizacion>
    </div>
</template>

<script>
import VistaPreviaCotizacion from '@/components/proyectos/vistaPreviaCotizacion.vue';

export default {
  name: 'vistaPrevia',
  components: { VistaPreviaCotizacion },
};
</script>

<style lang="scss" scoped>

</style>
