<template>
	<view class="container">
		<!-- 轮播 -->
		<view class="bannerList">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="(item,index) in nowPlayingList.subjects" :key="index" >
					<image class="slider" mode="widthFix" style="width: 100%;" :src="item.images.large" @click="toDetails(item.id)"/>
				</swiper-item>
			</swiper>
		</view>
		<!-- 推荐 -->
		<view class="list"  v-for="(item,index) in moviesList" :key="index">
			<view class="title">{{item.title}}<text @click="toClass(item.title)">></text></view>
			<scroll-view scroll-x="true">
				<view class="slider" v-for="(it,idx) in item.subjects" :key="idx">
					<image mode="aspectFill" :src="it.images.small" @click="toDetails(it.id)"></image>
					<view class="name">{{it.title}}</view>
				</view>
			</scroll-view>	
		</view>
		<view style="color: #cecece;font-size: 90%;text-align: center;">--到底了--</view>
	</view>
</template>

<script>
	import {comingSoon,newMovies,top250} from '../../api'
	export default {
		data() {
			return {
				moviesList:[]
			}
		},
		onReady() {
			this.$store.dispatch("getCity");
			this.pageInit();
			
			},
		computed:{
			nowPlayingList(){
				// console.log(this.$store.state.nowPlayingList);
				return this.$store.state.nowPlayingList;
				},
				
		},
		methods: {
			pageInit(){
				uni.showLoading({
					title:'加载中'
				});
				Promise.all([
					this._comingSoon(),
					this._newMovies(),
					this._top250()
				]).then((res)=>{
					uni.hideLoading();
					let rel=[];
					res.map((item)=>{
						rel.push(item[1].data)
					})
					// console.log(rel);
					this.moviesList=rel;
					console.log(this.moviesList);
					})
				
			},
			toDetails(id){
				uni.navigateTo({
					url:"../details/details?id="+id
				})
			},
			toClass(title){
				uni.navigateTo({
					url:"../class/class?title="+title
				})
			},
			_comingSoon(){
				return comingSoon({
					start: "0",
					count: "8",
					city: this.$store.state.city
				})
			},
			_newMovies(){
				return newMovies({
					start: "0",
					count: "8",
					city: this.$store.state.city
				})
			},
			_top250(){
				return top250({
					start: "0",
					count: "8",
					city: this.$store.state.city
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.container{
	background: #2C405A;
	.bannerListet{
		.swiper{
			height: 400rpx;
			.slider{
				width: 100%;
			}
		}
	}
	.list{
		margin-top: 20upx;
		background: #2e4461;
		margin-bottom: 10upx;
		.title{
			color: #FFFFFF;
			margin-left: 20upx;
			padding: 10upx 0;
			
			text{
				float: right;
				padding: 0 10upx;
			}
		}
		scroll-view{
			white-space: nowrap;
			.slider{
				width: 180upx;
				height:250upx;
				display: inline-block;
				text-overflow: ellipsis;
				margin-left:20upx;
				image{
					width: 100%;
					height:100%;
				}
				.name{
					text-align: center;
					color:#fff;
					overflow: hidden;
					font-size: 90%;
				}
			}
		}
	}	
}

</style>
/view/photo/s_ratio_poster/public/p25791897