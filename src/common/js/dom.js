
/***
 * 獲取元素的style 屬性
 * @param elment dom
 * @param ttr String
 * getStyle(element, 'height')
 */
export function getStyle (element, attr) {
  if (element.currentStyle) {
    return element.currentStyle[attr]
  } else {
    return getComputedStyle(element, false)[attr]
  }
}
