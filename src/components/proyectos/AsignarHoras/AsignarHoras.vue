<template>
  <div class="asignarhoras">
    <!-- {{datos}} -->
    <v-layout row justify-center>
      <v-dialog v-model="mostrarAH" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card class="card" v-if="cotizacion">
          <v-toolbar dark color="primary">
            <v-btn @click="cerrar()" icon dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>
              <span class="title">Asignar Horas</span>
            </v-toolbar-title>
          </v-toolbar>
          <div class="container">
            <div class="scard">
              <div class="sinput">
                <label for>Cotizacion:</label>
                <input type="text" v-model="cotizacion[0].idCotizacion" disabled />
              </div>
              <div class="sinput">
                <label for>Empleado:</label>
                <s-select
                  :disabled="cotizacion[0].horasPlaneadas != 0"
                  ref="empsel"
                  v-model="empleado"
                  request="Plantillas/Listar"
                  valueKey="idPlantilla"
                  labelKey="nombre"
                ></s-select>
              </div>
              <div class="sinput">
                <label for>Horas Asignadas:</label>
                <input
                  v-model="horasAsignadas"
                  type="text"
                  :disabled="cotizacion[0].horasPlaneadas != 0"
                />
              </div>
            </div>
            <div class="scard">
              <table class="stable">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Total ($)</th>
                    <th>Fecha</th>
                    <th>Estatus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{cotizacion[0].nombre}}</td>
                    <td>{{cotizacion[0].total}}</td>
                    <td>{{cotizacion[0].fechaRegistro}}</td>
                    <td>{{cotizacion[0].estatus}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="scard">
              <button
                class="sbutton"
                @click="asignar()"
                v-if="cotizacion[0].horasPlaneadas == 0"
                :disabled="horasAsignadas == null || empleado == null"
              >Asignar</button>
              <button class="sbutton" @click="fmodal = true" v-else :disabled="cotizacion[0].horasFinales != 0">Finalizar</button>
            </div>
          </div>
        </v-card>
        <transition name="fade">
          <div class="overlay" v-if="fmodal">
            <div class="overlay__modal">
              <div class="sinput">
                <label for>Horas Finales:</label>
                <input v-model="horasFinales" type="text" />
              </div>

              <div class="overlay__btn-group">
                <button class="overlay__btn overlay__btn--neutral" @click="fmodal = false">Cancelar</button>
                <button class="overlay__btn overlay__btn--success" @click="finalizar()">Finalizar</button>
              </div>
            </div>
          </div>
        </transition>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import SSelect from "./SSelect";
import SNotification from "./SNotification";

export default {
  name: "AsignarH",
  props: ["mostrarAH", "cotizacion"],
  data() {
    return {
      horasAsignadas: null,
      horasFinales: null,
      empleado: null,
      fmodal: false
    };
  },
  methods: {
    asignar() {
      this.$http
        .post("Cotizaciones/AsignarCotizacion", {
          idCotizacion: this.cotizacion[0].idCotizacion,
          horasPlaneadas: this.horasAsignadas,
          idPlantilla: this.empleado
        })
        .then(response => {
          this.$emit('shown', 'Horas asignadas con exito');
          this.$emit("cerrar_modal");
        });
    },
    finalizar() {
      this.$http
        .post("Cotizaciones/FinalizarCotizacion", {
          idCotizacion: this.cotizacion[0].idCotizacion,
          horasFinales: this.horasFinales
        })
        .then(response => {
          this.$emit('shown', 'Finalizado con exito');
          this.$emit("cerrar_modal");
        });
    },
    cerrar() {
      this.$emit("cerrar_modal");
    }
  },
  watch: {
    mostrarAH: function(newVal) {
      if (newVal == true) {
        if (this.cotizacion[0].horasPlaneadas > 0) {
          this.empleado = this.cotizacion[0].idPlantilla;
          this.horasAsignadas = this.cotizacion[0].horasPlaneadas;
        } else {
          this.empleado = null;
          this.horasAsignadas = null;
          this.horasFinales = null;
          this.fmodal = false;
          this.$refs["empsel"].clear();
        }
      }
    }
  },
  components: {
    SSelect,
    SNotification
  }
};
</script>

<style lang="scss" scoped>
// .container {
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   height: 70vh;
// }

.card {
  background-color: #f3f3f3;
}

.scard {
  display: flex;
  font-size: 16px;
  padding-bottom: 3rem;
  color: #363636;
  border-bottom: 1px solid rgb(199, 199, 199);

  &:nth-child(2) {
    border-bottom: none;
    margin-top: 3rem;
  }

  &:nth-child(3) {
    // justify-content: space-between;
    flex-flow: row-reverse;
  }
}

.sinput {
  display: flex;
  flex: 1;
  align-items: center;

  & label {
    margin-right: 2rem;
  }

  & input {
    border: 1px solid rgb(219, 219, 219);
    border-radius: 2px;
    outline: none;
    padding: 0.2rem 1rem;
    background-color: #fff;
    transition: all 0.2s;

    &:disabled {
      background-color: rgb(219, 219, 219);
      border: 1px solid rgb(189, 188, 206);
    }

    &:focus {
      border: 1px solid rgb(189, 188, 206);
    }
  }
}

.stable {
  // margin-top: -8rem;
  border-collapse: collapse;
  width: 100%;
  background-color: rgb(255, 255, 255);

  th,
  td {
    padding: 0.5rem 1rem;
    border: 1px solid rgb(219, 219, 219);
  }
}

.sbutton {
  color: #fff;
  background-color: #3498db;
  border: 1px solid darken(#3498db, 5);
  border-radius: 2px;
  padding: 0.5rem 2rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: #91bbd6;
    border: 1px solid darken(#91bbd6, 5);

    &:hover {
      background-color: #91bbd6;
    }
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0px 2px 2px 1px rgba(51, 51, 51, 0.267);
  }

  &:hover {
    background-color: darken(#3498db, 5);
  }
}

.overlay {
  background-color: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9998;

  &__modal {
    // animation: modalshow .4s ease-in;
    flex-direction: column;
    padding: 2rem;
    border-radius: 2px;
    display: flex;
    // margin-top: 10rem;
    position: relative;
    // height: auto;
    background-color: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(51, 51, 51, 0.596);
    z-index: 9999;
  }

  &__btn-group {
    display: flex;
    background-color: #00ff00;
    margin: 0 -2rem;
    margin-top: 2rem;
    margin-bottom: -2rem;
    flex: 1;
    // width: 100%;
  }

  &__btn {
    flex: 1;
    font-size: 14px;
    padding: 0.6rem;

    &--success {
      background-color: #2ecc71;
      color: #eee;
      transition: all 0.2s;

      &:focus {
        outline: none;
      }

      &:hover {
        background-color: darken(#2ecc71, 5);
      }
    }

    &--neutral {
      background-color: #ecf0f1;
      // color: #eee;
      transition: all 0.2s;

      &:focus {
        outline: none;
      }

      &:hover {
        background-color: darken(#ecf0f1, 5);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(-20rem);
  opacity: 0;
}
</style>