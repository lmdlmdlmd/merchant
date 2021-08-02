<template>
  <view class="depositOrderBox">
    <zz-nav-bar
      title="定金订单"
      leftIcon="back"
      @click-right="rightClick"
    ></zz-nav-bar>

    <view class="content">
      <Anchor :anchor="anchor" />
      <view id="screens1">
        <view class="customer_info">
          <p class="ci_title">顾客信息</p>
          <view class="ci_con">
            <!-- <view class="bg_fff">
              <view  class="ci_content">
              <van-row>
                <van-col span="6"><text class="file_text">商铺</text></van-col>
                <van-col span="18"
                  ><view class="file_val">
                    <input
                      type="text"
                      class="input_text"
                      :value="info.name"
                      placeholder="请输入商铺"
                    /> </view
                ></van-col>
              </van-row>
              </view>
            </view> -->
            <van-field
              class="br"
              readonly
              placeholder="请输入商铺"
              :value="info.name"
              label="商铺"
              input-align="right"
            />
            <!-- <view class="bg_fa">
              <van-row class="ci_content">
                <van-col span="6"
                  ><text class="file_text">品牌名称</text></van-col
                >
                <van-col span="18"
                  ><view class="file_val">
                    <input
                      type="text"
                      class="input_text"
                      :value="info.brandid_s"
                      placeholder="请输入品牌名称"
                    /> </view
                ></van-col>
              </van-row>
            </view> -->
            <van-field
              class="bg"
              readonly
              placeholder="请输入品牌名称"
              :value="info.brandid_s"
              label="品牌名称"
              input-align="right"
            />
            <!-- <view class="bg_fff">
              <van-row class="ci_content">
                <van-col span="6"
                  ><text class="file_text">会员卡号</text></van-col
                >
                <van-col span="18"
                  ><view class="file_val">
                    <input
                      type="text"
                      class="input_text"
                      :value="params.customercode"
                      placeholder="请输入会员号或手机号"
                    /> </view
                ></van-col>
              </van-row>
            </view> -->
            <van-field
              :value="params.customercode"
              placeholder="请输入会员号或手机号"
              label="会员卡号"
              input-align="right"
              @input="params.customercode = $event.mp.detail"
            />
            <!-- <view class="bg_fa">
              <van-row class="ci_content">
                <van-col span="6"
                  ><text class="file_text">顾客姓名</text></van-col
                >
                <van-col span="18"
                  ><view class="file_val">
                    <input
                      type="text"
                      class="input_text"
                      :value="params.customer"
                      placeholder="请输入顾客姓名"
                    /> </view
                ></van-col>
              </van-row>
            </view> -->
            <van-field
              class="bg"
              :value="params.customer"
              placeholder="请输入顾客姓名"
              label="顾客姓名"
              input-align="right"
              @input="params.customer = $event.mp.detail"
            />
            <!-- <view class="bg_fff">
              <van-row class="ci_content">
                <van-col span="6"
                  ><text class="file_text">联系电话</text></van-col
                >
                <van-col span="18"
                  ><view class="file_val">
                    <input
                      type="text"
                      class="input_text"
                      :value="params.customermobile"
                      placeholder="请输入联系电话"
                    /> </view
                ></van-col>
              </van-row>
            </view> -->
            <van-field
              class="br"
              :value="params.customermobile"
              placeholder="请输入联系电话"
              label="联系电话"
              input-align="right"
              @input="params.customermobile = $event.mp.detail"
            />
          </view>
        </view>
      </view>
      <view id="screens2">
        <view class="deposit_info">
          <p class="ci_title">定金信息</p>
          <view class="ci_con">
            <!-- <view class="bg_fff">
              <van-row class="ci_content">
                <van-col span="6"
                  ><text class="file_text">定金金额</text></van-col
                >
                <van-col span="18"
                  ><view class="file_val">
                    <input
                      type="text"
                      class="input_text"
                      :value="params.amount"
                      placeholder="请输入定金金额"
                    /> </view
                ></van-col>
              </van-row>
            </view> -->
            <van-field
              class="br"
              :value="params.amount"
              placeholder="请输入定金金额"
              label="定金金额"
              input-align="right"
              @input="params.amount = $event.mp.detail"
            />
          </view>
        </view>
      </view>
      <view id="screens3">
        <view class="sub_box">
          <van-button type="primary" class="reset" @click="handleReset"
            >重置</van-button
          >
          <van-button type="primary" class="determine" @click="handleSubmit"
            >确定</van-button
          >
        </view>
      </view>
    </view>
    <view class="footer"> <Footer active="navigation"></Footer></view>
  </view>
