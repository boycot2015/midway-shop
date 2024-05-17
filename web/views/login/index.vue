<template>
    <div class="login-box tc flex flex-column flex-center flex-justify-center">
        <div class="logo">
            <el-image :src="websiteConfig.websiteLogo"></el-image>
        </div>
        <div class="login-box-body">
            <el-form size="large">
                <el-form-item class="tc">
                    <div class="flex flex-justify-center" style="width: 100%;">
                        <el-image :src="websiteConfig.websiteLogo"></el-image>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="请输入账号" v-model="formData.userName">
                        <template #prepend><el-icon><User /></el-icon>账号</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" show-password placeholder="请输入密码" v-model="formData.password">
                        <template #prepend><el-icon><Lock /></el-icon>密码</template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <div class="flex flex-justify-center" style="width: 100%;margin-top: 10px;">
                        <el-button :loading="loading" type="primary" @click="onSubmit" style="width: 100%;">登录</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import { useUserStore } from '@/store/user';
import { useAppStore } from '@/store/app';
import { User, Lock } from '@element-plus/icons-vue';

const route = useRoute();
const userStore = useUserStore();
const appStore = useAppStore();
appStore.getWebsiteConfig();
let websiteConfig = computed<any>(() => appStore.$state.websiteConfig || {});
export default defineComponent({
    name: 'Login',
  seo({store}) {
//    const dataStore = useDataStore(store);
   return {
      title: '登录页',
   }
  }
})
</script>
<script lang="ts" setup>
import request from '@/utils/request';
function login(params: any): Promise<any> {
  return request({
    url: '/api/login/account/pwd',
    method: 'post',
    data: {
        clientType: 1001,
        ...params
    },
  });
}
const formData = ref({
    userName: '',
    password: ''
})
const loading = computed(() => userStore.$state.loading)
const onSubmit = () => {
    userStore.setUserInfo({ loading: true });
    login(formData.value).then((res: any) => {
        if (res && res.success) {
            userStore.setUserInfo(res.data);
        } else {
            userStore.setUserInfo({ loading: false });
        }
    })
}
</script>

<style lang="scss" scoped>
.login-box {
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: var( --color-bg);
    .logo {
        position: absolute;
        left: 20px;
        top: 20px;
        height: 80px;
        img {
            height: 100%;
        }
    }
    &-body {
        padding: 20px;
        width: 460px;
        height: auto;
        border-radius: 5px;
        background-color: var( --color-white);
        box-shadow: 0px 12px 36px rgba(255, 255, 255, 0.1);
    }
}
</style>