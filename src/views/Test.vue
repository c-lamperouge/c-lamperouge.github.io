<template>
<div class="root">
  <my-header></my-header>

  <my-main>
    <my-card
      heading="heading"
      icon="help_outline"
    >
      this is a Card
    </my-card>

    <my-button>test</my-button>

    <div
      class="test"
      ref="testDiv"
    >
      <p v-for="(text, index) in textArray" :key="index">{{ text }}</p>
    </div>
    <button @click="handleTestClick">test</button>
  </my-main>

  <my-footer></my-footer>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Header from '../components/Header.vue'
import Main from '../components/Main.vue'
import Footer from '../components/Footer.vue'
import Card from '../components/Card.vue'
import Button from '../components/Button.vue'

import text from '../assets/testNovel.txt?raw'

export default defineComponent({
  name: 'Test',

  components: {
    'my-header': Header,
    'my-main': Main,
    'my-footer': Footer,
    'my-card': Card,
    'my-button': Button
  },

  setup (props, context) {
    const testDiv = ref<HTMLElement>()
    const textArray = text.split('\r\n')

    const handlePageLeft = (e: KeyboardEvent) => {
      console.log('page left')
      if (e.target) {
        const element = e.target as HTMLElement
        element.scrollLeft -= element.getBoundingClientRect().width
      }
    }
    const handlePageRight = (e: KeyboardEvent) => {
      console.log('page right')
      if (e.target) {
        const element = e.target as HTMLElement
        element.scrollLeft += element.getBoundingClientRect().width
      }
    }
    const handleTestClick = () => {
      if (testDiv.value) {
        console.log(`page counter: ${Math.round(testDiv.value.scrollWidth / testDiv.value.clientWidth)}`)
      }
    }

    return {
      testDiv,
      textArray,
      handlePageLeft,
      handlePageRight,
      handleTestClick
    }
  }
})

</script>

<style lang="scss" scoped>
div.root {
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
}

div.test {
  height: 300px;
  overflow: auto;

  background-color: #eee;

  column-width: calc(100vw - 20px);
  column-gap: 0;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;

  p {
    text-indent: 2em;
    scroll-snap-align: start;
  }
}
</style>
