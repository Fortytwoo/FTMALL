<template>
  <el-container class="home-container">
    <!-- 头部区 -->
    <el-header>
      <div>
        <img src="./../assets/logo.png" alt  id="headlogo"/>
        <span unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">电商后台管理系统</span>
      </div>
      <el-button type="info" @click="clearToken">退出</el-button>
    </el-header>
    <!-- 页面主题 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="collapse? '64px':'200px'" >
        <!-- 侧边栏菜单区域 -->
        <!-- 侧边栏收起按钮 -->
        <div class="toggle-button" @click="toggleCollapse" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">|||</div>
        <!-- 侧边栏菜单 -->
        <el-menu background-color="#333744" text-color="#fff"
        active-text-color="#409EFF"
        unique-opened
        :collapse ='collapse'
        :collapse-transition = 'collapseTransition'
        router
        :default-active = 'activePath'>
          <!-- 一级菜单 -->
          <el-submenu :index= "''+item.id" v-for=" item in menulist" :key="item.id"
          >
          <!-- @click.native="opToggle" -->
          <!-- 这是点击打开的函数，待修复 -->
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconList[item.path]"></i>
              <!-- span 文本 -->
              <span unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+item1.path" v-for=" item1 in item.children" :key="item1.id"
            @click="seveNavState('/'+item1.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- span 文本 -->
                <span unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">{{item1.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 页面主体 -->
      <el-main>
          <router-view />
      </el-main>
    </el-container>
    <IcpFoot></IcpFoot>
  </el-container>
</template>
<script>
// 导入Icp备案信息
import IcpFoot from './IcpFoot'
export default {
// 定义生命周期函数
  created () {
    this.getMenuList()
  },
  data () {
    return {
      menulist: [],
      iconList: {
        users: 'iconfont icon-users',
        rights: 'iconfont icon-tijikongjian',
        goods: 'iconfont icon-shangpin',
        orders: 'iconfont icon-danju',
        reports: 'iconfont icon-baobiao'
      },
      collapse: false,
      collapseTransition: false,
      activePath: window.sessionStorage.getItem('activePath')
    }
  },
  methods: {
    // 退出时  处理  清空token
    clearToken () {
      window.sessionStorage.clear('token')
      window.sessionStorage.clear('activePath')
      this.$message.success('退出成功')
      this.$router.push('/login')
    },
    // 获取列表数据
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
    },
    toggleCollapse () {
      this.collapse = !this.collapse
    },
    seveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
    }
  },
  comments: {
  },
  components: {
    IcpFoot: IcpFoot
  }

}
</script>

<style lang='less' scoped>
.toggle-button{
    background-color: #4a5064;
    text-align: center;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    letter-spacing: 0.2em;
    cursor: pointer;
}
.el-menu{
    border: 0px;
}
.home-container{
    height: 100%;
}
.el-header{
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
        display: flex;
        align-items: center;
        span{
            margin-left: 15px;
        }
    }
}
.el-aside{
    background-color: #333744;
}
.el-main{
    background-color: #eaedf1;
}
.iconfont{
    margin-right: 10px;
}
#headlogo{
  height: 40px;
  width: 40px;
  padding-left: 20px;
}
</style>
