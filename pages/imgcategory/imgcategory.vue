<template>
	<view class="img-category">
		<view class="table">
			<uni-segmented-control class="table-list" 
			:current="current" 
			:values="items.map(v => v.title)" 
			@clickItem="onClickItem"
			style-type="text" 
			active-color="#ff3d71"></uni-segmented-control>
		</view>
		<scroll-view enable-flex scroll-y @scrolltolower="addCategoryImg" class="content">
			<view class="content-list" 
			v-for="(item,index) in vertical" 
			:key="item.id"  
			@click="ToImgdetail(index)">
				<image :src="item.thumb" mode="widthFix"></image>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		uniSegmentedControl
	} from '@dcloudio/uni-ui';
	export default {
		data() {
			return {
				items: [
					{
						title: "最新",
						order: "new"
					},
					{
						title: "热门",
						order: "hot"
					}
				],
				current: 0,
				id: 0,
				params: {
					limit: 30,
					skip: 0,
					order: "new"
				},
				vertical: []
			}
		},
		components:{
			uniSegmentedControl
		},
		onLoad(options){
			this.id = options.id;
			this.getList();
		},
		methods: {
			ToImgdetail(index) {
				console.log(index)
				getApp().globalData.imgList = this.vertical;
				getApp().globalData.imgIndex = index;
				uni.navigateTo({
					url: "/pages/imgdetail/imgDetail"
				})
			},
			addCategoryImg(){
				this.params.skip = this.params.limit;
				this.getList();
			},
			onClickItem(e) {
				//e.currentIndex是当前table栏的索引值。
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}else{
					return 
				}
				//更改请求参数
				this.vertical = [];
				//切换table栏的时候不能对原数组进行追加 以及不能跳过n条数据 因为存地是的页面数据。
				this.params.skip = 0;
				this.params.order = this.items[e.currentIndex].order;
				this.getList();
			},
			getList() {
				uni.showLoading({
					title:"加载中"
				})
				uni.request({
					url: `http://157.122.54.189:9088/image/v1/vertical/category/${this.id}/vertical`,
					data: this.params,
					success: res => {
						uni.hideLoading();
						const response = res.data.res;
						console.log(response);
						if(response){
							this.vertical = [...this.vertical,...response.vertical];
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
.table{
	padding: 0 200rpx;
	height: 70rpx;
	padding-top: 18rpx;
	.table-list{
		width: 50rpx;
	}
}
.content{
	display: flex;
	flex-wrap: wrap;
	height: calc(100vh - 88rpx);
	.content-list{
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
