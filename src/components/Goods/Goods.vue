<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
          </el-breadcrumb>
      <el-card>
        <el-row :gutter="50">
          <el-col :span="7">
            <el-input placeholder="请输入内容" v-model="getGoodset.query" clearable @clear="getGoodsList">
              <el-button slot="append" icon="el-icon-search" @click="getGoodsList()"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="addGoodsForm">添加商品</el-button>
          </el-col>
        </el-row>

        <!-- table 表格数据展示区域 -->
        <el-table
            :data="goodsList"
            style="width: 100%"
            border
            stripe
            row-key="goods_id">
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="商品名称" prop="goods_name" width="666"></el-table-column>
          <el-table-column label="商品价格" prop="goods_price"></el-table-column>
          <el-table-column label="商品重量" prop="goods_weight"></el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              {{scope.row.add_time | conversionTime}}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteGoods(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-card>

      <!-- 分页 -->
      <!-- @size-change="changeSize"                          页面大小改变事件
      @current-change="changepage"                       页数改变事件
      :current-page="currentPage4"                        当前页面页数
      :page-sizes="[100, 200, 300, 400]"                  分页设置
      :page-size="100"                                     每页显示数量
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">                                         全部条数 -->
      <el-pagination
      @size-change="changeSize"
      @current-change="changepage"
      :current-page="this.getGoodset.pagenum"
      :page-sizes="[10, 30, 50, 80]"
      :page-size="this.getGoodset.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.getGoodset.total"
      background>
    </el-pagination>
    </div>
</template>
<script>

export default {
  data () {
    return {
      goodsList: [],
      getGoodset: {
        query: '',
        pagenum: 1,
        pagesize: 10,
        total: null
      }
    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 获取商品列表
    // 字符串页数转换为整数型页数
    async getGoodsList () {
      const { data: res } = await this.$http.get('goods', { params: this.getGoodset })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.goodsList = res.data.goods
      this.getGoodset.total = res.data.total
      const pagenum = parseInt(res.data.pagenum)
      this.getGoodset.pagenum = pagenum
      console.log(res)
    },
    addGoodsForm () {
      this.$router.push('/addGoods')
    },
    // 删除商品
    deleteGoods (row) {
      this.$confirm.row = row
      this.$confirm('此操作将永久删除该商品， 是否继续？', '提示 ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        console.log(this.$confirm.row.goods_id)
        const { data: res } = await this.$http.delete(`goods/${this.$confirm.row.goods_id}`)
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        }
        this.$message.success(res.meta.msg)
        this.getGoodsList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 改变每页显示条数
    changeSize (newSize) {
      this.getGoodset.pagesize = newSize
      this.getGoodset.pagenum = 1
      this.getGoodsList()
    },
    // 改变页数
    changepage (newPage) {
      this.getGoodset.pagenum = newPage
      this.getGoodsList()
    }

  },
  comments: {
  }
}
</script>

<style lang='less' scoped>

</style>
