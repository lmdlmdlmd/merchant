<template>
  <view class="depositOrderBox">
    <zz-nav-bar
      title="标准开单"
      leftIcon="back"
      @click-right="rightClick"
    ></zz-nav-bar>

    <view class="content">
      <Anchor :anchor="anchor" />
      <view id="screens1">
        <view class="customer_info">
          <p class="ci_title">顾客信息</p>
          <view class="ci_con">
            <van-field
              class="br"
              placeholder="请输入商铺"
              v-model="name"
              label="商铺"
            />
            <van-field
              class="bg"
              placeholder="请输入品牌名称"
              v-model="brandid_s"
              label="品牌名称"
            />
            <van-field
              v-model="info.customercode"
              placeholder="请输入会员号或手机号"
              label="会员卡号"
              right-icon="search"
            />
            <!-- @click-right-icon="handleRightSearch" 预留查询 -->
            <van-field
              class="bg"
              v-model="info.customer"
              placeholder="请输入顾客姓名"
              label="顾客姓名"
            />
            <van-field
              v-model="info.customermobile"
              placeholder="请输入联系电话"
              label="联系电话"
              type="tel"
            />
            <van-field
              class="bg"
              :clickable="true"
              v-model="info.deliveryday"
              placeholder="请选择送货日期"
              label="送货日期"
              right-icon="arrow"
              @click-right-icon="dataShow = true"
            />
            <van-field
              v-model="info.deliverywayId"
              placeholder="请输入送货方式"
              label="送货方式"
              right-icon="arrow"
              @click-right-icon="addTypeShow = true"
            />
            <van-field
              class="br bg"
              placeholder="请输入送货地址"
              v-model="info.customeraddr"
              label="送货地址"
              right-icon="arrow"
              @click-right-icon="addShow = true"
            />
          </view>
        </view>
      </view>
      <view class="operation_goods">
        <van-button
          type="primary"
          class="reset_goods"
          @click="handleAddGoods('-1')"
          >新增商品</van-button
        >
        <van-button
          type="primary"
          class="determine_goods"
          @click.prevent="handleSelectGoodShow('select')"
          >选择商品</van-button
        >
      </view>
      <view id="screens2">
        <view class="deposit_info" v-for="(item, index) of goods" :key="index">
          <p class="ci_title" v-show="index == 0">商品信息</p>
          <view class="ci_con">
            <view class="ci_con_box">
              <p class="good_name">
                {{ item.name }}
              </p>
              <van-row class="good_money_box">
                <van-col span="12">
                  <p class="good_money">
                    ¥ {{ item.price }}
                    *
                    {{ item.number }}
                  </p>
                </van-col>
                <van-col span="12" class="opr_sh">
                  <view>
                    <text class="add_sh" @click="handleAdd(item)">+</text>
                    <text class="add_num">{{ item.number }}</text>
                    <text class="de_sh" @click="handleDel(item)">-</text>
                  </view>
                </van-col>
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
              @click.prevent="handleSelectGoodShow('update', item)"
              >修改商品</van-button
            >
            <van-button
              type="primary"
              class="determine_goods"
              @click.stop="handleDelete(item)"
              >删除商品</van-button
            >
          </view>
        </view>
      </view>
      <view id="screens3">
        <view class="deposit_info">
          <p class="ci_title">金额信息</p>
          <view class="ci_con">
            <view class="ci_con_box">
              <van-field
                class="allPriceInput"
                readonly
                v-model="info.amount"
                label="整单金额"
              />
              <van-field
                class="priceInput"
                v-model="info.discountamount"
                placeholder="请输入整单优惠"
                label="整单优惠"
              />
              <van-field
                class="priceInput"
                v-model="info.realamount"
                placeholder="请输入应收金额"
                label="应收金额"
              />
            </view>
          </view>
        </view>
        <p class="ci_title">备注信息</p>
        <van-field
          v-model="info.note"
          autosize
          type="textarea"
          rows="2"
          maxlength="100"
          show-word-limit
          class="textAreaRemark"
        />
      </view>
      <view id="screens4">
        <view class="sub_box reset_box">
          <van-button type="primary" class="reset" @click="handleReset"
            >重置</van-button
          >
          <van-button
            type="primary"
            class="determine"
            :loading="loading"
            loading-type="spinner"
            @click.stop="handleSubmit"
            >确定</van-button
          >
        </view>
      </view>
    </view>
    <view class="footer"> <Footer active="navigation"></Footer></view>
    <van-popup v-model="dataShow" position="bottom" :style="{ height: '30%' }">
      <view>
        <van-datetime-picker
          v-model="info.deliveryday"
          type="date"
          title="请选择日期"
          :min-date="minDate"
          visible-item-count="3"
          confirm-button-text="确定"
          cancel-button-text="取消"
          :formatter="formatter"
          @confirm="onDataConfirm"
          @cancel="dataShow = false"
        />
      </view>
    </van-popup>
    <van-popup
      v-model="addTypeShow"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <view>
        <van-picker
          title=""
          show-toolbar
          :columns="columns"
          @confirm="onAddTypeConfirm"
          @cancel="addTypeShow = false"
        />
      </view>
    </van-popup>
    <van-popup v-model="addShow" position="bottom" :style="{ height: '30%' }">
      <view>
        <van-area
          title=""
          :columns-placeholder="['请选择', '请选择', '请选择']"
          :area-list="areaList"
          @cancel="addShow = false"
          @confirm="onAddConfirm"
        />
        <!-- :value="currentAdd" -->
      </view>
    </van-popup>
    <!-- <selectGoods
      operation="staSelectGoods"
      :priceTypeShow="false"
      :showGood="isSelectGoodShow"
      @isShow="isSelectGoodShow = false"
      @handleSelectGoods="handleSelectGoods"
    /> -->
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
    <selectGoods
      :title="operation === 'staSelectGoods' ? '选择商品' : '修改商品'"
      :operation="operation"
      :priceTypeShow="false"
      :data="data"
      :showGood="isSelectGoodShow"
      @isShow="isSelectGoodShow = false"
      @handleSelectGoods="handleSelectGoods"
      @touchmove="handleTouchMove"
    />
  </view>
