<template>
	<view class="content">
		<view class="example">
			<uni-steps :data="steps" :active="currentSteps - 1"></uni-steps>
			<button type="primary" v-bind:disabled="currentSteps > 1" v-on:click="scanMaterial"><text>扫描物料码</text></button>
			<button type="primary" v-bind:disabled="!(currentSteps == 1&&materials.materials.length>0)" v-on:click="scanVehicle"><text>扫描车辆码</text></button>
			<view v-if="materials.materials.length > 0">
				<view class="uni-card" v-for="material in materials.materials" v-bind:key="material.id">
					<view class="uni-card__header">
						<view class="uni-card__header-title-text">{{ material.code }}</view>
						<view class="uni-card__header-extra-text">{{ material.totalAmount }}</view>
					</view>
					<view class="uni-card__content uni-card__content--pd">
						<view v-for="(item, _index) in material.goods" v-bind:key="_index" class="wxc-list">
							<view class="wxc-list-title-text">
								{{ materials.vehicleCode == '' ? '正在等待扫码车辆码，可继续扫描物料' : '物料已经对应车辆码' }}
								<text style="color: #0FAEFF;margin-left: 4px;">{{ materials.vehicleCode }}</text>
							</view>
							<view class="wxc-list-extra-text">{{ item }}</view>
						</view>
					</view>
					<view class="uni-card__footer">
						生成装车单:
						<text>{{ materials.vehicleCode }}</text>
						<span style="margin: 5upx; font-size: 30upx; color: #0079FF;" @click="removeMaterials(material)">删除</span>
					</view>
				</view>
			</view>
			<button type="primary" v-bind:disabled="!isCanGenerateFcd" @click="sureGenerateFcd">确认生成装车单</button>
			<button type="primary" v-show="currentSteps == 3" @click="goBack">返回</button>
			<!-- <button type="primary"  @click="logMessage">
				浏览器打印
			</button> -->
		</view>
	</view>
</template>

<script>
import { uniSteps, uniCard, uniList, uniListItem } from '@dcloudio/uni-ui';
import { bulidFcd } from '@/api/outlibrary.js';
import outlibraryModel from '@/model/outlibraryFcdModel.js';
import { mapState } from 'vuex';
import { authAccount, parseForRule } from '@/libs/util.js';
export default {
	data() {
		return {
			materials: outlibraryModel,
			currentSteps: 0, //当前执行步骤，
			steps: [
				{
					title: '扫物料码'
				},
				{
					title: '扫车辆码'
				},
				{
					title: '生成装车单'
				}
			]
		};
	},
	created() {
		this.currentSteps = 0;
		this.materials.reset();
	},
	components: {
		uniSteps,
		uniCard,
		uniList,
		uniListItem
	},
	computed: {
		...mapState(['forcedLogin', 'hasLogin', 'userName']),
		isCanGenerateFcd() {
			if (this.currentSteps == 2) {
				return true;
			} else {
				return false;
			}
		}
	},
	methods: {
		//扫描物料码
		scanMaterial: function(res) {
			var _this = this;
			uni.scanCode({
				onlyFromCamera: true,
				success: function(res) {
					console.log('res' + JSON.stringify(res));
					var result = parseForRule(res.result);
					console.log('result' + JSON.stringify(result));
					if (result && result.code && result.code != '' && result.count) {
						_this.materials.setMaterial(result);
						_this.currentSteps = 1;
					} else {
						uni.showToast({
							icon: 'none',
							duration: 2500,
							title: '物料信息错误:' + res.result
						});
					}
				}
			});
		},
		//扫描车辆码
		scanVehicle: function(res) {
			var _this = this;
			uni.scanCode({
				onlyFromCamera: true,
				success: function(res) {
					console.log('res' + JSON.stringify(res));
					var result = parseForRule(res.result);
					console.log('result' + JSON.stringify(result));
					if (result && result.code && result.code != '') {
						_this.materials.setVehicleCode(result.code);
						_this.currentSteps = 2;
					} else {
						uni.showModal({
							title: '提示',
							showCancel: false,
							content: result.ResponseText,
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
								}
							}
						});
					}
				}
			});
		},
		//确定生成发车单
		sureGenerateFcd: function(res) {
			var _this = this;
			bulidFcd(this.materials.generateModel()).then(data => {
				var [error, res] = data;
				console.log('data:' + JSON.stringify(data));
				console.log('res:' + JSON.stringify(res));
				var result = parseForRule(res.data);
				console.log('result:' + JSON.stringify(result));
				if (result.success) {
					console.log(result);
					_this.currentSteps = 3;
					console.log('正确');
					uni.showToast({
						icon: 'success',
						title: '生成装车单！'
					});
				} else {
					console.log('错误');
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: result.ResponseText,
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
							}
						}
					});
				}
			});
		},
		//返回
		goBack: function() {
			uni.navigateBack();
		},
		//移除物料
		removeMaterials: function(data) {
			console.log("removeMaterials:"+JSON.stringify(data));
			this.materials.removeMaterials(data);
		},
		logMessage: function() {
			debugger;
		}
	},
	onLoad() {
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

button {
	margin-top: 10px;
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
			width: 10%;
			margin-left: $uni-spacing-col-base;
			font-size: $uni-font-size-base;
			text-align: right;
			@include text-omit;
		}
	}
}
</style>
