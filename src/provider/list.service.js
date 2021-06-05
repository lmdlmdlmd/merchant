// import api from '../utils/request.js';
import api from "./api";

/**
 * 复杂列表
 */
function ListService(params = {}) {
	console.log(params)
	this.url = params.url || '';
	this.fields = params.fields || [];
	this.params = params.params || [];
	this.format = params.format;
	this.onLoad = params.onLoad;
	this.data = [];
	this.preLength = 0;
	this.loading = params.loading || false;
}

ListService.prototype = {
	constructor: ListService,
	load(page, size) {
		
		return new Promise((resolve, reject) => {
			if (!this.url) {
				reject();
			}
			let body = {
				action: 'query',
				fields: this.fields,
				page: page,
				params: [...this.params],
				size: size
			}
			
			if (this.orderBy) {
				body.orderBy = this.orderBy;
			}
			
			this.onLoad && this.onLoad(body);
			api.post(this.url, body, this.loading).then(res => {
				this.total = res.total || 0;
				res.list = res.list || [];
				if (page === 1) {
					this.data = [];
				}
				if (this.format) {
					res.list = this.format(res.list);
				}
				this.preLength = res.list.length;
				this.data = this.data.concat(res.list);
				resolve();
			}).catch(() => reject())
		})
	}
}


/**
 * 简单列表
 */
function EasyListService(params = {}) {
	this.url = params.url || '';
	this.params = params.params || {};
	this.pageKey = params.pageKey || 'page';
	this.sizeKey = params.sizeKey || 'size';
	this.format = params.format;
	this.onLoad = params.onLoad;
	this.data = [];
	this.preLength = 0;
}

EasyListService.prototype = {
	constructor: EasyListService,
	load(page, size) {
		
		return new Promise((resolve, reject) => {
			if (!this.url) {
				reject();
			}
			let body = {
				...this.params
			}
			body[this.pageKey] = page;
			body[this.sizeKey] = size;
			this.onLoad && this.onLoad(body);
			api.post(this.url, body, this.loading).then(res => {
				console.log(res)
				// this.total = res.total_pages || 0;
				// res.list = res.list || [];
				// if (page === 1) {
				// 	this.data = [];
				// }
				// if (this.format) {
				// 	res.list = this.format(res.list);
				// }
				// this.preLength = res.list.length;
				// this.data = this.data.concat(res.data );
				this.total = res.total_rows || 0;
				res.data = res.data  || [];
				if (page === 1) {
					this.data = [];
				}
				if (this.format) {
					res.data  = this.format(res.data );
				}
				this.preLength = res.data.length;
				this.data = this.data.concat(res.data );
				resolve();
			}).catch(() => reject())
		})
	}
}

export {
	ListService,
	EasyListService
};
