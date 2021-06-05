<template>
  <view class="tagEditBox">
    <zz-nav-bar
      title="价签打印申请"
      leftIcon="back"
      @click-right="rightClick"
    ></zz-nav-bar>

    <view class="content">
      <Anchor :anchor="anchor" />
      <view id="screens1">
        <view class="deposit_info">
          <p class="ci_title">基本信息</p>
          <view class="ci_con">
            <view class="ci_con_box">
              <van-row class="info">
                <van-col span="12">商铺</van-col>
                <van-col span="12" class="info_right">{{ shops }}</van-col>
              </van-row>
              <van-row class="info">
                <van-col span="12">主营品牌</van-col>
                <van-col span="12" class="info_right">{{ brand }}</van-col>
              </van-row>
              <van-row class="info">
                <van-col span="12">商户</van-col>
                <van-col span="12" class="info_right">{{ merchants }}</van-col>
              </van-row>
            </view>
          </view>
          <view class="operation_goods">
            <van-button
              type="primary"
              class="determine_goods"
              @click="isSelectGoddShow = true"
              >选择商品</van-button
            >
          </view>
        </view>
      </view>
      <view id="screens2">
        <view v-show="goods.length !== 0">
          <view
            class="deposit_info"
            v-for="(item, index) of goods"
            :key="index"
          >
            <p class="ci_title" v-show="index == 0">商品信息</p>
            <view class="ci_con">
              <view class="ci_con_box">
                <p class="good_name">{{ item.name }}</p>
                <van-row class="info">
                  <van-col span="12">金额</van-col>
                  <van-col span="12" class="info_right">
                    ¥{{ item.money ? item.money.toFixed(2) : 0 + ".00" }}*{{
                      item.num
                    }}</van-col
                  >
                </van-row>
                <van-row class="info">
                  <van-col span="12">规格</van-col>
                  <van-col span="12" class="info_right">{{
                    item.specifications
                  }}</van-col>
                </van-row>
                <van-row class="info">
                  <van-col span="12">型号</van-col>
                  <van-col span="12" class="info_right">{{
                    item.model
                  }}</van-col>
                </van-row>
              </view>
              <view class="opeBody">
                <Operate
                  :number="item.number"
                  :type="item.type"
                  maLe="0px"
                  @handleAdd="handleAdd(item)"
                  @handleDel="handleDel(item)"
                  @handleConfirm="handleConfirm(item, arguments)"
                />
              </view>
              <view class="good_opr">
                <van-button
                  type="primary"
                  class="del_goods"
                  @click.stop="handleDelete(item.id)"
                  >删除商品</van-button
                >
              </view>
            </view>
            <view class="sub_box" v-if="index == goods.length - 1">
              <van-button
                type="primary"
                class="determine"
                @click.stop="handleSubmit"
                >确定</van-button
              >
            </view>
          </view>
        </view>
      </view>
    </view>
    <selectGoods
      :show="isSelectGoddShow"
      @isShow="isSelectGoddShow = false"
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
</template>

<script>
import zzNavBar from "../../components/zz-nav-bar";
import Anchor from "../components/anchor";
import Operate from "../../components/operate";
import selectGoods from "../components/selectGoods";
export default {
  components: {
    zzNavBar,
    selectGoods,
    Anchor,
    Operate,
  },
  data() {
    return {
      shops: "SI-001-002",
      brand: "芝华仕",
      merchants: "HT2232323323",
      isSelectGoddShow: false,
      show: false,
      delId: "",
      goods: [],
      anchor: ["基本信息", "商品信息"],
    };
  },
  onLoad(query) {
    if (query.id !== "-1") {
      this.goods = [
        {
          id: 1,
          name:
            "实木沙发北欧组合现代简约新中式客厅简约新中式约新中式客厅简约新中约新中式客厅简约新中约新中式客厅简约新中客厅简约新中式客厅简约新中式客厅家具组",
          money: 999.0,
          num: 1,
          goodNumber: 30,
          specifications: "75757575",
          model: "SFIP99200U990",
          type: "爆炸签",
          number: 2,
        },
        {
          id: 2,
          name: "实木沙发北欧组合现代简约新中式客厅家具组",
          money: 999.0,
          num: 1,
          goodNumber: 30,
          specifications: "75757575",
          model: "SFIP99200U990",
          type: "标准价签",
          number: 1,
        },
      ];
    }
  },
  methods: {
    //增加商品数量
    handleAdd(data) {
      this.goods.map((item) => {
        if (item.id == data.id) {
          item.number = parseInt(item.number) + 1;
        }
      });
    },
    //减少商品数量
    handleDel(data) {
      this.goods.map((item) => {
        if (item.id == data.id) {
          item.number = parseInt(item.number) - 1;
        }
      });
    },
    handleConfirm() {
      console.log(arguments[0], this.goods, arguments[1][0]);
      this.goods.map((item) => {
        if (item.id == arguments[0].id) {
          item.type = arguments[1][0];
        }
      });
    },
    //获取选择的商品
    handleSelectGood(e) {
      console.log(e);
      this.goods.push({
        id: 2,
        name:
          "实木沙发北欧组合现代简约新中式客厅简约新中式约新中式客厅简约新中约新中式客厅简约新中约新中式客厅简约新中客厅简约新中式客厅简约新中式客厅家具组",
        money: 999.0,
        num: 1,
        number: 1,
        type: "爆炸签",
        goodNumber: 30,
        specifications: "75757575",
        model: "SFIP99200U990",
      });
    },
    //提交
    handleSubmit() {
      uni.navigateTo({
        url: `/pages/navigation/priceTag/index`,
      });
    },
    handleConfim() {
      //调用接口delId
      this.show = false;
    },
    //删除申请
    handleDelete(id) {
      this.show = true;
      this.delId = id;
    },
  },
};
</script>

<style lang="less" scoped>
.tagEditBox {
  background: #f5f5f5;
  min-height: 100vh;
}
.content {
  padding-bottom: 68px;
  margin: 0 auto 68upx;
  #screens1 {
    padding-top: 65px;
  }
  .deposit_info {
    background: #fafafa;
    border-top: 1px solid #ddd;
    margin-top: 10px;
    padding-bottom: 12px;
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
    padding: 10px 0;
    background: #ffffff;
    margin: 0 auto;
    border-radius: 10px;
  }
  .info {
    color: #1e1e1e;
    font-size: 12px;
    margin-top: 6px;
    padding: 0 10px;
    .info_right {
      text-align: right;
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
    height: 35px;
    word-break: break-all;
    // margin-top: -16upx;
  }
  .opeBody {
    padding-bottom: 10px;
  }
  .operation_goods,
  .good_opr {
    text-align: right;
    margin-top: 12px;
    width: calc(100% - 20px);
    .determine_goods,
    .del_goods {
      font-size: 14px;
      padding: 6px 16px;
      border-radius: 20px;
      height: 32px;
      border: none;
      color: #fff;
    }
    .determine_goods {
      background: #1890ff;
    }
    .del_goods {
      width: auto;
      background: #e02020;
    }
  }
  .sub_box {
    text-align: right;
    margin: 12px auto 0;
    width: calc(100% - 20px);
    .determine {
      color: #000;
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
      margin-right: 0;
      color: #fff;
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
</style>
<style lang="less">
/deep/.van-dialog {
  width: 260px;
}
</style>