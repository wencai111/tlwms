<template>
	<view class="content">
		<view class="example">
			<view v-if="isShowData" class="wxc-card">
				<!-- 	<view class="wxc-card_list" v-for="item in data" v-bind:key="item.LocalID"> -->
				<view class="wxc-card_list_header">
					<view class="wxc-card_list_header_title">库位ID号:{{ deliveryNote.LocalID }}</view>
					<view class="wxc-card_list_header_extra">库位名称:{{ deliveryNote.LocalName }}</view>
				</view>
				<view class="wxc-card_list_content">
					<view class="wxc-card_list_content_text">物料编码:{{ deliveryNote.MNumber }}</view>
					<view class="wxc-card_list_content_text">物料名称:{{ deliveryNote.MName }}</view>
					<view class="wxc-card_list_content_text">入库时间:{{ deliveryNote.InDate }}</view>
					<view class="wxc-card_list_content_text">物料供应商:{{ deliveryNote.SupplyName }}</view>
					<view class="uni-form-item uni-column">
						<view class="title">输入数量{{EndQuan}}</view>
						<input class="uni-input" @input="onKeyInput" focus placeholder="请重新输入数量" type="number" step="0.0000000001"
						 v-enter-number />
					</view>
				</view>
				<view>
				</view>
			</view>
			<button type="primary" @click="Sweeplocation" v-bind:disabled="!Sweeplocations">
				扫入库码
			</button>
			<button type="primary" @click="sureIndelivery" v-bind:disabled="!sureInlibrarys">
				确认退换
			</button>
		</view>
	</view>
</template>
<script>
	// {LocalID:'1',LocalName:'B1-A1-1层-01',MNumber:'1001030001-B12',MName:'后悬置总成',SupplyName:'上海众力汽车零部件有限公司',InDate:'2019/1/26 18:08:22',EndQuan:'82'}
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
		SaveInventoryInfo,
		GetLocalMateInfo
	} from '@/api/deliveryNote.js';
	import
	deliveryNoteModels
	from '@/model/deliverynoteModel.js'
	export default {
		data() {
			return {
				data: {
					LocalID: '',
					LocalName: '',
					MNumber: '',
					MName: '',
					SupplyName: '',
					InDate: '',
					EndQuan: ''
				},
				steps: [],
				currentSteps: 0, //当前执行步骤，
				currentIndex: 0, //当前需要修改数量的货物索引
				index: 0,
				deliveryNote: deliveryNoteModels,
				isShowData: false,
				EndQuan: "0",
				LocalID: '',
				PdQuan: '',
				MNumber: '',
				inputNumber: 12
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
			Sweeplocations() {
				console.log('isCanInlibrary' + this.currentSteps)
				if (this.currentSteps == 0) {
					return true;
				} else {
					return false;
				}
			},
			sureInlibrarys() {
				console.log('isCanInlibrary' + this.currentSteps)
				if (this.currentSteps == 1) {
					return true;
				} else {
					return false;
				}
			},
		},
		// 			"LocalID": "1",
		// 		"LocalName": "B1-A1-1层-01",
		// 		"MNumber": "1001030001-B12",
		// 		"MName": "后悬置总成",
		// 		"SupplyName": "上海众力汽车零部件有限公司",
		// 		"InDate": "2019/1/26 18:08:22",
		// 		"EndQuan": "82"
		methods: {
			onKeyInput: function(event) {
				this.EndQuan = event.target.value
			},
			Sweeplocation: function() {
				var _this = this;
				console.log('this定义：' + _this);
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log("res.result" + JSON.stringify(res))
						console.log("res.result" + JSON.stringify(res.result))
						GetLocalMateInfo(this.LocalID).then(data => {
							var [error, res] = data;
							var result = parseForRule(res.data);
							if (result) {
								_this.deliveryNote.check(result);
							}
							_this.isShowData = true;
							_this.currentSteps = 1;
						})
					}
				});
			},
			//确认入库
			sureIndelivery: function() {
				debugger;
				console.log(this.EndQuan)
				console.log("LocalID:" + this.LocalID)
				SaveInventoryInfo(this.LocalID, this.MNumber, this.PdQuan).then(data => {
					var [error, res] = data;
					console.log("data:" + JSON.stringify(data));
					console.log("res:" + JSON.stringify(res));
					var result = parseForRule(res.data);
					var _this = this;
					console.log(result);
					if (result.success) {
						console.log(result);
						_this.currentSteps = 1;
						uni.showToast({
							icon: 'success',
							title: result.ResponseText
						});
						_this.isShowData = false;
					} else {
						_this.currentSteps = 0;
						uni.showToast({
							icon: 'fail',
							title: result.ResponseText
						});
						_this.isShowData = false;
					}
				});
			},
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

			&__content {
				&--pd {
					padding: $uni-spacing-col-base;
				}
			}

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
