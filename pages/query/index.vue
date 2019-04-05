<template>
	<view style="width: 100%;">
		<view class="uni-padding-wrap uni-common-mt">
			<view v-show="data.length <= 0">
				<view class=""><input class="uni-input" name="input" v-model="MNumber" placeholder="请填写物料条码" /></view>
				<view class="uni-form-item uni-column">
					<view class="title">排序字段</view>
					<radio-group name="radio">
						<label>
							<radio value="radio1" />
							入库时间
						</label>
						<label>
							<radio value="radio2" />
							默认
						</label>
					</radio-group>
				</view>
				<view class="uni-form-item uni-column">
					<view class="title">升降序</view>
					<radio-group name="radio">
						<label>
							<radio value="radio1" />
							升序
						</label>
						<label>
							<radio value="radio2" />
							降序
						</label>
					</radio-group>
				</view>

				<view class="uni-btn-v">
					<button type="primary" @click="sureQuery">确定</button>
					<button type="default" @click="cancle">取消</button>
				</view>
			</view>
			<view v-show="data.length > 0" class="wxc-card">
				<view class="wxc-card_list" v-for="item in data" v-bind:key="item.NowQuanId">
					<view class="wxc-card_list_header">
						<view class="wxc-card_list_header_title">{{ item.LocalName }}</view>
						<view class="wxc-card_list_header_extra">{{ item.RegionName }}</view>
						<view class="wxc-card_list_header_extra1">{{ item.MNumber }}</view>
					</view>
					<view class="wxc-card_list_content">
						<view class="wxc-card_list_content_text">入:{{ item.InPackage }}</view>
						<view class="wxc-card_list_content_text">出:{{ item.OutPackage }}</view>
						<view class="wxc-card_list_content_text">库存:{{ item.EndQuan }}</view>
					</view>
				</view>
				<view>
					<view v-show="!isNext" style="text-align: center;">没有更多数据</view>
					<button type="primary" v-show="isNext" @click="goMore">加载更多</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { parseForRule, authAccount } from '@/libs/util.js';
import { getStockList } from '@/api/query.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			total: 0,
			MNumber: '', //查询物料编码
			pageSize: 20, //分页
			pageIndex: 0, //当前页码
			sortField: 'InDate', //排序字段
			sortOrder: 'desc', //
			GridCode: 2008,
			BillCode: 2008,
			data: []
		};
	},
	created() {
		this.total = 0;
		this.MNumber = '';
		this.pageSize = 20;
		this.pageIndex = 0;
		this.sortField = 'InDate';
		this.sortOrder = 'desc';
		this.GridCode = 2008;
		this.BillCode = 2008;
		this.data = [];
	},
	computed: {
		...mapState(['forcedLogin', 'hasLogin', 'userName']),
		isNext() {
			if (this.total > this.data.length) {
				return true;
			} else {
				return false;
			}
		}
	},
	methods: {
		//确定查询
		sureQuery: function() {
			if (this.MNumber == '') {
				uni.showModal({
					title: '提示',
					content: '请填写物料编码',
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
				getStockList(this.generateModel()).then(data => {
					var [error, res] = data;
					console.log('getStockList.data:' + JSON.stringify(data));
					console.log('getStockList.res:' + JSON.stringify(res));
					var result = parseForRule(res.data);
					console.log('getStockList.result:' + JSON.stringify(result));
					if (result && result != {}) {
						_this.addMaterialModel(result);
					} else {
						uni.showModal({
							title: '提示',
							content: '没有查询出物料信息',
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
		//加载下一页
		goMore: function() {
			var result = [];
			this.pageIndex++;
			this.sureQuery();
		},
		//重置函数
		reset: function() {
			this.total = 0;
			this.MNumber = '';
			this.pageSize = 20;
			this.pageIndex = 0;
			this.sortField = 'InDate';
			this.sortOrder = 'desc';
			this.GridCode = 2008;
			this.BillCode = 2008;
			this.data = [];
		},
		//添加物料信息
		addMaterialModel: function(data) {
			this.total = data.total;
			for (let item of data.data) {
				this.data.push(item);
			}
		},
		//生成提交查询入库model
		generateModel: function() {
			var model = new Object();
			model.MNumber = this.MNumber;
			model.pageSize = this.pageSize;
			model.pageIndex = this.pageIndex;
			model.sortField = this.sortField;
			model.sortOrder = this.sortOrder;
			model.GridCode = this.GridCode;
			model.GridCode = this.GridCode;
			return model;
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
