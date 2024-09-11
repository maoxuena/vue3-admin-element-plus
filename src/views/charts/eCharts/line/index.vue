<template>
  <div class="line-page">
    <el-row :gutter="10">
      <el-col :xs="24">
        <div class="chart-box" style="height:500px">
          <line-bar :data="lineBarData" />
        </div>
      </el-col>
      <el-col :xs="24">
        <div class="chart-box" style="height:500px">
          <time-line :data="timeLineList" />
        </div>
      </el-col>
      <el-col :xs="24">
        <div class="chart-box" style="height:500px">
          <line-trends :data="trendsData" />
        </div>
      </el-col>
      <el-col :xs="8"
              :sm="6"
              :md="4"
              :lg="3"
              :xl="1">

      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import LineBar from './components/LineBar.vue'
import TimeLine from './components/TimeLine.vue'
import LineTrends from './components/LineTrends.vue'
const lineBarData = ref({})
lineBarData.value = {
  category: ['市区', '万州', '江北', '南岸', '北碚', '綦南', '长寿', '永川', '璧山', '江津', '城口', '大足', '垫江', '丰都', '奉节', '合川', '江津区', '开州', '南川', '彭水', '黔江', '石柱', '铜梁', '潼南', '巫山', '巫溪', '武隆', '秀山', '酉阳', '云阳', '忠县', '川东', '检修'],
  dottedBase: [],
  lineData: [18092, 20728, 24045, 28348, 32808, 36097, 39867, 44715, 48444, 50415, 56061, 62677, 59521, 67560, 18092, 20728, 24045, 28348, 32808, 36097, 39867, 44715, 48444, 50415, 36097, 39867, 44715, 48444, 50415, 50061, 32677, 49521, 32808],
  barData: [4600, 5000, 5500, 6500, 7500, 8500, 9900, 12500, 14000, 21500, 23200, 24450, 25250, 33300, 4600, 5000, 5500, 6500, 7500, 8500, 9900, 22500, 14000, 21500, 8500, 9900, 12500, 14000, 21500, 23200, 24450, 25250, 7500],
  rateData: []
}

