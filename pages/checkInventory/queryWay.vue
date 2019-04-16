<template>
	<view class="content">
		<view class="example">
			<view class="uni-btn">
				<button type="primary" @click="scanCode">扫描物流码</button>
				<button type="primary" @click="goQueryPage()">手动输入</button>
			</view>
		</view>
	</view>
</template>

<script>
import { addUserParam, authAccount, parseForRule } from '@/libs/util.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {};
	},
	computed: {
		...mapState(['forcedLogin', 'hasLogin', 'userName', 'password', 'userID'])
	},
	methods: {
		//扫描物料码
		scanCode: function() {
			var _this = this;
			uni.scanCode({
				onlyFromCamera: true,
				success: function(res) {
					console.log('res' + JSON.stringify(res));
					if (res && res.result && res.result != '' && res.result.indexOf('TLWL') != '-1') {
						_this.goQueryPage(res.result);
					} else {
						uni.showToast({
							icon: 'none',
							duration: 2500,
							title: '拣货码错误,请重新扫描；'
						});
					}
				}
			});
		},
		//进入查询界面
		goQueryPage: function(code) {
			if (code) {
				uni.navigateTo({ url: '/pages/checkInventory/logisticsQuery?code=' + code });
			} else {
				uni.navigateTo({ url: '/pages/checkInventory/logisticsQuery' });
			}
		}
	},
	onLoad() {
		authAccount(this.hasLogin, this.forcedLogin, this.userName);
	}
};
</script>

<style>
.uni-btn > button {
	margin-top: 12px;
}
</style>
