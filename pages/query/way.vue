<template>
	<view class="content">
		<view class="example">
			<view class="uni-btn">
				<button type="primary" @click="scanMateria">扫描物料</button>
				<button type="primary" @click="goQueryPage()">手动输入</button>
			</view>
		</view>
	</view>
</template>

<script>
import { authAccount, parseForRule } from '@/libs/util.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {};
	},
	computed: {
		...mapState(['forcedLogin', 'hasLogin', 'userName'])
	},
	methods: {
		//扫描物料码
		scanMateria: function() {
			var _this = this;
			uni.scanCode({
				onlyFromCamera: true,
				success: function(res) {
					console.log('res' + JSON.stringify(res));
					var result = parseForRule(res.result);
					console.log('result' + JSON.stringify(result));
					if (result && result.code && result.code != '') {
						_this.goQueryPage(result.code);
					} else {
						uni.showModal({
							title: '提示',
							showCancel: false,
							content: '物料信息错误：' + JSON.stringify(res),
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
								}
							}
						});
					}
				}
			});
		},
		//进入查询界面
		goQueryPage: function(code) {
			if (code) {
				uni.navigateTo({ url: '/pages/query/index?code=' + code });
			} else {
				uni.navigateTo({ url: '/pages/query/index' });
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
