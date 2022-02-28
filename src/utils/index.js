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
