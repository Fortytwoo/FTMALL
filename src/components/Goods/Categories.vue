<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品分类</el-breadcrumb-item>
          </el-breadcrumb>
      <el-card>
        <!-- 添加分类Button -->
        <el-button type="primary" @click="addCateGoriesopen">添加分类</el-button>
        <!-- 添加分类Button 弹窗 -->
        <el-dialog
          title="添加分类"
          :visible.sync="addCateGoriesshow"
          width="50%"
          @close="addCateGoriesclose">
          <el-form
             ref="addCateGoriesRef"
            :model="addCateGoriesInfo"
            :rules="addCateGoriesRules"
            label-width="100px">
            <el-form-item label="分类名称 :" prop="cat_name">
              <el-input v-model="addCateGoriesInfo.cat_name"></el-input>
            </el-form-item>
               <!-- 级联选择框 -->
               <!-- options 用来指定数据源 -->
              <!-- props 用来指定配置对象 -->
            <el-form-item label="父级分类 :">
              <el-cascader
                ref="cascader"
                v-model="selectedKeys"
                :options="addCategoriesInfoList"
                :props="cascaderProps"
                placeholder = "一级分类"
                clearable
                @change="checkedCasc()"></el-cascader>
            </el-form-item>
          </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addCateGoriesclose">取 消</el-button>
              <el-button type="primary" @click="addCateGories">确 定</el-button>
              </div>
        </el-dialog>
        <!-- 商品分类列表 -->
    <el-table
        :data="CateGoriesList"
        style="width: 100%"
        border
        stripe
        row-key="cat_id"
        :tree-props="{cat_level: '0', cat_level: '1', cat_level: '2'}"
        >
          <el-table-column label=" " width="30"></el-table-column>
          <el-table-column   prop="listIndex" label="#" width="30"></el-table-column>
          <el-table-column prop="cat_name" label="分类名称" ></el-table-column>
          <el-table-column prop="cat_deleted" label="是否有效" >
            <template slot-scope="scope">
            <i class="el-icon-success" v-if="scope.row.cat_deleted == false"></i>
            <i class="el-icon-error" v-if="scope.row.cat_deleted == true"></i>
            </template>
             </el-table-column>
          <el-table-column prop="cat_level" label="排序" >
            <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level == 0" >一级</el-tag>
            <el-tag v-if="scope.row.cat_level == 1" type="success">二级</el-tag>
            <el-tag v-if="scope.row.cat_level == 2" type="warning">三级</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="操作" >
            <template slot-scope="scope">
              <el-button class="tableButton" @click="editCategoriesOpen(scope.row.cat_name)" type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <!-- .
.
.               这是编辑分类弹窗
.
. -->
            <el-dialog
              title="编辑分类"
              :visible.sync="editCategoriesShow"
              @close="editCategoriesClose"
              :append-to-body="false"
              :modal-append-to-body="false">
                <el-form
                   ref="editCategoriesRef"
                   :model="editCategoriesInfo"
                   :rules="editCategoriesRules"
                   label-width="80px">
                  <el-form-item label="分类名称 :" prpo="cat_name" required>
                    <el-input v-model="editCategoriesInfo.cat_name" clearable></el-input>
                  </el-form-item>
                  </el-form>
                <div slot="footer" class="dialog-footer">
                <el-button @click="editCategoriesClose">取 消</el-button>
                <el-button type="primary" @click="getEditCategories(scope.row.cat_id)">确 定</el-button>
                </div>
            </el-dialog>

              <el-button class="tableButton" type="danger" icon="el-icon-delete" @click="deleteCategories(scope.row)" size="mini">删除</el-button>

            </template>
          </el-table-column>
        </el-table>
        <!-- @size-change="changeSize"         页面每次展示页面大小改变时的事件
        @current-change="changeCurrent"   页面页码数改变时的事件 -->
        <el-pagination
      @size-change="changeSize"
      @current-change="changeCurrent"
      :current-page="this.getCateGoriesSet.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="this.getCateGoriesSet.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total">
    </el-pagination>
      </el-card>
    </div>
