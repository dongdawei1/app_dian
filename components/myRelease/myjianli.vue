<template>
	<view class="index-list">
		<view class="biaoti">
			简历状态 :
			<text v-if="item.welfareStatus === 1">发布中</text>
			<text v-if="item.welfareStatus === 2">隐藏中</text>
			<text v-if="item.welfareStatus === 4">审核中</text>
			<text v-if="item.welfareStatus === 5">不在有效期不显示</text>
		</view>
		<view class="jinggao" v-if="item.authentiCationStatus === 3 && item.welfareStatus === 4">审核失败原因：{{ item.authentiCationFailure }}</view>

		<view class="index-list4">
			<view>id：{{ item.id }}</view>
			<view>薪资要求 : {{ item.salary }}</view>
		</view>
		<view class="index-list4">
			<view>求职类型 : {{ item.position }}</view>
			<view>工作经验 : {{ item.experience }}</view>
		</view>
		<view class="index-list4">
			<view>联系人 : {{ item.consigneeName }}</view>
			<view>性别 : {{ item.gender }}</view>
		</view>
		<view class="index-list4">
			<view>学历 : {{ item.education }}</view>
			<view>年龄 : {{ item.age }}</view>
		</view>

		<view class="index-list4">
			<view>
				公开联系类型 :
				<text v-if="item.isPublishContact === 1">公开手机号</text>
				<text v-if="item.isPublishContact === 2">公开邮箱</text>
				
			</view>
		</view>

		<view class="index-list4">
			<view>求职城市 : {{ item.detailed }}</view>
		</view>
		<view class="index-list4">
			<view>所在城市 : {{ item.addressDetailed }}</view>
		</view>

		<view class="index-list4">
			<view>联系方式 : {{ item.contact }}</view>
		</view>
		<view class="index-list4">
			<view>邮箱 : {{ item.email }}</view>
		</view>
		<view class="index-list4">
			<view>创建时间 : {{ item.createTime }}</view>
		</view>
		<view class="index-list4" v-if="item.welfareStatus !== 4">
			<view>失效时间 : {{ item.termOfValidity }}</view>
		</view>
		<view class="index-list4">
			<view>自我描述 : {{ item.describeOne }}</view>
		</view>

		<view class="myReleasebuwai">
			<view class="myReleasebuno"><button class="mini-class "  @click="openUrl()" size="mini" type="primary">编辑</button></view>
			<view class="myReleasebuno" v-if="item.welfareStatus === 1">
				<button class="mini-class " :loading="loading" @click="operation(1)" size="mini" type="primary">刷新</button>
			</view>
			<view class="myReleasebuno" v-if="item.welfareStatus === 1">
				<button class="mini-class " :loading="loading" @click="operation(2)" size="mini" type="primary">隐藏</button>
			</view>
			<view class="myReleasebuno" v-if="item.welfareStatus === 2">
				<button class="mini-class " :loading="loading" @click="operation(4)" size="mini" type="primary">显示</button>
			</view>
			<view class="myReleasebuno" v-if="item.welfareStatus === 5">
				<button class="mini-class " :loading="loading" @click="operation(5)" size="mini" type="primary">延期</button>
			</view>
			<view class="myReleasebuno"><button class="mini-class " :loading="loading" @click="operation(3)" size="mini" type="primary">删除</button></view>
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
		// 跳转
		openUrl() {
				let url_31 = '../../pages/crejianliup/crejianliup?item=' + encodeURIComponent(JSON.stringify(this.item));
				uni.navigateTo({
					url: url_31
				});
				return true;
		},
		//操作
		operation(type) {
			let data = {};
			data.type = type;
			data.userId = this.item.userId;
			data.id = this.item.id;
			if (type === 1 || type === 2 || type === 4 || type === 5) {
				this.operationRequest(data);
			} else if (type === 3) {
				let this_ = this;
				uni.showModal({
					title: '确认要删除',
					content: '',
					success: function(res) {
						if (res.confirm) {
							this_.operationRequest(data);
						} else if (res.cancel) {
						}
					}
				});
			} else {
				uni.showToast({
					title: '操作类型错误',
					icon: 'none'
				});
			}
		},
		operationRequest(data) {
			this.loading = true;
			this.$http.post(this.$urlconfig.operation_resume, data, {}).then(data => {
				this.loading = false;
				if (data.status === 0) {
					uni.showToast({
						title: '操作成功',
						icon: 'none'
					});
					this.$emit('getnew');
				}
			});
		}
	}
};
</script>

<style scoped>

</style>
