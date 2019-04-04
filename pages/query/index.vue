<template>
	<view class="">
		<view class="uni-padding-wrap uni-common-mt">
			<view v-show="!isShowData">
				<view class=""><input class="uni-input" name="input" v-model="MNumber" placeholder="请填写条码" /></view>
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
			<view v-show="isShowData" class="wxc-card">
				<view class="wxc-card_list" v-for="item in query" v-bind:key="item.NowQuanId">
					<view class="wxc-card_list_header">
						<view class="wxc-card_list_header_title">{{ item.LocalName }}</view>
						<view class="wxc-card_list_header_extra">{{ item.RegionName }}</view>
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
	import {
		authAccount
	} from '@/libs/util.js';
		import {
		parseForRule
	} from '@/libs/util.js';
	import {
		mapState
	} from 'vuex';
	import {
		queryModels
	} from '@/model/queryModel.js';
	import {
		GetStockList
	} from '@/api/query.js';
	export default {
		data() {
			return {
				MNumber: '',
				total: 11,
				totalPages: 0,
				isShowData: false,
				query:queryModels,
				data: []
			};
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
// 		created: function() {
// 			if (this.$route.query && this.$route.query.code) {
// 				this.MNumber = this.$route.query.code;
// 			}
// 		},
		methods: {
			sureQuery: function() {
				var result = [];
				var _this = this;
				console.log('this定义：' + _this);
				uni.scanCode({
					onlyFromCamera: true,
					success: function(res) {
						console.log("res.result" + JSON.stringify(res))
						console.log("res.result" + JSON.stringify(res.result))
						GetStockList(this.MNumber).then(data => {
							console.log("123")
							var [error, res] = data;
							var result = parseForRule(res.data);
							console.log("res.result" + JSON.stringify(res.data))
							if (result) {
								console.log("我的测试" + JSON.stringify(result))
								console.log("query"+this.query)
								console.log("query.inventory"+this.query.inventory)
								_this.query.inventory(result);
							}
				for (let item of result) {
					this.data.push(item);
				}
				this.isShowData = true;
				});
			},
			});
			},
			cancle: function() {
				uni.navigateBack();
			},
			goMore: function() {
				var result = [{
						NowQuanId: '17',
						RegionID: '1',
						LocalID: '24',
						MNumber: '1025011001-B11C',
						MName: '皮带',
						SupplyName: '盖茨优霓塔',
						MSortName: '',
						InPackage: '50',
						OutPackage: '50',
						UnitName: '',
						CarName: 'B11B',
						RegionName: '高架良品区',
						LocalName: 'B1-A1-3层-04',
						EndQuan: '10',
						InDate: '2019-2-23 11:42:02',
						BatchNum: '',
						ProdSpot: 'FB-04',
						LineName: '底盘线',
						TpBarcode: '',
						Cubage: '',
						UnitPrice: '0',
						WarningVal: '',
						MSortCode: '',
						PalletFlag: ''
					},
					{
						NowQuanId: '16',
						RegionID: '1',
						LocalID: '23',
						MNumber: '1025012001-B01',
						MName: '平惰轮总成',
						SupplyName: '暂无',
						MSortName: '',
						InPackage: '1',
						OutPackage: '1',
						UnitName: '件',
						CarName: 'B11',
						RegionName: '高架良品区',
						LocalName: 'B1-A1-3层-03',
						EndQuan: '10',
						InDate: '2019-2-23 11:42:02',
						BatchNum: '',
						ProdSpot: '暂无',
						LineName: '底盘线',
						TpBarcode: '',
						Cubage: '',
						UnitPrice: '0',
						WarningVal: '',
						MSortCode: '',
						PalletFlag: ''
					},
					{
						NowQuanId: '13',
						RegionID: '1',
						LocalID: '11',
						MNumber: '1001050001-B11C',
						MName: '左悬置总成',
						SupplyName: '上海众力汽车零部件有限公司',
						MSortName: '',
						InPackage: '4',
						OutPackage: '72',
						UnitName: '',
						CarName: 'B11B',
						RegionName: '高架良品区',
						LocalName: 'B1-A1-2层-01',
						EndQuan: '30',
						InDate: '2019-2-18 10:27:41',
						BatchNum: '',
						ProdSpot: 'NS-29',
						LineName: '内饰一',
						TpBarcode: '',
						Cubage: '',
						UnitPrice: '0',
						WarningVal: '',
						MSortCode: '',
						PalletFlag: ''
					}
				];
				for (let item of result) {
					this.data.push(item);
				}
				this.isShowData = true;
			}
		},
		onLoad() {
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

				&_extra {}
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
