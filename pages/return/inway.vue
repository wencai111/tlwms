<template>
	<view class="content">
		<view class="example-title">选择退仓方式</view>
		<uni-list>
			<uni-list-item title="退仓入库" note=" 主机厂发现不良品退回至仓库的入库操作" v-on:click="goReturnWarehouse"></uni-list-item>
			<uni-list-item title="返厂出库" note="从仓库出库退回给供应商的出库操作" v-on:click="goReturnFactory"></uni-list-item>
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
		//不良品退仓入库
		goReturnWarehouse: function() {
			uni.navigateTo({url:'/pages/return/index'});
		},
		//不良品返厂出库
		goReturnFactory: function() {
			uni.navigateTo({ url: '/pages/return/index1' });
		}
	},
	onLoad() {
		debugger;
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
