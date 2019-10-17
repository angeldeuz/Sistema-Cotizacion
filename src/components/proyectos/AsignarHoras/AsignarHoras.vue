<template>
  <div id="AsginarHoras">
    <v-layout row justify-center>
      <v-dialog v-model="mostrarAH" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>
              <span class="title">Asignación de Horas</span>
            </v-toolbar-title>
          </v-toolbar>
          <v-container grid-list-xs text-xs-center>
            <v-layout row wrap>
              <v-flex xs10 offset-xs1>
                <v-card>
                  <v-card-text>
                      <v-container>
                        <v-layout>
                          <v-flex xs4>
                            <img :src="logoParnet" alt="logo_parnet" class="logo-parnet">
                          </v-flex>
                          <v-flex xs4>
                              <h3>ParNet Ingeniería, S.A. de C.V.</h3>
                              <p>
                                Corona ote 1131 <br>
                                Saltillo, Coahuila México C.P 25000 <br>
                                Teléfono: (844) 414 - 2707,08,09 <br>
                              </p>
                          </v-flex>
                          <v-flex>
                            <h3>COTIZACIÓN</h3> <br>
                            {{ `COD${cotizacion[0].idCotizacion}` }}
                          </v-flex>
                        </v-layout>
                      </v-container>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import logoParnet from '@/assets/parnet_blue.png';

export default {
  name: 'AsignarHoras',
  props: ['mostrarAH', 'cotizacion'],
  data: () => ({
    logoParnet,
  }),
};
</script>

<style lang="scss" scoped>
.logo-parnet {
  width: 150px;
}
</style>
