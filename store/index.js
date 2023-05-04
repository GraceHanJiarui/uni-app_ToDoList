
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项

const store = new Vuex.Store({
	// actions:{
	// 	changeTaskBox(context,value){
			
	// 	}
	// 	addTokenNumber(context,value){
	// 		context.commit('ADDTOKENNUMBER',value)
	// 	}
	// },
	mutations:{
		CHANGELASTDATE(state, date){
			uni.setStorageSync('lastDate', date);
		},
		ADDTOKENNUMBER(state,value){
			state.tokenNumber+=value
			uni.setStorageSync('token', state.tokenNumber);
		},
		SUBTRACTTOKENNUMBER(state,value){
			state.tokenNumber-=value
			uni.setStorageSync('token', state.tokenNumber);
		},
		ADDTASKNUMBER(state,value){
			state.taskAccomplishNumber+=value
			uni.setStorageSync('taskAccomplishNumber', state.taskAccomplishNumber);
		},
		ADDDAILYTODO(state, item){
			state.todoBoxDaily.push(item)
			uni.setStorage({
				key: 'todoBoxDaily',
				data: state.todoBoxDaily,
				success: function () {
					console.log("state.todoBoxDaily",state.todoBoxDaily);
				}
			})
		},
		CHANGEDAILYTODO(state, x){
			uni.setStorage({
				key: 'todoBoxDaily',
				data: x,
				success: function () {
					console.log('success4');
				}
			})
			state.todoBoxDaily = uni.getStorageSync('todoBoxDaily')
		},
		DELETEDAILYTODO(state, id){
			const i = state.todoBoxDaily.findIndex((x) => x.id === id)
			if(i !==-1){
				state.todoBoxDaily.splice(i,1)
			}
			uni.setStorage({
				key: 'todoBoxDaily',
				data: state.todoBoxDaily,
				success: function () {
					console.log('success4');
				}
			})
		},
		// CHANGETASKBOX1(state, value){
		// 	state.todoBox1
		// }
	},
	state:{//存放状态
		tokenNumber:uni.getStorageSync('token') || 0,
		taskAccomplishNumber:uni.getStorageSync('taskAccomplishedNumber') || 0,
		todoBox1:uni.getStorageSync('todoBox1') || [],
		todoBox2:uni.getStorageSync('todoBox2') || [],
		todoBox3:uni.getStorageSync('todoBox3') || [],
		todoBox4:uni.getStorageSync('todoBox4') || [],
		todoBoxDaily:uni.getStorageSync('todoBoxDaily') || [],
		todoBoxWeekly:uni.getStorageSync('todoBoxWeekly') || [],
		todoBoxMonthly:uni.getStorageSync('todoBoxMonthly') || [],
		lastDate: uni.getStorageSync('lastDate') || [],
		languages: 0,
	}
})
export default store