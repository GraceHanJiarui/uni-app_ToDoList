<template>
	<view class="breakDownList">
		<breakDownListItem v-for="todo in todos" :key="todo.id" :todoObj="todo" :checkToDo="checkToDo" :deleteToDo="deleteToDo"></breakDownListItem>
	</view>
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
		props:['todos','checkToDo','deleteToDo']
	}
	
</script>

<style>
	.breakDownList{
		background-color: #e5f0f1;
		border-width: 5px;
		border-color: #b6cdd2;
		border-radius: 4px;
	}
</style>
