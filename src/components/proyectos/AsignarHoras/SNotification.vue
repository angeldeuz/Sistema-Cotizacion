<template>
  <transition name="slide">
    <div class="snotification" v-if="show">
      <v-icon size="40">check_circle</v-icon>
      <p class="msg">{{msg}}</p>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
  },
  data() {
    return {
      show: false,
      msg: null
    };
  },
  methods: {
    showNotif(msg) {
      this.show = true;
      this.msg = msg;

      setTimeout(() => {
        this.show = false;
        this.msg = null;
      }, 2000);
    }
  }
};
</script>

<style lang="scss" scoped>
.snotification {
  display: flex;
  // align-items: center;
  position: fixed;
  top: 1rem;
  padding: 0.5rem;
  right: 1rem;
  background-color: #2ecc71;
  border-radius: 2px;
  border: 1px solid darken(#2ecc71, 5);
  z-index: 10000;
  width: 300px;
}

.msg {
  color: #155e34;
  font-weight: 700;
  align-self: center;
  padding-left: 1rem;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(20rem);
  opacity: 0;
}
</style>