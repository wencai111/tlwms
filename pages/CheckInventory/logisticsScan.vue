<template>
	<view class="content">
		<view class="example">
			<uni-steps :data="steps" :active="currentSteps - 1"></uni-steps>
			<view v-show="PackNum!=''" style="text-align: center;font-size: 36upx;font-weight: 120;">
				{{PackNum}}
			</view>
			<button type="primary" v-bind:disabled="currentSteps > 1" v-on:click="scanPackege"><text>扫备件包装码</text></button>
			<view class="uni-padding-wrap uni-common-mt" v-show="currentSteps >= 1">
			<view class="uni-form-item uni-column">
				<view class="title">当前位置</view>
				<input class="uni-input" name="input" v-model="ArriAdds" placeholder="请输入当前位置" />
			</view>
				<view class="uni-form-item uni-column">
					<radio-group name="radio">
						<label>
							<radio value="到达" @click="logisticsFlagChange(1)"  />
							到达
						</label>
						<label>
							<radio value="出发" @click="logisticsFlagChange(2)" />
							出发
						</label>
					</radio-group>
				</view>
			</view>
			<button type="primary" v-bind:disabled="!isCanLogistics" @click="sureLogistics">确认物流信息</button>
			<button type="primary" v-show="currentSteps == 2" @click="goBack">返回</button>
			<!-- <button type="primary"  @click="logMessage">
				浏览器打印
			</button> -->
		</view>
	</view>
</template>

<script>
import { uniSteps, uniCard, uniList, uniListItem } from '@dcloudio/uni-ui';
import { authAccount, parseForRule, parseWarehouseCode } from '@/libs/util.js';
import { saveLogisInfo } from '@/api/checkInventory.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			currentSteps:0,
			steps: [
				{
					title: '扫物料码'
				},
				{
					title: '物流扫码完成'
				}
			],
			PackNum: '', //当前扫描的包装码
			InOutFlag: '', //到达/出发标志
			ArriAdds: '' //当前收货地址
		};
	},
	created() {
		this.currentSteps = 0;
		this.PackNum = '';
		this.ArriAdds = '';
	},
	components: {
		uniSteps,
		uniCard,
		uniList,
		uniListItem
	},
	computed: {
		...mapState(['forcedLogin', 'hasLogin', 'userName']),
		isCanLogistics() {
			if (this.currentSteps == 1) {
				return true;
			} else {
				return false;
			}
		}
	},
	methods: {
		//退仓入库原因
		logisticsFlagChange: function(index) {
			console.log('index:' + index);
			if (index == 1) {
				this.InOutFlag = '到达';
			} else {
				this.InOutFlag = '出发';
			}
		},
		//扫描包装码
		scanPackege: function(res) {
			var _this = this;
			uni.scanCode({
				onlyFromCamera: true,
				success: function(res) {
					console.log('res' + JSON.stringify(res));
					if (res && res.result && res.result != '' && res.result.indexOf('TLWL') != '-1') {
						_this.PackNum = res.result;
						_this.currentSteps=1;
					} else {
						uni.showToast({
							icon: 'none',
							duration: 2500,
							title: '包装码错误,请重新扫描；'
						});
					}
				}
			});
		},
		//确定出库
		sureLogistics: function(res) {
			if (this.PackNum == '' || this.InOutFlag == '' || this.ArriAdds == '') {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '请填写达到或出发标志和收货地址',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						}
					}
				});
			} else {
				var _this = this;
				saveLogisInfo("&PackNum="+_this.PackNum+"&InOutFlag="+ _this.InOutFlag+"&ArriAdds="+_this.ArriAdds).then(data => {
					var [error, res] = data;
					console.log('data:' + JSON.stringify(data));
					console.log('res:' + JSON.stringify(res));
					var result = parseForRule(res.data);
					console.log('result:' + JSON.stringify(result));
					if (result.success) {
						console.log(result);
						_this.currentSteps = 2;
						console.log('正确');
						uni.showToast({
							icon: 'success',
							title: '物流扫码成功！'
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
			}
		},
		//返回
		goBack: function() {
			uni.navigateBack();
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
			width: $card-extra-width;
			margin-left: $uni-spacing-col-base;
			font-size: $uni-font-size-base;
			text-align: right;
			@include text-omit;
		}
	}
}
</style>
