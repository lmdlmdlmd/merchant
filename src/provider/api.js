import CONFIG from './config.js';
import authHandler from './auth.handler.js';
import toast from './toast.js';

function Api() {}

Api.prototype = {
	constructor: Api,
	get(url, params = {}, mask = true) {
		return this.request('GET', url, params, mask);
	},
	post(url, data = {}, mask = true) {
		return this.request('POST', url, data, mask);
	},
	upload(url, path, formData) {
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				url: url,
				name: 'file',
				filePath: path,
				fileName: '',
				formData: formData,
				success: (res) => {
					if (res.statusCode === 200) {
						resolve(res.data);
					} else {
						reject(res);
					}
				},
				fail: (err) => {
					reject(err);
				}
			})
		})

	},
	request(method, url, options = {}, mask = true) {
		let _url = url;
		if (/^\/?([\w-]+\/?)+(\?(\w+(=.*)?&?)+)?$/.test(_url)) {
			_url = _url.trim('/');
			_url = CONFIG.baseUrl + '/' + _url;
		}

		let header = authHandler.getAuthorization() ? {
			authorization: authHandler.getAuthorization()
		} : {};

		if (mask) {
			// 显示Loading
			// #ifdef APP-PLUS
			plus.nativeUI.showWaiting();
			// #endif
			// #ifndef APP-PLUS
			uni.showLoading({
				mask: true
			})
			// #endif
		}

		return new Promise((resolve, reject) => {
			uni.request({
				url: _url,
				data: options,
				header: header,
				method: method,
				sslVerify: false,
				success: (res) => {
					if (res.statusCode === 200) {
						if (~url.indexOf('store/oauth/token')) {
							return resolve(res.data);
						}
						if (res.data.code === 0) {
							resolve(res.data.data);
						} else {
							errorHandler(res, url);
							reject(res.data);
						}
					} else {
						errorHandler(res, url);
						reject(res.data);
					}
				},
				fail: (err) => {
					reject(err);
				},
				complete: () => {
					if (mask) {
						// 隐藏Loading
						// #ifdef APP-PLUS
						plus.nativeUI.closeWaiting();
						// #endif
						// #ifndef APP-PLUS
						uni.hideLoading();
						// #endif
					}
				}
			})
		})
	}
}

// const ingoreUri = [
// 	'store/oauth/token',
// 	'store/index/store/login',
// 	'store/index/store/member/login',
// 	'store/index/store/create_check',
// 	'store/store/store/has/pay/password',
// 	'onshop/store/new/shop/has/set/goods/cate',
// 	'platformsys/store/express/query'
// ]

function errorHandler(err, url) {
	if (err.statusCode === 401) { // 授权错误
		console.log(err);
	} else if (err.statusCode === 404) { // 页面未找到
		// toast.text('页面走丢了');
		toast.text('Not Found');
	} else {
		if (err.statusCode !== 200) {
			toast.text('Server Error');
		} else {
			// if (~ingoreUri.indexOf(url)) {
			// 	return;
			// }
			let temp = err.data;
			if (temp.code === 422) { // 验证错误
				if(temp.data && temp.data.code == '验证码不正确'){
					toast.text('验证码不正确')
				}else{
					let key = Object.keys(temp.data)[0];
					toast.text(key && temp.data[key][0] || temp.message);
				}
			} else {
				toast.text(temp.message);
			}
		}
	}
}

export default new Api();
