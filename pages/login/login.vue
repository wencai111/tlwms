<template>
	<view class="content">
		<view class="logoview">
			<image class="logoimg" src="../../static/img/tlwmslogo.png"></image>
		</view>
		<view class="wmsfont">
			<text>{{text}}</text>
		</view>
		<view class="input-text">
			<input class="m-input" type="text" v-model="account" placeholder="账号"></input>
		</view>
		<view class="input-row">
			<input type="password" v-model="password" placeholder="请输入密码"></input>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @click="bindLogin">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: "上海通罗WMS仓库管理系统",
				account: '', //请输入你的姓名
				password: '', //请输入你的密码

			}
		},
		methods: {
			bindLogin() {
				uni.showLoading({
					title: '加载中',
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 2000);
// 				if (!this.account) {
// 					uni.showModal({
// 						"title": "温馨提示",
// 						"content": "请输入账号！"
// 					});
// 					return;
// 				}
// 				if (!this.password) {
// 					uni.showModal({
// 						"title": "温馨提示",
// 						"content": "请输入密码！"
// 					});
// 					return;
// 				}
				uni.request({
					url: "http://101.132.97.79:8001/common/wms_Server_Data.asp?action=login",
					type: "POST",
					data: {
						username: "admin",
						password: "admin123",
					},
					dataType: "JSON",
					success: (res) => {
						console.log(JSON.stringify(res));
						var temp1='{"success":true}';
						var temp="{success:true,msg:'登录成功！',UserID:1}";
						var result1 = JSON.parse(temp1);
							console.log("dfdfdf");
						console.log(JSON.stringify(result1));
							var result2 = JSON.parse(temp);
						console.log(JSON.stringify(result1));
						console.log(JSON);
						if (result.success) {
							console.log("fdfd");
							// this.$router.push()//首页，跳转
							// url:

						} else {
							uni.showModal({
								"title": "温馨提示",
								"content": "账号或者密码不正确！"
							});
						}
					},
					fail: (res) => {
						console.log("fail"+JSON.stringify(res))
					}

				});
			}
		}
	}
</script>

<style>
	.logoview {
		margin: 0 auto;
	}

	.logoview>img {
		max-width: 80%;
	}

	.logoimg {
		width: 250upx;
		height: 250upx;
	}

	.wmsfont {
		margin: 0 auto;
		font-size: 45upx;
	}

	.input-text {
		border: 1upx solid rgba(9, 9, 9, 9);
		border-radius: 50upx;
		margin: 0 auto;
		width: 75%;
		margin-top: 50upx;
		padding: 15upx;
	}

	.input-row {
		border: 1upx solid rgba(9, 9, 9, 9);
		border-radius: 50upx;
		margin: 0 auto;
		width: 75%;
		margin-top: 50upx;
		padding: 15upx;
	}

	.primary {
		border-radius: 50upx;
		width: 85%;
	}
</style>
