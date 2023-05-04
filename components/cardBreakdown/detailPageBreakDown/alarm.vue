<template>
	<view>
		<uni-icons type="notification-filled" size="80rpx" color="#c7b882" @click="addAlert"></uni-icons>
	</view>
</template>

<script>
	methods:{
		ringStart(){
			for(var i = 0; i<3; i++){
				(function(a){
					setTimeout(()=>{
						uni.vibrateLong({
							success: function () {
								console.log('success');
							},
							fail: function () {
								console.log('fail');
							},
							complete: function () {
								console.log('complete');
							}
						});
					},a*1200)
				})(i)
			}
		}
	}
</script>

<style>
</style>