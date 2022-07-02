<template>
	<view>
		<!-- <view style="position: absolute; bottom: 15px ; left: 5px;"--> <!-- bottom:90px -->
		<view style="position: absolute; top: calc(50% + 100rpx) ; left: 50%; transform: translate(-50%,-50%);">
			<view class="routineIcon1" style="width: 70px; 
		height: 70px; 
		margin-right: 0px;" @click="openRoutinePage"></view>
			<!-- <uni-icons type="fire-filled" size="60px" color="#ff6060"></uni-icons> -->
		</view>
		<!-- <view ref="mask" style="position: absolute; top: 0px; z-index: 999; background-color: rgba(0, 0, 0, 0.3); width: 100%; height: 100%; display: none;" @click.self="maskClose">
			<view style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);height: 1000rpx;
		width: 600rpx; background-color: #fff; opacity: 1; border-radius: 5px;"></view>
		</view> -->
		<uni-popup ref="popup" id="popup" type="center" background-color="#fff9f9">
			<view style="height: 1000rpx; width: 600rpx; display: flex; flex-direction: column;">
				<view style="flex: 1; background-color: #fff3f3; border-radius: 10px 10px 0 0; font-size: 25px;
				box-shadow: #ffbbbb 0px 3px 6px; display: flex; justify-content: center; align-items: center;">
					<view class="routineIcon"></view>
					<!-- <uni-icons type="fire-filled" size="50px" color="#ff6060"></uni-icons> -->
					<view>日常任务</view>
				</view>
				<view style="flex: 5;">
					任务细节</view>
			</view>
		</uni-popup>
	<!-- </view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return{
				
			}
		},
		methods:{
			openRoutinePage(){
				this.$refs.popup.open()
				// console.log(this.hpx)
			},
			maskClose(){
				this.$refs.mask.$el.style.display='none';
			}
		},
		
	}
</script>

<style>
	.routineIcon1{
		background-image: url('@/static/routineIcon1.png'); 
		width: 70px; 
		height: 70px; 
		margin-right: 15px;
		background-size: cover;
	}
	.routineIcon{
		background-image: url('@/static/routineIcon.png'); 
		width: 70px; 
		height: 70px; 
		margin-right: 15px;
		background-size: cover;
	}
</style>