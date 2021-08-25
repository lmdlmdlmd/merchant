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
              <view class="info">
                <van-row>
                  <van-col span="12">商铺</van-col>
                  <van-col span="12"
                    ><view class="info_right">{{ info.name }}</view></van-col
                  >
                </van-row>
              </view>
              <view class="info">
                <van-row>
                  <van-col span="12">主营品牌</van-col>
                  <van-col span="12"
                    ><view class="info_right">{{
                      info.brandid_s
                    }}</view></van-col
                  >
                </van-row>
              </view>
              <view class="info">
                <van-row>
                  <van-col span="12">商户</van-col>
                  <van-col span="12"
                    ><view class="info_right">{{
                      info.merchid_s
                    }}</view></van-col
                  >
                </van-row>
              </view>
            </view>
          </view>
          <view class="operation_goods">
            <van-button
              type="primary"
              class="determine_goods"
              @click="handleSelectGoodShow"
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
                <view class="info">
                  <van-row>
                    <van-col span="12">金额</van-col>
                    <van-col span="12">
                      <view class="info_right">
                        ¥{{ item.price }} * {{ item.num }}</view
                      ></van-col
                    >
                  </van-row>
                </view>
                <view class="info">
                  <van-row>
                    <van-col span="12">规格</van-col>
                    <van-col span="12"
                      ><view class="info_right">{{
                        item.specification
                      }}</view></van-col
                    >
                  </van-row>
                </view>
                <view class="info">
                  <van-row>
                    <van-col span="12">型号</van-col>
                    <van-col span="12"
                      ><view class="info_right">{{ item.model }}</view></van-col
                    >
                  </van-row>
                </view>
              </view>
              <view class="opeBody">
                <Operate
                  :number="item.number"
                  :tagType="item.type"
                  :isRequire="false"
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
                  @click.stop="handleDelete(item.commoid)"
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
      operation="selectGoods"
      :showGood="isSelectGoodShow"
      @isShow="isSelectGoodShow = false"
      @handleSelectGoods="handleSelectGoods"
    />
    <van-dialog v-bind:show="show" use-slot :showConfirmButton="false">
      <view class="dialog_box">
        <image
          class="warning"
          src="@/static/img/icon/warning.png"
        ></image>
        <span class="dele_title">确定删除此商品？</span>
        <view class="dialog_btn">
          <button class="btn_cancel" @click="show = false">取消</button>
          <button class="btn_confim" @click="handleConfim">确定</button></view
        >
      </view>
    </van-dialog>
  </view>
</template>

<script>
import zzNavBar from "@/components/zz-nav-bar";
import Anchor from "@/components/anchor";
import Operate from "@/components/operate";
import selectGoods from "@/components/selectGoods";
export default {
  components: {
    zzNavBar,
    selectGoods,
    Anchor,
    Operate,
  },
  data() {
    return {
      // shops: "SI-001-002",
      // brand: "芝华仕",
      // merchants: "HT2232323323",
      info: {},
      isSelectGoddShow: false,
      show: false,
      delId: "",
      goods: [
        {
          name: "1111",
          num: "2",
          price: "222",
          specification: "212121",
          model: "21212",
          number: "21",
          type: "222",
          commoid: "2",
        },
      ],
      anchor: ["基本信息", "商品信息"],
      isSelectGoodShow: false,
    };
  },
  created() {
    setTimeout(() => {
      const { shop = {} } = this.$auth;
      //基本信息
      this.info = {
        name: shop && shop.name,
        brandid_s: shop.brandid_s,
        merchid_s: shop.merchid_s,
      };
      console.log(this.info, "info");
    }, 500);
  },
  onLoad(query) {},
  methods: {
    handleSelectGoodShow() {
      this.isSelectGoodShow = !this.isSelectGoodShow;
    },
    //增加商品数量
    handleAdd(data) {
      console.log(data);
      this.goods.map((item) => {
        if (item.commoid == data.commoid) {
          item.number = parseInt(item.number) + 1;
        }
      });
    },
    //减少商品数量
    handleDel(data) {
      this.goods.map((item) => {
        if (item.commoid == data.commoid) {
          if (item.number !== 1) {
            item.number = parseInt(item.number) - 1;
          }
        }
      });
    },
    handleConfirm() {
      // console.log(arguments[0], this.goods, arguments[1][0]);
      this.goods.map((item) => {
        if (item.commoid == arguments[0].commoid) {
          // console.log(arguments[0]);
          item.type = arguments[1][0];
        }
      });
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
      // console.log(this.goods, "-----");
    },

    //提交
    handleSubmit() {
      let params = [];
      console;
      this.goods.map((item) => {
        params.push({
          commoid: item.commoid,
          num: item.number,
          tagsize: item.type.id,
        });
      });
      // console.log(params, "params");
      this.$api.post("mall/pricetag/multiadd", params).then((res) => {
        // console.log(res);
        this.$toast.toast({
          icon: "",
          title: "添加成功",
          success: () => {
            uni.navigateBack();
          },
        });
      });
      // uni.navigateTo({
      //   url: `/pages/navigation/priceTag/index`,
      // });
    },
    handleConfim() {
      this.goods.map((item, i) => {
        if (item.commoid === this.delId) {
          this.goods.splice(i, 1);
        }
      });
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
    padding: 0 10px;
  }
  .opeBody {
    padding-bottom: 10px;
    margin: 0 -10px 0 -10px;
  }
  .operation_goods,
  .good_opr {
    text-align: right;
    margin-top: 12px;
    width: calc(100% - 20px);
  }
  .sub_box {
    text-align: right;
    margin: 12px auto 0;
    width: calc(100% - 20px);
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
/deep/ .determine_goods .van-button {
  font-size: 14px;
  padding: 6px 16px;
  border-radius: 20px;
  height: 32px;
  border: none;
  color: #fff;
  background: #1890ff;
}
/deep/ .del_goods .van-button {
  font-size: 14px;
  padding: 6px 16px;
  border-radius: 20px;
  height: 32px;
  border: none;
  color: #fff;
  width: auto;
  background: #e02020;
}
// /deep/ .determine .van-button {
//   color: #000;
//   background: #dddddd;
//   border: none;
//   outline: none;
//   padding: 3px 23px;
//   border-radius: 4px;
//   margin-right: 22px;
//   height: 32px;
//   background: #1890ff;
//   margin-right: 0;
//   color: #fff;
// }
/deep/ .reset .van-button {
  color: rgba(0, 0, 0, 0.5);
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
  margin-right: 0px;
  color: #fff;
}
</style>