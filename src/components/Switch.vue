<template>
  <label>
    <input
      type="checkbox"
      v-model="value"
    />
  </label>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'Switch',

  props: {
    modelValue: {
      type: Boolean,
      default: false
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
label {
  position: relative;

  width: 48px;
  height: 24px;
  border-radius: 12px;

  overflow: hidden;
  box-shadow: 0 6.4px 14.4px 0 rgb(0 0 0 / 13%), 0 1.2px 3.6px 0 rgb(0 0 0 / 11%);

  input[type="checkbox"] {
    visibility: hidden;
    cursor: pointer;

    &::before {
      content: '';

      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;

      visibility: visible;
      background-color: #DCDCDC;

      transition: background-color 0.3s ease-in-out 0s;
    }
    &:checked::before {
      background-color: #008272;
    }

    &::after {
      content: '';

      position: absolute;
      left: 4px;
      top: 4px;
      width: 16px;
      height: 16px;
      border-radius: 50%;

      visibility: visible;
      background-color: white;

      transition: transform 0.3s ease-in-out 0s;
    }
    &:checked::after {
      transform: translateX(24px);
    }
  }
}
</style>
