<template>
  <view class="comManBox">
    <!-- <zz-nav-bar
      title="商品管理"
      leftIcon1="other"
      leftIcon="back"
      rightIcon="back"
      rightIcon1="back"
      @click-left1="isSelectGoodShow = true"
    ></zz-nav-bar> -->
    <view class="header">
      <van-row class="heaser_box">
        <van-col span="6">
          <image
            @click="handleBack"
            class="back"
            src="../../../static/img/icon/icon-back-black.png"
          ></image>
          <image
            @click="handleSelectGoodShow"
            class="other"
            src="../../../static/img/icon/screening.png"
          ></image>
        </van-col>
        <van-col span="12" class="header_title"> 商品管理 </van-col>
        <van-col span="6" class="header_right" @click="handleAddGoods('-1')">
          <image
            class="right-icon"
            src="../../../static/img/icon/add.png"
          ></image>
          <span>新增商品</span>
        </van-col>
      </van-row>
    </view>
    <view class="content">
      <view class="searchBox">
        <view class="searchDiv">
          <input
            class="srarch_input"
            v-model="search"
            placeholder="请输入品名或规格/型号"
          />
          <image
            src="../../../static/img/icon/search1.png"
            class="search_img"
            @click="handleSearch"
          ></image>
        </view>
      </view>
      <mescroll-uni
        @down="downCallback"
        @up="upCallback"
        :top="top"
        @init="scroll = $event"
        class="dataList"
      >
        <view
          class="deposit_info"
          v-for="(item, index) of list.data"
          :key="index"
        >
          <!-- <p class="ci_title" v-show="index == 0">商品信息</p> -->

          <view class="ci_con">
            <view class="ci_con_box">
              <p class="good_name">{{ item.name }}</p>
              <van-row class="info">
                <van-col span="12">金额</van-col>
                <van-col span="12" class="info_right">
                  ¥{{ item.price ? item.price.toFixed(2) : 0 + ".00" }}</van-col
                >
              </van-row>
              <van-row class="info">
                <van-col span="12">规格</van-col>
                <van-col span="12" class="info_right">{{
                  item.specification
                }}</van-col>
              </van-row>
              <van-row class="info">
                <van-col span="12">型号</van-col>
                <van-col span="12" class="info_right">{{ item.model }}</van-col>
              </van-row>
            </view>
          </view>
          <view class="good_opr">
            <van-button
              type="primary"
              class="reset_goods"
              @click="handleAddGoods(item.id)"
              >修改商品</van-button
            >
            <van-button
              type="primary"
              class="determine_goods"
              @click.stop="handleDelete(item.id)"
              >删除商品</van-button
            >
          </view>
        </view>
      </mescroll-uni>
      <view class="footer"> <Footer active="navigation"></Footer></view>
      <selectGoods
        :showGood="isSelectGoodShow"
        @isShow="isSelectGoodShow = false"
        @goods="handleSelectGood"
      />
      <van-dialog v-model="show" :showConfirmButton="false">
        <view class="dialog_box">
          <image
            class="warning"
            src="../../../static/img/icon/warning.png"
          ></image>
          <text class="dele_title">确定删除此商品？</text>
          <view class="dialog_btn">
            <button class="btn_cancel" @click="show = false">取消</button>
            <button class="btn_confim" @click="handleConfim">确定</button></view
          >
        </view>
      </van-dialog>
    </view>
  </view>
</template>

