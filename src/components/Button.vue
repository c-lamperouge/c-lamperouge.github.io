<template>
<button
  v-ripple="rippleConf"
>
  <slot></slot>
</button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'Button',

  props: {
    width: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: '36px'
    },
    margin: {
      type: String,
      default: '8px'
    },
    padding: {
      type: String,
      default: '0 16px'
    },
    color: {
      type: String,
      default: 'black'
    },
    backgroundColor: {
      type: String,
      default: '#F5F5F5'
    },
    rippleConf: {
      type: Object,
      default: () => ({
        backgroundColor: 'black',
        opacity: '0.3'
      })
    },
    diameter: {
      type: String,
      default: '36px'
    },
    isRound: {
      type: Boolean,
      default: false
    }
  },

  setup (props, context) {
    const getWidth = computed(() => {
      if (props.isRound) {
        return props.diameter
      } else return props.width
    })
    const getHeight = computed(() => {
      if (props.isRound) {
        return props.diameter
      } else return props.height
    })
    const getBorderRadius = computed(() => {
      if (props.isRound) {
        return '50%'
      } else return '4px'
    })

    return {
      getWidth,
      getHeight,
      getBorderRadius
    }
  }
})

</script>

<style lang="scss" scoped>
button {
  position: relative;
  overflow: hidden;

  width: v-bind(getWidth);
  height: v-bind(getHeight);
  margin: v-bind(margin);
  padding: v-bind(padding);
  border: none;
  border-radius: v-bind(getBorderRadius);

  font-size: 16px;
  color: v-bind(color);
  background-color: v-bind(backgroundColor);
  box-shadow: 0 6.4px 14.4px 0 rgb(0 0 0 / 13%), 0 1.2px 3.6px 0 rgb(0 0 0 / 11%);
  user-select: none;

  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
}
</style>
