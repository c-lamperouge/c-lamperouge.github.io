<template>
<div>
  <Header>Home</Header>

  <Main>

  </Main>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '../components/Header.vue'
import Main from '../components/Main.vue'

export default defineComponent({
  name: 'Home',

  components: {
    Header,
    Main
  },

  setup (props, ctx) {
    return {
    }
  }
})

</script>

<style lang="scss" scoped>
div {
  width: 100vw;
  height: 100vh;

  font-size: 16px;

  display: flex;
  flex-direction: column;

  pre {
    margin: 0;
  }
}
</style>
