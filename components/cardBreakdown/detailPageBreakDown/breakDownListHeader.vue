<template>
	<view class="breakDownListHeader">
		<span ref="todoTitle"></span>
		<input type="text" :focus="isFocus" placeholder="分解任务项" v-model="title" @confirm="addToList()" confirm-type="done"/>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				isFocus:false
			}
		},
		methods:{
			addToList(){
				console.log(this.$refs)
				if(!this.title.trim()) return 
				const todoObj={id:Date.now(),title:this.title, done:false}
				this.$emit("addItem",todoObj)
				this.title=''
				this.isFocus=false
				this.$nextTick(()=>{
					console.log(this.isFocus)
					this.isFocus=true
				}
				)
			}
		}
	}
</script>

<style>
	.breakDownListHeader{
		border: 1px dotted #2C405A;
		border-radius: 10px;
		background-color: #c8dddd;
	}
</style>