</template>

<script>
import zzNavBar from "../../../components/zz-nav-bar";
import Footer from "../../../components/footer-nav";
import Anchor from "../../components/anchor";
import Toast from "../../../wxcomponents/toast/toast";
export default {
  components: {
    zzNavBar,
    Footer,
    Anchor,
  },
  data() {
    return {
      params: {
        amount: "",
        customermobile: "",
        customer: "",
        customercode: "",
      },
      anchor: ["顾客信息", "定金信息", "订单确认"],
      info: {},
    };
  },
  created() {
    setTimeout(() => {
      const { shop = {} } = this.$auth;
      //基本信息
      this.info = {
        name: shop && shop.name,
        brandid_s: shop.brandid_s,
        merchatid_s: shop.merchatid_s,
      };
      console.log(shop);
      this.params.brandid = shop.brandid;
      this.params.shopid = shop.id;
      // console.log(this.info, "info", this.$auth);
    }, 500);
  },
  onLoad() {},
  methods: {
    //会员卡号预留查询
    handleRightSearch() {
      if (!this.customercode) {
        return uni.showToast({
          icon: "none",
          position: "bottom",
          title: "请输入会员号或手机号",
        });
      }
      //查询姓名和电话
      // this.name = "王立伟";
      // this.phone = "13509090909";
    },
    //提交
    handleSubmit() {
      // this.params.amount = this.params.amount && this.params.amount.substr(1);
      this.$api
        .post("mall/deposit/add", this.params)
        .then((res) => {
          console.log(res);
          this.$toast.toast({
            icon: "",
            title: "添加成功",
            success: () => {
              this.handleReset();
              uni.navigateBack();
            },
          });
          //bug id需要获取
          uni.navigateTo({
            url: `/pages/navigation/deposit/depositOrderDetail?id=${11}`,
          });
        })
        .catch((e) => {
          // console.log(e);
          Toast(e.message);

          // Toast.fail(e.message);
        });
    },
    //重置
    handleReset() {
      Object.keys(this.params).forEach((key) => {
        this.params[key] = "";
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  margin: 0 auto 68upx;
  #screens1 {
    padding-top: 65px;
  }
  .customer_info,
  .deposit_info {
    padding: 10px 0;
    border-top: 1px solid #dddddd;
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

  .sub_box {
    text-align: right;
    margin: 12px auto;
    width: calc(100% - 20px);
    padding-bottom: 50px;
  }
  .bg_fa {
    background-color: #f4f5f5;
    height: 40px;
    margin: 0 auto;
    width: 99%;
    border-bottom: 1px solid #fafafa;
  }
  .bg_fff {
    background-color: #fff;
    height: 40px;
    margin: 0 auto;
    width: 99%;
    border-bottom: 1px solid #fafafa;
  }
}
.depositOrderBox {
  background: #f5f5f5;
  min-height: 100vh;
}
.file_text,
.file_val {
  font-size: 13px;
  color: #1e1e1e;
}
.file_val {
  text-align: right;
}
.input_text {
  // border-bottom: 1px solid #f0f0f0;
  width: 100%;
  padding: 10px;
  font-size: 14px;
  color: #1e1e18;
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
/deep/ .bg .van-cell {
  background-color: #f4f5f5;
}
/deep/ .van-field__control {
  font-size: 12px;
  color: #1e1e1e;
  text-align: right;
}
/deep/ .ci_content .van-row {
  width: calc(100% - 20px);
  margin: 0 auto;
  padding: 5px;
}
/deep/ .reset .van-button {
  color: #000;
  background: #dddddd;
  border: none;
  outline: none;
  padding: 3px 23px;
  border-radius: 4px;
  margin-right: 22px;
  height: 32px;
}
/deep/ .determine .van-button {
  border: none;
  outline: none;
  padding: 3px 23px;
  border-radius: 4px;
  height: 32px;
  background: #1890ff;
  margin-right: 0;
  color: #fff;
}
</style>