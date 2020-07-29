<template>
	<!-- 实现移动端滚动的标签 必须给高度和 scroll-y -->
	<scroll-view class="better-scroll" scroll-y v-if="recommends.length !== 0" @scrolltolower="handleTolOWER">
		<!-- recommend-top -->
		<view class="recommend-top">
			<view class="recommend-container" v-for="img in recommends">
				<image :key="img._id" :src="img.thumb" mode="" @click="navGiteToDetail(img.target)"></image>
			</view>
		</view>
		<!-- recommend-center -->
		<view class="recommend-center">
			<view class="cneter-nav">
				<text class="center-nav-left"><text style="font-size: 50rpx; margin-right: 10rpx;">{{monthes.stime | getYear}}</text>
					/ {{monthes.stime | getMinutes}} 月</text>
				<text class="center-nav-params">{{monthes.title | getTitle}}</text>
				<text class="center-nav-right">
					更多
					<text class="center-nav-right-icon"></text>
				</text>
			</view>
			<view class="recommend-center-lists">
				<view class="lists-item" v-for="(img,index) in monthes.items" :key="img._id">
					<image :src="img.thumb + img.rule.replace('$<Height>',200)" 
					mode="aspectFit"
					@click="getImgDetail(monthes.items,index)"></image>
				</view>
			</view>
		</view>
		<!-- recommends-hotimages -->
		<view class="recommend-hotimages">
			<view class="recommend-hotimages-title">
				<text class="shuxian"></text> <text class="title">热门</text>
			</view>
			<view class="hotimages">
				<view class="hotimage-list" v-for="(img,index) in vertical" :key="img._id">
					<image :src="img.thumb" @click="getImgDetail(vertical,index)"></image>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				recommends: [],
				monthes: {},
				vertical: [],
				params: {
					//获取几条
					limit: 30,
					order: "hot",
					skip: 8
				}
			}
		},
		created() {
			this.getRecommends();
		},
		mounted() {
			uni.setNavigationBarTitle({title: "推荐"});
		},
		filters: {
			getYear(e) {
				return new Date(e).getFullYear().toString().substr(2);
			},
			getMinutes(e) {
				let minutes = new Date(e).getMinutes()
				return  minutes < 10 ? "0" + minutes : minutes;
			},
			getTitle(e) {
				return e && e.replace("。", "")
			}
		},
		methods: {
			//用户上拉获取新的数据
			handleTolOWER() {
				//1 跳过原来的三十条 请求新的30条数据
				this.params.skip += this.params.limit;
				//2 在原来的数组上追加新的30条数据
				this.getRecommends();
			},
			navGiteToDetail(target){
				console.log(target)
				uni.navigateTo({
					url: `/pages/detail/detail?id=${target}` 
				})
			},
			getRecommends() {
				uni.showLoading({title: "加载中"});
				uni.request({
					method: "GET",
					url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
					data: this.params,
					success: res => {
						console.log(res)
						uni.hideLoading();
						let response = res.data.res;
						console.log(response)
						if(response){
							if(this.recommends.length == 0){
								this.recommends = response.homepage[1].items;
								this.monthes = response.homepage[2];
							}
							this.vertical = [
								...this.vertical,
								...response.vertical
							];
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
		}
	}
</script>

<style lang="less" scoped>
	.better-scroll {
		height: calc(100vh - 74rpx);
	}

	.recommend-top {
		display: flex;
		flex-wrap: wrap;

		.recommend-container {
			width: 50%;
			height: 250rpx;
			padding: 6rpx;
			box-sizing: border-box;
			background-color: #fff;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.recommend-center {
		.cneter-nav {
			display: flex;
			height: 88rpx;
			font-size: 35rpx;
			line-height: 88rpx;
			padding: 0 10rpx;

			.center-nav-params {
				flex: 1;
				font-weight: 700;
				color: #0f0f0f;
				transform: translateY(8rpx);
			}

			.center-nav-left,
			.center-nav-right {
				width: 200rpx;
				height: 100%;
				color: rgb(255, 61, 113);

				.center-nav-right-icon {
					font-family: "icomoon";
				}
			}
		}

		.recommend-center-lists {
			display: flex;
			flex-wrap: wrap;

			.lists-item {
				width: 33.33%;
				height: 400rpx;
				box-sizing: border-box;
				background-color: #fff;
				overflow: hidden;
				border: 1px solid #fff;

				image {
					height: 100%;
					display: block;
					transform: translateX(-300rpx);
					vertical-align: top;
				}
			}
		}
	}

	.center-nav-right {
		text-align: right;
		transform: translateY(8rpx);
	}

	.recommend-hotimages {

		// padding-bottom: 100rpx;
		.recommend-hotimages-title {
			display: flex;
			height: 74rpx;
			line-height: 74rpx;

			.shuxian {
				width: 10rpx;
				height: 50rpx;
				background-color: red;
				margin: 15rpx 10rpx;
			}
		}

		.hotimages {
			display: flex;
			flex-wrap: wrap;

			.hotimage-list {
				width: 33.33%;
				height: 400rpx;
				box-sizing: border-box;
				background-color: #fff;
				overflow: hidden;
				border: 1px solid #fff;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

	}
</style>
