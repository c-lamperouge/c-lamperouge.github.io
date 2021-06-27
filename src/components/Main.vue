<template>
<main>
  <slot></slot>
</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Main'
})

</script>

<style lang="scss" scoped>
main {
  flex: 1;

  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;

  overflow: auto;

}
</style>
