<template>
	<view style="overflow: hidden;">
		<view class="accomplishmentBox">成就页
			<view class="badgeWall">徽章墙</view>
			
			<uni-collapse accordion>
				<uni-collapse-item title="初识ToDo" :show-animation="true" :open="true">
					<accomplishment v-for="(item,index) in accomplishmentToDo" :key="index" :item="item"></accomplishment>
				</uni-collapse-item>
				
				<uni-collapse-item class="accomplishmentBox" title="隐藏任务":show-animation="true">
					<accomplishment v-for="(item,index) in accomplishmentGood" :key="index" :item="item"></accomplishment>
				</uni-collapse-item>
			
				
				<uni-collapse-item title="手风琴效果">
					<text>折叠内容</text>
				</uni-collapse-item>
			</uni-collapse>
			<!-- <view class="accomplishments" v-for="i in accomplishment">
				
				<view class="accomplishmentsContent"></view>
				<view class="accomplishmentsAc">
					<view v-show="i.complete" class="accomplishmentsAcImage"></view>
					
				</view>
			</view> -->
				
		</view>
		
		<!-- <div>我</div>
		<text>我啊</text>
		<span>我呀</span>
		<ul></ul>
		<text>我呢</text>
		<input type="text" placeholder="what to do today" v-model="inputWord" @confirm="handleWord(inputWord)" confirm-type="done">
		<view>
			<text>我嘞</text>
			<view v-for="(i,index) in toDoList" :key="index">{{i.each}}</view>
		</view>
		<button @click="passData">{{te}}</button> -->
	</view>
</template>

<script>
	import navigateBar from "../../components/navigateBar.vue"
	import accomplishment from "../../components/accomplishment.vue"
	export default {
		data() {
			return{
				accomplishmentToDo:[
					{id:1001, title:"四象限法则", ct:"论重要和紧急对待办的规划作用（在四象限中分别放入待办）", Achieved:false},
					{id:1002, title:"日常？还是待办？", ct:"论日常和待办对随机性的区分作用（日常和待办中分别放入事项）", Achieved:false},
					{id:1003, title:"追根究底", ct:"论了解完整使用方式和原理对操作的帮助作用（看完指导手册）", Achieved:false},
					{id:1004, title:"向着目标与梦想", ct:"论具象化目标和需求对行动力的促进作用（在代币兑换大奖处填写1000代币时想要的奖励）", Achieved:false},
					{id:1005, title:"个人的一小步", ct:"论踏出第一步对达成目标的拉近作用（完成设定的第一个事项）", Achieved:false},
					{id:1006, title:"自我奖励", ct:"论即时正反馈对完成日常事项的督促作用（在代币商店买一颗糖）", Achieved:false},
					],
				accomplishmentGood:[
					//闹钟相关
					{id:"001", title:"清晨的第一缕阳光", ct:"闹钟在4点-7点间响起"},
					//过期事项相关
					{id:"002", title:"亡羊补牢，为时不晚",ct:"累计完成五件已过期的事项"},
					{id:"003", title:"太阳照常升起", ct:"前一天有事项过期后，第二天完成了所有事项"},
					{id:"008", title:"有事情过期什么的，那种事情不要啊", ct:"连续一周无事项过期"},
					//一天内完成事项数量相关
					{id:"004", title:"其他人办得到吗", ct:"一天内完成8项以上代办且无事项过过期"},
					//事项完成累计数量相关
					{id:"005", title:"日复一日，必有精进", ct:"连续坚持完成一周同一个日常任务"},
					//番茄钟相关
					{id:"006", title:"这就是我的心流模式哒", ct:"累计50个番茄钟无暂停" },
					{id:"007", title:"时间管理大师", ct:"一天内完成4小时的番茄钟" },
					//代币相关
					{id:"009", title:"再加把劲，最后冲刺！", ct:"攒到999个代币" },
					]
			}
		},
		components:{
			accomplishment
		},
		mounted() {
			uni.$on('completeAccomplishment',this.completeAccomplishment),
			uni.getStorage({
				key:'accomplishmentToDo',
				success:(e)=>{
					this.accomplishmentToDo=e.data;
				},
			})
		},
		watch:{
			accomplishmentToDo:{
				deep:true,
				handler(value){
					uni.setStorage({
						key: 'accomplishmentToDo',
						data: value,
						success: function () {
							console.log('successAc');
						},
						fail: function () {
							console.log('failAc');
						}
					})
				}
			},
		},
		methods:{
			completeAccomplishment(data){
				for(let i=0; i<this.accomplishmentToDo.length; i++){
					if(data.Acid==this.accomplishmentToDo[i].id){
						this.accomplishmentToDo[i].Achieved=true
						console.log('this achievement is completed',this.accomplishmentToDo[i])
					}
				}
			}
		// 	passData(){
		// 		uni.setStorage({
		// 			key:"id",
		// 			data:80,
		// 			success() {
		// 				console.log("yes")
		// 			}
		// 		})
		// 	},
		// handleWord(inputWord){
		// 	this.inputWord=inputWord,
		// 	this.toDoList.push({
		// 		each:inputWord,
		// 		position:0,
				
		// 	}),
		// 	console.log(this.toDoList)
		// }
		}
	}
</script>

<style>
	.accomplishmentBox{
		width: 100%;
		display: flex;
		flex-direction: column;
		border: 1px solid #000000;
	}
	.badgeWall{
		height: 20vh;		
		margin: 10px;
		border-radius: 5px;
		border: 1px solid #000000;
	}
	.accomplishments{
		height: 10vh;
		margin-top: 5px;
		border-radius: 5px;
		border: 1px solid #16005b;
		display: flex;
	}
	
</style>
