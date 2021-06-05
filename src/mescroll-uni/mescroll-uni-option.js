// mescroll 全局配置
const GlobalOption = {
	down: {
		// 其他down的配置参数也可以写,这里只展示了常用的配置:
		use: true,
		auto: false,
		textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
		textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
		textLoading: '加载中 ...', // 加载中的提示文本
		offset: 60, // 在列表顶部,下拉大于80upx,松手即可触发下拉刷新的回调
	},
	up: {
		// 其他up的配置参数也可以写,这里只展示了常用的配置:
		use: true,
		auto: true,
		textLoading: '加载中 ...', // 加载中的提示文本
		textNoMore: '-- 没有更多了 --', // 没有更多数据的提示文本
		offset: 80, // 距底部多远时,触发upCallback
		isBounce: false, // 默认禁止橡皮筋的回弹效果, 必读事项: http://www.mescroll.com/qa.html?v=190725#q25
		noMoreSize: 1,
		toTop: {
			// 回到顶部按钮,需配置src才显示
			src: "/static/imgs/icons/icon-scroll-totop.png",
			offset: 500
		},
		empty: {
			use: true, // 是否显示空布局
			icon: "/static/imgs/icons/icon-scroll-nomore.png", // 图标路径 (建议放入static目录, 如 /static/img/mescroll-empty.png )
			tip: '~ 暂无相关数据 ~' // 提示
		}
	}
}

export default GlobalOption
