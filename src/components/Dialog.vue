<template>
  <transition name="card">
    <div
      class="card"
      :style="{
        width: width,
        height: height,
        margin: margin,
        padding: padding
      }"
      v-if="value"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'Card',

  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '320px'
    },
    height: {
      type: String,
      default: '180px'
    },
    margin: {
      type: String,
      default: '6px'
    },
    padding: {
      type: String,
      default: '6px'
    }
  },

  setup (props, context) {
    const value = computed({
      get: () => props.modelValue,
      set: val => {
        context.emit('update:modelValue', val)
      }
    })

    return {
      value
    }
  }
})

</script>

<style lang="scss" scoped>
div.card {
  border-radius: 4px;
  background-color: white;
  // fluent design elevation=16
  box-shadow: 0 6.4px 14.4px 0 rgb(0 0 0 / 13%), 0 1.2px 3.6px 0 rgb(0 0 0 / 11%);

  overflow: auto;
}

.card-enter-active {
  transition: transform 0.3s ease-out 0s, opacity 0.3s ease-out 0s;

  transform-origin: top;
  transform: perspective(800px) rotateX(0);
  opacity: 1;
}
.card-leave-active {
  transition: transform 0.3s ease-in 0s, opacity 0.3s ease-in 0s;

  transform-origin: top;
  transform: perspective(800px) rotateX(0);
  opacity: 1;
}
.card-enter-from,
.card-leave-to {
  perspective: 800;
  transform-origin: top;
  transform: perspective(800px) rotateX(40deg) translateY(-20%);
  opacity: 0;
}
</style>
