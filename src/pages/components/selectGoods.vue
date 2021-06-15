<template>
  <view class="sheetBox">
    <van-action-sheet v-model="show">
      <view class="content">
        <van-row class="cl_title">
          <van-col span="4" @click="handleClose">
            <image
              src="../../static/img/icon/close.png"
              class="close_img"
            ></image>
          </van-col>
          <van-col span="16" class="title"> {{ title }} </van-col>
          <van-col span="4"></van-col>
        </van-row>
        <van-row class="all_select" v-show="operation !== 'uPriceTag'">
          <van-col span="6" class="select_box">
            <van-checkbox
              @click.native="handleAllChange()"
              v-model="checked"
              class="subm_che"
              >全选</van-checkbox
            >
          </van-col>
          <van-col span="18" class="searchBox">
            <input
              class="srarch_input"
              v-model="search"
              placeholder="请输入品名或规格/型号"
            />
            <image
              src="../../static/img/icon/search1.png"
              class="search_img"
              @click="handleSearch"
            ></image>
          </van-col>
        </van-row>
        <view class="orn_body">
          <van-row class="orn_box" v-show="operation == 'uPriceTag'">
            <van-col span="8" class="orn_title"> 价签打印单号 </van-col>
            <van-col span="16" class="opr_sh">
              <input
                class="srarch_input orn_input"
                v-model="dataSource.code"
                disabled
              />
            </van-col>
          </van-row>
        </view>
        <view class="operBox">
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
        <view class="goods_body" v-show="operation == 'uPriceTag'">
          <view class="goods_div">
            <van-row class="goods_box">
              <van-col span="2">
                <van-checkbox
                  v-model="dataSource.checked"
                  class="checkbox"
                  disabled
                ></van-checkbox>
              </van-col>
              <van-col span="22" class="good_name">
                {{ dataSource.name }}
              </van-col>
            </van-row>
            <van-row class="goods_box">
              <van-col span="4" class="good_lable"> 价格 </van-col>
              <van-col span="20" class="good_val">
                ¥{{ dataSource.price }}
              </van-col>
            </van-row>
            <van-row class="goods_box">
              <van-col span="4" class="good_lable"> 规格 </van-col>
              <van-col span="20" class="good_val">
                {{ dataSource.specification }}
              </van-col>
            </van-row>
            <van-row class="goods_box">
              <van-col span="4" class="good_lable"> 型号 </van-col>
              <van-col span="20" class="good_val">
                {{ dataSource.model }}
              </van-col>
            </van-row>
          </view>
        </view>
        <div
          v-show="list.data.length && operation !== 'uPriceTag'"
          class="goods_body"
        >
          <mescroll-uni
            @down="downCallback"
            @up="upCallback"
            :top="top"
            @init="scroll = $event"
            class="dataList"
          >
            <view
              v-for="(item, index) of list.data"
              :key="index"
              class="goods_div"
            >
              <van-row class="goods_box">
                <van-col span="2">
                  <van-checkbox
                    class="checkbox"
                    v-model="item.checked"
                    @click.native="handlecheck(item)"
                  ></van-checkbox>
                </van-col>
                <van-col span="22" class="good_name">
                  {{ item.name }}
                </van-col>
              </van-row>
              <van-row class="goods_box">
                <van-col span="4" class="good_lable"> 价格 </van-col>
                <van-col span="20" class="good_val">
                  ¥{{ item.price }}
                </van-col>
              </van-row>
              <van-row class="goods_box">
                <van-col span="4" class="good_lable"> 规格 </van-col>
                <van-col span="20" class="good_val">
                  {{ item.specification }}
                </van-col>
              </van-row>
              <van-row class="goods_box">
                <van-col span="4" class="good_lable"> 型号 </van-col>
                <van-col span="20" class="good_val">
                  {{ item.model }}
                </van-col>
              </van-row>
            </view>
          </mescroll-uni>
        </div>
        <view class="sub_body">
          <view class="sub_box">
            <van-button
              type="primary"
              class="reset"
              v-show="operation !== 'uPriceTag'"
              @click="handleAllChange('search')"
              >重置</van-button
            >
            <van-button
              type="primary"
              class="determine"
              @click.stop="handleSubmit"
              >确定</van-button
            >
          </view>
        </view>
      </view>
    </van-action-sheet>
  </view>
</template>

<script>
import Operate from "../components/operate";
import { Toast } from "vant";
import MescrollUni from "@/mescroll-uni/mescroll-uni.vue";
import { EasyListService } from "../../provider/list.service.js";
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
      default: "",
    },
    detailId: {
      type: Number,
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
          console.log(this.num);
        });
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
    //关闭
    handleClose() {
      // this.$emit("handleIsShow");
      this.show = false;
    },
    //全选
    handleAllChange(val) {
      if (val) {
        this.search = "";
        this.checked = false;
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
      } else if (this.operation == "selectGoods") {
        if (this.number == 0) {
          Toast("请至少选择打印一条");
          return;
        }
        if (!this.tagType.id) {
          Toast("请选择类型");
          return;
        }
        let dataArr = [];
        this.list.data.map((item) => {
          if (item.checked) {
            dataArr.push({
              name: item.name,
              price: item.price,
              specification: item.specification,
              model: item.model,
              commoid: item.id,
              number: this.number,
              type: this.tagType,
            });
            item.checked = false;
          }
        });
        if (dataArr.length == 0) {
          Toast("请至少选择一条数据");
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
        margin-top: 6px;
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
      text-indent: 19px;
      font-size: 14px;
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
      }
    }
    .sub_body {
      background: #fff;
      padding: 10px 0;
      z-index: 999;
      position: relative;
    }
    .sub_box {
      margin: 0 auto;
      width: calc(100% - 60px);
      text-align: right;
      .reset,
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
        margin-right: 0px;
        color: #fff;
      }
    }
  }
  .operBox {
    width: calc(100% - 40px);
    margin: 20px auto;
  }
  .opreBody {
    margin-left: 16px;
  }
}
</style>
<style lang="less">
/deep/ .searchBox .uni-input-placeholder {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  // display: none;
}

.van-checkbox__icon--checked .van-icon-success::before {
  content: "";
  display: inline-block;
  background: url("../../static/img/icon/unselected.png");
  background-size: 100% 100%;
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
}
.van-icon-success::before {
  content: "";
  display: inline-block;
  background-image: url("../../static/img/icon/unselected.png");
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