<template>
	<view class="content">
		<view class="example-title">包含描述信息</view>
		<uni-list>
			<uni-list-item title="包装码入库" note="扫描包装码入库"></uni-list-item>
			<uni-list-item title="物料码入库" note="扫描物料码入库"></uni-list-item>
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
	components:{uniList,uniListItem},
	computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
	onLoad() {
		console.log('登录状态：' + this.hasLogin);
		authAccount(this.hasLogin, this.forcedLogin, this.userName);
	}
};
</script>

<style>
	.example-title{
		border-left:#007AFF solid 6upx ;
		padding-left: 18upx;
		}
</style>
