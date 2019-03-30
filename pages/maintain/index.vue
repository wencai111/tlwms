<template>
	<view class="content">
		<view class="example">
			<uni-steps :data="steps" :active="currentSteps - 1"></uni-steps>
			<!-- <view class="uni-card"> -->
			<view class="uni-card__header">
				<view class="uni-card__header-title-text">{{maintain.code}}</view>
				<view class="uni-card__header-extra-text">{{maintain.TotalAmount}}</view>
				<button type="button" @click="modification">修改</button>
			</view>
			<view class="uni-card__content uni-card__content--pd">
				<view class="wxc-list" v-for="item in maintain.goods" v-bind:key="item">
					<view class="wxc-list-title-text">
						<text style="color: #0FAEFF;margin-left: 4px;">等待入库</text>
					</view>
					<view class="wxc-list-extra-text">{{item}}</view>
				</view>
			</view>
			<view class="uni-card__footer">物料名字:{{maintain.codeid}}</view>
			<view class="uni-card__footer">货架名字:{{maintain.id}}</view>
			<button type="primary" @click="sureInlibrary" v-bind:disabled="!sureInlibrarys">
				入库成功
			</button>
			<button type="primary" @click="scanMaterial" v-bind:disabled="!scanMaterials">
				扫良品
			</button>
			<button type="primary" @click="Sweeplocation" v-bind:disabled="!Sweeplocations">
				良品入库
			</button>
			<neil-modal :show="show" title="修改提示" @confirm="modifierNumber('modifierNumber')">
				<view style="min-height: 90upx;padding: 32upx 24upx;">
					<view style="text-align: center;">请输入个数<input type="text" v-model="inputNumber" placeholder="输入个数...." /></view>
				</view>
			</neil-modal>
			<!-- 	</view> -->
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
	import
	maintainModels
	from '@/model/maintainModel.js'
	export default {
		data() {
			return {
				// testData: ["{id:'1',code:'1001030001-B12A',codeid:'1',count:12}", "{'K','B1','1'}"],
				steps: [{
						title: '扫不良品'
					},
					{
						title: '良品入库'
					},
					{
						title: '入库完成'
					}
				],
				currentSteps: 0, //当前执行步骤，
				index: 0,
				maintain: maintainModels,
				show: false,
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
			cancel() {
				window.history.back(-1)
			},
			modification() {
				console.log("2313246")
				this.show = true;
			},
			sureInlibrary() {
				this.$data.currentSteps = 3;
				console.log("123456");
			},
			scanMaterial() {
				debugger;
				if (this.index == 0) {
					this.$data.currentSteps = 1;
					this.maintain.setMaterial({
						id: '1',
						code: '1001030001-B12A',
						codeid: '1',
						count: 12
					});
					this.index = this.index + 1;
				} else {
					this.maintain.addGoods({
						count: 24
					});
				}
			},
			Sweeplocation() {
				this.$data.currentSteps = 2;
				this.maintain.setInlibrary({
					id: 'K',
					code: 'B1',
					codeid: '1'
				});
			},
			modifierNumber() {
				debugger;
				console.log(this.inputNumber)
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
