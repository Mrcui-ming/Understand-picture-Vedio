<template>
	<view v-if="Object.keys(album).length !== 0">
		<!-- detail-bg start-->
		<view class="detail-bg">
			<image class="detail-bgimg" :src="album.cover" mode="widthFix"></image>
			<view class="detail-bottom">
				<view class="detail-bottom-title">{{album.name}}</view>
				<view class="detail-bottom-botton">关注专辑</view>
			</view>
		</view>
		<!-- detail-bg end-->
		<!-- detail-info start -->
		<view class="detail-info" v-if="Object.keys(album).length !== 0">
			<view class="detail-info-top">
				<image mode="widthFix" 
				class="header" 
				:src="album.user.avatar"
				></image>
				<text class="name">{{album.user.name}}</text>
			</view>
			<view class="info">
				<text>
					{{album.desc}}
				</text>
			</view>
		</view>
		<!-- detail-info end -->
		<!-- detail-lists start -->
		<view class="detail-lists" v-if="wallpapers.length !== 0">
			<view class="detail-list" 
			v-for="(item,index) in wallpapers"
			:key="item.id">
					<image :src="item.thumb + item.rule.replace('$<Height>',360)" 
					mode="widthFix"
					@click="getImgDetail(wallpapers,index)"></image>
			</view>
		</view>
		<!-- detail-lists end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: -1,
				params: {
					limit: 30,
					order: "new",
					skip: 0,
					first: 1
				},
				album: {},
				wallpapers: [],
				hasGet: true
			}
		},
		onLoad(options){
			console.log(options);
			// this.id = options.id;
			this.id = "5d5f8e45e7bce75ae7fb8278";
			this.getList();
		},
		onReachBottom(){
			if(this.hasGet){
				this.params.skip += this.params.limit;
				this.getList();
			}else{
				uni.showToast({
					title: "没有图片了",
					icon: "none"
				})
			}
		},
		methods: {
			getList() {
				uni.showLoading({title:"加载中"});
				uni.request({
					url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
					data: this.params,
					success: res => {
						const response = res.data.res;
						uni.hideLoading();
						console.log(response);
						if(response.album && response.wallpaper){
							if(Object.keys(this.album).length === 0){
								this.params.first = 0;
								this.album = response.album;
							}
							if(response.wallpaper.length !== 0){
								this.wallpapers = [...this.wallpapers,...response.wallpaper];
							}else{
								uni.showToast({
									title: "没有图片了",
									icon: "none"
								})
								this.hasGet = false;
							}
						}
					}
				})
			},
			getImgDetail(imgList,imgIndex) {
				getApp().globalData.imgList = imgList;
				getApp().globalData.imgIndex = imgIndex;
				uni.navigateTo({
					url: "/pages/imgdetail/imgDetail"
				})
			}
		},
		mounted(){
			uni.setNavigationBarTitle({
				title: "详情页"
			})
		}
	
	}
</script>

<style scoped lang="less">
.detail-bg{
	position: relative;
	
	.detail-bgimg{
		width: 100%;
	}
	
	.detail-bottom{
		position: absolute;
		display: flex;
		bottom: 20rpx;
		left: 0;
		right: 10rpx;
		justify-content: space-between;
		align-items: center;
	}
	
	.detail-bottom-title{
		color: #fff;
		margin-left: 10rpx;
	}
	
	.detail-bottom-botton{
		width: 150rpx;
		height: 70rpx;
		font-size: 28rpx;
		background-color: #ff4164;
		color: #fff;
		text-align: center;
		line-height: 70rpx;
		border-radius: 10rpx;		
	}
}

.detail-info{
	padding: 20rpx;
	border-bottom: 1px solid #ccc;
	.detail-info-top{
		.header{
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			vertical-align: middle;
			margin-right: 10rpx;
		}
		
		.name{
			font-size: 32rpx;
			font-weight: 700;
		}
	}
	
	.info{
		font-size: 28rpx;
		margin-top: 10rpx;
	}
	
}

.detail-lists{
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 10rpx;
	.detail-list{
		width: 33.33%;
		box-sizing: border-box;
		border: 1px solid #fff;
		overflow: hidden;	
		image{
			width: 100%;
			vertical-align: top;
		}
	}
}

</style>
