<template>
	<view>
		数据统计页
		<statistics-line-chart></statistics-line-chart>
		<statistics-gauge-chart></statistics-gauge-chart>
	</view>
</template>

<script>
	import statisticsLineChart from '../../components/echarts/statisticsLineChart.vue'
	import statisticsGaugeChart from '../../components/echarts/statisticsGaugeChart.vue'
	export default {
		data() {
			return {
				}
			},
		components:{
			statisticsLineChart,
			statisticsGaugeChart
		}
			
	}
</script>

<style>
</style>
