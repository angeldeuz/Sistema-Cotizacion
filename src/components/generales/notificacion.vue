<template lang="pug">
#Notificacion
  v-snackbar(
    :color="error ? 'error' : 'green darken-1'"
    v-model='verNotificacion'
    :right='true'
    :timeout='200'
    :top='true' )
    | {{ mensajeNotificacion }}
</template>

<script>
export default {
  name: 'Notificacion',
  props: ['error', 'mensajeNotificacion', 'verNotificacion'],
};
</script>

<style lang="scss" scoped>

</style>
