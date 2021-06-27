<template>
<router-view></router-view>

<my-aside>
  <my-card
    class="aside-item"
    position="relative"
    width="auto"
    height="40px"
    margin="6px"
    heading="Test"
    icon="create"
    :isOnlyHeading="true"
    v-ripple="{
      backgroundColor: 'black',
      opacity: '0.3'
    }"
    @click="handleTestClick"
  ></my-card>

  <my-card
    class="aside-item"
    position="relative"
    width="auto"
    height="40px"
    margin="6px"
    heading="Home"
    icon="home"
    :isOnlyHeading="true"
    v-ripple="{
      backgroundColor: 'black',
      opacity: '0.3'
    }"
    @click="handleRegExpClick"
  ></my-card>

  <my-card
    class="aside-item"
    position="relative"
    width="auto"
    height="40px"
    margin="6px"
    heading="Help"
    icon="help_outline"
    :isOnlyHeading="true"
    v-ripple="{
      backgroundColor: 'black',
      opacity: '0.3'
    }"
  ></my-card>
</my-aside>
</template>

<script lang="ts">
import { defineComponent, ref, provide, readonly } from 'vue'
import { useRouter } from 'vue-router'
import Aside from './components/Aside.vue'
import Card from './components/Card.vue'

export default defineComponent({
  name: 'App',

  components: {
    'my-aside': Aside,
    'my-card': Card
  },

  setup: (props, context) => {
    // provide数据流：isAside
    const isAside = ref(false)
    const updateIsAside = (val: boolean) => {
      isAside.value = val
    }
    provide('isAside', readonly(isAside))
    provide('updateIsAside', updateIsAside)

    const router = useRouter()
    const handleTestClick = () => {
      router.push('/')
      updateIsAside(false)
    }

    const handleRegExpClick = () => {
      router.push('/Home')
      updateIsAside(false)
    }

    return {
      handleTestClick,
      handleRegExpClick
    }
  }
})
</script>

<style lang="scss">
/* Edge浏览器历史记录的滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-corner {
  background: none;
}
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #8D8D8D;
}
::-webkit-scrollbar-track {
  opacity: 0;
}

// 字体方面，英文统一用等宽字体Consolas，中文统一用微软雅黑
// Consolas字体宽度等于font-size乘以0.55，微软雅黑的中文部分宽度等于font-size乘以1。
// 可以直接通过font-size样式计算出实际的显示宽度。
// 这对后续的光标、位置之类的处理可能有用。
body {
  margin: 0;

  font-family: Consolas, "Microsoft Yahei", monospace, sans-serif;

  // 移动端适配
  -webkit-tap-highlight-color: transparent;
}

.aside-item {
  &:hover {
    cursor: pointer;
  }
}
</style>
