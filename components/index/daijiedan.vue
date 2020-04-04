<template>
	
		<view >		
				<block v-for="(tab,index) in tabBars" :key="index">
					<view class="liebiao">	
					<view class="fromDataTitleClass">
						商家地址
					</view>
					
					
					<view class="fromDataTitleClass">
						商品信息
					</view>
					<!--商品详情-->
					<view v-for="(itshang , index1) in  tab.commoditySnapshot" :key="index1">
						<view class="oxiangqing">
							<view>{{itshang.serviceType}}</view>
							<view> 采购数量:{{itshang.number}}</view>
							<view>{{itshang.specifiName}}</view>
							<view v-if="itshang.specifi_cations !==undefined &&  itshang.specifi_cations !=='--'">包装规格:{{itshang.specifi_cations}}</view>
							<view v-if=" itshang.remarks!== null && itshang.remarks!== undefined && itshang.remarks!=='' ">备注:{{itshang.remarks}}</view>
						</view>
					</view>
					
					
					
					</view>
				</block>
			
		</view>
</template>

<script>
	export default {
		props:{
			tabBars:Array,
		},
		methods:{
			tabtap(index){
				this.$emit('tabtap',index);
			},
		}
	}
</script>

<style>
	.liebiao {
		
	}

</style>
