<template>
  <transition-group
    name="list"
    tag="div"
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"
    @before-leave="beforeLeave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled"
  >
    <div
      v-for="(item, index) in items"
      :key="item.title"
      class="list-item"
      :style="getItemStyle(item.itemClass, item.subExpanded)"
      @click="handleItemClick(index)"
    >
     {{ item.title }}
    </div>
  </transition-group>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'List',

  setup (props, context) {
    const inTransition = ref(false)

    const items = reactive([
      {
        itemClass: 'main',
        title: '0',
        subExpanded: false
      },
      {
        itemClass: 'main',
        title: '1',
        subExpanded: false
      },
      {
        itemClass: 'main',
        title: '2',
        subExpanded: false
      },
      {
        itemClass: 'main',
        title: '3',
        subExpanded: false
      }
    ])

    const nextNum = ref(10)

    const handleItemClick = (index) => {
      // 利用transition动画节流（throttle）
      if (!inTransition.value) {
        switch (items[index].itemClass) {
          case 'main':
            if (items[index].subExpanded) {
              items.splice(index + 1, 1)

              items[index].subExpanded = false
            } else {
              items.splice(index + 1, 0, {
                itemClass: 'sub',
                title: nextNum.value.toString(),
                subExpanded: false
              })

              items[index].subExpanded = true
              nextNum.value++
            }
            break
          case 'sub':
            // items.splice(index, 1)
            // items[index - 1].isSubExpanded = false
            break
          default:
            console.log('error')
        }
      }
    }

    const getItemStyle = (itemClass, subExpanded) => {
      switch (itemClass) {
        case 'main':
          if (subExpanded) {
            return {
              margin: '6px 6px 0px 6px'
            }
          } else {
            return {
              margin: '6px'
            }
          }
        case 'sub':
          return {
            margin: '0 6px 6px 6px'
          }
        default:
          console.log('error')
      }
    }

    const beforeEnter = () => {
      inTransition.value = true
    }
    const afterEnter = () => {
      inTransition.value = false
    }
    const enterCancelled = () => {
      inTransition.value = false
    }
    const beforeLeave = () => {
      inTransition.value = true
    }
    const afterLeave = () => {
      inTransition.value = false
    }
    const leaveCancelled = () => {
      inTransition.value = false
    }

    return {
      items,
      handleItemClick,
      getItemStyle,

      beforeEnter,
      afterEnter,
      enterCancelled,
      beforeLeave,
      afterLeave,
      leaveCancelled
    }
  }
})

</script>

<style lang="scss" scoped>
.list-item {
  transition: all 0.3s ease;

  height: 30px;
  width: calc(100% - 12px);
  box-sizing: border-box;
  margin: 6px;
  // border-radius: 4px;
  color: black;
  background-color: white;

  text-align: center;
  // font-size: 24px;
  cursor: pointer;
  // fluent design elevation=16
  // box-shadow: 0 6.4px 14.4px 0 rgb(0 0 0 / 13%), 0 1.2px 3.6px 0 rgb(0 0 0 / 11%);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2) ;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
.list-leave-active {
  position: absolute;
}
</style>
