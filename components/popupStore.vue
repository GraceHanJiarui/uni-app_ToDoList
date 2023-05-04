<template>
	<view>
		<view class="rewardsBox" v-if="this.valid">
			<view @click="toDetailPage()" >
				<view class="rewardsImage" :style="{backgroundImage:'url(../../static/addButton.pn'+'g'+')'}"></view>
				<view style="position: absolute;left: 230rpx;">
					<view class="rewardsTitle">{{reward.title}}</view>
					<view class="rewardsOwn" v-if="this.$store.state.languages">拥有：{{reward.ownNum}}</view>
					<view class="rewardsOwn" v-if="!this.$store.state.languages">Owned：{{reward.ownNum}}</view>
				</view>
			</view>
			<!-- <view class="buyButton" @click="">购买</view> -->
		</view>
		<view class="rewardsBox" style="border: 1px dimgray solid;" v-if="!this.valid">
			<view style="z-index: 999; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 40px; color: dimgray;">Locked</view>
			<view>
				<view class="rewardsImage" :style="{backgroundImage:'url(../../static/addButton.pn'+'g'+')'}"></view>
				<view style="position: absolute;left: 230rpx;">
					<view class="rewardsTitle">{{reward.title}}</view>
					<view class="rewardsOwn" v-if="this.$store.state.languages">拥有：{{reward.ownNum}}</view>
					<view class="rewardsOwn" v-if="!this.$store.state.languages">Owned：{{reward.ownNum}}</view>
				</view>
			</view>
			<!-- <view class="buyButton" @click="">购买</view> -->
		</view>
		<uni-popup ref="popupStore" type="center" background-color="rgba(220,38,38,0)":mask-click="false">
			<view class="storeDetailPage">
				<view style="flex: 8;">
					<view>{{reward.title}}</view>
					<view class="">{{reward.description}}</view>
					<view class="rewardsOwn" v-if="this.$store.state.languages">拥有：{{reward.ownNum}}</view>
					<view class="rewardsOwn" v-if="!this.$store.state.languages">Owned：{{reward.ownNum}}</view>
				</view>
				<view v-if="this.$store.state.languages" style="position: absolute; bottom:60px ;right: 10px; width: 180rpx; height: 180rpx; border: lightpink 2px solid; border-radius: 50rpx; background-color: #ffeeea;"  @click="usage">使用</view>
				<view v-if="!this.$store.state.languages" style="position: absolute; bottom:60px ;right: 10px; width: 180rpx; height: 180rpx; border: lightpink 2px solid; border-radius: 50rpx; background-color: #ffeeea;"  @click="usage">use</view>
				<view style="display: flex;flex-direction: row;flex: 1; align-items: center; justify-content: center;">
					<view class="button" @click="cancelPurchase" v-if="this.$store.state.languages">取消</view>
					<view class="button" @click="confirmPuchase" v-if="this.$store.state.languages">购买</view>
					<view class="button" @click="cancelPurchase" v-if="!this.$store.state.languages">Cancel</view>
					<view class="button" @click="confirmPuchase" v-if="!this.$store.state.languages">Purchase</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name:"popupStore",
		data() {
			return {
				messageText:'',
				valid:true
			};
		},
		beforeMount() {
			this.reward.ownNum=uni.getStorageSync('ownNum'+this.reward.key) || 0
			if (this.reward.key == 1){
				this.valid = !this.storeValid
				console.log(this.reward.key, this.valid)
			} else {
				this.valid = this.storeValid
				console.log(this.reward.key, this.valid)
			}
		},
		watch:{
			'reward.ownNum'(newVal,oldVal){
				// console.log(newVal)
				uni.setStorageSync('ownNum'+this.reward.key,newVal)
			},
			'storeValid'(newVal,oldVal){
				if (this.reward.key == 1){
					this.valid = true
					console.log(this.reward.key, this.valid)
				} else {
					this.valid = this.storeValid
					console.log(this.reward.key, this.valid)
				}
			},
		},
		props:['reward','daoju','storeValid'],
		methods:{
			toDetailPage(){
				// this.type = type
				this.$refs.popupStore.open()
			},
			cancelPurchase(){
				this.$refs.popupStore.close()
			},
			confirmPuchase(){
				if(this.$store.state.tokenNumber>=this.reward.cost){
					this.$store.commit('SUBTRACTTOKENNUMBER',this.reward.cost)
					this.reward.ownNum+=1
					if(this.reward.key == 1) {
						uni.setStorage({
							key: 'storeValid',
							data: true,
							success: function () {
								console.log('success3');
							}
						})
						this.$emit('changeStoreValid')
						console.log(this.storeValid)
					}
					this.$refs.popupStore.close()
				}
				else{
					this.messageText = "您的代币不足！请去努力工作！"
					this.$refs.message.open()
				}
			},
			usage(){
				if(this.reward.ownNum > 0){
					this.reward.ownNum-=1
				}
				else{
					this.messageText = "购买失败"
					this.$refs.message.open()
				}
			}
		},
	}
</script>

<style>
.rewardsBox{
		height: 10vh;
		width: 600rpx;
		left: 50%;
		transform:translateX(-50%);
		margin-top: 2vh;
		/* margin-left: ; */
		/* margin-right: 5%; */
		position: relative;
		border: 1px salmon solid;
		padding: 5%;
		border-radius: 3vh;
	}
	.rewardsImage{
		position: absolute;
		background-size: cover;
		height: 130rpx;
		width: 130rpx;
		display: inline-block;
		/* background-image: url('../../static/addButton.png'); */
	}
	.rewardsTitle{
		/* position: relative; */
		left: 230rpx;
		word-wrap: break-word;
	}
	.rewardsOwn{
		position: relative;
		/* top: 100rpx; */
		left: 150rpx;
	}
	.buyButton{
		position: absolute;
		right: 30rpx;
		width: 50rpx;
		/* height: ; */
	}
	.storeDetailPage{
		height: 900rpx;
		width: 600rpx;
		display: flex;
		flex-direction: column;
		/* backface-visibility: hidden; */
		transition: all 1s;
		background-color: aliceblue;
	}
	.button{
		width: 299rpx;
		border: 1px;
		border: 1px #000 solid;
		text-align: center;
		padding: 20rpx;
		margin: -1px;
	}
</style>