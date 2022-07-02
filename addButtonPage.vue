<template>
	<view class="labelBox">
		<view class="addButton" @click="enterToDetailPage('center')"></view>
		<uni-popup ref="popup" id="popup" type="center" background-color="#fdfff3" @maskClick='transformTitleData'>
			<view class="detailPage" @touchstart.stop @touchend.stop>

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
								<uni-datetime-picker v-model="single" @change="confirm">
									<uni-icons type="calendar" size="55rpx" color="#919ec8"
										style="position: relative; top: 6rpx;"></uni-icons>
									<text class='emergenceSelect'>
										{{selectedYear}}-{{selectedMonth}}-{{selectedDate}}
										{{selectedHour}}{{selectedMin}}{{selectedSec}}</text>
								</uni-datetime-picker>
							</view>
							<label>
								<uni-icons type="star-filled" size="60rpx"
									:color="this.importance ? '#697b9e' : '#c9dfe0'" @click="selectImportance">
								</uni-icons>
							</label>
						</view>

						<!-- 分解任务项填写 -->
						<view class="inputBreakDownItemList">
							<breakDownListHead @addItem="addToDo"></breakDownListHead>
							<breakDownList :todos="todos" :checkToDo="checkToDo" :deleteToDo="deleteToDo">
							</breakDownList>
						</view>

						<!-- 定时器 -->
						<timer :valueT="valueT" @timeChange="timeChange"></timer>
					</view>
				</view>

				<!-- 备注 待添加icon、字数限制、换行功能 -->
				<input class="inputNote" type="text" placeholder="备注" v-model="inputComment" />

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
		data() {
			return {
				valueT: [0, 25, 0],
				todos: [],
				inputTitle: '',
				valueOfExp: 0,
				inputComment: '',
				importance: false,
				emergency: false,
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
		components: {
			breakDownListHead,
			breakDownList,
			sliderVertical,
			timer,
		},
		methods: {
			consoleEvent(e) {
				console.log(e)
			},
			enterToDetailPage(type) {
				this.type = type
				this.$refs.popup.open()
				// console.log(this.hpx)
			},
			transformTitleData() {
				if (!this.inputTitle.trim()) {
					this.valueT = [0, 25, 0]
					this.todos = []
					this.inputTitle = ''
					this.valueOfExp = 0
					this.inputComment = ''
					this.importance = false
					this.emergency = false
					this.selectedDate = new Date().getDate()
					this.selectedMonth = new Date().getMonth() + 1
					this.selectedYear = new Date().getFullYear()
					this.selectedHour = ''
					this.selectedMin = ''
					this.selectedSec = ''
					this.visible = false
					return
				}
				if ((this.selectedDate - this.dateNow) < 3 & this.monthNow === this.selectedMonth) {
					this.emergency = true
				} else {
					this.emergency = false
				}

				const todoTitle = {
					id: Date.now(),
					title: this.inputTitle,
					exp: this.valueOfExp,
					importanceLevel: this.importance,
					emergenceLevel: this.emergency,
					todos: this.todos,
					comment: this.inputComment,
					selectedDate: this.selectedDate,
					selectedMonth: this.selectedMonth,
					selectedYear: this.selectedYear,
					selectedHour: this.selectedHour,
					selectedMin: this.selectedMin,
					selectedSec: this.selectedSec,
					single: this.single,
					valueT: this.valueT
				}

				this.valueT = [0, 25, 0]
				this.todos = []
				this.inputTitle = ''
				this.valueOfExp = 0
				this.inputComment = ''
				this.importance = false
				this.emergency = false
				this.selectedDate = new Date().getDate()
				this.selectedMonth = new Date().getMonth() + 1
				this.selectedYear = new Date().getFullYear()
				this.selectedHour = ''
				this.selectedMin = ''
				this.selectedSec = ''
				this.visible = false
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
				// uni.$emit("TitleBox",todoTitle)
			},

			//滑动经验选择器 待同步数据、修bug
			sliderChange(val) {
				this.valueOfExp = val
				// console.log(this.valueOfExp,"sliderchanged")
			},
			//紧急/重要选择器（日历+星星）
			selectImportance() {
				this.importance = !this.importance
				console.log(this.importance)
			},
			selectEmergency(x) {
				this.$refs.calendar.open()
			},
			confirm(e) {
				console.log(e)
				this.single = e
				this.selectedDate = Number(e.slice(8, 10))
				this.selectedMonth = Number(e.slice(5, 7))
				if (e.length > 12) {
					this.selectedHour = e.slice(11, 14)
					this.selectedMin = e.slice(14, 17)
					this.selectedSec = e.slice(17, 20)
				} else {
					this.selectedHour = ''
					this.selectedMin = ''
					this.selectedSec = ''
				}
			},

			//分解任务项的一系列功能
			addToDo(x) {
				this.todos.unshift(x)
			},
			checkToDo(id) {
				this.todos.forEach((todoObj) => {
					if (todoObj.id === id) todoObj.done = !todoObj.done
					console.log(todoObj.done)
				})
			},

			//待加分解任务项的delete图标以及联立此功能
			deleteToDo(id) {
				console.log(id)
				this.todos = this.todos.filter((todo) => {
					return todo.id !== id
				})
			},
			//定时器设置功能
			timeChange(valueT) {
				this.valueT = valueT
			},
			//删除本事项
			deleteItem() {
				console.log("deleteItem"),
					this.$emit('itemComplete', this.id)
			},

			//添加提醒闹钟 功能待完善！！
			addAlert() {
				console.log("addAlert")
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

	.detailPage {
		height: 900rpx;
		width: 540rpx;
		display: flex;
		flex-direction: column;
	}

	.inputHeader {
		background-color: #f7ffff;
		border-radius: 5px;
		/* border-top: 1px solid #4b7a81;
		border-left: 1px solid #4b7a81;
		border-right: 1px solid #4b7a81; */
		color: #b6baba;
		flex: 2
	}

	.detailPageBody {
		display: flex;
		flex: 8;

	}

	.ExpSlider {
		background-color: #eef9fd;
		flex: 1;
		justify-content: center;
		align-items: center;
	}

	.detailPageBody1 {
		display: flex;
		flex-direction: column;
		flex: 4.4;
	}

	.dateSelect {
		background-color: #f0f8fe;
		border: 1px solid #c3cdd7;
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
		padding: 10rpx;
	}

	.inputBreakDownItemList {
		flex: 5;
		border: 1px dashed #2C405A;
		margin-right: 2px;
		border-radius: 10px;
	}

	.inputNote {
		flex: 2.85;
		background-color: #2C405A;
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
