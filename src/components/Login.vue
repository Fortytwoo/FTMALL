<template>
    <div class='login_container'>
        <!-- 头像区 -->
        <div class="login_box">
            <div class="avter_box">
                <img src="./../assets/logo.png" alt="">
            </div>
            <!-- 登录表单区 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
                <el-form-item prop="username">
            <!-- 用户名 -->
                    <el-input v-model="loginForm.username"  prefix-icon="iconfont icon-user" ></el-input>
                </el-form-item>
                <el-form-item prop="password">
            <!-- 密码 -->
                    <el-input v-model="loginForm.password"  prefix-icon="iconfont icon-3702mima" show-password></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetloginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>

export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //   这是表单验证规则对象
      loginFormRules: {
      //   验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }

    }
  },
  created () {
  },
  methods: {
    resetloginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
    // 1. 判断valid是否为Ture，如果为Ture则发起请求，不为Ture则用户信息填写有问题，不发起请求
    // 2.配置axios 导入axios插件 设置请求的根路径为服务器地址
    // 3.构建axios Post请求，传入loginForm对象中的内容，并返回到res中
    // 4，判断返回值res.meta.status是否为200，如果不为200，则密码或者用户名错误，登录失败
    // 若为200，则服务端密码验证正确，返回登录成功，并且跳转到home页面
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        // eslint-disable-next-line no-unused-vars
        const { data: res } = await this.$http.post('login', this.loginForm
        )
        if (res.meta.status !== 200) return (this.$message.error('登录失败'))
        this.$message.success('登录成功！')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  },
  comments: {
  }
}
</script>

<style lang='less' scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avter_box{
            height: 130px;
            width: 130px;
            border: 1px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #dddddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            background-color: #ffffff;
            img{
            height: 100%;
            width: 100%;
            border-radius: 50%;
            background-color: gray;
        }
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
    .login_form{
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
    }
}
</style>
