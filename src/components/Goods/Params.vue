<template>
  <div>
    <!-- 页头 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 头部警告提示区域 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false"></el-alert>
      <!-- 级联选择器选择商品分类 -->
      <el-form>
        <el-form-item label="选择商品分类：">
          <el-cascader
            ref="cascader"
            v-model="selectedKeys"
            :options="CategoriesInfoList"
            :props="cascaderProps"
            placeholder="请选择"
            clearable
            @change="checkedCasc"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <!-- 页内标签Tab -->
      <el-tabs v-model="activeName" @tab-click="switchTab(activeName)">
        <!-- tab---动态参数 -->
        <el-tab-pane label="动态参数" name="many" :disabled="showtab">
          <!-- 添加参数button -->
          <el-button type="primary" @click="addRowOpen" :disabled="showbtn">添加参数</el-button>
          <!-- 展示动态参数数据表格 -->
          <el-table :data="riesList" style="width: 100%" border stripe row-key="attr_id">
            <!-- 表格第一列 拓展 展示参数数据 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-form label-position="left">
                  <!-- for循环 循环渲染参数tag标签名称 -->
                    <el-tag
                    v-for="(item,index) in scope.row.tap"
                    :key="index"
                    closable
                    @close="deletetag(index, scope.row)">{{item}}</el-tag>
                    <!-- input---button按钮间断切换来实现点击输入，失去焦点提交表单 -->
                    <el-input
                        class="input-new-tag"
                        v-if="scope.row.tagIptBtnShwo"
                        v-model="scope.row.tagNewVals"
                        ref="editValsRef"
                        size="small"
                        @keyup.enter.native="$event.target.blur"
                        @blur="editValsPut(scope.row)"
                        clearable
                      >
                      </el-input>
                      <el-button v-else class="button-new-tag" size="small" @click="scope.row.tagIptBtnShwo= true">+ New Tag</el-button>
                </el-form>
              </template>
            </el-table-column>
            <!-- 表格第二列  index 序列 -->
            <el-table-column type="index" label="#"  width="40"></el-table-column>
            <!-- 表格第三列 参数名称 -->
            <el-table-column prop="attr_name" label="参数名称"></el-table-column>
            <!-- 表格第四列  操作 内含  编辑和删除   -->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editRowOpen(scope.row)"
                >编辑</el-button>
                <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteRow(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- tab---静态属性 -->
        <el-tab-pane label="静态属性" name="only" :disabled="showtab">
          <!-- 添加属性button -->
          <el-button type="primary" @click="addRowOpen" :disabled="showbtn">添加属性</el-button>
          <!-- 展示静态属性数据表格 -->
          <el-table :data="riesList" style="width: 100%" border stripe row-key="attr_id">
            <!-- 表格第一列 拓展 展示属性数据 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-form label-position="left">
                  <!-- for循环 循环渲染参数tag标签名称 -->
                    <el-tag
                    v-for="(item,index) in scope.row.tap"
                    :key="index"
                    closable
                    @close="deletetag(index, scope.row)">{{item}}</el-tag>
                    <!-- input---button按钮间断切换来实现点击输入，失去焦点提交表单 -->
                    <el-input
                        class="input-new-tag"
                        v-if="scope.row.tagIptBtnShwo"
                        v-model="scope.row.tagNewVals"
                        ref="editValsRef"
                        size="small"
                        @keyup.enter.native="$event.target.blur"
                        @blur="editValsPut(scope.row)"
                        clearable
                      >
                      </el-input>
                      <el-button v-else class="button-new-tag" size="small" @click="scope.row.tagIptBtnShwo= true">+ New Tag</el-button>
                </el-form>
              </template>
            </el-table-column>
            <!-- 表格第二列  index 序列 -->
            <el-table-column type="index" label="#" width="40"></el-table-column>
            <!-- 表格第三列 属性名称 -->
            <el-table-column prop="attr_name" label="属性名称"></el-table-column>
            <!-- 表格第四列  操作 内含  编辑和删除   -->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="editRowOpen(scope.row)"
                >编辑</el-button>
                <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteRow(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数/属性的对话框 -->
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="addRowShow"
      width="50%"
      @close="addRowClose">
      <!--  公共的 添加参数的对话框 -->
      <el-form :model="addFormInfo" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addFormInfo.attr_name" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRowShow = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="'编辑' + titleText"
      :visible.sync="editRowShow"
      width="50%"
      @close="editRowClose"
    >
      <!-- 公共的 编辑参数的对话框 -->
      <el-form :model="editRowInfo" :rules="editRowRules" ref="editRowRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editRowInfo.attr_name" clearable></el-input>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editRowShow = false">取 消</el-button>
          <el-button type="primary" @click="editCategoriesRequest">确   定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data () {
    return {
      editManyRowShow: false,
      // 初始化button按钮禁止选择
      showbtn: true,
      showtab: true,
      // 级联选择框选定的列表参数
      selectedKeys: [],
      // 存放级联选择框内加载数据
      CategoriesInfoList: [],
      // 级联选择框加载数据的配置参数
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // Tab组件默认选择的组件名  默认选择动态组件
      activeName: 'many',
      activeFormName: '动态参数',
      // 存放动态/静态表格数据
      riesList: [],
      // 由级联选择框相关函数传入参数
      // 并依赖此对象 发送请求获取存入 riesList 数组中的数据
      // 加载到 动态/静态参数的 table表格中
      addParamsInfo: {
        id: null,
        attr_name: '',
        sel: 'many',
        attr_vals: [],
        attrid: null
      },

      // 控制 静态属性/动态参数  添加  编辑  弹窗的显示
      addRowShow: false,
      editRowShow: false,
      // 存储添加  静态属性/动态参数 表单提交的 参数
      addFormInfo: {
        attr_name: ''
      },
      addFormRules: {
        attr_name: [
          { required: true, message: '请输入商品参数/属性', trigger: 'blur' },
          { max: 12, message: '最大长度为 12 个字符', trigger: 'blur' }
        ]
      },
      // 修改 静态属性/动态参数 的提交表单
      editRowInfo: {
        attr_name: ''
      },
      editRowRules: {
        attr_name: [
          { required: true, message: '请输入商品参数/属性', trigger: 'blur' },
          { max: 12, message: '最大长度为 12 个字符', trigger: 'blur' }
        ]
      },
      // 请求修改参数的配置参数
      editRequestset: {
        id: null,
        attrid: null,
        attr_sel: '',
        attr_vals: []
      }
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 获取级联选择框需要的参数
    async getGoodsList () {
      const { data: res } = await this.$http.get('categories', { params: { type: 3 } })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.CategoriesInfoList = res.data
    },

    // 点击级联选择框事件处理函数
    checkedCasc () {
      if (this.selectedKeys.length !== 3) {
        this.selectedKeys = []
      }
      this.addParamsInfo.id = this.selectedKeys[this.selectedKeys.length - 1]
      // 如果成功点击，则刷新下方  静态  动态列表
      // 且开启  button按钮  和  Tab页面切换组件
      this.getriesList()
      this.showbtn = false
      this.showtab = false
    },
    // 获取静态/动态列表数据
    async getriesList () {
      if (this.addParamsInfo.id === undefined) {
        this.showbtn = true
        this.showtab = true
        this.$message.error('请选择商品分类后，更改商品分类参数！')
      } else {
        const { data: res } = await this.$http.get(`categories/${this.addParamsInfo.id}/attributes`, { params: this.addParamsInfo })
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }
        // 将attr_vals转换为列表形式的字符串以,分割
        const Strobj = this.strChangeList(res.data)
        this.riesList = Strobj
      }
    },

    // attr_vals转换列表方法
    strChangeList (Strobj) {
      for (let index = 0; index < Strobj.length; index++) {
        if (Strobj[index].attr_vals === '') {
          Strobj[index].tap = []
        } else {
          Strobj[index].tap = Strobj[index].attr_vals.split(' ')
        }
        // 每行数据 控制文本框的显示与隐藏
        Strobj[index].tagIptBtnShwo = false
        // 每行数据 文本框中，输入的值
        Strobj[index].tagNewVals = ''
      }
      return Strobj
    },
    switchTab (activeName) {
    // 修改 动态参数/静态属性 列表请求需要的参数sel
      this.addParamsInfo.sel = activeName
      // 修改 动态参数/静态属性 内发起的修改请求所需的参数
      this.editRequestset.attr_sel = activeName
      this.getriesList()
    },

    // 打开 添加静态/动态参数弹窗
    addRowOpen () {
      this.addRowShow = true
    },
    // 关闭 添加静态/动态参数弹窗
    addRowClose () {
      this.addRowShow = false
      this.$refs.addFormRef.resetFields()
    },
    // ==================================================
    // 打开 编辑静态/动态参数弹窗
    editRowOpen (row) {
      this.addParamsInfo.attrid = row.attr_id
      this.editRowInfo.attr_name = row.attr_name
      this.editRowShow = true
    },
    // 关闭 编辑静态/动态参数弹窗
    editRowClose () {
      this.editRowShow = false
      this.$refs.editRowRef.resetFields()
    },
    // 删除 Many/Only 行内数据
    deleteRow (row) {
      this.$confirm.row = row
      this.$confirm('此操作将永久删除该参数，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete(`categories/${this.$confirm.row.cat_id}/attributes/${this.$confirm.row.attr_id}`)
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        } else {
          this.getriesList()
          this.$message.success('删除参数 ' + row.attr_name + ' 成功！')
        }
      }).catch(() => {
        this.$message.info('已取消删除！')
      })
    },
    // 提交 添加动态静态参数
    addParams () {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post(`categories/${this.addParamsInfo.id}/attributes`,
          {
            attr_name: this.addFormInfo.attr_name,
            attr_sel: this.addParamsInfo.sel
          })
        if (res.meta.status !== 201) {
          return this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.getriesList()
        this.addRowClose()
      })
    },

    // 编辑提交参数
    editCategoriesRequest () {
      this.$refs.editRowRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.put(`categories/${this.addParamsInfo.id}/attributes/${this.addParamsInfo.attrid}`,
          {
            attr_name: this.editRowInfo.attr_name,
            attr_sel: this.addParamsInfo.sel
          })
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg)
        }
        this.getriesList()
        this.editRowClose()
        this.$message.success(res.meta.msg)
      })
    },
    // 提交更改的参数
    async editValsPut (row) {
      // 将输入框内全部空格删除
      row.tagNewVals = row.tagNewVals.replace(/ /g, '')
      // 判断是否是空标签
      if (row.tagNewVals === '') {
        this.$message.error('参数标签内禁止含有空格！')
        this.tagIptBtnShwo = false
        return
      }
      // 把要提交的新参数名字插入到原数据 以空格分割的字符串中
      if (row.tap.length === 0) {
        row.attr_vals = row.tagNewVals
      } else {
        row.attr_vals = row.attr_vals + ' ' + row.tagNewVals
      }
      const { data: res } = await this.$http.put(`categories/${row.cat_id}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: this.addParamsInfo.sel,
          attr_vals: row.attr_vals
        })
      if (res.meta.status !== 200) {
        this.$message.error('写入参数失败！')
        this.tagIptBtnShwo = true
      } else {
        this.$message.success('写入参数成功！')
        this.tagIptBtnShwo = true
        this.getriesList()
      }
    },
    // 1.删除row.tap数组内的选定标签
    // 2.转换row.tap数组为空格分割的字符串
    // 3.覆盖row.attr_vals 形成新的以空格分割的字符串并提交
    // 4.刷新表格
    async deletetag (delindex, row) {
      // 用数组的splice方法 删除选定的数组下标的元素
      row.tap.splice(delindex, 1)
      // 初始化接受的字符串
      let Str = ''
      // 通过For循环 来循环遍历出数组内元素并循环写入到接受的字符串内
      for (let index = 0; index < row.tap.length; index++) {
        if (index !== 0) {
          Str = ' ' + Str
          if (index === row.tap.length) {
            Str = Str + ' '
          }
        }
        Str = Str + row.tap[index]
      }
      const { data: res } = await this.$http.put(`categories/${row.cat_id}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: this.addParamsInfo.sel,
          attr_vals: Str
        })
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
        this.getriesList()
      } else {
        this.$message.success('删除参数成功！')
        this.getriesList()
      }
    }
  },
  computed: {
    titleText () {
      // 页内切换tab时候事件处理函数
      if (this.activeName === 'many') {
        return '动态参数'
      } else {
        return '静态属性'
      }
    }
  }
}

</script>

<style lang='less' scoped>
.el-alert{
  margin-bottom: 20px;
}
.el-tag{
  margin: 5px 10px;
}
.input-new-tag{
  width: 120px;
}
</style>
