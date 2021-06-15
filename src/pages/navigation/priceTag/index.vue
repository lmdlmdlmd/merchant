<template>
  <view class="priceTagBox">
    <view class="header">
      <van-row class="heaser_box">
        <van-col span="6">
          <image
            @click="handleBack"
            class="back"
            src="../../../static/img/icon/icon-back-black.png"
          ></image>
        </van-col>
        <van-col span="12" class="header_title">价签打印管理 </van-col>
        <van-col span="6" class="header_right" @click="handleEdiTag('-1')">
          <image
            class="right-icon"
            src="../../../static/img/icon/add.png"
          ></image>
          <span>新增申请</span>
        </van-col>
      </van-row>
    </view>
    <view class="content">
      <zz-tabs :options="tabs" :active.sync="active"></zz-tabs>
      <!-- <van-tabs v-model="active" color="#0091FF">
        <van-tab :title="item.title" v-for="(item, index) of tabs" :key="index">
          <List :active="active" />
        </van-tab>
      </van-tabs> -->
      <mescroll-uni
        @down="downCallback"
        @up="upCallback"
        :top="top"
        @init="scroll = $event"
      >
        <view
          class="deposit_info"
          v-for="(item, index) of list.data"
          :key="index"
        >
          <view class="ci_con">
            <view class="ci_con_box">
              <van-row class="info">
                <van-col span="12">审批状态</van-col>
                <van-col span="12" class="info_right">
                  {{ item.approvestatus_s }}</van-col
                >
              </van-row>
              <van-row class="info">
                <van-col span="12">价签打印单号</van-col>
                <van-col span="12" class="info_right">{{ item.code }}</van-col>
              </van-row>
              <van-row class="info">
                <van-col span="12">商品数量</van-col>
                <van-col span="12" class="info_right">{{ item.num }}</van-col>
              </van-row>
            </view>
          </view>
          <view class="good_opr">
            <van-button
              v-show="item.approvestatus !== 2"
              type="primary"
              class="reset_goods"
              @click="handleSelectGoodShow(item)"
              >修改价签</van-button
            >
            <van-button
              type="primary"
              class="determine_goods"
              @click.stop="handleDelete(item.id)"
              >删除价签</van-button
            >
          </view>
        </view>
      </mescroll-uni>
      <van-dialog v-model="show" :showConfirmButton="false">
        <view class="dialog_box">
          <image
            class="warning"
            src="../../../static/img/icon/warning.png"
          ></image>
          <text class="dele_title">您确定删除该价签？</text>
          <view class="dialog_btn">
            <button class="btn_cancel" @click="show = false">取消</button>
            <button class="btn_confim" @click="handleConfim">确定</button></view
          >
        </view>
      </van-dialog>
      <selectGoods
        :detailId="detailId"
        title="修改价签"
        operation="uPriceTag"
        :showGood="isSelectGoodShow"
        @isShow="isSelectGoodShow = false"
        @handleUpdateGoods="handleUpdateGoods"
      />
      <view class="footer"> <Footer active="navigation"></Footer></view>
    </view>
  </view>
</template>

<script>
import Footer from "../../../components/footer-nav";
import zzTabs from "@/components/zz-tabs.vue";
import MescrollUni from "@/mescroll-uni/mescroll-uni.vue";
import { ListService } from "@/provider/list.service.js";
import { EasyListService } from "@/provider/list.service.js";
import selectGoods from "../../components/selectGoods";
// import List from "./list";
const activeMap = {
  //0全部 申请中 1 已通过 2 驳回3
  0: 0,
  1: 1,
  2: 2,
  3: 3,
};

export default {
  components: {
    Footer,
    // List,
    zzTabs,
    MescrollUni,
    selectGoods,
  },
  data() {
    return {
      scroll: null,
      active: 0,
      top: 0,
      list: {},
      tabs: ["查看全部", "申请中", "已通过", "草稿与驳回"],
      // typeMap: {
      //   1: "申请中",
      //   2: "已通过",
      //   3: "草稿与驳回",
      // },
      // tabs: [
      //   { title: "查看全部", active: 0 },
      //   { title: "申请中", active: 1 },
      //   { title: "已通过", active: 2 },
      //   { title: "草稿与驳回", active: 3 },
      // ],
      show: false,
      delId: "",
      detailId: null,
      isSelectGoodShow: false,
    };
  },
  onLoad(query) {
    if (query) {
      this.active = query.active || 0;
    }
  },
  created() {
    this.list = new EasyListService({
      url: "mall/pricetag/search",
      pageKey: "page",
      sizeKey: "rows",
      params: {
        // approvestatus: 0,
      },
    });
    let sys = uni.getSystemInfoSync();
    this.top = 180 + Math.floor(sys.statusBarHeight) * 2;
  },
  watch: {
    active(now) {
      let value = activeMap[now];
      this.list.params =
        value != 0
          ? {
              approvestatus: value,
            }
          : {};
      this.scroll.resetUpScroll();
      this.scroll.scrollTo(0, 0);
    },
  },
  methods: {
    downCallback(e) {
      // console.log('刷新');
      e.resetUpScroll();
    },
    upCallback(e) {
      // console.log('加载', e);
      this.list
        .load(e.num, e.size)
        .then(() => {
          // console.log('加载成功');
          e.endBySize(this.list.preLength, this.list.total);
        })
        .catch(() => {
          // console.log('加载失败');
          e.endErr();
        });
    },
    handleSelectGoodShow(val) {
      this.isSelectGoodShow = !this.isSelectGoodShow;
      this.detailId = val.id;
    },
    //修改
    handleUpdateGoods(params) {
      this.$api.post("mall/pricetag/edit", params).then((res) => {
        this.$toast.toast({
          icon: "",
          title: "修改成功",
          success: () => {
            this.scroll.resetUpScroll();
          },
        });
      });
    },
    //删除申请
    handleDelete(id) {
      this.show = true;
      this.delId = id;
    },
    handleConfim() {
      //调用接口
      this.$api.post("mall/pricetag/del", { id: this.delId }).then((res) => {
        this.$toast.toast({
          icon: "success",
          title: "删除成功",
          success: () => {
            // uni.navigateBack();
            this.scroll.resetUpScroll();
          },
        });
      });
      this.show = false;
    },
    handleEdiTag(id) {
      // uni.navigateTo({
      //   url: `/pages/navigation/priceTag/edit?id=${id}`,
      // });
    },
    //新增申请
    handleEdiTag(id) {
      uni.navigateTo({
        url: `/pages/navigation/priceTag/edit?id=${id}`,
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
    margin-top: 10px;
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
  .info {
    color: #1e1e1e;
    font-size: 12px;
    margin-top: 6px;
    .info_right {
      text-align: right;
    }
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
.priceTagBox {
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
</style>
<style lang="less">
/deep/.van-dialog {
  width: 260px;
}
// /deep/.van-tab {
//   color: #333333;
//   font-size: 28upx;
// }
// /deep/ .van-tab--active {
//   color: #0091ff;
// }
// /deep/.van-step--vertical:not(:last-child)::after {
//   border-bottom: none;
// }
// /deep/.van-tabs__line {
//   bottom: 20px;
//   width: 40px;
//   height: 2px;
// }
// /deep/.van-tabs--line .van-tabs__wrap {
//   height: 35px;
// }
</style>