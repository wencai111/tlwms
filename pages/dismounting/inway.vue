<template>
	<view class="content">
		<view class="example-title">选择拆装方式</view>
		<uni-list>
			<uni-list-item title="分拆入库" note="扫良品分拆入库" v-on:click="goSpinoffIn"></uni-list-item>
			<uni-list-item title="分拆出库" note="扫良品分拆出库" v-on:click="goSpinoffOut"></uni-list-item>
			<uni-list-item title="组装入库" note="组装入库" v-on:click="goAssembleffIn"></uni-list-item>
			<uni-list-item title="组装出库" note="组装出库" v-on:click="goAssembleffOut"></uni-list-item>
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
	computed: mapState(['forcedLogin', 'hasLogin', 'userName', 'code']),
	methods: {
		//分拆入库
		goSpinoffIn: function() {
			uni.navigateTo({ url: '/pages/dismounting/index' });
		},
		//分拆出库
		goSpinoffOut: function() {
			uni.navigateTo({ url: '/pages/dismounting/index1' });
		},
		//组装入库
		goAssembleffIn: function() {
			uni.navigateTo({ url: '/pages/dismounting/index2' });
		},
		//组装出库
		goAssembleffOut: function() {
			uni.navigateTo({ url: '/pages/dismounting/index3' });
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
