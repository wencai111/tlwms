<template>
	<view class="content">
		<view class="example-title">选择备件菜单</view>
		<uni-list>
			<uni-list-item title="备件下架" note="备件下架" v-on:click="goOutlibrary"></uni-list-item>
			<uni-list-item title="备件打包" note="备件打包" v-on:click="goPackeged"></uni-list-item>
			<uni-list-item title="备件物流扫码" note="备件物流扫码" v-on:click="goLogisticsScan"></uni-list-item>
			<uni-list-item title="备件发货" note="备件发货" v-on:click="goShip"></uni-list-item>
			<uni-list-item title="备件物流查询" note="备件物流查询" v-on:click="goLogisticsQuery"></uni-list-item>
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
		//备件下架
		goOutlibrary:function(){
			uni.navigateTo({url:'/pages/checkInventory/outlibrary'});
		},
		//备件打包
		goPackeged:function(){
			uni.navigateTo({url:'/pages/checkInventory/packeged'});
		},
		//备件物流扫码
		goLogisticsScan:function(){
			uni.navigateTo({url:'/pages/checkInventory/logisticsScan'});
		},
		//备件发货
		goShip:function(){
			uni.navigateTo({url:'/pages/checkInventory/ship'});
		},
		//备件物流查询
		goLogisticsQuery:function(){
			uni.navigateTo({url:'/pages/checkInventory/logisticsQuery'});
		}
		
	},
	onLoad() {
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
