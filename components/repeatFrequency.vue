<template>
	<view style="display: flex;flex-direction:row; justify-content:space-around">
		<view v-show="!countDownStart" class="daily" :style="{color:(this.dailyClicked? '#ffa6a6': ''), backgroundColor:(this.dailyClicked? '#fff1f1': ''), borderColor:(this.dailyClicked? '#ffa6a6': '')}"
		@touchstart="longpress" @click="setDaily" @touchend="endTouch">{{daily}}</view>
		<view v-if="!Ispickend & countDownStart">
			<picker-view style="position: absolute; height: 150rpx; width: 200rpx; font-size: 36rpx; background-color: #e8f9d0; left: 30%;
		transform:translate(-50%,-50%);"
		:indicator-style="indicatorStyle" :value="valueD" @pickstart="pickstart" @change="bindChange" @pickend="pickend" class="picker-view">
				<picker-view-column>
					<view class="item" v-for="(item,index) in days" :key="index">每{{item}}日</view>
				</picker-view-column>
			</picker-view>
		</view>
		<view class="weekly" @click="setWeekly">weekly</view>
		<view class="monthly"  @click="setMonthly">
			<uni-datetime-picker
			v-model="datetimerange"
			type="daterange"
			start="2022-7-20"
			end="2032-7-21">monthly
			</uni-datetime-picker>
		</view>
	</view>
</template>

<script>
	export default {
		name:"repeatFrequency",
		data() {
			const days = []
			for (let i = 1; i <= 7; i++) {
				days.push(i)
			}
			return {
				range: ['2021-02-1', '2021-3-28'],
				datetimerange: ["2022-07-20", "2021-07-21"],
				single:'single',
				daily:"每日",
				Ispickend:true,
				valueD:[1],
				days,
				dailyClicked:true,
				ifLongTap:false,
				countDownStart:false,
				indicatorStyle: `height: 24px;`,
				xingqi:["周一","周二","周三","周四","周五","周六","周日"]
			};
		},
		methods:{
			longpress(){
				this.ifLongTap = true;
				var _this = this;
				console.log("longpress start")
				setTimeout(function(){
					_this.startTouch();
				},1000);
			},
			startTouch(){
				if(this.ifLongTap){
					this.countDownStart=true;
					this.setDailyLongPress()
				}
			},
			endTouch(){
				console.log("end touch")
				this.ifLongTap=false;
				this.countDownStart=false;
			},
			
			setDaily(){
				this.dailyClicked=!this.dailyClicked
				this.$emit("putTaskIntoBox",1)
			},
			setDailyLongPress(){
				console.log("long")
				this.Ispickend=false
			},
			pickstart(){
				console.log("lopickstartng")
			},
			pickend(){
				console.log("pick end")
				this.Ispickend=true
			},
			bindChange: function (e) {
				const val = e.detail.value
				console.log(val)
				// this.daily = this.days[val[2]]
			},
			setWeekly(){
				this.$emit("putTaskIntoBox",2)
			},
			setMonthly(){
				this.$emit("putTaskIntoBox",3)
			},
			confirm() {
				console.log("confirm")
			}
		}
	}
</script>

<style>
	.daily{
		border: 1px solid #000;
		flex: 1;
		border-radius: 3px;
		padding: 10rpx;
	}
	.weekly{
		border: 1px solid #000;
		flex: 1;
		border-radius: 3px;
		padding: 10rpx;
	}
	.monthly{
		border: 1px solid #000;
		flex: 1;
		border-radius: 3px;
		padding: 10rpx;
	}
</style>