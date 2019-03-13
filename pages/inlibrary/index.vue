<template>
	<view class="content">
		<button type="primary" v-on:click="scanCode">扫描</button>
		<view></view>
	</view>
</template>

<script>
import { checkLocal } from '@/api/inlibrary.js';
import { mapState } from 'vuex';
import { authAccount } from '@/libs/util.js';

export default {
	data() {
		return {
			MNumber:'',
			LocalID:''
		};
	},
	computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
	methods: {
		scanCode: function() {
			uni.showLoading({ title: '加载中'});
			uni.scanCode({
				onlyFromCamera: true,
				success: function(res) {
					console.log('条码：' + JSON.stringify(res));
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
				}
			});
		}
	},
	onLoad() {
		console.log('登录状态：' + this.hasLogin);
		authAccount(this.hasLogin, this.forcedLogin, this.userName);
	}
};
</script>

<style></style>
