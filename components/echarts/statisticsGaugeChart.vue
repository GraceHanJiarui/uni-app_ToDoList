<template>
	<view>
		<echarts :option="option" style="height: 300px;"></echarts>
	</view>
</template>

<script>
	import echarts from '@/components/echarts/echarts.vue'
	export default {
		name:"statisticsGaugeChart",
		data() {
			return {
				option : {
				  tooltip: {
				    formatter: '{b} : {c}%'
				  },
				  series: [
				    {
				      name: 'Pressure',
				      type: 'gauge',
				      progress: {
				        show: true
				      },
				      detail: {
				        valueAnimation: true,
				        formatter: '{value}'
				      },
				      data: [
				        {
				          value: 50,
				          name: 'SCORE'
				        }
				      ]
				    }
				  ]
				}
			}
		}
	}
</script>

<style>

</style>