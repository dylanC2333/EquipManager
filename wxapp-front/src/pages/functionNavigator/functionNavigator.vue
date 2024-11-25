<template>
	<tm-app>
			<tm-sheet :margin="[32, 32, 32, 0]">
				<tm-text :font-size="24" _class="text-weight-b" label="功能导航页面"></tm-text>
				<tm-divider></tm-divider>
				<tm-text :font-size="24" _class="text-weight-b" label="记录填写"></tm-text>
				<tm-button block label="检测记录填写" url='/pages/detection/detection'></tm-button>
				<tm-button block label="出入库记录填写" url='/pages/equipmentStock/equipmentStock'></tm-button>
				<tm-button block label="设备使用记录填写" url='/pages/equipmentUtilise/equipmentUtilise'></tm-button>
				<tm-button block label="设备交接记录填写" url='/pages/equipmentTransfer/equipmentTransfer'></tm-button>
				<tm-button block label="设备保养记录填写" url='/pages/equipmentMaintain/equipmentMaintain'></tm-button>
				<!-- <tm-divider></tm-divider>
				<tm-text :font-size="24" _class="text-weight-b" label="空闲查询"></tm-text>
				<tm-button block label="空闲设备查询" url='/pages/availableEquipment/availableEquipment'></tm-button>
				<tm-button block label="空闲人员查询" url='/pages/availableEmployee/availableEmployee'></tm-button> -->
			</tm-sheet>
	</tm-app>
</template>

<script setup lang="ts">
	import { ref , reactive ,computed } from 'vue'
</script>

<style>
	tm-button {
	    margin-top: 30rpx;
	    margin-bottom: 30rpx;
	}
</style>
