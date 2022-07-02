<template>
	<view style="overflow: hidden;">
		<uni-transition ref="ani" custom-class="transition" mode-class="slide-top" style="width: 100%; height: 100vh; background-color: #347df3;"  
					:show="showC"><calendar-page @calendarReturn="calendarReturn"></calendar-page></uni-transition>
		<view v-show="!showC" @touchstart="touchstart" @touchend="touchend">
			<canvas canvas-id="background" class="background"></canvas>
			<canvas canvas-id="backgroundV" class="backgroundV"></canvas>
			<navigateBar></navigateBar>
			<view class="container">
				<view class="categories">
					<span style="position: absolute; left:50%; transform: translate(-50%,0);">紧急</span>
					<span style="position: absolute; right: 10rpx; top: calc(50% + 100rpx);transform: translate(0,-50%)">重要</span>
					<span style="position: absolute; left: 50%; bottom: 10rpx; transform: translate(-50%,0);">不紧急</span>
					<span style="position: absolute; left: 10rpx; top: calc(50% + 100rpx);transform: translate(0,-50%)">不重要</span>
				</view>
				<view class="content">
					<view class="box" >
						
						<span class="topLeftBox" >
							<long-press v-for="everyThing in todoTitleBox1" :key="everyThing.id" :et="everyThing" @itemComplete="deleteBox1" @TitleBox1="addBox1" @TitleBox2="addBox2" @TitleBox3="addBox3" @TitleBox4="addBox4" ></long-press>
						</span>
						<span class="topRightBox">
							<long-press v-for="everyThing in todoTitleBox2" :key="everyThing.id" :et="everyThing" @itemComplete="deleteBox2"@TitleBox1="addBox1" @TitleBox2="addBox2" @TitleBox3="addBox3" @TitleBox4="addBox4"></long-press>
						</span>
						<span class="bottomLeftBox">
							<long-press v-for="everyThing in todoTitleBox3" :key="everyThing.id" :et="everyThing" @itemComplete="deleteBox3"@TitleBox1="addBox1" @TitleBox2="addBox2" @TitleBox3="addBox3" @TitleBox4="addBox4"></long-press>
						</span>
						<span class="bottomRightBox">
							<long-press v-for="everyThing in todoTitleBox4" :key="everyThing.id" :et="everyThing" @itemComplete="deleteBox4"@TitleBox1="addBox1" @TitleBox2="addBox2" @TitleBox3="addBox3" @TitleBox4="addBox4"></long-press>
						</span>
					</view>
					<!--  -->
					<!-- 后台方便测试数据 -->
					<!--  -->
					<!-- <view style="position: fixed" @click="tryclearStorage">清理缓存</view> -->
					<!--  -->
					<!--  -->
					<!--  -->
					<routine-page></routine-page>
					<addButtonPage @TitleBox1="addBox1" @TitleBox2="addBox2" @TitleBox3="addBox3" @TitleBox4="addBox4" style="text-align: center;"></addButtonPage>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navigateBar from "../../components/navigateBar.vue"
	import longPress from "../../components/longPress.vue"
	import addButtonPage from "../../components/addButtonPage.vue"
	import calendarPage from "../../components/calendar/calendarPage.vue"
	import routinePage from "../../components/routinePage.vue"
	
	export default{
		data() {
			return {
				showC:false,
				ts:0,
				te:0,
				title: 'To Do!',
				demo: {
					top: 0,
					height: 0,
				},
				todoTitleBox1:[],
					// id:Date.now(),title:this.inputTitle, exp:this.valueOfExp, valueimportanceLevel: this.importance, emergenceLevel:this.emergency,comment:this.inputComment
				
				todoTitleBox2:[
				],
				todoTitleBox3:[
				],
				todoTitleBox4:[]
			}
		},
		onLoad() {
			uni.getStorage({
				key:'todoBox1',
				success:(e)=>{
					this.todoTitleBox1=e.data;
				},
				fail(e) {
					console.log(e,"fail1")
				}
			})
			uni.getStorage({
				key:'todoBox2',
				success:(e)=>{
					this.todoTitleBox2=e.data;
				},
				fail(e) {
					console.log(e,"fail2")
				}
			})
			uni.getStorage({
				key:'todoBox3',
				success:(e)=>{
					this.todoTitleBox3=e.data;
				},
				fail(e) {
					console.log(e,"fail3")
				}
			}),
			uni.getStorage({
				key:'todoBox4',
				success:(e)=>{
					this.todoTitleBox4=e.data;
				},
				fail(e) {
					console.log(e,"fail4")
				}
			})
		},
		onReady: function() {
			this.drawBg1()
			this.drawBg2()
		},
		watch:{
			todoTitleBox1:{
				deep:true,
				handler(value){
					uni.setStorage({
						key: 'todoBox1',
						data: value,
						success: function () {
							console.log('success1');
						}
					})
				}
			},
			todoTitleBox2:{
				deep:true,
				handler(value){
					uni.setStorage({
						key: 'todoBox2',
						data: value,
						success: function () {
							console.log('success2');
						}
					})
				}
			},
			todoTitleBox3:{
				deep:true,
				handler(value){
					uni.setStorage({
						key: 'todoBox3',
						data: value,
						success: function () {
							console.log('success3');
						}
					})
				}
			},
			todoTitleBox4:{
				deep:true,
				handler(value){
					uni.setStorage({
						key: 'todoBox4',
						data: value,
						success: function () {
							console.log('success4');
						}
					})
				}
			}
		},
		
		components:{
			navigateBar,
			longPress,
			addButtonPage,
			calendarPage,
			routinePage
		},
		
		methods: {
			drawBg1(){
				const ctx = uni.createCanvasContext('background');
				var grd=ctx.createLinearGradient(0, 0, (this.wpx*750), 0);
				grd.addColorStop(0.2,'#fff');
				grd.addColorStop(0.5,'#2f5cff');
				grd.addColorStop(0.8,'#fff');
				ctx.setFillStyle(grd)
				ctx.fillRect(0,(this.hpx*100-200*this.wpx)/2-26, this.wpx*750, 2)
				ctx.draw()
			},
			drawBg2(){
				// console.log(this.hpx * 100 - 200 * this.wpx - 50)
				const ctx1 = uni.createCanvasContext('backgroundV');
				var grd1=ctx1.createLinearGradient(0, 0, 0, this.hpx*80);
				grd1.addColorStop(0.1,'#fff');
				grd1.addColorStop(0.5,'#2f5cff');
				grd1.addColorStop(0.9,'#fff');
				ctx1.setFillStyle(grd1)
				ctx1.fillRect((this.wpx*750)/2,0, 2, this.hpx*100-200*this.wpx)
				ctx1.draw()
			},
			touchstart(e){
				this.ts=e.touches[0].pageY
			},
			
			touchend(e){
				if(e.changedTouches[0].pageY-this.ts>110){
					this.ts=0
					this.showC=true
				}
			},
			calendarReturn(){
				this.showC=false
			},
			checkPosition(boxNum,x){
				if(boxNum.length==0){
					boxNum.unshift(x)
					console.log("unshift")
					return
				}
				for(let i = 0; i<boxNum.length; i++){
					if(boxNum[i].exp>x.exp){
						if(i===boxNum.length-1){
							boxNum.push(x)
							console.log("push")
							return
						}
						else{
							console.log(i,"continue")
							continue
						}
					}
					else{
						boxNum.splice(i,0,x)
						console.log(i,boxNum[i].exp,"进去吧你")
						return
					}
				}
			},
			addBox1(x){
				this.checkPosition(this.todoTitleBox1,x)
				console.log(x)
			},
			addBox2(x){
				// this.todoTitleBox2.unshift(x)
				this.checkPosition(this.todoTitleBox2,x)
				console.log(x)
			},
			addBox3(x){
				// this.todoTitleBox3.unshift(x)
				this.checkPosition(this.todoTitleBox3,x)
				console.log(x)
			},
			addBox4(x){
				this.checkPosition(this.todoTitleBox4,x)
				console.log(x)
			},
			deleteBox1(id){
				console.log('db1')
				this.todoTitleBox1=this.todoTitleBox1.filter((x)=>{
					return x.id!==id
				})
			},
			deleteBox2(id){
				console.log('db2')
				this.todoTitleBox2=this.todoTitleBox2.filter((x)=>{
					return x.id!==id
				})
			},
			deleteBox3(id){
				console.log('db3')
				this.todoTitleBox3=this.todoTitleBox3.filter((x)=>{
					return x.id!==id
				})
			},
			deleteBox4(id){
				console.log('db4')
				this.todoTitleBox4=this.todoTitleBox4.filter((x)=>{
					return x.id!==id
				})
			},
			tryclearStorage(){
				// uni.clearStorage();
				try {
					uni.clearStorageSync();
				} catch (e) {
					console.log(e)
				}
			}
		}
	}
