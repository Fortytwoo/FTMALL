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
              <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button>
            <!-- 添加用户的对话框 -->
            <el-dialog
              title="添加用户"
              :visible.sync="dialogFormVisible"
              width="50%"
              @close="delFromInfo"
            >
              <!-- 添加用户 表单 -->
              <el-form
                ref="addFromInfoRef"
                :model="addFromInfo"
                :rules="addFromInfoRules"
                label-width="70px"
              >
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="addFromInfo.username" maxlength="10" minlength="3"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="addFromInfo.password" maxlength="12" minlength="6"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="addFromInfo.email"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                  <el-input v-model="addFromInfo.mobile" maxlength="11" minlength="11"></el-input>
                </el-form-item>
              </el-form>
              <!-- 底部提交区域 -->
              <div slot="footer" class="dialog-footer">
                <el-button @click="delFromInfo">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
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
            <template slot-scope="scope">
       <!-- 修改用户信息 表单 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                szie="mini"
                @click="modifyUserFrom(scope.row)"
              ></el-button>
              <el-dialog title="修改用户信息" :visible.sync="modifyUserFromshwo" @close="delModifyUserInfo">
                <el-form
                ref="modifyUserRef"
                :model="modifyUserInfo"
                :rules="modifyUserRules"
                label-width="70px"
                >
                  <el-form-item label="用户名" prop="username" label-width="90px"  >
                    <el-input v-model="modifyUserInfo.username" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email" label-width="90px" >
                    <el-input v-model="modifyUserInfo.email"></el-input>
                  </el-form-item>
                  <el-form-item label="手机" prop="mobile" label-width="90px" >
                    <el-input v-model="modifyUserInfo.mobile" maxlength="11" minlength="11"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer">
                  <el-button @click="delModifyUserInfo" >取 消</el-button>
                  <el-button type="primary" @click="modifyUser">确 定</el-button>
                </div>
              </el-dialog>
      <!-- 删除  -->
              <el-button
                id="delbutton"
                type="danger"
                icon="el-icon-delete"
                szie="mini"
                @click="delUserInfo(scope.row)"
              ></el-button>
      <!-- 分配角色 -->
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  szie="mini"
                  @click="gradeUseropen(scope.row)"
                ></el-button>

