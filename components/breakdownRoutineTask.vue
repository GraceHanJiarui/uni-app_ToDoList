<template>
	<view v-if="this.showPage">
		<view class="taskList" :class="et.todoFinished ? 'taskListFinished' : ''" @click="enterToDetailPage('center')">
			{{et.title}}
			<view class="dailyRewards">
				<view style="border: antiquewhite solid 2px;
			border-radius: 10px;" :style="{backgroundColor: 'antiquewhite'}" @click.stop.prevent="receiveDailyToken()">
					<!-- <image style="width: 60rpx; height: 60rpx;" mode="scaleToFill" src="@/static/tokenCube.png"></image> -->
					<view v-if="this.$store.state.languages" style="position: relative; text-align: center; font-size: 16px; margin: 0 10px 0px 10px; color: #4b789b;">完成</view>
					<view v-if="!this.$store.state.languages" style="position: relative; text-align: center; font-size: 14px; margin: 0 5px 0px 5px; color: #4b789b;">Completed</view>
					<!-- 删除本事项 -->
				</view>
				<view style="position: relative; font-weight: 600;" @click.prevent="deleteItemIndeed">
					<uni-icons type="trash" size="50rpx" color="#697b9e" ></uni-icons>
				</view>
			</view>
		<!-- 	<view >
				<image style="width: 60rpx; height: 60rpx; position: absolute; right: 25px; " mode="scaleToFill" src="@/static/tokenCube.png"></image>
			</view> -->
		</view>
		<uni-popup ref="popupL" id="popupdaily" type="center" background-color="#fff" @maskClick='transformTitleData'>
			<view class="detailPageR" @touchstart.stop @touchend.stop>
				
				<!-- 事件标题 待添加图标、字数限制 -->
				<input class="inputHeader" style="background-color: #fff9f9;" type="text" placeholder="主题" v-model="et.title"/>
			
				<view class="detailPageBody">
					<!-- 滑动经验选择器 待修改样式 -->
					<view class="ExpSlider" style="background-color: #fff0f0;">
						<slider-vertical :valueExp="this.et.exp" @changing="sliderChange"></slider-vertical>
					</view>
					
					<view class="detailPageBody1">
					<!-- <repeat-frequency @putTaskIntoBox="putTaskIntoBox"></repeat-frequency> -->
						
						<!-- 分解任务项填写 -->
						<view class="inputBreakDownItemList"  style="background-color: #fff9f9;">
							<breakDownListHead @addItem="addToDo" style="background-color: #f4e6d7;"></breakDownListHead>
							<breakDownList :todos="et.todosD" :checkToDo="checkToDo"></breakDownList>
						</view>
					</view>
				</view>
				
				<!-- 间隔空白 -->
				<view style="display: flex;flex: 0.5; border:#6688b3 solid;border-width: 1px 0px 1px 0px; background-color:#ffffff">
					<!-- <span style="position: relative; background-color: #2C405A;max-height: 5px;min-height: 2px;: 10rpx;width: 540rpx; top:50%; transform: translateY(-50%);"></span> -->
				</view>
				
				<view class="concentrationTimeStat" v-if="this.$store.state.languages">
					已完成专注：25分钟
				</view>
				<view class="concentrationTimeStat" v-if="!this.$store.state.languages">
					concentrated for: 25 min
				</view>
				<!-- 定时器 -->
				<timer :valueT="this.et.valueT" :showIcon='true' showPage=true @timeChange="timeChange" @stc="startTimeCounting"></timer>
							
				<!-- 备注 待添加icon、字数限制、换行功能 -->
				<input class="inputNote" style="background-color: #fff9f9;" type="text" placeholder="备注" v-model="et.comment"/>
				
				<!-- 删除本事项 -->
				<span style="position: absolute; height: 80rpx; width: 80rpx; margin: 10rpx; left: 0px; bottom: 0px;">
					<uni-icons type="trash" size="80rpx" color="#697b9e" @click="deleteItemIndeed"></uni-icons>
				</span>
				
				<!-- 添加闹钟 功能待完善！ -->
				<span style="position: absolute; height: 80rpx; width: 80rpx; margin: 10rpx; right: 0px; top: 0px;">
					<uni-icons type="notification-filled" size="80rpx" color="#c7b882" @click="addAlert"></uni-icons>
				</span>
		
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import breakDownListHead from "@/components/cardBreakdown/detailPageBreakDown/breakDownListHeader"
	import breakDownList from "@/components/cardBreakdown/detailPageBreakDown/breakDownList"
	import sliderVertical from "./cardBreakdown/sliderVertical"
	import timer from "./cardBreakdown/timer"
	export default {
		
		props:['et'],
		name:"breakdownRoutineTask",
		data() {
			return {
				showPage:true
			};
		},
		mounted() {
			console.log(this.et.title,this.et,"this.et")
		},
		methods:{
			//短按展开，长按2.3秒完成本事项功能
			enterToDetailPage(type){
				console.log("点按");
				this.type=type;
				if(this.et.todoFinished==false){
				this.$refs.popupL.open();
				}
			},
			receiveDailyToken(){
				if(this.et.todoFinished==false){
				uni.$emit('changeSliderValue',this.et.exp);
				this.$emit('addCompleteTaskNum');
				this.$store.commit('ADDTOKENNUMBER',this.et.exp);
				// 加代币动画！！！
				this.anim=true;
				this.$store.commit('ADDTASKNUMBER',1);
				this.et.todoFinished=true
				
				// 把文字划掉，把完成按钮禁用
				}
			},
			
			//若emergence或importance值发生改变则从本box中删除此元素并找到对应box重新添加该对象 功能待完善！！
			transformTitleData(){
				//以后再改 当标题为空时警告标题不能为空
				if(!this.et.title.trim()) return
				if(this.yearNow===this.et.selectedYear & this.monthNow===this.et.selectedMonth & this.et.selectedDate<this.dateNow | 
				this.yearNow>this.et.selectedYear | this.yearNow===this.et.selectedYear & this.monthNow>this.et.selectedMonth){
					this.et.overdue=true
					this.et.emergenceLevel=true
					// console.log("overdue task")
				}
				if(this.yearNow===this.et.selectedYear & this.monthNow===this.et.selectedMonth & (this.et.selectedDate-this.dateNow)<3){
					this.et.emergenceLevel=true
					// this.et.overdue=false
				}
				else{
					this.et.emergenceLevel=false
					// this.et.overdue=false
				}
				
				//若emergence或importance值发生改变则从本box中删除此元素并找到对应box重新添加该对象
				const todoTitle=this.et;
				this.deleteItem();
				if(!todoTitle.importanceLevel & todoTitle.emergenceLevel){
					this.$emit("TitleBox1",todoTitle)
				}
				if(todoTitle.importanceLevel & todoTitle.emergenceLevel){
					this.$emit("TitleBox2",todoTitle)
				}
				if(!todoTitle.importanceLevel & !todoTitle.emergenceLevel){
					this.$emit("TitleBox3",todoTitle)
				}
				if(todoTitle.importanceLevel & !todoTitle.emergenceLevel){
					this.$emit("TitleBox4",todoTitle)
				}
				
			},
			
			//滑动经验选择器
			sliderChange(val){
				this.et.exp=val
			},
			
			//紧急/重要选择器（日历+星星）
			//待从addButtonPage中copy这段代码完善功能
			selectImportance(){
				this.et.importanceLevel=!this.et.importanceLevel
			},
			selectEmergency(){
				this.$refs.calendar.open()
			},
			confirm(e){
				// console.log(e,"eeeeee")
				this.et.single=e
				this.et.selectedDate=Number(e.slice(8,10))
				this.et.selectedMonth=Number(e.slice(5,7))
				this.et.selectedYear=Number(e.slice(0,4))
				if(e.length>=12 & (e.slice(11,14)!="00:" | e.slice(14,17)!="00")){
					this.et.selectedHour=e.slice(11,14)
					this.et.selectedMin=e.slice(14,17)
				}
				else{
					this.et.selectedHour=''
					this.et.selectedMin=''
				}
			},
			
			//分解任务项的一系列功能
			addToDo(x){
				this.todos.unshift(x)
			},
			checkToDo(id){
				this.todos.forEach((todoObj)=>{
					if(todoObj.id===id) todoObj.done = !todoObj.done
					console.log(todoObj.done)
				})
			},
			
			//待加分解任务项的delete图标以及联立此功能
			deleteToDo(e){
				for (var i = 0; i < this.todos.length; i++) {
					if(this.todos[i].id==e.toDoId){
						console.log(this.todos[i])
						this.todos.splice(i,i+1)
					}}
					// console.log(this.todos)
					// this.todos=this.todos.filter((x)=>{
					// 	return x.id!==e.toDoId
					// })
					// }
				// this.todos.remove()
				
			},
			timeChange(valueT){
				this.et.valueT=valueT
			},
			
			//导航至计时页
			startTimeCounting(){
				uni.navigateTo({
					url:"timing?hour="+this.et.valueT[0]+"&min="+this.et.valueT[1]+"&times="+this.et.valueT[2]+1,
					animationType:"zoom-fade-out",
					animationDuration:400,
					fail(error){
						console.log(error)
					}
				})
			},
			
			//修改本事项
			deleteItem(){
				console.log("changeItem/reload")
				// this.$emit('deleteDailyItem',this.et.id)
			},
			
			//删除本事项
			deleteItemIndeed(){
				console.log("deleteItem"),
				this.$emit('deleteDailyItem',this.et.id)
			},
			
			//添加提醒闹钟 功能待完善！！
			addAlert(){
				console.log("addAlert")
			}
		},
		components:{
			breakDownListHead,
			breakDownList,
			sliderVertical,
			timer
		},
	}
