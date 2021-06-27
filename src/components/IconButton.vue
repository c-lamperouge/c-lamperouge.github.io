<template>
  <div
    class="icon-button"
    :class="[iconButtonTheme]"
    :style="{
      width: (parseInt(fontSize) * 1.5).toString() + 'px',
      height: (parseInt(fontSize) * 1.5).toString() + 'px',
      margin: margin,
      padding: padding,
      fontSize: fontSize
    }"
    v-ripple="rippleConf"
  >
    <i class="material-icons">
      <slot>help_outline</slot>
    </i>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'IconButton',
  // components: {
  // },

  props: {
    margin: {
      type: String,
      default: '0'
    },
    padding: {
      type: String,
      default: '0'
    },
    fontSize: {
      type: String,
      default: '24px'
    },
    theme: {
      type: String,
      default: 'light'
    }
  },

  setup (props, context) {
    const iconButtonTheme = computed(() => {
      switch (props.theme) {
        case 'light':
          return 'light-theme'
        case 'dark':
          return 'dark-theme'
        default:
          return 'light-theme'
      }
    })
    const rippleConf = computed(() => {
      switch (props.theme) {
        case 'light':
          return {
            backgroundColor: 'black',
            opacity: '0.3'
          }
        case 'dark':
          return {
            backgroundColor: 'white',
            opacity: '0.4'
          }
        default:
          return {
            backgroundColor: 'black',
            opacity: '0.3'
          }
      }
    })

    return {
      iconButtonTheme,
      rippleConf
    }
  }
})

</script>

<style lang="scss" scoped>
$theme-color: #008272;
$light-theme-hover-background-color: rgba(0, 0, 0, 0.1);
$dark-theme-hover-background-color: rgba(255, 255, 255, 0.2);

div.icon-button {
  position: relative;
  overflow: hidden;

  border-radius: 50%;

  user-select: none;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.3s linear 0s;

  &:hover {
    cursor: pointer;
  }
}

div.light-theme {
  color: $theme-color;
  background-color: white;

  &:hover {
    background-color: $light-theme-hover-background-color;
  }
}
div.dark-theme {
  color: white;
  background-color: $theme-color;

  &:hover {
    background-color: $dark-theme-hover-background-color;
  }
}
</style>
