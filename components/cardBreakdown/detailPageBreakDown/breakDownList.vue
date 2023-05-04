<template>
	<scroll-view scroll-y="true" class="breakDownList">
		<breakDownListItem v-for="todo in todos" :key="todo.id" :todoObj="todo" :checkToDo="checkToDo" ></breakDownListItem>
	</scroll-view>
</template>

<script>
	import breakDownListItem from "./breakDownListItem"
	
	export default {
		data() {
			return {
				}
		},
		components:{
			breakDownListItem
		},
		props:['todos','checkToDo']
	}
	
</script>

<style>
	.breakDownList{
		background-color: #f7ffff;
		/* background-color: #e5f0f1; */
		border-width: 5px;
		border-color: #b6cdd2;
		max-height: 300rpx;
		border-radius: 4px;
	}
</style>
