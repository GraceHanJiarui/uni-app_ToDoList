<template>
	<view>
		<view class="accomplishmentBorder">
			<view class="accomplishmentsAc">
				<view v-if="completion" class="accomplishmentsAcImage"></view>
				<view v-if="!completion & item.Achieved" class="accomplishmentsAcButton" @click="clickAcButton">按钮</view>
				<view v-if="!completion & !item.Achieved" class="accomplishmentsAcData">待完成</view>
			</view>
			<view class="accomplishmentContentHeading">{{item.title}}
			</view>
			<!-- <view class="accomplishmentContentSubeading">成就副标题</view> -->
			<view class="accomplishmentContentDetail">{{item.ct}}</view>
			
		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			item:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {
				completion: uni.getStorageSync('accomplishmentToDoB'+this.item.id) || false
			}
		},
		mounted() {
		},
		methods:{
			clickAcButton(){
				this.completion=true
				uni.setStorage({
					key: 'accomplishmentToDoB'+this.item.id,
					data: this.completion,
				})
			}
		}
	}		
</script>

<style>
	.accomplishmentBorder{
		background-color: #ebf7ff;
		border-top: 1px solid #c3cdd7;
		box-shadow: 0px 1px 5px #a4b9ff;
		height: 130rpx;
	}
	.accomplishmentContentHeading{
		font-size: 36rpx;
	}
/* 	.accomplishmentContentSubeading{
		font-size: 30rpx;
	} */
	.accomplishmentContentDetail{
		font-size: 18rpx;
	}
	.accomplishmentsAc{
		right: 0rpx;
		/* top: 0rpx; */
		background-color: #d7e7ff;
		height: 130rpx;
		width: 160rpx;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.accomplishmentsAcButton{
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	.accomplishmentsAcData{
		position: absolute;
		/* left: 50%;
		top: 50%;
		transform: translateY(-50%); */
	}
	
	.accomplishmentsAcImage{
		position: absolute;
		background-image: url(../static/accomplishmentIcon.png);
		background-size: cover;
		height: 130rpx;
		width: 130rpx;
		display: inline-block;
	}
</style>
