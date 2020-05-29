<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>添加商品</el-breadcrumb-item>
          </el-breadcrumb>
      <el-card>
        <!-- 头部步骤组件 -->
           <el-alert title="添加商品信息" type="info" show-icon :closable="false" center></el-alert>
           <el-steps :space="200" :active="this.tabShow.stepsActive" finish-status="success" align-center>
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>
          <!-- tab组件 -->
          <el-tabs v-model="activeTab" @tab-click="titleText" tabPosition="left">
            <!-- 基本信息 -->
            <el-tab-pane :disabled="this.tabShow.basic" label="基本信息" name="basic">
                  <el-form
                  :model="basicFormInfo"
                  :rules="basicFormrules"
                  ref="basicFormRef"
                  label-width="120px">
                    <!-- 商品名称 -->
                    <el-form-item prop="goods_name" label="商品名称" >
                      <el-row>
                        <el-col :span="8">
                      <el-input v-model="basicFormInfo.goods_name" placeholder="请输入商品名称" clearable></el-input>
                    </el-col>
                      </el-row>
                    </el-form-item>
                    <!-- 商品价格 -->
                    <el-form-item prop="goods_price" label="商品价格">
                  <el-input-number v-model="basicFormInfo.goods_price" :min="1" :max="99999" label="商品价格"></el-input-number>
                    <span class="unit">元</span>
                    </el-form-item>
                    <!-- 商品重量 -->
                    <el-form-item prop="goods_number" label="商品重量">
                  <el-input-number v-model="basicFormInfo.goods_number" :min="1" :max="99999" label="商品重量"></el-input-number>
                    <span class="unit">千克</span>
                    </el-form-item>
                    <!-- 商品数量 -->
                    <el-form-item prop="goods_weight" label="商品数量">
                  <el-input-number v-model="basicFormInfo.goods_weight" :min="1" :max="99999" label="商品数量"></el-input-number>
                    </el-form-item>
                    <!-- 商品分类 -->
                    <el-form-item label="选择商品分类">
                 <el-cascader
                   ref="cascader"
                   v-model="selectedKeys"
                   :options="CategoriesInfoList"
                   :props="cascaderProps"
                   placeholder="请选择"
                   clearable
                   @change="checkedCasc">
                  </el-cascader>
                   </el-form-item>
                   <el-row>
                     <el-col :offset="3">
                       <el-button type="primary" @click="nextParameter">下一步</el-button>
                     </el-col>
                   </el-row>
                     </el-form>
                   </el-tab-pane>
        <!-- 商品参数 -->
            <el-tab-pane :disabled="this.tabShow.parameter" label="商品参数" name="parameter">
                 <el-form
                      ref="parameterFormRef"
                      label-width="200px"
                      label-position="top">
                <el-form-item v-for="item0 in this.catattr" :key="item0.attr_id" :label="item0.attr_name">
                  <el-checkbox-group v-model="item0.arr" border>
                    <el-row :gutter="0">
                      <el-col v-for="(item1, index) in item0.arr" :key="index"  :span="3">
                        <el-checkbox
                        :label="item1"
                        border
                        @change="changecheckbox(item0,item1)"></el-checkbox>
                        </el-col>
                      </el-row>
                    </el-checkbox-group>
                    <!-- {{item}} -->
                </el-form-item>
                  <el-row>
                     <el-col :offset="3">
                       <el-button type="primary" @click="nextAttributes">下一步</el-button>
                     </el-col>
                     <el-col :span="8"></el-col>
                   </el-row>
                     </el-form>
                </el-tab-pane>
          <!-- 商品属性 -->
            <el-tab-pane :disabled="this.tabShow.attributes" label="商品属性" name="attributes">
                   <el-form
                      ref="parameterFormRef"
                      label-width="300px">
                <el-form-item v-for="item in this.catattr" :key="item.attr_id" :label="item.attr_name">
                  <el-row>
                    <el-col :span="12">
                  <el-input v-model="item.attr_vals"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
                  <el-row>
                     <el-col :offset="8">
                       <el-button type="primary" @click="nextImage">下一步</el-button>
                     </el-col>
                     <el-col :span="8"></el-col>
                   </el-row>
                     </el-form>
                </el-tab-pane>
          <!-- 商品图片 -->
            <el-tab-pane :disabled="this.tabShow.image" label="商品图片" name="image">
              <el-form>
                <!-- 上传图片组件 -->
                <el-form-item>
                  <!-- 上传组件
                  action="https://jsonplaceholder.typicode.com/posts/" 图片要上传的后台API地址
                  list-type="picture-card"  文件类型
                  :on-preview="preView"     点击已上传的文件的钩子函数
                  :on-remove="handleRemove" 文件移除时候的钩子函数 -->
                  <el-upload
                        :action="this.uploadUrl"
                        list-type="picture-card"
                        :on-preview="preView"
                        :on-remove="handleRemove"
                        :on-success="uploadsuccess"
                        drag
                        auto-upload
                        :headers="headersObj">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                      <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                      </el-dialog>
                </el-form-item>
                  <el-row id="picBtn">
                     <el-col :offset="3">
                       <el-button type="primary" @click="nextContent">下一步</el-button>
                     </el-col>
                     <el-col :span="8"></el-col>
                   </el-row>
                     </el-form>
                </el-tab-pane>
        <!-- 商品内容 -->
            <el-tab-pane :disabled="this.tabShow.content" label="商品内容" name="content">
              <el-form>
                <quill-editor
                v-model="basicFormInfo.goods_introduce"
                :options="editorOption">
                </quill-editor>
                  <el-row>
                     <el-col :offset="9">
                       <el-button type="primary" @click="addGoodsput">提交</el-button>
                     </el-col>
                     <el-col :span="8"></el-col>
                   </el-row>
                     </el-form>
                </el-tab-pane>
          <!-- 完成界面 自动跳转 -->
            <el-tab-pane :disabled="this.tabShow.complete" label="完成" name="complete">
                <el-row id="row-success">
                  <el-col :offset="9">
                    <el-image
                         style="width: 50px; height: 50px"
                         src="https://i.loli.net/2020/05/29/H4ZvPEL9XmFi3aY.png">
                      </el-image>
                  </el-col>
                  <el-col :offset="6">添加成功！ 将在{{this.totalTime}}秒后 自动跳转至商品管理</el-col>
                  </el-row>
            </el-tab-pane>
          </el-tabs>
      </el-card>
    </div>
