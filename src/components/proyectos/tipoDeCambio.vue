<template>
    <div id="TipoDeCambio">
        <h3>TipoDeCambio</h3>
        <v-flex xs6>
            <v-combobox
            v-model="moneda"
            :items="monedas"
            label="Selecciona una moneda"
            item-text="moneda"
            item-value="id"
            ></v-combobox>
        </v-flex>
        <template v-if="moneda.moneda == 'USD'">
            <v-flex xs6>
                <v-text-field
                    v-model="moneda.valor"
                    @input="valorMoneda"
                    label="Valor de Tipo de Cambio"
                    placeholder="Ingresa el valor de Tipo de Cambio"
                    type="number"
                    step="0.1"
                    min="1"
                ></v-text-field>
            </v-flex>
        </template>
    </div>
</template>

<script>
export default {
  name: 'TipoDeCambio',
  data: () => ({
    monedas: [{ id: 1, moneda: 'MXN', valor: 1.00 }, { id: 2, moneda: 'USD', valor: 19.07 }],
    moneda: { id: 1, moneda: 'MXN', valor: 1.00 },
  }),
  methods: {
    valorMoneda() {
      const self = this;
      self.$store.commit('set_valor_moneda', self.moneda.valor);
      console.log(self.moneda.valor);
    },
  },
  watch: {
    moneda() {
      const self = this;
      self.$store.commit('set_moneda', self.moneda);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
