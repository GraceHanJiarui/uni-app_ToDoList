<template>
	<view class="content">计时开始
		<view class="timing">
			<view class="canva">
				<canvas canvas-id="progress_bg" class="progress_bg"></canvas>
				<canvas canvas-id="progress_active" class="progress_active"></canvas>
				<view class="progress_text">
					{{hour}}:{{this.min>9 ? min : '0'+min}}:{{this.sec>9 ? sec : '0'+sec}}
				</view>
			</view>
			<view class="normalPage" v-if="!showStopPage">
				<view @click="stopTiming">暂停</view>
				<view @click="giveUpTiming">放弃</view>
				<view @click="fighting">为自己加油</view> <!-- 播放加油小动画 -->
			</view>
		</view>
		<view class="stopPage" v-if="showStopPage">
			<view @click="continueTiming">继续！</view> <!-- 继续页面做大，下面放鼓励的话 -->
			<view @click="giveUpTiming">放弃</view>
		</view>
		<view v-if="showFinishPage"> <!-- 动画喝彩效果 -->
			<view @click="finishTiming">完成！</view> 
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wrpx: 0,
				hrpx: 0,
				hour: 0,
				min: 0,
				sec: 0,
				time: this.hour * 3600 + this.min * 60 + this.sec,
				mtime: (this.hour * 3600 + this.min * 60 + this.sec) * 1000,
				showStopPage:false,
				showFinishPage:false,
				startTiming:true,
				timer:null
			}
		},

		onLoad(t) {
			// this.wrpx=widthrate;
			// this.hrpx=heightrate;

			this.hour = t.hour;
			this.min = t.min;
			this.time = this.hour * 3600 + this.min * 60;
			this.mtime = (this.hour * 3600 + this.min * 60-1) * 1000
			this.token= this.hour*60 + this.min*1			console.log(this.time)
		},
		onReady: function() {
			this.drawBg()
		},
		methods: {
			drawBg(){
				console.log(this.wpx, this.time, "this.time", );
				var ctx = uni.createCanvasContext('progress_bg');
				ctx.setLineWidth(30*this.wpx);
				ctx.setStrokeStyle('#ffffff');
				ctx.setLineCap('square');
				ctx.beginPath();
				ctx.arc(550 * this.wpx / 2, 550 * this.wpx / 2, 550 * this.wpx / 2 - 30*this.wpx, 0, 2 * Math.PI, false);
				ctx.stroke()
				ctx.draw()
				console.log((this.time * 1000 - this.mtime) / this.time * 1000);
				var timer = setInterval(() => {
					
					// if(this.sec===10){
					// 	this.sec="0"+this.sec-1
					// 	console.log(this.sec)
					// }
					
					if(this.sec==0){
						if(this.min==0& this.hour!=0){
								this.min=59
								this.hour=this.hour-1
								this.sec=59
							}
						else if(this.min!=0){
							this.sec=59
							this.min=this.min-1
							console.log(this.sec,this.min)
						}
					}
					else{
						this.sec=this.sec-1
						console.log(this.sec,this.min)
					}
					
					var angle = 1.5 + 2 * ((this.time * 1000 - this.mtime) / (this.time * 1000))
					// console.log('ang', angle);
					this.mtime = this.mtime - 1000;
					if (angle <= 3.5) {
						var ctx1 = uni.createCanvasContext('progress_active');
						ctx1.setLineWidth(30*this.wpx);
						ctx1.setStrokeStyle('#98a2ff');
						ctx1.setLineCap('butt');
						ctx1.beginPath();
						ctx1.arc(550 * this.wpx / 2, 550 * this.wpx / 2, 550 * this.wpx / 2 - 30*this.wpx, 1.5 * Math.PI,
							angle * Math.PI, false);
						ctx1.stroke()
						ctx1.draw()
					} else {
						clearInterval(timer);
						this.showFinishPage=true
					}
				}, 1000)
				this.timer=timer
			},
			stopTiming(){
				clearInterval(this.timer);
				this.showStopPage=true;
			},
			giveUpTiming(){
				clearInterval(this.timer);
				this.startTiming=false;
				uni.navigateBack({
					animationType:'pop-out',
					delta: 1,
					// animationType:'zoom-fade-in'
				});
			},
			continueTiming(){
				this.drawBg();
				this.showStopPage=false;
			},
			fighting(){
				
			},
			finishTiming(){
				this.$store.dispatch('addTokenNumber',(Math.ceil((this.token)/30)*2))
				// this.tokenNumber+=(Math.ceil((this.token)/30)*2);
				console.log(this.tokenNumber)
				uni.navigateBack({
					delta: 1,
					animationType:'pop-out',
					success(){
						uni.$emit("clockTimeAdd")
					}
				});
			}
		}
	}
</script>

<style scoped>
	.content {
		height: 100vh;
		width: 100%;
		background-color: #d7edff;
	}

	.canva {
		height: 550rpx;
		width: 550rpx;
		/* background-color: #206E9E; */
		margin: 200rpx 100rpx;
		/* top: 140rpx; */
	}

	.canva .progress_active,
	.progress_bg {
		position: absolute;
		height: 550rpx;
		width: 550rpx;
	}
	.stopPage{
		position: absolute;
		/* top: 0; */
		width: 100%;
		z-index: 99;
	}
	.progress_text{
		position: absolute;
		width: 400rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 80rpx;
		text-align: center;
		
		left: 175rpx;
		top:475rpx;
		/* background-color: #007AFF; */
	}
</style>
