<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>数据统计</el-breadcrumb-item>
          <el-breadcrumb-item>数据报表</el-breadcrumb-item>
          </el-breadcrumb>
      <el-card>
        <div id="main">

        </div>
      </el-card>
    </div>
</template>
<script>
// 导入Echarts包
// eslint-disable-next-line no-unused-vars
import echarts from 'echarts'
// 导入lodash 用于对象的合并
import _ from 'lodash'
export default {
  data () {
    return {
      reportsList: {},
      // 需要合并的数据
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  created () {
    this.getReportsList()
  },
  methods: {
    async getReportsList () {
      const { data: res } = await this.$http.get('reports/type/1')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.reportsList = res.data
      console.log(this.reportsList)
    }
  },
  // 在生命周期mounted之前，页面Dom元素已经被渲染完毕
  async mounted () {
    // eslint-disable-next-line no-unused-vars
    var myChart = echarts.init(document.getElementById('main'))

    // 发起请求，获取折线图数据
    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
    // 合并两个对象
    const result = _.merge(res.data, this.options)
    // 调用myChart的函数  展示数据
    myChart.setOption(result)
  },
  comments: {
  }
}
</script>

<style lang='less' scoped>
#main{
  width: 600px;
  height: 400px;
}
</style>
