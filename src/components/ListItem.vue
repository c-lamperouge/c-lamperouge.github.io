<template>
  <my-card
    :width="width"
    :height="height"
    padding="0"
  >
    <div
      class="title-bar"
      v-ripple="{
        backgroundColor: 'black',
        opacity: '0.3'
      }"
    >
      <div
        class="icon"
        :style="{
          margin: iconMargin,
          padding: iconPadding,
          fontSize: iconSize
        }"
      >
        <slot name="icon"></slot>
      </div>

      <div class="content">
        <slot name="title">list item title</slot>
      </div>
    </div>

    <slot></slot>
  </my-card>
</template>

<script>
import { defineComponent, computed } from 'vue'
import Card from './Card.vue'

export default defineComponent({
  name: 'ListItem',
  components: {
    'my-card': Card
  },

  props: {
    subExpanded: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: 'auto'
    },
    height: {
      type: String,
      default: 'auto'
    },
    iconMargin: {
      type: String,
      default: '0'
    },
    iconPadding: {
      type: String,
      default: '0 6px'
    },
    iconSize: {
      type: String,
      default: '24px'
    },
    itemClass: {
      type: String,
      default: 'main'
    }
  },

  setup (props, context) {
    const subExpanded = computed({
      get: () => props.subExpanded,
      set: val => {
        context.emit('update:subExpanded', val)
      }
    })

    const handleTitleBarClick = () => {
      subExpanded.value = !subExpanded.value
    }

    return {
      handleTitleBarClick
    }
  }
})

</script>

<style lang="scss" scoped>
div.title-bar {
  height: 40px;

  color: black;
  background-color: white;
  user-select: none;
  // fluent design elevation=16
  // box-shadow: 0 6.4px 14.4px 0 rgb(0 0 0 / 13%), 0 1.2px 3.6px 0 rgb(0 0 0 / 11%);

  // 移动端适配
  -webkit-tap-highlight-color: transparent;

  position: relative;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    // background-color: #F6F6F6;
  }

  div.icon {
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  div.content {
    flex: 1;

    height: 100%;

    display: flex;
    align-items: center;
  }

  div.arrow {
    height: 100%;
    box-sizing: border-box;
    padding: 0 6px;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: transform 0.3s ease 0s;
  }
  div.arrow.subExpanded {
    transform: rotateZ(180deg);
  }
}
</style>
