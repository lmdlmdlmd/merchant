//import SVGA from 'svgaplayerweb';
export default {
	install(Vue, options) {
		// 时间转换为时间戳
		Vue.prototype.date2timestamp = function (datetime) {
			datetime = datetime.replace(/-/g, '/');
			console.log(datetime)
			let timestamp = new Date(Date.parse(datetime));
			console.log(timestamp)
			timestamp = timestamp.getTime();
			console.log(timestamp)
			timestamp = timestamp / 1000;
			return timestamp;
		},
			//获取时分
			Vue.prototype.nowTime = function () {
				let now = new Date();
				let _hour = (10 > now.getHours()) ? '0' + now.getHours() : now.getHours();
				let _minute = (10 > now.getMinutes()) ? '0' + now.getMinutes() : now.getMinutes();
				return _hour + ':' + _minute;
			},
			//获取年月日
			Vue.prototype.formatDate = function (date) {
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? '0' + m : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				return y + '-' + m + '-' + d;
			},
			//比较时间大小
			Vue.prototype.compareDate = function (t1, t2) {
				let date = new Date();
				let a = t1.split(":");
				let b = t2.split(":");
				console.log(date.setHours(a[0], a[1]), date.setHours(b[0], b[1]), date.setHours(a[0], a[1]) <= date.setHours(b[0], b[1]))
				return date.setHours(a[0], a[1]) <= date.setHours(b[0], b[1]);
			},
			//时间段
			Vue.prototype.isDuringDate = function (beginDateStr, endDateStr) {
				// 时分
				// let curDate = new Date();
				// let curbegin = this.formatDate(curDate)+' '+beginDateStr+':'+'00';
				// let curend = this.formatDate(curDate)+' '+endDateStr+':'+'59';
				// console.log(curbegin,curend)
				// let beginDate = new Date(curbegin);
				// let endDate = new Date(curend);

				// if (curDate >= beginDate && curDate <= endDate) {
				// 	return true;
				// }
				// return false;
				//如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
				// var dateBegin = new Date(d1.replace(/-/g, "/"));//将-转化为/，使用new Date
				// var dateEnd = new Date(d2.replace(/-/g, "/"));//将-转化为/，使用new Date
				//时分秒
				let dateNow = new Date();//获取当前时间
				let dateBegin = new Date(this.formatDate(dateNow) + ' ' + beginDateStr + ':' + '00');//将-转化为/，使用new Date
				let dateEnd = new Date(this.formatDate(dateNow) + ' ' + endDateStr + ':' + '59');//将-转化为/，使用new Date


				let beginDiff = dateNow.getTime() - dateBegin.getTime();//时间差的毫秒数
				let beginDayDiff = Math.floor(beginDiff / (24 * 3600 * 1000));//计算出相差天数

				let endDiff = dateEnd.getTime() - dateNow.getTime();//时间差的毫秒数
				let endDayDiff = Math.floor(endDiff / (24 * 3600 * 1000));//计算出相差天数
				if (endDayDiff < 0) {//已过期
					return false
				}
				if (beginDayDiff < 0) {//没到开始时间
					return false;
				}
				return true;
			}
			//会员昵称加密
			Vue.prototype.nicknameHandle = function ($name) {
				if ($name.length <= 0) {
					$name = '***';
				} else if ($name.length == 1) {
					$name = $name;
				} else if ($name.length == 2) {
					$name = $name.substring(0, 1) + '*';
				} else if ($name.length == 3) {
					$name = $name.substring(0, 1) + '**';
				} else if ($name.length == 4) {
					$name = $name.substring(0, 1) + '*' + $name.substring($name.length - 2, $name.length);
				} else {
					$name = $name.substring(0, 1) + '**' + $name.substring($name.length - 2, $name.length);
				}
				return $name;
			},

			//数字小于10补0  (6=>06)
			Vue.prototype.checkTime = function (i) {
				if (i < 10) {
					i = "0" + i
				}
				return i
			},
			// 二维数组
			Vue.prototype.arrTrans = function (num, arr) {
				if (!Array.isArray(arr)) {
					return []
				}
				const newArr = [];
				while (arr.length > 0) {
					newArr.push(arr.splice(0, num));
				}
				return newArr;
			}
		//	    ,
		//		Vue.prototype.SVGA = function(fileUrl, svgaElement, loops, stop){
		//	      let player = new SVGA.Player(svgaElement)
		//	      let parser = new SVGA.Parser(svgaElement)
		//	      parser.load(fileUrl, function (videoItem) {
		//	        player.loops = loops // 设置循环播放次数是 1
		//	        player.setVideoItem(videoItem)
		//	        player.stepToFrame(0, true) // 从指定帧开始播放动画
		//	        if(stop) {
		//      		player.clearsAfterStop = false;
		//      	}
		////	        player.onFrame((i) => {
		////	        	 
		////	          console.log(i) // 。这里输入的是动画的帧数
		////	          if (i >= 24 && i < 26) {
		////	            console.log('111')
		////	          } else if (i >= 70) {
		////	            player.clear()
		////	          }
		////	        })
		//	      })
		//	    }
	}
}
