<template>
    <div class=''>
        这是登录成功页面
        <el-button type="info" @click="clearToken">退出</el-button>
    </div>
</template>
<script>

export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    clearToken () {
      window.sessionStorage.clear('token')
      this.$message.success('退出成功')
      this.$router.push('/login')
    }
  },
  comments: {
  }
}
</script>

<style lang='less' scoped>

</style>
