<template>
	<scroll-view class="better-scroll" scroll-y @scrolltolower="handOnScroll">
		<!-- swiper start -->
		<view class="swiper">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="home-swiper">
				<swiper-item v-for="item in banners"
				:key="item.id">
					<image 
					:src="item.thumb"
					class="bannerimg">
					</image>
				</swiper-item>
			</swiper>
		</view>
		<!-- swiper end -->
		<!-- albumitems start-->
		<view class="albumitems">
			<view class="album-item" 
			v-for="(item,index) in albums"
			:key="item.id"
			@click="naviGationToDetail(item.id)">
				<view class="album-item-img">			
						<image mode="aspectFill" :src="item.lcover"></image>
				</view>
				<view class="album-item-info">
					<view class="item-name">{{item.name}}</view>
					<view class="item-desc">{{item.desc}}</view>
					<view class="item-concernbox"> + 关注</view>
				</view>
			</view>
		</view>
		<!-- albumitems end -->
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					//获取几条
					limit: 30,
					order: "new",
					skip: 0
				},
				banners: [],
				albums: [] 
			}
		},
		methods: {
			handOnScroll() {	
				this.params.skip += this.params.limit;
				this.getAlbumsinfo();
			},
			getAlbumsinfo() {
				uni.showLoading({title:"加载中"});
				uni.request({
					url:"http://157.122.54.189:9088/image/v1/wallpaper/album",
					data: this.params,
					success: res => {
						console.log(res)
						let response = res.data.res;
						console.log(response)
						uni.hideLoading();
						if(response){
							if(this.banners.length == 0){
								this.banners = response.banner
							}
							this.albums = [
								...this.albums,
								...response.album
							];
						}
					}
				})
			},
			naviGationToDetail(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}` 
				})
			}
		},
		created() {
			this.getAlbumsinfo();
		},
		mounted() {
			uni.setNavigationBarTitle({title: "专辑"});
		}
	}
</script>

<style scoped>
	/* 非常优秀的算法 swiper中img无法撑开swiper 
	通过把img的w/h的比例 换算成swiper的w/h 
	这样img在无论多大的屏幕下都可以适配，swiper在无论多大的屏幕下都可以自适应高度 */
.better-scroll {
	height: calc(100vh - 74rpx);
}
.home-swiper{
	height: calc(100vw / 2.2);
}
.bannerimg{
	width: 100%;
	height: 100%;
}
.album-item{
	position: relative;
	display: flex;
	width: 100%;
	height: 200rpx;
	margin: 10rpx 0;
}
.album-item-img{
	width: 200rpx;
	height: 200rpx;
}
.album-item-img image{
	width: 200rpx;
	height: 200rpx;
}
.album-item-info{
	flex: 1;
	padding: 0 20rpx;
	overflow: hidden;
}
.item-name{
	overflow: hidden;
	font-size: 35rpx;
}
.item-desc{
	font-size: 28rpx;
	width: 100%;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	margin: 15rpx 0;
}
.item-concernbox{
	position: absolute;
	bottom: 10rpx;
	right: 20rpx;
	width: 90rpx;
	height: 50rpx;
	border: 1.5px solid #ff52ac;
	color: #ff52ac;
	padding: 0 5rpx;
	border-radius: 6rpx;
	line-height: 50rpx;
	text-align: center;
	font-size: 25rpx;
}
</style>
