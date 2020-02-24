<script>
	export default {
		onLaunch: function() {
			// 初始化用户状态
			this.$user.__init();
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	}
</script>

<style>
	/**导入全局样式*/
	@import './common/uni.css';
	/**导入图标*/
	@import './common/icon.css';
	/* 引入动画库 */
	@import './common/animate.css';
	/* 公共样式 */
	@import './common/common.css';
	
</style>
