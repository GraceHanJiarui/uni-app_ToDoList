<template>
	<view>
		<!-- <view style="position: absolute; bottom: 15px ; left: 5px;"--> <!-- bottom:90px -->
		<view style="position: absolute; top: calc(50% + 100rpx) ; left: 50%; transform: translate(-50%,-50%);">
			<view class="routineIcon1" style="width: 70px; height: 70px; margin-right: 0px;" @click="openRoutinePage"></view>
			<!-- <uni-icons type="fire-filled" size="60px" color="#ff6060"></uni-icons> -->
		</view>
		<!-- <view ref="mask" style="position: absolute; top: 0px; z-index: 999; background-color: rgba(0, 0, 0, 0.3); width: 100%; height: 100%; display: none;" @click.self="maskClose">
			<view style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);height: 1000rpx;
		width: 600rpx; background-color: #fff; opacity: 1; border-radius: 5px;"></view>
		</view> -->
		<uni-popup ref="popup" id="popup" type="center" background-color="#fff9f9">
			<view style="height: 1000rpx; width: 600rpx; display: flex; flex-direction: column;" @touchstart.stop @touchend.stop @touchmove.stop>
				<view style="flex: 1; background-color: #fff3f3; border-radius: 10px 10px 0 0; font-size: 25px; 
				box-shadow: #ffbbbb 0px 3px 6px; display: flex; justify-content: center; align-items: center;">
					<!-- <view class="routineIcon"></view> -->
					<!-- <uni-icons type="fire-filled" size="50px" color="#ff6060"></uni-icons> -->
					<view v-if="this.$store.state.languages">日常任务</view>
					<view v-if="!this.$store.state.languages">Routine Tasks</view>
				</view>
				<scroll-view scroll-y="true" style="flex: 5;font-size: 18px; color: #6273ab; overflow: scroll;">
					<view class="dailyTaskTitle" v-if="this.$store.state.languages">每日任务</view>
					<view class="dailyTaskTitle" v-if="!this.$store.state.languages">Daily Tasks</view>
					<breakdown-routine-task v-for="every in tempBox" :key="every.id" :et="every" @deleteDailyItem="deleteDailyItem" @addCompleteTaskNum="addCompleteTaskNum"></breakdown-routine-task>
					<view style="width: 100%; height: 100rpx; background-color: #fff3f3; display: flex; align-items: center; justify-content: center;">
							<view style="position: absolute;left: 25%; " v-if="this.$store.state.languages">已完成({{completeTaskNum}}/{{totTaskNum}})</view>
							<view style="position: absolute;left: 15%; " v-if="!this.$store.state.languages">Completed({{completeTaskNum}}/{{totTaskNum}})</view>
							<view class="dailyRewards" :style="{backgroundColor:(this.dailyTasksComplete? 'antiquewhite' :  '')}"  @click="receiveDailyToken()">
								<!-- <view class="tokenRewards"></view> -->
								<image style="width: 80rpx; height: 80rpx;" mode="scaleToFill" src="@/static/tokenCube.png"></image>
								<view style="position: relative; left: 20rpx; font-size: 20px; margin-right: 10px;">X 10</view>
							</view>
						
					</view>
					<view class="dailyTaskTitle" v-if="this.$store.state.languages">每周任务</view>
					<view class="dailyTaskTitle" v-if="!this.$store.state.languages">Weekly Tasks</view>
					<!-- <breakdown-routine-task v-for="i in testboxWeekly" :key="i.id" :title="i.title" ></breakdown-routine-task> -->
					
					<view class="dailyTaskTitle" v-if="this.$store.state.languages">每月任务</view>
					<view class="dailyTaskTitle" v-if="!this.$store.state.languages">Monthly Tasks</view>
					<!-- <breakdown-routine-task v-for="i in testboxMonthly" :key="i.id" :title="i.title"></breakdown-routine-task> -->
			</scroll-view>
			</view>
		</uni-popup>
	<!-- </view> -->
	</view>
</template>

