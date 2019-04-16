<template>
	<view style="width: 100%;">
		<view class="uni-padding-wrap uni-common-mt">
			<view><input class="uni-input" v-model="PackNum" confirm-type="search" placeholder="请填写物流编码" /></view>
			<view class="uni-btn-v" v-show="steps.length <= 0">
				<button type="primary" @click="sureQuery">查询物流信息</button>
				<button type="default" @click="cancle">取消</button>
			</view>
			<view v-show="steps.length > 0"><uni-steps :data="steps" direction="column" :active="steps.length - 1"></uni-steps></view>
		</view>
	</view>
</template>

<script>
import { uniSteps } from '@dcloudio/uni-ui';
import { addUserParam,parseForRule, authAccount,isEmptyObject } from '@/libs/util.js';
import { getLogisInfo } from '@/api/checkInventory.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			flag: false, //在有数据的情况下，是否显示查询按钮
			total: 0,
			PackNum: '', //查询包装码编码
			steps: [],
			data: []
		};
	},
	components: {
		uniSteps
	},
	created() {
		this.flag = false;
		this.total = 0;
		this.PackNum='';
		this.data = [];
		this.steps = [];
	},
    computed: mapState(['forcedLogin', 'hasLogin', 'userName','password','userID']),
	methods: {
		//确定查询
		sureQuery: function() {
			if (this.PackNum == '') {
				uni.showModal({
					title: '提示',
					content: '请填写物流编号',
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							return;
						}
					}
				});
			} else {
				var _this = this;
				getLogisInfo(addUserParam(this.generateModel(),this.userName,this.password,this.userID)).then(data => {
						var [error, res] = data;
						console.log('getLogisInfo.data:' + JSON.stringify(data));
						console.log('getLogisInfo.res:' + JSON.stringify(res));
						var result = parseForRule(res.data);
						console.log('getLogisInfo.result:' + JSON.stringify(result));
						if (result && !isEmptyObject(result)) {
							_this.addStepsModel(result);
						} else {
							uni.showModal({
								title: '提示',
								content: '没有查询出物流信息',
								showCancel: false,
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
										return;
									}
								}
							});
						}
				});
			}
		},
		//返回
		cancle: function() {
			uni.navigateBack();
		},
			//添加物料信息
		addStepsModel: function(data, flag) {
			this.total = data.total;
			if (this.flag) {
				this.data = [];
			}
			for (let item of data.data) {
				this.steps.push({ title: item.InOutFlag+item.ArriAdds, desc: item.ArriDate });
				this.data.push(item);
			}
			this.flag = false;
		},
	    //重置函数
		reset: function() {
			this.total = 0;
			this.PackNum = '';	
		},
		//添加步骤信息
		// {PackNum:'TLWL201949-1',ArriDate:'2019/4/10 17:07:32',InOutFlag:'到达',ArriAdds:'wuhan'}
// 		addSteps: function(res) {
// 			console.log('data入参:PackNum:' + res);
// 			var result = [
// 				{ title: '江苏发出', desc: '2018-11-11' },
// 				{ title: '达到武汉市', desc: '2018-11-12' },
// 				{ title: '武汉武昌集散中心发出', desc: '2018-11-13' },
// 				{ title: '到达武昌保利华都', desc: '2018-11-14' }
// 			];
// 			for (let item of result) {
// 				this.steps.push(item);
// 			}
// 		},
		//生成提交查询入库model
		generateModel: function() {
			var model = new Object();
			model.PackNum = this.PackNum;
			return model;
		},
		addLogis: function(data) {
			this.addSteps();
		}
	},
	onLoad(option) {
		console.log('option:' + JSON.stringify(option));
		if (option && option.code && option.code != '') {
			getLogisInfo(option.code).then(data => {
				var [error, res] = data;
				this.PackNum = option.code;
			});
		}
		authAccount(this.hasLogin, this.forcedLogin, this.userName);
	}
};
</script>

<style lang="scss">
.wxc-card {
	margin: $uni-spacing-col-base;
	position: relative;
	display: flex;
	flex-direction: column;

	&_list {
		background: $uni-bg-color;
		margin-bottom: $uni-spacing-col-base;

		&_header {
			position: relative;
			display: flex;
			flex-direction: row;
			padding: $uni-spacing-col-base;
			align-items: left;
		}

		&_header {
			&_title {
				margin-right: $uni-spacing-col-base;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				font-size: $uni-font-size-lg;
			}

			&_extra {
				margin-right: $uni-spacing-col-base;
			}
			&_extra:last-child {
				margin-right: 0upx;
			}
		}

		&_content {
			position: relative;
			display: flex;
			flex-direction: row;
			padding: 0 $uni-spacing-col-base;
			align-items: left;

			&_text {
				font-weight: 100;
				padding: $uni-spacing-col-base;
			}
		}
	}
}
</style>
