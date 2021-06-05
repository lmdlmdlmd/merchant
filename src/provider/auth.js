import api from './api.js';
// import MSG from './message.service.js';
import CONFIG from './config.js';
import authHandler from './auth.handler.js';
// import {
// 	encryptMobile
// } from '@/common/js/utils.js';

function Auth() {
	this.user = undefined;
	this.pending = undefined;
	this.token = undefined;

	this.init();
}

// const XBmessage = uni.requireNativePlugin('XBmessage');

Auth.prototype = {
	constructor: Auth,
	init() {
		if (authHandler.token) {
			this.token = authHandler.getAuthorization();
			// this.restoreUser();
		}
	},
	login(params) {
		return api.post(CONFIG.tokenApi, params).then(data => {
			const {token} = data;
			console.log(data)
			authHandler.saveToken(token);
			this.init();
			// return this.restoreUser();
		})
	},
	// restoreUser() {
	// 	return this.pending = api.get(CONFIG.userApi).then(user => {
	// 		user._member_phone = encryptMobile(user.member_phone);
	// 		user._member_nickname = user.member_nickname == '未设置昵称' ? '我的店铺' : user.member_nickname;
	// 		user._operateAsset = user.store && user.store.finance_account_status == 1 ? true : false;
	// 		this.user = user;
	// 		this.pending = null;
	// 		return user;
	// 	}).catch(err => {
	// 		this.logout();
	// 		return false;
	// 	})
	// },
	logout() {
		// MSG.RY.logout();
		this.user = null;
		this.token = null;
		authHandler.clearToken();
		uni.reLaunch({
			url: '/pages/login/index'
		})
	},
	check() {
		if (!authHandler.token) {
			return false;
		}
		
		return this.user ? true : this.pending || false;
	}
}

export default new Auth();
