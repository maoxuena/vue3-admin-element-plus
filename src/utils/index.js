/**
 * @description 将el-icon的组件名称AbbbCddd转化为el-icon-abbb-cddd形式，例：Switch转换为el-icon-switch，ArrowDownBold转换为el-icon-arrow-down-bold
 * @param iconName
 * @return {{}|any}
 */
export function transElIconName(iconName) {
  return (
    'el-icon' + iconName.replace(/[A-Z]/g, (match) => '-' + match.toLowerCase())
  )
}

/**
 * @description 数组求和
 * @param arr
 * @returns {number}
 */
export function totalize (arr) {
  return arr.reduce(function (prev, curr) { // prev, curr, index, arr
    return prev + curr
  })
}

/**
 * @description 生成一个长度为m，每一项都是n的数组
 * @param m
 * @param n
 * @returns {Array}
 */
export function createArray (m, n) {
  return m ? createArray(m - 1, n).concat(n) : []
}
