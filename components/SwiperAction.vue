<template>
	<view 
	@touchstart="onTouchstart"
	@touchend="onTouchend">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "SwiperAction",
		data() {
			return {
				startX: "",
				startY: "",
				startTime: ""
			};
		},
		methods:{
			onTouchstart(e){
				this.startX = e.changedTouches[0].clientX;
				this.startY = e.changedTouches[0].clientY;
				this.startTime = Date.now();
			},
			onTouchend(e){
				//手指离开时间总没有touches[0] 可以用changedTouches[0];
				const endX = e.changedTouches[0].clientX;
				const endY = e.changedTouches[0].clientY;
				const endTime = Date.now();
				let crossover = ""
				// 上下Y轴是为了优化用户体验 让其左右滑动的时候水平控制在一定的区域
				//超过这个区域就认为是在上下拖动屏幕,而不是左右滑动。
				if(Math.abs(endX - this.startX)  > 20 && Math.abs(endY - this.startY) < 10){
					if(endX - this.startX > 0){
						crossover = "right";
					}else{
						crossover = "left";
					}
					this.$emit("onTouchend",crossover);
				}
				return;
			}
		}
	}
</script>

<style>

</style>
