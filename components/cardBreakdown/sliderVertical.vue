<template>
	<view class="content">
		<view class="">
			<!-- 背景 -->
			<view style="position:absolute; top: 150rpx; left: 39rpx;font-size: 14px;color: #e2b1a7;">{{VE}}</view>
			<view class="" style="background: linear-gradient(to top, #9dd5ff, #ff9793) ; border-radius: 20rpx; width: 40rpx; height: 350rpx; position:absolute; top: 200rpx; left: 30rpx;">
				<!-- 滑动条 -->
				<view class="" style="background-color: #ffffff; width: 40rpx; height: 0rpx; border-radius: 20rpx 20rpx 0rpx 0rpx; " :style="{height:pageY+'px'}"></view>
				<view class="expButton" @touchmove="touchmove" @touchend="touchend" :style="{top:pageY-2+'px'}">
					<view class="expButtonF"></view>
				</view>
			</view>
			
			<!-- 滑动按钮 -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const scH=uni.getSystemInfoSync().screenHeight
			const toppageY=((scH-50)-uni.upx2px(900))/2+uni.upx2px(200)
			const barHeightpx=uni.upx2px(320)
			const oneUnit=barHeightpx/9
			const pageY=barHeightpx-this.valueExp*oneUnit
			
			return {
				pageY,
				oneUnit,
				max:10,
				min:1,
				toppageY,
				barHeightpx,
				VE:this.valueExp
			}
		},
		mounted() {
			// console.log(this.valueExp ,this.VE)
		},
		props:["valueExp"],
		methods:{
			touchmove(e){
				// console.log(e)
				if(e.changedTouches[0].pageY-this.toppageY>=0 & e.changedTouches[0].pageY-this.toppageY<=this.barHeightpx){
					this.pageY=(e.changedTouches[0].pageY-this.toppageY);
					for(let i=8; i>=0;i--){
						if(this.pageY>this.oneUnit*i & this.pageY<=this.oneUnit*(i+1)){
							this.VE=10-(i+1);
						}
					}
					// if(this.pageY)
					// console.log(this.toppageY);
					// this.toppageY=(this.pageY+190*this.wpx);
				// }
				// console.log(this.wpx*477);
				// while()
				}
			},
			touchend(){
				this.$emit("changing",this.VE)
			}
			
		},
	}
</script>

<style>
	.expButton{
		position: absolute; 
		width: 45rpx; 
		height: 30rpx; 
		background: linear-gradient(to top, #def3ff, #ffc2c2);
		border-radius: 10rpx;
		background-size: cover;
		left: -2.5rpx;
	}
	.expButtonF{
		width: 45rpx;
		height: 35rpx; 
		position: absolute; 
		top: -6rpx;
		left: -2rpx;
		background-image: url(@/static/expButton.png); 
		background-size: cover;
	}
</style>