</template>
<script>

export default {
  data () {
    return {
      CateGoriesList: [],
      getCateGoriesSet: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      addCateGoriesshow: false,
      addCateGoriesInfo: {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0
      },
      addCateGoriesRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { max: 12, message: '最大长度为 12 个字符', trigger: 'blur' }
        ]
      },
      // 级联选择器的配置参数
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true
      },
      // 选中的父级ID数组
      selectedKeys: [],

      addCategoriesInfoList: [],
      editCategoriesInfo: {
        cat_name: '123'
      },
      editCategoriesShow: false,
      editCategoriesRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { max: 12, message: '最大长度为 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getCateGoriesList()
  },
  methods: {
    // 获取商品分类列表
    async getCateGoriesList () {
      const { data: res } = await this.$http.get('categories', { params: this.getCateGoriesSet })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.total = res.data.total
      this.getCateGoriesSet.pagenum = res.data.pagenum + 1
      this.getCateGoriesSet.pagesize = res.data.pagesize
      for (let index = 0; index < res.data.result.length; index++) {
        res.data.result[index].listIndex = index + 1
      }
      this.CateGoriesList = res.data.result
    },
    addCateGoriesopen () {
      this.getaddCateGoriesList()
      this.addCateGoriesshow = true
    },
    addCateGoriesclose () {
      this.addCateGoriesInfo = {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0
      }
      this.selectedKeys = []
      this.addCateGoriesshow = false
    },
    // 获取添加分类中的父级分类数据，并存到addCategoriesInfoList中加载
    async getaddCateGoriesList () {
      const { data: res } = await this.$http.get('categories', { params: { type: 2 } })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.addCategoriesInfoList = res.data
    },
    addCateGories () {
      this.$refs.addCateGoriesRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('categories', this.addCateGoriesInfo)
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.getCateGoriesList()
        this.addCateGoriesclose()
        this.$message.success(res.meta.msg)
      })
    },
    // 级联选择器点击事件
    // 获取selectedKeys的值，赋值到addCateGoriesInfo中传入pid  level  数据（cat_name绑定数据不用传）
    checkedCasc () {
      if (this.selectedKeys.length === 1) {
        this.addCateGoriesInfo.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        this.addCateGoriesInfo.cat_level = this.selectedKeys.length
      } else if (this.selectedKeys.length === 2) {
        this.addCateGoriesInfo.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        this.addCateGoriesInfo.cat_level = this.selectedKeys.length
      }
    },
    changeDeleted (row) {
      row.cat_deleted = !row.cat_deleted
    },
    editCategoriesOpen (name) {
      this.editCategoriesInfo.cat_name = name
      this.editCategoriesShow = true
    },
    editCategoriesClose () {
      this.editCategoriesShow = false
    },
    async getEditCategories (id) {
      const { data: res } = await this.$http.put(`categories/${id}`, this.editCategoriesInfo)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.getCateGoriesList()
      this.editCategoriesClose()
      this.$message.success(res.meta.msg)
    },
    deleteCategories (row) {
      this.$confirm.row = row
      this.$confirm('此操作将永久删除该分类， 是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete(`categories/${this.$confirm.row.cat_id}`)
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        }
        this.getCateGoriesList()
        this.$message.success('删除分类 ' + this.$confirm.row.cat_name + ' 成功！')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    changeSize (newSize) {
      this.getCateGoriesSet.pagesize = newSize
      this.getCateGoriesSet.pagenum = 1
      this.getCateGoriesList()
    },
    changeCurrent (newPage) {
      this.getCateGoriesSet.pagenum = newPage
      this.getCateGoriesList()
    }
  },
  comments: {
  }
}
</script>
<style lang='less' scoped>
.el-icon-success{
  color: #67C23A;
}
.el-icon-error{
  color: red;
}
.el-table{
  .el-button{
  margin-left: 22px;
  }
}
</style>
