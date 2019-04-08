<template>
	<view style="width: 100%;">
		<view class="uni-padding-wrap uni-common-mt">
			<view><input class="uni-input" v-model="MNumber" confirm-type="search" placeholder="请填写物流编码" /></view>
			<view class="uni-btn-v" v-show="steps.length <= 0">
				<button type="primary" @click="sureQuery">查询物流信息</button>
				<button type="default" @click="cancle">取消</button>
			</view>
			<view v-show="steps.length > 0"><uni-steps :data="steps" direction="column" :active="steps.length - 1"></uni-steps></view>
		</view>
	</view>
</template>

<script>
import { uniSteps} from '@dcloudio/uni-ui';
import { parseForRule, authAccount } from '@/libs/util.js';
import { getLogisInfo } from '@/api/checkInventory.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			MNumber: '', //查询物料编码
			currentSteps: 0,
			steps: [],
			data: []
		};
	},
	components: {
		uniSteps
	},
	created() {
		this.data = [];
	},
	computed: {
		...mapState(['forcedLogin', 'hasLogin', 'userName'])
	},
	methods: {
		//确定查询
		sureQuery: function() {
			if (this.MNumber == '') {
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
				this.addSteps();
			}
		},
		//返回
		cancle: function() {
			uni.navigateBack();
		},
		//添加步骤信息
		addSteps: function(data) {
			var result = [
				{ title: '江苏发出', desc: '2018-11-11' },
				{ title: '达到武汉市', desc: '2018-11-12' },
				{ title: '武汉武昌集散中心发出', desc: '2018-11-13' },
				{ title: '到达武昌保利华都', desc: '2018-11-14' }
			];
			for (let item of result) {
				this.steps.push(item);
			}
		},
		addLogis: function(data) {
			this.addSteps();
		}
	},
	onLoad(option) {
		console.log('option:' + JSON.stringify(option));
		if (option && option.code && option.code != '') {
			this.MNumber = option.code;
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
