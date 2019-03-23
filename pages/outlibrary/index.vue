<template>
	<view class="content">
		<view class="example">
			<uni-steps :data="steps" :active="currentSteps - 1"></uni-steps>
			<button type="primary" v-bind:disabled="currentSteps > 1" v-on:click="scanCode">
				<text>{{ btnMessage }}</text>
			</button>
			<view v-if="materials.pickStorages.length > 0">
				<view class="uni-card" v-for="(item, index_) in materials.pickStorages" v-bind:key="item.index">
					<view class="uni-card__header">
						<view class="uni-card__header-title-text">{{item.pick.MName}}</view>
						<view class="uni-card__header-extra-text">{{item.pick.Qty}}</view>
					</view>
					<view class="uni-card__content uni-card__content--pd">
						<view class="wxc-list">
							<view class="wxc-list-title-text">{{item.storage.id==''?'请扫库位码':'已对应库位码'}}
								<text style="color: #0FAEFF;margin-left: 4px;">{{item.storage.code}}</text>
							</view>
							<view class="wxc-list-extra-text">{{item.storage.codeid}}</view>
						</view>
					</view>
					<view class="uni-card__footer">拣货入库</view>
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
		inlibrarys
	} from '@/libs/util.js';
	import {
		parseForRule
	} from '@/libs/util.js';
	import {
		getPickGoodsCodeInfo,
		sureStockOut
	} from '@/api/outlibrary.js';
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
				materials: outlibraryModel,
				currentSteps: 0, //当前执行步骤，
				BillNum:'',
				steps: [{
						title: '扫拣货单'
					},
					{
						title: '扫库位码'
					},
					{
						title: '拣货完成'
					}
				]
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
				if (this.currentSteps == 2) {
					return true;
				} else {
					return false;
				}
			},
			btnMessage() {
				if (this.currentSteps == 0) {
					return '扫描拣货单';
				} else if (this.currentSteps == 1) {
					return '扫描库位码';
				} else if (this.currentSteps == 2) {
					return '扫描库位码';
					console.log(入库码);
				} else if (this.currentSteps > 2) {
					return '已经完成拣货操作';
				}
			}
		},
		methods: {
			scanCode: function() {
				debugger;
				var _this = this;
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log('扫码输出内容：' + JSON.stringify(res));
						if (res && res.result) {
							if (_this.currentSteps == 0) {
								_this.scanPick(res.result);
							} else if (_this.currentSteps == 1) {
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
				if(res&&res!=""){
					console.log("res:"+res)
					this.BillNum=res;
					getPickGoodsCodeInfo(res).then(data=>{
						var [error, res] = data;
						console.log("getPickGoodsCodeInfo.res:"+JSON.stringify(res));
						console.log("模拟获取拣货单接口返回的数据："+"{TlJpdID:'5',OperBillNum:'MDB2019217-3',BillNum:'PGC2019221-16795',MNumber:'1001040002-B12',MName:'后悬置支架总成',OutPackage:'12',Qty:'24'}");
						var result = parseForRule("{TlJpdID:'5',OperBillNum:'MDB2019217-3',BillNum:'PGC2019221-16795',MNumber:'1001040002-B12',MName:'后悬置支架总成',OutPackage:'12',Qty:'24'}");
						//var result = parseForRule(res.data);
						console.log("result："+JSON.stringify(result))
					    this.materials.addNew(result);
						this.currentSteps = 1;
					});
				}
				else{
					uni.showToast({
						icon: 'fail',
						title: "拣货码不能为空！"
					});
				}
			},
			scanWarehouse: function(res) {
				debugger;
				console.log('开始处理入库码：' + JSON.stringify(res));
				var _this = this;
				var storage = parseWarehouseCode(res);
				this.materials.addStorage(storage);
				this.currentSteps = 2;
			},
			//确定入库
			sureInlibrary: function() {
				console.log("BillNum:"+this.BillNum)
				sureStockOut(this.BillNum).then(data => {
					var [error, res] = data;
					console.log("data:"+JSON.stringify(data));
					console.log("res:"+JSON.stringify(res));
					var result = parseForRule(res.data);
					var _this = this;
					console.log(result);
					if (result.success) {
						console.log(result);
						this.$data.currentSteps = 3;
						uni.showToast({
							icon: 'success',
							title: result.ResponseText
						});
					} else {
						uni.showToast({
							icon: 'fail',
							title: result.ResponseText
						});
					}
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
