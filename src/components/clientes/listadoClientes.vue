<template>
   <div id="ListadoClientes">
      <v-card>
         <v-alert v-model="alert" dismissible type="warning" v-if="error">
            No se han podido obtener correctamente los clientes.
            <v-btn
                outline
               :loading="loader"
               :disabled="loader"
               color="grey lighten-5"
               @click.prevent="loader = 'loading'">
               Reintentar
            </v-btn>
         </v-alert>
         <v-card-title>
            <v-dialog v-model="dialog" max-width="500px" persistent>
               <template v-slot:activator="{ on }">
                    <v-btn
                      color="primary mb-2"
                      v-on="on" @click="modalTitle = 'Registrar'">
                      Agregar Cliente
                    </v-btn>
               </template>
               <v-card>
                  <v-card>
                     <v-card-title class="mb-0">
                        <span class="headline">{{ modalTitle }} Cliente</span>
                     </v-card-title>
                     <hr>
                     <v-card-text class="mt-0">
                        <v-container grid-list-md>
                           <v-layout wrap>
                              <v-flex xs12>
                                 <v-text-field label="Nombre*"
                                 v-model="cliente.nombre">
                                 </v-text-field>
                              </v-flex>
                              <v-flex xs12>
                                 <v-text-field
                                  label="Razón Social*"
                                  v-model="cliente.razonSocial">
                                  </v-text-field>
                              </v-flex>
                              <v-flex xs12>
                                 <v-text-field label="RFC*" v-model="cliente.RFC"></v-text-field>
                              </v-flex>
                              <v-flex xs12>
                                 <v-text-field
                                  label="Correo*"
                                  v-model="cliente.correo">
                                 </v-text-field>
                              </v-flex>
                              <v-flex xs12>
                                 <v-select
                                    :items="tiposClientes"
                                    label="Selecciona un Tipo de Cliente"
                                    item-text="tipoCliente"
                                    item-value="idTipoCliente"
                                    v-model="cliente.idTipoCliente">
                                 </v-select>
                              </v-flex>
                           </v-layout>
                        </v-container>
                     </v-card-text>
                     <v-divider></v-divider>
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          flat @click="limpiarCamposCliente"
                        >Cancelar</v-btn>
                        <v-btn
                          v-if="evento == 1"
                          color="blue darken-1"
                          dark
                          @click.prevent="guardar_cliente">
                          Guardar
                          </v-btn>
                         <v-btn
                          v-if="evento == 2"
                          color="blue darken-1"
                          dark
                          @click.prevent="actualizar_cliente">
                          Actualizar
                          </v-btn>
                     </v-card-actions>
                  </v-card>
               </v-card>
            </v-dialog>
            <v-spacer></v-spacer>
            <v-text-field
               v-model="buscar"
               append-icon="search"
               label="Buscar"
               single-line
               hide-details>
            </v-text-field>
         </v-card-title>
         <v-data-table
            :headers="headers"
            :items="clientes"
            :search="buscar"
            :loading="loading"
            no-data-text="No se encontraron resultados.">
            <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
            <template v-slot:items="props">
               <td class="text-xs-left">{{ props.item.idCliente }}</td>
               <td class="text-xs-left">{{ props.item.nombre }}</td>
               <td class="text-xs-left">{{ props.item.rfc }}</td>
               <td class="text-xs-left">{{ props.item.razonSocial }}</td>
               <td class="text-xs-left">{{ props.item.correo }}</td>
               <td class="text-xs-left">{{ props.item.fechaRegistro }}</td>
               <td class="text-xs-left">
                  <v-icon small @click="editar_cliente(props.item)">edit</v-icon>
               </td>
            </template>
            <template v-slot:no-results>
               <v-alert :value="true" color="error" icon="warning">
                  No se econtraron resultados para tu búsqueda "{{ buscar }}".
               </v-alert>
            </template>
         </v-data-table>
      </v-card>
   </div>
</template>

<script>
export default {
  name: 'ListadoClientes',
  data: () => ({
    evento: 1,
    tiposClientes: [],
    dialog: false,
    alert: true,
    loader: false,
    cliente: {
      idCliente: 0, nombre: '', RFC: '', razonSocial: '', correo: '', idTipoCliente: 0,
    },
    clientes: [],
    buscar: '',
    error: null,
    loading: true,
    modalTitle: null,
    headers: [
      {
        text: 'Folio',
        align: 'left',
        sortable: true,
        value: 'idCliente',
      },
      {
        text: 'Nombre',
        align: 'left',
        sortable: true,
        value: 'Nombre',
      },
      {
        text: 'RFC',
        align: 'left',
        sortable: true,
        value: 'rfc',
      },
      {
        text: 'Razon Social',
        align: 'left',
        sortable: true,
        value: 'razonSocial',
      },
      {
        text: 'Correo',
        align: 'left',
        sortable: true,
        value: 'correo',
      },
      {
        text: 'Fecha Registro',
        align: 'left',
        sortable: true,
        value: 'fechaRegistro',
      },
      {
        text: 'Acciones',
        align: 'left',
      },
    ],
  }),
  beforeMount() {
    const self = this;
    self.loadComponent = false;
    self.obtener_clientes();
    self.obtener_tiposClientes();
  },
  methods: {
    obtener_tiposClientes() {
      const self = this;
      self.$http.get('TipoClientes/Listar')
        .then((response) => { this.tiposClientes = response.data; });
    },
    obtener_clientes() {
      const self = this;
      self.$http.get('/Clientes/Listar/')
        .then((response) => {
          self.clientes = response.data;
          self.error = null;
          self.loading = false;
          console.log(response.data);
        })
        .catch((error) => {
          self.error = error;
        });
    },
    guardar_cliente() {
      const self = this;
      const Cliente = self.cliente;
      self.$http.post('/Clientes/Crear', {
        RFC: Cliente.RFC,
        nombre: Cliente.nombre,
        razonSocial: Cliente.razonSocial,
        idTipoCliente: Cliente.idTipoCliente,
        correo: Cliente.correo,
      })
        .then(() => {
          console.log('si');
        })
        .catch(() => {
          console.log('no');
        })
        .finally(() => {
          self.limpiarCamposCliente();
          self.dialog = !self.dialog;
        });
    },
    editar_cliente(cliente) {
      const self = this;
      self.evento = 2;
      self.modalTitle = 'Editar';
      self.dialog = true;
      self.cliente = Object.assign({}, {
        idCliente: cliente.idCliente,
        nombre: cliente.nombre,
        RFC: cliente.rfc,
        razonSocial: cliente.razonSocial,
        correo: cliente.correo,
        idTipoCliente: cliente.idTipoCliente,
      });
    },
    actualizar_cliente() {
      const self = this;
      const Cliente = self.cliente;
      self.$http.post('/Clientes/Actualizar', {
        idCliente: Cliente.idCliente,
        RFC: Cliente.RFC,
        nombre: Cliente.nombre,
        razonSocial: Cliente.razonSocial,
        idTipoCliente: Cliente.idTipoCliente,
        correo: Cliente.correo,
      })
        .then(() => {
          console.log('si');
        })
        .catch(() => {
          console.log('no');
        })
        .finally(() => {
          self.limpiarCamposCliente();
          self.dialog = !self.dialog;
        });
    },
    limpiarCamposCliente() {
      const self = this;
      self.dialog = !self.dialog;
      self.cliente = Object.assign({}, {
        idCliente: 0,
        nombre: '',
        RFC: '',
        razonSocial: '',
        correo: '',
        idTipoCliente: '',
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
