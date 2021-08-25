<template>
  <view class="sheetBox">
    <van-action-sheet v-bind:show="show">
      <view class="content">
        <view class="cl_title">
          <van-row>
            <van-col span="4">
              <image
                @click="handleClose"
                src="../../static/img/icon/close.png"
                class="close_img"
              ></image>
            </van-col>
            <van-col span="16">
              <view class="title">{{ title }}</view>
            </van-col>
            <van-col span="4"></van-col>
          </van-row>
        </view>
        <view
          class="all_select"
          v-show="operation == 'selectGoods' || operation == 'staSelectGoods'"
        >
          <van-row>
            <van-col span="6">
              <view class="select_box">
                <van-checkbox
                  @click.native="handleAllChange()"
                  :value="checked"
                  class="subm_che"
                  >全选</van-checkbox
                >
              </view>
            </van-col>
            <van-col span="18">
              <view class="searchBox">
                <input
                  class="srarch_input"
                  :value="search"
                  @input="handleInputSearch"
                  placeholder="请输入品名或规格/型号"
                />
                <view @click="handleSearch">
                  <image
                    src="../../static/img/icon/search1.png"
                    class="search_img"
                  ></image>
                </view>
              </view>
            </van-col>
          </van-row>
        </view>
        <view class="orn_body" v-show="operation == 'uPriceTag'">
          <view class="orn_box">
            <van-row>
              <van-col span="8">
                <view class="orn_title">价签打印单号</view>
              </van-col>
              <van-col span="16">
                <view class="opr_sh">
                  <input
                    class="srarch_input orn_input"
                    :value="dataSource.code"
                    disabled
                  />
                </view>
              </van-col>
            </van-row>
          </view>
        </view>
        <view class="operBox" v-show="priceTypeShow">
          <view class="opreBody">
            <Operate
              :number="number"
              :tagType="tagType"
              @handleAdd="handleAdd"
              @handleDel="handleDel"
              @handleConfirm="handleConfirm"
            />
          </view>
        </view>
        <view
          class="goods_body"
          v-show="
            operation == 'uPriceTag' || operation == 'staSelectGoodsUpdate'
          "
        >
          <view class="goods_div">
            <view class="goods_box">
              <van-row>
                <van-col span="2">
                  <van-checkbox
                    :value="dataSource.checked"
                    class="checkbox"
                    disabled
                  ></van-checkbox>
                </van-col>
                <van-col span="22">
                  <view class="good_name"> {{ dataSource.name }}</view>
                </van-col>
              </van-row>
            </view>
            <!-- <van-row class="goods_box">
              <van-col span="4" class="good_lable"> 价格 </van-col>
              <van-col span="20" class="good_val">
                ¥{{ dataSource.price }}
              </van-col>
            </van-row> -->
            <van-field
              class="priceInput fileText"
              :value="dataSource.price"
              placeholder="请输入价格"
              label="价格"
              @input="dataSource.price = $event.mp.detail"
            />
            <!-- <van-row class="goods_box">
              <van-col span="4" class="good_lable"> 规格 </van-col>
              <van-col span="20" class="good_val">
                {{ dataSource.specification }}
              </van-col>
            </van-row> -->
            <van-field
              class="priceInput fileText"
              :value="dataSource.specification"
              placeholder="请输入规格"
              label="规格"
              @input="dataSource.specification = $event.mp.detail"
            />

            <!-- <van-row class="goods_box">
              <van-col span="4" class="good_lable"> 型号 </van-col>
              <van-col span="20" class="good_val">
                {{ dataSource.model }}
              </van-col>
            </van-row> -->
            <van-field
              class="priceInput fileText"
              :value="dataSource.model"
              placeholder="请输入型号"
              label="型号"
              @input="dataSource.model = $event.mp.detail"
            />
          </view>
        </view>
        <view class="dataSource">
          <div
            v-show="
              list.data.length &&
              (operation == 'selectGoods' || operation == 'staSelectGoods')
            "
            class="goods_body"
          >
            <mescroll-uni
              @down="downCallback"
              @up="upCallback"
              :top="top"
              @init="scroll = $event"
              class="dataList"
              :fixed="false"
            >
              <view
                v-for="(item, index) of list.data"
                :key="index"
                class="goods_div"
              >
                <view class="goods_box">
                  <van-row>
                    <van-col span="2">
                      <van-checkbox
                        class="checkbox"
                        :value="item.checked"
                        @click.native="handlecheck(item)"
                      ></van-checkbox>
                    </van-col>
                    <van-col span="22">
                      <view class="good_name"> {{ item.name }}</view>
                    </van-col>
                  </van-row>
                </view>
                <view class="goods_box">
                  <van-row>
                    <van-col span="4">
                      <view class="good_lable">价格</view>
                    </van-col>
                    <van-col span="20">
                      <view class="good_val"> ¥{{ item.price }}</view>
                    </van-col>
                  </van-row>
                </view>
                <view class="goods_box">
                  <van-row>
                    <van-col span="4"
                      ><view class="good_lable"> 规格</view>
                    </van-col>
                    <van-col span="20">
                      <view class="good_val"> {{ item.specification }}</view>
                    </van-col>
                  </van-row>
                </view>
                <view class="goods_box">
                  <van-row>
                    <van-col span="4">
                      <view class="good_lable">型号</view>
                    </van-col>
                    <van-col span="20">
                      <view class="good_val"> {{ item.model }}</view>
                    </van-col>
                  </van-row>
                </view>
              </view>
            </mescroll-uni>
          </div>
        </view>
        <view class="sub_body">
          <view class="sub_box">
            <van-button
              type="primary"
              class="reset"
              v-show="
                operation == 'selectGoods' ||
                operation == 'staSelectGoods' ||
                operation == 'staSelectGoodsUpdate'
              "
              @click="handleAllChange('search')"
              >重置</van-button
            >
            <van-button type="primary" class="determine" @click="handleSubmit"
              >确定</van-button
            >
          </view>
        </view>
        <!-- <view style="height: 44px"></view> -->
      </view>
    </van-action-sheet>
  </view>
