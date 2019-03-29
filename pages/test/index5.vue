<template>
	<view class="content">
		<view class="uni-card">
			<view class="uni-card__header">
				<view class="uni-card__header-title-text">{{inlibrary.code}}</view>
				<view class="uni-card__header-extra-text">{{inlibrary.TotalAmount}}</view>
			</view>
			<view class="uni-card__content uni-card__content--pd">
				<view class="wxc-list" v-for="item in inlibrary.goods" v-bind:key="item">
					<view class="wxc-list-title-text">
						<text style="color: #0FAEFF;margin-left: 4px;">等待入库</text>
					</view>
					<view class="wxc-list-extra-text">{{item}}</view>
				</view>
			</view>
			<view class="uni-card__footer">物料名字:{{inlibrary.code}}</view>
			<view class="uni-card__footer">货架名字:{{inlibrary.id}}</view>
			<button type="primary" @click="sureInlibrary">
				确认入库
			</button>
			<button type="primary" @click="scanMaterial">
				扫物料
			</button>
			<button type="primary" @click="Sweeplocation">
				扫入库
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
	import
	inlibraryModels
	from '@/pages/test/inlibaryModel5.js';
	import {
		checkLocal,
		saveEmergentInInfo
	} from '@/api/inlibrary.js';
	import {
		parseForRule
	} from '@/libs/util.js';
	import {
		parseWarehouseCode
	} from '@/libs/util.js';
	export default {
		data() {
			return {
				inlibrary: inlibraryModels,
				index: 0,
				MNumber: '',
				LocalID: ''

			}
		},
		methods: {
			sureInlibrary() {
				console.log("入参："+JSON.stringify(this.inlibrary));
					saveEmergentInInfo(this.inlibrary.setInlibrary()).then(data => {
						var result = parseForRule(res.data);
					var [error, res] = data;
					if (result.success) {
						uni.showToast({
							icon: 'success',
							title: result.ResponseText,
						});
					} else {
						uni.showToast({
							icon: 'fail',
							title: result.ResponseText,
						});
					}
				})
			},
			scanMaterial() {
				if (this.index == 0) {
					var _this = this;
					console.log('this定义：' + _this);
					uni.scanCode({
						onlyFromCamera: true,
						success: function(res) {
							var result = parseForRule(res.result);
							if (result) {
								_this.inlibrary.setMaterial(result);
								_this.index = _this.index + 1;
							}
						}
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
								_this.inlibrary.addGoods(result);
							}
						}
					});

				}
			},
			Sweeplocation() {
				var _this = this;
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log('扫码输出内容：' + JSON.stringify(res));
							// var result = parseForRule(res.result);
							var storage = parseWarehouseCode(res.result);
							this.LocalID = storage.id;
							console.log("this.MNumber"+this.MNumber);
							console.log("this.LocalID"+this.LocalID);
							checkLocal(this.MNumber, this.LocalID).then(data => {
							var [error,res] = data;
							console.log("res:"+JSON.stringify(res))
							var result = parseForRule(res.data);
							if (result.success) {
								_this.inlibrary.setInlibrary(storage);
							} else {
								uni.showToast({
									icon: 'none',
									title: result.ResponseText
								})
							}
						})
					}
				});
			}
		}
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
