<template>
	<view style="overflow: hidden;">
		<navigate-bar></navigate-bar>
		<view class="breakdownTitle" v-if="this.$store.state.languages">奖品</view>
		<view class="breakdownTitle" v-if="!this.$store.state.languages">Rewards</view>
		<view v-if="this.$store.state.languages">
			<popup-store v-for="reward in rewardsC" :reward="reward" :daoju="daoju" :storeValid="storeValid" @changeStoreValid='changeStoreValid'></popup-store>
		</view>
		<view v-if="!this.$store.state.languages">
			<popup-store v-for="reward in rewardsE" :reward="reward" :daoju="daoju" :storeValid="storeValid" @changeStoreValid='changeStoreValid'></popup-store>
		</view>
	</view>
</template>

<script>
	import navigateBar from '../../components/navigateBar.vue'
	import popupStore from '../../components/popupStore.vue'
	export default{
		data(){
			return{
				storeValid:false,
				rewardsC:[
					{key:'1',title:'商城使用指南', description:'一份平平无奇的商城使用指南，却与商城的核心功能紧密联系，也许能激发你学习工作的激情。（购买此商品后解锁商城功能）',cost:1,ownNum:0},
					{key:'2',title:'加在午饭里的一只鸡腿', description:'完成了这么多工作，犒劳自己一下吧，比如…午饭给自己加个鸡腿什么的~',cost:10,ownNum:0},
					{key:'3',title:'一颗喜欢吃的糖', description:'在艰苦地奋斗后吃一颗糖，生活很苦，向着目标努力很甜;)',cost:2,ownNum:0},
					{key:'4',title:'五年高考三年模拟', description:'总有人喜欢在平静的生活中为自己寻找挑战，买一本五年高考三年模拟，回忆那段奋斗的青春————会有人想要的吧？',cost:15,ownNum:0},
					{key:'5',title:'一本感兴趣但一直没有机会买的书', description:'去书店挑一本你喜欢的书吧，在奋斗之余充实自己、享受生活~',cost:20,ownNum:0},
					{key:'6',title:'加入群聊', description:'使用了一段时间此软件，有没有一些话想对开发者说？有没有一些用得不顺手的地方想要反馈？想不想进入群聊与志同道合之士互相监督共同努力？加群吗？加群吗？加群吗？来加群吧！',cost:50,ownNum:0},
					{key:'7',title:'一件喜欢得不得了的衣服', description:'完成了这么多任务，偶尔也该小小地奢侈一下奖励自己的努力，买一件有点小贵的衣服，用心热爱自己的努力和生活。',cost:70,ownNum:0},
					{key:'8',title:'一顿大餐', description:'吃货的快乐就是如此简单，一顿大餐，足以慰风尘',cost:65,ownNum:0},
					{key:'9',title:'休息一天', description:'劳逸结合是很重要的，给自己一个仅限今天的假期，做些自己想做的事。也许是在床上趟一天，做一只无忧无虑的草履虫；也许是跟兄弟连麦开黑直到凌晨……这一天的时间将属于你自己。',cost:100,ownNum:0},
					{key:'10',title:'开发者小姐姐的联系方式', description:'不要99998，不要9998，只要998！只要998！开发者小姐姐的联系方式带回家！（不会真的有人想要吧）……………………………………………………嘛，看在你这么努力支持开发者的份上，你真的想要的话，就把来发者的联系方式给你吧，学术问题、心理咨询、动漫小说安利……开发者小姐姐会尽其所能答复你的！',cost:998,ownNum:0},
					{key:'11',title:'超级大奖', description:'终于到了这一天！一切努力、承诺与等待在这一刻都变为了值得，实现自己的愿望吧少男少女们！且吟心中风流事，莫轻疏狂少年人！/大鹏一日同风起，扶摇直上九万里！/ 凭谁问，廉颇老矣，尚能饭否？',cost:1000,ownNum:0},
					{key:'12',title:'超级大转盘', description:'应朋友的软磨硬泡在软件里加的脑抽功能，消耗目前所有代币，抽一次奖，奖品还没想好有什么',cost:this.$store.state.tokenNumber,ownNum:0},
				],
				rewardsE:[
					{key:'1',title:'App Guidance', description:'A simple guide to how to use this app, may inspire you to learn and work. (Unlock the store function after purchasing this product)',cost:1,ownNum:0},
					{key:'2',title:'Fried Chicken', description:'After doing all this work, give yourself a treat, like... Maybe fried chicken or something for lunch',cost:10,ownNum:0},
					{key:'3',title:'Candy', description:'After hard struggle, eat a candy. Life is bitter, though working toward the goal is sweet;)',cost:2,ownNum:0},
					{key:'4',title:'Textbook', description:'There are always people who like to find challenges for themselves in a quiet life. Buy a textbook, and recall that struggle of youth - will someone want it?',cost:15,ownNum:0},
					{key:'5',title:'An Interesting Book', description:'Go to the bookstore to pick a book you like. Enrich yourself, and enjoy your life~',cost:20,ownNum:0},
					{key:'6',title:'Join in Discord Group', description:'Have used this software for a while, do you have some words to say to the developer? Are there any things you\'re not doing well that you\'d like feedback on? Do you want to join a group chat with like-minded people to monitor each other and work together? Come and join the group!',cost:50,ownNum:0},
					{key:'7',title:'A Lovely Book', description:'With so many tasks accomplished, it\'s time to reward your efforts with a little luxury once in a while. Buy an expensive piece of clothing, and love your efforts and life with all your heart',cost:70,ownNum:0},
					{key:'8',title:'A Big Meal', description:'The happiness of foodie is so simple, a big meal, enough to comfort the wind and dust',cost:65,ownNum:0},
					{key:'9',title:'A Restful Day', description:'It\'s important to balance your work and your life. Give yourself a day off and do what you want to do. This day will be all about you.',cost:100,ownNum:0},
					// {key:'10',title:'开发者小姐姐的联系方式', description:'不要99998，不要9998，只要998！只要998！开发者小姐姐的联系方式带回家！（不会真的有人想要吧）……………………………………………………嘛，看在你这么努力支持开发者的份上，你真的想要的话，就把来发者的联系方式给你吧，学术问题、心理咨询、动漫小说安利……开发者小姐姐会尽其所能答复你的！',cost:998,ownNum:0},
					// {key:'11',title:'超级大奖', description:'终于到了这一天！一切努力、承诺与等待在这一刻都变为了值得，实现自己的愿望吧少男少女们！且吟心中风流事，莫轻疏狂少年人！/大鹏一日同风起，扶摇直上九万里！/ 凭谁问，廉颇老矣，尚能饭否？',cost:1000,ownNum:0},
					// {key:'12',title:'超级大转盘', description:'应朋友的软磨硬泡在软件里加的脑抽功能，消耗目前所有代币，抽一次奖，奖品还没想好有什么',cost:this.$store.state.tokenNumber,ownNum:0},
				],
				daoju:[
					{title:'补救', description:'补救一个过期的任务后，可以获得按时完成此任务的经验和代币奖励，亡羊补牢，为时不晚',cost:1,ownNum:0},
					{title:'经验值翻倍', description:'在接下来的一小时里，获得经验值翻倍。不为达成心愿，就为在排行榜上卷死对手，兄弟们，冲！',cost:1,ownNum:0},
					// {title:'免死金牌', description:'真是的，谁没有点生活呢。获得接下来两小时的无敌时间（在无敌时间内过期的任务将不会扣除经验值）（可叠加生效，如购买两份则总共将获得4小时的无敌时间）。',cost:15,ownNum:0},
					{title:'对赌协议', description:'花费20代币买的对赌协议当然不会白白浪费，如果接下来7天没有任务过期，则返还30代币。否则扣除10代币，并在接下来，每多一天没能完成任务，多扣除1代币，直到完成全部当天任务时返还剩余代币。',cost:20,ownNum:0},
				]
				
			}
		},
		mounted() {
			uni.getStorage({
				key:'storeValid',
				success:(e)=>{
					this.storeValid=true;
					console.log("storevalide")
					if (this.$store.state.languages) {
						this.rewardsC.push(...this.rewardsC.splice(0,1));
						console.log(this.rewardsC)
					} else {
						this.rewardsE.push(...this.rewardsE.splice(0,1));
						console.log(this.rewardsE)
					}
				},
				fail(e) {
					this.storeValid=false;
					console.log("storenotvalide")
				}
			})
		},
		methods:{
			changeStoreValid(){
				uni.getStorage({
					key:'storeValid',
					success:(e)=>{
						this.storeValid=true;
						console.log("storevalide")
						if (this.$store.state.languages) {
							this.rewardsC.push(...this.rewardsC.splice(0,1));
							console.log(this.rewardsC)
						} else {
							this.rewardsE.push(...this.rewardsE.splice(0,1));
							console.log(this.rewardsE)
						}
					},
					fail(e) {
						this.storeValid=false;
						console.log("storenotvalide")
					}
				})
			}
		},
		components:{
			navigateBar,
			popupStore
		},
		
	}
</script>

<style>
	.breakdownTitle{
		padding: 20rpx;
		text-align: center;
		/* margin-top: 20rpx; */
		margin-bottom: 20rpx;
		background-color: lightsalmon;
		color: whitesmoke;
		border: 1px bisque solid;
		box-shadow: 2px 2px 15rpx palegoldenrod;
	}
</style>
