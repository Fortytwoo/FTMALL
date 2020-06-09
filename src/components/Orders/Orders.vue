<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单列表</el-breadcrumb-item>
          </el-breadcrumb>
      <!-- 卡片视图 -->
      <el-card>
        <!-- 头部搜索区域 -->
        <el-row :gutter="50">
          <el-col :span="7">
            <el-input placeholder="请输入内容" v-model="getOrdersSet.query" clearable @clear="getOrdersList">
              <el-button slot="append" icon="el-icon-search" @click="getOrdersList()"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <!-- table 表格数据展示区域 -->
        <el-table
            :data="ordersList"
            style="width: 100%"
            border
            stripe
            row-key="order_id">
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="订单编号" prop="order_number" width="400"></el-table-column>
          <el-table-column label="订单价格" prop="order_price"></el-table-column>
          <el-table-column label="是否付款" prop="order_pay">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.order_pay === '0'" type="danger">未付款</el-tag>
              <el-tag v-if="scope.row.order_pay === '1'" type="success">已付款</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="是否发货" prop="pay_status">
            <template slot-scope="scope">
              <span>{{scope.row.is_send}}</span>
            </template>
          </el-table-column>
          <el-table-column label="下单时间" width="170">
            <template slot-scope="scope">
              {{scope.row.create_time | conversionTime}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editAddressOpen(scope.row)"></el-button>
            <el-button type="success" icon="el-icon-map-location" size="mini" @click="sreachExpressOpen(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <!-- 修改地址的表单框 -->
      <el-dialog title="修改地址" :visible.sync="editAddressShow" @close="editAddressClose">
          <el-form
          :model="editAddressInfo"
          :rules="editAddressRules"
          ref="editAddressRef">
            <el-form-item label="省市区/县" prop="cascaderKey" label-width="100px">
            <el-cascader
                v-model="editAddressInfo.cascaderKey"
                :options="cityData"
                :props="editAddressProps"
                @change="changeCascader"></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="address" label-width="100px">
              <el-input v-model="editAddressInfo.address" clearable></el-input>
            </el-form-item>
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editAddressShow = false">取 消</el-button>
            <el-button type="primary" @click="editAddressPut">确 定</el-button>
            </div>
      </el-dialog>
      <el-dialog title="物流信息" :visible.sync="sreachExpressShow" @close="sreachExpressClose">
        <el-timeline :reverse="reverse">
          <el-timeline-item
          v-for="(item, index) in this.expressList" :key="index"
          :timestamp="item.ftime"

          :color="item.style.color">
            {{item.context}}
          </el-timeline-item>
        </el-timeline>
      </el-dialog>
    <el-pagination
      @size-change="changeSize"
      @current-change="changepage"
      :current-page="this.getOrdersSet.pagenum"
      :page-sizes="[10, 30, 50, 80]"
      :page-size="this.getOrdersSet.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.pageLayout.total"
      background>
    </el-pagination>
    </div>
</template>
<script>
import cityData from './citydata.js'

export default {
  data () {
    return {
      // 物流表单展示的顺序 False为上面是新数据下面是老数据
      reverse: false,
      // 共有多少项数据
      pageLayout: {
        total: null
      },
      ordersList: [],
      getOrdersSet: {
        query: '',
        pagenum: 1,
        pagesize: 10,
        user_id: null,
        pay_status: null,
        is_send: null,
        order_fapiao_title: null,
        order_fapiao_company: null,
        order_fapiao_content: null,
        consignee_addr: null
      },
      sreachExpressShow: false,
      editAddressShow: false,
      editAddressRules: {
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        cascaderKey: [
          { required: true, message: '请选择所在城市', trigger: 'blur' }
        ]
      },
      editAddressProps: {
        expandTrigger: 'click',
        value: 'value',
        label: 'label'
      },
      editAddressInfo: {
        cascaderKey: [],
        address: ''
      },
      cityData,
      id: '1106975712662',
      expressList: []
    }
  },
  created () {
    this.getOrdersList()
  },
  methods: {
    async getOrdersList () {
      const { data: res } = await this.$http.get('orders',
        { params: this.getOrdersSet }
      )
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.ordersList = res.data.goods
      this.getOrdersSet.pagenum = Number(res.data.pagenum)
      this.pageLayout.total = res.data.total
    },
    positionGoods (row) {
    },
    editAddressOpen (row) {
      this.editAddressShow = true
    },
    editAddressClose () {
      this.$refs.editAddressRef.resetFields()
    },
    changeCascader () {
      console.log(this.editAddressInfo.cascaderKey)
      console.log(this.editAddressInfo.address)
    },
    // 提交修改地址表单
    editAddressPut () {
      console.log(this.$message.error('Server restrictions!'))
    },
    // 打开物流信息对话框事件处理函数
    sreachExpressOpen () {
      this.getsreachExpress(this.id)
      this.sreachExpressShow = true
    },
    // 关闭物流信息对话框事件处理函数
    sreachExpressClose () {
      this.sreachExpressShow = false
      this.expressList = []
    },
    // 通过订单号查询物流信息
    async getsreachExpress (id) {
      const { data: res } = await this.$http.get(`/kuaidi/${id}`)
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      } else {
        this.expressList = res.data
        this.addStyle(res.data)
      }
    },
    // 对获得的物流信息进行处理，添加样式的属性
    // el-icon-success 对号图标
    // el-icon-truck       运输中图标
    addStyle (data) {
      console.log(data)
      for (let index = 0; index < data.length; index++) {
        data[index].style = { icon: 'el-icon-success', color: '#0bbd87', type: 'primary' }
        if (index === data.length - 1) {
          data[index].style = { icon: 'el-icon-truck', color: '#E6A23C', type: 'warning' }
        }
      }
    },
    // 改变每页大小
    changeSize (newSize) {
      this.getOrdersSet.pagesize = newSize
      this.getOrdersSet.pagenum = 1
      this.getOrdersList()
    },
    // 改变当前页码
    changepage (newPage) {
      this.getOrdersSet.pagenum = newPage
      this.getOrdersList()
    }
  },
  comments: {
  }
}
</script>

<style lang='less' scoped>

</style>
