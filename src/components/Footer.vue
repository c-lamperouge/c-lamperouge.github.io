<template>
  <footer>
    <div>
      <slot></slot>
    </div>

    <span>&copy;{{ year }}</span>
  </footer>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Footer',

  setup (props, context) {
    const year = new Date().getFullYear()

    return {
      year
    }
  }
})

</script>

<style lang="scss" scoped>
footer {
  width: 100vw;
  height: 30px;
  box-sizing: border-box;
  padding: 0 1em;

  background-color: #EEEEEE;

  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    flex: 1;
  }
}
</style>
