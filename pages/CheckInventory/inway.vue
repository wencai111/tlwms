<template>
	<view class="content">
		<view class="example-title">选择备件方式</view>
		<uni-list>
			<uni-list-item title="备件下架" note="" v-on:click="startMaterialsCheckInventory"></uni-list-item>
			<uni-list-item title="备件打包" note="" v-on:click="startPackageCheckInventory"></uni-list-item>
			<uni-list-item title="备件发货" note="" v-on:click="startMaterialsCheckInventory"></uni-list-item>
			<uni-list-item title="备件物流查询" note="" v-on:click="startPackageCheckInventory"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import { authAccount } from '@/libs/util.js';
import { uniList, uniListItem } from '@dcloudio/uni-ui';
export default {
	data() {
		return {};
	},
	components: { uniList, uniListItem },
	computed: mapState(['forcedLogin', 'hasLogin', 'userName','code']),
	methods: {
		startMaterialsExchange: function() {
			// uni.navigateTo({url:'/pages/exchange/index'});
		},
		startPackageExchange: function() {
			// uni.redirectTo({ url: '/pages/exchange/index' });
		//	uni.navigateTo({ url: '/pages/inlibrary/index' });
		}
	},
	onLoad() {
		debugger;
		console.log('登录状态：' + this.hasLogin);
		console.log(this.code); 
		authAccount(this.hasLogin, this.forcedLogin, this.userName);
	}
};
</script>

<style>
.example-title {
	border-left: #007aff solid 6upx;
	padding-left: 18upx;
}
</style>