<script>
	import breakdownRoutineTask from "@/components/breakdownRoutineTask.vue"
	
	export default {
		data() {
			return{
				data:{},
				tempBox:[],
				lastDate:[],
				nowDay:new Date(),
				// thisDate:[nowDay.getDate(), nowDay.getMonth()+1, nowDay.getFullYear()],
				dailyTasksComplete:false,
				testboxDaily:[{id:1,title:'任务1'},{id:2,title:'任务2'}],
				testboxWeekly:[{id:3,title:'任务3'},{id:4,title:'任务4'}],
				testboxMonthly:[{id:5,title:'任务5'},{id:6,title:'任务6'},{id:7,title:'任务7'},{id:8,title:'任务8'}],
				totTaskNum:0,
				completeTaskNum:0
			}
		},
		mounted() {
			
		},
		watch:{
			tempBox:{
				deep:true,
				handler(value){
					this.$store.commit("CHANGEDAILYTODO",value)
				}
			},
		},
		methods:{
			openRoutinePage(){
				this.$refs.popup.open();
				uni.getStorage({
					key:'todoBoxDaily',
					success:(e)=>{
						this.tempBox=e.data;
						var i = 0;
						this.totTaskNum = this.tempBox.length;
						this.completeTaskNum = 0;
						while (i < this.totTaskNum){
							if (this.tempBox[i].todoFinished) {
								this.completeTaskNum += 1;
							}
							i += 1;
						}
						console.log(this.tempBox);
					},
					fail(e) {
						console.log(e,"fail1")
					}})
				uni.getStorage({
					key:'lastDate',
					success:(e)=>{
						this.lastDate=e.data;
					},
					fail(e) {
						console.log(e,"fail1")
					}})
					this.lastDate=uni.getStorageSync("lastDate")
					if(this.lastDate==[] || this.lastDate[0]!= this.nowDay.getDate() || this.lastDate[1]!=this.nowDay.getMonth()+1 || this.lastDate[2]!=this.nowDay.getFullYear()){
						console.log("this.lastDate", this.lastDate)
						console.log(this.nowDay.getMonth()+1)
						console.log(this.nowDay.getFullYear())
						for(var i = 0; i < this.tempBox.length; i++){
							console.log(this.tempBox[i])
							this.tempBox[i].todoFinished=false
						}
						this.$store.commit('CHANGELASTDATE', [this.nowDay.getDate(), this.nowDay.getMonth()+1, this.nowDay.getFullYear()])
					}
			},
			maskClose(){
				this.$refs.mask.$el.style.display='none';
			},
			arrangeData(data){
				console.log("收到每日数据",data);
				this.data=data;
				this.tempBox.unshift(data)
			},
			addCompleteTaskNum(){
				console.log("addCompleteTaskNum")
				this.completeTaskNum += 1;
			},
			receiveDailyToken(){
				if(this.dailyTasksComplete == false && this.totTaskNum == this.completeTaskNum && this.totTaskNum != 0){
					this.$store.commit('ADDTOKENNUMBER',10);
					this.dailyTasksComplete = true;
				}
			},
			deleteDailyItem(id){
				this.$store.commit('DELETEDAILYTODO', id)
				this.totTaskNum-=1;
				console.log("dellllll")
				uni.getStorage({
					key:'todoBoxDaily',
					success:(e)=>{
						this.tempBox=e.data;
					},
					fail(e) {
						console.log(e,"fail1")
					}})
			}
		},
		components:{
			breakdownRoutineTask,
		}
	}
</script>

<style>
	.routineIcon1{
		background-image: url('@/static/routineIcon1.png'); 
		width: 164rpx; 
		height: 164rpx; 
		margin-right: 23.4rpx;
		background-size: cover;
	}
	.routineIcon{
		background-image: url('@/static/routineIcon1.png'); 
		width: 164rpx; 
		height: 164rpx; 
		margin-right: 24.3rpx;
		background-size: cover;
	}
	.dailyTaskTitle{
		padding: 12rpx;
		background-color: ;
		border: #6273ab solid 1px;
		margin: 8px 3px 3px 3px;
	}
	.dailyRewards{
		position: absolute;
		left: 60%;
		width: 35%;
		display: flex;
		align-items: center;
		justify-content: center;
		/* height: 70rpx%; */
		border: antiquewhite solid 2px;
		border-radius: 10px;
	}
	.tokenRewards{
		left: 70rpx;
		margin-left: 10rpx;
		background-image: url('@/static/tokenCube.png');
		background-size: cover;
		height: 80rpx;
		width: 80rpx;
		display: inline-block;
	}
	.tokenRewardsText{
		right: 10%;
	}
</style>