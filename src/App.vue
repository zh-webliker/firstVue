<template>
  <div id="app">
    <!-- 头部导航 -->
    <!-- <header class="header">
      <el-row>
        <el-col :span="24">
          <el-menu default-active="5" class="el-menu-demo" mode="horizontal" @select="active">
            <el-menu-item index="1">高级插件</el-menu-item>
            <el-menu-item index="2">在线商城</el-menu-item>
            <el-menu-item index="3">客户管理</el-menu-item>
            <el-menu-item index="4">系统设置</el-menu-item>
            <el-menu-item index="5">活动发布</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </header> -->
    <div style="position: relative;height: 60px;width: 100%;"></div>

    <main>
      <!-- 左侧导航 -->
      <div class="main-left">
        <el-menu default-active="/activeManage" class="el-menu-vertical-demo" :router="true">
          <el-menu-item index="/activeManage" :class="{'isActive': !active}">名宿管理</el-menu-item>
          <el-menu-item index="/choManage" :class="{'isActive': !active}">精选管理</el-menu-item>
          <el-menu-item index="/labelManage" :class="{'isActive': !active}">分类管理</el-menu-item>
        </el-menu>
      </div>

      <!-- 右侧主内容区 -->
      <div class="main-right">

        <!-- 视图 -->
        <router-view class="view"></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'

Vue.use(Element)
Vue.use($)

export default {
  name: 'app',
  data: function () {
    return {
      active: true
    }
  },
  created: function () {
    this.$router.push('/activeManage')
  }
}
</script>

<style>
body {
  margin: 0;
}
#app {
  min-width: 1200px;
  margin: 0 auto;
  font-family: "Helvetica Neue", "PingFang SC", Arial, sans-serif;
}
/* 头部导航 */
header {
  z-index: 1000;
  min-width: 1200px;
  transition: all 0.5s ease;
  border-top: solid 4px #3091f2;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
header.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
header .el-menu-demo {
  padding-left: 300px !important;
}
.el-upload-dragger{
  width: 196px !important;
  height: 138px !important;
}
/* 主内容区 */
main {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-height: 800px;
  border: solid 40px #e9ecf1;
  background-color: #fcfcfc;
}
main .main-left {
  text-align: center;
  width: 200px;
  float: left;
}
main .main-right {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  background-color: #fff;
  padding: 50px 70px;
}
main .el-menu {
  background-color: transparent !important;
}
.el-upload{
  height: 145px !important;
  width: 265px !important;
}
/* .el-upload-dragger{
  width: 200px !important;
  height: 90px !important;
} */
.upload_box {
  width: 100px !important;
  height: 90px !important;
}
</style>
