<template>
	<view class="content">
		<view class="example">
			<uni-steps :data="steps" :active="currentSteps - 1"></uni-steps>
			<button type="primary" v-bind:disabled="currentSteps > 2" v-on:click="scanCode">
				<text>{{ btnMessage }}</text>
			</button>
			<view class="productContainer">
				<!-- <view class="Materialcombined">总计:{{  }}</view> -->
			<!-- 	<uni-card
					v-bind:title="item.code"
					v-if="materials.length > 0"
					v-for="(item, index) in materials"
					v-bind:key="index"
					thumbnail="http://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png"
					v-bind:extra="item.totalAmount"
					note="Tips"
				>
					<view v-bind="(count = $index)"></view>
					<label v-for="(detail, innerIndex) in item.items" v-bind:key="innerIndex">
						是的
						<view>
							{{ detail.id }}
							<view class="materialnumber">{{ item.totalAmount }}</view>
						</view>
					</label>
				</uni-card> -->
			</view>
			<button type="primary" v-bind:disabled="!isCanInlibrary" @click="confirm">
				确认入库
			</button>
		</view>
	</view>
</template>

<script>
import inlibraryModel from '@/model/inlibraryModel.js';
import { parseForRule } from '@/libs/util.js';
import { checkLocal } from '@/api/inlibrary.js';
import { mapState } from 'vuex';
import { authAccount } from '@/libs/util.js';
import { uniSteps, uniCard } from '@dcloudio/uni-ui';

export default {
	data() {
		return {
			//测试数据
			testData:["{id:'W',code:'1001030001-B12',codeid:'1',count:12}","{'K','B1','1'}"],
			testIndex:0,
			//非测试数据
			materials: inlibraryModel,
			products: [],
			currentSteps: 0, //当前执行步骤，
			steps: [
				{
					title: '扫物料码'
				},
				{
					title: '扫库位码'
				},
				{
					title: '入库完成'
				}
			],
			MNumber: '',
			LocalID: ''
		};
	},
	components: {
		uniSteps,
		uniCard
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
				return '扫描物料码';
			} else if (this.$data.currentSteps == 1) {
				return '扫描入库码';
			} else if (this.$data.currentSteps == 2) {
				return '继续扫描物料码';
				console.log(入库码);
			} else if (this.$data.currentSteps > 2) {
				return '已经完成入库操作';
			}
		}
	},
	methods: {
		scanCode: function() {
			var _this = this;
			//测试使用
			debugger;
			if(this.testIndex%2==0){
				_this.scanMaterial(this.testData[this.testIndex]);
				this.testIndex++;
			}
			else{
				_this.scanWarehouse(this.testData[this.testIndex]);
				this.testIndex++;
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
			// var storage = parseForRule(res);
			var storage = {};
			this.LocalID = 1; //由于二维码返回的json对象不规范，值写死
			//测试使用
			console.log('接口：开始检查库位');
					this.materials.addStorage(storage);
					this.currentSteps = 2;
					console.log("scanMaterial：打印最后的结果："+JSON.stringify()(this.materials))
			//非测试
			return;
			
			
			checkLocal(this.MNumber, this.LocalID).then(data => {
				console.log('接口：开始检查库位');
				var [error, res] = data;
				console.log('res:' + JSON.stringify(res));
				console.log('error:' + JSON.stringify(error));
				var result = parseForRule(res.data);
				if (result.success) {
					this.materials.addStorage(storage);
					this.$data.currentSteps = 2;
					console.log("scanMaterial：打印最后的结果："+JSON.parse(this.materials))
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
			console.log('错误2' + typeof(result));
			console.log('错误22' + JSON.stringify(result.code));
			if (result.code) {
				debugger;
				if (this.materials.materialStorages.length <= 0) {
					console.log('首次新增物料入库模型对象');
					this.materials.addMew(result);
				} else {
					let flag = true;
					for (var i = 0; i < this.materials.materialStorages; i++) {
						if (this.materials.materialStorages[i].code == result.code) {
							this.materials.addMaterial(i, result);
							console.log('物料相加成功！');
							flag = false;
							return;
						}
					}
					if (flag) {
						this.material.addMew(result);
					}
				}
				this.MNumber = result.code;
				this.$data.currentSteps = 1;
				console.log("scanMaterial：打印最后的结果："+JSON.stringify(this.materials))
			}
		},
		//确定入库
		sureInlibrary: function() {},
		confirm() {
			var _this = this;
			this.$data.currentSteps = 3;
			uni.showToast({
				icon: 'id',
				title: '入库成功'
			});
		},
		onLoad() {
			console.log('登录状态：' + this.hasLogin);
			authAccount(this.hasLogin, this.forcedLogin, this.userName);
		}
	}
};
</script>

<style>
.materialnumber {
	width: auto;
	height: 100%;
	float: right;
}
</style>