<!-- .
.
。。                这是分配角色的弹窗
。
。。 -->
                <el-dialog title="分配角色" :visible.sync="gradeUsershow" @close="gradeUserclose">
                  <el-form
                  :model="gradeUserInfo"
                  label-width="80px"
                  ref="gradeUserRef"
                  :rules="gradeUserRules">
                    <el-form-item label="用户名 :" prop="username" label-width="100px">
                      <span>{{gradeUserInfo.username}}</span>
                    </el-form-item>
                    <el-form-item label="当前角色 :" prop="role_name" label-width="100px">
                      <span>{{gradeUserInfo.role_name}}</span>
                    </el-form-item>
                    <el-form-item label="分配新角色 :" label-width="100px">
                      <el-dropdown >
                        <el-button type="primary" prop="SelectedRoleName">
                            {{gradeUserInfo.SelectedRoleName}}<i class="el-icon-arrow-down el-icon--right"></i>
                          </el-button>
                        <el-dropdown-menu slot="dropdown" prop="rolesList">
                          <el-dropdown-item @click.native="SelectedClick(item.id, item.roleName)" v-for="item in gradeUserInfo.rolesList" :key="item.id" >{{item.roleName}}</el-dropdown-item>
                          </el-dropdown-menu>
                      </el-dropdown>
                    </el-form-item>
                  </el-form>
                      <div slot="footer">
                        <el-button @click="gradeUserclose">取 消</el-button>
                        <el-button type="primary" @click="putgradeUser()">确 定</el-button>
                      </div>
                </el-dialog>

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
        :total="total"
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
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的表达式
      const regEmail = /^[a-z,A-Z,0-9]+@[a-z,A-Z]+.[a-z,A-Z]+$/
      if (regEmail.test(value)) return cb()
      cb(new Error('请输入合法的邮箱'))
    }
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^1[3|4|5|8][0-9]\d{4,8}$/
      if (regMobile.test(value)) return cb()
      cb(new Error('请输入合法手机号！'))
    }
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      userList: [],
      total: 0,
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
        email: [
          { required: false, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, message: '邮箱格式不正确！请重新输入！', trigger: 'blur' }
        ],
        mobile: [
          { required: false, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, message: '电话号码格式不正确！请重新输入', trigger: 'blur' },
          { min: 11, max: 11, message: '', trigger: 'blur' }
        ]
      },
      modifyUserFromshwo: false,
      modifyUserInfo: {
        username: '',
        id: '',
        email: '',
        mobile: ''
      },
      modifyUserRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, message: '邮箱格式不正确！请重新输入！', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkMobile, message: '电话号码格式不正确！请重新输入', trigger: 'blur' },
          { min: 11, max: 11, message: '', trigger: 'blur' }
        ]
      },
      gradeUsershow: false,
      // 用户名
      // 用户ID
      // 角色ID
      // 当前用户角色名
      // 角色列表
      // 选中的角色名
      gradeUserInfo: {
        rid: '',
        username: '',
        id: '',
        role_name: '',
        rolesList: {},
        SelectedRoleName: '选择角色'
      },
      gradeUserRules: {
        rid: []
      }
    }
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('获取用户列表失败！')
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 监听pagesize改变事件
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听  页码数  改变事件
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 用户状态修改
    async userStateChanged (userInfo) {
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
        this.delFromInfo()
        this.$message.success({
          message: '用户' + res.data.username + '创建成功',
          type: 'success'
        })
      })
    },
    // 清空addFromInfo中所有参数的函数
    delFromInfo () {
      this.$refs.addFromInfoRef.resetFields()
      this.dialogFormVisible = false
    },
    delUserInfo (userInfo) {
      this.$confirm.userInfo = this.userInfo
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).then(() => {
        this.upDelUser(userInfo)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 删除 用户 的请求
    async upDelUser (userInfo) {
      const { data: res } = await this.$http.delete(`users/${userInfo.id}`)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.getUserList()
      this.$message.success('用户 ' + userInfo.username + ' ' + res.meta.msg)
    },
    // 修改  用户  的请求
    async modifyUser () {
      this.$refs.modifyUserRef.validate(async (valid) => {
        if (!valid) return
        const userInfo = this.modifyUserInfo.id
        const { data: res } = await this.$http.put('users/' + userInfo, { email: this.modifyUserInfo.email, mobile: this.modifyUserInfo.mobile })
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error(res.meta.message)
        this.$message.success('用户 ' + res.data.username + ' 修改  信息成功')
        this.getUserList()
        this.delModifyUserInfo()
      })
    },
    // 打开修改信息表单后 处理
    async modifyUserFrom (userInfo) {
      this.modifyUserInfo.username = userInfo.username
      this.modifyUserInfo.id = userInfo.id
      this.modifyUserFromshwo = true
    },

    delModifyUserInfo () {
      this.$refs.modifyUserRef.resetFields()
      this.modifyUserFromshwo = false
    },
    gradeUseropen (row) {
      this.gradeUserInfo.SelectedRoleName = '选中角色'
      this.getroles()
      this.gradeUserInfo.username = row.username
      this.gradeUserInfo.role_name = row.role_name
      this.gradeUserInfo.id = row.id
      this.gradeUsershow = true
    },
    gradeUserclose () {
      this.gradeUsershow = false
    },
    SelectedClick (rid, roleName) {
      this.gradeUserInfo.rid = rid
      this.gradeUserInfo.SelectedRoleName = roleName
    },

    async putgradeUser () {
      const rid = this.gradeUserInfo.rid
      const id = this.gradeUserInfo.id
      const { data: res } = await this.$http.put(`users/${id}/role`, { rid: rid })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      this.getUserList()
      this.gradeUserclose()
    },
    // 获取权限列表
    async getroles () {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.gradeUserInfo.rolesList = res.data
    }
  },
  comments: {
  }
}
</script>

<style lang='less' scoped>
#delbutton{
  margin-left: 10px;
}
</style>
