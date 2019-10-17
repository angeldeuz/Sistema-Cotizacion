<template lang="pug">
#ModalConfirmacion
  v-layout(row justify-center)
    v-dialog(v-model="mostrarModalConfirmacion" persistent max-width="420")
      v-card
        v-card-title.headline
          | ¿Estás seguro de la operación?
        v-card-text
          h3
            | Estás a punto de {{ accion }} un {{ modelo }}.
            br
            |                    ¿ Deseas continuar ?
          br
        v-card-actions
          v-spacer
          slot
</template>

<script>
export default {
  name: 'ModalConfirmacion',
  props: ['mostrarModalConfirmacion', 'modelo', 'accion'],
};
</script>

<style lang="scss" scoped>

</style>
