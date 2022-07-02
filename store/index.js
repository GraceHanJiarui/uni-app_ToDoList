
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	actions:{
		addTokenNumber(context,value){
			context.commit('ADDTOKENNUMBER',value)
		}
	},
	mutations:{
		ADDTOKENNUMBER(state,value){
			state.tokenNumber+=value
		}
	},
	state:{//存放状态
		tokenNumber:0,
		
	}
})
export default store