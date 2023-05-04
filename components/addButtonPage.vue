<template>
	<view class="labelBox">
		<view class="addButton" @click="enterToDetailPage('center')"></view>
		<uni-popup ref="popupA" id="popup" type="center" background-color="transparent" @maskClick='transformTitleData'>
			<view class='detailPage' :class=" showPage ? '': 'componentRotate'" @touchstart.stop @touchend.stop>
				<changer @changePage='showPageChange'></changer><!-- v-show="showPage" -->
				<!-- 事件标题 待添加图标、字数限制 -->
				<input class="inputHeader" type="text" placeholder="主题" v-model="inputTitle" />

				<view class="detailPageBody">
					<!-- 滑动经验选择器 改高度数据-->
					<view class="ExpSlider">
						<slider-vertical :valueExp="valueOfExp" @changing="sliderChange"></slider-vertical>
					</view>

					<view class="detailPageBody1">
						<!-- 紧急/重要选择器（日历+星星） -->
						<view class="inputImportanceEmergence">
							<view class="dateSelect">
								<uni-datetime-picker v-model="single" @change="confirm" :hide-second="true">
									<uni-icons type="calendar" size="55rpx" color="#919ec8"
										style="position: relative; top: 6rpx;"></uni-icons>
									<text class='emergenceSelect'>
										{{selectedYear}}-{{selectedMonth}}-{{selectedDate}}
										{{selectedHour}}{{selectedMin}}{{selectedSec}}</text>
								</uni-datetime-picker>
							</view>
							
							<label style="border: #c3cdd7 solid 1px; margin: -1px 0px -1px 0px; background-color: #f0f8fe;">
								<uni-icons type="star-filled" size="65rpx"
									:color="this.importance ? '#697b9e' : '#c9dfe0'" @click="selectImportance">
								</uni-icons>
							</label>
						</view>
						
						
						<!-- 分解任务项填写 -->
						<view class="inputBreakDownItemList">
							<breakDownListHead @addItem="addToDo" style="background-color: #c8dddd;"></breakDownListHead>
							<breakDownList :todos="todos" :checkToDo="checkToDo" :deleteToDo="deleteToDo">
							</breakDownList>
						</view>						
					</view>
				</view>
				<!-- 间隔空白 -->
				<view style="display: flex;flex: 0.5; border:#6688b3 solid;border-width: 1px 0px 1px 0px; background-color:#ffffff">
					<!-- <span style="position: relative; background-color: #2C405A;max-height: 5px;min-height: 2px;: 10rpx;width: 540rpx; top:50%; transform: translateY(-50%);"></span> -->
				</view>
				
				<view class="concentrationTimeStat">
					番茄钟计时
				</view>
				<!-- 定时器 -->
				<timer :valueT="valueT" :showIcon='false' @timeChange="timeChange"></timer>
				
				<!-- 备注 待添加icon、字数限制、换行功能 -->
				<input class="inputNote" type="text" placeholder="备注" v-model="inputComment" />

					<!-- 添加闹钟 功能待完善！ -->
					<span style="position: absolute; height: 80rpx; width: 80rpx; margin: 10rpx; right: 0px; top: 0px;">
						<uni-icons type="notification-filled" size="80rpx" color="#c7b882" @click="addAlert"></uni-icons>
					</span>
				</view>
			
			
			<view class='detailPageR' v-if="addButtonPressed || !showPage" :class=" this.showPage ? 'cROrigin' : 'componentRotateR'" @touchstart.stop @touchend.stop>
					<changerR @changePage='showPageChange'></changerR><!-- v-show="showPage" -->
					<!-- 事件标题 待添加图标、字数限制 -->
					<input class="inputHeader" style="background-color: #fff9f9;" type="text" placeholder="主题" v-model="inputTitle" />
			
					<view class="detailPageBody" >
						<!-- 滑动经验选择器 改高度数据-->
						<view class="ExpSlider" style="background-color: #fff0f0;">
							<slider-vertical :valueExp="valueOfExp" @changing="sliderChange"></slider-vertical>
						</view>
			
						<view class="detailPageBody1">
							<repeat-frequency @putTaskIntoBox="putTaskIntoBox"></repeat-frequency>
														
							<!-- 分解任务项填写 -->
							<view class="inputBreakDownItemList" style="background-color: #fff9f9;">
								<breakDownListHead @addItem="addToDoD" style="background-color: #f4e6d7;"></breakDownListHead>
								<breakDownList :todos="todosD" :checkToDo="checkToDoD" :deleteToDo="deleteToDoD">
								</breakDownList>
							</view>						
						</view>
					</view>
					<!-- 间隔空白 -->
					<view style="display: flex;flex: 0.5; border:#6688b3 solid;border-width: 1px 0px 1px 0px; background-color:#ffffff">
						<!-- <span style="position: relative; background-color: #2C405A;max-height: 5px;min-height: 2px;: 10rpx;width: 540rpx; top:50%; transform: translateY(-50%);"></span> -->
					</view>
					
					<!-- 定时器 -->
					<timer :valueT="valueT" @timeChange="timeChange" :showPage="addButtonPressed || !showPage"></timer>
					
					<!-- 备注 待添加icon、字数限制、换行功能 -->
					<input class="inputNote" style="background-color: #fff9f9;" type="text" placeholder="备注" v-model="inputComment" />
			
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
	import changer from "./cardBreakdown/changer.vue"
	import changerR from "./cardBreakdown/changerR.vue"
	import repeatFrequency from "@/components/repeatFrequency.vue"

	export default {
		data() {
			return {
				addButtonPressed:false,
				showPage: true,
				todoFinished:false,
				valueT: [0, 25, 0],
				todos: [],
				todosD:[],
				inputTitle: '',
				valueOfExp: 1,
				inputComment: '',
				importance: true,
				emergency: false,
				overdue: false,
				routineBox: 0,
				selectedDate: new Date().getDate(),
				selectedMonth: new Date().getMonth() + 1,
				selectedYear: new Date().getFullYear(),
				selectedHour: '',
				selectedMin: '',
				selectedSec: '',
				yearNow: new Date().getFullYear(),
				monthNow: new Date().getMonth() + 1,
				dateNow: new Date().getDate(),
				single: ''
			}
		},
		mounted() {
			uni.$on("deleteToDo", this.deleteToDo)
		},
		components: {
			breakDownListHead,
			breakDownList,
			sliderVertical,
			timer,
			changer,
			changerR,
			repeatFrequency
		},
		methods: {
			enterToDetailPage(type) {
				this.type = type
				this.$refs.popupA.open()
				uni.$emit('completeAccomplishment',{Acid:1004})
				setTimeout(()=>{
					this.addButtonPressed=true
				},500)
			},
			transformTitleData() {
				this.addButtonPressed=false
				if (!this.inputTitle.trim()) {
					this.valueT = [0, 25, 0]
					this.todoFinished=false,
					this.todos = []
					this.todosD = []
					this.inputTitle = ''
					this.valueOfExp = 1
					this.inputComment = ''
					this.importance = true
					this.emergency = false
					this.overdue = false
					this.routineBox = 0
					this.selectedDate = new Date().getDate()
					this.selectedMonth = new Date().getMonth() + 1
					this.selectedYear = new Date().getFullYear()
					this.selectedHour = ''
					this.selectedMin = ''
					this.selectedSec = ''
					this.visible = false
					this.single = ''
					return
				}
				if(this.showPage==false){
					console.log("上传每日任务数据")
					const todoTitle = {
						id: Date.now(),
						title: this.inputTitle,
						exp: this.valueOfExp,
						routineBox:this.routineBox,
						todos: this.todos,
						todosD: this.todosD,
						comment: this.inputComment,
						todoFinished:this.todoFinished,
						single: this.single,
						valueT: this.valueT
					}
					// uni.$emit("routineBox",todoTitle)
					this.$store.commit('ADDDAILYTODO', todoTitle)
				}
				else{
					if(this.yearNow===this.selectedYear & this.monthNow===this.selectedMonth & this.selectedDate<this.dateNow){
						this.overdue=true
						this.importance=true
						console.log("overdue task")
					}
					if(this.yearNow===this.selectedYear & this.monthNow===this.selectedMonth & (this.selectedDate-this.dateNow)<3){
						this.emergency = true
					}
					else {
						this.emergency = false
					}
					const todoTitle = {
						id: Date.now(),
						title: this.inputTitle,
						exp: this.valueOfExp,
						importanceLevel: this.importance,
						emergenceLevel: this.emergency,
						overdue: this.overdue,
						todos: this.todos,
						todosD: this.todosD,
						comment: this.inputComment,
						todoFinished:this.todoFinished,
						selectedDate: this.selectedDate,
						selectedMonth: this.selectedMonth,
						selectedYear: this.selectedYear,
						selectedHour: this.selectedHour,
						selectedMin: this.selectedMin,
						selectedSec: this.selectedSec,
						single: this.single,
						valueT: this.valueT
					}
					if (!todoTitle.importanceLevel & todoTitle.emergenceLevel) {
						this.$emit("TitleBox1", todoTitle)
					}
					if (todoTitle.importanceLevel & todoTitle.emergenceLevel) {
						this.$emit("TitleBox2", todoTitle)
					}
					if (!todoTitle.importanceLevel & !todoTitle.emergenceLevel) {
						this.$emit("TitleBox3", todoTitle)
					}
					if (todoTitle.importanceLevel & !todoTitle.emergenceLevel) {
						this.$emit("TitleBox4", todoTitle)
					}
				}
				
				this.valueT = [0, 25, 0]
				this.todos = []
				this.todosD = []
				this.inputTitle = ''
				this.valueOfExp = 1
				this.inputComment = ''
				this.todoFinished = false
				this.importance = true
				this.emergency = false
				this.overdue = false,
				this.routineBox = 0
				this.selectedDate = new Date().getDate()
				this.selectedMonth = new Date().getMonth() + 1
				this.selectedYear = new Date().getFullYear()
				this.selectedHour = ''
				this.selectedMin = ''
				this.selectedSec = ''
				this.visible = false
				this.single = ''
				
					// uni.$emit("TitleBox",todoTitle)
			},
			
			showPageChange(){
				this.showPage=!this.showPage
				console.log(this.showPage)
			},
			//滑动经验选择器 待同步数据、修bug
			sliderChange(val) {
				this.valueOfExp = val
				// console.log(this.valueOfExp,"sliderchanged")
			},
			//紧急/重要选择器（日历+星星）
			selectImportance() {
				this.importance = !this.importance
				// console.log(this.importance)
			},
			// selectEmergency(x) {
			// 	this.$refs.calendar.open()
			// },
			putTaskIntoBox(num){
				this.routineBox=num
			},
			confirm(e) {
				// console.log(e)
				this.single = e
				this.selectedDate = Number(e.slice(8, 10))
				this.selectedMonth = Number(e.slice(5, 7))
				this.selectedYear=Number(e.slice(0,4))
				if(e.length>=12 & (e.slice(11,14)!="00:" | e.slice(14,17)!="00")){
					this.selectedHour=e.slice(11,14)
					this.selectedMin=e.slice(14,17)
				}
				else{
					this.selectedHour=''
					this.selectedMin=''
				}
			},

			//分解任务项的一系列功能
			addToDo(x) {
				this.todos.unshift(x)
				console.log(this.todos)
			},
			checkToDo(id) {
				this.todos.forEach((todoObj) => {
					if (todoObj.id === id) todoObj.done = !todoObj.done
					// console.log(todoObj.done)
				})
			},

			//待加分解任务项的delete图标以及联立此功能
			deleteToDo(e){
				for (var i = 0; i < this.todos.length; i++) {
					if(this.todos[i].id==e.toDoId){
						console.log(this.todos[i])
						this.todos.splice(i,i+1)
					}}
			},
			addToDoD(x) {
				this.todosD.unshift(x)
				// console.log(this.todos)
			},
			checkToDoD(id) {
				this.todosD.forEach((todoObj) => {
					if (todoObj.id === id) todoObj.done = !todoObj.done
					// console.log(todoObj.done)
				})
			},
			
			//待加分解任务项的delete图标以及联立此功能
			deleteToDoD(e){
				for (var i = 0; i < this.todosD.length; i++) {
					if(this.todosD[i].id==e.toDoId){
						console.log(this.todosD[i])
						this.todosD.splice(i,i+1)
					}}
			},
			//定时器设置功能
			timeChange(valueT) {
				this.valueT = valueT
			},

			//添加提醒闹钟 功能待完善！！
			addAlert() {
				// console.log("addAlert")
			}
		},
		props: ['content'],
	}
