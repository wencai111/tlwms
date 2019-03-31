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
import { authAccount } from '@/libs/util.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
		};
	},
	computed: {
		...mapState(['forcedLogin', 'hasLogin', 'userName'])
	},
	methods: {
		//扫描物料码
		scanMateria: function() {
			this.goQueryPage("123");
// 			uni.scanCode({
// 				onlyFromCamera: true,
// 				success: function(res) {
// 					console.log('条码类型：' + res.scanType);
// 					console.log('条码内容：' + res.result);
// 					if(res.result&&res.result!=""){
// 						this.goQueryPage(res.result);
// 					}
// 					else{
// 						uni.showToast({
// 							icon: 'none',
// 							title: '未扫描的结果，请重新扫描！'
// 						});
// 					}
// 				}
// 			});
		},
		//进入查询界面
		goQueryPage: function(code) {
			if(code){
				uni.navigateTo({url:'/pages/query/index?code='+code});
			}
			else{
				uni.navigateTo({url:'/pages/query/index'});
			}
		}
	},
	onLoad() {
		authAccount(this.hasLogin, this.forcedLogin, this.userName);
	}
};
</script>

<style>
	.uni-btn >button{
		margin-top: 12px;
	}
</style>
