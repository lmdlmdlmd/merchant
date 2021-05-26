function Toast() {
	this.useableIcon = [
		'loading',
		'success'
	]
	this.duration = 2000;
}
Toast.prototype = {
	constructor: Toast,
	text(option) {
		if (typeof option == 'string') {
			this.toast({
				icon: 'none',
				title: option
			})
		} else {
			option = {
				icon: 'none',
				title: option.title,
				image: option.image,
				mask: option.mask,
				duration: option.duration || this.duration,
				position: option.position,
				success: option.success
			}
			this.toast(option);
		}
	},
	icon(option) {
		if (typeof option == 'string') {
			if (~this.useableIcon.indexOf(option)) {
				this.toast({
					icon: option,
					title: ''
				})
			}
		} else {
			option = {
				icon: option.icon,
				title: '',
				image: option.image,
				mask: option.mask,
				duration: option.duration || this.duration,
				position: option.position,
				success: option.success
			}
			this.toast(option);
		}
	},
	toast({
		icon,
		title,
		image,
		mask,
		duration,
		position,
		success
	}) {
		console.log('showToast', arguments[0]);

		// #ifdef APP-PLUS
		success && success();
		// plus.nativeUI.closeToast();
		plus.nativeUI.toast(title, {
			verticalAlign: position || 'center',
			duration: 'short'
		});
		// #endif

		// #ifndef APP-PLUS
		uni.hideToast();
		uni.showToast({
			icon: icon,
			title: title,
			image: image,
			mask: mask,
			duration: duration || this.duration,
			position: position,
			success: () => {
				if (success) {
					this.timer = setTimeout(() => {
						success();
					}, duration || this.duration)
				}
			}
		});
		// #endif
	}
}

export default new Toast();
