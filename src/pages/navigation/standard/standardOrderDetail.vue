<template>
  <view class="standardOrderDetailBox">
    <zz-nav-bar
      title="标准订单详情"
      leftIcon="back"
      @click-right="rightClick"
    ></zz-nav-bar>

    <view class="content">
      <Anchor :anchor="anchor" />
      <view id="screens1">
        <view class="customer_info code_info">
          <p class="ci_title">二维码信息</p>
          <view class="ci_con">
            <view class="code_box">
              <image
                src="../../../static/img/imgs/code.png"
                class="code_img"
              ></image>
              <p class="mato18">订单号：XSDH-202103010002</p>
            </view>
          </view>
        </view>
      </view>
      <view id="screens2">
        <view class="customer_info">
          <p class="ci_title">顾客信息</p>
          <view class="ci_con">
            <van-field class="br" readonly v-model="shops" label="商铺" />
            <van-field
              class="bg"
              readonly
              v-model="brandName"
              label="品牌名称"
            />
            <van-field v-model="cardNumber" readonly label="会员卡号" />
            <van-field class="bg" v-model="name" readonly label="顾客姓名" />
            <van-field v-model="phone" readonly label="联系电话" />
            <van-field
              class="bg"
              readonly
              :clickable="true"
              v-model="currentDate"
              label="送货日期"
            />
            <van-field readonly v-model="currenTypeAdd" label="送货方式" />
            <van-field
              readonly
              class="br bg"
              v-model="currentAddName"
              label="送货地址"
            />
          </view>
        </view>
      </view>
      <view id="screens3">
        <view class="deposit_info" v-for="(item, index) of goods" :key="index">
          <p class="ci_title" v-show="index == 0">商品信息</p>
          <view class="ci_con">
            <view class="ci_con_box">
              <p class="good_name">{{ item.name }}</p>
              <van-row class="good_money_box">
                <van-col span="12">
                  <p class="good_money">
                    ¥{{ item.money ? item.money.toFixed(2) : 0 + ".00" }}*{{
                      item.number
                    }}
                  </p>
                </van-col>
              </van-row>
              <van-row class="info">
                <van-col span="12">规格</van-col>
                <van-col span="12" class="info_right">{{
                  item.specifications
                }}</van-col>
              </van-row>
              <van-row class="info">
                <van-col span="12">型号</van-col>
                <van-col span="12" class="info_right">{{ item.model }}</van-col>
              </van-row>
            </view>
          </view>
        </view>
      </view>
      <view id="screens4">
        <view class="deposit_info">
          <p class="ci_title">金额信息</p>
          <view class="ci_con">
            <view class="ci_con_box">
              <van-row class="info">
                <van-col span="12">整单金额"</van-col>
                <van-col span="12" class="info_right">{{ allMoney }}</van-col>
              </van-row>
              <van-row class="info">
                <van-col span="12">整单优惠</van-col>
                <van-col span="12" class="info_right">{{
                  allPreferential
                }}</van-col>
              </van-row>
              <van-row class="info">
                <van-col span="12">应收金额</van-col>
                <van-col span="12" class="info_right">{{
                  receivableMoney
                }}</van-col>
              </van-row>
            </view>
          </view>
        </view>
      </view>
      <p class="ci_title">备注信息</p>
      <van-field
        v-model="askremark"
        autosize
        type="textarea"
        rows="2"
        show-word-limit
        class="textAreaRemark"
      />
    </view>
    <view class="footer"> <Footer active="navigation"></Footer></view>
  </view>
</template>

<script>
import zzNavBar from "../../components/zz-nav-bar";
import Footer from "../../components/footer-nav";
import Anchor from "../components/anchor";
export default {
  components: {
    zzNavBar,
    Footer,
    Anchor,
  },
  data() {
    return {
      shops: "DS1-001-002",
      brandName: "HT2232323323",
      cardNumber: "212121212",
      name: "王立伟",
      phone: "15515569201",
      money: "¥999",
      currentDate: this.formatDate(new Date()),
      currentAdd: "220382",
      currentAddName: "上海市闵行区集心路168号5号楼301",
      currenTypeAdd: "上门提货",
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
      allMoney: "¥999.00",
      allPreferential: "¥999.00",
      receivableMoney: "¥999.00",
      askremark:
        "备注信息整段文字备注信息整段文字备注信息整段文字备注信息整段文字备注信息整段文字",
      anchor: ["二维码信息", "顾客信息", "商品信息", "金额信息"],
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.content {
  margin: 0 auto 68upx;
  #screens1 {
    padding-top: 55px;
  }
  .code_info {
    margin-top: 10px;
    .ci_con {
      text-align: center;
    }
    .code_img {
      width: 135px;
      height: 135px;
      background: #fff;
    }
    p {
      color: #000;
      font-size: 13px;
      font-weight: 600;
    }
  }
  .mato18 {
    margin-top: 18px;
  }
  .code_box {
    border: 1px dashed #888;
    padding: 30px 0 20px;
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
    padding: 0 10px 10px;
    background: #fafafa;
  }
  .br {
    border-radius: 6px;
  }
  .bg {
    background-color: #f4f5f5;
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
    height: 35px;
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
.textAreaRemark {
  background: #f5f5f5;
  padding-bottom: 100px;
}
.standardOrderDetailBox {
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
</style>
<style lang="less">
/deep/ .van-field__control {
  font-size: 12px;
  color: #1e1e1e;
  text-align: right;
}
/deep/ .textAreaRemark .van-field__control {
  height: 80px !important;
  text-align: left;
  border-radius: 10px;
  width: 100%;
  padding: 0 10px;
  box-sizing: border-box;
}
/deep/.van-dialog {
  width: 260px;
}
</style>