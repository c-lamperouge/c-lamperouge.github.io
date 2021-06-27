// 返回当前cursor，假定range存在。且为collapse状态
const getCursor = () => {
  const cursor = window.getSelection().getRangeAt(0)

  return cursor
}
// 返回line和cursor，由于line依赖于cursor，所以它们成对出现，你也可以使用解构赋值只取得line的引用
const getLineAndCursor = () => {
  const cursor = getCursor()
  let line = cursor.startContainer
  // 循环获取cursor所属的line
  while (line.nodeName !== 'DIV') line = line.parentNode

  return {
    line,
    cursor
  }
}

const getLineRowNumber = (line) => {
  // 获取line的样式，计算line的行数
  const lineStyle = window.getComputedStyle(line)
  const heightString = lineStyle.getPropertyValue('height')
  const lineHeightString = lineStyle.getPropertyValue('line-height')
  const height = Number(heightString.slice(0, heightString.length - 2))
  const lineHeight = Number(lineHeightString.slice(0, lineHeightString.length - 2))
  const lineRowNumber = Math.round(height / lineHeight)

  return lineRowNumber
}

// 返回当前光标在line中的哪一排（从1开始计数）
const getCursorWhichRow = () => {
  const { cursor, line } = getLineAndCursor()
  // 注意：当line内容为空时cursor.getBoundingClientRect()得到的DOMRect对象的所有属性值都为0，所以需要特殊对待
  if (line.textContent === '') return 1
  // 下面是line不为空的处理
  // 获取光标和line的DOMRect
  const cursorRect = cursor.getBoundingClientRect()
  const lineRect = line.getBoundingClientRect()
  // 计算cursor在line第几排，直接从第二排判定
  const cursorLevel = cursorRect.top + (cursorRect.height / 2)
  const lineIncrease = lineRect.height / getLineRowNumber(line)
  let lineLevel = lineRect.top + lineIncrease
  let cursorWhichRow = 1
  while (cursorLevel > lineLevel) {
    cursorWhichRow++
    lineLevel += lineIncrease
  }

  return cursorWhichRow
}

export {
  getLineRowNumber,
  getCursorWhichRow
}
