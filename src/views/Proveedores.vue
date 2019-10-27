<template>
    <v-layout aling-start>
                <v-flex>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Proveedores


                        </v-toolbar-title>
                        <v-divider
                        class="mx-2"
                        inset
                        vertical 
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Busqueda" single-line hide-details></v-text-field>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                                </v-card-title>
                    
                                <v-card-text>
                                <v-container grid-list-md>
                                    <v-layout wrap>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="razonSocial" label="Razon Social"></v-text-field>
                                    </v-flex>
                                     <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="diasCredito" label="Dias Credito"></v-text-field>
                                    </v-flex>
                                     <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="RFC" label="RFC"></v-text-field>
                                    </v-flex>
                                     <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="correo" label="Correo"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm6 md6>
                                        <v-text-field v-model="nombreVendedor" label="Nombre Vendedor"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12 sm12 md12 v-show="valida">
                                        <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v">

                                        </div>
                                    </v-flex>
                                    </v-layout>
                                </v-container>
                                </v-card-text>
                    
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                                    <v-btn color="blue darken-1" flat @click="guardar">Guardar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                        <v-dialog v-model="adModal" max-width="290">
                            <v-card>
                                <v-card-title class="headline" v-if="adAccion==1">Activar Item?</v-card-title>
                                <v-card-title class="headline" v-if="adAccion==2">Desactivar Item?</v-card-title>
                                <v-card-text>
                                    Estas a punto de 
                                    <span v-if="adAccion==1">Activar</span>
                                    <span v-if="adAccion==2">Desactivar</span>
                                    el item {{ adNombre }}
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="green darken-1" flat="flat" @click="activarDescativarCerrar">
                                        Cancelar
                                    </v-btn>
                                    <v-btn v-if="adAccion==1" color="orange darken-4" flat="flat" @click="activar">
                                        Activar
                                    </v-btn>
                                    <v-btn v-if="adAccion==2" color="orange darken-4" flat="flat" @click="desactivar">
                                        Desactivar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                </v-toolbar>
            <v-data-table
                :headers="headers"
                :items="proveedores"
                :search="search"
                class="elevation-1"
            >
                <template v-slot:items="props">
                    <td >
                        <v-icon small class="mr-2" @click="editItem(props.item)">
                        edit
                        </v-icon>
                        <!-- <template v-if="props.item.condicion">
                            <v-icon small @click="activarDesactivarMostrar(2,props.item)">
                                block
                            </v-icon>
                        </template>
                        <template v-else>
                            <v-icon small @click="activarDesactivarMostrar(1,props.item)">
                                check
                            </v-icon>
                        </template>      -->
                    </td>
                        <td>{{ props.item.razonSocial }}</td>
                        <td>{{ props.item.diasCredito }}</td>
                        <td>{{ props.item.rfc }}</td>
                        <td>{{ props.item.correo }}</td>
                        <td>{{ props.item.nombreVendedor }}</td>
                </template>
                <template v-slot:no-data>
                <v-btn color="primary" @click="listar">Resetear</v-btn>
                </template>
            </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                proveedores:[],
                dialog: false,
                headers: [
                    { text: 'Opciones', value: 'opciones', sortable: false },
                    { text: 'Razon Social', value: 'razonSocial' },
                    { text: 'Dias Credito', value: 'diasCredito' },
                    { text: 'RFC', value: 'RFC' ,sortable: false},
                    { text: 'Correo', value: 'correo' ,sortable: false},
                    { text: 'Nombre Vendedor', value: 'nombreVendedor' ,sortable: false},
                ],
                search: '',
                editedIndex: -1,
                id: '',
                razonSocial:'',
                diasCredito:'',
                RFC:'',
                correo:'',
                nombreVendedor:'',
                valida:0,
                validaMensaje:[],
                adModal:0,
                adAccion:0,
                adNombre:'',
                adId:''
            }
        },
        computed: {
            formTitle () {
            return this.editedIndex === -1 ? 'Nuevo Proveedor' : 'Actualizar Proveedor'
            }
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () {
            this.listar();
            this.select();
        },
        methods: {

            listar(){
                let me=this;
                // let header={"Authorization" : "Bearer " + this.$store.state.token};
                // let configuracion= {headers : header};
                axios.get('Proveedores/Listar').then(function(response){
                    //console.log(response);
                    me.proveedores=response.data;
                }).catch(function(error){
                    //console.log(error);
                });
            },
            select(){
                // let me=this;
                // let header={"Authorization" : "Bearer " + this.$store.state.token};
                // let configuracion= {headers : header};
                // var rolesArray=[];
                // axios.get('api/Roles/Select',configuracion).then(function(response){
                //     rolesArray = response.data
                //     rolesArray.map(function(x){
                //         me.roles.push({text: x.nombre, value: x.idrol});
                //     });
                // }).catch(function(error){
                //     //console.log(error);
                // });
            },
                editItem (item) {
                    // this.id=item.idProveedor;
                    this.razonSocial=item.razonSocial;
                    this.diasCredito=item.diasCredito;
                    this.RFC=item.RFC;
                    this.correo=item.correo;
                    this.nombreVendedor=item.nombreVendedor;
                    this.editedIndex=1;
                    this.dialog = true
                },
                close () {
                    this.dialog = false;
                    this.limpiar();
                },

                limpiar(){
                    this.id="";
                    this.razonSocial="";
                    this.diasCredito="";
                    this.RFC="";
                    this.correo="";
                    this.nombreVendedor="";
                    this.editedIndex=-1;
                },

                guardar () {
                    if(this.validar()){
                        return;
                    }
                    // let header={"Authorization" : "Bearer " + this.$store.state.token};
                    // let configuracion= {headers : header};
                    let me =this;
                    if (this.editedIndex > -1) {
                        axios.post('Proveedores/Actualizar',{
                            'idProveedor': me.id,
                            'razonSocial': me.razonSocial,
                            'diasCredito': me.diasCredito,
                            'RFC': me.RFC,
                            'nombreVendedor': me.nombreVendedor,
                            'correo': me.correo
                        }).then(function(response){
                            me.close();
                            me.listar();
                            me.limpiar();
                        }).catch(function(error){
                            console.log(error);
                        });
                    } else {
                        //codigo para guardar
                        let me=this;
                        axios.post('Proveedores/Crear',{
                            'razonSocial': me.razonSocial,
                            'diasCredito': me.diasCredito,
                            'RFC': me.RFC,
                            'nombreVendedor': me.nombreVendedor,
                            'correo': me.correo
                        }).then(function(response){
                            me.close();
                            me.listar();
                            me.limpiar();
                        }).catch(function(error){
                            console.log(error);
                        });
                    }
                },

                validar(){
                    this.valida=0;
                    this.validaMensaje=[];
                    if (this.RFC.length<3 || this.RFC.length >15 ){
                        this.validaMensaje.push("El empleado debe tener mas de 3 caracteres y menos de 15 caracteres.");
                    }
                    // if(!this.idrol){
                    //     this.validaMensaje.push("Seleccione un rol.")
                    // }
                    // if(!this.tipo_documento){
                    //     this.validaMensaje.push("Seleccione un tipo documento.")
                    // }

                    // if(!this.email){
                    //     this.validaMensaje.push("Ingrese el email del usuario.")
                    // }
                    if (this.validaMensaje.length){
                        this.valida=1;
                    }
                    return this.valida;
                },

                activarDesactivarMostrar(accion,item){
                    this.adModal=1;
                    this.adNombre=item.nombre;
                    this.adId=item.idusuario;
                    if(accion==1){
                        this.adAccion=1;
                    }
                    else if (accion ==2){
                       this.adAccion=2;
                    }
                    else{
                        this.adModal=0;
                    }
                },
                activarDescativarCerrar(){
                    this.adModal=0;
                },
                activar(){
                    let me=this;
                    let header={"Authorization" : "Bearer " + this.$store.state.token};
                    let configuracion= {headers : header};
                        axios.put('api/Usuarios/Activar/'+this.adId,{},configuracion).then(function(response){
                            me.adModal = 0;
                            me.adAccion=0;
                            me.adNombre = "";
                            me.id="";
                            me.listar();
                        }).catch(function(error){
                            console.log(error);
                        });
                },
                desactivar(){
                    let me=this;
                    let header={"Authorization" : "Bearer " + this.$store.state.token};
                    let configuracion= {headers : header};
                        axios.put('api/Usuarios/Desactivar/'+this.adId,{},configuracion).then(function(response){
                            me.adModal=0;
                            me.adAccion=0;
                            me.adNombre="";
                            me.id="";
                            me.listar();
                        }).catch(function(error){
                            console.log(error);
                        });
                }
        },
    }

</script>
