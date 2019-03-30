<template>
	<view class="content">
		<view v-if="hasLogin" class="hello">
			<uni-grid :data="menu" v-on:click="goMainPage"></uni-grid>
			<view style="height: 40upx;"></view>
			<uni-list>
				<uni-list-item
					title="退出登录"
					show-extra-icon="true"
					:extra-icon="{ color: '#4cd964', size: '22', type: 'closeempty' }"
				></uni-list-item>
			</uni-list>
		</view>
		<view v-if="!hasLogin" class="message-container">
			<view class="title">您好 游客。</view>
			<view class="ul">
				<view>欢迎进入上海通罗仓储物流系统</view>
				<view>点击 “登录” 才可以进行操作</view>
			</view>
		</view>
	</view>
</template>

<script>
import { uniGrid, uniList, uniListItem } from '@dcloudio/uni-ui';
import { mapState } from 'vuex';
import { authAccount } from '@/libs/util.js';

export default {
	data() {
		return {
			menu: [
				{
					image: '/static/img/inLibrary.png',
					text: '入库管理',
					url: '../inlibrary/inway'
				},
				{
					image: '/static/img/outLibrary.png',
					text: '出库管理',
					fdf: 'fdf',
					url: '../outlibrary/inway'
				},
				{
					image: '/static/img/deliveryNote.png',
					text: '盘点',
					url: '../deliveryNote/index'
				},
				{
					image: '/static/img/service.png',
					text: '维修',
					url: '../service/index'
				},
				{
					image: '/static/img/exchange.png',
					text: '换货',
					url: '../exchange/inway'
				},
				{
					image: '/static/img/Return.png',
					text: '不良品',
					url: '../Return/inway'
				},
				{
					image: '/static/img/checkQuality.png',
					text: '质检',
					url: '../checkQuality/index'
				},
				{
					image: '/static/img/CheckInventory.png',
					text: '备件',
					url: '../CheckInventory/inway'
				},
				{
					image: '/static/img/query.png',
					text: '查询',
					url: '../query/index'
				}
			]
		};
	},
	components: {
		uniGrid,
		uniList,
		uniListItem
	},
	computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
	methods: {
		goMainPage: function(e) {
			console.log(JSON.stringify(e));
			uni.navigateTo({
				url: this.$data.menu[e.index].url,
				// url:'../main/main',
				success:(e)=>{
					console.log("fdfd:"+JSON.stringify(e))
				},
				fail: (e) => {
				console.log("fd2fd:"+JSON.stringify(e))
				}
			});
			console.log("end")
		}
	},
	onLoad() {
		console.log('登录状态：' + this.hasLogin);
		authAccount(this.hasLogin,this.forcedLogin,this.userName);
	}
};
</script>

<style>
.message-container {
	display: flex;
	flex: 1;
	flex-direction: column;
}

.title {
	color: #8f8f94;
	margin-top: 50upx;
	text-align: center;
}

.ul {
	font-size: 30upx;
	color: #8f8f94;
	margin-top: 50upx;
}

.ul > view {
	line-height: 50upx;
	text-align: center;
}

.logout {
	color: red;
	text-align: center;
	border: 1upx solid #8f8f94;
}
</style>