<script>
import zzNavBar from "../../../components/zz-nav-bar";
import Footer from "../../../components/footer-nav";
import selectGoods from "../../components/selectGoods";
import MescrollUni from "@/mescroll-uni/mescroll-uni.vue";
import { EasyListService } from "../../../provider/list.service.js";
export default {
  components: {
    zzNavBar,
    Footer,
    selectGoods,
    MescrollUni,
  },
  data() {
    return {
      top: 0,
      list: {},
      scroll: null,
      search: "", //搜索
      goods: [
        {
          id: 1,
          name:
            "实木沙发北欧组合现代简约新中式客厅简约新中式约新中式客厅简约新中约新中式客厅简约新中约新中式客厅简约新中客厅简约新中式客厅简约新中式客厅家具组",
          money: 999.0,
          number: 1,
          goodNumber: 30,
          specifications: "75757575",
          model: "SFIP99200U990",
        },
        {
          id: 2,
          name: "实木沙发北欧组合现代简约新中式客厅家具组",
          money: 999.0,
          number: 1,
          goodNumber: 30,
          specifications: "75757575",
          model: "SFIP99200U990",
        },
      ],
      isSelectGoodShow: false,
      show: false,
      delId: "",
    };
  },
  onLoad() {},

  created() {
    this.list = new EasyListService({
      url: "mall/commodity/search",
      pageKey: "page",
      sizeKey: "rows",
      // params: {
      // 	business_role: this.role,
      // 	shop_id: this.shopid,
      // 	type: 0
      // },
      // format: (list) => {
      // 	return list.map(_ => {
      // 		_._createTime = dateFmt('Y.m.d H:i', _.created_at);
      // 		return _;
      // 	})
      // }
    });
    // console.log(this.list);
    let sys = uni.getSystemInfoSync();
    this.top = 198 + Math.floor(sys.statusBarHeight) * 2;
  },
  methods: {
    handleSelectGoodShow() {
      this.isSelectGoodShow = !this.isSelectGoodShow;
    },
    downCallback(e) {
      // console.log("刷新");
      e.resetUpScroll();
    },
    upCallback(e) {
      // console.log("加载", e);
      this.list
        .load(e.num, e.size)
        .then(() => {
          // console.log("加载成功", this.list);
          e.endBySize(this.list.preLength, this.list.total);
        })
        .catch(() => {
          // console.log('加载失败');
          e.endErr();
        });
    },
    //搜索
    handleSearch() {
      this.list.onLoad = (body) => {
        if (this.search) {
          body.name = this.search;
        }
      };
      this.downCallback(this.scroll);
    },
    handleSelectGoodShow() {
      this.isSelectGoodShow = !this.isSelectGoodShow;
    },
    //删除商品
    handleDelete(id) {
      this.show = true;
      this.delId = id;
    },
    handleConfim() {
      //调用接口delId
      this.$api
        .post("mall/commodity/del", {
          id: this.delId,
        })
        .then((res) => {
          this.$toast.toast({
            icon: "success",
            title: "删除成功",
            success: () => {
              // uni.navigateBack();
              this.scroll.resetUpScroll();
            },
          });
          this.show = false;
        });
    },

    //新增商品
    handleAddGoods(id) {
      uni.navigateTo({
        url: `/pages/navigation/commodityManagement/addCommodity?id=${id}&list='good'`,
      });
    },
    //获取选择的商品
    handleSelectGood(e) {
      //将传过来的数据加到goods
      this.goods.push({
        name:
          "实木沙发北欧组合现代简约新中式客厅简约新中式约新中式客厅简约新中约新中式客厅简约新中约新中式客厅简约新中客厅简约新中式客厅简约新中式客厅家具组",
        money: 999.0,
        number: 1,
        goodNumber: 30,
        specifications: "75757575",
        model: "SFIP99200U990",
      });
    },
    handleBack() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  margin: 40px auto 68upx;
  padding-top: 10px;
  .deposit_info {
    padding: 10px 0;
    background: #fafafa;
    border-top: 1px solid #dddddd;
  }
  .searchBox {
    position: fixed;
    width: 100%;
  }
  .searchDiv {
    position: relative;
    margin: 0 auto;
    width: calc(100% - 80px);
  }
  .srarch_input {
    border: none;
    outline: none;
    background: #fff;
    border-radius: 20px;
    line-height: 32px;
    height: 32px;
    text-indent: 19px;
    font-size: 14px;
  }
  .search_img {
    position: absolute;
    width: 13px;
    height: 13px;
    top: 9px;
    right: 22px;
  }
  .good_opr {
    margin-top: 12px;
    text-align: right;
    .reset_goods,
    .determine_goods {
      background: rgba(24, 144, 255, 0.1);
      border: 1px solid #1890ff;
      color: #1890ff;
      font-size: 14px;
      padding: 6px 16px;
      border-radius: 20px;
      margin-right: 22px;
      height: 32px;
    }
    .determine_goods {
      background: #1890ff;
      color: #fff;
      border: none;
      margin-right: 0px;
    }
  }
  .good_opr {
    margin: 12px auto 0;
    width: calc(100% - 20px);
    .reset_goods,
    .determine_goods {
      background: #fff;
    }
    .determine_goods {
      background: #e02020;
    }
  }
  .good_name {
    font-size: 12px;
    color: #1e1e1e;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    width: auto;
    // height: 35px;
    word-break: break-all;
    // margin-top: -16upx;
  }
  .ci_con {
    margin: 0 auto;
    width: calc(100% - 20px);
  }
  .ci_con_box {
    border-radius: 10px;
    background: #fff;
    padding: 10px;
  }
  .good_money_box {
    margin-top: 5px;
  }
  .good_money {
    color: #1e1e1e;
    font-size: 12px;
  }
  .info {
    color: #1e1e1e;
    font-size: 12px;
    margin-top: 6px;
    .info_right {
      text-align: right;
    }
  }
}
.dialog_box {
  padding: 28upx 0 25upx;
  text-align: center;

  .warning {
    width: 32upx;
    height: 32upx;
    vertical-align: middle;
  }
  .dele_title {
    color: #000;
    font-size: 28upx;
    margin-left: 20upx;
  }
  .dialog_btn {
    padding: 40upx 0;
    width: 248upx;
    margin: 0 auto 30upx;
  }
  .btn_cancel,
  .btn_confim {
    width: 114upx;
    line-height: 48upx;
    color: #000;
    font-size: 28upx;
    background: #fff;
    float: left;
  }
  .btn_confim {
    background: #1890ff;
    margin-left: 20upx;
    color: #fff;
  }
}
.comManBox {
  background: #f5f5f5;
  min-height: 100vh;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 40px;
    background: #fff;
    .heaser_box {
      margin: 0 auto;
      width: calc(100% - 20px);
    }
    .back {
      width: 18px;
      height: 18px;
      margin-top: 11px;
      vertical-align: middle;
    }
    .other {
      width: 14px;
      height: 14px;
      margin-top: 9px;
      margin-left: 18px;
      vertical-align: middle;
    }
    .header_title {
      font-size: 16px;
      color: #1e1e18;
      line-height: 40px;
      text-align: center;
    }
    .header_right {
      text-align: right;
    }
    .right-icon {
      width: 13px;
      height: 13px;
      margin-right: 5px;
      margin-top: 2px;
      vertical-align: middle;
    }
    span {
      font-size: 12px;
      color: #1890ff;
      line-height: 40px;
      margin-right: 10px;
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.top {
  padding: 34upx 40upx;
  color: #ffffff;
  // background: url(~@/static/imgs/freeze-detail-bg.png);
  background-size: 100%;
  box-shadow: 0px 5px 28px 0px rgba(62, 89, 149, 0.16);
  display: flex;
  flex-direction: column;

  .num {
    font-size: 74upx;
    font-weight: 700;
    line-height: 104upx;
  }
}
</style>
<style lang="less">
/deep/.van-dialog {
  width: 260px;
}
/deep/ .searchBox .uni-input-placeholder {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  // display: none;
}
</style>