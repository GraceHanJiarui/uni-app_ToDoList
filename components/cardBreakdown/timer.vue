<template>
	<view class="concentrationTime" :style="{backgroundColor:(showPage? '#fff0f0': '#E6FFFF')}">
		<!-- 时长选择 -->
		<picker-view style=" position: absolute; bottom:150px; height: 150rpx; width: 400rpx; font-size: 36rpx; background-color: #e8f9d0; left: 50%;
		transform:translateX(-50%);" v-if="visible" :indicator-style="indicatorStyle" :value="valueTt" @change="bindTimeChange" class="picker-view">
			<picker-view-column>
				<view class="item" v-for="(item,index) in hour" :key="index">{{item}}hour</view>
			</picker-view-column>
				
			<picker-view-column>
				<view class="item" v-for="(item,index) in min" :key="index">{{item}}min</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item,index) in times" :key="index">{{item}}次</view>
			</picker-view-column>
		</picker-view>
		<!-- 定时显示栏 -->
		<view class="dateSelect" :style="{backgroundColor:(showPage? '#fef3ed': '#f0f8fe')}" @click="timeSelector">
			<uni-icons type="compose" size="55rpx" :color="(showPage? '#dda7a3': '#919ec8')" style="position: relative; top: 6rpx; "></uni-icons>
			<!-- <text style="border: 1px solid #000000; height: 40rpx; font-size: 20rpx; flex: 3; top: 6rpx;">专注时间：</text> -->
			
			<text style=" height: 40rpx; font-size: 36rpx; ">{{valueTt[0]}}hour{{valueTt[1]}}min  - {{valueTt[2]+1}}次</text>
			<!-- <picker  mode="time" :value="time" start="00:00" end="24:00" @change="bindTimeChange">
			
			</picker> -->
			<span style="position: absolute;">
				<uni-icons v-if="showIcon" type="right" size="60rpx" color="#919ec8" @click="startTimeCounting"></uni-icons>
			</span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const hour=[]
			const min=[]
			const times=[]
			for (let i = 0; i <= 5; i++) {
				hour.push(i)
			}
			for (let i = 0; i <= 59; i++) {
				min.push(i)
			}
			for (let i = 1; i <= 6; i++) {
				times.push(i)
			}
			return {
				hour,
				min,
				times,
				visible: false,
				valueTt: this.valueT,
				indicatorStyle: `height: 24px;`,
			}
		},
		props:['valueT','showIcon','showPage'],
		methods:{
			//定时器设置功能
			//value对应的值需要改对并传值！！
			timeSelector(){
				this.visible=!this.visible;
			},
			bindTimeChange: function(e) {
				console.log(e.detail.value);
				this.valueTt=[e.detail.value[0],e.detail.value[1],e.detail.value[2]]
				this.$emit("timeChange",this.valueTt)
			},
			//导航至计时页
			startTimeCounting(){
				this.$emit('stc')
			},
		}
	}
</script>

<style scoped>
	.concentrationTime{
		/* flex:1; */
		display: flex;
		align-items:center;
		font-size: 40rpx;
		padding:10rpx;
	}
	.dateSelect{
		flex:5;
		background-color: #f0f8fe;
		border: 1px solid #c3cdd7;
	}
	
	.picker-view {
		width: 150rpx;
		height: 60rpx;
		margin-top: 20rpx;
	}
	.item {
		height: 20px;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
</style>