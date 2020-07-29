<template>
	<view class="imgdetail-container" v-if="imgList.length !== 0">
		<view v-if="imgitem.user" class="imgdetail-title">
			<view class="imgdetail-title-header">
				<image :src="imgitem.user.avatar" mode="aspectFill"></image>
			</view>
			<view class="imgdetail-title-name">
				<view class="name">{{imgitem.user.name}}</view>
				<view class="time">{{createdtime}}</view>
			</view>
		</view>
		<view class="imgdetail-bg">
			<swiper-action @onTouchend="onTouchend">
					<image class="imgdetail-bgimg" 
					:src="imgitem.thumb" mode="widthFix"
					></image>
			</swiper-action>
		</view>
		<view v-if="imgitem.user" class="imgdetail-footer">
			<view class="Jizan">
				 {{imgitem.user.follower}}
			</view>
			<view class="collect">
				 收藏
			</view>
		</view>
		<view class="related-box">
			<view class="related-title">相关</view>
			<view class="related-ft">
				<view class="related-img">
					<image :src="imgsrc" mode="aspectFill"></image>
				</view>
				<view class="related-right">
					<view>
						专辑
					</view>
					<text>{{albums[0] && albums[0].name}}</text>
				</view>
			</view>
		</view>
		<view class="imgdetail-comment">
			<view class="imgdetail-comment-title">
				<text style="color: red;padding-right: 10rpx;">  </text>最热评论
			</view>
			<view v-if="comments.length !== 0" class="imgdetail-comment-info" v-for="(item,index) in comments">
				<view class="hd">
					<image :src="item.user.avatar" mode="widthFix"></image>
				</view>
				<view class="content">
					<text>{{item.user.name}} {{item.user.viptime | getTime}}</text>
					<text>{{item.content}}</text>
				</view>
			</view>
			<view v-if="comments.length === 0" style="font-size: 20rpx;">
				暂无最热评论
			</view>
		</view>
		<view class="buttonbox" @click="downLoadImg">
			<button type="warn">下载图片</button>
		</view>
	</view>
</template>

<script>
	import SwiperAction from "components/SwiperAction.vue";
	//处理时间格式的库  
	import moment from "moment";
	//改变显示出来的语言 改为中文
	moment.locale("zh-cn")
	export default {
		name: "imgDetail",
		data() {
			return{
					//全局传递过来的图片数组变量
					imgList: [],
					imgIndex: 0,
					//从图片数组中取出当前需要的图片
					imgitem: {},
					createdtime: "",
					//评论
					albums: [],
					comments: [],
					hots: [],
			}
		},
		components:{
			SwiperAction
		},
		computed:{
			imgsrc() {
				if(this.albums[0]){
					return this.albums[0].cover
				}
			}
		},
		filters:{
			getTime(e) {
				return moment(e * 1000).fromNow();
			}
		},
		methods: {
			//发送请求
			getComment(id) {
				uni.showLoading({title:"加载中"});
				uni.request({
					url: `http://157.122.54.189:9088/image/v2/wallpaper/wallpaper/${id}/comment`,
					success: res => {
						uni.hideLoading();
						const response = res.data.res;		
							if(response && response.album.length !== 0){
								this.albums = response.album;
								this.comments = response.comment;
								this.hots = response.hot;
							
							}else{
								this.comments = [];
								this.albums = [
									{
										name: "暂无相关",
										cover: this.imgList[0].thumb
									}
								]
							}	
					}
				})
			},
			//封装组建后，组件传递过来的方法. 子传父事件.
			onTouchend(e) {
				//如果是左滑并且当前图片不是最后一张的时候，执行下一张
				if(e === "left" && this.imgIndex < this.imgList.length - 1){
					this.imgIndex++;
					this.nextPage();
				}//如果是右滑并且当前图片不是第一张的时候，执行上一张
				else if(e === "right" && this.imgIndex !== 0){
					this.imgIndex--;
					this.nextPage();
				}//不属于其他俩种情况的时候，必然是处于最后一张或者是第一张，显示toast
				else{
					uni.showToast({
						title: "没有图片了",
						icon: "none"
						
					})
				}
			},
			//切换页面数据 发送请求
			nextPage() {
				this.imgitem = this.imgList[this.imgIndex];
				//计算出距离当前的时间
				this.createdtime = moment(this.imgitem.atime * 1000).fromNow();
				this.getComment(this.imgitem.id);
			},
			//下载图片
			async downLoadImg() {
				await uni.showLoading({title: "下载中"});
				//下载文件
				const result = await uni.downloadFile({
					url: this.imgitem.img
				});		
				const { tempFilePath } = result[1];
				uni.hideLoading();
				//将图像保存到相册
				const result2 = await uni.saveImageToPhotosAlbum({
					filePath: tempFilePath,
					success() {
						uni.showToast({
							title: "下载成功"
						})
					},
					fail() {
						uni.showToast({
							title: "已取消"
						})
					}
				})
			}
		},
		created() {
			uni.setNavigationBarTitle({title:	"图片详情页"});
			this.imgList = getApp().globalData.imgList;
			this.imgIndex = getApp().globalData.imgIndex;
			this.nextPage();
		}
	}
