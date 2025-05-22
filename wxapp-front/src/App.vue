<template></template>
<script lang="ts">
import { setStartWide } from './utils/fontSizeHandler';
import { useMainStore } from '@/store';
import { autoLogin } from '@/api/index';
export default {
  onLaunch() {
    setStartWide(uni.getSystemInfoSync().windowWidth > 768);
	
	const mainStore = useMainStore();  
	
	// 从本地存储获取用户信息  
	const savedToken = uni.getStorageSync('userToken');  
	const savedUsername = uni.getStorageSync('username');  

	if (savedToken && savedUsername) {  
		// 如果有存储的 token 和用户名，存入 Pinia store  
		mainStore.setToken(savedToken);  
		mainStore.username = savedUsername;  
		//console.log(savedToken);
		//console.log(savedUsername);
		
		// 请求验证用户信息
		validateUser();  
		// if(isValid) {  
		//   uni.navigateTo({  
		//     url:'/pages/functionNavigator/functionNavigator'  
		//   });  
		// } else {  
		//   // 无效的 token，可能需要清除存储  
		//   uni.removeStorageSync('userToken');  
		//   uni.removeStorageSync('username');  
		// }  
	}
 }
 
 
 
 
}

function validateUser() {
	autoLogin().then(res => {  
        console.log(res);
		uni.navigateTo({
			url:'/pages/functionNavigator/functionNavigator'  
		});
    }).catch(error => {  
        console.error('无法自动登录，需重新输入账号密码', error);  
		uni.switchTab({
			url:'/pages/login/index'  
		});
    });  
}
</script>
<style>
/* #ifdef APP-PLUS-NVUE */
@import './tmui/scss/nvue.css';
/* #endif */
/* #ifndef APP-PLUS-NVUE */
@import './tmui/scss/noNvue.css';
/* #endif */
</style>
