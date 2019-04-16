<template>
	<view class="content">
		<view class="example-title">选择入库方式</view>
		<uni-list>
			<uni-list-item title="盘点" note="扫描库位码盘点" v-on:click="goDeliveryNote"></uni-list-item>
			<uni-list-item title="盘点任务清单" note="盘点任务清单" v-on:click="lookDeliveryNote"></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import { addUserParam,authAccount } from '@/libs/util.js';
import { uniList, uniListItem } from '@dcloudio/uni-ui';
export default {
	data() {
		return {};
	},
	components: { uniList, uniListItem },
	computed: mapState(['forcedLogin', 'hasLogin', 'userName','password','userID']),
	methods: {
		//盘点
		goDeliveryNote: function() {
			uni.navigateTo({url:'/pages/deliveryNote/index'});
		},
		//查看盘点任务清单
		lookDeliveryNote: function() {
			uni.navigateTo({ url: '/pages/deliveryNote/index1' });
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
