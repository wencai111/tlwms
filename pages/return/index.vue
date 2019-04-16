<template>
	<view class="content">
		<view class="example">
			<uni-steps :data="steps" :active="currentSteps - 1"></uni-steps>
			<button type="primary" v-bind:disabled="currentSteps > 1" v-on:click="scanMaterial"><text>扫不良品</text></button>
			<button type="primary" v-bind:disabled="currentSteps != 1" v-on:click="scanWarehouse"><text>扫码库位码</text></button>
			<view v-if="material.id.length > 0">
				<view class="uni-card">
					<view class="uni-card__header">
						<view class="uni-card__header-title-text">{{ material.code }}</view>
						<view class="uni-card__header-extra-text">{{ material.totalAmount }}</view>
					</view>
					<view class="uni-card__content uni-card__content--pd">
						<view v-for="(item, index) in material.goods" v-bind:key="index" class="wxc-list">
							<view class="wxc-list-title-text">
								{{ material.storage == null ? '正在等待库位码，可继续物料' : '入库货架' }}
								<text style="color: #0FAEFF;margin-left: 4px;" v-if="material.storage != null">{{ material.storage.code }}</text>
							</view>
							<view class="wxc-list-extra-text">{{ item }}</view>
							<view style="margin: 5upx; font-size: 30upx; color: #0079FF;" @click="modification(index)">修改</view>
						</view>
					</view>
					<view class="uni-card__footer">
						退仓入库:{{ material.code }}
						<text v-if="material.storage != null">{{ material.storage.code }}</text>
					</view>
				</view>
			</view>
			<!-- <view v-show="sureInlibrarys" class="uni-textarea">
                <textarea placeholder-style="color:#F76260" v-model="material.reason" placeholder="请填写分拆入库的原因"/>
            </view> -->
			<view class="uni-form-item uni-column"  v-show="currentSteps>=1">
				<radio-group name="radio"  >
					<label>
						<radio value="线退" @click="reasonChange(1)" checked="true" />线退</label>
					<label>
						<radio value="检退" @click="reasonChange(2)" />检退</label>
				</radio-group>
			</view>
			<button type="primary" v-bind:disabled="!sureInlibrarys" @click="sureInlibrary">确认退仓入库</button>
			<button type="primary" v-show="currentSteps == 3" @click="goBack">返回</button>
			
		</view>
		<neil-modal :show="show" title="修改提示" @close="closeModificationModal"  @confirm="modifierNumber('modifierNumber')">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<view style="text-align: center;">
					请输入个数
					<input type="number" step="0.0000000001" v-enter-number v-model="inputNumber" placeholder="输入个数...." />
				</view>
			</view>
		</neil-modal>
	</view>