</script>

<style>
	.labelBox {
		display: flex;
		flex-wrap: wrap;
	}

	.addButton {
		background-image: url(../static/addButton1.png);
		position: absolute;
		bottom: 0px;
		right: 0px;
		height: 60px;
		width: 60px;
		margin: 15px;
		background-size: cover;
		display: inline-block;
	}
	
	.cROrigin{
		transform: rotateY(180deg);
	}
	.componentRotate{
		transform: rotateY(180deg);
	}
	.componentRotateR{
		transform: rotateY(360deg);
	}
	
	.detailPage {
		height: 900rpx;
		width: 540rpx;
		display: flex;
		flex-direction: column;
		backface-visibility: hidden;
		transition: all 1s ;
	}
	.detailPageR{
		position: absolute;
		top: 0;
		left: 0;
		/* z-index: 10; */
		height: 900rpx;
		width: 540rpx;
		display: flex;
		flex-direction: column;
		backface-visibility: hidden;
		transition: all 1.5s ;
		/* transform: rotateY(60deg); */
		
	}

	.inputHeader {
		background-color: #f7ffff;
		/* border-top: 1px solid #4b7a81;
		border-left: 1px solid #4b7a81;
		border-right: 1px solid #4b7a81; */
		border-top-right-radius: 5px;
		border-top-left-radius: 5px;
		color: #b6baba;
		flex: 2.5;
		border-bottom: #6688b3 solid 1px;
	}

	.detailPageBody {
		display: flex;
		flex: 8;

	}

	.ExpSlider {
		background-color: #eef9fd;
		border: #ffc2c2 solid 1px;
		border-top: 1px solid #c3cdd7;
		margin: -1px 0px -1px 0px;
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.detailPageBody1 {
		display: flex;
		flex-direction: column;
		flex: 4.4;
		background-color: #ffffff;
	}

	.dateSelect {
		background-color: #f0f8fe;
		border: 1px solid #c3cdd7;
		margin: -1px;
		flex: 2;
	}

	.emergenceSelect {
		/* flex:1; */
		text-align: center;
		font-size: 36rpx;
		padding: 10rpx;
	}

	.inputImportanceEmergence {
		display: flex;
		flex-direction: row;
		align-content: center;
		justify-content: center;
		/* padding: 10rpx; */
	}

	.inputBreakDownItemList {
		flex: 4;
		/* border: 1px solid #2C405A;
		border-top: 0;
		border-right: 0;
		margin: -1px; */
		/* margin-right: 2px; */
		/* border-radius: 10px; */
	}
	
	.concentrationTimeStat{
		font-size: 30rpx;
		padding:10rpx 0rpx 0rpx 0rpx;
		background-color: #E6FFFF;
		color: #e39fa1;
	}
	.inputNote {
		flex: 2.85;
		background-color: #f7ffff;
		border-radius: 0 0 5px 5px;
	}

	.finalButton {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.finalButton view {
		border-radius: 5px;
		padding: 5px;
		padding-left: 43px;
		padding-right: 43px;
		border: 1px solid #6688b3;
		margin-bottom: 10px;
	}
</style>
