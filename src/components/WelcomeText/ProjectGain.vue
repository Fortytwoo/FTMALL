<template>
    <div class=''>
        <div>
            <p
                style="font-size:10.5pt; line-height:150%; margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0">
                <span
                    style="font-family:宋体; font-size:10.5pt">第一次完整的实现一个页面从开发到上线。项目虽然小，但是一整个流程下来仍然收获了很多知识。以及以往书上、各种教程中无法触及的点。</span>
            </p>
            <p
                style="font-size:10.5pt; line-height:150%; margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">首先对于前端目前组件化开发很看好，个人认为如果工作中有重复的事情在一定时间内超过</span><span
                    style="font-family:Calibri; font-size:10.5pt">5</span><span
                    style="font-family:宋体; font-size:10.5pt">次。就应该思考应该怎样简化操作流程，能够复用上一次完成的操作。这对于提高生产效率有着至关重要的意义。就如面向对象</span><span
                    style="font-family:Calibri; font-size:10.5pt">(OOP)</span><span
                    style="font-family:宋体; font-size:10.5pt">编程的思想一样，使用相对简单的模块构建复杂的大型程序的同时，也可以保证开发效率，以及降低多人协作时产生的沟通成本。</span>
            </p>
            <p
                style="font-size:10.5pt; line-height:150%; margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">当然面向过程</span><span
                    style="font-family:Calibri; font-size:10.5pt">(PO)</span><span
                    style="font-family:宋体; font-size:10.5pt">仍然是必不可少的，对于效率要求较高同时调用频繁的关键性代码采用</span><span
                    style="font-family:Calibri; font-size:10.5pt">PO</span><span
                    style="font-family:宋体; font-size:10.5pt">思想编程可以提高程序效率，节省时间成本。</span></p>
            <p
                style="font-size:10.5pt; line-height:150%; margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">经过这次项目也基本熟悉了</span><span
                    style="font-family:Calibri; font-size:10.5pt">Element UI </span><span
                    style="font-family:宋体; font-size:10.5pt">的用法。以及</span><span
                    style="font-family:Calibri; font-size:10.5pt">Vue</span><span
                    style="font-family:宋体; font-size:10.5pt">中构建单页面网页的流程。</span><span
                    style="font-family:Calibri; font-size:10.5pt"> </span><span
                    style="font-family:宋体; font-size:10.5pt">了解</span><span
                    style="font-family:Calibri; font-size:10.5pt">Vue</span><span
                    style="font-family:宋体; font-size:10.5pt">生命周期。</span></p>
            <p
                style="font-size:10.5pt; line-height:150%; margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">Git</span><span
                    style="font-family:宋体; font-size:10.5pt">的基本操作及使用</span></p>
            <p
                style="font-size:10.5pt; line-height:150%; margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">熟悉</span><span
                    style="font-family:Calibri; font-size:10.5pt">ES6</span><span
                    style="font-family:宋体; font-size:10.5pt">语法规范</span></p>
            <p
                style="font-size:10.5pt; line-height:150%; margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0">
                <span style="font-family:Calibri; font-size:10.5pt">Echarts、Vue-router、Vue-Cli、Axios</span><span
                    style="font-family:宋体; font-size:10.5pt">的基本使用</span></p>
            <p
                style="font-size:10.5pt; line-height:150%; margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0">
                <span
                    style="font-family:宋体; font-size:10.5pt">了解Vue响应式原理</span></p>
            <p
                style="font-size:10.5pt; line-height:150%; margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">对于构建一个完整的小型网页项目有了初步的认知，从开发以及到服务端部署上线等等。</span></p>
            <p
                style="font-size:10.5pt; line-height:150%; margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">对于本次项目并不是很满意，因为时间比较仓促，各处代码有多多少少的冗余。有很大的优化空间。</span></p>
            <p
                style="font-size:10.5pt; line-height:150%; margin:0pt; orphans:0; text-align:justify; text-indent:21pt; widows:0">
                <span style="font-family:宋体; font-size:10.5pt">另外，由于使用的是黑马的服务端</span><span
                    style="font-family:Calibri; font-size:10.5pt">API</span><span
                    style="font-family:宋体; font-size:10.5pt">，各类功能的实现并不是很理想，例如修改用户收货地址，因为服务端并没有提供此</span><span
                    style="font-family:Calibri; font-size:10.5pt">API</span><span
                    style="font-family:宋体; font-size:10.5pt">接口，故无法完成实际功能开发。如果未来精力以及时间允许的话，会考虑再次重构此项目，自己尝试编写后端的简单</span><span
                    style="font-family:Calibri; font-size:10.5pt">API</span><span
                    style="font-family:宋体; font-size:10.5pt">接口来完成基本的业务功能。</span></p>
        </div>
        <div class="cnzz" style="display: none;">
    </div>
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
  },
  comments: {
  }
}
</script>

<style lang='less' scoped>

</style>