</template>
<script>
import { uniSteps, uniCard, uniList, uniListItem } from '@dcloudio/uni-ui';
import {addUserParam, authAccount, parseForRule, parseWarehouseCode } from '@/libs/util.js';
import { appLogin } from '@/api/user.js';
import neilModal from '@/components/neil-modal/neil-modal.vue';
import { checkLocal, saveStockInForBad } from '@/api/return.js';
import returnModel from '@/model/reutrnModel.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			material: returnModel,
			currentSteps: 0, //当前执行步骤，
			steps: [
				{
					title: '扫不良品'
				},
				{
					title: '扫库位码'
				},
				{
					title: '退仓入库'
				}
			],
			currentIndex: 0, //当前需要修改数量的货物索引
			show: false,
			inputNumber: 12
		};
	},
	created() {
		this.currentSteps = 0;
		this.material.reset();
	},
	components: {
		neilModal,
		uniSteps,
		uniCard,
		uniList,
		uniListItem
	},
	computed: {
		...mapState(['forcedLogin', 'hasLogin', 'userName','password','userID']),
		sureInlibrarys() {
			if (this.currentSteps == 2) {
				return true;
			} else {
				return false;
			}
		}
	},
	methods: {
		//扫描物料码
		// { id: 'W', code: '1001030001-B12', codeid: '1', count: 12 }
		scanMaterial: function(res) {
			var _this = this;
			uni.scanCode({
				onlyFromCamera: true,
				success: function(res) {
					console.log('res' + JSON.stringify(res));
					var result = parseForRule(res.result);
					console.log('result' + JSON.stringify(result));
					if (result&&result.code&&result.code!="") {
						if(_this.material.code!=""&&result.code!=_this.material.code){
							uni.showModal({
								title: '提示',
								showCancel:false,
								content: "跟前一次物料不一致",
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
									} 
								}
							});
						}
						else{
						if (_this.material.setMateriaInfo(result)) {
							_this.currentSteps = 1;
						} else {
							uni.showToast({
								icon: 'none',
								duration: 2500,
								title: '物料信息错误:' + JSON.stringify(result)
							});
						}
					}
		
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
		//扫描库位码
		scanWarehouse: function(res) {
			var _this = this;
			uni.scanCode({
				onlyFromCamera: true,
				success: function(res) {
					console.log('res' + JSON.stringify(res));
					var result = parseWarehouseCode(res.result);
					console.log('result' + JSON.stringify(result));
					if (result && result.codeid && result.codeid != '') {
						checkLocal(_this.material.code, result.codeid,_this.userName,_this.password,_this.userID).then(data => {
							var [error, res] = data;
							console.log('checkLocal.data:' + JSON.stringify(data));
							console.log('checkLocal.res:' + JSON.stringify(res));
							var checkResult = parseForRule(res.data);
							console.log('checkResult:' + JSON.stringify(checkResult));
							if (checkResult.success) {
								if (_this.material.addStorage(result)) {
									_this.currentSteps = 2;
								} else {
									uni.showToast({
										icon: 'none',
										duration: 2500,
										title: '库位信息错误：' + JSON.stringify(result)
									});
								}
							} else {
								uni.showModal({
									title: '提示',
									content: checkResult.ResponseText,
									showCancel: false,
									success: function(res) {
										if (res.confirm) {
											console.log('用户点击确定');
										}
									}
								});
							}
						});
					} else {
						uni.showToast({
							icon: 'none',
							duration: 2500,
							title: '库位信息错误:' + res.result
						});
					}
				}
			});
		},
		//确定返回入库
		sureInlibrary: function() {
			var _this = this;
			saveStockInForBad(addUserParam(this.material.generateModel(1),this.userName,this.password,this.userID)).then(data => {
				var [error, res] = data;
				console.log('data:' + JSON.stringify(data));
				console.log('res:' + JSON.stringify(res));
				var result = parseForRule(res.data);
				console.log('result:' + JSON.stringify(result));
				if (result.success) {
					console.log(result);
					_this.currentSteps = 3;
					uni.showToast({
						icon: 'success',
						title: '退仓入库成功！'
					});
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
			});
		},
		//返回
		goBack: function() {
			uni.navigateBack();
		},
		//退仓入库原因
		reasonChange:function(index){
			console.log("index:"+index)
			if(index==1){
				this.material.reason="线退";
				console.log("reason:线退")
			}
			else{
				console.log("reason:检退")
				this.material.reason="检退";
			}
			
		},
		//关闭弹框事件
		closeModificationModal:function(data){
			this.show = false;
		},
		modification: function(index) {
			console.log('modification:' + index);
			try{
				this.inputNumber = this.material.goods[index];
				this.currentIndex = index;
				this.show = true;
			}catch(e){
				console.log("异常："+JSON.stringify(e))
			}
			
			console.log('modification:end');
		},
		modifierNumber: function(ref) {
			console.log('修改后的值：' + this.inputNumber);
			try {
				this.material.modifierNumber(this.currentIndex, this.inputNumber);
			} catch (e) {
				console.log("异常："+JSON.stringify(e))
			}
			this.show = false;
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
