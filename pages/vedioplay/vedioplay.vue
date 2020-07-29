<template>
	<view class="vedioplay">
		<view class="vedio-bg">
			<image :src="vedioItem.img" mode="widthFix"></image>
		</view>
		<view class="vedioplay-hd">
			<view class="iconmuted" @click="mutedChanged">{{muted ? " " : "  "}}</view>
			<view class="iconzhuanfa hidebtn">
				<button type="default" open-type="share"></button>
			</view>
		</view>
		<view class="vedioplay-bd">
			<video :muted="muted" :src="vedioItem.video" controls objectFit="fill"></video>
		</view>
		<view class="vedioplay-ft" @click="downLoadVideo">下载高清</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				vedioItem: {},
				muted: false
			}
		},
		methods: {
			mutedChanged(){
				this.muted = !this.muted;
			},
		    async downLoadVideo(){
				await uni.showLoading({
					title: "下载中"
				})
				const result = await uni.downloadFile({
					url: this.vedioItem.video
				})
				const { tempFilePath }  = result[1]; 
				uni.hideLoading();
				await uni.saveVideoToPhotosAlbum({
					filePath: tempFilePath,
					success() {
						uni.showToast({
							title: "下载成功"
						})
					},
					fail() {
						uni.showToast({
							title: "已取消",
							icon: "none"
						})
					}
				})
			}
		},
		onLoad(options){
			this.vedioItem = getApp().globalData.vedioItem;
			console.log(getApp().globalData);
		}
	}
</script>

<style lang="less">
.vedioplay{
	position: relative;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	
	.vedio-bg{
		position: absolute;
		width: 100%;
		height: 100%;
		filter: blur(25px);
		z-index: -1;
		
		image{
			width: 100%;
		}
	}
	.vedioplay-hd{
		height: 85rpx;
		display: flex;
		justify-content: flex-end;
		margin-top: 10rpx;
		.iconmuted,
		.iconzhuanfa{
			width: 85rpx;
			margin-right: 20rpx;
			font-size: 40rpx;
			border-radius: 50%;
			text-align: center;
			line-height: 85rpx;
			color: #fff;
			background: rgba(0,0,0,0.3);
			font-family: "icomoon";
		}
	}
	.vedioplay-bd{
		position: absolute;
		top: 50%;
		left: 50%;
		width: 360rpx;
		height: 600rpx;
		transform: translate(-50%,-50%);
		video{
			width: 100%;
			height: 100%;
		}
	}
	
	.vedioplay-ft{
		position: absolute;
		top: 1000rpx;
		width: 360rpx;
		height: 80rpx;
		border-radius: 40rpx;
		margin-left: 50%;
		text-align: center;
		line-height: 80rpx;
		border: 1px solid #fff;
		color: #fff;
		transform: translateX(-50%);
		background: rgba(0,0,0,0.3);
	}
}
.hidebtn{
	position: relative;
	overflow: hidden;
	button{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
}
</style>