</script>

<style>
	.taskList{
		color: #4b789b;
		font-weight: 500;
		/* padding-left: 20px; */
		border: 1px solid blanchedalmond;
		margin: 5px;
		padding: 15rpx;
		padding-left: 25rpx;
	}
	.taskListFinished{
		background-image: linear-gradient(to left,  #9dd5ff, #ff9793);
		background-repeat: no-repeat;
		background-size: 0% 20%;
		background-position: 6% 50%;
		animation: crossline 0.7s ease-in-out forwards;
	}
	.detailPageR{
		height: 900rpx;
		width: 540rpx;
		display: flex;
		flex-direction: column;
		text-align: center;
		
	}
		.inputHeader{
			background-color: #f7ffff;
			border-top-right-radius: 5px;
			border-top-left-radius: 5px;
			color: #b6baba;
			flex: 2.5;
			border-bottom: #6688b3 solid 1px;
		}
		.detailPageBody{
			display: flex;
			flex:7;
			
		}
		.ExpSlider{
			background-color: #eef9fd;
			border: #ffc2c2 solid 1px;
			border-top: 1px solid #c3cdd7;
			margin: -1px 0px -1px 0px;
			flex: 1;
			justify-content: center;
			align-items: center;
		}
		.dailyRewards{
			position: absolute;
			left: 70%;
			width: 30%;
			display: flex;
			
			transform: translateY(-90%);
			align-items: center;
			justify-content: center;
			/* height: 70rpx%; */
		}
		
		.detailPageBody1{
			display: flex;
			flex-direction: column;
			flex:4.4;
			background-color: #ffffff;
		}
		
		.inputImportanceEmergence{
			display: flex;
			flex-direction: row;
			align-content: center;
			justify-content: center;
		}
	/* 	.inputImportanceEmergence label{
			flex:1;
			background-color: #f0f8fe;
			border: 1px solid #c3cdd7;
			padding: 3px;
			border-radius: 10px;
			text-align: center;
		} */
		.dateSelect {
			background-color: #f0f8fe;
			border: 1px solid #c3cdd7;
			margin: -1px;
			flex: 2;
		}
		
		.emergenceSelect{
			/* flex:1; */
			text-align: center;
			font-size: 36rpx;
			padding:10rpx;
		}
		.inputBreakDownItemList{
			flex: 4;
		}
		.concentrationTimeStat{
			font-size: 20rpx;
			padding:10rpx 0rpx 0rpx 0rpx;
			background-color: #ffe6ee;
		}
	
		.inputNote{
			flex:2.85;
			background-color: #f7ffff;
			border-radius: 0 0 5px 5px;
		}
		
		@keyframes crossline {
			to{
				background-size: 65% 6%;
			}
		}
	
</style>