<template>
  <div class="sselect">
    <div class="sselect__selected">
      <p :class="{'p-dis' : disabled}" @click="test()" v-if="!toggle">{{queryStuff}}</p>
    </div>

    <input
      ref="inp_query"
      class="sselect__inp"
      v-model="queryStr"
      @focus="toggleDrop($event.target)"
      @blur="validate($event)"
      autocomplete="asass"
      :disabled="disabled"
    />

    <div class="sselect__icons" v-if="!disabled">
      <div class="sselect__icons--group">
        <span class="sselect__icons--clear" @mousedown="clear()">
          <i class="fas fa-times"></i>
        </span>
        <span class="sselect__icons--dropdown" :class="{'threesixty' : toggle}">
          <i class="fas fa-chevron-down"></i>
        </span>
      </div>
    </div>

    <transition name="dropdown" v-if="toggle">
      <div class="sselect__dropdown">
        <div class="sselect__list" :class="{'sselect__list--top' : !isTop }">
          <ul>
            <li
              class="sselect__item"
              v-for="(item, i) in filterList"
              :key="i"
              @mousedown="setValue(item)"
              :class="{'selitem' : selectedLabel == setInputValue(item)}"
            >{{setInputValue(item)}}</li>
            <li
              class="sselect__item sselect__item--zero"
              v-if="filterList.length == 0"
            >Sin Resultados</li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "selected"
  },
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    options: {
      type: Array,
      default: null
    },
    valueKey: {
      type: String,
      default: null
    },
    labelKey: {
      type: String,
      default: null
    },
    request: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      invalid: false,
      toggle: false,
      isTop: false,
      realOptions: [],
      queryStr: "",
      selectedLabel: ""
    };
  },
  methods: {
    test() {
      this.$refs.inp_query.focus();
    },
    validate() {
      this.toggle = false;
      this.queryStr = this.selectedLabel;
    },
    toggleDrop(e) {
      let totalH = document.documentElement.clientHeight;
      let spaceAvail = totalH - e.getBoundingClientRect().bottom;
      let spaceReq =
        this.realOptions.length <= 5 ? this.realOptions.length * 35 : 175;
      this.isTop = spaceAvail < spaceReq ? false : true;

      this.queryStr = "";
      this.toggle = true;
    },
    setValue(e) {
      this.$emit("selected", this.setFormValue(e));
      this.selectedLabel = this.setInputValue(e);
    },
    setFormValue(val) {
      if (typeof val == "object") {
        let temp = this.valueKey.split(",");
        let value = "";

        temp.forEach(key => {
          value += val[key.trim()];
          value += " ";
        });

        return value.trim();
      }

      return val;
    },
    setInputValue(val) {
      let output = val;

      if (typeof val == "object") {
        let temp = this.labelKey.split(",");
        let value = "";

        temp.forEach(key => {
          value += val[key.trim()];
          value += " ";
        });

        output = value;
      }
      return output;
    },
    clear() {
      this.$emit("selected", null);
      this.selectedLabel = null;
      this.queryStr = null;
    }
  },
  computed: {
    filterList: function() {
      if (typeof this.queryStr == "undefined" || this.queryStr == null) return;

      if (this.valueKey != null) {
        return this.realOptions.filter(obj => {
          return Object.keys(obj).some(key => {
            console.log(obj[key]);
            return obj[key]
              .toString()
              .toLowerCase()
              .includes(this.queryStr.toLowerCase());
          });
        });
      }

      return this.realOptions.filter(val => {
        return val.toLowerCase().includes(this.queryStr.toLowerCase());
      });
    },
    queryStuff: function() {
      if (this.realOptions == null) return;

      for (let [key, value] of Object.entries(this.realOptions)) {
        if (value[this.valueKey] == this.value) {
          let output = "";

          if (this.valueKey != null) {
            let temp = this.labelKey.split(",");
            temp.forEach(key => {
              output += value[key.trim()];
              output += " ";
            });
          }

          return output.trim();
        }
      }
    }
  },
  created() {
    console.log("UPDATED");
    this.$http.get(this.request).then(response => {
      this.realOptions = response.data;
    });
  }
};
</script>


<style lang="scss" scoped>
.sselect {
  display: flex;
  flex-direction: column;

  &__selected {
    position: relative;

    p {
      position: absolute;
      // padding: .7rem;
      top: 0.3rem;
      left: 0.7rem;
      font-size: 16px;
      width: 80%;
      background-color: #fff;
    }
  }

  &__inp {
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

  &__icons {
    position: relative;
    margin-left: auto;
    padding-right: 4rem;
    z-index: 48;

    &--group {
      display: flex;
      font-size: 14px;
      position: absolute;
      color: rgba(#333, 0.6);
      right: 0.6rem;
      top: -1.8rem;
    }

    &--clear {
      margin-right: 0.5rem;
      cursor: pointer;
    }

    &--dropdown {
      transform: rotate(0);
      transition: all 0.2s;
    }
  }

  &__dropdown {
    position: relative;
    animation: show 0.2s;
    width: 100%;
  }

  &__list {
    position: absolute;
    max-height: 17.5rem;
    overflow-y: auto;
    background-color: #fff;
    border: 1px solid rgb(219, 219, 219);
    border-top: none;
    // z-index: 4999;
    font-family: inherit;
    font-size: 14px;
    width: 100%;

    ul {
      list-style: none;
      padding: 0;
    }

    &--top {
      border-top: 1px solid rgb(219, 219, 219);
      border-bottom: none;
      // bottom: 35px;
    }

    &::-webkit-scrollbar {
      width: 1rem;
    }

    &::-webkit-scrollbar-track {
      background: rgb(219, 219, 219);
    }

    &::-webkit-scrollbar-thumb {
      background: #333;

      &:hover {
        background: lighten(#333, 5);
      }
    }
  }

  &__item {
    padding: 0.8rem;
    cursor: pointer;

    &:hover {
      background-color: rgb(219, 219, 219);
    }

    &--zero {
      cursor: unset;
    }
  }
}

.threesixty {
  color: rgba(#333, 0.7);
  transform: rotate(180deg);
}

.selitem {
  background-color: rgb(219, 219, 219);
}

@keyframes show-d {
  0% {
    transform: scaleY(0);
    opacity: 0;
  }
  100% {
  }
}

.dropdown-enter-active {
  animation: show-d 0.2s;
}
.dropdown-leave-active {
  animation: show-d 0.2s reverse;
}

.p-dis {
  background-color: rgb(219, 219, 219) !important;
}
</style>