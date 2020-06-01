<template>
    <div>
        <el-row>
            <el-col :span="12">项目代码托管：</el-col>
            <el-col :span="12" :pull="2">服务端代码及所需数据库文件：</el-col>
            <el-col :span="12" :push="1">
              <!-- github -->
              <i class="iconfont el-icon-aliGitHub"></i>  Github：<el-link target="_blank" type="primary" :href="projectUrl.github">{{this.projectUrl.github}}</el-link>
                </el-col>
              <!-- 服务端数据文件 -->
            <el-col :span="12">
                   <i class="el-icon-download"></i> 下载地址：<el-link target="_blank" type="primary" :href="projectUrl.serverSqlFile">http://cdn.lujingru42.top//shared/Vue-FtwwMall....zip</el-link>
                </el-col>
            <!-- 码云 -->
            <el-col :span="12" :push="1">
              <i class="iconfont el-icon-aligitee-fill-round"></i>  码云：<el-link target="_blank" type="primary" :href="projectUrl.gitee">{{this.projectUrl.gitee}}</el-link>
                </el-col>
              <!-- 个人搭建服务端API -->
            <el-col :span="12" :pull="2" id="ServerAPI">
                  <i class="iconfont el-icon-aliyunfuwuqi"></i>  个人搭建服务端API：
                    <el-tooltip class="item" effect="dark" :content="tip" placement="top-end">
                    <i class="el-icon-info"></i>
                    </el-tooltip>
                    <el-link target="_blank" type="primary" :href="projectUrl.privateServerAPI" ref="privateServerAPIRef" >{{this.projectUrl.privateServerAPI}}</el-link>
                </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">如何联系：</el-col>
            <!-- github -->
            <el-col :span="24" :push="1">
              <i class="iconfont el-icon-aliGitHub"></i>  Github：<el-link target="_blank" type="primary" :href="personalUrl.geitee">{{this.personalUrl.geitee}}</el-link>
                </el-col>
                <!-- 码云 -->
            <el-col :span="24" :push="1">
              <i class="iconfont el-icon-aligitee-fill-round"></i>  码云：<el-link target="_blank" type="primary" :href="personalUrl.github">{{this.personalUrl.github}}</el-link>
                </el-col>
                <!-- 邮箱 -->
            <el-col :span="24" :push="1">
               <i class="el-icon-message"></i> 邮箱：<el-link target="_blank" type="primary" :href="personalUrl.email">liemail42@163.com</el-link>
                </el-col>
        </el-row>
    </div>
</template>
<script>

export default {
  data () {
    return {
      // copylink: null,
      tip: '不想搭建服务器的同学可以用我的，不要乱删权限等配置影响其他人',
      //   项目 Url
      projectUrl: {
        gitee: 'https://gitee.com/Fortytwoo/Vue-FtwwMall',
        github: 'https://github.com/Fortytwoo/FTMALL',
        serverSqlFile: 'http://cdn.lujingru42.top//shared/Vue-FtwwMall%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%96%87%E4%BB%B6%E5%8F%8AAPI%E6%96%87%E6%A1%A3.zip',
        privateServerAPI: 'http://49.233.20.174:3456/api/private/v1/'
      },
      personalUrl: {
        geitee: 'https://gitee.com/Fortytwoo',
        github: 'https://github.com/Fortytwoo',
        email: 'mailto: liemail42@163.com',
        zhihu: ''
      }
    }
  },
  created () {
  },
  mounted () {
    // this.copylink = new this.Clipboard(this.$refs.privateServerAPIRef)
  },
  methods: {
    // clickcopy () {
    //   const _this = this
    //   const Clipboard = _this.copylink
    //   Clipboard.on('success', () => {
    //     _this.$message.success('复制成功！')
    //   })
    //   Clipboard.on('error', () => {
    //     _this.$message.error('复制失败，请手动选择复制！')
    //   })
    // }
  },
  comments: {
  }
}
</script>

<style lang='less' scoped>
@import url(https://at.alicdn.com/t/font_1851810_4da7x0vml1m.css);
.el-link{
    font-size: 16px;
    align-content: center;
    padding-bottom: 5px;
}
.el-icon-info{
    color: rgb(204, 49, 49);
}
.iconfont.el-icon-aligitee-fill-round{
  color: #C71D23;
}
.iconfont.el-icon-aliyunfuwuqi{
  color: #00A2FF;
}
#ServerAPI{
  right: 79px;
}
</style>
