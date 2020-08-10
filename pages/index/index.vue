<template>
	<view class="content">
		<view class="nuter">
			<view :class="target==0?'active':''" @click="setIndex" data-index="0">
			 		111
			 </view>
			<view :class="target==1?'active':''" @click="setIndex" data-index="1">
					222
			 </view>
			<view :class="target==2?'active':''" @click="setIndex" data-index="1">
			 		333
			</view>
		</view>
		<swiper 
		:duration="500" 
		:current="thisindex"  
		:data-index='thisindex' 
		@change="toggle"
		circular>
			<swiper-item>
				<!-- 按顺序对应第一个的内容 -->
				1111111
			</swiper-item>
			<swiper-item>
				<!-- 按顺序对应第二个的内容 -->
				2222222
			</swiper-item>
			<swiper-item>
				<!-- 按顺序对应第三个的内容 -->
				3333333
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		// 只要上面的选项跟下面的swiper-item个数相同，直接加上面的个数，下面的会自动对应显示，很简便，拿来就能用
		data() {
			return {
				// 当前样式
				target:0,
				// 当前item位置
				thisindex:0,
			}
		},
		methods: {
			// 切换触发的事件
		toggle(e){
				let index = e.detail.current
				this.target = index
			},
		// 点击nav控制下面的展示
		setIndex(e){
			let index = e.currentTarget.dataset.index
			this.thisindex = index
		},
		}
	}
</script>

<style>
	.nuter{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: space-around;
		font-size: 35rpx;
	}
	.nuter view{
		flex: 1;
		font-size: 30rpx;
		text-align: center;
		transition: all 0.5s ease .1s;
		background-color: #f0f0f0;
	}
	.active{
		box-sizing: border-box;
		color: #007AFF;
		border-bottom: 5rpx solid #00aaff;
		background-color: #f3ffff;
		border-radius: 10rpx;
		box-shadow: 3px 3px 5px #888888;
	}
	swiper-item{
		width: 100%;
		overflow: hidden;
		text-align: center;
		line-height: 300rpx;
		/* background-color: red; */
	}
	.swiper-item{
		overflow-y: scroll;
		width: 99.5%;
		height: 99%;
		/* background-color: white; */
		/* height: 99%; */
		box-sizing: border-box;
		padding: 1rpx;
	}
</style>
