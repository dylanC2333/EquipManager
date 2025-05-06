<template>
	<tm-app>
			<tm-sheet :margin="[32, 32, 32, 0]">
				<tm-text :font-size="40" _class="text-weight-b" label="功能导航页面"></tm-text>
				<tm-divider></tm-divider>
				<tm-text :font-size="40" _class="text-weight-b" label="记录填写"></tm-text>
				<tm-button block outlined :font-size="32" label="检测记录填写" url='/pages/detection/detection'></tm-button>
				<tm-button block :font-size="32" label="设备出入库记录填写" url='/pages/equipmentStock/equipmentStock'></tm-button>
				<tm-button block :font-size="32" label="设备使用记录填写" url='/pages/equipmentUtilise/equipmentUtilise'></tm-button>
				<tm-button block :font-size="32" label="设备交接记录填写" url='/pages/equipmentTransfer/equipmentTransfer'></tm-button>
				<tm-button block :font-size="32" label="设备保养记录填写" url='/pages/equipmentMaintain/equipmentMaintain'></tm-button>
				<tm-divider></tm-divider>
				<tm-text :font-size="40" _class="text-weight-b" label="登录操作"></tm-text>
				<tm-button block :font-size="32" color="red" label="退出登录" @click="logout"></tm-button>
			</tm-sheet>
	</tm-app>
</template>

<script setup lang="ts">
	import { ref , reactive ,computed } from 'vue'
	
	function logout (){
		uni.removeStorage({
			key: 'userToken',
			success: function () {
				console.log('successfully remove token');
			},
			fail() {
				console.log('fail to remove token');
			}
		});
		uni.switchTab({  
			url:'/pages/login/index'  
		});
	}
</script>

<style>
	tm-button {
	    margin-top: 30rpx;
	    margin-bottom: 30rpx;
	}
</style>
