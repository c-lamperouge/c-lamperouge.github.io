<template>
  <header>
    <my-icon-button
      theme="dark"
      margin="6px"
      @click="updateIsAside(true)"
    >
      <i class="material-icons">menu</i>
    </my-icon-button>

    <div class="slot">
      <slot>
        title
      </slot>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import IconButton from './IconButton.vue'

export default defineComponent({
  name: 'Header',

  components: {
    'my-icon-button': IconButton
  },

  setup (props, context) {
    const isAside = inject('isAside', ref(false))
    const updateIsAside = inject('updateIsAside') as (value: boolean) => {}

    return {
      isAside,
      updateIsAside
    }
  }
})

</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 42px;

  color: white;
  background-color: teal;
  // fluent design elevation=16
  box-shadow: 0 6.4px 14.4px 0 rgb(0 0 0 / 13%), 0 1.2px 3.6px 0 rgb(0 0 0 / 11%);

  overflow: hidden;

  display: flex;
  align-items: center;

  div.slot {
    flex: 1;

    height: 100%;

    display: flex;
    align-items: center;
  }
}
</style>
