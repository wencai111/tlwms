<template>
	<view class="content">
		<view class="example">
			<uni-steps :data="steps" :active="currentSteps - 1"></uni-steps>
			<button type="primary" v-bind:disabled="currentSteps > 2" v-on:click="scanCode">
				<text>{{ btnMessage }}</text>
			</button>
			<view v-if="materials.pickMaterialModels.length > 0">
				<view class="uni-card" v-for="(parent, index_) in materials.pickMaterialModels" v-bind:key="parent.id">
					<view class="uni-card__header">
						<view class="uni-card__header-title-text">{{parent.OperBillNum}}</view>
						<view class="uni-card__header-extra-text">{{parent.BillNum}}</view>
					</view>
					<view class="uni-card__content uni-card__content--pd">
						<view v-for="child in materials.pickModel" v-bind:key="child.id" class="wxc-list">
							<view class="wxc-list-title-text">{{child.id==''?'请扫库位码':'已对应库位码'}}<text style="color: #0FAEFF;margin-left: 4px;">{{child.OperBillNum}}</text>
							</view>
							<view class="wxc-list-extra-text">{{child.BillNum}}</view>
						</view>
					</view>
					<view class="uni-card__footer">物料拣货</view>
				</view>
			</view>
			<button type="primary" v-bind:disabled="!sureInlibrarydelivery" @click="sureInlibrary">
				确认提交
			</button>
		</view>
	</view>
</template>

<script>
	import {
		uniSteps,
		uniCard,
		uniList,
		uniListItem
	} from '@dcloudio/uni-ui';
	import outlibraryModel from '@/model/outlibraryModel.js';
	import {
		parseForRule
	} from '@/libs/util.js';
	import {
		checkLocal
	} from '@/api/inlibrary.js';
		import {
		Pickingport
	} from '@/api/outlibrary.js';
			import {
		SureStockOut
	} from '@/api/Outbound.js';
	import {
		mapState
	} from 'vuex';
	import {
		authAccount
	} from '@/libs/util.js';
		import {
		parseWarehouseCode
	} from '@/libs/util.js';
	export default {
		data() {
			return {
				//测试数据
				testData: [
					"{TlJpdID:'5',OperBillNum:'MDB2019217-3',BillNum:'PGC2019221-16795',MNumber:'1001040002-B12',MName:'后悬置支架总成',OutPackage:'12',Qty:'24'}",
					"{id: '1',code: '1001030001-B12',codeid: '2',count: 12}"
				],
				testIndex: 0,
				//非测试数据
				materials: outlibraryModel,
				products: [],
				currentSteps: 0, //当前执行步骤，
				steps: [{
						title: '扫拣货单'
					},
					{
						title: '扫库位码'
					},
					{
						title: '拣货完成'
					}
				],
                TlJpdID:'',

                OperBillNum:'',

               BillNum:'',

                MNumber:'',        

                MName:'',

                OutPackage:'',

                Qty:'',
			};
		},
		components: {
			uniSteps,
			uniCard,
			uniList,
			uniListItem
		},
		computed: {
			...mapState(['forcedLogin', 'hasLogin', 'userName']),
			sureInlibrarydelivery() {
				if (this.$data.currentSteps == 2) {
					return true;
				} else {
					return false;
				}
			},
			btnMessage() {
				if (this.$data.currentSteps == 0) {
					return '扫描拣货单';
				} else if (this.$data.currentSteps == 1) {
					return '扫描库位码';
				} 
				else if (this.$data.currentSteps == 2) {
					return '扫描库位码';
					console.log(入库码);
				}
				 else if (this.$data.currentSteps > 2) {
					return '已经完成拣货操作';
				}
			}
		},
		methods: {
			scanCode: function() {
				var _this = this;
				//测试使用
				if (this.testIndex < this.testData.length) {
					if (this.testIndex % 2 == 0) {
						_this.scanPick(this.testData[this.testIndex]);
						this.testIndex++;
					} else {
						_this.scanWarehouse(this.testData[this.testIndex]);
						this.testIndex++;
					}
				} else {}
				return;
				//非测试使用
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log('扫码输出内容：' + JSON.stringify(res));
						if (res && res.result) {
							if (_this.$data.currentSteps == 0) {
								_this.scanPick(res.result);
							} else if (_this.$data.currentSteps == 1) {
								_this.scanWarehouse(res.result);
							} 
// 							else if (_this.$data.currentSteps == 2) {
// 								_this.scanMaterial(res.result);
// 							}
						} else {}
					}
				});
			},
			scanPick: function(res) {
				Pickingport(this.result).then(data => {
					console.log('检查是否存在值'+ JSON.stringify(data));
				var result = parseForRule(res);
				if (res) {
					console.log('错误33' + JSON.stringify(res));
                   this.$data.currentSteps = 2;//自动完成拣货（）
					if (this.materials.pickMaterialModels.length <= 0) {
						
						this.materials.addNew(data);
						
						console.log('asdasdas');
						this.$data.currentSteps = 1;
					} else {
						let flag = true;
						if (flag) {
							this.materials.addNew(data);
						}
					}
					// this.MNumber = result.OperBillNum;
					console.log('scanMaterial：打印最后的结果：' + JSON.stringify(result));
				}
				})
			},
		
			scanWarehouse: function(res) {
				var result = parseForRule(res);
							console.log('开始处理入库码：' + JSON.stringify(res));
							var _this = this;
							debugger;
							var storage = parseWarehouseCode(res);
							_this.LocalID = res.id;
							console.log('接口：开始检查库位');
							
							this.materials.addMaterial(result);
							
							console.log(result);
							this.$data.currentSteps = 2;
							console.log('scanMaterial：打印最后的结果：' + JSON.stringify(res));
							checkLocal(this.MNumber, this.LocalID).then(data => {
								console.log('接口：开始检查库位');
								var [error, res] = data;
								console.log('res:' + JSON.stringify(res));
								console.log('error:' + JSON.stringify(error));
								// var result = parseForRule(res.data);
								if (data.request) {
									this.materials.addMaterial(option);
			//判断货架是否已满
									console.log('scanMaterial：打印最后的结果：' + JSON.parse(this.materials));
								} else {
								}
								// this.$data.currentSteps = 2;
							});
						},
			//确定入库
			sureInlibrary: function(res) {
				SureStockOut(this.result).then(data => {
				var result = parseForRule(res);
				var _this = this;
				this.$data.currentSteps = 3;
				uni.showToast({
					icon: 'id',
					title: ''
				});
				})
			},
			logMessage: function() {}
		},
		onLoad() {
			console.log('登录状态：' + this.hasLogin);
			authAccount(this.hasLogin, this.forcedLogin, this.userName);
		}
	};
