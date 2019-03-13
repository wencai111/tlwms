<template>
	<view class="content">
		<view class="example">
			<uni-steps :data="steps" :active="0"></uni-steps>
			<button type="primary" v-on:click="scanCode">
				扫描
				<text>{{ message }}</text>
			</button>
			<view class="productContainer">
				<uni-card title="外置总轴" thumbnail="http://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" extra="10" note="Tips">
					内容主体，可自定义内容及样式
				</uni-card>
			</view>
		</view>
	</view>
</template>

<script>
import { checkLocal } from '@/api/inlibrary.js';
import { mapState } from 'vuex';
import { authAccount } from '@/libs/util.js';
import { uniSteps, uniCard } from '@dcloudio/uni-ui';

export default {
	data() {
		return {
			message: '物料码',
			materials:[],
			products:[],
			steps: [{ title: '扫物料码' }, { title: '扫库位码' }, { title: '入库完成' }],
			MNumber: '',
			LocalID: ''
		};
	},
	components: { uniSteps, uniCard },
	computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
	methods: {
		scanCode: function() {
			// uni.showLoading({ title: '加载中' });
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
