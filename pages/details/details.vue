<template>
	<view class="container" v-if="Object.keys(details).length!==0">
		<image class="repeat-img" :src="details.images.small" />
		<view class="shade">
			<image class="repeat-img" :src="details.images.small"/>
			<view class="title">{{details.title}}</view>
			<view class="nar">
				<view class="eva">评分：{{details.rating.average||"即将上映"}}</view>
				<view class="des">摘要</view>
				<view class="cont">
					{{details.summary}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {details} from '../../api'
	export default {
		data() {
			return {
				details:[]
			}
		},
		onLoad(option) {
			uni.showLoading({
				title:'加载中'
			});
			details(option.id).then((res)=>{
				let [err,data]=res;
				this.details=data.data;
				uni.hideLoading()
			})
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.container{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	.repeat-img{
		width: 100%;
		height: 100%;
	}
	.shade{
		z-index: 1;
		height: 100%;
		width: 100%;
		position: absolute;
		background: rgba($color: #ffffff, $alpha: 0.7);
		overflow-y: auto;
		top: 0;
		text-align: center;
		
		image{
			width: 650upx;
			height: 800upx;
			margin-top: 40upx;
		}
		.title{
			font-weight: bold;
			font-size: 40upx;
		}
		.nar{
			padding: 20upx 60upx;
			.eva{
				font-size: 30upx;
				text-align: left;
				margin-top: 20upx;
			}
			.des{
				font-size: 50upx;
				font-weight: bold;
				text-align: left;
				margin-top: 20upx;
			}
			.cont{
				font-size: 40upx;
				margin-top: 20upx;
			}
		}
	}
}
</style>
