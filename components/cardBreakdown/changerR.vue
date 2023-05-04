<template>
	<view>
		<label class="lb">
			<button name="" id="checkbox" @click.stop.prevent="changePage"></button>
			<span :class="anim ? '' : 'backw'"></span>
			<text class="daibanText">日常</text>
		</label>
	</view>
</template>

<script>
	export default {
			data() {
				return{
					changeP:false,
					anim:true
				}
			},
			methods:{
				changePage(){
					this.$emit("changePage")
					this.changeP=!this.changeP
					this.anim=!this.anim
					setTimeout(()=>{
						this.anim=!this.anim
					},1500)
				}
			},			
		}
</script>

<style scoped>
	checkbox {
		/* 隐藏复选框 */
		display: none;
	}
	.lb {
		position: absolute;
		float: left;
		z-index: 98;
		left: 6px;
		top: 6px;
		width: 60px;
		height: 22px;
		border-radius: 20px;
		border: 1px solid #8d78f5;
		background-color: #ceacff;;
		transition: all 0.35s ease-in;
	}
	span {
		position: absolute;
		top: 2px;
		left: 2px;
		margin-left: 36px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		border: 1px solid #8d78f5;
		background-color: #ceacff;
	}
	.forw{
		transition:all 0.35s ease-in;
		animation: switch-reverse 0.35s forwards;
	}
	.backw{
		transition:all 1s ease-in;
		animation: switch 1.51s forwards;
	}
	.daibanText{
		position: absolute;
		left: 6px;
		top: 2px;
		font-size: 14px;
		color: #a1fff1;
	}
	
/* 	.lb ::after {
		content: "";
		position: absolute;
		top: 2px;
		left: 2px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		box-shadow: -13px 0 0 2px #e8e8ea, -24px 14px 0 -2px #e8e8ea;
		transition: all 0.25s ease-in;
		不透明度 为0 就是隐藏了
		opacity: 0;
	} */
	
	@keyframes switch {
		0% {
			margin-left: 36px;
		}
		40% {
			margin-left: 22px;
			width: 12px;
		}
		99% {
			margin-left: 4px;
		}
		100%{
			margin-left: 36px;
		}
	}
	/* 顺便定义取消复选框选中状态的动画*/
	@keyframes switch-reverse {
		0% {
			left: 36px;
		}
		60% {
			left: 22px;
			width: 12px;
		}
		100% {
			left: 4px;
		}
	}
</style>