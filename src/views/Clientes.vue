<template>
    <div id="Clientes">
        <h1>Clientes</h1>
        <listado-clientes></listado-clientes>
    </div>
</template>

<script>
import ListadoClientes from '@/components/clientes/listadoClientes.vue';

export default {
  name: 'Clientes',
  components: { ListadoClientes },
};
</script>

<style lang="scss" scoped>

</style>
