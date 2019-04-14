<template>
	<view class="content">
		<view class="example-title">选择入库方式</view>
		<uni-list>
			<uni-list-item title="包装码入库" note="扫描包装码入库" v-on:click="goInlibraryByPackege"></uni-list-item>
			<uni-list-item title="紧急入库" note="扫描物料码入库" v-on:click="goInlibraryByMaterial"></uni-list-item>
			<uni-list-item title="收货是否完成" note="查询供应商收货是否完成" v-on:click="receivedTheGoods"></uni-list-item>
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
		//紧急入库
		goInlibraryByMaterial: function() {
			uni.navigateTo({url:'/pages/inlibrary/index'});
		},
		//包装码入库
		goInlibraryByPackege: function() {
			uni.navigateTo({ url: '/pages/inlibrary/index1' });
		},
		receivedTheGoods: function() {
			uni.navigateTo({ url: '/pages/inlibrary/way' });
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
