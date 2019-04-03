<template>
	<view class="content">
		<view class="">
			<button :type="btnType"  v-on:click="scanPackegel">
				<text>{{ btnText }}</text>
			</button>
			<view v-show="TlJpdID != ''">
				<view class="">
					<view class="wxc-list">
						<view class="wxc-list-title">需求单号:</view>
						<view class="wxc-list-extra">{{ OperBillNum }}</view>
					</view>
					<view class="wxc-list">
						<view class="wxc-list-title">条码内容:</view>
						<view class="wxc-list-extra">{{ BillNum }}</view>
					</view>
					<view class="wxc-list">
						<view class="wxc-list-title">物料编码:</view>
						<view class="wxc-list-extra">{{ MNumber }}</view>
					</view>
					<view class="wxc-list">
						<view class="wxc-list-title">物料名称:</view>
						<view class="wxc-list-extra">{{ MName }}</view>
					</view>
					<view class="wxc-list">
						<view class="wxc-list-title">包装数量:</view>
						<view class="wxc-list-extra">{{ OutPackage }}</view>
					</view>
					<view class="wxc-list">
						<view class="wxc-list-title">对应数量:</view>
						<view class="wxc-list-extra">{{ Qty }}</view>
					</view>
				</view>
			</view>
			<button type="primary" v-show="isCanOutlibrary" v-on:click="sureOutlibrary"><text>确定出库</text></button>
			<button type="default"><text>返回</text></button>
			<!-- 	<button type="primary"  @click="logMessage">
				浏览器打印
			</button> -->
		</view>
	</view>
</template>

<script>
import { parseForRule } from '@/libs/util.js';
import { mapState } from 'vuex';
import { authAccount } from '@/libs/util.js';
export default {
	data() {
		return {
			TlJpdID: '', //拣货码ID号
			OperBillNum: '', //需求单号
			BillNum: '', //拣货码条码内容
			MNumber: '', //当前拣货码物料编码
			MName: '', //当前拣货码物料名称
			OutPackage: '', //出库单包装数量
			Qty: '' //当前拣货码对应数量
		};
	},
	computed: {
		...mapState(['forcedLogin', 'hasLogin', 'userName']),
		isCanOutlibrary() {
			if (this.TlJpdID && this.TlJpdID != '') {
				return true;
			} else {
				return false;
			}
		},
		btnText() {
			if (this.TlJpdID && this.TlJpdID != '') {
				return '取消并重新扫描拣货码';
			} else {
				return '扫描拣货码';
			}
		},
		btnType() {
			if (this.TlJpdID && this.TlJpdID != '') {
				return 'default';
			} else {
				return 'primary';
			}
		}
	},
	methods: {
		//扫描拣货码
		scanPackegel: function(res) {
			if(this.isCanOutlibrary){
				this.resetScanPackegel();
			}
			else{
				var result = { TlJpdID: '1', OperBillNum: 'MDB2019217-3', BillNum: 'PGC2019221-16791', MNumber: '1001030001-B12', MName: '后悬置总成', OutPackage: '12', Qty: '24' };
				this.setPackegel(result);
			}
		},
		resetScanPackegel: function(res) {
			uni.showModal({
				title: '提示',
				content: '是否放弃当前拣货码，重新扫描拣货码',
				success: function(res) {
					if (res.confirm) {
						this.initPackegel();
						var result = { TlJpdID: '1', OperBillNum: 'MDB2019217-3', BillNum: 'PGC2019221-16791', MNumber: '1001030001-B12', MName: '后悬置总成', OutPackage: '12', Qty: '24' };
						this.setPackegel(result);
					} else if (res.cancel) {
					}
				}
			});
		},
		//初始化拣货码信息
		initPackegel:function(){
			this.TlJpdID = '';
			this.OperBillNum = '';
			this.BillNum = '';
			this.MNumber = '';
			this.MName = '';
			this.OutPackage = '';
			this.Qty = '';
		},
		//设置拣货码信息
		setPackegel:function(result){
			this.TlJpdID = result.TlJpdID;
			this.OperBillNum = result.OperBillNum;
			this.BillNum = result.BillNum;
			this.MNumber = result.MNumber;
			this.MName = result.MName;
			this.OutPackage = result.OutPackage;
			this.Qty = result.Qty;
		},
		//确定出库
		sureOutlibrary: function(res) {},
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
button {
	margin-top: 12upx;
}

.wxc-list {
	position: relative;
	display: flex;
	flex-direction: row;
	padding: $uni-spacing-col-base;
	padding-right: 0px;
	align-items: center;

	&-title {
		flex: 0 0 auto;
		margin-right: $uni-spacing-col-base;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		font-size: $uni-font-size-lg;
	}

	&-extra {
		flex: 1;

		// width: $card-extra-width;
		margin-left: $uni-spacing-col-base;
		font-size: $uni-font-size-lg;
		// text-align: left;
	}
}
</style>
