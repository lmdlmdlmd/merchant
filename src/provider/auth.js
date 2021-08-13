import api from './api.js';
import CONFIG from './config.js';
import authHandler from './auth.handler.js';

function Auth() {
  this.data = {};
	// this.user = undefined;
	// this.token = undefined;
	// this.pending = undefined;
	// this.shop = undefined;
	// this.shPending = undefined;
	// this.role = undefined;
	// this.roPending = undefined;
	this.init();
}

// const XBmessage = uni.requireNativePlugin('XBmessage');


Auth.prototype = {
	constructor: Auth,
	init() {
		console.log(authHandler)
    this.data = authHandler.data;
		// if (authHandler.user) {
		// 	this.user = authHandler.getUser();
		// }
		// if (authHandler.token) {
		// 	this.token = authHandler.getAuthorization();
		// 	// this.restoreRole(this.roleorg)
		// 	// this.restoreShop(this.shopid);
		// }
		// if (authHandler.shopid) {
		// 	this.shopid = authHandler.getShopid();
		// 	// this.restoreRole(this.roleorg)
		// 	this.restoreShop(this.shopid);
		// }
		// if (authHandler.roleorg) {
		// 	this.roleorg = authHandler.getRoleorg();
		// 	this.restoreRole(this.roleorg)
		// 	// this.restoreShop(this.shopid);
		// }
	},
	login(params,checked) {
		return api.post(CONFIG.tokenApi, params).then(data => {
			const { token, roleorg, roles } = data;
      const role = roles.filter((item) => item.id == roleorg)[0];
      const shopid = role.shopid;
      if(!shopid){
        //不是商家角色
        return 'notPermission'
      }

			let dataUser = checked ?  { ...data, ...params } : data
      this.data = authHandler.saveData({ ...dataUser, role });
			// authHandler.saveUser(dataUser);
			// authHandler.saveToken(token);
			// authHandler.saveShopid(shopid);
			// authHandler.saveRoleorg(roleorg);
			this.init();
			// this.restoreRole(roleorg);
			// this.restoreShop(shopid);
      return this.data;
		})
	},
  update(data) {
    this.data = authHandler.updateData(data);
  },
	//商铺信息
 	restoreShop(shopid) {
		api.post(CONFIG.shopApi, { id: shopid }).then(shop => {
			this.shop = shop;
			return shop;
		}).catch(err => {
			return false;
		})
	},
	// //角色信息
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
    this.data = authHandler.clearData();
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
