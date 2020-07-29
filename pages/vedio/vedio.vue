<template>
	<view class="content">
		<view class="table">
			<view class="table_icon"></view>
			<uni-segmented-control class="table-list" 
			:current="current" 
			:values="items.map(v => v.title)" 
			@clickItem="onClickItem"
			style-type="text" 
			active-color="#ff3d71"></uni-segmented-control>
			<i class="table_icon">
				<image src="../../static/img/search.png"></image>
			</i>
		</view>
		<view class="content">
			<vedio-master v-if="current < 4" :requestinfo="{url:items[current].url,params:items[current].params}"></vedio-master>
		</view>
	</view>
</template>

<script>
	import {
		uniSegmentedControl
	} from '@dcloudio/uni-ui';
	import VedioMaster from './vedio-master/VedioMaster.vue';
	export default {
		data() {
			return {
				items: [{
						title: "推荐",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/featured",
						params: {limit: 30,skip: 0,order: "hot"}
					},
					{
						title: "娱乐",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/category/59b25abbe7bce76bc834198a",
						params: {limit: 30,skip: 0,order: "hot"}
					},
					{
						title: "最新",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
						params: {limit: 30,skip: 0,order: "new"}
					},
					{
						title: "热门",
						url: "http://157.122.54.189:9088/videoimg/v1/videowp/videowp",
						params: {limit: 30,skip: 0,order: "hot"}
					}
				],
				current: 0
			}
		},
		components: {
			uniSegmentedControl,
			VedioMaster
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
</script>

<style lang="less">
	.table {
		display: flex;
		height: 70rpx;
		overflow: hidden;
		padding-top: 18rpx;
		z-index: 1;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #fff;
	
		.table-list {
			height: 100%;
			flex: 1;
	
		}
	
		.table_icon {
			position: relative;
			width: 88rpx;
			height: 88rpx;
			image {
				position: absolute;
				left: 13rpx;
				width: 60rpx;
				height: 60rpx;
				vertical-align: middle;
			}
		}
	}
	
	.content {
		margin-top: 88rpx;
	}
</style>
