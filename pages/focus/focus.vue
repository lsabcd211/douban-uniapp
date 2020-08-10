<template>
	<view class="container" v-if="Object.keys(nowPlayingList).length!==0">
		<image :src="nowPlayingList.subjects[0].images.small" />
		<button class="start" type="primary" @click="toList">立即体验</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onReady() {
			this.$store.dispatch('getCity');
		},
		computed:{
			nowPlayingList(){
				// console.log(this.$store.state.nowPlayingList);
				return this.$store.state.nowPlayingList;
			}
		},
		methods: {
			toList(){
				uni.redirectTo({
					url:"../list/list"
				})
			}
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
	image{
		width: 100%;
		height: 100%;
	}
	.start{
		position: absolute;
		// text-align: center;
		font-size: 40upx;
		font-weight: bold;
		background: rgba($color: #e3e3e3, $alpha: 0.5);
		color: black;
		bottom: 40upx;
		left: 50%;
		transform: translate(-50%,-50%);
		border: 1px solid #C0C0C0;
		border-radius: 5px;
		// z-index: 1;
		
	}
}
</style>
