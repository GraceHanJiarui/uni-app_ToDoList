<template>
	<view class="breakDownListItem">
		<!-- <checkbox value="cb" v-model:checked="todoObj.done" ></checkbox> -->
		<label :checked="todoObj.done" @click="handleChecked(todoObj.id)">	
			<view :class="todoObj.done ?'checkedButton':'uncheckedButton'"></view>
			<text :class="todoObj.done ?'textDFinished':'textD'">{{todoObj.title}}</text>
			<!-- <checkbox  style="display: none;"></checkbox> -->
		</label>
<!-- 		<label>
			<button @click="handleDelete(todoObj.id)" style="display: none;">删除</button>
			<view class="deleteButton"></view>
		</label> -->
	</view>
</template>

<script>
	export default {
		props:['todoObj','checkToDo','deleteToDo'],
		data() {
			return {
			}
		},
		methods:{
			handleChecked(id){
				this.checkToDo(id)
			},
			handleDelete(id){
				this.deleteToDo(id)
			}
		}
	}
</script>

<style>
	.checkedButton{
		background-image: url(@/static/starWish.png);
		background-size: cover;
		height: 20px;
		width: 20px;
		margin-left: 5px;
		margin-top: 3px;
		margin-right: 5px;
		display: inline-block;
	}
	.uncheckedButton{
		background-image: url("@/static/starWishFinished.png");
		background-size: cover;
		height: 20px;
		width: 20px;
		margin-left: 5px;
		margin-top: 3px;
		margin-right: 5px;
		display: inline-block;
	}
	.textD{
		text-align: center;
		/* background-color: #627abc; */
		/* display: inline-block; */
	}
	.textDFinished{
		text-align: center;
		text-decoration: line-through;
	}
	.deleteButton{
		width: 50px;
		height: 50px;
		background-image: url(@/static/R-C.jpg);
	}
</style>
