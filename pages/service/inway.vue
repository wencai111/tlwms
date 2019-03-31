<template>
	<view class="content">
		<view class="example-title">选择维修方式</view>
		<uni-list>
			<uni-list-item title="维修入库" note="维修入库" v-on:click="startMaterialsService"></uni-list-item>
			<uni-list-item title="维修出库" note="维修出库" v-on:click="startPackageService"></uni-list-item>
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
		startMaterialsService: function() {
			uni.navigateTo({url:'/pages/ervice/index'});
		},
		startPackageService: function() {
			uni.redirectTo({ url: '/pages/maintain/index' });
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
