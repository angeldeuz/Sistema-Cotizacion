<template>
  <div id="app">
    <v-app>
      <template v-if="loading">
        <v-content>
          <v-layout row justify-center>
            <v-dialog v-model="loading" persistent fullscreen content-class="loading-dialog">
              <v-container fill-height>
                <v-layout row justify-center align-center>
                  <v-progress-circular
                    indeterminate
                    :size="70"
                    :width="7"
                    color="purple"
                    ></v-progress-circular>
                </v-layout>
              </v-container>
            </v-dialog>
          </v-layout>
        </v-content>
      </template>
      <template v-if="!loading">
        <Menu></Menu>
        <top-nav></top-nav>
        <v-content>
          <v-container fluid>
            <router-view/>
          </v-container>
        </v-content>
      </template>
    </v-app>
  </div>
</template>
<script>
import Menu from '@/template/menu.vue';
import TopNav from '@/template/top-nav.vue';
import 'vuetify/dist/vuetify.min.css';

export default {
  name: 'app',
  data: () => ({
    loading: true,
    dialog: false,
  }),
  components: {
    Menu,
    TopNav,
  },
  mounted() {
    const self = this;
    self.loading = false;
  },
};
</script>

<style lang="scss">
.loading-dialog {
    background-color: #303030;
}
</style>
