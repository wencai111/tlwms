<template>
	<view class="content">
		<view class="example">
			<uni-steps :data="steps" :active="currentSteps-1"></uni-steps>
			<button type="primary" v-bind:disabled="currentSteps>2" v-on:click="scanCode">
				<text>{{ btnMessage }}</text>
			</button>
			<view class="productContainer">
				<view class="Materialcombined">总计:{{total}}</view>
				<uni-card v-bind:title="item.code" v-if="materials.length>0" v-for="item in materials" :key="item.code" thumbnail="http://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png"
				 v-bind:extra="item.totalAmount" note="Tips">
					<label>dfdfddfd</label>
					<!-- <label>
					     <view>{{item.id}}
						 <view class="materialnumber">{{item.count}}</view>
						 </view>
				   </label> -->
				</uni-card>
			</view>
			<button type="primary" v-bind:disabled="!isCanInlibrary" @click="confirm">确认入库</button>
		</view>
	</view>
</template>

<script>
	import {
		parseForRule
	} from '@/libs/util.js'
	import {
		checkLocal
	} from '@/api/inlibrary.js';
	import {
		mapState
	} from 'vuex';
	import {
		authAccount
	} from '@/libs/util.js';
	import {
		uniSteps,
		uniCard
	} from '@dcloudio/uni-ui';

	export default {
		data() {
			return {
				materials: [],
				products: [],
				currentSteps: 0, //当前执行步骤，
				steps: [{
					title: '扫物料码'
				}, {
					title: '扫库位码'
				}, {
					title: '入库完成'
				}],
				MNumber: '',
				LocalID: '',
			};
		},
		components: {
			uniSteps,
			uniCard
		},
		computed: {
			...mapState(['forcedLogin', 'hasLogin', 'userName']),
			isCanInlibrary() {
				if (this.$data.currentSteps == 2) {
					return true;
				} else {
					return false;
				}
			},
			btnMessage() {
				if (this.$data.currentSteps == 0) {
					return "扫描物料码";
				} else if (this.$data.currentSteps == 1) {
					return "扫描入库码"
				} else if (this.$data.currentSteps == 2) {
					return "继续扫描物料码";
					console.log(入库码)
				} else if (this.$data.currentSteps > 2) {
					return "已经完成入库操作"
				}
			}
		},
		methods: {
			scanCode: function() {
				var _this = this;
				// 				var currentSteps=-1;
				// 				currentSteps++;
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log('扫码输出内容：' + JSON.stringify(res));
						if (res && res.result) {
							console.log('qwerty' + JSON.stringify(res));
							if (_this.$data.currentSteps == 0) {
								console.log('asdasfaf');
								_this.scanMaterial(res.result);
							} else if (_this.$data.currentSteps == 1) {
								console.log('扫库位码');
								_this.scanWarehouse(res.result)
							} else if (_this.$data.currentSteps == 2) {
								_this.scanMaterial(res.result)
							}
						} else {};

					},
				});
			},
			scanMaterial: function(res) {
				// {id:'W',code:'1001030001-B12',codeid:'1',count:12}
				console.log('res' + res);
				var result = parseForRule(res);
				console.log('result' + JSON.stringify(result))
				if (result.code) {
					console.log("进入操作块")
					if (this.$data.materials.length <= 0) {
						this.$data.materials.push({
							code: result.code,
							totalAmount: result.count,
							items: [result]
						});
						console.log("输出数组值" + JSON.stringify(this.$data.materials))
					} else {
						console.log("flag")
						let flag = true;
						for (var material of this.$data.materials) {
							if (material.code == result.code) {
								console.log("t21rue")
								material.totalAmount = material.totalAmount + result.count;
								material.items.push(result);
								flag = false;
								console.log("returnfdf")
								return;
							}
						}
						console.log("returnfdffdfdfdfd" + flag)
						if (flag) {
							console.log("returnfdffdfdffdfdfdfddfd" + flag)
							this.$data.materials.push({
								code: result.code,
								totalAmount: result.count,
								items: [result]
							});
						}
					}
					this.$data.currentSteps = 1;
				}
			},
			scanWarehouse: function(data) {
				console.log("扫入库码：" + JSON.stringify(data))
				this.$data.currentSteps = 2;
				console.log("输出数组值" + JSON.stringify(this.$data.materials))
			},
			//确定入库
			sureInlibrary: function() {

			},
			confirm() {
				this.$data.currentSteps = 3;
				uni.showToast({
					icon: 'none',
					title: '入库已完成请返回！'
				});
			},
			onLoad() {
				console.log('登录状态：' + this.hasLogin);
				authAccount(this.hasLogin, this.forcedLogin, this.userName);
			}
		},
	};
</script>

<style>
	.materialnumber {
		width: auto;
		height: 100%;
		float: right;
	}
</style>
