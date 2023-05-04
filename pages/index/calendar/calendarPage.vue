<template>
<view id="app" @touchstart="touchstart" @touchend="touchend">
    <view class="flex">
        <view>
            <calendar
                ref="calendar1"
                :events="calendar1.events" 
                :lunar="calendar1.lunar" 
                :value="calendar1.value" 
                :begin="calendar1.begin" 
                :end="calendar1.end" 
                :weeks="calendar1.weeks" 
                :months="calendar1.months" 
                @select="calendar1.select"
                @selectMonth="calendar1.selectMonth"
                @selectYear="calendar1.selectYear"></calendar>
        </view>
    </view>

</view>
</template>

<script>
 
import calendar from './calendar.vue'

export default {
	data(){
		return{
			ts:0
		}
	},
    name: 'app',
    components: {
        calendar
    },
	onReady() {
		console.log(this.calendar1.value)
	},
    data(){
        return {
            calendar1:{
                value:[new Date().getFullYear(),new Date().getMonth()+1,new Date().getDate()], //默认日期
				// value:[2022,4,22],
                // lunar:true, //显示农历
                weeks:['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                events:{
                    // '2017-7-7':'$408',
                    // '2017-7-20':'$408',
                    // '2017-7-21':'$460',
                    // '2017-7-22':'$500',
                },
                select(value,tempSelectedIsSame){
                    console.log(value.toString(),tempSelectedIsSame);
                },
                selectMonth(month,year){
                    console.log(year,month)
                },
                selectYear(year){
                    console.log(year)
                },
                timestamp:Date.now()
            },
          }
    },
    methods:{
		touchstart(e){
			// console.log(e.touches[0].pageY,"ts")
			this.ts=e.touches[0].pageY
		},
		
		touchend(e){
			// console.log(e.changedTouches[0].pageY,"te")
			if(e.changedTouches[0].pageY-this.ts<-140){
				this.ts=0
				this.$emit("calendarReturn")
			}
		},
    }
}
</script>

<style>
/*demo*/
.flex{
    box-sizing: border-box;

    display: flex;
    justify-content: space-between;
    align-items: top;
    flex-flow:row wrap
}
.flex>view{
    /* margin:10px; */
    /* padding:20px; */
    width:100%;
	/* height: 100vh; */
    /* min-width:300px; */
    /* border: 1px solid #eee; */
    /* border-radius: 2px; */
    position: relative;
}

/* 没有用但字体可以 */
/* .flex>view>span{
    position: absolute;
    left:0px;
    top:0px;
    padding:5px 10px;
    font-family: "PingFang SC","Hiragino Sans GB","STHeiti","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
    font-size:10px;
    border-radius:0 0 2px 0;
    background:#ea6151;
    color:#fff;
} */

</style>