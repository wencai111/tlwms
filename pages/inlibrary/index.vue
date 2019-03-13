<template>
	<view class="content">
		<view class="example">
			<uni-steps :data="steps" :active="0"></uni-steps>
			<button type="primary" v-on:click="scanCode">
				扫描
				<text>{{ message }}</text>
			</button>
			<view class="productContainer">
				<view class="Materialcombined" >总计:{{total}}</view>
				<uni-card title="item.code" v-if="materials.length>0" v-for="item in materials" :key="item.code"  thumbnail="http://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png" extra="item.totalAmount" note="Tips">
				  <label>dfdfddfd</label>
                <!--  <label v-for="item in items" :key="item.codeid">
					     <view>{{item.id}}
						 <view class="materialnumber">{{item.count}}</view>
						 </view>
				   </label> -->
				</uni-card>
			</view>
			<button type="primary"  disabled="!isCanInlibrary" @click="confirm">确认入库</button>
		</view>
	</view>
</template>

<script>
import {parseForRule} from '@/libs/util.js'
import { checkLocal } from '@/api/inlibrary.js';
import { mapState } from 'vuex';
import { authAccount } from '@/libs/util.js';
import { uniSteps, uniCard } from '@dcloudio/uni-ui';

export default {
	data() {
		return {
			message: '物料码',
			materials:[],
			products:[],
			steps: [{ title: '扫物料码' }, { title: '扫库位码' }, { title: '入库完成' }],
			MNumber: '',
			LocalID: '',
			items:[{id:'w', count:'12',},{id:'w', count:'12'}]
		};
	},
	components: { uniSteps, uniCard },
	computed: {
		...mapState(['forcedLogin', 'hasLogin', 'userName']),
		isCanInlibrary(){
			if(this.$data.materials&&this.$data.materials.length>0){
				return true;
			}
			else{
				return false;
			}
		}
	},
	// this.total=Number(this.items.count)+Number(this.items.count),
	methods: {
// 		if (this.items.length > 0) {
// 			debugger;
// 		  } else {
// 		    return;
// 		  }
		scanCode: function() {
			var _this=this;
			// uni.showLoading({ title: '加载中' });
			uni.scanCode({
				onlyFromCamera: true,
				success: function(res) {
					console.log('扫码输出内容：' + JSON.stringify(res));
					// {id:'W',code:'1001030001-B12',codeid:'1',count:12}
					if(res&&res.result){
						var result=parseForRule(res.result);
						if(result.code){
								console.log("进入操作块")
								if(_this.$data.materials.length<=0){
									_this.$data.materials.push({code:result.code,totalAmount:result.count,items:[result]});
									console.log("输出数组值"+JSON.stringify(_this.$data.materials))
								}
								else{
									console.log("flag")
									let flag=true;
									for(var material of _this.$data.materials){
										if(material.code==result.code){
											console.log("t21rue")
											material.totalAmount=material.totalAmount+result.count;
											material.items.push(result);
											flag=false;
												console.log("returnfdf")
											return;
										}
									}
									console.log("returnfdffdfdfdfd"+flag)
									if(flag)
										{
											console.log("returnfdffdfdffdfdfdfddfd"+flag)
										_this.$data.materials.push({code:result.code,totalAmount:result.count,items:[result]});
									}
									
								}
							
						}

					
						
					}
				}
			});
		},          
		confirm(){
        uni.navigateTo({
	    url: 'inway?code',
	    })
	},
	onLoad() {
		console.log('登录状态：' + this.hasLogin);
		authAccount(this.hasLogin, this.forcedLogin, this.userName);
	}
	},    
};
</script>

<style>
	.materialnumber{
		width: auto;
		height: 100%;
		float: right;
	}
</style>
