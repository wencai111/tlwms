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
						<view class="uni-card__header-title-text">{{parent.code}}</view>
						<view class="uni-card__header-extra-text" >{{parent.TotalAmount}}</view>
					</view>
					<view class="uni-card__content uni-card__content--pd">
						<view v-for="child in parent.storages" v-bind:key="child.id" class="wxc-list">
							<view class="wxc-list-title-text">{{child.id==''?'请继续扫描入库码':'已对应货架'}}<text style="color: #0FAEFF;margin-left: 4px;">{{child.code}}</text> </view>
							<view class="wxc-list-extra-text" >{{child.amount}}</view>
						</view>
					</view>
					<view class="uni-card__footer">物料入库</view>
				</view>
			</view>
			<button type="primary" v-bind:disabled="!sureInlibrary" @click="sureInlibrary">
				确认入库
			</button>
		</view>
	</view>
</template>

<script>
import { uniSteps, uniCard, uniList, uniListItem } from '@dcloudio/uni-ui';
import outlibraryModel from '@/model/outlibraryModel.js';
import { parseForRule } from '@/libs/util.js';
import { checkLocal } from '@/api/inlibrary.js';
import { mapState } from 'vuex';
import { authAccount } from '@/libs/util.js';
export default {
	data() {
		return {
			//测试数据
			testData: [
				"{id: '1',code: '物料1',codeid: '2',count: 12}",
				"{id: '1',code: '货架A',codeid: '1'}",
				"{id: '1',code: '物料1',codeid: '2',count: 12}",
				"{id: '2',code: '货架B',codeid: '2'}",
				"{id: '2',code: '物料2',codeid: '2',count: 8}",
				"{id: '3',code:'货架C',codeid: '3'}"
			],
			testIndex: 0,
			//非测试数据
			materials: outlibraryModel,
			products: [],
			currentSteps: 0, //当前执行步骤，
			steps: [
				{
					title: '扫拣货单'
				},
				{
					title: '扫物料码'
				},
				{
					title: '拣货完成'
				}
			],
			MNumber: '',
			LocalID: ''
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
		isCanInlibrary() {
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
				return '扫描物料码';
			} else if (this.$data.currentSteps == 2) {
				return '继续扫描物料码';
				console.log(入库码);
			} else if (this.$data.currentSteps > 2) {
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
					} else {
					}
				}
			});
		},
		scanWarehouse: function(res) {
			console.log('开始处理入库码：' + JSON.stringify(res));
			var _this = this;
			var storage = parseForRule(res);
			_this.LocalID = res.id;
			//测试使用
			// var storage = {};
			// this.LocalID = 1; //由于二维码返回的json对象不规范，值写死
			console.log('接口：开始检查库位');
			_this.materials.addStorage(storage);
			this.currentSteps = 2;
			console.log('scanMaterial：打印最后的结果：' + JSON.stringify(this.materials));
			//非测试
			return;

			checkLocal(this.MNumber, this.LocalID).then(data => {
				console.log('接口：开始检查库位');
				var [error, res] = data;
				console.log('res:' + JSON.stringify(res));
				console.log('error:' + JSON.stringify(error));
				var result = parseForRule(res.data);
				if (result.success) {
					_this.materials.addStorage(storage);//错误
					this.$data.currentSteps = 2;
					console.log('scanMaterial：打印最后的结果：' + JSON.parse(this.materials));
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
			console.log('错误2' + typeof result);
			console.log('错误22' + JSON.stringify(result.code));
			if (result.code) {
				console.log('错误33' + JSON.stringify(result.code));

				if (this.materials.pickMaterialModels.length <= 0) {
					console.log('首次新增物料入库模型对象');
					this.materials.addNew(result);
					console.log('asdasdas');

				} else {
					let flag = true;
					for (var i = 0; i < this.materials.pickMaterialModels.length; i++) {
						if (this.materials.pickMaterialModels[i].code == result.code) {
							this.materials.addMaterial(i, result);
							console.log('物料相加成功！');
							flag = false;
							return;
						}
					}
					if (flag) {
						this.materials.addNew(result);
					}
				}
				this.MNumber = result.code;
				this.$data.currentSteps = 1;
				console.log('scanMaterial：打印最后的结果：' + JSON.stringify(this.materials));
			}
		},
		//确定入库
		sureInlibrary: function() {
			var _this = this;
			this.$data.currentSteps = 3;
			uni.showToast({
				icon: 'id',
				title: '拣货成功'
			});
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

.wxc-list{
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
