<template>
	<view class="content">
		<view class="example-title">选择退仓方式</view>
		<uni-list>
			<uni-list-item title="退仓" note="不良品退仓" v-on:click="goReturnWarehouse"></uni-list-item>
			<uni-list-item title="返厂" note="不良品返厂" v-on:click="goReturnFactory"></uni-list-item>
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
		//不良品退仓
		goReturnWarehouse: function() {
			uni.navigateTo({url:'/pages/return/index1'});
		},
		//不良品返厂
		goReturnFactory: function() {
			uni.navigateTo({ url: '/pages/return/index' });
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