</script>

<style scoped>
.imgdetail-title{
	display: flex;
	height: 100rpx;
	padding: 20rpx;
}
.imgdetail-title-header{
	width: 100rpx;
	border-right-color: #007AFF;
	overflow: hidden;
	margin-left: 20rpx;
}
.imgdetail-title-header image{
	width: 100%;
	height: 100%;
	border-radius: 50%;
}
.imgdetail-title-name{
	display: flex;
	flex: 1;
	justify-content: center;
	flex-direction: column;
	margin-left: 20rpx;
}
.name{
	margin: 5rpx 0;
	font-size: 30rpx;
}
.time{
	font-size: 28rpx;
	color: #9999;
}
.imgdetail-bgimg{
	width: 100vw;
	vertical-align: top;
}
.imgdetail-footer{
	display: flex;
	height: 80rpx;
	line-height: 80rpx;
	border-bottom: 2rpx solid #ccc;
}
.Jizan,
.collect{
	flex: 1;
	text-align: center;
	font-family: "icomoon";
}
.related-box{
	padding: 10rpx;
	border-bottom: 1px solid #ccc;
}
.related-title{
	height: 100rpx;
	line-height: 100rpx;
}
.related-ft{
	display: flex;
}
.related-img{
	width: 200rpx;
	height: 200rpx;
}
.related-img image{
	width: 100%;
	height: 100%;
}
.related-right{
	flex: 1;
	margin-left: 10rpx;
	font-size: 30rpx;
}
.related-right view{
	width: 100rpx;
	height: 40rpx;
	line-height: 40rpx;
	background-color: #FF52AC;
	text-align: center;
	color: #fff;
	border-radius: 5rpx;
	margin-bottom: 5rpx;
}
.imgdetail-comment{
	padding: 10rpx;
	margin-bottom: 130rpx;
}
.imgdetail-comment-title{
	height: 100rpx;
	line-height: 100rpx;
	font-family: "icomoon";
}
.imgdetail-comment-info{
	padding: 10rpx;
	display: flex;
	border-bottom: 1px solid #ccc;
}
.imgdetail-comment-info .hd{
	width: 70rpx;
	height: 70rpx;
	background-color: pink;
}
.imgdetail-comment-info .hd image{
	width: 100%;
	height: 100%;
}
.imgdetail-comment-info .content{
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	font-size: 20rpx;
	padding: 10rpx;
}
.imgdetail-comment-info .content text:nth-child(2){
	color: #999;
}
.buttonbox{
	position: fixed;
	bottom: 0;
	right: 0;
	left: 0;
	height: 120rpx;
	background-color: #f5f5f5;
	border-top: 1px solid #bbb;
}
.buttonbox button{
	position: absolute;
	top: 50%;
	font-weight: 700;
	width: 100%;
	height: 90rpx;
	line-height: 90rpx;
	transform: translateY(-50%);
}
</style>