</script>

<style lang="scss">
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

	$card-extra-width: 30%;

	@mixin text-omit {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.uni-card {
		margin: $uni-spacing-col-base;
		background: $uni-bg-color;
		position: relative;
		display: flex;
		flex-direction: column;

		&:after {
			content: '';
			position: absolute;
			transform-origin: center;
			box-sizing: border-box;
			pointer-events: none;
			top: -50%;
			left: -50%;
			right: -50%;
			bottom: -50%;
			border: 1px solid $uni-border-color;
			border-radius: $uni-border-radius-lg;
			transform: scale(0.5);
		}

		&__footer,
		&__header {
			position: relative;
			display: flex;
			flex-direction: row;
			padding: $uni-spacing-col-base;
			align-items: center;
		}

		&__header {
			&:after {
				position: absolute;
				bottom: 0;
				right: 0;
				left: 0;
				height: 1px;
				content: '';
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
				background-color: $uni-border-color;
			}

			&-title {
				flex: 1;
				margin-right: $uni-spacing-col-base;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;

				&-text {
					font-size: $uni-font-size-lg;
					flex: 1;
					@include text-omit;
				}
			}

			&-extra {
				&-img-view {
					display: flex;
				}

				&-img {
					height: $uni-img-size-sm;
					width: $uni-img-size-sm;
					margin-right: $uni-spacing-col-base;
				}

				&-text {
					flex: 0 0 auto;
					width: $card-extra-width;
					margin-left: $uni-spacing-col-base;
					font-size: $uni-font-size-base;
					text-align: right;
					@include text-omit;
				}
			}
		}

		&__content {
			&--pd {
				padding: $uni-spacing-col-base;
			}
		}

		&__footer {
			justify-content: space-between;
			color: $uni-text-color-grey;
			font-size: $uni-font-size-sm;
			padding-top: 0;
		}
	}

	.wxc-list {
		position: relative;
		display: flex;
		flex-direction: row;
		padding: $uni-spacing-col-base;
		padding-right: 0px;
		align-items: center;

		&:after {
			position: absolute;
			bottom: 0;
			right: 0;
			left: 0;
			height: 1px;
			content: '';
			-webkit-transform: scaleY(0.5);
			transform: scaleY(0.5);
			background-color: $uni-border-color;
		}

		&-title {
			flex: 1;
			margin-right: $uni-spacing-col-base;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;

			&-text {
				font-size: $uni-font-size-base;
				flex: 1;
				@include text-omit;
			}
		}

		&-extra {
			&-img-view {
				display: flex;
			}

			&-img {
				height: $uni-img-size-sm;
				width: $uni-img-size-sm;
				margin-right: $uni-spacing-col-base;
			}

			&-text {
				flex: 0 0 auto;
				width: $card-extra-width;
				margin-left: $uni-spacing-col-base;
				font-size: $uni-font-size-base;
				text-align: right;
				@include text-omit;
			}
		}
	}
</style>
