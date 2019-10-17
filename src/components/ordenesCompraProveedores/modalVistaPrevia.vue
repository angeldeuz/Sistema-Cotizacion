<template>
    <div id="ModalVistaPrevia">
        <v-layout row justify-center>
            <v-dialog v-model="mostrarVistaPrevia" width="600px" persistent>
                <v-card>
                    <v-card-title>
                        <span class="headline">
                            Vista Previa de Orden Compra
                        </span>
                    </v-card-title>
                    <v-card-text>
                        <v-toolbar color="blue-grey lighten-3">
                            <v-toolbar-title>
                               Proveedor: {{ OrdenCompraProveedor.proveedor.razonSocial }}
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-toolbar color="blue-grey lighten-3">
                            <v-toolbar-title v-if="OrdenCompraProveedor.cotizacion != 0">
                               Cotizacion: {{ OrdenCompraProveedor.cotizacion.idCotizacion }} - {{ OrdenCompraProveedor.cotizacion.nombre }}
                            </v-toolbar-title>
                        </v-toolbar>
                        <v-data-table :headers="headers" :items="OrdenCompraProveedor.productosSeleccionados" hide-actions>
                            <template v-slot:items="props">
                                <td class="text-xs-left">{{ props.item.clave }}</td>
                                <td class="text-xs-left">{{ props.item.cantidad }}</td>
                            </template>
                        </v-data-table>
                        <hr />
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                            <v-btn flat @click="cancelar_orden_compra">Cancelar</v-btn>
                            <v-btn dark color="primary">Confirmar y Generar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import EventBus from '@/plugins/event-bus';
import HEADERS_VISTA_PREVIA from '@/headers/ordenCompraProveedor/vistaPrevia';

export default {
  name: 'ModalVistaPrevia',
  props: ['mostrarVistaPrevia'],
  data: () => ({
    dialog: false,
    headers: HEADERS_VISTA_PREVIA,
  }),
  computed: { ...mapState(['OrdenCompraProveedor']) },
  methods: {
    cancelar_orden_compra() {
      EventBus.$emit('cancelar_orden_compra');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
