import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

//引入腾讯地图jssdk文件
import QQMapWX from '../static/js/qqmap-wx-jssdk.min.js'

import {getInTheaters} from "../api"

export default new Vuex.Store({
	//全局变量
	state:{
		city:"北京市",
		nowPlayingList:{}
	},
	// 同步方法,this.$store.comit("xxx");
	mutations:{
		
	},
	//Vuex属性计算，在视图里面当变量使用
	getters:{
		
	},
	//异步方法，this.$store.dispatch('xxx');
	actions:{
		getCity(context){
			uni.showLoading({
			    title: '加载中'
			});
			//1、授权接口
			uni.authorize({
				scope: 'scope.userLocation',
				success(){
					//3、引入腾讯地图
					let qqmapsdk = new QQMapWX({
						key: 'IQFBZ-RL6CR-4LQW3-WN6PX-U3B5V-JRFYG'
					});
					//2、获取经纬度api
					uni.getLocation({
					    type: 'gcj02',
					    success: function (res) {
							
							//4、逆地址解析
							qqmapsdk.reverseGeocoder({
								location:{
									latitude: res.latitude,
									longitude: res.longitude
								},
								success(res){
									context.state.city=res.result.address_component.city
									//console.log(res.result.address_component.city);//城市
									//5、引用api里的promise，将数据传入
									getInTheaters({
										start:'0',
										count:'8',
										city:context.state.city,
									}).then(res=>{
										//6、promise返回后，获取数据赋值
										let [error,data]=res;
										// console.log(data);
										//7、这里结合首页赋值
										context.state.nowPlayingList=data.data;
										// console.log(context.state.nowPlayingList);
										uni.hideLoading();
									})
								}
							});
					    },
					});
					

				},
				fail(res){
					uni.showToast({
					    icon:"none",
						title: '需要获取你的位置，否则部分功能无法使用',
					    duration: 2000
					});
				}
				
			})
			
		}
	}
})