<template lang="pug">
#DatosGenerales
 h1 Datos Generales
 isometrico
 br
 v-divider
 br
 cliente
 br
 v-divider
 br
 tipo-de-cambio
 br
</template>

<script>
import Isometrico from '@/components/proyectos/isometrico.vue';
import Cliente from '@/components/proyectos/cliente.vue';
import TipoDeCambio from '@/components/proyectos/tipoDeCambio.vue';

export default {
  name: 'datosGenerales',
  components: { Isometrico, Cliente, TipoDeCambio },
};
</script>

<style lang="scss" scoped>

</style>
