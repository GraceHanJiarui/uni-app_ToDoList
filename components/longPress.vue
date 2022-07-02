<template>
	<view>
	<view class="labelBox">
		<view v-show="!anim" v-if="et.importanceLevel & et.emergenceLevel" class="boxIE" @click="enterToDetailPage('center')" @longpress="longpress" @touchend="endTouch" style="text-shadow: 1px 1px 5px #347df3;">{{et.title}}</view>
		<view v-show="!anim" v-if="!et.importanceLevel & et.emergenceLevel" class="boxnIE" @click="enterToDetailPage('center')" @longpress="longpress" @touchend="endTouch" style="text-shadow: 1px 1px 5px #347df3;">{{et.title}}</view>
		<view v-show="!anim" v-if="et.importanceLevel & !et.emergenceLevel" class="boxInE" @click="enterToDetailPage('center')" @longpress="longpress" @touchend="endTouch" style="text-shadow: 1px 1px 5px #347df3;">{{et.title}}</view>
		<view v-show="!anim" v-if="!et.importanceLevel & !et.emergenceLevel" class="boxnInE" @click="enterToDetailPage('center')" @longpress="longpress" @touchend="endTouch" style="text-shadow: 1px 1px 5px #347df3;">{{et.title}}</view>
		<view class="bubbleContainer" style="perspective: 100px;">
			<view :class="{'bubble anim1':anim}"></view>
			<view :class="{'bubble anim2':anim}"></view>
			<view :class="{'bubble anim3':anim}"></view>
			<view :class="{'bubble anim4':anim}"></view>
			<!-- <view :class="{'bubble1 anim5':anim}"></view> -->
		</view>
		<uni-popup ref="popup" id="popup" type="center" background-color="#fff" @maskClick='transformTitleData'>
			<view class="detailPage" @touchstart.stop @touchend.stop>
				
				<!-- 事件标题 待添加图标、字数限制 -->
				<input class="inputHeader" type="text" placeholder="主题" v-model="et.title"/>
	
				<view class="detailPageBody">
					<!-- 滑动经验选择器 待修改样式 -->
					<view class="ExpSlider">
						<slider-vertical :valueExp="this.et.exp" @changing="sliderChange"></slider-vertical>
					</view>
					
					<view class="detailPageBody1">
						<!-- 紧急/重要选择器（日历+星星） -->
						<view class="inputImportanceEmergence">
							<view class="dateSelect">
							<uni-datetime-picker v-model="et.single" @change="confirm">
								<uni-icons type="calendar" size="55rpx" color="#919ec8" style="position: relative; top: 6rpx;"></uni-icons>	
									<text class='emergenceSelect'>
									{{et.selectedYear}}-{{et.selectedMonth}}-{{et.selectedDate}}</text>
							</uni-datetime-picker>
							</view>
							
							<label>
								<uni-icons type="star-filled" size="60rpx" :color="this.et.importanceLevel ? '#697b9e' : '#c9dfe0'" @click="selectImportance"></uni-icons>
							</label>
						</view>
						
						<!-- 分解任务项填写 -->
						<view class="inputBreakDownItemList">
							<breakDownListHead @addItem="addToDo"></breakDownListHead>
							<breakDownList :todos="todos" :checkToDo="checkToDo" :deleteToDo="deleteToDo"></breakDownList>
						</view>

						<view class="concentrationTimeStat">
							已完成专注：25分钟
						</view>
						
						<!-- 定时器 -->
						<timer :valueT="this.et.valueT" @timeChange="timeChange"></timer>
						<uni-icons type="right" size="60rpx" color="#919ec8" @click="startTimeCounting"></uni-icons>
					</view>
				</view>
				
				<!-- 备注 待添加icon、字数限制、换行功能 -->
				<input class="inputNote" type="text" placeholder="备注" v-model="et.comment"/>
				
				<!-- 删除本事项 -->
				<span style="position: absolute; height: 80rpx; width: 80rpx; margin: 10rpx; left: 0px; bottom: 0px;">
					<uni-icons type="trash" size="80rpx" color="#697b9e" @click="deleteItem"></uni-icons>
				</span>
				
				<!-- 添加闹钟 功能待完善！ -->
				<span style="position: absolute; height: 80rpx; width: 80rpx; margin: 10rpx; right: 0px; top: 0px;">
					<uni-icons type="notification-filled" size="80rpx" color="#c7b882" @click="addAlert"></uni-icons>
				</span>

			</view>
		</uni-popup>
	</view>
	</view>
