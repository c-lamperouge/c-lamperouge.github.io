<template>
  <div
    class="editor"
  >
    <div
      class="line"
      contenteditable="true"
      spellcheck="false"
      v-for="(line, index) of lines"
      :key="index"
      :ref="setLineRef"
      @focus="hanldeFocus(index)"
      @input="handleInput(index)"
      @compositionstart="handleCompositionstart()"
      @compositionend="handleCompositionend(index)"
      @keydown.enter.prevent="handlePressEnter()"
      @keydown.delete="handlePressDelete($event)"
      @keydown.up="handlePressUp($event)"
      @keydown.down="handlePressDown($event)"
      @keydown.left="handlePressLeft($event)"
      @keydown.right="handlePressRight($event)"
      v-html="linesHtmlVariation[index]"
    ></div>
  </div>
  <button @click="test1()">test1</button>
  <button @click="test2()">test2</button>
</template>

<script>
import { reactive, nextTick, onBeforeUpdate, computed } from 'vue'

export default {
  name: 'Editor',

  setup (props) {
    const lines = reactive(['', 'testText'])
    const linesHtmlVariation = computed(() => lines.map(value => toHtmlText(value)))
    let activeLineIndex
    let lineRefs = []

    const characters = reactive(['Cloud', 'Tifa', 'Aerith'])

    // ---------------------辅助函数-------------------------
    // 返回cursor在line中的位置偏移量
    const getCursorOffset = () => {
      const cursor = window.getSelection().getRangeAt(0)
      let container = cursor.startContainer
      // 判断当前line内容是否为空，如果为空，cursor.startContainer为line，则直接返回0
      if (container.nodeName === 'DIV') return 0
      let offset = cursor.startOffset
      // 判读cursor在文本节点还是span节点，如果在span节点，container则从#text节点修改成span节点
      if (container.parentNode.nodeName === 'SPAN') container = container.parentNode
      // 循环得到真正的offset
      while (container.previousSibling !== null) {
        container = container.previousSibling
        offset += container.textContent.length
      }

      return offset
    }
    // 设定cursor的位置，index为line的索引，offset为位置偏移量
    const setCursor = (index, offset) => {
      window.getSelection().removeAllRanges()
      const range = document.createRange()
      // 循环获得节点与计数器
      let node = lineRefs[index].firstChild
      let counter = node.textContent.length
      while (counter < offset) {
        node = node.nextSibling
        counter += node.textContent.length
      }
      // 判读node是文本节点还是span节点，如果在span节点，node需要设置为子代文本节点
      if (node.nodeName === 'SPAN') node = node.firstChild
      range.setStart(node, offset - (counter - node.textContent.length))
      range.collapse(true)
      window.getSelection().addRange(range)
    }
    // 把HTML文本转换为原始文本
    const toOriginText = (htmlText) => {
      // 要做两处处理，一是将空格还原，二是去除span标签的修饰
      let originText = htmlText.replace(/&ensp;/g, ' ')
      originText = originText.replace(/<span\s*.*>(.*)<\/span>/g, '$1')

      return originText
    }
    // 把原始文本转换为HTMl文本
    const toHtmlText = (originText) => {
      // 要做两处处理，一是将空格转换，二是给特定字符添加span标签的修饰
      let htmlText = originText.replace(/\s/g, '&ensp;')
      htmlText = htmlText.replace(new RegExp(`(${characters.join('|')})`, 'gu'), '<span class="character">$1</span>')

      return htmlText
    }

    const updateLine = (index) => {
      // 如果input事件后line为空，则只需要更新line即可
      if (lineRefs[index].textContent === '') {
        lines[index] = ''
        return
      }
      // 如果input事件后line不为空
      lines[index] = toOriginText(lineRefs[index].textContent)
      const offset = getCursorOffset()
      nextTick(() => {
        setCursor(index, offset)
      })
    }

    // 判断cursor是否在line的第一排
    const cursorAtTop = () => {
      // 注意：当line内容为空时cursor.getBoundingClientRect()得到的DOMRect对象的所有属性值都为0，所以需要特殊对待
      if (lines[activeLineIndex] === '') return true

      const lineHeightString = window.getComputedStyle(lineRefs[activeLineIndex]).getPropertyValue('line-height')
      const lineHeight = Number(lineHeightString.slice(0, lineHeightString.length - 2))
      const cursor = window.getSelection().getRangeAt(0)

      return (cursor.getBoundingClientRect().top - lineHeight) < lineRefs[activeLineIndex].getBoundingClientRect().top
    }
    // 判断cursor是否在line的最后一排
    const cursorAtBottom = () => {
      // 注意：当line内容为空时cursor.getBoundingClientRect()得到的DOMRect对象的所有属性值都为0，所以需要特殊对待
      if (lines[activeLineIndex] === '') return true

      const lineHeightString = window.getComputedStyle(lineRefs[activeLineIndex]).getPropertyValue('line-height')
      const lineHeight = Number(lineHeightString.slice(0, lineHeightString.length - 2))
      const cursor = window.getSelection().getRangeAt(0)

      return (cursor.getBoundingClientRect().bottom + lineHeight) > lineRefs[activeLineIndex].getBoundingClientRect().bottom
    }

    const EnglishCharWidth = 9.9
    const ChineseCharWidth = 18
    // 获取字符串的实际宽度，只考虑中文与英文两种情况
    const getStringWidth = (str) => {
      // 使用正则表达式，检索中文和特殊符号等宽度为ChineseCharWidth的字符，剩下的字符宽度都为EnglishCharWidth
      const charWidthArray = []

      const reg = /[\p{sc=Han}！￥（）【】、：，。《》？]+/gu
      for (let regResult = reg.exec(str); regResult !== null; regResult = reg.exec(str)) {
        charWidthArray.push({
          start: regResult.index,
          length: regResult[0].length,
          width: ChineseCharWidth
        })
      }

      let stringWidth = 0
      let counter = 0
      charWidthArray.forEach(charWidth => {
        if (charWidth.start !== counter) stringWidth += (charWidth.start - counter) * EnglishCharWidth
        stringWidth += charWidth.width * charWidth.length
        counter = charWidth.start + charWidth.length
      })

      const lastCharWidth = charWidthArray[charWidthArray.length - 1]
      // 如果(lastCharWidth.start + lastCharWidth.length) !== str.length
      // 说明不是以ChineseCharWidth宽度的字符结尾，需要加上这些字符的宽度
      if ((lastCharWidth.start + lastCharWidth.length) !== str.length) stringWidth += (str.length - lastCharWidth.start - lastCharWidth.length) * EnglishCharWidth

      return stringWidth
    }
    // const getStringWidth2 = (str) => {
    //   const charWidthList = []
    //   // 使用正则，先检索标点符号，再检索英文，再检索空格，最后剩下的就是中文，特殊符号暂不考虑
    //   const regPunctuation = /\p{gc=P}/gu
    //   for (let regPunctuationResult = regPunctuation.exec(str); regPunctuationResult !== null; regPunctuationResult = regPunctuation.exec(str)) {
    //     // 一些特殊的中文标点宽度与英文一样，如—标点
    //     if (regPunctuationResult[0].charCodeAt(0) < 128 || regPunctuationResult[0] === '—') {
    //       // 英文标点
    //       charWidthList.push({
    //         start: regPunctuationResult.index,
    //         length: 1,
    //         width: EnglishCharWidth
    //       })
    //     } else {
    //       // 中文标点
    //       charWidthList.push({
    //         start: regPunctuationResult.index,
    //         length: 1,
    //         width: ChineseCharWidth
    //       })
    //     }
    //   }
    //   const regSpace = /\s/g
    //   for (let regSpaceResult = regSpace.exec(str); regSpaceResult !== null; regSpaceResult = regSpace.exec(str)) {
    //     charWidthList.push({
    //       start: regSpaceResult.index,
    //       length: 1,
    //       width: EnglishCharWidth
    //     })
    //   }
    //   const regLatin = /\p{sc=Latin}+/gu
    //   for (let regLatinResult = regLatin.exec(str); regLatinResult !== null; regLatinResult = regLatin.exec(str)) {
    //     charWidthList.push({
    //       start: regLatinResult.index,
    //       length: regLatinResult[0].length,
    //       width: EnglishCharWidth
    //     })
    //   }
    //   // 先排序一下，再将缺少的部分补上中文的宽度
    //   charWidthList.sort((a, b) => a.start - b.start)
    //   let stringWidth = 0
    //   let counter = 0
    //   charWidthList.forEach(charWidth => {
    //     if (charWidth.start !== counter) stringWidth += (charWidth.start - counter) * ChineseCharWidth
    //     stringWidth += charWidth.width * charWidth.length
    //     counter = charWidth.start + charWidth.length
    //   })

    //   return stringWidth
    // }
    const getCharWidth = (char) => {
      const reg = /[\p{sc=Han}！￥（）【】、：，。《》？]/u
      if (reg.test(char)) return ChineseCharWidth
      else return EnglishCharWidth
    }

    // ------------------------事件处理函数----------------------
    const hanldeFocus = (index) => {
      activeLineIndex = index
    }

    let inComposition = false
    const handleInput = (index) => {
      if (!inComposition) updateLine(index)
    }
    const handleCompositionstart = () => {
      inComposition = true
    }
    const handleCompositionend = (index) => {
      updateLine(index)
      inComposition = false
    }

    const handlePressEnter = () => {
      const cursorOffset = getCursorOffset()
      // 判断光标是在line句首，句尾（或是当前line为空，与句尾处理相同），还是句中
      if (cursorOffset === 0) {
        // 光标在line句首，直接在当前line前面添加一个新line
        // 由于v-for的复用机制，实验可知，还需要再focus当前line
        lines.splice(activeLineIndex, 0, '')
        nextTick(() => {
          lineRefs[activeLineIndex + 1].focus()
        })
      } else if (cursorOffset === lines[activeLineIndex].length) {
        // 光标在line句尾，在当前line后面添加一个新line，并focus新line
        lines.splice(activeLineIndex + 1, 0, '')
        nextTick(() => {
          lineRefs[activeLineIndex + 1].focus()
        })
      } else {
        // 光标在句中，先提取出两段文字，再更新当前line的内容（提取前半段文字和更新当前line可以合并为一步）
        // 接着在当前line后面添加一个新line，更新新line内容（添加新line和更新其内容可以合并为一步），并focus新line
        const previousText = lines[activeLineIndex].slice(0, cursorOffset)
        const nextText = lines[activeLineIndex].slice(cursorOffset)
        lines[activeLineIndex] = previousText
        lines.splice(activeLineIndex + 1, 0, nextText)
        nextTick(() => {
          // 在更新之后，索引才更新，才可以focus新line
          lineRefs[activeLineIndex + 1].focus()
        })
      }
    }
    const handlePressDelete = (event) => {
      // 如果当前line的索引为0，则直接结束函数
      if (activeLineIndex === 0) return

      if (lines[activeLineIndex] === '') {
        // 如果当前line的内容为空，直接删除当前line，focus到前一个line
        lines.splice(activeLineIndex, 1)
        // 判读前一个line是否为空
        if (lines[activeLineIndex - 1] === '') {
          // 如果前一个line为空，直接focus前一个line即可
          lineRefs[activeLineIndex - 1].focus()
        } else {
          // 如果前一个line不为空，要阻止事件默认动作，这很有必要，不然更新setCursor后会多删除一个字符
          // 再focus前一个line，最后修改光标的位置
          event.preventDefault()
          lineRefs[activeLineIndex - 1].focus()
          setCursor(activeLineIndex, lines[activeLineIndex].length)
        }
      } else {
        // 如果当前line的内容不为空
        // 判断当前range是否在line句首，不在句首，则什么都不做（使用事件默认的删除前一个字符）
        if (getCursorOffset() === 0) {
          // 当前range在line句首，先阻止事件默认动作，再判断前一个line是否为空
          event.preventDefault()
          if (lines[activeLineIndex - 1] === '') {
            // 前一个line为空，直接删除前一个line
            // 由于v-for的复用机制，实验可知，还需要再focus当前line
            lines.splice(activeLineIndex - 1, 1)
            // 当前line的索引已经为activeLineIndex - 1
            lineRefs[activeLineIndex - 1].focus()
          } else {
            // 前一个line不为空，先记录前一个line的长度，再将当前line的内容转移到前一个line。
            // 接着focus前一个line，修改光标的位置，最后删除当前line
            const offset = lines[activeLineIndex - 1].length
            lines[activeLineIndex - 1] = lines[activeLineIndex - 1] + lines[activeLineIndex]
            lines.splice(activeLineIndex, 1)
            nextTick(() => {
              lineRefs[activeLineIndex - 1].focus()
              setCursor(activeLineIndex, offset)
            })
          }
        }
      }
    }

    const handlePressUp = (event) => {
      // 判断cursor是否在line第一排
      // 若不是，则使用事件的默认动作
      // 若是，则阻止事件默认动作，同时将cursor移至前一个line最后一行的对应位置
      if (cursorAtTop()) {
        event.preventDefault()
        // 若当前位于第一个line，则直接结束函数
        if (activeLineIndex === 0) return
        // 若当前不位于第一个line，则将cursor移至前一个line最后一行的对应位置
        // 如果前一个line为空，直接focus前一个line即可
        if (lines[activeLineIndex - 1] === '') lineRefs[activeLineIndex - 1].focus()
        else {
          const rangeRectLeft = window.getSelection().getRangeAt(0).getBoundingClientRect().left

          lineRefs[activeLineIndex - 1].focus()
          const range = document.createRange()
          const lastNode = lineRefs[activeLineIndex].lastChild
          range.setStart(lastNode, lastNode.textContent.length)
          range.collapse(true)

          let position = range.getBoundingClientRect().left
          let charCount = 0
          const activeLineText = lines[activeLineIndex]

          while (position > rangeRectLeft) {
            position -= getCharWidth(activeLineText.charAt(activeLineText.length - 1 - charCount))
            charCount++
          }

          setCursor(activeLineIndex, activeLineText.length - charCount)
        }
      }
    }
    const handlePressDown = (event) => {
      // 判断cursor是否在line最后一排
      // 若不是，则使用事件的默认动作
      // 若是，则阻止事件默认动作，同时将cursor移至后一个line第一行的对应位置
      if (cursorAtBottom()) {
        event.preventDefault()
        // 若当前位于最后一个line，则直接结束函数
        if (activeLineIndex === lines.length - 1) return
        // 若当前不位于最后一个line，则将cursor移至后一个line第一行的对应位置
        // 如果cursor位于句首（当前line为空，cursor也位于句首）或后一个line为空，直接focus后一个line即可
        if (getCursorOffset() === 0 || lines[activeLineIndex + 1] === '') lineRefs[activeLineIndex + 1].focus()
        else {
          const rangeRectRight = window.getSelection().getRangeAt(0).getBoundingClientRect().right

          lineRefs[activeLineIndex + 1].focus()

          let position = window.getSelection().getRangeAt(0).getBoundingClientRect().right
          let charCount = 0
          const activeLineText = lines[activeLineIndex]

          while (position < rangeRectRight && charCount < activeLineText.length) {
            position += getCharWidth(activeLineText.charAt(charCount))
            charCount++
          }

          setCursor(activeLineIndex, charCount)
        }
      }
    }
    const handlePressLeft = (event) => {
      if (getCursorOffset() === 0) {
        event.preventDefault()
        // 判断是否有前一个line
        if (activeLineIndex === 0) return

        lineRefs[activeLineIndex - 1].focus()
        // 如果前一个line的内容为空，直接退出即可
        if (lines[activeLineIndex] === '') return

        setCursor(activeLineIndex, lines[activeLineIndex].length)
      }
    }
    const handlePressRight = (event) => {
      if (getCursorOffset() === lines[activeLineIndex].length) {
        event.preventDefault()
        // 判断是否有后一个line
        if (activeLineIndex === lines.length - 1) return

        lineRefs[activeLineIndex + 1].focus()
      }
    }

    // 下面是测试函数
    const test1 = () => {
      const str = lines[0]
      console.log(getStringWidth(str))
    }

    const test2 = () => {
      const range = window.getSelection().getRangeAt(0)
      console.log(range.getBoundingClientRect().width)
    }

    // vue3中ref在v-for元素中的写法
    const setLineRef = el => {
      lineRefs.push(el)
    }
    // 生命周期hook函数
    // 确保在每次更新之前重置ref
    onBeforeUpdate(() => {
      lineRefs = []
    })

    return {
      lines,
      linesHtmlVariation,

      hanldeFocus,
      handleInput,
      handleCompositionstart,
      handleCompositionend,
      handlePressEnter,
      handlePressDelete,
      handlePressUp,
      handlePressDown,
      handlePressLeft,
      handlePressRight,

      setLineRef,
      test1,
      test2
    }
  }
}
</script>

<style lang="scss">
/* css样式排序：大小（height, margin, border）、 位置（position）、样式（color之类）、其它 */
div.editor {
  height: 400px;

  font-size: 18px;
  text-align: left;
  overflow: auto;

  counter-reset: lineNumber;

  div.line {
    padding-left: 40px;

    position: relative;

    white-space: normal;
    word-break: break-all;
    text-indent: 2em;
    line-height: 1.5em;

    &:focus {
      background-color: #FFFAE3;
      outline-style: none;
    }
    &::before {
      height: 100%;
      width: 36px;
      box-sizing: border-box;
      border-right: 1px solid #DDDDDD;

      position: absolute;
      left: 0px;

      color: #999999;
      background: #F7F7F7;
      text-align: center;
      white-space: nowrap;
      text-indent: 0;
      overflow: hidden;

      counter-increment: lineNumber;
      content: counter(lineNumber);
    }

    span.character {
      color: red;
    }
  }
}

button {
  margin-top: 5px;
  margin-right: 5px;
}
</style>
