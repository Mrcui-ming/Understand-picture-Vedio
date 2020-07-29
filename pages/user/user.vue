<template>
	<view class="user">
		<image mode="widthFix" class="img" src="http://www.itcast.cn/2018czydz/images/gywmban.jpg"></image>
		<view class="info">
			<view @click="playphoto">联系电话: 17792129825 ( 点击拨打 )</view>
			<view>联系地址: 陕西省榆林市绥德县金阳光小区</view>
		</view>
		<map scale="18" class="map":latitude="latitude" :longitude="longitude"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: 37.492852,
				longitude: 110.272313
			}
		},
		methods: {
			playphoto(){
				uni.makePhoneCall({
					phoneNumber: "17792129825"
				})
			}
		}
	}
</script>

<style scoped lang="less">
.user{
	width: 100vw;
	height: 100vh;
	.img{
		width: 750rpx;
		height: 320rpx;
		vertical-align: top;
	}
	.info{
		padding: 10rpx 20rpx;
		font-size: 30rpx;
		view{
			height: 50rpx;
			line-height: 50rpx;
			border-bottom: 1px solid #eee;
		}
	}
	.map{
		width: 750rpx;
		height: calc(100vh - 242px);
	}
}

</style>