</template>

<script>
	import breakDownListHead from "@/components/cardBreakdown/detailPageBreakDown/breakDownListHeader"
	import breakDownList from "@/components/cardBreakdown/detailPageBreakDown/breakDownList"
	import sliderVertical from "./cardBreakdown/sliderVertical"
	import timer from "./cardBreakdown/timer"
	
	export default {
		props:{
			et:{
				type:Object,
				default:{}
			}
			},
		data() {
			return {
				countDownStart: false,
				anim:false,
				ifLongTap: false,
				single:this.et.single,
				valueT:this.et.valueT,
				todos:this.et.todos,
				valueOfExp:this.et.exp,
				selectedDate:this.et.selectedDate,
				selectedMonth:this.et.selectedMonth,
				selectedYear:this.et.selectedYear,
				yearNow: new Date().getFullYear(),
				monthNow: new Date().getMonth()+1,
				dateNow: new Date().getDate(),
			}
		},
		components:{
			breakDownListHead,
			breakDownList,
			sliderVertical,
			timer
		},
		watch:{
			et:function(newVal,oldVal){
				this.formData=newVal;
				console.log(this);
			}
		},
		methods:{
		//短按展开，长按2.3秒完成本事项功能
		enterToDetailPage(type){
			console.log("点按");
			this.type=type;
			this.$refs.popup.open();
			console.log(this.et.exp)
		},
		longpress(){
			this.ifLongTap = true;
			var _this = this;
			setTimeout(function(){
				_this.startTouch();
			},1300);
		},
		startTouch(){
			if(this.ifLongTap){
				this.countDownStart=true;
				this.anim=true;
				uni.$emit('changeSliderValue',this.et.exp);
				setTimeout(()=>{
					this.$emit('itemComplete',this.et.id)
				},1700);
				
			}
		},
		endTouch(){
			this.ifLongTap=false;
			this.countDownStart=false;
		},
		
		//若emergence或importance值发生改变则从本box中删除此元素并找到对应box重新添加该对象 功能待完善！！
		transformTitleData(){
			//以后再改 当标题为空时警告标题不能为空
			if(!this.et.title.trim()) return
			if(this.yearNow===this.et.selectedYear & this.monthNow===this.et.selectedMonth & (this.et.selectedDate-this.dateNow)<3){
				this.et.emergenceLevel=true
			}
			else{
				this.et.emergenceLevel=false
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
			console.log(e)
			this.et.single=e
			this.et.selectedDate=Number(e.slice(8,10))
			this.et.selectedMonth=Number(e.slice(5,7))
			if(e.length>12){
				this.et.selectedHour=e.slice(11,14)
				this.et.selectedMin=e.slice(14,17)
				this.et.selectedSec=e.slice(17,20)
			}
			else{
				this.et.selectedHour=''
				this.et.selectedMin=''
				this.et.selectedSec=''
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
		deleteToDo(id){
			console.log(id)
			this.todos=this.todos.filter((todo)=>{	
				return todo.id!==id
			})
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
		
		//删除本事项
		deleteItem(){
			console.log("deleteItem"),
			this.$emit('itemComplete',this.et.id)
		},
		
		//添加提醒闹钟 功能待完善！！
		addAlert(){
			console.log("addAlert")
		}
	},
	}
</script>

<style>
	.labelBox{
		display: flex;
		flex-wrap: wrap;
	}
	
	.boxnIE{
		font-size: 34rpx;
		padding: 16rpx;
		border-radius: 5px;
		margin:15rpx 10rpx 3rpx 10rpx;
		background-color: #6e83a0;
		box-shadow: 1px 3px 5px #a7c3ff;
	}
	.boxIE{
		font-size: 34rpx;
		padding: 16rpx;
		border-radius: 5px;
		margin:15rpx 10rpx 3rpx 10rpx;
		background-color: #4e70a0;
		box-shadow: 1px 3px 5px #a7c3ff;
	}
	.boxnInE{
		font-size: 34rpx;
		padding: 16rpx;
		border-radius: 5px;
		margin:15rpx 10rpx 3rpx 10rpx;
		background-color: #e1eeff;
		box-shadow: 1px 3px 5px #a7c3ff;
	}
	.boxInE{
		font-size: 34rpx;
		padding: 16rpx;
		border-radius: 5px;
		margin:15rpx 10rpx 3rpx 10rpx;
		background-color: #80a2d2;
		box-shadow: 1px 3px 5px #a7c3ff;
	}
	.bubbleContainer{
		height: 17px;
		width: 17px;
		position: absolute;
	}
	.bubble{
		width: 100%;
		height: 100%;
		background: radial-gradient(circle at 75% 30%, #fff, 2px,#7cb3d5 8%, #edf2ff 60%, #7cb3d5 100%);
		border-radius: 50%;
		box-shadow: inset 0 0 2px #fff,
		inset 1px 0 2px #e1f7fd,
		inset 5px 0 4px #e2edf3,
		inset -2px -5px 7px #d7f4f9,
		inset 0 4px 8px #f9f6de,
		0 0 10px #cacbff;
		
	}
	.anim1{
		animation: bubble1 1.4s ease-in-out forwards;
	}
	.anim2{
		animation: bubble2 1s ease-in-out forwards;
	}
	.anim3{
		animation: bubble3 1.7s ease-in-out forwards;
	}
	.anim4{
		animation: bubble4 1.7s ease-in-out forwards;
	}
	.detailPage{
		height: 930rpx;
		width: 540rpx;
		display: flex;
		flex-direction: column;
	}
	.inputHeader{
		background-color: #f7ffff;
		border-radius: 5px;
		/* border-top: 1px solid #4b7a81;
		border-left: 1px solid #4b7a81;
		border-right: 1px solid #4b7a81; */
		color: #b6baba;
		flex:2
	}
	.detailPageBody{
		display: flex;
		flex:8;
		
	}
	.ExpSlider{
		background-color: #eef9fd;
		flex: 1;
		justify-content: center;
		align-items: center;
	}
	.detailPageBody1{
		display: flex;
		flex-direction: column;
		flex:4.4;
	}
	
	.inputImportanceEmergence{
		display: flex;
		flex-direction: row;
		/* align-content: center; */
		justify-content: center;
		/* padding:10rpx; */
		background-color: #f0f8fe;
		border: 1px solid #c3cdd7;
	}
/* 	.inputImportanceEmergence label{
		flex:1;
		background-color: #f0f8fe;
		border: 1px solid #c3cdd7;
		padding: 3px;
		border-radius: 10px;
		text-align: center;
	} */

	.emergenceSelect{
		/* flex:1; */
		text-align: center;
		font-size: 36rpx;
		padding:10rpx;
	}
	.inputBreakDownItemList{
		flex:2;
		border:1px dashed #2C405A;
		margin-right: 2px;
		border-radius: 10px;
	}
	.concentrationTimeStat{
		font-size: 20rpx;
		padding:10rpx 0rpx 0rpx 0rpx;
		background-color: #E6FFFF;
	}

	.item {
		height: 20rpx;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
	.inputNote{
		flex:2.85;
		background-color: #fff;
		border-radius: 0 0 5px 5px;
	}
	.finalButton{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.finalButton view{
		border-radius: 5px;
		padding: 5px;
		padding-left: 43px;
		padding-right: 43px;
		border: 1px solid #6688b3;
		margin-bottom: 10px;
	}
	
	@keyframes bubble1{
		from{
			transform: translate3d(0,0,0);
		}
		to{
			transform: translate3d(30px,-40px,-50px);
			opacity: 0;
		}
	}
	@keyframes bubble2{
		from{
			transform: translate3d(20px,10px,-150px);
		}
		to{
			transform: translate3d(20px,-50px,-200px);
			opacity: 0;
		}
	}
	/* 这个结束位置可以做装饰 */
	@keyframes bubble3{
		from{
			transform: translate3d(20px,5px,-130px);
		}
		to{
			transform: translate3d(-10px,-10px,-100px);
			opacity: 0;
		}
	}
	@keyframes bubble4{
		from{
			transform: translate3d(0px,10px,-30px);
			color: #ff92cc;
		}
		to{
			transform: translate3d(80px,-10px,-200px);
			opacity: 0;
		}
	}
</style>
