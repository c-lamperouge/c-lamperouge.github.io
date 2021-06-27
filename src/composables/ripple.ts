// 自定义的v-ripple指令
// ripple动画由两个阶段组成，一是圆形div的缩放动画，二是圆形div的淡出动画
// 如果鼠标按下不松开，则会停留在一阶段动画，等到鼠标抬起，再播放二阶段动画
import { gsap } from 'gsap'

const ripple = {
  // beforeMount (el: HTMLElement, binding) {
  //   // 默认使用ripple指令的元素拥有以下的样式
  //   if (el.style.position === 'static') {
  //     el.style.position = 'relative'
  //   }

  //   // el.style.overflow = 'hidden'
  // },
  mounted (el: HTMLElement, binding: any) {
    // binding检测
    if (!binding.value.backgroundColor || !binding.value.opacity) {
      throw Error('v-ripple指令的binding值出错！')
    }
    // 初始化ripple div
    const ripple = document.createElement('div')
    gsap.set(ripple, {
      position: 'absolute',
      width: '20px',
      height: '20px',
      backgroundColor: binding.value.backgroundColor,
      opacity: binding.value.opacity,
      borderRadius: '50%',
      transform: 'scale(0)'
    })

    // 初始化ripple动画
    let currentAnimation = 'none'
    let currentMouse = 'up'

    // scale animation
    const scaleAnimation = (e: any) => {
      // 确定ripple的位置
      let left = 0
      let top = 0
      // 如果是事件对象是el（如button），直接用e.offset即可
      // 如果是div，点击div的子元素时offset的srcElement不是el
      // 需要计算left和top的值
      if (e.target === el) {
        left = e.offsetX
        top = e.offsetY
      } else {
        left = e.pageX - window.scrollX - el.getBoundingClientRect().x
        top = e.pageY - window.scrollY - el.getBoundingClientRect().y
      }
      // 确定ripple缩放比例，需要计算半径
      const width = parseFloat(window.getComputedStyle(el).width)
      const height = parseFloat(window.getComputedStyle(el).height)
      let scale = 0
      // 以盒模型的中心为原点，可以将盒模型分成4个象限，点击落在那个象限内，则半径应为对角线位置顶点与落点的距离
      if (left <= (width / 2)) {
        if (top <= (height / 2)) {
          // 第二象限
          scale = Math.sqrt((width - left) ** 2 + (height - top) ** 2) / 10
        } else {
          // 第三象限
          scale = Math.sqrt((width - left) ** 2 + top ** 2) / 10
        }
      } else {
        if (top <= (height / 2)) {
          // 第一象限
          scale = Math.sqrt(left ** 2 + (height - top) ** 2) / 10
        } else {
          // 第四象限
          scale = Math.sqrt(left ** 2 + top ** 2) / 10
        }
      }
      // 将ripple的中心移至鼠标位置，为scale动画做准备
      gsap.set(ripple, {
        left: String(left) + 'px',
        top: String(top) + 'px',
        x: '-50%',
        y: '-50%'
      })
      // 开始动画
      gsap.to(ripple, {
        scale: scale,
        duration: 0.5,
        ease: 'power1.out',
        onComplete: () => {
          currentAnimation = 'fadeOut'
          // 如果在缩放动画结束前鼠标已经抬起，则开始淡出动画
          if (currentMouse === 'up' || currentMouse === 'leave') {
            fadeOutAnimation()
          }
        }
      })
    }
    // fadeOut animation
    const fadeOutAnimation = () => {
      gsap.to(ripple, {
        opacity: 0,
        duration: 0.25,
        ease: 'linear',
        onComplete: () => {
          gsap.set(ripple, {
            transform: 'scale(0)',
            opacity: binding.value.opacity,
            onComplete: () => {
              currentAnimation = 'none'
            }
          })
        }
      })
    }
    // integrated animation
    // const integratedAnimation = (e: MouseEvent) => {
    //   gsap.set(ripple, {
    //     left: String(e.offsetX) + 'px',
    //     top: String(e.offsetY) + 'px',
    //     x: '-50%',
    //     y: '-50%',
    //     onComplete: () => {
    //       gsap.to(ripple, {
    //         scale: scale,
    //         duration: 0.5,
    //         ease: 'power1.out',
    //         onComplete: () => {
    //           currentAnimation = 'fadeOut'
    //           // 如果在缩放动画结束前鼠标已经抬起，则开始淡出动画
    //           if (currentMouse === 'up') fadeOutAnimation()
    //         }
    //       })
    //     }
    //   })
    // }

    // 添加事件监听
    el.addEventListener('mousedown', (e) => {
      currentMouse = 'down'
      // 防止重复触发动画
      if (currentAnimation !== 'none') return
      // 切换动画阶段
      currentAnimation = 'scale'
      scaleAnimation(e)
    })
    el.addEventListener('mouseup', () => {
      currentMouse = 'up'
      // 鼠标抬起前，如果第一个波纹动画已经结束，则播放第二个淡出动画
      if (currentAnimation === 'fadeOut') fadeOutAnimation()
    })
    el.addEventListener('mouseleave', () => {
      if (currentAnimation === 'scale') {
        currentMouse = 'leave'
      } else {
        fadeOutAnimation()
      }
    })

    // el.addEventListener('contextmenu', () => {
    //   console.log('contextMenu event')
    // })

    // el.addEventListener('blur', () => {
    //   fadeOutAnimation()
    // })

    // 将ripple添加至父元素
    el.appendChild(ripple)
  }
}

export default ripple
