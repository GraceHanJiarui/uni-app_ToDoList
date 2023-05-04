<template>
	<view class="breakDownListItem">
		<!-- <checkbox value="cb" v-model:checked="todoObj.done" ></checkbox> -->
			<view v-if="!isEdit">
				<label :checked="todoObj.done" @click="handleChecked(todoObj.id)">	
				<view :class="todoObj.done ?'checkedButton':'uncheckedButton'"></view>
				<text :class="todoObj.done ?'textDFinished':'textD'" style="font-size: 32rpx;">{{todoObj.title}}</text>
				</label>
				<uni-icons v-if="!todoObj.done" type="clear" size="20px" color="#919ec8" @click="deleteItem(todoObj.id)" @touchend.stop style="float: right; "></uni-icons>
				<uni-icons v-if="!todoObj.done" type="compose" size="20px" color="#919ec8" @click="editItem(todoObj)" style="float: right;"></uni-icons>
			</view>
			<input focus="true" v-if="isEdit" type="text" :value="todoObj.title" @blur="handleBlur($event)"/>
		
			<!-- <checkbox  style="display: none;"></checkbox> -->
		
<!-- 		<label>
			<button @click="handleDelete(todoObj.id)" style="display: none;">删除</button>
			<view class="deleteButton"></view>
		</label> -->
	</view>
</template>

<script>
	export default {
		props:['todoObj','checkToDo'],
		data() {
			return {
				isEdit:false
			}
		},
		methods:{
			handleChecked(id){
				this.checkToDo(id)
			},
			deleteItem(id){
				uni.$emit('deleteToDo',{toDoId:id})
			},
			editItem(){
				this.isEdit=true;
			},
			handleBlur(e){
				this.isEdit=false
				this.todoObj.title=e.target.value
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
		/* background-image: url(@/static/R-C.jpg); */
	}
</style>
