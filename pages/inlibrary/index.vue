<template>
	<view class="content">
		<view class="example">
			<uni-steps :data="steps" :active="currentSteps - 1"></uni-steps>
			<button type="primary" v-bind:disabled="currentSteps > 2" v-on:click="scanCode">
				<text>{{ btnMessage }}</text>
			</button>
			<!-- 			 <uni-list-item v-bind:title="item.code" v-for="(item,index) in testData" v-bind:key="index" show-arrow="false">
				 <view>{{item.code}}</view>
				 <view v-for="(detail,innerIndex) in item.items" v-bind:key="innerIndex">
				 	{{detail.wlmc}}
				 </view>
			 </uni-list-item> -->

			<!-- 	<uni-collapse accordion="false">
				<uni-collapse-item v-bind:title="item.code" v-for="(item,index) in testData" v-bind:key="index">
					<view>{{item.code}}</view>
					<view v-for="(detail,innerIndex) in item.items" v-bind:key="innerIndex">
						{{detail.wlmc}}
					</view>
				</uni-collapse-item>
			</uni-collapse> -->
			<view v-for="(item,index) in testData" v-bind:key="index">
				<view v-for="(detail,innerIndex) in item.items" v-bind:key="innerIndex">
					{{detail.wlmc}}
				</view>
			</view>
		</view>
		<button type="primary" v-bind:disabled="!sureInlibrary" @click="sureInlibrary">
			确认入库
		</button>
		<button type="primary" @click="logMessage">
			浏览器打印值
		</button>
	</view>
	</view>
</template>

<script>
	import {
		uniSteps
	} from '@dcloudio/uni-ui'
	import inlibraryModel from '@/model/inlibraryModel.js';
	import {
		parseForRule
	} from '@/libs/util.js';
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
		uniList,
		uniListItem,
	} from '@dcloudio/uni-ui';

	export default {
		data() {
			return {
				//测试数据
				testData: ["{id: '1',code: '物料1',codeid: '2',count: 12}", " {id: '1',code: '货架A',codeid: '1'}",
					"{id: '1',code: '物料1',codeid: '2',count: 12}", "{id: '2',code: '货架B',codeid: '2'}",
					"{id: '2',code: '物料2',codeid: '2',count: 8}", "{id: '3',code:'货架C',codeid: '3'}"
				],
				testIndex: 0,
				//非测试数据
				materials: inlibraryModel,
				products: [],
				currentSteps: 0, //当前执行步骤，
				steps: [{
						title: '扫物料码'
					},
					{
						title: '扫库位码'
					},
					{
						title: '入库完成'
					}
				],
				MNumber: '',
				LocalID: ''
			};
		},
		components: {
			uniSteps
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
					return '扫描物料码';
				} else if (this.$data.currentSteps == 1) {
					return '扫描入库码';
				} else if (this.$data.currentSteps == 2) {
					return '继续扫描物料码';
					console.log(入库码);
				} else if (this.$data.currentSteps > 2) {
					return '已经完成入库操作';
				}
			}
		},
		methods: {
			scanCode: function() {
				var _this = this;
				//测试使用
				if (this.testIndex < this.testData.length) {
					if (this.testIndex % 2 == 0) {
						_this.scanMaterial(this.testData[this.testIndex]);
						this.testIndex++;
					} else {
						_this.scanWarehouse(this.testData[this.testIndex]);
						this.testIndex++;
					}
				} else {

				}
				return;
				//非测试使用
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log('扫码输出内容：' + JSON.stringify(res));
						if (res && res.result) {
							if (_this.$data.currentSteps == 0) {
								_this.scanMaterial(res.result);
							} else if (_this.$data.currentSteps == 1) {
								_this.scanWarehouse(res.result);
							} else if (_this.$data.currentSteps == 2) {
								_this.scanMaterial(res.result);
							}
						} else {}
					}
				});
			},
			scanWarehouse: function(res) {
				console.log('开始处理入库码：' + JSON.stringify(res));
				var _this = this;
				var storage = parseForRule(res);
				_this.LocalID=res.id;
				//测试使用
				// var storage = {};
			    // this.LocalID = 1; //由于二维码返回的json对象不规范，值写死
				console.log('接口：开始检查库位');
				this.materials.addStorage(storage);
				this.currentSteps = 2;
				console.log("scanMaterial：打印最后的结果：" + JSON.stringify(this.materials))
				//非测试
				return;


				checkLocal(this.MNumber, this.LocalID).then(data => {
					console.log('接口：开始检查库位');
					var [error, res] = data;
					console.log('res:' + JSON.stringify(res));
					console.log('error:' + JSON.stringify(error));
					var result = parseForRule(res.data);
					if (result.success) {
						this.materials.addStorage(storage);
						this.$data.currentSteps = 2;
						console.log("scanMaterial：打印最后的结果：" + JSON.parse(this.materials))
					} else {
						uni.showToast({
							icon: 'id',
							title: result.message
						});
					}
				});
			},
			scanMaterial: function(res) {
				// {id:'W',code:'1001030001-B12',codeid:'1',count:12}
				console.log('开始处理物料码' + JSON.stringify(res));
				var result = parseForRule(res);
				console.log('错误1' + JSON.stringify(result));
				console.log('错误2' + typeof(result));
				console.log('错误22' + JSON.stringify(result.code));
				if (result.code) {
					console.log('错误33' + JSON.stringify(result.code));

					if (this.materials.materialStorages.length <= 0) {
						console.log('首次新增物料入库模型对象');
						this.materials.addNew(result);
// 						this.$data.testData.push({
// 							code: result.code,
// 							totalAmount: result.totalAmount,
// 							codeid: result.codeid,
// 							items: [result],
// 							bank: result.bank,
// 						});
					} else {
						let flag = true;
						for (var i = 0; i < this.materials.materialStorages.length; i++) {
							if (this.materials.materialStorages[i].code == result.code) {
								this.materials.addMaterial(i, result);
								// testData.totalAmount = testData.totalAmount + result.count;
								// testData.items.push(result);
								console.log('物料相加成功！');
								flag = false;
								return;
							}
						}
						if (flag) {
							this.materials.addNew(result);
// 							this.$data.testData.push({
// 								code: result.code,
// 								codeid: result.codeid,
// 								totalAmount: result.totalAmount,
// 								items: [result],
// 								bank: result.bank,
// 							});
						}
					}
					this.MNumber = result.code;
					this.$data.currentSteps = 1;
					console.log("scanMaterial：打印最后的结果：" + JSON.stringify(this.materials))
				}
			},
			//确定入库
			sureInlibrary: function() {
				var _this = this;
				this.$data.currentSteps = 3;
				uni.showToast({
					icon: 'id',
					title: '入库成功'
				});
			},
			logMessage: function() {

			},
			onLoad() {
				console.log('登录状态：' + this.hasLogin);
				authAccount(this.hasLogin, this.forcedLogin, this.userName);
			}
		}
	};
</script>

<style>
	.materialnumber {
		width: auto;
		height: 100%;
		float: right;
	}

	.bank {
		width: auto;
		height: 100%;
		margin: 0 60%;
		position: absolute;
	}
</style>
