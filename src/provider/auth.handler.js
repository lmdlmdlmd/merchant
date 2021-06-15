function AuthHandler(user = '',token = '',shopid = '',roleorg = '') {
	this.user = user;
	this.token = token;
	this.shopid = shopid;
	this.roleorg = roleorg;
	this.init();
}

AuthHandler.prototype = {
	constructor: AuthHandler,
	init() {
		this.user = uni.getStorageSync("_user");
		this.token = uni.getStorageSync("_token");
		this.shopid = uni.getStorageSync("_shopid");
		this.roleorg = uni.getStorageSync("_roleorg");
	},
	saveUser(user) {
		this.user = user;
		uni.setStorage({
			key: '_user',
			data: user
		})
	},
	clearUser() {
		this.user = null;
		uni.removeStorageSync('_user');
	},
	getUser() {
		// console.log(this.token);
		// if (this.token && this.token.token_type) {
		// 	return this.token.token_type + ' ' + (this.token.access_token || this.token.token);
		// }
		return this.user;
	},
	saveToken(token) {
		this.token = token;
		uni.setStorage({
			key: '_token',
			data: token
		})
	},
	clearToken() {
		this.token = null;
		uni.removeStorageSync('_token');
	},
	getAuthorization() {
		// console.log(this.token);
		// if (this.token && this.token.token_type) {
		// 	return this.token.token_type + ' ' + (this.token.access_token || this.token.token);
		// }
		return this.token;
	},

	saveShopid(shopid) {
		this.shopid = shopid;
		uni.setStorage({
			key: '_shopid',
			data: shopid
		})
	},
	clearShopid() {
		this.shopid = null;
		uni.removeStorageSync('_shopid');
	},
	getShopid() {
		return this.shopid;
	},
	saveRoleorg(roleorg) {
		this.roleorg = roleorg;
		uni.setStorage({
			key: '_roleorg',
			data: roleorg
		})
	},
	cleaRoleorg() {
		this.roleorg = null;
		uni.removeStorageSync('_roleorg');
	},
	getRoleorg() {
		return this.roleorg;
	}
}

export default new AuthHandler();
