<template>
	<view style="margin-top: 200rpx;">
	<view class="toDoHead">
		<view class="toDoHead-level">{{progressBar.level}}</view>
		<!-- <view class="toDoHead-level">{{123456789}}</view> -->
		<view class="progressBar">
			<view id="xcprogress">
				<div class="xcprogress">
					<div class="xcprogress-bar" :style="{ 'width': `${progressBar.value}%` }">
					</div>
				</div>
			</view>
			<div id="app">
				<xc-progress :value="progressBar.value" @expGet="changeExp"></xc-progress>
			</div>
		</view>
		
			<span class="xcprogress-bar-value">{{ progressBar.nowExp }}/{{progressBar.neededExp}}</span>
		<view class="token">
		<view class='tokenCube'>
		<view class="tokenNumber">{{$store.state.tokenNumber}}</view>
		</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				progressBar:
				{value: 0,
				level:1,
				neededExp:60,
				nowExp:0
				},
				
			}
		},
		onLoad() {
			
		},
		// watch:{
		// 	tokenNumber: function(newVal, oldVal) {
		// 		this.tokenNumber = newVal;
		// 		console.log(this);
		// 	}
		// },
		methods:{
			changeExp(value) {
				// console.log("changeexp")
				if(this.progressBar.nowExp+value<this.progressBar.neededExp){
					this.progressBar.nowExp+=value
				}
				else{
					this.progressBar.level+=1
					this.progressBar.nowExp=this.progressBar.nowExp+value-this.progressBar.neededExp
					// console.log("Level:",this.progressBar.level)
					this.progressBar.neededExp=Math.floor((Math.log(2*this.progressBar.level+1)*100+this.progressBar.neededExp-80))
				}
				this.progressBar.value=(this.progressBar.nowExp/this.progressBar.neededExp)*100
				// console.log("现在value是",this.progressBar.value)
				uni.setStorage({
					key: 'exp',
					data: this.progressBar,
					success: function () {
						// console.log('successstoreExp');
					}
				})
			},
			
			
		},
		mounted() {
			uni.$on("changeSliderValue",this.changeExp);
			uni.getStorage({
				key:'exp',
				success:(e)=>{
					this.progressBar=e.data;
				},
				fail(e) {
					console.log(e,"expfail")
				}
			})
		// 	setTimeout(() => {
		// 		setInterval(() => {
		// 			this.value += 10;
		// 		}, 800);
		// 	}, 1000);
			
		},
		components: {
			'xc-progress': {
				template: '#xcprogress',
				props: {
					value: {
						type: Number,
						default: 0
					}
				},
		}
	},
	props:['title']
	}
</script>

<style>
	@font-face {
		font-family: 'Anglia';
		src: url('@/static/AngliaFont1.ttf');
	}
	
	.toDoHead{
		position: fixed;
		width: 100%;
		top: 0px;
		display: flex;
		height: 200rpx;
		background-color: #e2f1ff;
		font-size: 48rpx;
		z-index: 2;
		/* line-height: 20vh; */
		/* position: relative; */
		flex-direction: column;
		justify-content: center;
		box-shadow: 0px 1px 5px #b3d0ff;
	}
	
	.toDoHead-level{
		font-family: Anglia;
		font-weight: 600;
		color: #206e9e;
		font-size: 68rpx;
		position: absolute;
		margin-left: 45rpx;
		padding: 0rpx 20rpx 0px 20rpx;
		/* border-radius: 70rpx;
		border: 2rpx dotted #b1c2f1;
		box-shadow: 2rpx 3rpx 6rpx #6cb3ff;
		background: linear-gradient(to bottom right,#FFFFFF,rgba(220,234,255,100), rgba(238,239,255,250)); */
	}
	
	#app {
	    width: 100%;
	    height: 100%;
	    display: flex;
	    justify-content: center;
	    align-items: center;
	}
	
	.xcprogress {
		margin-left: 160rpx;
		margin-top: 40rpx;
	    width: 430rpx;
	    height: 40rpx;
	    background: #e5e5e5;
	    border-radius: 6px;
	    overflow: hidden;
	}
	
	.xcprogress-bar {
	    width: 0;
	    height: 100%;
	    display: flex;
	    justify-content: flex-end;
	    align-items: center;
	    background-color: cornflowerblue;
	    background-image: linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
	    background-size: 70rpx 70rpx;
	    transition: width .6s ease;
	    border-radius: 8rpx;
	    /* animation: xcprogress-bar-anim 2s linear infinite; */
	}
	
	.xcprogress-bar-value {
	    font-size: 28rpx;
	    /* font-weight: bold; */
		position: relative;
	    color: #206e9e;
	    margin-right: 15rpx;
		left: 160rpx;
	}
	.token{
		position: absolute;
		right: 30rpx;
	}
	.tokenCube{
		
		background-image: url(../static/tokenCube.png);
		background-size: cover;
		height: 90rpx;
		width: 90rpx;
		
		display: inline-block;
	}
	.tokenNumber{
		display: inline-block;
		position: relative;
		left: 45%;
		background-image: linear-gradient(#ff7873, #8dc5ff 60%);
		
		background-clip: text;
		/* color: #124a9e; */
		font-weight: 600;
		/* text-shadow: 1px 1px 5px #206e9e; */
		transform: translateX(-50%);
		top: 67rpx;
		/* right: 45rpx; */
		/* text-align: center; */
		font-size: 32rpx;
		/* top: 100rpx; */
		color: transparent;
		/* font-weight: 600; */
	}
	
	@keyframes xcprogress-bar-anim {
	    from {
	        background-position: 70rpx 0;
			animation: xcprogress-bar-anim ease;
	    }
	
	    to {
	        background-position: 0 0;
	    }
	}
</style>
