<template>
	<view class="content">
		<view class="example-title">选择换货方式</view>
		<uni-list>
			<uni-list-item title="组装入库" note="组装入库" v-on:click="startMaterialsReturn"></uni-list-item>
			<uni-list-item title="组装出库" note="组装出库" v-on:click="startPackageReturn"></uni-list-item>
			<uni-list-item title="分拆入库" note="分拆入库" v-on:click="startMaterialsReturn"></uni-list-item>
			<uni-list-item title="分拆出库" note="分拆出库" v-on:click="startPackageReturn"></uni-list-item>
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
			uni.navigateTo({url:'/pages/exchange/index'});
		},
		startPackageExchange: function() {
			uni.redirectTo({ url: '/pages/exchange/index' });
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
