<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on }">
        <template v-if="eventoFormulario == 'Registro'">
          <v-btn
            color="primary"
            v-on="on">
            Agregar Cliente
          </v-btn>
        </template>
        <template v-if="eventoFormulario == 'Editar'">
          <v-icon small class="mr-2" v-on="on">
            edit
          </v-icon>
        </template>
      </template>
      <v-card>
        <v-card>
          <v-card-title class="mb-0">
            <span class="headline">{{ eventoFormulario }}</span>
          </v-card-title>
          <hr>
          <v-card-text class="mt-0">
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Nombre*"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Razón Social*"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="RFC*"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Correo*"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Tipo de Cliente*"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = !dialog">Cancelar</v-btn>
            <v-btn color="blue darken-1" dark @click.prevent="guardar">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'modalFormCliente',
  props: {
    eventoFormulario: { required: true, type: String },
    clienteSeleccionado: { required: false },
  },
  data: () => ({
    valor: false,
    dialog: false,
    nombre: null,
    razonSocial: null,
    RFC: null,
    correo: null,
  }),
  methods: {
    guardar() {
      const self = this;
      if (self.eventoFormulario === 'Editar') {
        self.editar_cliente();
        return;
      }
      self.guardar_cliente();
    },
    guardar_cliente() {
      // const self = this;
    },
    editar_cliente() {
      // TODO - SENTENCIA PARA EDITAR CLIENTE
      console.log('EDITANDO....');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