</script>

<style scoped>	
	.container{
		height: calc(100vh - 200rpx - 5px);
		font-family: Simsun;
	}
	.categories{
		font-size: 30rpx;
		color: #747ca5;
		margin: 10rpx;
		font-weight: 500;
	}
	.content {
		height: 100%;
		overflow: hidden;
		display: flex;
		/* flex-direction: column; */
		justify-content: center;
		color: black; /* aliceblue */
		/* background-color: #7cb3d5; */
		font-weight:600;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.background{
		width: 100%;
		margin: auto;
		height: 80vh;
		top: 200rpx;
		position: absolute;
		pointer-events: none;
		/* background-color: #16005B; */
	}
	.backgroundV{
		width: 100%;
		height: calc(100vh - 200rpx);
		overflow: hidden;
		top: 200rpx;
		/* background-color: #16005B; */
		position: absolute;
		pointer-events: none;
	}
	.box{
		width: 100%;
		height: calc(100vh - 200rpx);
		display:flex;
		flex-wrap: wrap;
		/* background-image:url(../../static/backgroundImage.png) ; */
		/* background-image:url(../../static/backgroundImageSonia.png) ; */
		
		/* background-size: 100% 100%; */
		justify-content: space-around;
		align-items: space-around;
		;
	}
	.topLeftBox{
		display: flex;
		width:45%;
		height:40vh;
		/* background-color: #555555; */
		flex-wrap: wrap;
		align-content:flex-start;
		text-align: center;
	}
	
	.topRightBox{
		display: flex;
		width:45%;
		height:40vh;
		/* background-color: #555555; */
		flex-wrap: wrap;
		align-content:flex-start;
		text-align: center;
	}
	
	.bottomLeftBox{
		display: flex;
		width:45%;
		height:40vh;
		/* background-color: #555555; */
		flex-wrap: wrap;
		align-content:flex-start;
		text-align: center;
	}
	
	.bottomRightBox{
		display: flex;
		width:45%;
		height:40vh;
		/* background-color: #555555; */
		flex-wrap: wrap;
		align-content:flex-start;
		text-align: center;
	}
	
</style>
