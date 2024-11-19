<template>
  <tm-app>
    <view class="bg">
      <view class="card">
        <view class="logo">
          <tm-image
            :width="400"
            :height="400"
            src="/static/jiaokong_nowatermark2.png"
          ></tm-image>
        </view>
        <view class="input">
          <tm-input
            v-model="status.username"
            :font-size="fontSize"
            :border="3"
            :margin="[100, 25]"
            color="#f5f5f5"
            focus-color="#25b1bf"
            placeholder="请输入账号"
          ></tm-input>
          <tm-input
            v-model="status.password"
            :font-size="fontSize"
            :border="3"
            :margin="[100, 25]"
            color="#f5f5f5"
            focus-color="#25b1bf"
            placeholder="请输入密码"
            password
          ></tm-input>
        </view>
        <view class="btn">
          <tm-button
            :linear-color="['#de283b', '#ff6366']"
            color="orange"
            font-color="#ffccc4"
            :font-size="35"
            linear="right"
            :height="80"
            block
            label="登录"
            @click="hdLogin"
          ></tm-button>
        </view>
      </view>
    </view>
    <view class="bottom-btn">
      <tm-button label="测试页面" @click="toTest"></tm-button>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { loginToService } from '@/api/index'
import { getProjectDetail } from '@/api/receive'
import { useMainStore } from '@/store'
import { toast } from '@/utils/message'
import { initProjects } from '@/utils/receiveHandler'
import { reactive } from 'vue'
import { fontSize } from '@/utils/fontSizeHandler'

const status = reactive<UserReq>({
  username: '',
  password: '',
})

const mainStore = useMainStore()

const hdLogin = async () => {
  if (!status.username || !status.password) {
    toast('请输入用户名和密码')
    return
  }
  const res = await loginToService(status)
  mainStore.setToken(res.token)
  mainStore.username = status.username
  // const detail = await getProjectDetail()
  // const pj = initProjects(detail)
  // mainStore.assignProjInfo(pj)
  // uni.navigateTo({
    // url: '/pages/tableSelect/index',
  // })
  
  console.log(mainStore.username)
  console.log(res.token)
  uni.navigateTo({
    // url: '/pages/tableSelect/index',
    url:'/pages/functionNavigator/functionNavigator'
  })
}

const toTest = async () => {
  if (mainStore.getToken().length !== 0) {
    uni.navigateTo({
      // url: '/pages/tableSelect/index',
		url:'/pages/equipmentUtilise/equipmentUtilise'
    })
    return
  }
  const res = await loginToService({
    username: 'admin',
    password: '111111',
  })
  mainStore.setToken(res.token)
  mainStore.username = status.username
  // const detail = await getProjectDetail()
  // const pj = initProjects(detail)
  // mainStore.assignProjInfo(pj)
  uni.navigateTo({
    url: '/pages/tableSelect/index',
  })
}
</script>

<style scoped lang="scss">
.bg {
  background: url('/static/bgImg.jpg') 100% 100% / 100% 100%;
  // background: #333;
  // position: fixed;
  bottom: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
  }
  .card {
    z-index: 1;
    border-radius: 14rpx;
    backdrop-filter: blur(10rpx);
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 10rpx 10rpx 20rpx rgba(0, 0, 0, 0.2);
    width: 35%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo {
      margin-top: 100rpx;
    }
    .input {
      margin-top: 30rpx;
      width: 100%;
    }
    .btn {
      margin-top: 30rpx;
      width: 50%;
    }
  }

  @media screen and (max-width: 768px) {
    .card {
      width: 90%;
    }
  }
}
.bottom-btn {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 9;
}
</style>
