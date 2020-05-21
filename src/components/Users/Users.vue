<template>
  <div class>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class>
      <div>
        <el-row :gutter="50">
          <el-col :span="7">
            <el-input placeholder="请输入用户名" v-model="queryInfo.query" clearable @clear="getUserList">
              <el-button slot="append" icon="el-icon-search" @click="getUserList()" ></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
<!-- 添加用户的对话框 -->
            <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="50%">
              <!-- 添加用户 表单 -->
              <el-form ref="addFromInfoRef" :model="addFromInfo" :rules="addFromInfoRules"  label-width="70px">
                  <el-form-item label="用户名" prop="username"   >
                        <el-input v-model="addFromInfo.username" maxlength="10" minlength="3"  show-word-limit></el-input>
                  </el-form-item>
                        <el-form-item label="密码" prop="password"  >
                        <el-input  v-model="addFromInfo.password" maxlength="12" minlength="6"  show-word-limit></el-input>
                  </el-form-item>
                        <el-form-item label="邮箱" prop="email"  validate-event="false" >
                        <el-input v-model="addFromInfo.email"></el-input>
                  </el-form-item>
                        <el-form-item label="手机" prop="mobile"  validate-event="false">
                        <el-input v-model="addFromInfo.mobile" maxlength="11" minlength="11"></el-input>
                  </el-form-item>
              </el-form>
              <!-- 底部提交区域 -->
              <div slot="footer" class="dialog-footer">
                <el-button @click="exitPostFrom">取 消</el-button>
                <el-button type="primary" @click="addUser" >确 定</el-button>
              </div>
            </el-dialog>

          </el-col>
        </el-row>
        <el-table :data="userList" style="width: 100%" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="username" label="姓名" width="180"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
          <el-table-column prop="mobile" label="电话"></el-table-column>
          <el-table-column prop="role_name" label="角色"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope>
              <!-- 修改 删除 分配角色 -->
              <el-button type="primary" icon="el-icon-edit" szie="mini"></el-button>
              <template slot-scope="scope">
                <el-button  type="danger" icon="el-icon-delete" szie="mini" @click="delUser(scope.row)"></el-button>
              </template>
              <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                <el-button type="warning" icon="el-icon-setting" szie="mini"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="todal"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  created () {
    this.getUserList()
  },
  data () {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      userList: [],
      todal: 0,
      dialogFormVisible: false,
      addFromInfo: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addFromInfoRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [],
        mobile: [
          { min: 11, max: 11, message: '', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败！')
      this.userList = res.data.users
      this.todal = res.data.total
    },
    // 监听pagesize改变事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      console.log(this.queryInfo.pagesize)
      this.getUserList()
    },
    // 监听  页码数  改变事件
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 用户状态修改
    async userStateChanged (userInfo) {
      // eslint-disable-next-line no-unused-vars
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message.error(res.meta.msg)
      }
      this.$message.success(res.meta.msg)
    },
    async addUser () {
      this.$refs.addFromInfoRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('users', this.addFromInfo)
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.getUserList()
        this.exitPostFrom()
        this.$message.success({
          message: '用户' + res.data.username + '创建成功',
          type: 'success'
        })
      })
    },
    // 清空addFromInfo中所有参数的函数
    exitPostFrom () {
      this.addFromInfo = { username: '', password: '', email: '', mobile: '' }
      this.dialogFormVisible = false
    },
    delUser (userInfo) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((userInfo) => {
        this.delUserput(userInfo)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async delUserput (userInfo) {
      const { data: res } = await this.$http.delete(`users/${userInfo.id}`)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
    }
  },
  comments: {
  }
}
</script>

<style lang='less' scoped>

</style>
