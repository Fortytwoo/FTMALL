<template>
  <el-container class="home-container">
    <!-- 头部区 -->
    <el-header>
      <div>
        <img src="./../assets/heima.png" alt />
        <span unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">电商后台管理系统</span>
      </div>
      <el-button type="info" @click="clearToken">退出</el-button>
    </el-header>
    <!-- 页面主题 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="collapse? '64px':'200px'" >
        <!-- 侧边栏菜单区域 -->
        <div class="toggle-button" @click="toggleCollapse" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;">|||</div>
        <el-menu background-color="#333744" text-color="#fff"
        active-text-color="#409EFF"
        unique-opened
        :collapse ='collapse'
        :collapse-transition = 'collapseTransition'
        router>
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
            <el-menu-item :index="'/'+item1.path" v-for=" item1 in item.children" :key="item1.id">
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
      <el-main>Main
          <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
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
      collapseTransition: false
    //   collapse1: 0
    }
  },
  methods: {
    clearToken () {
      window.sessionStorage.clear('token')
      this.$message.success('退出成功')
      this.$router.push('/login')
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
    },
    toggleCollapse () {
      this.collapse = !this.collapse
    //   this.collapse1 = 0
    }
    // opToggle () {
    //   if (this.collapse1 === 0) {
    //     this.collapse = !this.collapse
    //     this.collapse1++
    //   }
    // }
  },
  comments: {
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
</style>
