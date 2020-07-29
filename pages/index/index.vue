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
			<view v-if="current === 0">
				<home-recommend></home-recommend>
			</view>
			<view v-if="current === 1">
				<home-category></home-category>
			</view>
			<view v-if="current === 2">
				<home-new></home-new>
			</view>
			<view v-if="current === 3">
				<home-album></home-album>
			</view>
		</view>
	</view>
</template>

<script>
	//分段器的使用 注意：分段器动态绑定的是一个数组。
	import {
		uniSegmentedControl
	} from '@dcloudio/uni-ui';
	import HomeRecommend from './home-recommend/home-recommend.vue';
	import HomeCategory from './home-category/home-category.vue';
	import HomeNew from './home-new/home-new.vue';
	import HomeAlbum from './home-album/home-album.vue';
	export default {
		data() {
			return {
				items: [{
						title: "推荐"
					},
					{
						title: "分类"
					},
					{
						title: "最新"
					},
					{
						title: "专辑"
					}
				],
				current: 0
			}
		},
		components: {
			HomeRecommend,
			HomeCategory,
			HomeNew,
			HomeAlbum,
			uniSegmentedControl
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
