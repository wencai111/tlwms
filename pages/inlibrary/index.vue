<template>
	<view class="content">
		<view class="example">
			<uni-steps :data="steps" :active="currentSteps-1"></uni-steps>
			<button type="primary" v-bind:disabled="currentSteps>2" v-on:click="scanCode">
				<text>{{ btnMessage }}</text>
			</button>
			<view class="productContainer">
				<view class="Materialcombined">总计:{{total}}</view>
				<uni-card v-bind:title="item.code" v-if="materials.length>0" v-for="(item,index) in materials" v-bind:key="index"
				 thumbnail="http://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" v-bind:extra="item.totalAmount" note="Tips">
					<view v-bind="count = $index"></view>
					<label v-for="(detail,innerIndex) in item.items" v-bind:key="innerIndex">是的
						<view>{{detail.id}}
							<view class="materialnumber">{{item.totalAmount}}</view>
						</view>
					</label>
				</uni-card>
			</view>
			<button type="primary" v-bind:disabled="!isCanInlibrary" @click="confirm">确认入库</button>
		</view>
	</view>
</template>

<script>
	import '@/model/inlibraryModel.js'
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
				// tempMaterials: [{"物料名称":"","总数量":"",items:[{"物料名称":"","物料数量":"","是否已经入库":false,"库位地址":""}}],
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
			scanWarehouse: function(data) {
				console.log("扫入库码：" + JSON.stringify(data))
				this.$data.currentSteps = 2;
				// this.$data.currentSteps = 2;
				console.log("输出数组值" + JSON.stringify(this.$data.materials))
				var _this = this;
				checkLocal(this.MNumber, this.LocalID).then(data => {
					var [error, res] = data;
					console.log('res:' + JSON.stringify(res));
					console.log('error:' + JSON.stringify(error));
					var result = parseForRule(res.data);
					if (result.success) {
						console.log('asd' + JSON.stringify(result));
						console.log('123456' + JSON.stringify(result.success));
						 if (_this.LocalID = _this.localID) {
							uni.showToast({
								icon: 'id',
								title: '库位已满',
							});
							this.$data.currentSteps = 1;
							console.log("1556" + res.ResponseText);
							// bug
						} 
						else if (_this.$data.materials =_this.$data.materials) {
							console.log("请扫入库码：" + JSON.stringify(data))
							uni.showToast({
							icon: 'id',
							title: '请扫描正确二维码',
							});
							this.$data.currentSteps = 1;
							// return;
							}
						else{
							uni.showToast({
								icon: 'id',
								title: '可以入库',
							});
							console.log("1123" + res.ResponseText);
						}

					} else {}
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
			//确定入库
			sureInlibrary: function() {},
			confirm() {
				var _this = this;
				this.$data.currentSteps = 3;
				uni.showToast({
					icon: 'id',
					title: '入库成功',
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
