<template>
	<view class="container">
		<scroll-view class="scroll" scroll-y="true" :style="{height:navHeight+'px'}" @scrolltolower="scrolltolower">
			<view class="wrap" v-for="(item,index) in moviesList" :key="index">
				<view class="left">
					<image :src="item.images.small"/>
				</view>
				<view class="right">
					<view class="title">{{item.title}} <text>{{item.rating.average||"即将上映"}}</text></view>
					<view>{{item.year}}</view>
					<view>{{item.genres}}</view>
				</view>
			</view>		
			<view v-if="isShow" style="text-align: center;font-size: 16px; color: #808080;">没有更多数据了</view>
		</scroll-view>
	</view>
</template>

<script>
	import {comingSoon,newMovies,top250} from '../../api'
	export default {
		data() {
			return {
				testList:["即将上映的电影","豆瓣电影新片榜","豆瓣电影Top250"],
				typeNum:-1,
				start:0,
				moviesList:[],
				isShow:false,
				pH:0, //窗口高度
				navHeight:0, //元素的所需高度
			}
		},
		onLoad(option) {
			console.log(option);
			uni.showLoading({
				title:'加载中',
				mask:true
			});
			// console.log(this.testList.indexOf(option.title));//0,1,2
			this.typeNum=this.testList.indexOf(option.title);
			this.getClassData(this.typeNum)({city:this.$store.state.city,count:10,start:0}).then((res)=>{
				let [err,data]=res;
				this.moviesList=data.data.subjects
				uni.hideLoading()
			})
		},
		onReady() {
			let that=this;
				uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
					success(res) { //成功回调函数
						that._data.pH=res.windowHeight //windoHeight为窗口高度，主要使用的是这个
						let titleH=uni.createSelectorQuery().select(".scroll"); //想要获取高度的元素名（class/id）
						titleH.boundingClientRect(data=>{
							let pH=that._data.pH; 
							that._data.navHeight=pH-data.top  //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
						}).exec()
					}
				})
		
		},
		methods: {
			scrolltolower(){
				uni.showLoading({
					title:'加载中',
					mask:true
				});
				console.log('yes');
				this.start+=10;
				console.log(this.start);
				this.getClassData(this.typeNum)({city:this.$store.state.city,count:10,start:this.start}).then((res)=>{
					let [err,data]=res;
					let subjects=data.data.subjects;
					if(subjects.length===0){
						this.isShow=true;
					}
					Array.prototype.push.apply(this.moviesList,data.data.subjects);
					uni.hideLoading()
				})
			},
			getClassData(state){
				let fnList=[comingSoon,newMovies,top250];//这个数组指的是这三个接口
				return fnList[state];
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.container{
	  padding-bottom: 0;  
	  padding-bottom: constant(safe-area-inset-bottom);  
	  padding-bottom: env(safe-area-inset-bottom); 
	background: #f3e6cf;
	overflow: hidden;
	height: 100%;
	.scroll{
		// height: 615*2rpx;
		.wrap{
			display: flex;
			border-bottom: 1px solid #808080;
			padding: 20upx 30upx;
			.left{
				height: 205upx;
				width: 180upx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.right{
				flex: 1;
				margin-left: 20upx;
				.title{
					font-weight: bold;
					font-size: 110%;
					color: black;
					text{
						float: right;
						background: red;
						color: white;
						border-radius: 4px;
						font-size: 60%;
						padding: 2upx 6upx;
					}
				}
				view{
					font-size: 70%;
					color: #808080;
				}
			}
		}
	}
}
</style>
