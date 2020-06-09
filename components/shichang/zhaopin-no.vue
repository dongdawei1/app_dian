<template>
	<view class="index-list">
		<view class="index-list2">
			<view>招聘职位：{{ item.position }}</view>
			<view>薪资待遇 : {{ item.salary }}</view>
		</view>

		<view class="index-list4">
			<view>招聘人数 : {{ item.number }}</view>
			<view>性别要求 : {{ item.gender }}</view>
		</view>

		<view class="index-list4">
			<view>年龄要求 : {{ item.age }}</view>
			<view>学历要求 : {{ item.education }}</view>
		</view>
		<view class="index-list4">
			<view>工作城市 : {{ item.detailed }}</view>
			<view>工作经验 : {{ item.experience }}</view>
		</view>
		<view class="index-list4">
			<view>工作地址 : {{ item.workingAddress }}</view>
		</view>
		<view class="index-list4">
			<view>其他福利 : {{ item.welfare }}</view>
		</view>
		<view class="index-list4">
			<view>公司名称 : {{ item.companyName }}</view>
		</view>

		<view class="index-list4">
			<view>职位介绍 : {{ item.describeOne }}</view>
		</view>
		<view class="index-list4">
			<view>介绍人奖励 : {{ item.introductoryAward }}</view>
		</view>
		<view class="index-list4">
			<view>发布时间 : {{ item.createTime }}</view>
		</view>

		<view class="juzhong">
			<button type="warn" plain="true" :loading="loading" class="mini-class" size="mini" @click="getContact(item.id, item.isPublishContact)" v-if="item.isPublishContact===1">查询手机号码</button>
		<button type="warn" plain="true" :loading="loading" class="mini-class" size="mini" @click="getContact(item.id, item.isPublishContact)" v-if="item.isPublishContact===2">查询邮箱</button>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		item: Object,
		index: Number
	},
	data() {
		return { loading: false };
	},
	methods: {
		// 查看电话
		getContact(id, type) {
			let params = {
				queriesType: type,
				id: id,
				selectType: 1
			};

			this.loading = true;
			this.$http.post(this.$urlconfig.getContact, params, {}).then(data => {
				this.loading = false;
				if (data.status === 0) {
					let lianxi=null;
					if(type===1){
						lianxi=' 联系方式:'+data.data.contact;
					}else{
						lianxi= ' 联系邮箱:'+data.data.email;
					}
					uni.showModal({
					    title: '请勿将联系方式提供给他人',
					    content: '联系人:'+data.data.consigneeName+'; '+ lianxi ,
						success: function (res) {
					        if (res.confirm) {
					          //  console.log('用户点击确定');
					        } else if (res.cancel) {
					           //  console.log('用户点击取消');
					        }
					    }
					});
				}
			});
		}
	}
};
</script>

<style scoped>
.index-list {
	padding: 10upx 55upx 0 0;
	border-bottom: 1upx solid #eeeeee;
}

.index-list2 {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.index-list2 view {
	padding-top: 10upx;
	font-size: 34upx;
	color: #5d5d5d;
}
.index-list3 {
	position: relative;
}

.index-list4 {
	padding: 0 20upx 0 20upx;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
}
.juzhong {
	text-align: center;
}
</style>
