<template lang="pug">
#isometrico.pt-2
 h3 Isométrico
 v-switch(v-model="value" label="¿Cuenta con Isométrico?")
 input.input-file(
   v-if="value"
   ref="isometrico_file"
   type="file" @change="set_file"
   accept="image/jpeg,image/jpg,image/png,application/pdf,image/x-eps")
</template>

<script>
export default {
  name: 'Isometrico',
  data: () => ({
    value: true,
    file: [],
  }),
  methods: {
    set_file() {
      const file = this.$refs.isometrico_file.files[0];
      const self = this;
      self.file = file;
      const isometrico = { value: self.value, file: self.file };
      self.$store.commit('set_file_project', isometrico);
    },
  },
  watch: {
    value(value) {
      const self = this;
      let isometrico = { value: self.value, file: self.file };
      if (!value) {
        self.file = [];
        isometrico = { value: self.value, file: self.file };
      }
      self.$store.commit('set_file_project', isometrico);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-file {
  position: relative;
  outline: none;
  color: rgb(100,150,150);
  background: whitesmoke;
  padding: .3em 1em .3em 0;
}

.input-file::before {
  content:'seleccionar archivo';
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  padding: .5em .7em;
  color: white;
  background: #1976d2;
}

.input-file:hover::before {
  cursor: pointer;
}
</style>
