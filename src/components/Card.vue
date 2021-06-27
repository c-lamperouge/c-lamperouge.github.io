<template>
<div
  class="card"
>
  <div
    v-if="heading !== 'none'"
    class="heading"
  >
    <div
      v-if="icon !== 'none'"
      class="icon"
    >
      <i class="material-icons">{{ icon }}</i>
    </div>

    <div class="text">{{ heading }}</div>

    <slot name="heading"></slot>
  </div>

  <div
    v-if="!isOnlyHeading && heading !== 'none'"
    class="divider"
  ></div>

  <div
    v-if="!isOnlyHeading"
    class="content"
  >
    <slot></slot>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Card',

  props: {
    position: {
      type: String,
      default: 'static'
    },
    width: {
      type: String,
      default: '300px'
    },
    height: {
      type: String,
      default: '200px'
    },
    margin: {
      type: String,
      default: '0'
    },

    heading: {
      type: String,
      default: 'none'
    },
    icon: {
      type: String,
      default: 'none'
    },
    isOnlyHeading: {
      type: Boolean,
      default: false
    }
  },

  setup (props, context) {
    return {
    }
  }
})

</script>

<style lang="scss" scoped>
div.card {
  position: v-bind(position);

  width: v-bind(width);
  height: v-bind(height);
  margin: v-bind(margin);
  border-radius: 4px;
  // fluent design elevation=16
  box-shadow: 0 6.4px 14.4px 0 rgb(0 0 0 / 13%), 0 1.2px 3.6px 0 rgb(0 0 0 / 11%);

  font-size: 16px;
  background-color: white;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  div.heading {
    position: relative;

    height: 40px;
    box-sizing: border-box;

    color: black;
    background-color: white;
    user-select: none;
    overflow: hidden;

    display: flex;
    justify-content: center;
    align-items: center;

    div.icon {
      height: 100%;
      padding-left: 6px;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    div.text {
      padding-left: 6px;

      flex: 1;

      height: 100%;

      display: flex;
      align-items: center;
    }
  }

  div.divider {
    height: 2px;
    background-color: #EEEEEE;
  }

  div.content {
    padding: 6px;

    flex: 1;
  }
}
</style>