</template>

<script>
import zzNavBar from "../../../components/zz-nav-bar";

import Footer from "../../../components/footer-nav";
import selectGoods from "../../components/selectGoods";
import Anchor from "../../components/anchor";
import { areaList } from "@vant/area-data";
export default {
  components: {
    zzNavBar,
    Footer,
    selectGoods,
    Anchor,
  },
  data() {
    return {
      name: "",
      brandid_s: "",
      // cardNumber: "",
      // phone: "",
      // money: "¥999",
      dataShow: false,
      addShow: false,
      addTypeShow: false,
      isSelectGoodShow: false,
      show: false,
      areaList, //地址数据
      minDate: new Date(), //最小时间
      loading: false, //提交缓冲
      columns: [], //送货方式数据源
      // currenTypeAdd: "",
      goods: [], //选择的商品
      data: {}, //修改需要传的数据
      operation: "", //判断是修改商品或者选择商品
      info: {
        customercode: "",
        customer: "",
        // customermobile: "",
        deliveryday: "",
        deliveryday: this.formatDate(new Date()),
        deliveryway: "",
        deliverywayId: "",
        customeraddr: "",
        amount: "0.00",
        discountamount: "0.00",
        realamount: "0.00",
        note: "",
        type: 2,
      },
      delId: "", //删除商品id
      anchor: ["顾客信息", "商品信息", "金额信息", "订单确认"],
    };
  },
  created() {
    setTimeout(() => {
      const { shop = {} } = this.$auth;
      //基本信息
      this.name = shop && shop.name;
      this.brandid_s = shop.brandid_s;
    }, 500);
    //获取送货方式
    this.handleDict();
  },
  onLoad() {},
  methods: {
    handleTouchMove() {},
    handleDict() {
      this.$api
        .post("base/dict/search", {
          datatype: "DELIVERYWAY",
        })
        .then((res) => {
          const { data } = res;
          let dataSource = [];
          data.map((item) => {
            dataSource.push({ text: item.name, id: item.code });
          });
          this.columns = dataSource;
        });
    },
    //删除商品
    handleDelete(data) {
      this.show = true;
      this.delId = data.commoid;
    },
    handleConfim() {
      this.goods.map((item, i) => {
        if (item.commoid === this.delId) {
          this.goods.splice(i, 1);
        }
      });
      this.handlePrice();
      this.show = false;
    },
    //新增商品
    handleAddGoods(id) {
      uni.navigateTo({
        url: `/pages/navigation/commodityManagement/addCommodity?id=${id}&list=standard`,
      });
    },

    //选择商品
    handleSelectGoodShow(type, data) {
      this.operation =
        type === "select" ? "staSelectGoods" : "staSelectGoodsUpdate";
      this.data = data;
      this.isSelectGoodShow = !this.isSelectGoodShow;
    },
    //获取选择的商品
    handleSelectGoods(data) {
      // console.log(data);
      let arr = [];
      if (this.goods.length && data.length) {
        // });
        arr = [...data].filter((x) =>
          [...this.goods].every((y) => y.commoid !== x.commoid)
        );
        this.goods.push(...arr);
      } else {
        this.goods.push(...data);
      }
      this.handlePrice();
      // console.log(this.goods, "-----", totalPrice);
    },
    handlePrice() {
      let totalPrice = 0;

      this.goods.map((item) => {
        totalPrice += item.price * item.number;
      });
      this.info.amount = totalPrice.toFixed(2);
      this.info.discountamount = totalPrice.toFixed(2);
      this.info.realamount = totalPrice.toFixed(2);
    },
    //增加商品数量
    handleAdd(data) {
      console.log(data);
      let totalPrice = 0;
      this.goods.map((item) => {
        if (item.commoid == data.commoid) {
          item.number = parseInt(item.number) + 1;
        }
        totalPrice += item.price * item.number;
      });
      this.innfo.amount = totalPrice.toFixed(2);
      this.info.discountamount = totalPrice.toFixed(2);
      this.info.realamount = totalPrice.toFixed(2);
    },
    //减少商品数量
    handleDel(data) {
      let totalPrice = 0;
      this.goods.map((item) => {
        if (item.commoid == data.commoid) {
          if (item.number !== 1) {
            item.number = parseInt(item.number) - 1;
          }
        }
        totalPrice += item.price * item.number;
      });
      this.info.amount = totalPrice.toFixed(2);
      this.info.discountamount = totalPrice.toFixed(2);
      this.info.realamount = totalPrice.toFixed(2);
    },
    //预留会员卡号
    handleRightSearch() {
      if (!this.info.customercode) {
        return uni.showToast({
          icon: "none",
          position: "bottom",
          title: "请输入会员号或手机号",
        });
      }
      this.$api
        .post("base/shopuser/search", {
          mobile: this.info.customercode,
        })
        .then((res) => {
          console.log(res);
          this.info.customer = "王立伟";
          this.info.customermobile = "13509090909";
        });
    },
    //日期
    onDataConfirm(value) {
      this.info.deliveryday = this.formatDate(value);
      this.dataShow = false;
    },

    formatter(type, val) {
      if (type === "year") {
        return val + "年";
      }
      if (type === "month") {
        return val + "月";
      }
      if (type === "day") {
        return val + "日";
      }
      return val;
    },
    //送货地址
    onAddConfirm(value) {
      // console.log(value);
      // this.currentAdd = value[2].code;
      this.info.customeraddr = value[0].name + value[1].name + value[2].name;
      this.addShow = false;
    },
    //送货方式
    onAddTypeConfirm(value, index) {
      console.log(value);
      this.info.deliverywayId = value.text;
      this.info.deliveryway = value.id;
      this.addTypeShow = false;
    },
    //提交
    handleSubmit() {
      // console.log(this.info, this.goods);
      this.loading = true;
      delete this.info.deliverywayId;
      this.$api.post("mall/saleorder/add", this.info).then((res) => {
        const { data } = res;
        let params = [];
        this.goods.map((item) => {
          params.push({
            commoid: item.commoid,
            num: item.number,
            orderid: data.id,
            price: item.price,
            model: item.model,
            specification: item.specification,
          });
        });
        console.log("----", params);
        this.$api
          .post("mall/saleordercommo/multiadd", params)
          .then((respones) => {
            const { data } = respones;
            this.$toast.toast({
              icon: "",
              title: "添加成功",
              success: () => {
                // uni.navigateBack();
                // this.scroll.resetUpScroll();
              },
            });
            // uni.showToast({
            //   icon: "none",
            //   position: "bottom",
            //   title: "添加成功",
            // });
            //data.ids
            // uni.navigateTo({
            //   url: `/pages/navigation/standard/standardOrderDetail`,
            // });
          });
        this.handleReset();
        this.goods = [];
      });
      setTimeout(() => {
        this.loading = false;
      }, 500);
      //提交之后有个id要传到详情页去查询详情
      // uni.navigateTo({
      //   url: `/pages/navigation/standard/standardOrderDetail`,
      // });
    },
    //重置
    handleReset() {
      Object.keys(this.info).forEach((key) => {
        this.info[key] = "";
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  margin: 0 auto 68upx;
  overflow-y: auto !important;
  .customer_info,
  .deposit_info {
    padding: 10px 0;
    background: #fafafa;
    border-top: 1px solid #dddddd;
  }
  #screens1 {
    padding-top: 65px;
  }
  .ci_title {
    color: #333;
    font-size: 14px;
    font-weight: 600;
    padding: 5px 0;
    margin-left: 10px;
  }
  .ci_con {
    width: calc(100% - 20px);
    padding: 10px;
    background: #fafafa;
  }
  .br {
    border-radius: 6px;
  }
  .bg {
    background-color: #f4f5f5;
  }
  .sub_box,
  .operation_goods,
  .good_opr {
    text-align: right;
    margin: 12px auto;
    width: calc(100% - 20px);
    .reset,
    .determine {
      color: rgba(0, 0, 0, 0.5);
      background: #dddddd;
      border: none;
      outline: none;
      padding: 3px 23px;
      border-radius: 4px;
      margin-right: 22px;
      height: 32px;
    }
    .determine {
      background: #1890ff;
      margin-right: 0px;
      color: #fff;
    }
  }
  .operation_goods,
  .good_opr {
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
    .reset_goods,
    .determine_goods {
      background: #fff;
    }
    .determine_goods {
      background: #e02020;
    }
  }
  .add_sh,
  .de_sh {
    color: #333333;
    font-size: 30upx;
    border: 1px solid #cccccc;
    /* padding: 1px 5px; */
    /* line-height: 20px; */
    /* height: 24px; */
    padding: 4upx 10upx;
  }
  .add_num {
    color: #333;
    font-size: 30upx;
    padding: 4upx 10upx;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    line-height: 48upx;
    height: 68upx;
  }
  // textarea {
  //   height: 80px;
  //   background: #fff;
  //   border-radius: 10px;
  //   border: 1px solid #000;
  //   width: 100%;
  //   margin-top: 20px;
  //   padding: 15px 20px;
  //   box-sizing: border-box;
  // }
  .reset_box {
    margin: 25px auto 0;
    padding-bottom: 88px;
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
    max-height: 35px;
    word-break: break-all;
    // margin-top: -16upx;
  }
  .ci_con_box {
    border-radius: 10px;
    background: #fff;
    padding: 10px;
  }
  .opr_sh {
    text-align: right;
  }
  .good_money_box {
    margin-top: 5px;
  }
  .good_money {
    color: #1e1e1e;
    font-size: 12px;
    margin-top: 5px;
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
.depositOrderBox {
  background: #f5f5f5;
  min-height: 100vh;
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.priceInput,
.allPriceInput {
  padding: 0;
  color: #1e1e1e;
  font-size: 12px;
  margin-top: 6px;
}
</style>
<style lang="less">
/deep/ .van-field__label {
  color: #1e1e1e;
}
/deep/ .priceInput .van-field__control {
  color: #1890ff;
}
/deep/ .allPriceInput::after {
  border: none;
}
/deep/ .priceInput::after {
  border: none;
}
/deep/ .van-field__control {
  font-size: 12px;
  color: #1e1e1e;
  text-align: right;
}
/deep/ .textAreaRemark .van-field__control {
  height: 80px !important;
  background: #fff;
  border-radius: 10px;
  width: 100%;
  padding: 0 20px;
  text-align: left;
  box-sizing: border-box;
}
/deep/ .textAreaRemark .van-field__value {
  border-radius: 10px;
  border: 1px solid #ccc;
}
/deep/ .textAreaRemark .van-field__word-limit {
  margin-right: 10px;
  margin-bottom: 10px;
}
/deep/.van-dialog {
  width: 260px;
}
</style>