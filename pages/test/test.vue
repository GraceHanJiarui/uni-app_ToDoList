<template>
	<view>
		<view v-for="(i) in arr">
			name:{{i.name}},
			m:{{i.m}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				arr:[
					{
						"name":"Lisa",
						"m":"ghj"
					},
					{
						"name":"Felicity",
						"m":"dxt"
					}
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
</style>
