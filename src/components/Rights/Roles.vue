<template>
<div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  <el-breadcrumb-item>角色列表</el-breadcrumb-item>
</el-breadcrumb>
<el-card>
  <!-- 头部按钮区域 -->
<el-button type="primary" @click="addRolesOpen">添加角色</el-button>
    <el-dialog title="添加角色" :visible.sync="addRolesshowBL" @close="addRolesclose" >
  <el-form
  :model="addRolesInfo"
  label-width="80px"
  ref="RolesInfoRef"
  :rules="addRolesRules">
    <el-form-item label="角色名称" prop="roleName">
      <el-input v-model="addRolesInfo.roleName"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="roleDesc">
      <el-input v-model="addRolesInfo.roleDesc"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer">
    <el-button @click="addRolesclose">取 消</el-button>
    <el-button type="primary" @click="addRoles">确 定</el-button>
  </div>
    </el-dialog>
<!-- 角色列表区域 -->
<el-table
    :data="rolesLsitInfo"
    style="width: 100%"
    border
    stripe>
    <!-- 展开列 -->
    <el-table-column type="expand" >
      <template slot-scope="scope">
        <el-form label-position="left" inline class="demo-table-expand">
            <el-row v-for="(item1,i1) in scope.row.children " :key="item1.id"  :class="['bdbottom',i1 ===0 ? 'bdtop' : '','vcenter']">
              <!-- 渲染一级权限 -->
              <el-col :span="5" >
                <el-tag closable @close="removeRightById(scope.row, item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和三级权限 -->
              <el-col :span="19">
                <el-row v-for="(item2,i2) in item1.children" :key="item2.id" :class="[i2 === 0 ? '' : 'bdtop']['vcenter']">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightById(scope.row, item2.id)">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                    </el-col>
                    <!-- 三级权限渲染 -->
                  <el-col :span="18">
                    <el-tag type="warning" closable v-for="(item3) in item2.children" :key="item3.id" @close="removeRightById(scope.row, item3.id)">{{item3.authName}}</el-tag>
                    </el-col>
                </el-row>
              </el-col>
            </el-row>
        </el-form>
      </template>
    </el-table-column>
    <!-- 角色列表表头索引列 -->
    <el-table-column type="index" width = "50px" label="#">
    </el-table-column>
    <el-table-column
      label="角色名称"
      prop="roleName">
    </el-table-column>
    <el-table-column
      label="角色概述"
      prop="roleDesc">
    </el-table-column>
    <el-table-column
      label="操作"
      prop="desc"
      >
      <template slot-scope="scope">
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="rewriteRolesInfoopen()">编辑</el-button>
<!--
1
1
1
1px             这是编辑 弹出框
1
1
 -->
        <el-dialog title="编辑角色" :visible.sync="rewriteRolesInfoshwo" @close="rewriteRolesInfoclose" width="666px">
        <el-form
        :model="rewriteRolesInfo"
        label-width="80px"
        ref="rewriteRolesRef"
        :rules="addRolesRules">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="rewriteRolesInfo.roleName">
            </el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="rewriteRolesInfo.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="rewriteRolesInfoclose">取 消</el-button>
          <el-button type="primary" @click="rewriteRolesInfoput(scope.row)">确 定</el-button>
        </div>
          </el-dialog>
        <!-- 删除角色-->
        <el-button id="delbtn" size="mini" type="danger" icon="el-icon-delete" @click="delRolesInfo(scope.row)">删除</el-button>
        <!-- 修改角色权限 -->
        <el-button size="mini" type="warning" icon="el-icon-setting" @click="managementRolesInfoopen(scope.row)">分配权限</el-button>
<!-- .。
。
。
。        这是修改角色权限
。
。
。 -->
      <el-dialog title="分配权限" :visible.sync="managementRolesInfoshow" @close="managementRolesInfoclose" width="50%">
       <!-- 树形控件 -->
       <el-tree
       ref="tree"
       :data="managementRolesInfo"
       :props="treeProps"
       default-expand-all
       show-checkbox
       node-key="id"
       :default-checked-keys= "keytree"
       >
       </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="managementRolesInfoclose">取 消</el-button>
          <el-button type="primary" @click="getcheckRoles">确 定</el-button>
        </div>
          </el-dialog>
    </template>
    </el-table-column>
  </el-table>
</el-card>
</div>
</template>
<script>

