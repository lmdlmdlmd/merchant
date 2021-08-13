import _ from 'lodash';

function AuthHandler(data = {}) {
	// this.user = user;
	// this.token = token;
	// this.shopid = shopid;
	// this.roleorg = roleorg;
  this.data = data;
	this.init();
}

AuthHandler.prototype = {
	constructor: AuthHandler,
	init() {
    this.data = this.getData();
		// this.user = uni.getStorageSync("_user");
		// this.token = uni.getStorageSync("_token");
		// this.shopid = uni.getStorageSync("_shopid");
		// this.roleorg = uni.getStorageSync("_roleorg");
	},
  saveData(data) {
    this.data = data;
    uni.setStorageSync('data', this.data);
    return this.data;
  },
  updateData(obj){ 
    this.data = _.assign(this.data, obj);
    uni.setStorageSync('data', this.data);
    return this.data;
  },
  clearData() {
    this.data = {};
		uni.removeStorageSync('data');
    return this.data;
  },
  getData() {
    return uni.getStorageSync('data') || {};
  },
  getToken() {
    if (this.data && this.data.token) {
      return this.data.token;
    }
    this.data = uni.getStorageSync('data');
    return this.data.token;
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
