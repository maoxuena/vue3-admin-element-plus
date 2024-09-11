<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon id="guide-start" icon="guide" @click="onClick" />
    </el-tooltip>
  </div>
</template>

<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import steps from './steps'

const i18n = useI18n()

let driver = null
onMounted(() => {
  driver = new Driver({
    // 禁止点击蒙版关闭
    allowClose: false,
    opacity: 0,
    padding: 5,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev'),
    doneBtnText: i18n.t('msg.guide.done')
  })
  // 默认配置项
  // const driver = new Driver({
  //   className: 'scoped-class', // className to wrap driver.js popover
  //   animate: true,  // Animate while changing highlighted element
  //   opacity: 0.75,  // Background opacity (0 means only popovers and without overlay)
  //   padding: 10,    // Distance of element from around the edges
  //   allowClose: true, // Whether clicking on overlay should close or not
  //   overlayClickNext: false, // Should it move to next step on overlay click
  //   doneBtnText: 'Done', // Text on the final button
  //   closeBtnText: 'Close', // Text on the close button for this step
  //   nextBtnText: 'Next', // Next button text for this step
  //   prevBtnText: 'Previous', // Previous button text for this step
  //   showButtons: false, // Do not show control buttons in footer
  //   keyboardControl: true, // Allow controlling through keyboard (escape to close, arrow keys to move)
  //   scrollIntoViewOptions: {}, // We use `scrollIntoView()` when possible, pass here the options for it if you want any
  //   onHighlightStarted: (Element) { }, // Called when element is about to be highlighted
  //   onHighlighted: (Element) { }, // Called when element is fully highlighted
  //   onDeselected: (Element) { }, // Called when element has been deselected
  //   onReset: (Element) { },        // Called when overlay is about to be cleared
  //   onNext: (Element) => { },      // Called when moving to next step on any step
  //   onPrevious: (Element) => { },  // Called when moving to next step on any step
  // })
})

const onClick = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>

<style scoped></style>
