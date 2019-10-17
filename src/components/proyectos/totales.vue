<template>
   <div id="Totales">
      <v-card class="totales">
         <v-list dense>
            <v-list-tile>
               <v-list-tile-content class="font-weight-bold">Total: </v-list-tile-content>
               <v-list-tile-content class="align-end font-weight-bold">
                  $ 2,500.00
               </v-list-tile-content>
            </v-list-tile>
         </v-list>
      </v-card>
   </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Totales',
  computed: {
    ...mapState(['']),
  },
};
</script>

<style lang="scss" scoped>

</style>
