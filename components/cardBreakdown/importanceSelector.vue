<template>
	<view class="inputImportanceEmergence">
		<view class="dateSelect">
		<uni-datetime-picker v-model="single" @change="confirm">
			<uni-icons type="calendar" size="23.5px" color="#919ec8" style="position: relative; top: 2.6px;"></uni-icons>
			<text class='emergenceSelect'>
			{{selectedYear}}-{{selectedMonth}}-{{selectedDate}} {{selectedHour}}{{selectedMin}}{{selectedSec}}</text>
		</uni-datetime-picker>
		</view>
		<label>
			<uni-icons type="star-filled" size="25.5px" :color="this.importancet ? '#697b9e' : '#c9dfe0'" @click="selectImportance"></uni-icons>
		</label>
	</view>
	
</template>

<script>
	export default {
		props:['importance','selectedDate','selectedMonth','selectedYear'],
		data() {
			return {
				single:'',
				importancet:importance,
				yearNow: new Date().getFullYear(),
				monthNow: new Date().getMonth()+1,
				dateNow: new Date().getDate(),
				selectedDate:this.et.selectedDate,
				selectedMonth:this.et.selectedMonth,
				selectedYear:this.et.selectedYear,
			}
		},
		methods:{
			confirm(e){
				// console.log(e)
				this.single=e
				this.selectedDate=Number(e.slice(8,10))
				this.selectedMonth=Number(e.slice(5,7))
				if(e.length>12){
					this.selectedHour=e.slice(11,14)
					this.selectedMin=e.slice(14,17)
					this.selectedSec=e.slice(17,20)
				}
				else{
					this.selectedHour=''
					this.selectedMin=''
					this.selectedSec=''
				}
				this.$emit("importanceSelect",)
			},
			selectImportance(){
				this.importancet=!this.importancet
			},
		},
	}
</script>

<style>
	.inputImportanceEmergence{
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding:4.3px;
	}
	.dateSelect{
		flex:1;
		background-color: #f0f8fe;
		border: 1px solid #c3cdd7;
	}
	
	.emergenceSelect{
		/* flex:1; */
		text-align: center;
		font-size: 15px;
		line-height: 15px;
		padding:4.3px;
	}
</style>