const timeLineList = ref([])
timeLineList.value = [
  {
    policy_content: '规定对处方药和非处方药分类管理。',
    policy_country: '中国',
    policy_time: '1999-06-11',
    policy_title: '《处方药与非处方药分类管理办法》（试行)'
  },
  {
    policy_content: '规定药品生产、经营企业、医疗机构应当对其生产、经营、使用的药品质量负责。',
    policy_country: '中国',
    policy_time: '2007-01-31',
    policy_title: '《药品流通监督管理方法》（国家食品药品监督管理局令第26号'
  },
  {
    policy_content: '《意见》指出通过生物医药园的建设，研究开发具有自主知识产权的新药及其他医药产品；孵化新型医药企业，为从事生物技术与医药领域技术孵化、中试的机构和企业提供一流、全方位、专业化的保障服务和条件支撑；发展以生物医药为主体，中药、化药为补充，医药贸易为纽带的新型医药产业链。',
    policy_country: '中国',
    policy_time: '2007-06-22',
    policy_title: '《关于共同建设国家生物医药国际创新园的意见》'
  },
  {
    policy_content: '进一步明确了药品生产、经营企业的管理规范行为',
    policy_country: '中国',
    policy_time: '2016-02-06',
    policy_title: '《中华人民共和国药品管理法实施条例》（2016年修订版）'
  },
  {
    policy_content: '将化药新药分为创新药和改良型新药，将原来新药定义的“中国新”变成了“全球性”',
    policy_country: '中国',
    policy_time: '2016-03-09',
    policy_title: '《关于发布化学药品注册分类改革工作方案的公告》'
  },
  {
    policy_content: '《意见》明确提出了优化服务环境、提升服务能力、营造生物医药产业创新发展的34条具体措施和办法。',
    policy_country: '中国',
    policy_time: '2016-03-18',
    policy_title: '《优化服务环境助推生物医药产业创新发展的意见》。'
  },
  {
    policy_content: '推进生物药、化学药新品种、优质中药、高性能医疗器械、新型辅料包材和制药设备六大重点领域发展，加快各领域新技术的开发和应用，促进产品、技术、质量升级',
    policy_country: '中国',
    policy_time: '2016-10-26',
    policy_title: '《医药工业发展规划指南》'
  },
  {
    policy_content: '《规划》确定了加快生物产业方面的发展任务。提出构建生物医药新体系、提升生物医学工程发展水平，到2020年，生物产业规模达到8—10万亿元，形成一批具有较强国际竞争力的新型生物技术企业和生物经济集群。',
    policy_country: '中国',
    policy_time: '2016-11-29',
    policy_title: '《“十三五”国家战略性新兴产业发展规划》'
  },
  {
    policy_content: '《意见》在生产方面强调严格药品上市审评审批，加快推进已上市仿制药质量和疗效一致性评价，对通过一致性评价的药品给予政策支持等。流通方面推动药品流通企业转型升级，推行药品购销“两票制”，使中间环节加价透明化等。',
    policy_country: '中国',
    policy_time: '2017-02-09',
    policy_title: '《关于进一步改革完善药品生产流通使用政策的若干建议》'
  },
  {
    policy_content: '药物临床试验审批决定、药品补充申请审批决定及进口药品再注册审批决定调整为由国家食品药品监督管理总局药品审评中心以国家食品药品监督管理总局的名义作出。',
    policy_country: '中国',
    policy_time: '2017-04-15',
    policy_title: '《国家药品监督管理总局关于调整部分药品行政审批事项程序的决定》'
  },
  {
    policy_content: '原料药、药用辅料和药包材注册申请改为在原料药、药用辅料和药包材登记平台与数据库，对原料药的基本信息、生产信息、特性鉴定等方面进行登记。',
    policy_country: '中国',
    policy_time: '2017-11-30',
    policy_title: '《总局关于调整原料药、药用辅料和药包材审评审批事项的公告（2017年第146号）》'
  },
  {
    policy_content: '提出，设立首期规模100亿元的广州生物医药产业投资基金，对进入临床研究的新药项目最高给予200万元的经费扶持，对本地生物医药产业项目实行工业用地先租赁后出让、弹性年期出让制度。并将对自主研发及在广州转化的生物制品分阶段给予资金扶持，对药物非临床安全性评价机构等项目建设给予不超过总投资额30％的补助。',
    policy_country: '中国',
    policy_time: '2018-03-30',
    policy_title: '《广州市加快生物医药产业发展若干规定（试行）》'
  },
  {
    policy_content: '允许尚未盈利或未有收入的生物科技公司赴港上市。',
    policy_country: '中国',
    policy_time: '2018-04-24',
    policy_title: '港交所新上市规则'
  },
  {
    policy_content: '《实施意见》规定，杭州将优先发展生物制药，包括抗体药物、重组蛋白药物、新型疫苗等新型生物技术类药物。同时提升发展医疗器械、创新发展化学制药、传承发展中药产业。杭州还重点对生物医药创新的关键节点进行择优支持。',
    policy_country: '中国',
    policy_time: '2018-05-21',
    policy_title: '《促进杭州市生物医药产业创新发展的实施意见》'
  },
  {
    policy_content: '提出重点发展现代中药（民族药）、生物制药、化学制药、医疗器械、特色保健品5条产业链，明确了各条产业链的实施路径，提出到2020年现代中药产业实现主营业务收入610亿元、特色保健品实现主营业务收入140亿元的发展目标。',
    policy_country: '中国',
    policy_time: '2018-06-17',
    policy_title: '《云南省生物医药产业施工图》'
  },
  {
    policy_content: '通过在盈利状况、股权结构等方面的差异化安排，重点鼓励生物医药等六大领域的企业在科创板上市。对于未盈利或未有收入的生物科技企业，上市需满足的主要条件是：预计使之不低于人民币40亿元，至少有一项核心产品获准开展2期临床试验。',
    policy_country: '中国',
    policy_time: '2019-01-30',
    policy_title: '上海证券交易所设立试点科创板'
  },
  {
    policy_content: '原辅包的使用必须符合药用要求，主要是指原辅包的质量、安全及功能应该满足药品制剂的需要。原辅包与药品制剂关联审评审批由原辅包登记人在登记平台上登记，药品制剂注册申请人提交注册申请时与平台登记资料进行关联；因特殊原因无法在平台登记的原辅包，也可在药品制剂注册申请时，由药品制剂注册申请人一并提供原辅包研究资料。',
    policy_country: '中国',
    policy_time: '2019-07-16',
    policy_title: '《国家药监局关于进一步完善药品关联审评审批和监管工作有关事宜的公告》（2019 年第 56 号）'
  },
  {
    policy_content: '对在中国境内从事药品研制、生产、经营、使用和监督管理活动作出具体的规定。',
    policy_country: '中国',
    policy_time: '2019-08-26',
    policy_title: '《中华人民共和国药品管理法（2019年8月修订版》'
  }
]
for (var i = 0; i < 33; i++) {
  const rate = lineBarData.value.barData[i] / lineBarData.value.lineData[i]
  lineBarData.value.rateData[i] = rate.toFixed(2)
}

const trendsData = ref([])
let now = +new Date(1997, 9, 3)
const oneDay = 24 * 3600 * 1000
let value = Math.random() * 1000

const randomData = () => {
  now = new Date(+now + oneDay)
  value = value + Math.random() * 21 - 10
  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      Math.round(value)
    ]
  }
}

onMounted(() => {
  for (var i = 0; i < 1000; i++) {
    trendsData.value.push(randomData())
  }
  setInterval(() => {
    for (var i = 0; i < 5; i++) {
      trendsData.value.shift()
      trendsData.value.push(randomData())
    }
  }, 1000)
})
</script>

<style lang="scss" scoped>
.chart-box {
  height: 200px;
  padding: 5px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
</style>
