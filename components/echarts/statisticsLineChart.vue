<template>
	<view>
		<echarts :option="option" style="height: 300px;" @click="echartsClick"></echarts>
		<!-- <button @click="updateClick">切换数据</button> -->
	</view>
</template>

<script>
	import echarts from '@/components/echarts/echarts.vue'
	export default {
		data() {
			return {
				// option: {},
				option2: {
					notMerge: true, // 自定义变量：true代表不合并数据，比如从折线图变为柱形图则需设置为true；false或不写代表合并
					tooltip: {
						trigger: 'axis',
						positionStatus: true,
						formatterStatus: false, // 自定义变量：是否格式化tooltip，设置为false时下面三项均不起作用
						formatterUnit: '元', // 自定义变量：数值后面的单位
						formatFloat2: true, // 自定义变量：是否格式化为两位小数
						formatThousands: true // 自定义变量：是否添加千分位
					},
					legend: {
						data: ['', '']
					},
					grid: {
						left: '8%',
						right: '8%',
						bottom: '8%',
						containLabel: true
					},
					xAxis: [{
						// name: '位移（m）',
						// nameLocation: 'middle', //轴位置
						// nameGap: 26, //name名字与轴线间距
						// type: 'value',
						data:['1','2','3','4','5','6','7'],
						axisLine: {
							onZero: false
						}
					}],
					yAxis: [{
						name: '载荷（KN）',
						nameLocation: 'middle', //轴位置
						nameGap: 26, //name名字与轴线间距
						type: 'value',
						axisLine: {
							onZero: false
						}
					}],
					series: [{
						id: 'a',
						type: 'line',
						// smooth: true,
						symbolSize: 0,
						data: [
							// this.$store.state.
							3,5,6,8,0,2,4
						]
					}]
				},
				option: {
					//标题
					title:{
						text: "专注时长统计"
					},
					//提示框
					tooltip: {
						trigger: 'axis',
					},
					// 图例组件
					legend:{
						show:true,
						data:['专注时长']
					},
					//网格图表大小配置
					grid:{
						left:'3%',
						containLabel:true
					},
					toolBox:{
						show: true,
						    feature: {
						      dataZoom: {
						        yAxisIndex: "none"
						      },
						      dataView: {
						        readOnly: false
						      },
						      magicType: {
						        type: ["line", "bar"]
						      },
						      restore: {},
						      saveAsImage: {}
						    }
					},
					// notMerge: true, // 自定义变量：true代表不合并数据，比如从折线图变为柱形图则需设置为true；false或不写代表合并
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
						boundaryGap:false
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						name:"专注时长",
						data: [120, 200, 150, 80, 70, 110, 130],
						type: 'line',
						// showBackground: true,
						backgroundStyle: {
							color: 'rgba(220, 220, 220, 0.8)'
						}
					}]
				}
			};
		},
		components: {
			echarts
		},
		onLoad() {
			// this.option = this.option2
		},
		methods: {
			/**
			 * 点击事件
			 * @param {Object} params
			 */
			echartsClick(params) {
				console.log('点击数据', params)
			},
			/**
			 * 切换数据
			 */
			updateClick() {
				if (this.option === this.option2) {
					this.option = this.option3
				} else {
					this.option = this.option2
				}
			}
		}
	};
</script>

<style></style>