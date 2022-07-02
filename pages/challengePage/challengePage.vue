<template>
	<view>
		<navigateBar></navigateBar>
		<view class="content">
			<view class="infiniteMode">
				无尽模式（无尽个番茄钟学习）
			</view>
			<view class="challengeMode">
				挑战模式(联机自习室)
				<view class="challengeIcon"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import navigateBar from "../../components/navigateBar.vue"
	export default {
		data() {
			return {
				
			}
		},
	components:{
		navigateBar,
		},
	}
</script>

<style scoped>
	.content{
		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		margin-left: 100rpx;
		margin-right: 100rpx;
	}
	.infiniteMode{
		flex: 1;
		border: 1px solid #000000;
		margin: 50rpx;
		font-size: 50rpx;
		text-align: center;
	}
	.challengeMode{
		flex: 1;
		border: 1px solid #000000;
		margin: 50rpx;
		font-size: 50rpx;
		/* text-align: center; */
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.challengeIcon{
		background-image: url(../../static/challengeIcon.png);
		background-size: cover;
		height: 100rpx;
		width: 100rpx;
		display: inline-block;
	}
</style>
