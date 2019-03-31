<template>
	<view class="content">
		<view class="example">
			<uni-steps :data="steps" :active="currentSteps - 1"></uni-steps>
			<!-- <view class="uni-card"> -->
			<view class="uni-card__header">
				<view class="uni-card__header-title-text">{{maintain.code}}</view>
				<view class="uni-card__header-extra-text">{{maintain.TotalAmount}}</view>
			</view>
			<view class="uni-card__content uni-card__content--pd">
				<view class="wxc-list" v-for="(item,index) in maintain.goods" v-bind:key="index">
					<view class="wxc-list-title-text">
						<text style="color: #0FAEFF;margin-left: 4px;" >{{maintain.storage==null?'请扫库位码':'已对应库位码'}}</text>
					</view>
					<view class="wxc-list-extra-text">{{item}}</view>
			<!-- 		<button type="button" style="font-size: 25upx;" @click="modification(index)">修改</button> -->
			<span style="margin: 5upx; font-size: 30upx; color: #0079FF;" @click="modification(index)">修改</span>
				</view>
			</view>
			<view class="uni-card__footer">物料名字:{{maintain.codeid}}</view>
			<view class="uni-card__footer" v-if="maintain.storage!=null">货架名字:{{maintain.storage.code}}</view>
			<button type="primary" @click="scanMaterial" v-bind:disabled="!scanMaterials">
				扫良品
			</button>
			<button type="primary" @click="Sweeplocation" v-bind:disabled="!Sweeplocations">
				良品入库
			</button>
			<button type="primary" @click="sureInlibrary" v-bind:disabled="!sureInlibrarys">
				入库成功
			</button>
			<neil-modal :show="show" title="修改提示" @confirm="modifierNumber('modifierNumber')">
				<view style="min-height: 90upx;padding: 32upx 24upx;">
					<view style="text-align: center;">请输入个数<input type="number" step="0.0000000001" v-enter-number v-model="inputNumber" placeholder="输入个数...." /></view>
				</view>
			</neil-modal>
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
	import {
		parseWarehouseCode
	} from '@/libs/util.js';
	import neilModal from '@/components/neil-modal/neil-modal.vue';
	import {
		parseForRule
	} from '@/libs/util.js';
	import {
		SaveStockOutByBadMate
	} from '@/api/service.js';
	import
	maintainModels
	from '@/model/maintainModel.js'
	export default {
		data() {
			return {
				steps: [{
						title: '扫不良品'
					},
					{
						title: '扫库位码'
					},
					{
						title: '出库完成'
					}
				],
				currentSteps: 0, //当前执行步骤，
				currentIndex: 0, //当前需要修改数量的货物索引
				index: 0,
				maintain: maintainModels,
				show: false,
				inputNumber: 0,
				LocalID: '',
				Quan: '',
				MNumber: ''
			}
		},
		components: {
			neilModal,
			uniSteps,
			uniCard,
			uniList,
			uniListItem
		},
		computed: {
			scanMaterials() {
				console.log('isCanInlibrary' + this.$data.currentSteps)
				if (this.$data.currentSteps == 2 || this.$data.currentSteps == 3) {
					return false;
				} else {
					return true;
				}
			},
			Sweeplocations() {
				console.log('isCanInlibrary' + this.$data.currentSteps)
				if (this.$data.currentSteps == 1) {
					return true;
				} else {
					return false;
				}
			},
			sureInlibrarys() {
				console.log('isCanInlibrary' + this.$data.currentSteps)
				if (this.$data.currentSteps == 2) {
					return true;
				} else {
					return false;
				}
			},
		},
		methods: {
			modification(index) {
				this.currentIndex = index;
				console.log("2313246")
				this.show = true;
			},
			scanMaterial() {
				debugger;
				if (this.index == 0) {
					var _this = this;
					console.log('this定义：' + _this);
					uni.scanCode({
						onlyFromCamera: true,
						success: function(res) {
							var result = parseForRule(res.result);
							console.log("res.result" + JSON.stringify(res.result))
							if (result) {
								_this.maintain.setMaterial(result);
								_this.index = _this.index + 1;
								_this.currentSteps = 1;
							}
						},
					});
				} else {
					var _this = this;
					uni.scanCode({
						onlyFromCamera: true,
						success: function(res) {
							console.log('扫码输出内容：' + JSON.stringify(res));
							var result = parseForRule(res.result);
							console.log('扫码输出内容：' + JSON.stringify(res.result));
							if (result) {
								console.log('输出内容：' + JSON.stringify(result));
								_this.maintain.addGoods(result);
								_this.currentSteps = 1;
							}
						},
					})
				}
			},
			Sweeplocation() {
				var _this = this;
				console.log("this" + this);
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log('扫码输出内容：' + JSON.stringify(res));
						var storage = parseWarehouseCode(res.result);
						console.log("storage:"+JSON.stringify(storage))
						if (storage) {
							console.log("_this.maintain.setInlibrary:"+_this.maintain.setInlibrary)
							_this.maintain.setInlibrary(storage);
							_this.currentSteps = 2;
						}
					},
				});
			},
			sureInlibrary() {
				console.log("LocalID:" + this.LocalID)
				SaveStockOutByBadMate(this.LocalID, this.MNumber, this.Quan).then(data => {
					var [error, res] = data;
					console.log("data:" + JSON.stringify(data));
					console.log("res:" + JSON.stringify(res));
					var result = parseForRule(res.data);
					var _this = this;
					console.log(result);
					if (result.success) {
						console.log(result);
						_this.currentSteps = 3;
						uni.showToast({
							icon: 'success',
							title: result.ResponseText
						});
					} else {
						_this.currentSteps = 1;
						uni.showToast({
							icon: 'fail',
							title: result.ResponseText
						});
					}
				});
			},
			modifierNumber(ref) {
				debugger;
				console.log(this.inputNumber);
				this.maintain.modifierNumber(this.currentIndex, this.inputNumber);
				this.show = false;
			}
		},
	}
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
