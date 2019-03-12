<template>
	<view class="content">
		<view class="logo-row"><image src="../../static/logo.png"></image></view>
		<view class="wms-name">
			<text>{{ systemName }}</text>
		</view>
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input
					class="m-input"
					type="text"
					clearable
					focus
					v-model="account"
					placeholder="请输入账号"
				></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input
					type="password"
					displayable
					v-model="password"
					placeholder="请输入密码"
				></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
	</view>
</template>

<script>
import { appLogin } from '@/api/user.js';
import { parseForRule } from '@/libs/util.js';
import service from '../../service.js';
import { mapState, mapMutations } from 'vuex';
import mInput from '../../components/m-input.vue';

export default {
	data() {
		return {
			systemName: '上海通罗WMS仓库管理系统',
			account: '',
			password: '',
			positionTop: 0
		};
	},
	components: {
		mInput
	},
	computed: mapState(['forcedLogin']),
	methods: {
		...mapMutations(['login']),
		initPosition() {
			// 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
			// 反向使用 top 进行定位，可以避免此问题。
			this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
		},
		bindLogin() {
			//参数校验
			if (!this.account || this.account.length <= 0) {
				uni.showToast({
					icon: 'none',
					title: '账号不能为空！'
				});
				return;
			}
			if (!this.password || this.password.length <= 0) {
				uni.showToast({
					icon: 'none',
					title: '密码不能为空！'
				});
				return;
			}
			//系统登录
			appLogin(this.account, this.password).then(data => {
				//测试tapd 关联 github
				var [error, res] = data;
				var result = parseForRule(res.data);
				console.log('res:' + JSON.stringify(res));
				console.log('error:' + error);
				if (result.success) {
					service.addUser({
						account: this.account,
						password: this.password,
						id: result.UserID
					});
					this.toMain(this.account);
				} else {
					uni.showToast({
						icon: 'none',
						title: result.msg
					});
				}
			});
		},
		toMain(userName) {
			this.login(userName);
			/**
			 * 强制登录时使用reLaunch方式跳转过来
			 * 返回首页也使用reLaunch方式
			 */
			if (this.forcedLogin) {
				uni.reLaunch({
					url: '../main/main'
				});
			} else {
				uni.navigateBack();
			}
		}
	},
	onLoad() {
		this.initPosition();
	}
};
</script>

<style>
.logo-row {
	margin: 0 auto;
}
.logo-row >image {
	width: 250upx;
	height: 250upx;
}
.wms-name {
	margin: 0 auto;
	font-size: 45upx;
}
</style>
