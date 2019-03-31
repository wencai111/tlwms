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
            <view v-show="isShowData">
				<view v-for="item in data" v-bind:key="item.NowQuanId">
					<view>
						<view>{{item.LocalName}}</view>
						<view>{{item.RegionName}}</view>
					</view>
					<view>
						<view>{{item.InPackage}}</view>
						<view>{{item.OutPackage}}</view>
						<view>{{item.EndQuan }}</view>
					</view>
				</view>
				<view>
					<view v-show="!isNext" style="text-align: center;" >没有更多数据</view>
					<button type="primary" v-show="isNext" @click="goMore" >加载更多</button>
				</view>
			</view>		
		</view>
	</view>
</template>

<script>
import { authAccount } from '@/libs/util.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			MNumber: '',
			pageIndex: 0,
			pageSize: 20,
			sortField: "InDate",
			sortOrder: "asc",
			total: 11,
			totalPages:0,
			isShowData:false,
			data:[]
		};
	},
	computed: {
		...mapState(['forcedLogin', 'hasLogin', 'userName']),
		isNext(){
			if(this.total>this.data.length){
				return true;
			}
			else{
				return false;
			}
		}
	},
	created: function() {
		if (this.$route.query && this.$route.query.code) {
			debugger;
			this.MNumber = this.$route.query.code;
		}
	},
	methods: {
		sureQuery: function() {
			var result= [
				{
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
			for(let item of result){
				this.data.push(item);
			}
			this.isShowData=true;
		},
		cancle:function(){
			uni.navigateBack();
		},
		goMore:function(){
			var result= [
				{
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
			for(let item of result){
				this.data.push(item);
			}
			this.isShowData=true;
		}
	},
	onLoad() {
		authAccount(this.hasLogin, this.forcedLogin, this.userName);
	}
};
</script>

<style>
.uni-btn > button {
	margin-top: 12px;
}
</style>
