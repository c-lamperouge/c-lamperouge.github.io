<template>
  <teleport to="body">
    <transition name="overlay">
      <div
        class="overlay"
        v-show="value"
        @click="value = false"
      ></div>
    </transition>

    <transition name="aside">
      <aside
        :style="{
          width: width,
        }"
        v-show="value"
      >
        <header>
          <slot name="header">
            <div
              :style="{
                textAlign: 'center'
              }"
            >
              <h3
                :style="{
                  margin: '6px',
                  fontSize: '18px'
                }"
              >
                Aside
              </h3>
            </div>
          </slot>
        </header>

        <main>
          <slot></slot>
        </main>
      </aside>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue'

export default defineComponent({
  name: 'Aside',
  components: {
  },

  props: {
    width: {
      type: String,
      default: '300px'
    },
    titleBar: {
      type: String,
      default: 'aside'
    }
  },

  setup (props, context) {
    const isAside = inject('isAside', ref(false))
    const updateIsAside: any = inject('updateIsAside')
    const value = computed({
      get: () => isAside.value,
      set: val => updateIsAside(val)
    })

    return {
      value
    }
  }
})

</script>

<style lang="scss" scoped>
div.overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}
.overlay-enter-active {
  transition: opacity 0.3s ease-out 0s;
  opacity: 1;
}
.overlay-leave-active {
  transition: opacity 0.3s ease-in 0s;
  opacity: 1;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

aside {
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  max-width: 75vw;

  border: none;
  background-color: white;
  // fluent design elevation=16
  box-shadow: 0 6.4px 14.4px 0 rgb(0 0 0 / 13%), 0 1.2px 3.6px 0 rgb(0 0 0 / 11%);

  overflow: auto;
  display: flex;
  flex-direction: column;

  header {
    height: 42px;
    box-sizing: border-box;
    border-bottom: 2px solid teal;
    user-select: none;
  }

  main {
    // margin: 10px;

    flex: 1;

    overflow: auto;
  }
}
.aside-enter-active {
  transition: transform 0.3s ease-out 0s;
  transform: translateX(0);
}
.aside-leave-active {
  transition: transform 0.3s ease-in 0s;
  transform: translateX(0);
}
.aside-enter-from,
.aside-leave-to {
  transform: translateX(-100%);
}
</style>
