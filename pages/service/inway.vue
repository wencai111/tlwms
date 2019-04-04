<template>
	<view class="content">
		<view class="example-title">选择维修方式</view>
		<uni-list>
			<uni-list-item title="维修入库" note="扫物料维修入库" v-on:click="goServiceIn"></uni-list-item>
			<uni-list-item title="维修出库" note="扫物料维修出库" v-on:click="goServiceOut"></uni-list-item>
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
		//维修入库
		goServiceIn: function() {
			uni.navigateTo({url:'/pages/service/index'});
		},
		//维修出库
		goServiceOut: function() {
			uni.navigateTo({ url: '/pages/service/index1' });
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
