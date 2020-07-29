<template>
	<scroll-view class="vedio-master"
	enable-flex
	scroll-y
	@scrolltolower="handLowerScroll">
		<view class="vedio-item" 
		v-for="item in videowps" 
		:key="item.id"
		@click="navigateToVedioplay(item)">
			<image :src="item.img" mode="widthFix"></image>
		</view>
	</scroll-view>
</template>

<script>
		export default{
			name: "VedioMaster",
			props:{
				requestinfo: {
					type: Object,
					default() {
						return {}
					}
				}
				
			},
			data() {
				return{
					videowps: [],
					isHand: true
				}
			},
			mounted() {
				this.getList();
			},
			watch:{
				requestinfo(){
					this.videowps = [];
					this.getList();
				}
			},
			methods:{
				navigateToVedioplay(item){
					getApp().globalData.vedioItem = item;
					uni.navigateTo({
						url: "/pages/vedioplay/vedioplay"
					})
				},
				handLowerScroll(){
					this.requestinfo.params.skip += this.requestinfo.params.limit;
					if(this.isHand){
						this.getList();
					}else{
						uni.showToast({
							title: "没有图片了",
							icon: "none"
						})
					}
				},
				getList() {
					uni.showLoading({
						title: "加载中"
					});
					uni.request({
						url: this.requestinfo.url,
						data: this.requestinfo.params,
						success: res => {
							uni.hideLoading();
							const response = res.data.res;
							console.log(response);
							if(response){
								if(response.videowp.length !== 0){
									this.videowps = [...this.videowps,...response.videowp];
								}else{
									this.isHand = false;
									uni.showToast({
										title: "没有图片了",
										icon: "none"
									})
								}
							}
						}
					})
				}
			}
		}
	</script>

<style scoped lang="less">
	
.vedio-master{
	height: calc(100vh - 88rpx);
	display: flex;
	flex-wrap: wrap;
	
	.vedio-item{
		width: 33.33%;
		border: 2rpx solid #fff;
		box-sizing: border-box;
		image{
			width: 100%;
			vertical-align: top;
		}
	}
}
</style>