export default {
  created () {
    this.getRolesList()
  },
  data () {
    return {
      // 所有角色列表数据
      rolesLsitInfo: [],

      addRolesInfo: {
        roleName: '',
        roleDesc: ''
      },
      addRolesshowBL: false,
      addRolesRules: {
        roleName: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
          { max: 10, message: '长度最大 10 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: false, message: '请输入角色描述', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]
      },

      rewriteRolesInfoshwo: false,
      rewriteRolesInfo: {
        roleName: '',
        roleDesc: ''
      },
      managementRolesInfoshow: false,
      managementRolesInfo: [],
      // 树形控件的属性绑定对象
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      keytree: [],
      treeLoadding: true,
      treeRolesId: ''
    }
  },
  methods: {
    // 更新角色列表
    async getRolesList () {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.rolesLsitInfo = res.data
    },

    // 添加角色
    async addRoles () {
      const { data: res } = await this.$http.post('roles', this.addRolesInfo)
      if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
      this.getRolesList()
      this.addRolesclose()
      this.$message.success(res.meta.msg)
    },

    // 打开 关闭添加角色弹出框
    addRolesclose () {
      this.addRolesshowBL = false
      this.$refs.RolesInfoRef.resetFields()
    },
    addRolesOpen () {
      this.addRolesshowBL = true
    },

    // 删除角色
    delRolesInfo (row) {
      this.$confirm.id = row.id
      this.$confirm.roleName = row.roleName
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
      ).then(() => {
        this.deleteRolesInfo(this.$confirm.id, this.$confirm.roleName)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 提交 删除角色
    async deleteRolesInfo (id, roleName) {
      const { data: res } = await this.$http.delete(`roles/${id}`)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.getRolesList()
      this.$message.success('角色' + roleName + res.meta.msg)
    },

    // 打开 关闭 编辑角色对话框
    rewriteRolesInfoopen () {
      this.rewriteRolesInfoshwo = true
    },
    rewriteRolesInfoclose (row) {
      this.$refs.rewriteRolesRef.resetFields()
      this.rewriteRolesInfoshwo = false
    },
    // 提交 编辑角色
    async rewriteRolesInfoput (row) {
      const { data: res } = await this.$http.put(`roles/${row.id}`, this.rewriteRolesInfo)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      const tempname = this.rewriteRolesInfo.roleName
      this.rewriteRolesInfoclose()
      row.roleName = res.data.roleName
      row.roleDesc = res.data.roleDesc
      this.$message.success('修改角色 ' + tempname + ' 成功！')
    },
    // 打开 关闭 分配权限 弹窗
    managementRolesInfoopen (row) {
      this.getmanagementRolesInfo(row)
      this.treeRolesId = row.id
    },
    managementRolesInfoclose () {
      const arr = []
      this.$refs.tree.setCheckedNodes(arr)
      this.keytree = []
      this.managementRolesInfoshow = false
    },
    // 通过递归方式，获取角色下所有三级权限ID，并保存到key这个数组
    getleafkey (node, arr) {
      this.managementRolesInfoshow = true
      // 如果当前Node 节点不包含children属性 则是三级节点，将id push到arr数组中
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getleafkey(item, arr)
      })
      this.treeLoadding = false
    },
    // 获取所有权限列表
    async getmanagementRolesInfo (row) {
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) return this.$message.error('获取权限列表失败！')
      this.managementRolesInfo = res.data
      this.getleafkey(row, this.keytree)
    },
    getcheckRoles () {
      const father = this.$refs.tree.getCheckedKeys()
      const child = this.$refs.tree.getHalfCheckedKeys()
      // 将两段数字列表拼起来后用'，'分割
      const rids = father.concat(child)
      const ridsStr = rids.join(',')
      const id = this.treeRolesId
      this.addmanagement(id, ridsStr)
    },
    // 增加权限
    async addmanagement (id, rids) {
      const { data: res } = await this.$http.post(
        `roles/${id}/rights`,
        { rids: rids }
      )
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.getRolesList()
      this.managementRolesInfoclose()
      this.$message.success('设置权限成功！')
    },

    // 删除权限
    async removeRightById (row, RolId) {
      const { data: res } = await this.$http.delete(`roles/${row.id}/rights/${RolId}`)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      row.children = res.data
      // this.$message.success(res.meta.msg)
    }
  },
  comments: {
  }
}
</script>

<style lang='less' scoped>
.el-tag{
  margin: 7px;
}
.bdtop{
  border-top: 1px solid #eee;
}
.bdbottom{
  border-bottom: 1px solid #eee;
}
.vcenter{
  display: flex;
  align-items: center;
}
#delbtn{
  margin-left: 10px;
}
</style>
