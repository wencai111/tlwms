<template>
	<view></view>
</template>

<!-- <template>
	<view>
		<view v-show="" class="wxc-card">
			<view class="wxc-card_list">
				<view class="wxc-card_list_header">
					<view class="wxc-card_list_header_title"></view>
					<view class="wxc-card_list_header_extra"></view>
				</view>
				<view class="wxc-card_list_content">
					<view class="wxc-card_list_content_text"></view>
					<view class="wxc-card_list_content_text"></view>
					<view class="wxc-card_list_content_text"></view>
				</view>
			</view>
			<view>
				<view v-show="" style="text-align: center;">没有更多数据</view>
				<button type="primary" v-show="" @click="goMore">加载更多</button>
			</view>
		</view>
	</view>
</template>
<script>
	// import { authAccount } from '@/libs/util.js';
	// import { mapState } from 'vuex';
	import { queryModels } from '@/model/queryModel.js';
	import { GetLocationList } from '@/api/deliveryNote.js';
	export default {
		data() {
			return {
				data: []
			};
		},
		computed:{
			
		},
		methods:{
			goMore: function(){
				GetLocationList(this.PdFlag, this.pageIndex, this.pageSize,this.sortField,this.sortOrder,).then(data => {
					
					});
			},
			
		}
		
		
		
// 			onLoad() {
// 			authAccount(this.hasLogin, this.forcedLogin, this.userName);
// 		}
		}
</script>
 -->