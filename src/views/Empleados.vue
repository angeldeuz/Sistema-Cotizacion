<template>
    <v-layout aling-start>
                <v-flex>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Empleados</v-toolbar-title>
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
                                    <v-flex xs12 sm12 md12>
                                        <v-text-field v-model="empleado" label="Empleado"></v-text-field>
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
                :items="empleados"
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
                        <td>{{ props.item.empleado }}</td>
                        <td>{{ props.item.estatus }}</td>
                        <td>{{ props.item.fechaRegistro }}</td>
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
                empleados:[],
                dialog: false,
                headers: [
                    { text: 'Opciones', value: 'opciones', sortable: false },
                    { text: 'Empleado', value: 'empleado' },
                    { text: 'Estatus', value: 'Estatus' },
                    { text: 'Fecha de Registro', value: 'fechaRegistro' ,sortable: false},
                ],
                search: '',
                editedIndex: -1,
                id: '',
                empleado:'',
                idEstus:'',
                fechaRegistro:'',
                estatus:'',
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
            return this.editedIndex === -1 ? 'Nuevo empleado' : 'Actualizar empleado'
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
                axios.get('Empleadoes/Listar').then(function(response){
                    //console.log(response);
                    me.empleados=response.data;
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
                    this.id=item.idEmpleado;
                    console.log(this.id);
                    this.empleado=item.empleado;
                    this.editedIndex=1;
                    this.dialog = true
                },
                close () {
                    this.dialog = false;
                    this.limpiar();
                },

                limpiar(){
                    this.id="";
                    this.empleado="";
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
                        axios.post('Empleadoes/Actualizar',{
                            'idEmpleado': me.id,
                            'empleado': me.empleado,
                            'idEstatus': 1
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
                        axios.post('Empleadoes/Crear',{
                            'empleado': me.empleado,
                            'idEstatus': 1
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
                    if (this.empleado.length<3 || this.empleado.length >50 ){
                        this.validaMensaje.push("El empleado debe tener mas de 3 caracteres y menos de 50 caracteres.");
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
