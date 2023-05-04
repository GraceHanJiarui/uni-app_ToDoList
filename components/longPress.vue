<template>
	<view class="labelBox" v-if="!this.et.todoFinished">
		<view style="color: rgba(250, 245, 207, 0.9);">
		<view v-show="!anim" v-if="et.importanceLevel & et.emergenceLevel" class="boxIE" @click="enterToDetailPage('center')" @longpress="longpress" @touchend="endTouch" :style="{boxShadow:(this.et.overdue? '1px 3px 5px #ffa6a6': '1px 3px 5px #a7c3ff')}">{{et.title}}</view>
		<view v-show="!anim" v-if="!et.importanceLevel & et.emergenceLevel" class="boxnIE" @click="enterToDetailPage('center')" @longpress="longpress" @touchend="endTouch" :style="{boxShadow:(this.et.overdue? '1px 3px 5px #ffa6a6': '1px 3px 5px #a7c3ff')}">{{et.title}}</view>
		<view v-show="!anim" v-if="et.importanceLevel & !et.emergenceLevel" class="boxInE" @click="enterToDetailPage('center')" @longpress="longpress" @touchend="endTouch" :style="{boxShadow:(this.et.overdue? '1px 3px 5px #ffa6a6': '1px 3px 5px #a7c3ff')}">{{et.title}}</view>
		<view v-show="!anim" v-if="!et.importanceLevel & !et.emergenceLevel" class="boxnInE" @click="enterToDetailPage('center')" @longpress="longpress" @touchend="endTouch" :style="{boxShadow:(this.et.overdue? '1px 3px 5px #ffa6a6': '1px 3px 5px #a7c3ff')}">{{et.title}}</view>
		</view>
		<view class="bubbleContainer" style="perspective: 100px;">
			<view :class="{'bubble anim1':anim}"></view>
			<view :class="{'bubble anim2':anim}"></view>
			<view :class="{'bubble anim3':anim}"></view>
			<view :class="{'bubble anim4':anim}"></view>
			<!-- <view :class="{'bubble1 anim5':anim}"></view> -->
		</view>
		<uni-popup ref="popupL" id="popuplong" type="center" background-color="#fff" @maskClick='transformTitleData'>
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
							<uni-datetime-picker v-model="et.single" @change="confirm" :hide-second="true">
								<uni-icons type="calendar" size="55rpx" color="#919ec8" style="position: relative; top: 6rpx;"></uni-icons>	
									<text class='emergenceSelect'>
									{{et.selectedYear}}-{{et.selectedMonth}}-{{et.selectedDate}}
									{{et.selectedHour}}{{et.selectedMin}}{{et.selectedSec}}</text>
								</uni-datetime-picker>
							</view>
							
							<label style="border: #c3cdd7 solid 1px; margin: -1px 0px -1px 0px; background-color: #f0f8fe;">
								<uni-icons type="star-filled" size="65rpx" :color="this.et.importanceLevel ? '#697b9e' : '#c9dfe0'" @click="selectImportance"></uni-icons>
							</label>
						</view>
						
						<!-- 分解任务项填写 -->
						<view class="inputBreakDownItemList">
							<breakDownListHead @addItem="addToDo" style="background-color: #c8dddd;"></breakDownListHead>
							<breakDownList :todos="et.todos" :checkToDo="checkToDo"></breakDownList>
						</view>
					</view>
				</view>
				
				<!-- 间隔空白 -->
				<view style="display: flex;flex: 0.5; border:#6688b3 solid;border-width: 1px 0px 1px 0px; background-color:#f7ffff">
					<!-- <span style="position: relative; background-color: #2C405A;max-height: 5px;min-height: 2px;: 10rpx;width: 540rpx; top:50%; transform: translateY(-50%);"></span> -->
				</view>
				
				<view class="concentrationTimeStat">
					已完成专注：25分钟
				</view>
				<!-- 定时器 -->
				<timer :valueT="this.et.valueT" :showIcon='true' @timeChange="timeChange" @stc="startTimeCounting"></timer>
							
				<!-- 备注 待添加icon、字数限制、换行功能 -->
				<input class="inputNote" type="text" placeholder="备注" v-model="et.comment"/>
				
				<!-- 删除本事项 -->
				<span style="position: absolute; height: 80rpx; width: 80rpx; margin: 10rpx; left: 0px; bottom: 0px;">
					<uni-icons type="trash" size="80rpx" color="#697b9e" @click="deleteItem"></uni-icons>
				</span>
				
				<!-- 添加闹钟 功能待完善！ -->
				<span style="position: absolute; height: 80rpx; width: 80rpx; margin: 10rpx; right: 0px; top: 0px;">
					<uni-icons type="notification-filled" size="80rpx" :color="alarm ? '#f5e2a1' : '#c7b882'" @click="addAlert" ></uni-icons>
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
		props:{
			et:{
				type:Object,
				default:{}
			}
		},
		name:"longPress",
		data() {
			return {
				// countDownStart: false,
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
				alarm:false
			}
		},
		mounted() {
			uni.$on("deleteToDo", this.deleteToDo)
			this.transformTitleData()
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
				// console.log(this);
			}
		},
		methods:{
		//短按展开，长按2.3秒完成本事项功能
		enterToDetailPage(type){
			// console.log("点按");
			this.type=type;
			this.$refs.popupL.open();
			// console.log(this.et.exp)
		},
		longpress(){
			this.ifLongTap = true;
			var _this = this;
			setTimeout(function(){
				_this.startTouch();
			},1300);
		},
		// 长按后的反应 包括改变经验值/增加代币/泡泡特效
		startTouch(){
			if(this.ifLongTap){
				// this.countDownStart=true;
				this.anim=true;
				uni.$emit('changeSliderValue',this.et.exp);
				if(this.et.overdue==false){
					this.$store.commit('ADDTOKENNUMBER',2*this.et.exp);
					console.log("this task 没超时")
				}
				else{
					this.$store.commit('ADDTOKENNUMBER',this.et.exp);
					console.log("this task 超时了")
				}
				this.$store.commit('ADDTASKNUMBER',1);
				// console.log(this.$store.state.tokenNumber)
				setTimeout(()=>{
					// this.$emit('itemComplete',this.et.id)
					this.et.todoFinished=true
				},1700);
				
			}
		},
		endTouch(){
			this.ifLongTap=false;
			// this.countDownStart=false;
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
		
		//删除本事项
		deleteItem(){
			// console.log("deleteItem"),
			this.$emit('itemComplete',this.et.id)
		},
		
		//添加提醒闹钟 功能待完善！！
		addAlert(){
			this.alarm=!this.alarm
		}
	},
	}
