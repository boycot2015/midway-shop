<template>
  <el-result title="404" sub-title="页面跑到外太空去了~">
    <template #icon>
      <el-image
      style="margin-top: 100px;"
        src="https://pc-test.haoxiny.com/_nuxt/img/404.451dec6.png"
      />
    </template>
    <template #extra>
      <router-link to="/"><el-button type="primary">返回首页</el-button></router-link>
    </template>
  </el-result>
</template>