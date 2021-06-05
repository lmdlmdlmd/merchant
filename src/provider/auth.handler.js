function AuthHandler(token = '') {
	this.token = token;

	this.init();
}

AuthHandler.prototype = {
	constructor: AuthHandler,
	init() {
		this.token = uni.getStorageSync("_token");
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
	}
}

export default new AuthHandler();