</script>

<style>
	.labelBox{
		display: flex;
		flex-wrap: wrap;
		/* color: rgba(250, 245, 207, 0.9); */
		/* color: #e1eeff; */
		/* color: #eaf0f0; */
	}
	
	.boxnIE{
		font-size: 34rpx;
		padding: 16rpx;
		border-radius: 5px;
		margin:15rpx 10rpx 3rpx 10rpx;
		background-color: #6e83a0;
		text-shadow: 1px 1px 5px #347df3;
	}
	.boxIE{
		font-size: 34rpx;
		padding: 16rpx;
		border-radius: 5px;
		margin:15rpx 10rpx 3rpx 10rpx;
		background-color: #4e70a0;
		text-shadow: 1px 1px 5px #347df3;
	}
	.boxnInE{
		font-size: 34rpx;
		padding: 16rpx;
		border-radius: 5px;
		margin:15rpx 10rpx 3rpx 10rpx;
		background-color: #adbede;
		text-shadow: 1px 1px 5px #347df3;
	}
	.boxInE{
		font-size: 34rpx;
		padding: 16rpx;
		border-radius: 5px;
		margin:15rpx 10rpx 3rpx 10rpx;
		background-color: #80a2d2;
		text-shadow: 1px 1px 5px #347df3;
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
		height: 900rpx;
		width: 540rpx;
		display: flex;
		flex-direction: column;
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
		background-color: #E6FFFF;
	}

	.inputNote{
		flex:2.85;
		background-color: #f7ffff;
		border-radius: 0 0 5px 5px;
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
