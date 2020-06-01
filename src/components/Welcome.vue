<template>
    <div class=''>
        <el-card>
            <el-carousel indicator-position="outside" >
              <el-carousel-item v-for="item in swriptImgUrl" :key="item.id">
                <a :href="item.href" target="_blank">
                    <el-image
                    :src="item.imageUlr"
                    fit="contain"
                    error="图片加载失败"></el-image>
                    </a>
              </el-carousel-item>
            </el-carousel>
            <!-- 展示文字信息的卡片 -->
            <el-card>
                <el-divider content-position="center"><span class="title">项目简介</span></el-divider>
                <el-row>
                    <el-col :push="3">
                        <!-- 项目简介 -->
                        <ProjectDescription></ProjectDescription>
                    </el-col>
                </el-row>
            <el-divider content-position="center"><span class="title">项目时间线</span></el-divider>
                <!-- 项目时间线 -->
                <el-row id="timeline">
                    <el-col :push="14">项目时间: 2020-5-19 到 2020-5-30</el-col>
                    <el-col :push="3">
                <el-timeline :reverse="reverse">
                   <el-timeline-item
                     v-for="(item, index) in demoTimeLine"
                     :key="index"
                     :timestamp="item.putTime"
                     :color="item.color">
                     {{item.content}}
                   </el-timeline-item>
                 </el-timeline>
                  </el-col>
                </el-row>
                <!-- 项目功能 -->
            <el-divider content-position="center"><span class="title">项目功能</span></el-divider>
            <el-row><el-col :span="24" :push="3">
               <ProjectMindMaster></ProjectMindMaster>
                </el-col></el-row>

                <!-- 项目收获 -->
            <el-divider content-position="center"><span class="title">项目收获</span></el-divider>
            <el-row>
                    <el-col :push="3" :span="20">
                        <ProjectGain></ProjectGain>
                    </el-col>
                </el-row>
                <!-- 关于 -->
            <el-divider content-position="center"><span class="title">关于</span></el-divider>
            <el-row>
                    <el-col :push="3" >
                        <Projectfeedback></Projectfeedback>
                    </el-col>
                </el-row>
            </el-card>
        </el-card>
         <el-backtop :bottom="50" :visibility-height="1800">
           <el-button icon="el-icon-caret-top" circle id="backtopBtn"></el-button>
         </el-backtop>
        </div>
</template>
<script>
import ProjectDescription from './WelcomeText/ProjectDescription'
import ProjectGain from './WelcomeText/ProjectGain'
import Projectfeedback from './WelcomeText/Projectfeedback'
import ProjectMindMaster from './WelcomeText/ProjectMindMaster'
export default {
  data () {
    return {
    // 轮播图数据
      swriptImgUrl: [
        {
          id: 1,
          href: 'https://cn.vuejs.org/index.html',
          imageUlr: 'http://cdn.lujingru42.top/www/web/image/vue.png'
        },
        {
          id: 2,
          href: 'https://cli.vuejs.org/zh/',
          imageUlr: 'http://cdn.lujingru42.top/www/web/image/vue_cli.png'
        },
        {
          id: 3,
          href: 'https://router.vuejs.org/zh/',
          imageUlr: 'http://cdn.lujingru42.top/www/web/image/vue_router.png'
        },
        {
          id: 4,
          href: 'https://element.eleme.io/',
          imageUlr: 'http://cdn.lujingru42.top/www/web/image/element_UI.jpg'
        },
        {
          id: 5,
          href: 'https://github.com/axios/axios',
          imageUlr: 'http://cdn.lujingru42.top/www/web/image/axios.png'
        },
        {
          id: 6,
          href: 'https://echarts.apache.org/zh/index.html',
          imageUlr: 'http://cdn.lujingru42.top/www/web/image/Echarts_logo.png'
        },
        {
          id: 7,
          href: '#',
          imageUlr: 'http://cdn.lujingru42.top/www/web/image/github.png'
        }
      ],
      reverse: false,
      //   项目时间线
      demoTimeLine: [
        {
          color: '#67C23A',
          content: '项目基本结构搭建，完成登录功能',
          putTime: '2020-05-19'
        },
        {
          color: '#67C23A',
          content: '完成路由配置，各页面模板构建，页面布局',
          putTime: '2020-05-20'
        },
        {
          color: '#67C23A',
          content: '完成用户列表页面',
          putTime: '2020-05-20'
        },
        {
          color: '#67C23A',
          content: '完成用户列表业务逻辑，角色列表页面',
          putTime: '2020-05-21'
        },
        {
          color: '#67C23A',
          content: '完成角色列表业务逻辑',
          putTime: '2020-05-22'
        },
        {
          color: '#67C23A',
          content: '完成分类参数页面及业务逻辑',
          putTime: '2020-05-25'
        },
        {
          color: '#67C23A',
          content: '完成商品列表中添加商品页面及业务逻辑',
          putTime: '2020-05-27'
        },
        {
          color: '#67C23A',
          content: '完成订单管理及数据统计的页面及业务逻辑',
          putTime: '2020-05-28'
        },
        {
          color: '#67C23A',
          content: '项目上线前的基本优化',
          putTime: '2020-05-30'
        },
        {
          color: '#67C23A',
          content: '项目部署上线',
          putTime: '2020-05-31'
        },
        {
          color: '#E6A23C',
          content: '项目优化',
          putTime: '.......'
        }
      ]
    }
  },
  created () {
  },
  methods: {
  },
  computed: {
    activeName () {
      return 0
    }
  },
  components: {
    ProjectDescription: ProjectDescription,
    ProjectGain: ProjectGain,
    Projectfeedback: Projectfeedback,
    ProjectMindMaster: ProjectMindMaster
  }
}
</script>

<style lang='less' scoped>
.el-image{
    margin: 0 auto;
    height: 300px;
    width: 700;
}
.el-carousel__item .el-image {
    width: 700px;
    height: 400px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
.el-carousel__item{
    background-image: url("http://cdn.lujingru42.top/www/web/image/gitee.png");
    background-size: 6000px;
    display: inline-block;
}
.title{
    font-size: 35px;
}
#timeline{
    margin-top: 60px;
}
#backtopBtn{
  padding: 10px 10px;
  color: #409EFF;
  // cursor:pointer
}
.el-button{
  font-size: 30px;
}
</style>
