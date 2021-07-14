import api from './api.js';
// import MSG from './message.service.js';
import CONFIG from './config.js';
import authHandler from './auth.handler.js';
// import {
// 	encryptMobile
// } from '@/common/js/utils.js';

function Auth() {
	this.user = undefined;
	this.token = undefined;
	this.pending = undefined;
	this.shop = undefined;
	this.shPending = undefined;
	this.role = undefined;
	this.roPending = undefined;

	this.init();
}

// const XBmessage = uni.requireNativePlugin('XBmessage');


Auth.prototype = {
	constructor: Auth,
	init() {
		console.log(authHandler)
		if (authHandler.user) {
			this.user = authHandler.getUser();
		}
		if (authHandler.token) {
			this.token = authHandler.getAuthorization();
			// this.restoreRole(this.roleorg)
			// this.restoreShop(this.shopid);
		}
		if (authHandler.shopid) {
			this.shopid = authHandler.getShopid();
			// this.restoreRole(this.roleorg)
			this.restoreShop(this.shopid);
		}
		if (authHandler.roleorg) {
			this.roleorg = authHandler.getRoleorg();
			this.restoreRole(this.roleorg)
			// this.restoreShop(this.shopid);
		}
	},
	login(params) {
		return api.post(CONFIG.tokenApi, params).then(data => {
			const {token,shopid,roleorg} = data;
			// console.log(data)
			// this.shopid = shopid; 
			// this.roleorg = roleorg;
			authHandler.saveUser(data);
			authHandler.saveToken(token);
			authHandler.saveShopid(shopid);
			authHandler.saveRoleorg(roleorg);
			this.init();
			// console.log(data)
			this.restoreRole(roleorg)
			this.restoreShop(shopid);
		})
	},
	//商铺信息
 	restoreShop(shopid) {
		this.shPending = api.post(CONFIG.shopApi,{id:shopid}).then(shop => {
			console.log(shop)
			this.shop = shop;
			this.shPending = null;
			return shop;
		}).catch(err => {
			// this.logout();
			return false;
		})
	},
	//角色信息
	restoreRole(roleOrg) {
		return this.roPending = api.post(CONFIG.roleApi,{id:roleOrg}).then(role => {
			console.log(role)
			this.role = role;
			this.roPending = null;
			return roleOrg;
		}).catch(err => {
			// this.logout();
			return false;
		})
	},
	logout() {
		// MSG.RY.logout();
		this.user = null;
		this.shop = null;
		this.token = null;
		this.role = null;
		authHandler.clearToken();
		authHandler.clearShopid();
		authHandler.cleaRoleorg();
		uni.reLaunch({
			url: '/pages/login/index'
		})
	},
	// check() {
	// 	if (!authHandler.token) {
	// 		return false;
	// 	}
		
	// 	return this.shop ? true : this.pending || false;
	// }
}

export default new Auth();
