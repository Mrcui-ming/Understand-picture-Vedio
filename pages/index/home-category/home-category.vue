<template>
	<view class="category">	
		<navigator class="category-item" 
		v-for="item in categorys" 
		:key="item.id"
		:url="`/pages/imgcategory/imgcategory?id=${item.id}`">
			<image :src="item.cover" mode="aspectFill"></image>
			<view class="title">
				{{item.name}}
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categorys: []
			}
		},
		methods: {
			
		},
		created() {
			uni.setNavigationBarTitle({title: "分类"});
			uni.showLoading({title: "加载中"});
			uni.request({
				url: "http://157.122.54.189:9088/image/v1/vertical/category",
				success: res => {
					console.log(res);
					uni.hideLoading();
					const response = res.data.res;
					if(response){
						this.categorys = response.category
					}
				}
			})
		}
	}
</script>

<style lang="less" scoped>
.category{
	display: flex;
	flex-wrap: wrap;
	
	.category-item{
		position: relative;
		width: 33.33%;
		height: 240rpx;
		border: 5rpx solid #fff;
		box-sizing: border-box;
		overflow: hidden;
		
		image{
			width: 100%;
			height: 100%;
		}
		
		.title{
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 50rpx;
			line-height: 50rpx;
			padding-left: 20rpx;
			color: #fff;
			background-image: linear-gradient(to right top,rgba(0,0,0,.4),rgba(0,0,0,0));
		}
	}
	
}

</style>