</template>
<script>

export default {
  data () {
    return {
      totalTime: 3,
      editorOption: {
        placeholder: '请输入商品内容'
      },
      tabShow: {
        // 控制头部步骤栏的参数
        stepsActive: 0,
        basic: false,
        parameter: true,
        attributes: true,
        image: true,
        content: true,
        complete: true
      },
      activeTab: 'basic',
      activeName: '',
      // 级联选择框选定的列表参数
      selectedKeys: [],
      // 存放级联选择框内加载数据
      CategoriesInfoList: [],
      cascaderProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 存放添加商品表单数据
      basicFormInfo: {
        // 商品名字，通过属性绑定用户输入
        goods_name: '',
        // 分类ID，通过级联选择器点击事件赋值
        goods_cat: '',
        // 三级分类ID，后续提交表单使用
        goods_catAll: '',
        // 商品价格，通过属性绑定用户输入
        goods_price: null,
        // 商品数量，通过属性绑定用户输入
        goods_number: null,
        // 商品重量，通过属性绑定用户输入
        goods_weight: null,
        // 商品介绍，通过属性绑定用户输入
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      // basic表单验证设置参数
      basicFormrules: {
        goods_name: [
          { required: true, message: '请输入商品名称！', trigger: 'blur' },
          { max: 12, message: '最大长度为 12 个字符', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类！', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格！', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量！', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量！', trigger: 'blur' }
        ]
      },
      // 存放导出的参数对象数组
      catattr: {},
      dialogImageUrl: '',
      dialogVisible: false,
      // 上传图片的Url地址
      uploadUrl: 'http://127.0.0.1:8888/api/private/v1/upload',
      // 上传图片的Header对象
      headersObj: {
        Authorization: window.sessionStorage.getItem('token')
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
      console.log(this.CategoriesInfoList)
    },
    // 级联选择器点击事件处理函数
    checkedCasc () {
      // 将获得的分类列表ID转换为字符串分割的ID
      if (this.selectedKeys.length === 3) {
        // 赋值到提交表单的参数内
        console.log(this.selectedKeys)
        // 将包含三级分类参数的值赋给goods_catAll 供后续提交表单使用
        this.basicFormInfo.goods_catAll = String(this.selectedKeys)
        this.basicFormInfo.goods_cat = String(this.selectedKeys[2])
        console.log(this.basicFormInfo.goods_cat)
      } else {
        this.selectedKeys = []
        this.$message.error('请选择三级分类！')
      }
    },
    // 校验 基本信息 表单 并进入 商品参数 界面
    nextParameter () {
      console.log(this.basicFormInfo.goods_cat)
      this.$refs.basicFormRef.validate((valid) => {
        if (!valid) return
        if (this.basicFormInfo.goods_cat === '') return this.$message.error('请选择商品分类！')
        this.activeTab = 'parameter'
        this.tabShow.parameter = false
        this.tabShow.stepsActive++
        this.getCatAttr(this.basicFormInfo.goods_cat, 'many')
      })
    },
    // 查询商品动态参数/静态属性
    async getCatAttr (id, sel) {
      const { data: res } = await this.$http.get(`categories/${id}/attributes`, { params: { sel: sel } })
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      } else {
        // for循环遍历res.data中的attr_vals输出字符串数组
        for (let index = 0; index < res.data.length; index++) {
          res.data[index].judge = []
          // 判断是否为空，若为空直接返回空数组
          if (res.data[index].attr_vals !== '') {
            // 将attr_vals以空格分割为字符串数组
            res.data[index].arr = res.data[index].attr_vals.split(' ')
          } else {
            res.data[index].arr = []
          }
        }
        this.catattr = res.data
        console.log(this.catattr)
      }
    },
    // 点击参数设置里的多选框触发的事件处理函数
    changecheckbox (item0, item1) {
    },
    // 校验 商品参数 表单 并进入 商品属性 界面
    nextAttributes () {
      // 1. 新建一个空对象
      // 2. 构造对象并相应赋值
      // 3.将对象push到attrs数组内
      var tempObj = {}
      for (let index = 0; index < this.catattr.length; index++) {
        for (let index1 = 0; index1 < this.catattr[index].arr.length; index1++) {
          tempObj = { attr_id: this.catattr[index].attr_id, attr_value: this.catattr[index].arr[index1] }
          this.basicFormInfo.attrs.push(tempObj)
          tempObj = {}
        }
      }

      this.activeTab = 'attributes'
      this.tabShow.attributes = false
      this.tabShow.stepsActive++
      this.getCatAttr(this.basicFormInfo.goods_cat, 'only')
    },
    // 校验 商品属性 表单 并进入 商品图片 界面
    nextImage () {
      // 1.创建对象
      // 2.构造对象，将对象push进attrs数组中
      var tempObj = {}
      for (let index0 = 0; index0 < this.catattr.length; index0++) {
        tempObj = { attr_id: this.catattr[index0].attr_id, attr_value: this.catattr[index0].attr_vals }
        this.basicFormInfo.attrs.push(tempObj)
      }
      console.log(this.basicFormInfo.attrs)
      this.activeTab = 'image'
      this.tabShow.image = false
      this.tabShow.stepsActive++
    },
    // 校验 商品内容 表单 并进入 商品内容 界面
    nextContent () {
      this.activeTab = 'content'
      this.tabShow.content = false
      this.tabShow.stepsActive++
    },
    // 提交信息，并进入完成添加界面
    nextComplete () {
      this.activeTab = 'complete'
      this.tabShow.complete = false
      this.tabShow.stepsActive++
      this.tabShow.stepsActive++
      console.log(this.basicFormInfo)
      this.atime()
    },
    // 切换步骤时的操作事件处理函数
    titleText () {
      switch (this.activeTab) {
        case 'basic':
          this.tabShow.stepsActive = 0
          break
        case 'parameter':
          this.tabShow.stepsActive = 1
          this.getCatAttr(this.basicFormInfo.goods_cat, 'many')
          break
        case 'attributes':
          this.tabShow.stepsActive = 2
          this.getCatAttr(this.basicFormInfo.goods_cat, 'only')
          break
        case 'image':
          this.tabShow.stepsActive = 3
          break
        case 'content':
          this.tabShow.stepsActive = 4
          break
        case 'complete':
          this.tabShow.stepsActive = 6
          break
        default:
          return this.$message.error('错误的Tab!')
      }
      console.log(typeof this.activeTab)
      console.log(this.stepsActive)
    },
    // 提交添加商品表单
    async addGoodsput () {
      const { data: res } = await this.$http.post('goods',
        {
          goods_name: this.basicFormInfo.goods_name,
          goods_cat: this.basicFormInfo.goods_catAll,
          goods_price: this.basicFormInfo.goods_price,
          goods_number: this.basicFormInfo.goods_number,
          goods_weight: this.basicFormInfo.goods_weight,
          goods_introduce: this.basicFormInfo.goods_introduce,
          pics: this.basicFormInfo.pics,
          attrs: this.basicFormInfo.attrs
        })
      if (res.meta.status !== 201) {
        return this.$message.error(res.meta.msg)
      } else {
        this.$message.success(res.meta.msg)
        this.nextComplete()
      }
    },
    // 删除上传文件时的钩子函数
    handleRemove (file) {
      // 根据返回的服务器临时文件路径，查找上传列表内是否有该路径
      // 如果有则删除该对象
      for (let index = 0; index < this.basicFormInfo.pics.length; index++) {
        if (Object.is(file.response.data.tmp_path, this.basicFormInfo.pics[index].pic)) {
          delete this.basicFormInfo.pics[index]
        }
      }
      console.log(this.basicFormInfo.pics)
    },
    // 上传成功的钩子函数
    uploadsuccess (response) {
      let temp = {}
      temp = { pic: response.data.tmp_path }
      this.basicFormInfo.pics.push(temp)
      temp = {}
      console.log(this.basicFormInfo.pics)
    },
    // 上传图片组件----预览大图
    preView (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 倒计时返回商品列表页面
    atime () {
      // eslint-disable-next-line no-unused-vars
      const clock = window.setInterval(async () => {
        await this.totalTime--
        if (this.totalTime === 0) {
          this.$router.push('/goods')
        }
      }, 1000)
    }
  },
  computed: {
  }
}
</script>

<style lang='less' scoped>
.el-step{
  // margin: 30px 50px;
  font-size: 10px;
}
.unit{
  margin-left: 20px;
}
// form-item-label 向左对齐
.el-form-item label:after {
    content: "";
    display: inline-block;
    width: 100%;
}
.el-form-item__label {
    text-align: justify;
    height: 50px;
}
.el-form-item.is-required .el-form-item__label:before {
    content: none !important;
}
#picBtn{
  margin-top: 50px;
}
#row-success{
  margin-top: 60px;
  .el-col{
    margin-top: 20px;
  }
}
</style>
