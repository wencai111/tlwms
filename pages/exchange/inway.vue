<template>
	<view class="content">
		<view class="example-title">选择换货方式</view>
		<uni-list>
			<uni-list-item title="换货入库" note="换货入库" v-on:click="startMaterialsDismounting"></uni-list-item>
			<uni-list-item title="换货出库" note="换货出库" v-on:click="startPackageDismounting"></uni-list-item>
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
		startMaterialsDismounting: function() {
			uni.navigateTo({url:'/pages/exchange/index'});
		},
		startPackageDismounting: function() {
			uni.redirectTo({ url: '/pages/exchange/index1' });
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