</template>

<script>
import Operate from "./operate";
import MescrollUni from "@/mescroll-uni/mescroll-uni.vue";
import { EasyListService } from "@/provider/list.service.js";
export default {
  name: "selectGoods",
  props: {
    showGood: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "选择商品",
    },
    operation: {
      type: String,
      default: "selectGoods",
    },
    detailId: {
      type: Number,
    },
    priceTypeShow: {
      //是否显示类型与数量
      type: Boolean,
      default: true,
    },
    data: {
      //用于修改商品
      // type: Object,
      // default: {},
    },
  },
  watch: {
    showGood: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    detailId: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getDetail();
      }
    },
    data: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getDetail();
      }
    },
  },
  components: {
    Operate,
    MescrollUni,
  },
  data() {
    return {
      show: false,
      checked: false,
      top: 0,
      list: {},
      scroll: null,
      search: "", //搜索
      number: 1,
      tagType: { id: "", text: "" },
      dataSource: {},
      // data: {},
    };
  },
  onLoad() {},
  created() {
    this.list = new EasyListService({
      url: "mall/commodity/search",
      pageKey: "page",
      sizeKey: "rows",
      format: (list) => {
        return list.map((_) => {
          _.checked = false;
          return _;
        });
      },
    });
  },
  methods: {
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

    getDetail() {
      if (this.operation === "staSelectGoodsUpdate") {
        this.dataSource = this.data;
        console.log(this.data, "-----");
        this.dataSource.checked = true;
        // this.dataSource.price = "¥ " + this.data.price;
        this.number = parseInt(this.data.number);
      } else if (this.operation === "uPriceTag") {
        this.$api
          .post("mall/pricetag/view", {
            id: this.detailId,
          })
          .then((res) => {
            console.log(res);
            this.dataSource = res;
            // this.data = res;
            this.dataSource.checked = true;
            this.tagType.text = res.tagsize_s;
            this.tagType.id = res.tagsize;
            this.number = parseInt(res.num);
            // console.log(this.num);
          });
      }
    },
    //获取到价签类型
    handleConfirm(tagType) {
      this.tagType = { ...tagType };
    },
    handleAdd() {
      this.number++;
    },

    handleDel() {
      if (this.number == 1) {
        return;
      }
      this.number--;
    },
    //查询
    handleSearch() {
      this.list.onLoad = (body) => {
        if (this.search) {
          body.name = this.search;
        }
      };
      this.downCallback(this.scroll);
    },
    handleInputSearch(e) {
      this.search = e.target.value;
    },
    //关闭
    handleClose() {
      // this.$emit("handleIsShow");
      this.scroll.setBounce(true);
      this.show = false;
    },
    //全选
    handleAllChange(val) {
      if (val) {
        this.search = "";
        this.checked = false;
        if (this.operation == "staSelectGoodsUpdate") {
          this.dataSource.price = "";
          this.dataSource.specification = "";
          this.dataSource.model = "";
        }
      } else {
        this.checked = !this.checked;
      }
      this.list.data.forEach((_) => {
        _.checked = this.checked;
      });
      // if (this.operation) {
      //   this.dataSource = this.data;
      //   this.tagType.text = this.data.tagsize_s;
      //   this.tagType.id = this.data.tagsize;
      //   this.number = parseInt(this.data.num);
      // }
    },
    //选择数据
    handlecheck(item) {
      item.checked = !item.checked;
      if (!this.list.data.some((_) => !_.checked)) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
    handleSubmit() {
      if (this.operation == "uPriceTag") {
        let params = {
          id: this.detailId,
          num: this.number,
          tagsize: this.tagType.id,
        };
        this.$emit("handleUpdateGoods", params);
        // this.$api.post("mall/pricetag/edit", params).then((res) => {
        //   Toast("操作成功");
        this.handleClose();
        // });
      } else if (
        this.operation == "selectGoods" ||
        this.operation == "staSelectGoods"
      ) {
        if (this.number == 0) {
          // Toast("请至少选择打印一条");
          return;
        }
        if (!this.tagType.id && this.operation == "selectGoods") {
          // Toast("请选择类型");
          return;
        }
        let dataArr = [];
        this.list.data.map((item) => {
          if (item.checked) {
            dataArr.push({
              name: item.name,
              price:
                item && item.price && item.price
                  ? item.price.toFixed(2)
                  : 0 + ".00",
              specification: item.specification,
              model: item.model,
              commoid: item.id,
              number: this.number,
              type: this.tagType,
              dataObj: item,
            });
            item.checked = false;
          }
        });
        if (dataArr.length == 0) {
          // Toast("请至少选择一条数据");
          return;
        } else {
          //传入父组件
          console.log(dataArr);

          this.$emit("handleSelectGoods", dataArr);
          this.tagType = { id: "", text: "" };
          this.number = 1;
          this.checked = false;
          this.handleClose();
          // console.log(dataArr, this.number, this.tagType);
          // let params = {
          //   action: "add",
          //   form: {
          //     tagsize: this.tagType.id,
          //     num: this.number,
          //     commoid: dataArr,
          //   },
          // };
          //调取添加
          // this.$emit("goods", dataArr);
          // this.$api.post("mall/pricetag/go", params).then((res) => {
          //   Toast("操作成功");
          //   this.handleClose();
          //   this.checked = false;
          // });
        }
      } else if (this.operation == "staSelectGoodsUpdate") {
        const { dataObj, price, specification, model } = this.dataSource;
        const params = {
          id: dataObj.id,
          name: dataObj.name,
          price: price,
          specification: specification,
          model: model,
          brandid: dataObj.brandid,
          categoryid: dataObj.categoryid,
        };
        console.log(this.dataSource);
        this.$api.post("mall/commodity/edit", params).then((res) => {
          console.log(res);
          this.$toast.toast({
            icon: "success",
            title: "修改成功！",
            success: () => {
              this.handleClose();
              this.$emit("handleUpdateSelectGoods", {
                id: dataObj.id,
                price: price,
                specification: specification,
                model: model,
              });
            },
          });
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.sheetBox {
  .content {
    .orn_body {
      width: calc(100% - 40px);
      margin: 0px auto -15px;
      .orn_box {
        margin: 0 18px 0 31px;
        color: #1e1e1e;
        font-size: 12px;
      }
      .orn_title {
        margin-top: 6px;
      }
    }
    .cl_title {
      width: calc(100% - 48px);
      margin: 15px auto 33px;
    }
    .close_img {
      width: 26px;
      height: 26px;
    }
    .title {
      text-align: center;
      font-size: 16px;
      color: #1e1e18;
    }
    .all_select {
      width: calc(100% - 40px);
      margin: 0 auto 15px;
      .select_box {
        margin-top: -13px;
      }
    }
    .subm_che {
      margin-left: 20px;
      color: rgba(0, 0, 0, 0.5);
      font-size: 12px;
    }
    .searchBox {
      position: relative;
    }
    .srarch_input {
      border: none;
      outline: none;
      background: #eeeeee;
      border-radius: 20px;
      line-height: 32px;
      height: 32px;
      // text-indent: 19px;
      font-size: 14px;
      padding-left: 10px;
    }
    .orn_input {
      height: 28px;
      text-align: right;
      padding: 0 10px;
    }
    .search_img {
      position: absolute;
      width: 13px;
      height: 13px;
      top: 9px;
      right: 22px;
      // z-index: 999;
    }
    .goods_body {
      width: calc(100% - 40px);
      margin: 0 auto;
      height: 256px;
      overflow: scroll;

      .dataList {
        transform: translate(0);
      }
    }
    .goods_div {
      border: 1px solid #d3d3d3;
      padding: 10px 20px;
      border-radius: 8px;
      margin-top: 10px;
      .goods_box {
        margin-top: 5px;
        .good_name {
          padding-left: 12px;
          color: #1e1e1e;
          font-size: 12px;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
          /* width: auto; */
          height: 20px;
          word-break: break-all;
        }
        .good_lable {
          font-size: 12px;
          color: #1e1e1e;
        }
        .good_val {
          text-align: right;
          font-size: 12px;
          color: #1e1e1e;
        }
        .col189 {
          color: #1890ff;
        }
      }
    }
    .sub_body {
      background: #fff;
      padding: 10px 0;
      z-index: 9;
      position: relative;
      margin-bottom: 40px;
    }
    .sub_box {
      margin: 0 auto;
      width: calc(100% - 60px);
      text-align: right;
    }
  }
  .operBox {
    width: calc(100% - 40px);
    margin: 20px auto;
  }
  .opreBody {
    margin-left: 16px;
  }
  .priceInput {
    padding: 0;
    color: #1e1e1e;
    font-size: 12px;
    margin-top: 6px;
  }
}
</style>
<style lang="less">
/deep/ .van-field__label {
  color: #1e1e1e;
}
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
/deep/ .priceInput .van-field__control {
  color: #1890ff;
}

/deep/ .priceInput::after {
  border: none;
}
/deep/ .searchBox .uni-input-placeholder {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  // display: none;
}
/deep/ .fileText .van-field__control {
  text-align: right;
}
.van-checkbox__icon--checked .van-icon-success::before {
  content: "";
  display: inline-block;
  background: url("@/static/img/icon/unselected.png");
  background-size: 100% 100%;
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
}
.van-icon-success::before {
  content: "";
  display: inline-block;
  background-image: url("@/static/img/icon/unselected.png");
  background-size: 100% 100%;
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
}
// .van-checkbox__icon--round .van-icon {
//   border: none !important;
//   background-color: rgba(0, 0, 0, 0) !important;
// }
.van-checkbox__icon--checked .van-icon {
  border: none !important;
  background-color: rgba(0, 0, 0, 0) !important;
}
.van-checkbox__icon .van-icon {
  border: none !important;
  background-color: rgba(0, 0, 0, 0) !important;
}
// /deep/.addSheet .add_opr {
//   width: 60%;
//   margin: 0 auto;
//   font-size: 14px;
//   font-weight: 600;
//   color: #0091ff;
//   padding-bottom: 10px;
//   margin-top: 20px;
//   .con {
//     text-align: right;
//   }
// }
// /deep/.addSheet .van-picker-column__item--selected {
//   color: #0091ff;
// }
</style>