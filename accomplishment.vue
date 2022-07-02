<template>
	<view>
		<view class="accomplishmentBorder">
			<view class="accomplishmentsAc">
				<view class="accomplishmentsAcImage"></view>
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
				}
			},
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
		align-content: center;
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
